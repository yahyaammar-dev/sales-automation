const Chat = () => {
    return (
        <div className="chatroom bg-white">
            <header className="fixed top-0 left-0 bg-white h-2xl px-10 py-2 w-screen z-10">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold" style={{ color: "#377D8D" }}>Call details</h1>
                    <div className="flex gap-20">
                        <div className="flex gap-2">
                            <button className="bg-gray-300 px-6 py-2 border border-black font-bold rounded-sm">Long Pass</button>
                            <button className="bg-gray-300 px-6 py-2 border border-black font-bold rounded-sm">Short Pass</button>
                        </div>
                        <div className="flex items-center">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <p className="font-serif font-medium text-bold">Testing-083474376473</p>
                        <div className="flex gap-10 mb-5">
                            <p className="">Celler Id: 34345434</p>
                            <p>Call duration: 323</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-blue-500 px-4 py-1 border rounded-xl text-white" style={{ backgroundColor: "#377D8D" }}>To be continued</button>
                        <button className="bg-blue-900 px-4 py-1 border rounded-xl text-white" style={{ backgroundColor: "#677B7C" }}>To be Closed</button>
                    </div>
                    <div className="flex gap-2">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style={{ color: "#377D8D" }}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                            </svg>

                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: "#377D8D" }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: "#377D8D" }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="border border-gray-200">
                </div>
            </header>
            <div className="relative top-32 px-10 py-2 z-0">
                <div className="flex gap-5 my-2">
                    <div>
                        <div className="bg-gray-200 border border-gray-200 rounded-3xl w-12 h-12" />
                    </div>
                    <div>
                        <div className="flex gap-10">
                            <h4 className="text-bold font-serif text-lg">John James </h4>
                            <p>12:00:00</p>
                            <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style={{ color: "#377D8D" }}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                            </svg>
                            </button>
                        </div>
                        <div className="w-3/4">
                            <p className="bg-gray-100 px-4 py-3">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative top-32 px-10 py-2 z-0">
                <div className="flex gap-5 flex-row-reverse my-2">
                    <div>
                        <div className="bg-gray-200 border border-gray-200 rounded-3xl w-12 h-12" />
                    </div>
                    <div className="flex flex-col justify-end">
                        <div className="flex flex-row-reverse gap-10">
                            <h4 className="text-bold font-serif text-lg">John James </h4>
                            <p>12:00:00</p>
                            <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style={{ color: "#377D8D" }}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                            </svg>
                            </button>
                        </div>
                        <div className="flex flex-col justify-end">
                            <p className="self-end px-4 py-3 w-3/4 text-left text-white" style={{ backgroundColor: "#377D8D" }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative top-32 px-10 py-2 z-0">
                <div className="flex gap-5 my-2">
                    <div>
                        <div className="bg-gray-200 border border-gray-200 rounded-3xl w-12 h-12" />
                    </div>
                    <div>
                        <div className="flex gap-10">
                            <h4 className="text-bold font-serif text-lg">John James </h4>
                            <p>12:00:00</p>
                            <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style={{ color: "#377D8D" }}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                            </svg>
                            </button>
                        </div>
                        <div className="w-3/4">
                            <p className="bg-gray-100 px-4 py-3">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;