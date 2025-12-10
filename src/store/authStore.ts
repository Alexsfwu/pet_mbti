import { create } from 'zustand'
import { AuthState, User } from '../types'

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

// 模拟认证实现，实际使用时需要替换为真实的Supabase认证
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      // 模拟登录逻辑
      if (email && password) {
        const user: User = {
          id: 'demo-user-id',
          email: email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
        }
        set({ user, isAuthenticated: true, isLoading: false })
      } else {
        throw new Error('邮箱和密码不能为空')
      }
    } catch (error) {
      console.error('Login error:', error)
      set({ isLoading: false })
      throw error
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true })
    try {
      // 模拟注册逻辑
      if (email && password && name) {
        const user: User = {
          id: 'demo-user-id',
          email: email,
          name: name,
          createdAt: new Date().toISOString(),
        }
        set({ user, isAuthenticated: true, isLoading: false })
      } else {
        throw new Error('请填写完整信息')
      }
    } catch (error) {
      console.error('Registration error:', error)
      set({ isLoading: false })
      throw error
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      // 模拟登出逻辑
      set({ user: null, isAuthenticated: false, isLoading: false })
    } catch (error) {
      console.error('Logout error:', error)
      set({ isLoading: false })
    }
  },

  checkAuth: async () => {
    // 模拟认证检查
    set({ isLoading: false })
  },
}))