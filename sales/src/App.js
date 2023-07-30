import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import GroupDetails from "./components/GroupDetails";
import Speech from "./components/Speech";
import Chat from "./components/misc/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/group-details/:id" element={<GroupDetails />} />
        <Route path="/speech" element={<Speech />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
