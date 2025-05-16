import { useState, useRef, useEffect } from 'react';
import { FaComment, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const FloatingChat = ({ apiKey, initialMessage = "Hello! How can I help you today?" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: initialMessage, sender: 'bot' }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Detect mobile view
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // On desktop, open by default; on mobile, start as icon
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  // Track unread messages when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasUnreadMessages(true);
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnreadMessages(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await mockAIResponse(inputValue); // Using mock for now
      const botMessage = { text: response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = { 
        text: "Sorry, I'm having trouble connecting. Please try again later.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock response function for testing UI
  const mockAIResponse = async (message) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`This is a mock response to: "${message}". The API connection is being tested.`);
      }, 1000);
    });
  };

  return (
    <div className={`fixed z-50 ${isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'}`}>
      {isOpen ? (
        <div className={`bg-white rounded-lg shadow-xl flex flex-col ${isMobile ? 'w-72 h-80' : 'w-80 h-96'}`}>
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold text-lg">AI Assistant</h3>
            <button 
              onClick={toggleChat} 
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close chat"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          
          {/* Messages Container */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                  msg.sender === 'user' 
                    ? 'bg-blue-100 ml-auto' 
                    : 'bg-gray-200 mr-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="mb-3 p-3 rounded-lg bg-gray-200 mr-auto max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                aria-label="Send message"
              >
                <FaPaperPlane className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className={`bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all relative ${
            isMobile ? 'p-3' : 'p-4'
          }`}
          aria-label="Open chat"
        >
          <FaComment size={isMobile ? 20 : 24} />
          {hasUnreadMessages && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              !
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default FloatingChat;