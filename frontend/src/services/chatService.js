import { ChatOpenAI } from 'langchain/chat_models/openai';

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo',
});

export const askChatbot = async (message) => {
  try {
    const response = await llm.invoke(message);
    return response?.text || "Sorry, I couldn't understand your question.";
  } catch (error) {
    console.error('Error communicating with the AI chatbot:', error);
    return 'An error occurred. Please try again later.';
  }
};
