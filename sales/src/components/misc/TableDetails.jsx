import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import axios from "axios";

const TableDetail = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [group, setGroup] = useState();

  const chat = {
    number: '',
    bot: [
      {
        text: 'Hello, Do you want to buy Insurance?',
        audio:'hello.wav',
        matchingKeywords: 'yes',
        date: '29-07-2023'
      },
      {
        text: 'Okay, I am referring you to my manager',
        audio:'hello.wav',
        matchingKeywords: 'Ok',
        date: '29-07-2023'
      }
    ],
    user: [
      {
        text: 'Yes, I want to buy Insurance',
        audio:'hello.wav',
      },
      {
        text: 'Sure thank You',
        audio:'hello.wax'
      }
    ]
  }


  useEffect(() => {
    axios
      .get("http://localhost:9000/api/group/64be23d75409f88aa7a4889d")
      .then((response) => {
        setGroup(response.data.group);
      });


    axios
      .post("http://localhost:9000/api/create-group", 
        {
          name: "My 23",
          phoneNumbers: [
            {
              number: "1234567890",
              callLength: 5,
              callResponse: "Positive",
              chat: [
                {
                  sender: "User",
                  message: "Hello!",
                },
                {
                  sender: "Admin",
                  message: "Hi there!",
                },
              ],
            },
            {
              number: "9876543210",
              callLength: 8,
              callResponse: "Negative",
              chat: [
                {
                  sender: "User",
                  message: "How are you?",
                },
                {
                  sender: "Admin",
                  message: "I'm doing well, thanks!",
                },
              ],
            },
          ],
        },
      )
      .then((response) => {
        console.log(response);
      });
  }, []);
  return (
    <div>
      <Modal open={open} setOpen={setOpen} />
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
            </tr>
          </thead>
          <tbody>
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
