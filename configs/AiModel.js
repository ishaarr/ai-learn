import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate API key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Updated to latest model
});

const generationConfig = {
  temperature: 0.8,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function determineCourseType(topic) {
  const prompt = `
  Based on the topic "${topic}", determine the most appropriate course type from these categories:
  - Computer Science
  - Mathematics
  - Physics
  - Chemistry
  - Biology
  - Engineering
  - Business
  - Humanities
  - Social Sciences
  - Medicine
  - Law
  - Arts
  - Others
  
  Return ONLY the category name as a string. For example, if the topic is "Quantum Mechanics", return "Physics".
  `;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { ...generationConfig, responseMimeType: "text/plain" },
  });

  const response = await result.response;
  return response.text().trim();
}
async function generateStudyMaterial({ topic, courseType, difficultyLevel }) {
  try {
    const prompt = `
    Generate comprehensive study material for ${topic} (${courseType}, ${difficultyLevel} level).
    Return a well-structured JSON response with:
    - Chapter-wise summaries
    - Topics covered
    - Exam-style questions
    - Final revision sheet
    
    Format:
    {
      "topic": string,
      "courseType": string,
      "difficultyLevel": string,
      "chapters": [{
        "title": string,
        "summary": string,
        "topics": string[],
        "exam_questions": [{
          "type": "MCQ"|"Short Answer"|"Coding Problem",
          "question": string,
          "options"?: string[], // for MCQs
          "answer": string
        }]
      }],
      "revision_sheet": [{
        "concept": string,
        "definition": string
      }]
    }
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text); // Parse the JSON response
    } catch (parseError) {
      console.error("Failed to parse JSON response:", text);
      throw new Error("Received malformed response from AI model");
    }
    
  } catch (error) {
    console.error("Error generating study material:", error);
    throw error; // Re-throw or return a structured error
  }
}

export default generateStudyMaterial;