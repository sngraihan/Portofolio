import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function checkModels() {
    console.log("Checking available models for key ending in:", process.env.GEMINI_API_KEY!.slice(-5));
    try {
        // The official SDK doesn't expose listModels directly easily in all versions, 
        // so let's just make a raw fetch call to the REST API to be sure.
        const response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models?key=\${process.env.GEMINI_API_KEY}\`);
    if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    console.log("Supported Models:");
    data.models.forEach((m: any) => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
            console.log(\`- \${m.name.replace('models/', '')}\`);
        }
    });
  } catch (error) {
    console.error("Failed to list models:", error);
  }
}

checkModels();
