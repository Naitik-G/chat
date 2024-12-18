import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../components/auth/AuthContext';
import ChatBox from '../components/chat/chatBox';
import ChatInput from '../components/chat/chatInput';

const socket = io('http://localhost:5000');

const Chat = () => {
  const { user } = useAuth(); // Removed 'login'
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit('sendMessage', message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div>
      <ChatBox messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
