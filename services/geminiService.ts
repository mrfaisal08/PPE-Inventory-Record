
import { GoogleGenAI } from "@google/genai";
import { IPPERecord } from "../types";

export const getSafetyInsights = async (history: IPPERecord[], query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';

  const historySummary = history.length > 0 
    ? history.map(h => `${h.date}: ${h.requestorName} from ${h.vesselName} took ${h.quantity}x ${h.itemName}`).join('\n')
    : "No history recorded yet.";

  const prompt = `
    You are a Maritime Safety and Logistics AI Expert. 
    Below is the recent PPE usage history for the fleet:
    ---
    ${historySummary}
    ---
    User Query: ${query}

    Based on the history and general maritime safety protocols (MARPOL, SOLAS), provide a concise insight or answer. 
    Focus on safety compliance, stock trends, or specific advice for the requested task.
    Return the response in markdown format.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "I'm having trouble analyzing the data right now. Please try again later.";
  }
};

export const predictPPERequirement = async (taskDescription: string) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    
    const prompt = `
        Given the following maritime task: "${taskDescription}"
        List the essential PPE items required for safety compliance.
        Provide brief reasoning for each.
        Return as a structured list.
    `;

    try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });
        return response.text;
    } catch (error) {
        return "Could not generate requirements.";
    }
};
