    import React, { useRef, useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import AudioPlayer from "./AudioPlayer";
    import axios from "axios";

    const apiUrl = process.env.REACT_APP_BASE_URL_LIVE;

    const Modal = ({ open, setOpen, currentChat, id, groupNumber }) => {
    const navigate = useNavigate();
    const [chat, setChat] = useState()
    const [userChat, setUserChat] = useState();
    const [chatData, setChatData] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleHomeNav = () => {
        navigate("/");
    };
    const myref = useRef(null);
    const modalStyles = {
        maxHeight: '80vh', // Set your maximum height as a percentage of the viewport height
        overflowY: 'auto', // Add a scrollbar when content overflows
    };

    const handlePlayMessage = (message) => {
        let newAudioUrl = `http://16.163.178.109/aivoip/speech/${message}`
        let ele = myref.current
        let source = ele.querySelector('source')
        source.src = newAudioUrl || null


        myref.current.pause();
        myref.current.currentTime = 0;


        myref.current.pause();
        myref.current.currentTime = 0;
    
        source.src = newAudioUrl || null;
        myref.current.load(); // Load the new source
    
        // Once the new source is loaded, play the audio
        myref.current.addEventListener('loadeddata', () => {
            myref.current.play();
        });


        // // clear pervious audio so that i can load this newone without interupting pervious load
        // myref.current.load(); 
        // myref.current.play(); 

    }

    useEffect(() => {
        const fetchChatData = () => {
          const data = {
            groupId: id,
            number: groupNumber.number, // Make sure you provide the actual number here
          };
          axios
            .post(`${apiUrl}/api/get-chat-text`, data)
            .then((response) => {
              const chatText = response.data.chatLogs;
              // Update the chat data in your component state
              setChatData(chatText);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching chat text:", error);
            });
        };
    
        if (open) {
            setLoading(true);
          // Fetch chat data when the modal is opened
          fetchChatData();
            console.log(chatData)
            console.dir(chatData);
          // Set up an interval to fetch chat data every 10 seconds
          const intervalId = setInterval(fetchChatData, 10000);
          console.log(chatData)
          // Clean up the interval when the component unmounts or the modal is closed
          return () => clearInterval(intervalId);
        }
      }, [open, id, groupNumber]);

    const [selectedMessage, setSelectedMessage] = useState(null);

  
    

    const combinedMessages = [];
    const maxLength = Math.max(chat?.bot.length, chat?.user?.length);
    for (let i = 0; i < maxLength; i++) {
        if (chat.bot[i]) combinedMessages.push(chat.bot[i]);
        if (chat.user[i]) combinedMessages.push(chat.user[i]);
    }

    return (
        <>
        {open && (
            <>
            <div
                id="readProductModal"
                tabIndex="-1"
                aria-hidden="true"
                className="open overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
            >
                <div className="custom__modal relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="chatroom bg-white font-sans" >
                    <header className=" bg-white h-2xl px-10 py-2 z-10">
                    <div className="flex gap-5 justify-between">
                        <h1
                        className="text-lg font-bold"
                        style={{ color: "#377D8D" }}
                        >
                        Call details
                        </h1>
                        <div className="flex gap-6" >
                        {/* <div className="flex gap-2">
                            <button className="bg-gray-300 text-sm px-1 py-1 border border-black font-medium rounded-sm">
                            Last Pass
                            </button>
                            <button className="bg-gray-300 text-sm px-1 py-1 border border-black font-medium rounded-sm">
                            Next Pass
                            </button>
                        </div> */}
                        <div className="flex items-center">
                            <button>
                            <svg
                                xmlns="http:www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                />
                            </svg>
                            </button>
                        </div>
                        <div className="flex items-center">
                            <button
                            onClick={() => {
                                setOpen(false);
                                setChatData(null)
                            }}
                            >
                            <svg
                                xmlns="http:www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                fill-rule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clip-rule="evenodd"
                                />
                            </svg>
                            </button>
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col gap-2">
                        {/* <p className="font-serif font-medium text-sm">
                            Testing-083474376473
                        </p>
                        <div className="mb-5">
                            <p className="text-sm">Celler Id: 34345434</p>
                            <p className="text-sm">Call duration: 323</p>
                        </div> */}
                        </div>
                        <div className="flex gap-1">
                        {/* <button
                            className="bg-blue-500 text-xs px-1 py-1 border rounded-xl text-white"
                            style={{ backgroundColor: "#377D8D" }}
                        >
                            To be screend
                        </button>
                        <button
                            className="bg-blue-900 text-xs px-1 py-1 border rounded-xl text-white"
                            style={{ backgroundColor: "#677B7C" }}
                        >
                            To be classified
                        </button> */}
                        </div>
                        <div className="flex gap-2">
                        {/* <button>
                            <svg
                            xmlns="http:www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                            style={{ color: "#377D8D" }}
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                            />
                            </svg>
                        </button> */}
                        {/* <button>
                            <svg
                            xmlns="http:www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                            style={{ color: "#377D8D" }}
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                            </svg>
                        </button> */}
                        {/* <button>
                            <svg
                            xmlns="http:www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                            style={{ color: "#377D8D" }}
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                            />
                            </svg>
                        </button> */}
                        </div>
                    </div>
                    <div className="border border-gray-200"></div>
                    </header>
                    <div style={modalStyles}>
                    { loading ? ( <div className="custom__modal relative p-10 text-center w-full max-w-2xl h-full md:h-auto">Loading...</div> ) : (
                    chatData?.length === 0 ? (
                        <div className="custom__modal relative p-10 text-center w-full max-w-2xl h-full md:h-auto">
                        <p>No chat data available.</p>
                        </div>
                        ) : (
                        chatData?.map((item, index)=>{
                            console.log(item.text)
                            return <>
                              <div className="px-10 py-2 z-0" key={index}>
                            {item?.user  == 'bot' ? (
                                <div className="flex gap-5 my-2">
                                
                                <img src="/imgs/bot.svg" alt="Bot Avatar" />
                                <div>
                                    <div className="div flex justify-between">
                                    <div className="flex items-center justify-start gap-2">
                                        <h4 className="text-bold font-serif text-lg">
                                        Bot
                                        </h4>
                                        <button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-10 h-10 "
                                            style={{ color: "#377D8D" }}
                                        >
                                            <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                            <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                            />
                                        </svg>
                                        </button>
                                    </div>
                                    <div className="flex">
                                        <p>
                                            Date: {item?.date}
                                        </p>
                                    </div>
                                    </div>
                                    <div className="w-4/5 border rounded-lg">
                                    <p className="bg-gray-100 px-4 py-3">
                                        {item?.text ? item?.text : 'No Proper Response Found'}
                                    </p>
                                    </div>
                                </div>
                                </div>
                            ) : (
                                <div className="flex gap-5 flex-row-reverse my-2">
                              
                                <div className="bg-gray-200 border border-gray-200 rounded-3xl w-12 h-12" />
                                <div className="flex flex-col justify-end">
                                    <div className="flex items-center justify-start flex-row-reverse gap-10">
                                    <h4 className="text-bold font-serif text-lg">
                                        User
                                    </h4>
                                    <p>{item?.start_time ? item?.start_time : 'No Proper Response Found'}</p>
                                    <button>
                                        {/* User Icon */}
                                        <svg
                                        xmlns="http:www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-10 h-10"
                                        style={{ color: "#377D8D" }}
                                        >
                                        <svg
                                            xmlns="http:www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                            style={{ color: "#377D8D" }}
                                        >
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                            />
                                        </svg>
                                        </svg>
                                    </button>
                                    </div>
                                    <div className="flex flex-col justify-end">
                                    <p
                                        className="self-end px-4 border rounded-lg py-3 w-4/5 text-left text-white"
                                        style={{ backgroundColor: "#377D8D" }}
                                    >
                                       {item?.text ? item.text : 'No Proper Response Found'}
                                    </p>
                                    </div>
                                </div>
                                </div>
                            )
                            }
                            </div>
                            </>
                          
                        })))
                    }

                    {/* {selectedMessage && (
                    <audio ref={audioRef} controls >
                         <source src='http://103.18.20.195:8080/speech/1001-1690571848.52-1690571850.wav' type="audio/wav" />
                    </audio>
                    )} */}
                     <audio ref={myref} controls style={{display: 'none'}}>
                         <source src='http://103.18.20.195:8080/speech/1001-1690571848.52-1690571850.wav'  type="audio/wav" />
                    </audio>
                    </div>
                </div>
                </div>
            </div>
            </>
        )}
        </>
    );
    };

    export default Modal;
