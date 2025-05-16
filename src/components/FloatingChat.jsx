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
    // Clear unread messages when opening chat
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
      const response = await fetchAIResponse(inputValue);
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

  const fetchAIResponse = async (message) => {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          ...messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  return (
    <div className={`fixed z-50 ${isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'}`}>
      {isOpen ? (
        <div className={`bg-white rounded-lg shadow-xl flex flex-col transition-all duration-200 ${
          isMobile ? 'w-72 h-80' : 'w-80 h-96'
        }`}>
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <button 
              onClick={toggleChat} 
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded-lg ${isMobile ? 'max-w-[90%]' : 'max-w-xs'} ${
                  msg.sender === 'user' 
                    ? 'bg-blue-100 ml-auto' 
                    : 'bg-gray-100 mr-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className={`mb-2 p-2 rounded-lg bg-gray-100 mr-auto ${
                isMobile ? 'max-w-[90%]' : 'max-w-xs'
              }`}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className={`bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all relative
            ${isMobile ? 'p-3' : 'p-4'}`}
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