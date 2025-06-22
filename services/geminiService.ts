
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Project } from "../types";

let ai: GoogleGenAI | null = null;
const API_KEY_STRING = typeof process.env.API_KEY === 'string' && process.env.API_KEY.trim() !== '' ? process.env.API_KEY.trim() : null;

if (!API_KEY_STRING) {
  console.warn("API_KEY for Gemini is not set or is invalid. Please set the process.env.API_KEY environment variable. Gemini features will be disabled.");
} else {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY_STRING });
    console.info("Gemini AI client initialized.");
  } catch (error) {
    console.error("Failed to initialize Gemini AI client:", error);
    ai = null; // Ensure ai is null if initialization fails
  }
}

const GITHUB_REPO_REGEX = new RegExp('https?://github\\.com/([^/]+)/([^/]+)');

const extractRepoDetails = (repoUrl: string): { owner: string; name: string } | null => {
  if (typeof repoUrl !== 'string') return null;
  const match = repoUrl.match(GITHUB_REPO_REGEX);
  if (match && match[1] && match[2]) {
    return { owner: match[1], name: match[2] };
  }
  return null;
};

interface GeneratedProjectData {
  name: string;
  description: string;
  tags: string[];
}

export const generateProjectDescriptionFromGitHub = async (
  repoUrl: string
): Promise<Omit<Project, 'id' | 'imageUrl' | 'liveUrl'>> => {
  if (!API_KEY_STRING) {
    throw new Error("Gemini API key is not configured. Project generation disabled.");
  }
  if (!ai) {
    throw new Error("Gemini AI client is not initialized. Check API key and logs.");
  }

  const repoDetails = extractRepoDetails(repoUrl);
  const repoName = repoDetails ? repoDetails.name : "this GitHub repository";

  const prompt = `
    You are an expert technical writer for developer portfolios.
    Given the GitHub repository URL: ${repoUrl}
    (Repository name: ${repoName})

    Please generate a concise and engaging project description (2-3 sentences).
    Highlight its main purpose and key technologies used, if discernible from the name or common patterns associated with such projects.

    Format your response as a JSON object with the following structure:
    {
      "name": "Project Name (use the repository name, or a user-friendly version)",
      "description": "The generated project description.",
      "tags": ["Technology1", "Technology2", "KeyFeature"]
    }

    Example of a good description:
    "This project, ${repoName}, is a [type of application, e.g., web utility] that [main_purpose]. It leverages [Technology1] and [Technology2] to deliver [key_benefit_or_feature]."

    Ensure the 'tags' array contains relevant technologies or keywords.
    If the repository name is generic (e.g., 'project', 'app'), try to infer a more descriptive name if possible, otherwise use the repository name.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17", 
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const matchJson = jsonStr.match(fenceRegex);
    if (matchJson && matchJson[2]) {
      jsonStr = matchJson[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr) as GeneratedProjectData;

    if (!parsedData.name || !parsedData.description || !Array.isArray(parsedData.tags)) {
        throw new Error("Invalid JSON structure received from Gemini API.");
    }

    return {
      name: parsedData.name,
      description: parsedData.description,
      tags: parsedData.tags,
      repoUrl: repoUrl,
    };
  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    let fullErrorMessage = "Failed to generate project description.";
    if (error instanceof Error && error.message) {
        fullErrorMessage = `${fullErrorMessage} Details: ${error.message}`;
    } else if (typeof error === 'string') {
        fullErrorMessage = `${fullErrorMessage} Details: ${error}`;
    }
    throw new Error(fullErrorMessage);
  }
};
