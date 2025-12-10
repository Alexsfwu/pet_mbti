import { TestResult, MBTIResult } from '../types'
import { mbtiDescriptions } from './mbtiCalculator'

// 模拟数据库
let mockResults: TestResult[] = []
let currentUserId: string | null = null

export const mockSupabase = {
  from: (table: string) => {
    if (table === 'test_results') {
      return {
        insert: (data: any) => ({
          select: () => ({
            single: async () => {
              const result: TestResult = {
                id: `result-${Date.now()}`,
                userId: data.user_id,
                mbtiType: data.mbti_type,
                answers: data.answers,
                analysis: data.analysis,
                createdAt: data.created_at || new Date().toISOString()
              }
              mockResults.unshift(result)
              return { data: result, error: null }
            }
          })
        }),
        
        select: (columns = '*') => ({
          eq: (column: string, value: any) => ({
            order: (orderColumn: string, { ascending }: { ascending: boolean }) => ({
              then: async (callback: Function) => {
                if (column === 'user_id') {
                  const filteredResults = mockResults.filter(r => r.userId === value)
                  const sortedResults = ascending 
                    ? filteredResults.reverse() 
                    : filteredResults
                  
                  callback({ data: sortedResults, error: null })
                  return { data: sortedResults, error: null }
                }
                return { data: [], error: null }
              }
            })
          }),
          
          delete: () => ({
            eq: async (column: string, value: any) => {
              if (column === 'id') {
                mockResults = mockResults.filter(r => r.id !== value)
                return { data: null, error: null }
              }
              return { data: null, error: null }
            }
          })
        })
      }
    }
    
    return {
      select: () => ({
        eq: () => ({
          order: () => ({
            then: async () => ({ data: [], error: null })
          })
        }),
        insert: () => ({
          select: () => ({
            single: async () => ({ data: null, error: null })
          })
        })
      })
    }
  },
  
  auth: {
    getUser: async () => ({ data: { user: currentUserId ? { id: currentUserId } : null }, error: null }),
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      currentUserId = 'demo-user-id'
      return { data: { user: { id: currentUserId, email } }, error: null }
    },
    signUp: async ({ email, password, options }: any) => {
      currentUserId = 'demo-user-id'
      return { data: { user: { id: currentUserId, email, user_metadata: options?.data } }, error: null }
    },
    signOut: async () => {
      currentUserId = null
      return { error: null }
    }
  }
}

// 初始化一些测试数据
export const initializeMockData = () => {
  const sampleResults: TestResult[] = [
    {
      id: 'sample-1',
      userId: 'demo-user-id',
      mbtiType: 'ENFP',
      answers: [1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 2, 1, 4, 2, 1],
      analysis: mbtiDescriptions['ENFP'],
      createdAt: new Date(Date.now() - 86400000).toISOString() // 1天前
    },
    {
      id: 'sample-2',
      userId: 'demo-user-id',
      mbtiType: 'ISTJ',
      answers: [4, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4],
      analysis: mbtiDescriptions['ISTJ'],
      createdAt: new Date(Date.now() - 172800000).toISOString() // 2天前
    }
  ]
  
  mockResults = sampleResults
}