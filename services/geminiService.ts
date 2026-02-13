
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, AIInsight } from "../types";

export const analyzeSpending = async (transactions: Transaction[]): Promise<AIInsight[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'FAKE_API_KEY_FOR_DEVELOPMENT' });
  
  const transactionsSummary = transactions.map(t => ({
    type: t.type,
    amount: t.amount,
    category: t.category,
    description: t.description
  }));

  const prompt = `Analise o seguinte histÃÂ³rico de transaÃÂ§ÃÂµes financeiras e forneÃÂ§a 3 dicas/insights acionÃÂ¡veis e estratÃÂ©gicos para ajudar o usuÃÂ¡rio a economizar ou gerenciar melhor o dinheiro. Retorne exatamente 3 itens.
  
  Dados: ${JSON.stringify(transactionsSummary)}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'Um tÃÂ­tulo curto e chamativo para o insight' },
              description: { type: Type.STRING, description: 'Uma explicaÃÂ§ÃÂ£o detalhada e ÃÂºtil' },
              priority: { type: Type.STRING, enum: ['low', 'medium', 'high'], description: 'NÃÂ­vel de urgÃÂªncia/impacto' }
            },
            required: ['title', 'description', 'priority']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Erro ao analisar com Gemini:", error);
    return [
      {
        title: "Dica de Reserva de EmergÃÂªncia",
        description: "Com base no seu perfil, recomendamos criar uma reserva equivalente a 6 meses de gastos essenciais.",
        priority: "high"
      },
      {
        title: "Analise seus gastos em Lazer",
        description: "Parece que hÃÂ¡ espaÃÂ§o para otimizaÃÂ§ÃÂ£o em assinaturas ou saÃÂ­das frequentes.",
        priority: "medium"
      }
    ];
  }
};
