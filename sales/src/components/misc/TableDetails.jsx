import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import axios from "axios";

const TableDetail = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [group, setGroup] = useState();
  const [transformedData, setTransfromedData] = useState()
  const [currentChat, setCurrentChat] = useState()

  useEffect(() => {
    axios
      .get(`http://16.163.178.109:9000/api/group/${id}`)
      .then((response) => {
        setGroup(response.data.group);

        let groups = response.data.group

        let groupPhones = groups?.phoneNumbers
        
        let arr = groupPhones?.map((item)=>{
          return item?.number
        })
        axios
        .get("https://www.aivoip.org/aivoip/speech/fetch-chat.php")
        .then((response) => {
          let data = response?.data
  
          let filtered = data?.map((item)=>{
            if(item?.clid){
              if(arr.includes(item?.clid)){
                return item
              }
            }
          })

          filtered = filtered.filter(item => item !== undefined);

  
          const transformedData = filtered?.reduce((result, item) => {
            const { clid, duration, chat, filename } = item;
            if (!result[clid]) {
              result[clid] = {
                duration,
                clid,
                chat: []
              };
            }
            result[clid].chat.push({ chat, filename });
            return result;
          }, {});
          
          const transformedArray = Object.values(transformedData);
          setTransfromedData(transformedArray);
  
        });

      });

  }, []);
  return (
    <div>
      <Modal open={open} setOpen={setOpen} currentChat={currentChat} />
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Called Date Time
              </th>
              <th scope="col" class="px-6 py-3">
                Duration
              </th>
              <th scope="col" class="px-6 py-3">
                Keyword
              </th>
              <th scope="col" class="px-6 py-3 cursor-pointer">
                Detail
              </th>
              <th scope="col" class="px-6 py-3 cursor-pointer">
                Answered
              </th>
            </tr>
          </thead>
          <tbody>

            {transformedData?.map((item) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      class="w-10 h-10 rounded-full"
                      src="/imgs/gallery.svg"
                      alt="Jese image"
                    />
                    <div class="pl-3">
                      <div class="text-base font-semibold">{item?.clid}</div>
                    </div>
                  </th>
                  <td class="px-6 py-4 text-center">Calling</td>
                  <td class="px-6 py-4 text-center">1/1/2023 11:00:00</td>
                  <td class="px-6 py-4 text-center">{item?.duration}</td>
                  <td class="px-6 py-4 text-center">yes</td>
                  <td
                    class="px-6 py-4 text-center cursor-pointer"
                    onClick={() => {
                      setCurrentChat(item?.chat)
                      setOpen(true);
                    }}
                  >
                    <img
                      src="/imgs/dd.svg"
                      style={{
                        background: "#256d85",
                        padding: "0.2rem",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </td>
                  <td class="px-6 py-4 text-center">yes</td>
                </tr>
              );
            })}

            {group?.phoneNumbers.map((item, index) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      class="w-10 h-10 rounded-full"
                      src="/imgs/gallery.svg"
                      alt="Jese image"
                    />
                    <div class="pl-3">
                      <div class="text-base font-semibold">{item?.number}</div>
                    </div>
                  </th>
                  <td class="px-6 py-4 text-center">Calling</td>
                  <td class="px-6 py-4 text-center">1/1/2023 11:00:00</td>
                  <td class="px-6 py-4 text-center">6s</td>
                  <td class="px-6 py-4 text-center">yes</td>
                  <td
                    class="px-6 py-4 text-center cursor-pointer"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <img
                      src="/imgs/dd.svg"
                      style={{
                        background: "#256d85",
                        padding: "0.2rem",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </td>
                  <td class="px-6 py-4 text-center">
                    {item?.chat?.length > 0  ? 'Yes':'No'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDetail;
