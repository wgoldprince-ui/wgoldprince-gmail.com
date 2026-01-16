import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askProductConcierge = async (product: Product, question: string): Promise<string> => {
  try {
    const prompt = `
      Você é um especialista em produtos da Apple (Genius) trabalhando na loja de luxo 'Galeria Apple' em Angola.
      O cliente está visualizando o produto: ${product.name}.
      
      Detalhes do produto:
      - Descrição: ${product.description}
      - Especificações: ${JSON.stringify(product.specs)}
      - Preço: Kz ${product.price.toLocaleString('pt-AO')}
      
      O cliente perguntou: "${question}"
      
      Responda de forma curta, elegante, útil e persuasiva, mantendo um tom premium e sofisticado.
      Se a pergunta for irrelevante ao produto, redirecione gentilmente para os recursos do iPhone/Apple.
      Use no máximo 3 frases.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Desculpe, não consegui consultar as informações no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Nossos especialistas estão ocupados no momento. Por favor, tente novamente em instantes.";
  }
};