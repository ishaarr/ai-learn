const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 0.8,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export default async function generateStudyMaterial(topic, courseType, difficultyLevel) {
  try {
    const prompt = `
      Generate a study material for **${topic}** for **${courseType}** and the difficulty level will be **${difficultyLevel}**.  
      The study material should include:  
      - A **summary** for each chapter.  
      - A **list of topics** covered in each chapter.  
      - Output format should be **JSON**.  
      
      **Additional Requirements:**  
      - Ensure **clarity and structure**, suitable for students at the specified difficulty level.  
      - Include **exam-style questions** (MCQs, short-answer, and coding problems if applicable).  
      - Provide a **final revision sheet** with key points for quick review.  

      **Example JSON Output Format:**  
      {  
        "topic": "${topic}",  
        "courseType": "${courseType}",  
        "difficultyLevel": "${difficultyLevel}",  
        "chapters": [  
          {  
            "title": "Chapter 1: Introduction",  
            "summary": "This chapter introduces the fundamental concepts of ${topic} and its real-world applications...",  
            "topics": [ "Definition", "History", "Importance", "Key Applications" ],  
            "exam_questions": [  
              { "type": "MCQ", "question": "What is ${topic}?", "options": ["Option A", "Option B"], "answer": "Option A" },  
              { "type": "Short Answer", "question": "Explain the significance of ${topic} in ${courseType}." }  
            ]  
          }  
        ],  
        "revision_sheet": [  
          { "concept": "Key Term 1", "definition": "Definition of Key Term 1" },  
          { "concept": "Formula 1", "definition": "Explanation of Formula 1" }  
        ]  
      }  
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating study material:", error);
    return null;
  }
}

