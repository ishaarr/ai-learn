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

const generationConfig2 = {
  temperature: 0.8,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


export async function determineCourseType(topic) {
  const prompt = `
  Categorize "${topic}" into one of these academic disciplines:
  [Computer Science, Mathematics, Physics, Chemistry, Biology, 
  Engineering, Business, Humanities, Social Sciences, Medicine, 
  Law, Arts, Language, Health, Other]
  
  Return ONLY the category name. Example: "Quantum Mechanics" → "Physics"
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
    Generate comprehensive study materials for "${topic}" (${courseType}, ${difficultyLevel} level) including:

    1. Detailed chapter outlines with summaries and key points
    2. Flashcards for important concepts
    3. Quiz questions (ONLY MCQs with options and correct answers)
    4. Common Q&A pairs

    Return a JSON response with this exact structure:
    {
      "topic": string,
      "courseType": string,
      "difficultyLevel": string,
      "chapters": [{
        "title": string,
        "notes": string (markdown formatted),
        "summary": string (3-5 paragraphs),
        "key_points": string[] (5-7 bullet points),

        "exam_questions": [{
          "type": "MCQ",
          "question": string,
          "options": string[],
          "answer": string,
          "explanation"?: string
        }]
      }],
      "flashcards": [{
        "front": string,
        "back": string,
        "difficulty": "Easy"|"Medium"|"Hard"
      }],
      "quizzes": [{
        "chapter_title": string,
        "questions": [{
          "type": "MCQ",
          "question": string,
          "options": string[],
          "answer": string
        }]
      }],
      "qa_pairs": [{
        "question": string,
        "answer": string,
        "related_chapter": string?
      }]
    }

    Important:
    - 5-8 chapters
    - Format all content in Markdown for rich text display
    - Each chapter must have 3-5 MCQs with explanations in exam_questions
    - Quiz section must ONLY include MCQs with 4 options and a correct answer
    - Generate 10-15 flashcards
    - Create 8-12 Q&A pairs addressing common questions
    - Use markdown formatting in notes with headers, lists, and code blocks where appropriate
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
      console.error("Failed to parse JSON response:", parseError);
    }
  } catch (error) {
    console.error("Error generating study material:", error);
    throw error; // Re-throw or return a structured error
  }
}

export const generateStudyTypeContentAiModel = model.startChat({
  generationConfig,
  history:
 [
    {
      role: 'user',
      parts: [
        {
          text: 'Generate Flashcards on the topic: Java in JSON format with front back content maximum 20',
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: 'Generate the Flashcards on the topic of Full Stack React Development in JSON format with front back content maximum 15',
        },
      ],
    },
  ]
});
export default generateStudyMaterial;
