import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import GroupDetails from "./components/GroupDetails";
import Speech from "./components/Speech";
import Chat from "./components/misc/Chat";
import ConcurrentCalls from "./components/ConcurrentCalls";
import SocketClient from "./socket-client";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/group-details/:id" element={<GroupDetails />} />
        <Route path="/speech" element={<Speech />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/concurrent-calls" element={<ConcurrentCalls  />} />
        <Route path="/socket" element={<SocketClient  />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
