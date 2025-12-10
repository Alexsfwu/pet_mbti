import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Heart, Dog, ArrowRight, User } from 'lucide-react'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()

  const handleStartQuiz = () => {
    navigate('/quiz')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleHistory = () => {
    navigate('/history')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-2">
            <Dog className="h-8 w-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">宠物MBTI测试</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleHistory}
                  className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>历史记录</span>
                </button>
                <div className="text-sm text-gray-600">
                  欢迎，{user?.name}
                </div>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>登录</span>
              </button>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <img
              src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=可爱卡通狗狗插画，温暖色调，手绘风格，毛茸茸的，大眼睛，友好表情&image_size=square_hd"
              alt="可爱的狗狗"
              className="mx-auto w-64 h-64 object-cover rounded-full shadow-lg"
            />
          </div>
          
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            发现你的狗狗性格密码
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            通过科学的MBTI性格测试，深入了解你的毛孩子的独特个性。
            15个精心设计的问题，帮你解锁狗狗的性格特征，
            让你们的相处更加和谐美好。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleStartQuiz}
              className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Heart className="h-6 w-6" />
              <span>开始测试</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            {!isAuthenticated && (
              <p className="text-sm text-gray-500">
                无需注册即可开始测试，注册后可保存历史记录
              </p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">科学测试</h3>
              <p className="text-gray-600 text-sm">
                基于MBTI理论，专为宠物设计的性格测试体系
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dog className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">个性分析</h3>
              <p className="text-gray-600 text-sm">
                详细的性格报告，帮助你更好地理解和照顾爱犬
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">分享互动</h3>
              <p className="text-gray-600 text-sm">
                与朋友分享测试结果，比较不同狗狗的性格特点
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          <p>© 2024 宠物MBTI测试 - 让每个毛孩子都得到最适合的关爱</p>
        </footer>
      </div>
    </div>
  )
}

export default Home