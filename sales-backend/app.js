const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = 9000;
const axios = require("axios");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
//Local Host Environment
// const http = require("http");
const socketIO = require('socket.io');

// Server Environment START
const https = require("https");
const fs = require("fs");

const certificatePath = '/etc/letsencrypt/live/aivoip.org/fullchain.pem';
const privateKeyPath = '/etc/letsencrypt/live/aivoip.org/privkey.pem';

const options = {
  key: fs.readFileSync(privateKeyPath),
  cert: fs.readFileSync(certificatePath)
};
// Server Environment END

const uploadsPath = path.join(__dirname, "uploads");

app.use("/uploads", express.static(uploadsPath));
// app.use(cors());
app.use(cors());
app.use(express.json());

// Server Environment
const server = https.createServer(options, app);

//Local Host Environment
// const server = http.createServer(app); // Use 'http' to create an HTTP server

const io = socketIO(server, {
  cors: {
    origin: 'http://16.163.178.109:3000', // Specify the origin you want to allow
    methods: ['GET', 'POST'], // Specify the HTTP methods you want to allow
  }});

io.on('connection', (socket) => {
  console.log('A user connected to the WebSocket.');

  // You can handle events and messages from the connected clients here
  socket.on('chat message', (message) => {
    console.log(message);
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected from the WebSocket.');
  });
});

server.listen(port, () => {
  console.log(`Server is running on https://16.163.178.109:${port}`);
});

app.use("/uploads", express.static(uploadsPath));
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://sales-automation:sales-automation@cluster0.knl0a2f.mongodb.net/?retryWrites=true&w=majority"
async function connectToDatabase() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: "1",
      strict: true,
    },
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
    return client.db("salesautomationdb");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
}

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
  }
});
``

app.get("/api/forwarding", async (req, res) => {
  try {
    // Assuming you have a "forwardingNumbers" collection in your MongoDB
    const db = await connectToDatabase();
    const collection = db.collection("forwardingNumber");

    // Find all forwarding numbers in the collection
    const forwardingNumbers = await collection.find({}).toArray();

    console.log("Fetched all forwarding numbers:", forwardingNumbers);

    return res.status(200).json({
      success: true,
      forwardingNumbers: forwardingNumbers,
    });
  } catch (error) {
    console.error("Error fetching forwarding numbers:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch forwarding numbers.",
    });
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
  }
});

app.get("/api/group/:id", async (req, res) => {
  try {
    const groupId = req.params.id; // Get the group ID from the URL parameters

    const db = await connectToDatabase();
    const collection = db.collection("group");

    // Find the group by its ID
    const group = await collection.findOne({ _id: new ObjectId(groupId) });

    if (!group) {
      // If no group found with the given ID, return a 404 response
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // If the group is found, return it as a response
    return res.status(200).json({
      success: true,
      group: group,
    });
  } catch (error) {
    console.error("Error finding group:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to find group",
    });
  }
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
  }
});


app.get("/api/groups", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("group");

    // Find all group documents in the collection
    const groups = await collection.find({}).toArray();

    console.log("Fetched all groups:", groups);

      // Calculate total phone numbers, total answered, and total duration for each group
    const groupsWithTotals = groups.map((group) => {
      let totalPhoneNumbers = 0;
      let totalAnswered = 0;
      let totalDuration = 0;

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

      return {
        ...group,
        totalPhoneNumbers: totalPhoneNumbers,
        totalAnswered: totalAnswered,
        totalDuration: totalDuration,
      };
    });

    return res.status(200).json({
      success: true,
      groups: groupsWithTotals,
    });
  } catch (error) {
    console.error("Error fetching groups:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch groups.",
    });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("sales_automation_messages");

    const messages = req.body; // The array of messages received in the request body

    // Validate the data to ensure it is an array
    if (!Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data format. Expecting an array of messages.",
      });
    }

    // Insert the array of messages into the "sales_automation_messages" collection
    const result = await collection.insertMany(messages);

    console.log(`${result.insertedCount} messages inserted successfully!`);

    return res.status(201).json({
      success: true,
      message: "Messages inserted successfully!",
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    console.error("Error inserting messages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to insert messages.",
    });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("sales_automation_messages");

    // Find all documents in the "sales_automation_messages" collection
    const messages = await collection.find({}).toArray();

    return res.status(200).json({
      success: true,
      messages: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages.",
    });
  }
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

    const { text, children } = req.body;

    // Update the message document based on the provided data
    const updatedMessage = {
      text: text,
      children: children,
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
  }
});

app.post(
  "/api/upload-audio",
  upload.single("sales_automation_messages"),
  async (req, res) => {
    try {
      const uploadedFile = req.file;

      console.log("hello world");

      if (!uploadedFile) {
        return res.status(400).json({
          success: false,
          message: "No audio file uploaded.",
        });
      }

      const db = await connectToDatabase();
      const collection = db.collection("sales_automation_messages");

      // Save the uploaded file to the collection (you can adjust the storage mechanism as needed)
      // For example, you can use GridFS to store large audio files in Mon````goDB
      const result = await collection.insertOne({ audio: uploadedFile });

      console.log("Audio file uploaded successfully!");

      // Create the link for the uploaded audio file
      const audioLink = `http://16.163.178.109:9000/uploads/${uploadedFile.filename}`;

      // Make a POST request to the specified URL with the audio link as a query parameter
      // const postUrl = `http://103.18.20.195:8080/speech/save-audio-file.php?url=${encodeURIComponent(
      //   audioLink
      // )}`;
      // const response = await axios.get(postUrl);

      console.log("POST request success:", 'response.data');

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
    }
  }
);

app.post("/api/edit-text-message", async (req, res) => {
  try {
    const { currentMessage, currentPara, index } = req.body;
    const db = await connectToDatabase();
    const collection = db.collection("sales_automation_messages");
    const result = await collection.updateOne(
      { _id: new ObjectId("64d204eadd432e73511b0f65") },
      {
        $set: {
          [`messages.${index}.primary`]: currentMessage,
          [`messages.${index}.seconday`]: currentPara,
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
  }
});
