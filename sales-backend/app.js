const express = require("express");
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = 9001;
const axios = require("axios");
const multer = require("multer");
const multer_file = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const http = require("http");
var ip = require('ip');
const os = require('os');
const fs = require("fs");
// const FormData = require("FormData");
const fspromises = require("fs/promises");
const xlsx = require('xlsx');
const { group } = require("console");
const uploadsPath = path.join(__dirname, "uploads");


// Define storage and file renaming using Multer
const storage = multer_file.diskStorage({
  destination: '/var/lib/asterisk/sounds/en/custom/', // Specify your upload directory
  filename: (req, file, cb) => {
    // Generate a custom filename (e.g., current timestamp + original filename)
    const customFileName = file.originalname;
    cb(null, customFileName);
  },
});

const uploadMediaFile = multer({ storage });

app.use("/uploads", express.static(uploadsPath));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const server = http.createServer(app);
server.listen(port, () => {
  const hostname = os.hostname();
  console.log("Your IP address is " + ip.address());
  console.log(`Server is running on https://localhost:${port}`);
});
const uri = "mongodb+srv://yahyaammar:wkBM0FIbJDZSb9Hl@cluster0.skkmm1v.mongodb.net/?retryWrites=true&w=majority"
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  maxPoolSize: 1,
};
const client = new MongoClient(uri, options);
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
    return client.db("salesautomationdb");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas: hehe", error);
    throw error;
  }
}

async function closeTheDB() {
  try {
    await client.close();
    console.log("Closed Connection");
    return 
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
}

app.get("/api/forwarding", async (req, res) => {
  async function getData() {
    let result = [];
    try {
      // Assuming you have a "forwardingNumbers" collection in your MongoDB
      const db = await connectToDatabase();
      const collection = db.collection("forwardingNumber");

      // Find all forwarding numbers in the collection
      const forwardingNumbers = await collection.find({}).toArray();

      console.log("Fetched all forwarding numbers:", forwardingNumbers);

      result.push({
        success: true,
        forwardingNumbers: forwardingNumbers,
      });

    } catch (error) {
      console.error("Error fetching forwarding numbers:", error);

      result.push({
        success: false,
        message: "Failed to fetch forwarding numbers.",
      });

    } finally {
      // Close the MongoDB connection
      // await client.close();
    }
    return result;
  };
  const data = await getData(); //add this
  if(data[0].success){
    res.status(200).json(data[0]);
  }else{
    res.status(500).json(data[0]);
  }  

  // response.send(data);
});

app.post("/api/forwarding", async (req, res) => {
  try {
    const { number } = req.body;

    // Assuming you have a "forwardingNumbers" collection in your MongoDB
    const db = await connectToDatabase();
    const collection = db.collection("forwardingNumber");

    // Find the existing forwarding number (if any)
    const existingForwardingNumber = await collection.findOne();

    if (existingForwardingNumber) {
      // If an existing forwarding number is found, update it
      await collection.updateOne(
        { _id: existingForwardingNumber._id }, // Use the existing document's ID for the update
        { $set: { number: number } }
      );
      console.log("Forwarding number updated:", number);
    } else {
      // If no existing forwarding number is found, create a new one
      const forwardingNumber = {
        number: number,
      };
      await collection.insertOne(forwardingNumber);
      console.log("Forwarding number added:", forwardingNumber);
    }

    return res.status(201).json({
      success: true,
      message: "Forwarding number added/updated successfully!",
    });
  } catch (error) {
    console.error("Error adding/updating forwarding number:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add/update forwarding number",
    });
  } finally {
    // Close the MongoDB connection
    // await client.close();
  }
});



app.post("/api/create-group", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("group");

    const { name, phoneNumbers } = req.body;

    const currentTimestamp = new Date().toISOString();


    // Create a new group document
    const newGroup = {
      name: name,
      phoneNumbers: phoneNumbers,
      createdAt: currentTimestamp,
    };

    // Insert the new group document into the "group" collection
    const result = await collection.insertOne(newGroup);

    console.log("New group document inserted:", result.insertedId);

    return res.status(201).json({
      success: true,
      message: "New group created successfully!",
    });
  } catch (error) {
    console.error("Error creating new group:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create new group",
    });
  } finally {
    // Close the MongoDB connection
    // await client.close();
  }
});

app.get("/api/group/:id", async (req, res) => {
  async function getData() {
    let result = [];
    try {
      const groupId = req.params.id; // Get the group ID from the URL parameters
      // await client.connect();
      const db = await connectToDatabase();
      // db = client.db("salesautomationdb");
      const collection = db.collection("group");
      // Find the group by its ID
      var o_id = new ObjectId(groupId);
      const query = { _id: o_id };
      console.log("serachQuery", query)
      const group = await collection.findOne(query);

      console.log("findOneGroup", group)
      if (!group) {
        // If no group found with the given ID, return a 404 response
        result.push({
          success: false,
          message: "Group not found",
        });
        // return res.status(404).json({
        //   success: false,
        //   message: "Group not found",
        // });
      }else{
        // If the group is found, return it as a response
        result.push({
          success: true,
          group: group,
        });
      }
      
      // return res.status(200).json({
      //   success: true,
      //   group: group,
      // });
    } catch (error) {
      console.error("Error finding group:", error);
      result.push({
        success: false,
        message: "Failed to find group",
      });
      // return res.status(500).json({
      //   success: false,
      //   message: "Failed to find group",
      // });
    } finally {
      // Close the MongoDB connection
      // await client.close();
    }
    return result;
  };
  const data = await getData(); //add this
  if(data[0].success){
    res.status(200).json(data[0]);
  }else{
    res.status(500).json(data[0]);
  }  
  // response.send(data);
});

app.put("/api/groups/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("group");

    const { name, phoneNumbers } = req.body;
    const groupId = req.params.id; // Extract the group ID from the request parameters

    // Validate the provided group ID
    if (!ObjectId.isValid(groupId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid group ID format.",
      });
    }

    // Update the group document based on the provided data
    const updatedGroup = {
      name: name,
      phoneNumbers: phoneNumbers,
    };

    // Find the group document by its ID and update it
    const result = await collection.updateOne(
      { _id: new ObjectId(groupId) }, // Create a new instance of ObjectId
      { $set: updatedGroup }
    );

    if (result.matchedCount === 0) {
      // No matching group found
      return res.status(404).json({
        success: false,
        message: "Group not found.",
      });
    }

    console.log("Group updated successfully!");

    return res.status(200).json({
      success: true,
      message: "Group updated successfully!",
    });
  } catch (error) {
    console.error("Error updating group:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update group.",
    });
  } finally {
    // Close the MongoDB connection
    // await client.close();
  }
});

app.get("/api/groups", async (req, res) => { //add async
    async function getData() {
        let result = [];
        let groups_data = [];

        try {
            const db = await connectToDatabase();
            const collection = db.collection("group");

            // Find all group documents in the collection
            const groups = await collection.find({}).toArray();

            // console.log("Fetched all groups:", groups);

            // Calculate total phone numbers, total answered, and total duration for each group
            const groupsWithTotals = groups.map((group) => {
              let totalPhoneNumbers = 0;
              let totalAnswered = 0;
              let totalDuration = 0;
              let formattedDuration;

                group.phoneNumbers.forEach((phoneNumber) => {
                  totalPhoneNumbers++;
                  if (phoneNumber.answered === "yes") {
                    totalAnswered++;
                    if (phoneNumber.duration) {
                      // Assuming duration is in seconds, you can convert it to minutes or hours if needed
                      totalDuration += parseInt(phoneNumber.duration);
                    
                    }
                  }
                });

                if (totalDuration < 60) {
                  // If the duration is less than 60 seconds, display it as seconds
                  formattedDuration = `${totalDuration} sec`;
                } else {
                  // If the duration is 60 seconds or more, convert it to minutes
                  const durationInMinutes = durationInSeconds / 60;
                  formattedDuration = `${durationInMinutes} min`;
                }

                groups_data.push({
                  ...group,
                  totalPhoneNumbers: totalPhoneNumbers,
                  totalAnswered: totalAnswered,
                  totalDuration: formattedDuration,
                  createdAt: group.createdAt,
                });
                result.push({
                  success: true,
                  groups: groups_data,
                });

              });           
        }
        catch (e) {
            console.log(e);
            result.push({
              success: false,
              message: "Failed to fetch groups.",
            });
        }
        finally {
            // await client.close();
        }
        return result;
    };
    const data = await getData(); //add this

    if(data[0].success){
      res.status(200).json(data[0]);
    }else{
      res.status(500).json(data[0]);
    }

    // response.send(data);
});

// API endpoint for file upload
app.post('/api/upload-file', uploadMediaFile.single('sales_automation_messages'), async (req, res) => {
  try {
    // Access the uploaded file's custom filename
    const customFileName = req.file.filename;
    const originalFileName = req.file.originalname;
    console.log('Custom filename:', customFileName);

    const index = req.body.index


      var filename

      if(index == '0'){
        filename= 'welcome'
      }else if(index == '1'){
        filename= 'sales-pitch'
      }else if(index == '2'){
        filename= 'yes'
      }else if(index == '5'){
        filename= 'yes'
      }else if(index == '7'){
        filename= 'hearme'
      }else{
        filename = 'message'
      }

      filename_text = filename+".sln";

      req.file.originalname = filename_text;



fs.rename(`/var/lib/asterisk/sounds/en/custom/${originalFileName}`, `/var/lib/asterisk/sounds/en/custom/${filename_text}`, (err) => {
  if (err) {
    console.error('Error renaming the file:', err);
  } else {
    console.log('File renamed successfully.');
  }
});

// await fspromises.rename(`uploads/${originalFileName}`, `uploads/${filename_text}`);

// Rename the file
// await fspromises.rename('hello.txt', 'world.txt', () => {
//   console.log("\nFile Renamed!\n");
// });

    // You can move, process, or save the file as needed
    // For example, save it to a specific directory
    // await fspromises.rename(`uploads/${customFileName}`, `uploads/${customFileName}`);


    // const sourcePath = `uploads/${originalFileName}`; // Replace with the actual source file path
    // console.log('Custom sourcePath:', sourcePath);
    // const destinationPath = `/var/lib/asterisk/sounds/en/custom/${originalFileName}`; // Replace with the actual destination file path
    // console.log('Custom destinationPath:', destinationPath);
// if (fspromises.existsSync(sourcePath)) {

//   if (!fspromises.existsSync(destinationPath)) {
//     // If the destination file doesn't exist, proceed to move it
//     try {
//       fspromises.renameSync(sourcePath, destinationPath);
//       console.log('File moved successfully.');
//     } catch (error) {
//       console.log('Error moving the file:', error);
//     }
//   } else {
//     console.log('Destination file already exists. No need to move.');
//   }
// } else {
//   console.log('Source file does not exist.');
// }


      const db = await connectToDatabase();
      const collection = db.collection("sales_automation_messages");
      const result = await collection.insertOne({ audio: req.file });

    // Define the URL where you want to upload the file
const uploadUrl = 'http://16.163.178.109/aivoip/speech/save-audio-file.php'; // Replace with your target URL

// Read the file you want to upload
//const filePath = 'path/to/your/file.txt'; // Replace with the path to your file
// const fileStream = fs.createReadStream(sourcePath);


 // const apiResponse = await axios.post(uploadUrl, fileStream, {
 //      headers: {
 //        'Content-Type': 'application/octet-stream',
 //        'Content-Disposition': `attachment; filename=${originalFileName}`,
 //      },
 //    });
// const bodyFormData = new FormData();

// Pass filename as a string
// bodyFormData.append("file", fileStream, originalFileName);

// or to specify more meta-data, pass an object
// bodyFormData.append("file", req.file, {
//   filename: originalFileName,
//   contentType: "application/octet-stream",
// });

//const baseFileName = path.basename(originalFileName);

// const baseFileName = path.basename(destinationPath, path.extname(originalFileName));

//     console.log(' Base filename:',  );

const jsonDataArray = '[{ "message": '+filename+', "message_text": '+filename+' }]';

    console.log(' jsonDataArray:', jsonDataArray);

  const apiResponse = axios.post(uploadUrl, jsonDataArray)
    .then((response) => {
      console.log("success");
      // return res.status(200).json({
      //   status: 'success',
      //   data: response.data
      // });
    })
    .catch((err) => {
      console.log("failed");

      // return res.status(400).json({
      //   status: 'Failed',
      //   data: err.message
      // })
    })

//  const apiResponse =axios.post(uploadUrl, jsonDataArray, {
//   headers: {
//     "Accept": "application/json",
//     "Cache-Control": "no-cache",
//   },
// });
 console.log("api response:", apiResponse.data);

    res.status(200).json({ message: 'File uploaded and renamed successfully' });
  } catch (error) {
    console.error('Error uploading or renaming file:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});


app.post("/api/upload-audio",upload.single("sales_automation_messages"), async (req, res) => {
    try {


        const fileData = req;
    const originalFileName = req.file.originalname;
const baseFileName = path.basename(originalFileName);

console.log("Post Form Request Body", req.body);
// formData.append('req.file', req);
console.log("---------------------------------");
console.log("Post Form Request file", req.file);
// Define the API URL where you want to submit the form data
// const apiUrl = 'http://16.163.178.109/aivoip/speech/save-audio-file.php';

// Create a new FormData object
// const FormData = require('form-data');
// const formData = new FormData;

// Add the "audioFile" (uploaded file)
// const audioFilePath = '/uploads/'+originalFileName; // Replace with the actual file path

//     const audioFilePath = path.join('uploads', req.file.originalname);
//     console.log('Relative Path:', audioFilePath);
// formData.append('audioFile', fs.createReadStream(audioFilePath));

// Add the "message" (text)
// formData.append('message', baseFileName);

// Add the "message_text" (text)
// formData.append('message_text', baseFileName);

// console.log(formData, "formData");

// Make the POST request to the API
// const response = axios.post(apiUrl, formData, {
//   headers: {
//         'Content-Type': 'application/octet-stream',
//         'Content-Disposition': `attachment; filename=${originalFileName}`,
//       },
// })

// console.log(response, "response");

//       let formData = [];

//         const fileData = req.file.buffer;
//     const originalFileName = req.file.originalname;
// const baseFileName = path.basename(originalFileName);


  // const customFileName = originalFileName; // Replace with your custom filename and extension

  // Define the file path where you want to save the uploaded file
  // const filePath = path.join(__dirname, 'uploads', customFileName); 

     

      // const uploadedFile = req.file;
      // const index = req.body.index
      // console.log("hello world");

      // if (!uploadedFile) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "No audio file uploaded.",
      //   });
      // }

      const db = await connectToDatabase();
      const collection = db.collection("sales_automation_messages");

      // Save the uploaded file to the collection (you can adjust the storage mechanism as needed)
      // For example, you can use GridFS to store large audio files in Mon````goDB
      // const result = await collection.insertOne({ audio: uploadedFile });


      // Create the link for the uploaded audio file
      // const audioLink = `http://16.163.178.109:9000/uploads/${uploadedFile.filename}`;


      var filename

      if(index == '0'){
        filename= 'welcome'
      }else if(index == '1'){
        filename= 'sales-pitch'
      }else if(index == '2'){
        filename= 'yes'
      }else if(index == '5'){
        filename= 'yes'
      }else if(index == '7'){
        filename= 'hearme'
      }else{
        fliename = 'message'
      }


     // Make a POST request to the specified URL with the audio link as a query parameter
 //      const url = `http://16.163.178.109/aivoip/speech/save-audio-file.php`;
 // const apiResponse = await axios.post(url, req.file, {
 //      headers: {
 //        'Content-Type': 'application/octet-stream',
 //        'Content-Disposition': `attachment; filename=${originalFileName}`,
 //      },
 //    });

// console.log("apiResponseData",apiResponse.data);


      // Make a POST request to the specified URL with the audio link as a query parameter
      // const url = `http://16.163.178.109/aivoip/speech/save-audio-file.php?url=${encodeURIComponent(
      //   audioLink
      // )}&message=${filename}&message_text=${filename}`

      // const response =  axios.get(url);



      return res.status(200).json({
        success: true,
        message: "Audio file uploaded and posted successfully!",
      });
    } catch (error) {
      console.error("Error uploading audio file:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload audio file.",
      });
    } finally {
      // Close the MongoDB connection
      // await client.close();
    }
  }
);

app.post("/api/messages",
  upload.single("audio_file"),
  async (req, res) => {
    try {
      const uploadedFile = req.file.filename;

      const db = await connectToDatabase();
      const collection = db.collection("messages");

      const request = req.body
      const message = {
        ...request,
        uploadedFile
      }


      // Insert the array of messages into the "sales_automation_messages" collection
      const result = await collection.insertOne(message);

      console.log(`${result.insertedCount} messages inserted successfully!`);

      return res.status(201).json({
        success: true,
        message: "Messages inserted successfully!",
        insertedCount: result,
      });
    } catch (error) {
      console.error("Error inserting messages:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to insert messages.",
      });
    } finally {
      // Close the MongoDB connection
      // await client.close();
    }
  });

app.get("/api/messages", async (req, res) => {
  async function getData() {
    let result = [];
    try {
      const db = await connectToDatabase();
      const collection = db.collection("messages");

      // Find all documents in the "sales_automation_messages" collection
      const messages = await collection.find({}).toArray();

      result.push({
        success: true,
        messages: messages,
      });

      // return res.status(200).json({
      //   success: true,
      //   messages: messages,
      // });
    } catch (error) {
      console.error("Error fetching messages:", error);
      result.push({
        success: false,
        messages: "Failed to fetch messages.",
      });
      // return res.status(500).json({
      //   success: false,
      //   message: "Failed to fetch messages.",
      // });
    } finally {
      // Close the MongoDB connection
      // await client.close();
    }
    return result;
  }
  const data = await getData(); //add this
  if(data[0].success){
    res.status(200).json(data[0]);
  }else{
    res.status(500).json(data[0]);
  }
  // response.send(data);
});

app.put("/api/messages/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("sales_automation_messages");

    const messageId = req.params.id; // Extract the message ID from the request parameters

    // Validate the provided message ID
    if (!ObjectId.isValid(messageId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID format.",
      });
    }

    const { id, parent_id, keyword, audio_file, text } = req.body;

    // Update the message document based on the provided data
    const updatedMessage = {
      id: id,
      parent_id: parent_id,
      keyword: keyword,
      audio_file: audio_file,
      text: text
    };

    // Find the message document by its ID and update it
    const result = await collection.updateOne(
      { _id: new ObjectId(messageId) }, // Create a new instance of ObjectId
      { $set: updatedMessage }
    );

    if (result.matchedCount === 0) {
      // No matching message found
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    console.log("Message updated successfully!");

    return res.status(200).json({
      success: true,
      message: "Message updated successfully!",
    });
  } catch (error) {
    console.error("Error updating message:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update message.",
    });
  } finally {
    // Close the MongoDB connection
    // await client.close();
  }
});

app.post("/api/add-phone-number", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("group");

    // const { groupId, phoneNumber } = req.body;
    const { groupId, phoneNumber, status, duration, keyword, answered } = req.body;

    // Check if groupId is a valid ObjectId
    if (!ObjectId.isValid(groupId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid group ID format",
      });
    }

    // Find the group by its ObjectId
    const existingGroup = await collection.findOne({
      _id: new ObjectId(groupId),
    });

    if (!existingGroup) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // Set the current timestamp as the createdAt value
    const currentTimestamp = new Date().toISOString();

    // Append the new phone number object to the group with additional fields
    const newPhoneNumber = {
      number: phoneNumber,
      status: status,
      createdAt: currentTimestamp, // Set the createdAt value here
      duration: duration,
      keyword: keyword,
      answered: answered,
    };

    // Append the new phone number to the group
    // existingGroup.phoneNumbers.push({ number: phoneNumber });
    existingGroup.phoneNumbers.push(newPhoneNumber);

    // Update the group document in the "group" collection
    const result = await collection.updateOne(
      { _id: new ObjectId(groupId) }, // Use 'new ObjectId()' here
      { $set: { phoneNumbers: existingGroup.phoneNumbers } }
    );

    console.log("Phone number added to group:", groupId);

    return res.status(200).json({
      success: true,
      message: "Phone number added to group successfully!",
    });
  } catch (error) {
    console.error("Error adding phone number to group:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add phone number to group",
    });
  } finally {
    // Close the MongoDB connection
    // await client.close();
  }
});

app.put("/api/update-phone-number", async (req, res) => {
  try {
    const { phoneNumber, chat, callDuration } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection("group");

    // Find the phone number in the database based on the provided phoneNumber
    const group = await collection.findOne({
      "phoneNumbers.number": phoneNumber,
    });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Phone number not found in the database.",
      });
    }

    // Update the chat and callDuration for the specific phone number
    const updatedPhoneNumbers = group.phoneNumbers.map((phone) => {
      if (phone.number === phoneNumber) {
        return {
          ...phone,
          chat: chat,
          callLength: callDuration,
        };
      }
      return phone;
    });

    // Update the entire group document with the updated phoneNumbers array
    const result = await collection.updateOne(
      { _id: new ObjectId(group._id) },
      { $set: { phoneNumbers: updatedPhoneNumbers } }
    );

    console.log("Phone number updated successfully!");

    return res.status(200).json({
      success: true,
      message: "Phone number updated successfully!",
    });
  } catch (error) {
    console.error("Error updating phone number:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update phone number.",
    });
  } finally {
    // Close the MongoDB connection
    // await client.close();
  }
});



app.post("/api/edit-text-message", async (req, res) => {
  try {
    const { currentMessage, currentPara, index, id } = req.body;
    const db = await connectToDatabase();
    const collection = db.collection("messages");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          primary: currentMessage,
          secondary: currentPara,
        },
      }
    );



    if (result.modifiedCount === 1) {
      return res.status(200).json({
        success: true,
        message: "Message updated successfully!",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Message not found or not updated.",
      });
    }
  } catch (error) {
    console.error("Error updating phone number:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update phone number.",
    });
  } finally {
    // Close the MongoDB connection
    // await client.close();
  }
});



app.post(
  "/api/upload-excel",
  upload.single("excel_file"),
  async (req, res) => {
    try {
      const uploadedFile = req.file;
      const groupId = req.body.id
      const db = await connectToDatabase();


      if (!uploadedFile) {
        return res.status(400).json({
          success: false,
          message: "No Excel file uploaded.",
        });
      }

      // read file content here 
      console.log('Reading File Contents')
      const workbook = xlsx.readFile(uploadedFile.path);

      // Assuming there's only one sheet in the Excel file, you can access it like this:
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Parse the sheet data to JSON
      const jsonData = xlsx.utils.sheet_to_json(sheet);

      if (validateData(jsonData)) {
        // inserting records in db
        console.log('inserting records in db')

        // Validate the provided group ID
        if (!ObjectId.isValid(groupId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid group ID format.",
          });
        }


        const keys = Object.values(jsonData);
        const numbers = keys?.map((item) => {
          return item[Object.keys(jsonData[0])[0]]
        })

        const currentTimestamp = new Date();

        const updatedPhoneNumbers = numbers.map(phoneNumber => {
          const strNum = phoneNumber.toString();
          return {
            number: strNum,
            status: 'idle', // Assuming you have status defined somewhere
            createdAt: currentTimestamp,
            duration: 0, // Assuming you have duration defined somewhere
            keyword: '', // Assuming you have keyword defined somewhere
            answered: '', // Assuming you have answered defined somewhere
          };
        });

        const updatedGroup = {
          phoneNumbers: updatedPhoneNumbers,
        };

        // Update the group document based on the provided data
        // const updatedGroup = {
        //   phoneNumbers: numbers,
        // };
        const collection = db.collection("group");

        // Find the group document by its ID and update it
        const result = await collection.updateOne(
          { _id: new ObjectId(groupId) }, // Create a new instance of ObjectId
          // { $set: updatedGroup }
          { $push: { phoneNumbers: { $each: updatedPhoneNumbers } } }
        );

        return res.status(200).json({
          success: true,
          message: "Data uploaded successfully",
        });

      } else {
        console.error("Error uploading excel file:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to upload excel file.",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload excel file.",
      });
    } finally {
      // Close the MongoDB connection
      // await client.close();
    }
  }
);

app.post(
  "/api/insert-message",
  upload.single("audioFile"),
  async (req, res) => {
    try {
      const uploadedFile = req.file;
      const textMessage = req.body.textMessage; // Use req.body.textMessage to access the text message

      const db = await connectToDatabase();
      const collection = db.collection("messages");
      const newMessage = {
        textMessage: textMessage,
        audioFile: uploadedFile.filename, // Assuming you store the filename of the uploaded audio file
      };

      const response = await collection.insertOne(newMessage);

      return res.status(200).json({
        success: true,
        message: `Response is: ${response.insertedId}`, // Send a plain string message
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload audio file.",
      });
    } finally {
      // Close the MongoDB connection
      // await client.close();
    }
  }
);



function validateData(data) {
  for (const item of data) {
    const keys = Object.keys(item);

    // Check if there is more than one key in the object or if the value is not a number
    if (keys.length !== 1 || typeof item[keys[0]] !== 'number') {
      return false; // Data format is not as expected
    }
  }
  return true; // Data format is as expected
}


// app.post("/api/create-logs", async (req, res) => {
//   try {

//     const { number, start_time, end_time, text, user, seq, date, call_status } = req.body;
//     const db = await connectToDatabase();
//     const collection = db.collection("logs");
//     const result = await collection.insertOne(
//      {number, start_time, end_time, text, user, seq, date, call_status}
//     );
//   } catch (error) {
//     console.error("Error in creating logs:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create logs.",
//     });
//   }
// });

app.post("/api/create-logs", async (req, res) => {
  try {
    const { number, start_time, end_time, text, user, seq, date, call_status, groupID } = req.body;
    const db = await connectToDatabase();
    const logsCollection = db.collection("logs");
    const groupsCollection = db.collection("group");
    const activeGroupCollection = db.collection('activeGroup');
  
      // Find the active group
    const activeGroup = await activeGroupCollection.findOne();
    const groupId   = activeGroup.group;
    console.log('active group id',activeGroup.group)
  

    // Check if the provided number exists in any group
    console.log("Searching for number:", number);

  if(groupId){
      console.log('group id exist', groupId)
      // const groupWithNumber = await groupsCollection.findOne({
      // _id: groupId,
      // "phoneNumbers.number": number,
      // });
      const groupObjectId = new ObjectId(groupId);
      const group = await groupsCollection.findOne({ _id: groupObjectId });

      if (!group) {
        return res.status(404).json({
          success: false,
          message: "Group not found with the provided groupId.",
        });
      }
    
      // Check if the provided number exists in the found group
      const numberExistsInGroup = group.phoneNumbers.some((phoneNumber) => phoneNumber.number === number);
    
      if (numberExistsInGroup) {
        // Number exists in the group, proceed with your logic
        console.log("Number found in the group:", number);
      } else {
        return res.status(404).json({
          success: false,
          message: "Number not found in the specified group.",
        });
      }
    // console.log("Group with Number:", groupWithNumber);

    if (numberExistsInGroup) {
      // If the number is found in a group, save the log along with the group information
      const result = await logsCollection.insertOne({
        number,
        start_time,
        end_time,
        text,
        user,
        seq,
        date,
        call_status,
        groupId: groupObjectId, // Store the group ID with the log
      });

      return res.status(200).json({
        success: true,
        message: "Log created successfully!",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Number not found in any group.",
      });
    }
  }else{
    console.log('There is no Active group')
    return res.status(500).json({
      success: false,
      message: "Failed to create logs, There is no Active group",
    });
  }
  } catch (error) {
    console.error("Error in creating logs:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create logs.",
    });
  } finally {
    // Close the MongoDB connection
    // await client.close();
  }
});


app.post("/api/get-chat-text", async (req, res) => {
  try {
    const { number, groupId } = req.body;
    const db = await connectToDatabase();
    const logsCollection = db.collection("logs");
    const groupIdObjectId = new ObjectId(groupId);

    const chatLogs = await logsCollection.find({
      groupId: groupIdObjectId,
      number: number
    }).toArray();

    console.log("Fetching chat logs");

    return res.status(200).json({
      success: true,
      chatLogs,
    });
  } catch (error) {
    console.error("Error in retrieving chat text:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve chat text.",
    });
  } finally {
    // await client.close();
  }
});



app.get('/api/getSipSetting', async (req, res) => {

  axios.get('http://16.163.178.109/aivoip/sip/fetch-sip.php')
    .then((response) => {
      return res.status(200).json({
        status: 'success',
        data: response.data
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: 'Failed',
        data: err.message
      })
    })
})




app.post('/api/updateSetting', async (req, res) => {

  const data = req.body;

  console.log("data", data);

//   let reqdata = "{";
// Object.entries(data).forEach(([key, value]) => {
//   reqdata += `"${key}":"${value}",`;
// });
// reqdata += "}";
  // Convert to a JSON string
const jsonString = JSON.stringify(data);
// Parse the JSON string back to an object
const dataKeysObject = JSON.parse(jsonString);

  // axios.post('http://16.163.178.109:9001/api/update-setting', data)
  axios.post('http://16.163.178.109/aivoip/sip/update-sip.php', data)
    .then((response) => {
      return res.status(200).json({
        status: 'success',
        data: response.data
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: 'Failed',
        data: err.message
      })
    })
})








app.post('/api/call-numbers', async (req, res) => {
  

  const data = req.body
  console.log("body",req.body[0]);
  const groupData = req.body[0];
const groupId = groupData.groupId;
console.log("groupId",groupId);
   // Save the current groupId in the MongoDB collection
  //  await db.collection('Active Group').updateOne({}, { $set: { groupId } }, { upsert: true });
   try {
    // const groupId = req.params.groupId;

    const db = await connectToDatabase();
    const collection = db.collection("activeGroup");

    const existingActiveGroup = await collection.findOne();

console.log("existingActiveGroup", existingActiveGroup);

    if (existingActiveGroup) {
      await collection.updateOne(
        { _id: existingActiveGroup._id }, 
        { $set: { group: groupId } }
      );
      console.log("group updated:", groupId);
    } else {
      const group = {
        group: groupId,
      };
      await collection.insertOne(group);
      console.log("group added:", group);
    }


    axios.post('http://16.163.178.109/aivoip/autodial/dial_numbers_1.php', data)
    
    return res.status(200).json({
      status: 'success',
      data: "Calls has been Started"
    });

  }catch (error) {
    console.error("Error adding/updating Active Group:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add/update Active Group",
    });
  }


})

app.get('/api/stop-calling', async (req, res) => {


  try {

    const db = await connectToDatabase();
    const collection = db.collection("activeGroup");

    const existingActiveGroup = await collection.findOne();

    if (existingActiveGroup) {
      await collection.updateOne(
        { _id: existingActiveGroup._id }, 
        { $set: { group: '' } }
      );
      console.log("Active group updated successfuly");
    } else {
      console.log("Active group calling dosent exist");
    }
  }catch (error) {
    console.error("Error deleting Active Group:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete Active Group",
    });
  }

  axios.get('http://16.163.178.109/aivoip/autodial/stop_dials.php')
  
  return res.status(200).json({
    status: 'success',
    data: "Calls has been Ended"
  });


})

app.get('/api/concurrent-number', async (req, res) => {
    async function getData() {
      let result = [];
      try {

        const db = await connectToDatabase();
        // db = client.db("salesautomationdb");
        const con = db.collection("con");

        // Retrieve the concurrent number (assuming you have only one)
        const concurrentNumber = await con.findOne();

        result.push({
          success: true,
          concurrentNumber: concurrentNumber,
        });


      } catch (error) {
        console.error("Error in retrieving concurrent number:", error);


        result.push({
          success: false,
          message: "Failed to retrieve concurrent number.",
        });

      } finally {
        // Close the MongoDB connection
        // await client.close();
      }
      return result;
    };
    const data = await getData(); //add this
// console.log("result", data[0]);
    if(data[0].success){
      res.status(200).json(data[0]);
    }else{
      res.status(500).json(data[0]);
    }

});



app.post('/api/concurrent-number', async (req, res) => {
  try {
    const data = req.body
    const db = await connectToDatabase();
    const con = db.collection("con");
    console.log(data)
    // delete pervious concurrent number
    const result = await con.deleteMany({});

    const result2 = await con.insertOne(data);

    return res.status(200).json({
      success: true,
      result2,
    });
  } catch (error) {
    console.error("Error in retrieving chat text:", error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  } finally {
    // Close the MongoDB connection
    // await client.close();
  }
});

app.post('/api/trunk', async (req, res) => {
  try {
    const data = req.body
    const db = await connectToDatabase();
    const trunkCollection = db.collection("trunk");
    console.log(data)
    // delete pervious concurrent number
    const result = await trunkCollection.deleteMany({});

    const InsertResponse = await trunkCollection.insertOne(data);

    return res.status(200).json({
      success: true,
      InsertResponse,
    });
  } catch (error) {
    console.error("Error in retrieving chat text:", error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  } finally {
    // Close the MongoDB connection
    // await client.close();
  }
});

app.get('/api/get-trunk', async (req, res) => {
  async function getData() {
    let result = [];
    try {

      const db = await connectToDatabase();
      // db = client.db("salesautomationdb");
      const trunkCollection = db.collection("trunk");

      // Retrieve the concurrent number (assuming you have only one)
      const trunkId = await trunkCollection.findOne();

      result.push({
        success: true,
        response: trunkId,
      });


    } catch (error) {
      console.error("Error in retrieving trunk id:", error);


      result.push({
        success: false,
        message: "Failed to retrieve trunk id.",
      });

    } finally {
      // Close the MongoDB connection
      // await client.close();
    }
    return result;
  };
  const data = await getData(); //add this
// console.log("result", data[0]);
  if(data[0].success){
    res.status(200).json(data[0]);
  }else{
    res.status(500).json(data[0]);
  }

});


/*

app.get("/api", async (request, response) => { //add async
    async function getData() {
        let result = [];
        try {
            await client.connect();
    
            const db = client.db("myDatabase");
            const collection = db.collection("myCollection");
            const cursor = collection.find({});
            for await (const item of cursor) {
                result.push(item);
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await client.close();
        }
        return result;
    };
    const data = await getData(); //add this
    response.send(data);
});

*/