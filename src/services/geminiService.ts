import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateTikTokScript(theme: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Génère un script TikTok viral complet pour le thème suivant : "${theme}".
      Le script doit inclure :
      1. Un Hook (Les 3 premières secondes pour arrêter le scroll)
      2. Le Storytelling/Contenu (Le corps de la vidéo)
      3. Un Call to Action (Engagement : like, follow, share)
      4. Suggestion de texte à l'écran (Overlays)
      5. Suggestion de musique de fond (Vibe)
      
      Formatte la réponse en sections claires avec des titres en gras. Utilise un ton dynamique et captivant adapté à l'audience francophone (Cameroun, France, etc.).`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Impossible de générer le script. Vérifiez votre connexion ou clé API.");
  }
}
