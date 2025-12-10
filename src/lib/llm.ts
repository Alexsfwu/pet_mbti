import { LLMSummary } from '../types'

export async function summarizeMBTIWithLLM(params: {
  mbtiType: string
  answers: number[]
  petName: string
  breed: string
}): Promise<LLMSummary> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  const letters = params.mbtiType.split('')
  if (!apiKey) {
    return buildFallbackLetterSummary(params.mbtiType, params.petName, params.breed)
  }
  const prompt = `请用中文、面向宠物狗的口吻，针对性格类型 ${params.mbtiType} 的四个字母逐一给出简短总结（每段不超过40字），结合犬种「${params.breed}」与名字「${params.petName}」，要求返回严格的JSON：{"E":"...","N":"...","F":"...","P":"..."}（若为I/S/T/J则使用相应字母键）。不要包含额外文本。`
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: '你是一位宠物性格分析师，专注狗狗行为解读。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    })
    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content?.trim()
    const parsed = JSON.parse(content)
    const out: LLMSummary = {}
    letters.forEach((l) => { out[l as keyof LLMSummary] = parsed[l] })
    return out
  } catch (e) {
    return buildFallbackLetterSummary(params.mbtiType, params.petName, params.breed)
  }
}

export function buildFallbackLetterSummary(mbtiType: string, petName: string, breed: string): LLMSummary {
  const map: Record<string, string> = {
    E: `${petName} 喜欢社交，${breed}更显活力`,
    I: `${petName} 安静内敛，${breed}更需稳定环境`,
    N: `${petName} 直觉敏锐，善于探索与联想`,
    S: `${petName} 注重感官体验，偏好熟悉规律`,
    F: `${petName} 情感丰富，亲人黏人更体贴`,
    T: `${petName} 理性冷静，训练中讲规则`,
    P: `${petName} 灵活随性，喜欢自由玩耍`,
    J: `${petName} 有条有理，作息与训练清晰`
  }
  const out: LLMSummary = {}
  mbtiType.split('').forEach((l) => { out[l as keyof LLMSummary] = map[l] })
  return out
}
