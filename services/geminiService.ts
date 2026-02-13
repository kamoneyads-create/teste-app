
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, AIInsight } from "../types";

export const analyzeSpending = async (transactions: Transaction[]): Promise<AIInsight[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const transactionsSummary = transactions.map(t => ({
    type: t.type,
    amount: t.amount,
    category: t.category,
    description: t.description
  }));

  const prompt = `Analise o seguinte histórico de transações financeiras e forneça 3 dicas/insights acionáveis e estratégicos para ajudar o usuário a economizar ou gerenciar melhor o dinheiro. Retorne exatamente 3 itens.
  
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
              title: { type: Type.STRING, description: 'Um título curto e chamativo para o insight' },
              description: { type: Type.STRING, description: 'Uma explicação detalhada e útil' },
              priority: { type: Type.STRING, enum: ['low', 'medium', 'high'], description: 'Nível de urgência/impacto' }
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
        title: "Dica de Reserva de Emergência",
        description: "Com base no seu perfil, recomendamos criar uma reserva equivalente a 6 meses de gastos essenciais.",
        priority: "high"
      },
      {
        title: "Analise seus gastos em Lazer",
        description: "Parece que há espaço para otimização em assinaturas ou saídas frequentes.",
        priority: "medium"
      }
    ];
  }
};
