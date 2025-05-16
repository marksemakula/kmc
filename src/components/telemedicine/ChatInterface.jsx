import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage, simulateDoctorResponse } from '../../store/slices/telemedicineSlice';
import { FaPaperPlane, FaVideo, FaPhoneAlt } from 'react-icons/fa';

const mockResponses = [
  "How can I help you today?",
  "Could you describe your symptoms in more detail?",
  "I understand your concern. Let me ask a few questions to better assess the situation.",
  "Based on what you've described, I would recommend...",
  "Is there anything else you'd like to discuss?"
];

export default function ChatInterface() {
  const dispatch = useDispatch();
  const currentChat = useSelector(state => state.telemedicine.currentChat);
  const activeChats = useSelector(state => state.telemedicine.activeChats);
  const doctors = useSelector(state => state.telemedicine.doctors);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  const currentDoctor = useMemo(() => 
    doctors.find(d => d.id === currentChat),
    [doctors, currentChat]
  );

  const messages = useMemo(() => 
    currentChat ? activeChats[currentChat] || [] : [],
    [currentChat, activeChats]
  );

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !currentChat) return;

    dispatch(sendMessage({
      doctorId: currentChat,
      message: message.trim(),
      isUser: true
    }));

    setMessage('');

    // Simulate doctor response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      dispatch(simulateDoctorResponse({
        doctorId: currentChat,
        message: randomResponse
      }));
    }, 2000);
  };

  if (!currentChat) {
    return (
      <div className="h-full bg-white rounded-lg shadow-lg flex items-center justify-center">
        <p className="text-gray-500 text-lg">Select a doctor to start consultation</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
      <div className="p-4 bg-primary text-white flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={currentDoctor?.avatar}
            alt={currentDoctor?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold">{currentDoctor?.name}</h2>
            <p className="text-sm opacity-90">{currentDoctor?.specialty}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="text-white hover:text-accent transition-colors">
            <FaPhoneAlt />
          </button>
          <button className="text-white hover:text-accent transition-colors">
            <FaVideo />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.isUser
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
}