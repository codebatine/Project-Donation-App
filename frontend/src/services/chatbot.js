import axios from 'axios';

export const getChatbotResponse = async (message) => {
  try {
    const response = await axios.post('http://localhost:5000/api/chatbot', {
      message,
    });
    return response.data.reply;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    throw error;
  }
};
