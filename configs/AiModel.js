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

export const generateNotesAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate exam material detail content for each chapter, Make sure to include all topics point in the content, make sure to give content in html format (DO NOT ADD HTML, HEAD, BODY, TITLE, TAG), the chapters\n\n\n\n\"title\": \"Chapter 1: Introduction to React\",\n      \"summary\": \"This chapter introduces the fundamental concepts of React, explaining what it is and why it's used in modern web development. We'll cover React's core features and benefits.\",\n      \"topics\": [\n        \"What is React?\",\n        \"React's Key Features (Component-Based Architecture, Virtual DOM)\",\n        \"Benefits of Using React\",\n        \"Setting up a Development Environment (Node.js, npm/yarn)\""},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```html\n<div>\n  <h2>Chapter 1: Introduction to React - Exam Material</h2>\n\n  <h3>Key Concepts & Topics:</h3>\n\n  <h4>What is React?</h4>\n  <ul>\n    <li>Define React: A JavaScript library for building user interfaces.</li>\n    <li>Explain its primary purpose: Creating reusable UI components and managing application state.</li>\n    <li>Differentiate React from frameworks like Angular and Vue.js (mention key differences, not detailed comparison).</li>\n  </ul>\n\n  <h4>React's Key Features</h4>\n  <ul>\n    <li><b>Component-Based Architecture:</b>\n      <ul>\n        <li>Define a component: A self-contained, reusable piece of UI.</li>\n        <li>Explain how applications are built by composing components.</li>\n        <li>Discuss the advantages of component-based architecture (e.g., reusability, maintainability).</li>\n      </ul>\n    </li>\n    <li><b>Virtual DOM:</b>\n      <ul>\n        <li>Explain what the Virtual DOM is: An in-memory representation of the actual DOM.</li>\n        <li>Describe how React uses the Virtual DOM to optimize updates: By comparing it to the actual DOM and only updating the necessary parts.</li>\n        <li>Explain the concept of \"diffing\" and \"reconciliation\".</li>\n        <li>Understand the performance benefits of using the Virtual DOM.</li>\n      </ul>\n    </li>\n  </ul>\n\n  <h4>Benefits of Using React</h4>\n  <ul>\n    <li><b>Increased Reusability:</b> Explain how components can be reused across different parts of an application.</li>\n    <li><b>Improved Maintainability:</b> Explain how component-based architecture makes code easier to understand and maintain.</li>\n    <li><b>Enhanced Performance:</b> Explain how the Virtual DOM optimizes updates and improves performance.</li>\n    <li><b>Strong Community Support:</b> Mention the large and active React community and the availability of resources.</li>\n    <li><b>SEO Friendly:</b> React can be used for server-side rendering to improve SEO.</li>\n  </ul>\n\n  <h4>Setting up a Development Environment</h4>\n  <ul>\n    <li><b>Node.js:</b>\n      <ul>\n        <li>Explain what Node.js is: A JavaScript runtime environment that allows you to run JavaScript outside of a web browser.</li>\n        <li>Why Node.js is required for React development (for running build tools and managing dependencies).</li>\n      </ul>\n    </li>\n    <li><b>npm/yarn:</b>\n      <ul>\n        <li>Explain what npm and yarn are: Package managers for JavaScript.</li>\n        <li>Explain how they are used to install and manage React dependencies (libraries, tools).</li>\n        <li>Basic commands: `npm install`, `yarn add`, `npm start`, `yarn start`.</li>\n      </ul>\n    </li>\n  </ul>\n</div>\n```"},
      ],
    },
  ],
});


