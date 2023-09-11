import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from 'axios'


const ConcurrentForm = () => {
    const [formData, setFormData] = useState( {
        sip_ip: "",
        port: "",
        username: "",
        password: "",
    })

    //update handler
    const updateHandler = () => {
        console.log("update handler called ::", formData)
        //update current setting api call
        axios.post("http://16.163.178.109:9001/api/update-setting", formData).then((res) => {
            console.log("response :::", res)
        setFormData({
            sip_ip: res.data.SIP_IP,
            port: res.data.PORT,
            username: res.data.UserName,
            password: res.data.Password,
        });
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
        axios.get("http://16.163.178.109/aivoip/sip/fetch-sip.php").then((res) => {
            console.log('res', res.data)
            setFormData( {
                sip_ip: res.data.SIP_IP,
                port: res.data.PORT,
                username: res.data.UserName,
                password: res.data.Password,
            })
        }).catch((err) => {
            alert('Error Fetching details from Server')
            console.log("error ::", err)
        });

    }, []);


    return <>

        <div class="w-full max-w-xs" style={{ margin: 'auto', marginTop: '10rem' }}>
            <form class="bg-white shadow-lg border-2 rounded px-8 pt-6 pb-8 mb-4">


                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        SIP IP
                    </label>
                    <input
                        name="sip_ip"
                        value={formData?.sip_ip}
                        onChange={handleChange}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="SIP IP" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Port
                    </label>
                    <input
                        name="port"
                        value={formData?.port}
                        onChange={handleChange}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Port" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        UserName
                    </label>
                    <input
                        name="username"
                        value={formData?.username}
                        onChange={handleChange}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Password
                    </label>
                    <input
                        name="password"
                        value={formData?.password}
                        onChange={handleChange}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="password" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Concurrent Calls
                    </label>
                    <input
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
            </form>

        </div>

    </>
}

export default ConcurrentForm