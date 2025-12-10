export interface Question {
  id: number
  text: string
  image?: string
  behavior?: string
}

export interface Answer {
  questionId: number
  value: number
}

export interface MBTIResult {
  type: string
  description: string
  traits: string[]
  compatibility?: string[]
}

export interface TestResult {
  id: string
  userId?: string
  mbtiType: string
  answers: number[]
  petName?: string
  analysis: MBTIResult
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  lastLogin?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LLMSummary {
  E?: string
  I?: string
  N?: string
  S?: string
  F?: string
  T?: string
  P?: string
  J?: string
}
