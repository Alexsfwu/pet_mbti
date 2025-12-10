import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Heart, Share2, RotateCcw, Home } from 'lucide-react'
import { summarizeMBTIWithLLM } from '../lib/llm'
import { LLMSummary } from '../types'

interface LocationState {
  resultId: string
  mbtiType: string
  analysis: {
    type: string
    description: string
    traits: string[]
    compatibility?: string[]
  }
  answers: number[]
  petName: string
  petBreed: string
}

const Result: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  
  const state = location.state as LocationState
  
  if (!state) {
    navigate('/')
    return null
  }

  const { mbtiType, analysis, petName, petBreed, answers } = state
  const breed = petBreed || '狗狗'
  const [llmSummary, setLlmSummary] = useState<LLMSummary | null>(null)
  const [llmLoading, setLlmLoading] = useState(false)
  const [llmError, setLlmError] = useState('')

  useEffect(() => {
    let mounted = true
    setLlmLoading(true)
    summarizeMBTIWithLLM({ mbtiType, answers, petName, breed })
      .then((res) => { if (mounted) setLlmSummary(res) })
      .catch(() => { if (mounted) setLlmError('生成失败，已使用默认解读') })
      .finally(() => { if (mounted) setLlmLoading(false) })
    return () => { mounted = false }
  }, [mbtiType, petName, petBreed, answers])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${petName}（${breed}）的狗狗MBTI测试结果`,
          text: `${petName}（${breed}）是 ${mbtiType} 型：${analysis.description}`,
          url: window.location.href
        })
      } catch (error) {
        console.error('分享失败:', error)
      }
    } else {
      // 复制到剪贴板
      navigator.clipboard.writeText(`${petName}（${breed}）的狗狗MBTI测试结果是 ${mbtiType} 型：${analysis.description}`)
      alert('测试结果已复制到剪贴板')
    }
  }

  const handleRetake = () => {
    navigate('/quiz')
  }

  const handleHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleHome}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>返回首页</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="text-lg font-semibold text-gray-800">测试结果</span>
          </div>
        </div>

        {/* Result Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 text-center">
            <div className="mb-6">
              <img
                src={`https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`可爱${petName}，犬种：${breed}，${mbtiType}型狗狗卡通形象，${mbtiType.includes('E') ? '外向活泼' : '内向安静'}风格，温暖色调，手绘风格`)}&image_size=square_hd`}
                alt={`${petName}（${breed}） 的 ${mbtiType} 型狗狗`}
                className="mx-auto w-48 h-48 object-cover rounded-full shadow-lg mb-6"
              />
              
              <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-2xl font-bold mb-4">
                {petName}（{breed}） · {mbtiType}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {petName} 是一只 {mbtiType} 型的狗狗
              </h2>
              <p className="text-gray-700 mb-2">
                分析：{analysis.description}
              </p>
              <p className="text-gray-700">
                宠物性格解读：通常表现为{analysis.traits.join('、')}。
              </p>

              <div className="mt-6 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">字母总结</h3>
                {llmLoading && (
                  <p className="text-sm text-gray-500">大模型正在生成个性化总结...</p>
                )}
                {!llmLoading && llmSummary && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mbtiType.split('').map((l) => (
                      <div key={l} className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm font-bold text-gray-700 mb-2">{l}</div>
                        <div className="text-sm text-gray-700">{(llmSummary as any)[l]}</div>
                      </div>
                    ))}
                  </div>
                )}
                {!llmLoading && llmError && (
                  <p className="text-xs text-gray-400 mt-2">{llmError}</p>
                )}
              </div>
            </div>

            {/* Traits */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                性格特征
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {analysis.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Compatibility */}
            {analysis.compatibility && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  适合的环境
                </h3>
                <div className="space-y-2">
                  {analysis.compatibility.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center space-x-2 text-gray-600"
                    >
                      <Heart className="h-4 w-4 text-pink-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Result ID */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                测试结果ID: {state.resultId}
              </p>
              {isAuthenticated && (
                <p className="text-xs text-gray-500 mt-1">
                  已保存到您的历史记录中
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Share2 className="h-5 w-5" />
              <span>分享结果</span>
            </button>

            <button
              onClick={handleRetake}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <RotateCcw className="h-5 w-5" />
              <span>重新测试</span>
            </button>

            <button
              onClick={handleHome}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Home className="h-5 w-5" />
              <span>返回首页</span>
            </button>
          </div>

          {/* Tips */}
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💡 小贴士
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• 每种性格类型都有其独特的魅力，没有好坏之分</p>
              <p>• 了解狗狗的性格有助于提供更好的照顾和训练</p>
              <p>• 性格可能会随着时间和环境而有所变化</p>
              <p>• 定期测试可以观察狗狗性格的变化趋势</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
