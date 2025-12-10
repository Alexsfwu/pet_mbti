import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { TestResult } from '../types'
import { ArrowLeft, Calendar, Heart, RotateCcw, Trash2, User } from 'lucide-react'

const History: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()
  const [results, setResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    fetchResults()
  }, [isAuthenticated, user])

  const fetchResults = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      // 模拟获取历史数据
      // 在实际应用中，这里会从Supabase获取数据
      const mockResults: TestResult[] = [
        {
          id: 'demo-result-1',
          userId: user.id,
          mbtiType: 'ENFP',
          answers: [1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 2, 1, 4, 2, 1],
          analysis: {
            type: 'ENFP',
            description: '外向直觉情感感知型 - 热情洋溢的探险家',
            traits: ['活泼好动', '好奇心强', '容易兴奋', '喜欢社交', '富有创意'],
            compatibility: ['适合活跃的家庭', '喜欢户外活动', '需要大量关注和互动']
          },
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'demo-result-2',
          userId: user.id,
          mbtiType: 'ISTJ',
          answers: [4, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4],
          analysis: {
            type: 'ISTJ',
            description: '内向感觉思维判断型 - 可靠稳重的守护者',
            traits: ['稳重可靠', '有规律', '忠诚守护', '谨慎小心', '责任心强'],
            compatibility: ['适合安静的家庭', '喜欢规律的生活', '是优秀的看家犬']
          },
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ]
      
      setResults(mockResults)
    } catch (error) {
      console.error('获取历史记录失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewResult = (result: TestResult) => {
    navigate('/result', {
      state: {
        resultId: result.id,
        mbtiType: result.mbtiType,
        analysis: result.analysis,
        answers: result.answers
      }
    })
  }

  const handleDeleteResult = async (resultId: string) => {
    if (!confirm('确定要删除这条测试记录吗？')) return

    try {
      // 模拟删除操作
      setResults(results.filter(r => r.id !== resultId))
    } catch (error) {
      console.error('删除记录失败:', error)
      alert('删除失败，请重试')
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>返回首页</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-purple-500" />
            <span className="text-lg font-semibold text-gray-800">测试历史</span>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-600">加载中...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">还没有测试记录</h3>
              <p className="text-gray-600 mb-6">开始第一次测试，了解你的狗狗性格吧！</p>
              <button
                onClick={() => navigate('/quiz')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                开始测试
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">测试历史</h2>
                <button
                  onClick={() => navigate('/quiz')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>重新测试</span>
                </button>
              </div>

              <div className="grid gap-4">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {result.mbtiType}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {result.analysis.description}
                          </h3>
                          <p className="text-gray-600">
                            {new Date(result.createdAt).toLocaleDateString('zh-CN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteResult(result.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">性格特征</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.analysis.traits.slice(0, 3).map((trait, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        测试结果ID: {result.id}
                      </div>
                      <button
                        onClick={() => handleViewResult(result)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all"
                      >
                        查看详情
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default History