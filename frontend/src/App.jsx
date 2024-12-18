import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/chat";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AuthProvider from "./components/auth/AuthContext"; // Import the AuthProvider
const App = () => {
  return (
    <div>
      <AuthProvider>
        <Header />
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </div>
  );
};
export default App;
