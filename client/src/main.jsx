import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Chat from "./Chat/main";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="chats" element={<Chat />} />
      <Route path="/" element={<App />}>
        {/* <Route index element={<Home />} /> */}

        {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
