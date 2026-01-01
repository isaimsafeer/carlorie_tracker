import { GoogleGenAI } from "@google/genai";

export interface FoodAnalysisResult {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  confidence: number;
  description: string;
}

export const analyzeFoodImage = async (
  base64Image: string
): Promise<FoodAnalysisResult> => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || "",
  });

  const response = await ai.models.generateContent({
    // ✅ THIS MODEL EXISTS on v1beta
    model: "gemini-2.5-flash",

    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: (() => {
                const cleanData = base64Image.includes(",")
                  ? base64Image.split(",")[1]
                  : base64Image;
                console.log("Image Data Length:", cleanData.length);
                console.log("Image Data Prefix:", cleanData.substring(0, 20));
                return cleanData;
              })(),
            },
          },
          {
            text: `
Analyze this food image and return ONLY valid JSON.

JSON format:
{
  "foodName": string,
  "calories": number,
  "protein": number,
  "carbs": number,
  "fats": number,
  "confidence": number, // 0 to 1
  "description": string
}

Do not include markdown.
Do not include explanations.
Return JSON only.
            `.trim(),
          },
        ],
      },
    ],
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  // Defensive JSON extraction (Flash can add whitespace)
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("Invalid JSON returned by Gemini");
  }

  return JSON.parse(text.slice(jsonStart, jsonEnd + 1));
};
