import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions, options } from '../data/questions'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'
import { calculateMBTI, mbtiDescriptions } from '../utils/mbtiCalculator'
import { ArrowLeft, ArrowRight, Heart, Dog } from 'lucide-react'

const Quiz: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [petName, setPetName] = useState('')
  const [hasStarted, setHasStarted] = useState(false)
  const [petBreed, setPetBreed] = useState('')

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    if (!hasStarted || !petName.trim() || !petBreed.trim()) {
      alert('请先输入狗狗的名字和品种并开始测试')
      return
    }
    if (answers.some(answer => answer === 0)) {
      alert('请回答所有问题后再提交')
      return
    }

    setIsSubmitting(true)
    try {
      // 计算MBTI类型
      const { type: mbtiType } = calculateMBTI(answers)
      const analysis = mbtiDescriptions[mbtiType] || mbtiDescriptions['ENFP']

      // 保存测试结果
      const resultData = {
        user_id: isAuthenticated ? user?.id : null,
        mbti_type: mbtiType,
        answers: answers,
        analysis: analysis,
        pet_name: petName.trim(),
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('test_results')
        .insert(resultData)
        .select()
        .single()

      if (error) throw error

      // 跳转到结果页面
      navigate('/result', { 
        state: { 
          resultId: data.id,
          mbtiType,
          analysis,
          answers,
          petName: petName.trim(),
          petBreed: petBreed.trim()
        } 
      })
    } catch (error) {
      console.error('提交测试结果失败:', error)
      alert('提交失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>返回首页</span>
          </button>
          <div className="flex items-center space-x-2">
            <Dog className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-semibold text-gray-800">
              {hasStarted ? `问题 ${currentQuestion + 1} / ${questions.length}` : '准备开始'}
            </span>
          </div>
        </div>

        {hasStarted && (
          <div className="mb-8">
            <div className="bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-600">
              进度: {Math.round(progress)}%
            </p>
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          {!hasStarted ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <Heart className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">开始前请输入狗狗的名字</h2>
                <p className="text-gray-600 text-sm">名字将用于生成更个性化的结果</p>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="例如：小白、球球..."
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all"
                />
                <input
                  type="text"
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                  placeholder="请输入犬种，例如：柯基、金毛、哈士奇..."
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all"
                />
                <button
                  onClick={() => setHasStarted(true)}
                  disabled={!petName.trim() || !petBreed.trim()}
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                    !petName.trim() || !petBreed.trim()
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600'
                  }`}
                >
                  开始测试
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="text-center mb-8">
                  <Heart className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {questions[currentQuestion].text}
                  </h2>
                  {questions[currentQuestion].behavior && (
                    <p className="text-gray-500 text-sm mb-2">
                      {questions[currentQuestion].behavior}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm">
                    请选择最符合您狗狗行为的选项
                  </p>
                </div>
                <div className="space-y-4">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        answers[currentQuestion] === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-800'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        {answers[currentQuestion] === option.value && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Heart className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentQuestion === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>上一题</span>
                </button>
                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={answers.some(answer => answer === 0) || isSubmitting}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      answers.some(answer => answer === 0) || isSubmitting
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        <span>提交中...</span>
                      </>
                    ) : (
                      <>
                        <span>提交测试</span>
                        <Heart className="h-5 w-5" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={answers[currentQuestion] === 0}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      answers[currentQuestion] === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600'
                    }`}
                  >
                    <span>下一题</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz
