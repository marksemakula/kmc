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
  
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

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
    if (!isOpen) setHasUnreadMessages(false);
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
      setMessages(prev => [...prev, { 
        text: getErrorMessage(error),
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error) => {
    if (error.message.includes('API key')) {
      return "Authentication failed. Please check your API key.";
    }
    if (error.message.includes('credit')) {
      return "I'm unable to respond right now (API limit reached).";
    }
    return "Sorry, I'm having trouble connecting. Please try again later.";
  };

  const fetchAIResponse = async (message) => {
    if (!apiKey) {
      console.error('API key is missing');
      throw new Error('API key is missing');
    }

    try {
      console.log('Using API key:', apiKey ? '***REDACTED***' : 'MISSING');
      
      const response = await fetch('/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant. Respond concisely."
            },
            ...messages.filter(msg => msg.sender === 'user').map(msg => ({
              role: "user",
              content: msg.text
            })),
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      console.log('API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error details:', errorData);
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Full API error:', error);
      throw error;
    }
  };

  return (
    <div className={`fixed z-50 ${isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'}`}>
      {isOpen ? (
        <div className={`bg-white rounded-lg shadow-xl flex flex-col ${isMobile ? 'w-72 h-80' : 'w-80 h-96'}`}>
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <FaTimes />
            </button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 p-3 rounded-lg max-w-[80%] ${
                msg.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-200 mr-auto'
              }`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="mb-2 p-3 rounded-lg bg-gray-200 mr-auto max-w-[80%]">
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-gray-500 rounded-full animate-bounce" 
                      style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
              >
                <FaPaperPlane />
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