import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from './misc/Sidebar';
import Navbar from './misc/Navbar';
import Button from "./misc/Button";

function Setting() {

    const navigate = useNavigate();
    const [settings, setSettings] = useState([
        {
            id: "1",
            sip_ip: "16.163.178.109",
            port: "8000",
            username: "1601",
            password: "ab975@yTpL9",
        }
    ]);

    console.log('are you even there?')
 


    //update setting 
    const updateHandler = (id) => {
        console.log("update handler", id)
        navigate(`/concurrent-calls`)
    }
    // delete setting 
    const deleteHandler = (id) => {
        console.log("delete handler")

    }

    useEffect(() => {
        //here call get setting list api
        // axios.get("http://16.163.178.109:9001/api/settings").then((res) => {
        //     console.log("response :::", res)
        // setSettings();
        // }).catch((err) => {
        //     console.log("error ::", err)
        // });
    }, [])


    return (
        <div class="flex h-screen">
            <div class="w-2/12 h-screen"><Sidebar /></div>
            <div class="mainBg w-10/12">
                <div style={{ padding: "2rem" }}>
                    <Navbar />
                    {/* <Modal open={open} setOpen={setOpen} currentChat={currentChat} /> */}
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                        <div className="w-2/12" style={{ float: "right", margin: "0.5rem 0" }}>
                            <Button onClick={() => navigate("/concurrent-calls")} icon={'/imgs/plus.png'} text='Add Setting' active />
                        </div>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3  text-center">
                                        SIP IP
                                    </th>
                                    <th scope="col" class="px-6 py-3  text-center">
                                        PORT
                                    </th>
                                    <th scope="col" class="px-6 py-3  text-center">
                                        USER NAME
                                    </th>
                                    <th scope="col" class="px-6 py-3  text-center">
                                        PASSWORD
                                    </th>
                                    <th scope="col" class="px-6 py-3  text-center">
                                        CONCURRENT CALLS
                                    </th>
                                    <th scope="col" class="px-6 py-3 cursor-pointer  text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>


                                {settings?.map((item, index) => {
                                    return (
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                class="flex justify-center  items-center  py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {/* <div class="">
                                                    <div class="text-base font-semibold">{item?.sip_ip}</div>
                                                </div> */}

                                                <td class="px-6 py-0 text-center">{item?.sip_ip}</td>
                                            </th>
                                            <td class="px-6 py-0 text-center">{item?.port}</td>
                                            <td class="px-6 py-0 text-center">{item?.username}</td>
                                            <td class="px-6 py-0 text-center">{item?.password}</td>
                                            <td class="px-6 py-0 text-center">{item?.concurrent_call}</td>
                                            <td
                                                class="flex items-center px-6 py-4 text-center cursor-pointer"
                                            // onClick={() => {
                                            //     setOpen(true);
                                            // }}
                                            >
                                                <img className='py-0' src="/imgs/edit.svg" onClick={() => updateHandler(item)} />
                                                <img className='py-0' src="/imgs/delete.svg" onClick={() => deleteHandler(item?.id)} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting
