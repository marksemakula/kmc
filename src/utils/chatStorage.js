export const saveChatHistory = (messages) => {
  try {
    localStorage.setItem('deepseek_chat_history', JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

export const loadChatHistory = () => {
  try {
    const savedChat = localStorage.getItem('deepseek_chat_history');
    return savedChat ? JSON.parse(savedChat) : null;
  } catch (error) {
    console.error('Error loading chat history:', error);
    return null;
  }
};