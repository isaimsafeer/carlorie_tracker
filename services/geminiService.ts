
import { GoogleGenAI, Type } from "@google/genai";
import { Nutrients } from "../types";

export interface FoodAnalysisResult {
  foodName: string;
  nutrients: Nutrients;
  confidence: number;
  description: string;
}

export const analyzeFoodImage = async (base64Image: string): Promise<FoodAnalysisResult> => {
  // Use Gemini 3 Pro for high-quality vision analysis
  // Note: Per instructions, we create a new instance right before calling
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image.split(',')[1] || base64Image,
          },
        },
        {
          text: "Analyze this food image. Identify the main food item and estimate its calories, protein, carbs, and fats per serving. Provide the result in JSON format.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          foodName: { type: Type.STRING, description: "Name of the food item" },
          nutrients: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.NUMBER, description: "Total calories (kcal)" },
              protein: { type: Type.NUMBER, description: "Protein content (g)" },
              carbs: { type: Type.NUMBER, description: "Carbohydrates content (g)" },
              fats: { type: Type.NUMBER, description: "Fats content (g)" },
            },
            required: ["calories", "protein", "carbs", "fats"]
          },
          confidence: { type: Type.NUMBER, description: "AI confidence score 0-1" },
          description: { type: Type.STRING, description: "Short summary of ingredients detected" }
        },
        required: ["foodName", "nutrients", "confidence", "description"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text.trim());
};
