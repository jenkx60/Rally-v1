'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateEventDescription(title: string, category: string) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      message: "ERROR: API Key not found"
    };
  }

  try {
    // Initialize the Google Gemini AI client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // Create a prompt for the AI
    const prompt = `Write a short, exciting, and engaging event description for an event titled "${title}" in the category "${category}". 
    Keep it under 300 characters. 
    Make it sound fun and inviting. 
    Do not include hashtags or emojis unless they are very relevant.`;

    // Generate the content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Return the generated text
    return {
      success: true,
      description: text.trim()
    };

  } catch (error) {
    console.error("Error generating description:", error);
    return {
      success: false,
      message: `ERROR: ${(error as Error).message}`
    };
  }
}
