import React, { useState, useEffect } from "react"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import axios from 'axios';
const apiURL = process.env.REACT_APP_BASE_URL_LIVE;


const ConcurrentForm = () => {
    const { id } = useParams();
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [concur, setConcur] = useState()
    const [formData, setFormData] = useState({
        SIP_IP: "",
        Port: "",
        UserName: "",
        Password: "",
    })

    //update handler
    const updateHandler = () => {
        console.log("update handler called ::", formData)
        //update current setting api call
        axios.post(`${apiURL}/api/updateSetting`, formData).then((res) => {
            setFormData({
                SIP_IP: res.data.SIP_IP,
                Port: res.data.Port,
                UserName: res.data.UserName,
                Password: res.data.Password,
            });
        }).catch((err) => {
            console.log("error ::", err)
        });

        const conData = {
            con: concur
          };

        axios.post(`${apiURL}/api/concurrent-number`, conData).then((res) => {
            console.log("response :::", res)
        }).catch((err) => {
            console.log("error ::", err)
        });


        alert('Updated Concurrent Number in FreePbx')
    }

    //handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {


        axios.get(`${apiURL}/api/getSipSetting`).then((res) => {
            console.log('res', res.data.data)
            setFormData({
                SIP_IP: res.data.data.SIP_IP,
                Port: res.data.data.Port,
                UserName: res.data.data.UserName,
                Password: res.data.data.Password,
            })
        }).catch((err) => {
            alert('Error Fetching details from Server')
            console.log("error ::", err)
        });

        axios.get(`${apiURL}/api/concurrent-number`)
            .then((res) => {
                setConcur(res?.data?.concurrentNumber?.con)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);






    return <>

        <div class="w-full max-w-xs" style={{ margin: 'auto', marginTop: '10rem' }}>
            <form class="bg-white shadow-lg border-2 rounded px-8 pt-6 pb-8 mb-4">


                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        SIP IP
                    </label>
                    <input
                        name="SIP_IP"
                        value={formData?.SIP_IP}
                        onChange={handleChange}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="SIP IP" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Port
                    </label>
                    <input
                        name="Port"
                        value={formData?.Port}
                        onChange={handleChange}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Port" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        UserName
                    </label>
                    <input
                        name="UserName"
                        value={formData?.UserName}
                        onChange={handleChange}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>

                <div class="mb-4" style={{ position: "relative" }}>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Password
                    </label>
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        name="Password"
                        value={formData?.Password}
                        onChange={handleChange}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        placeholder="password" />
                    <span className="password-toggle" style={{
                        position: "absolute",
                        top: "2.5rem",
                        right: " 1rem",
                    }} onClick={() => setPasswordVisible(!passwordVisible)}>
                        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Concurrent Calls
                    </label>
                    <input
                        value={concur}
                        onChange={(e) => { setConcur(e.target.value) }}
                        name="concurrent Calls"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Concurrent Calls" />
                </div>


                {/* <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Concurrent Calls
                    </label>
                    <input
                        name="concurrent_call"
                        value={formData?.concurrent_call}
                        onChange={handleChange}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Concurrent Connection" />
                </div> */}

                <div class="flex items-center justify-between">
                    <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => {
                        updateHandler()
                    }}>
                        Update
                    </button>

                </div>
            </form >

        </div >

    </>
}

export default ConcurrentForm