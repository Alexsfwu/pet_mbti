import { MBTIResult } from '../types'

interface MBTIScores {
  E: number; I: number  // 外向 vs 内向
  N: number; S: number  // 直觉 vs 感觉
  F: number; T: number  // 情感 vs 思维
  P: number; J: number  // 感知 vs 判断
}

export function calculateMBTI(answers: number[]): { type: string; scores: MBTIScores } {
  const scores: MBTIScores = {
    E: 0, I: 0,
    N: 0, S: 0,
    F: 0, T: 0,
    P: 0, J: 0
  }
  
  // 根据答案计算各维度得分
  answers.forEach((answer, index) => {
    // 问题1-4：E/I维度
    if (index < 4) {
      if (answer <= 2) scores.E += answer
      else scores.I += (5 - answer)
    }
    // 问题5-8：N/S维度
    else if (index < 8) {
      if (answer <= 2) scores.N += answer
      else scores.S += (5 - answer)
    }
    // 问题9-12：F/T维度
    else if (index < 12) {
      if (answer <= 2) scores.F += answer
      else scores.T += (5 - answer)
    }
    // 问题13-15：P/J维度
    else {
      if (answer <= 2) scores.P += answer
      else scores.J += (5 - answer)
    }
  })
  
  // 确定MBTI类型
  let mbti = ''
  mbti += scores.E > scores.I ? 'E' : 'I'
  mbti += scores.N > scores.S ? 'N' : 'S'
  mbti += scores.F > scores.T ? 'F' : 'T'
  mbti += scores.P > scores.J ? 'P' : 'J'
  
  return { type: mbti, scores }
}

export const mbtiDescriptions: Record<string, MBTIResult> = {
  'ENFP': {
    type: 'ENFP',
    description: '外向直觉情感感知型 - 热情洋溢的探险家',
    traits: ['活泼好动', '好奇心强', '容易兴奋', '喜欢社交', '富有创意'],
    compatibility: ['适合活跃的家庭', '喜欢户外活动', '需要大量关注和互动']
  },
  'ISTJ': {
    type: 'ISTJ',
    description: '内向感觉思维判断型 - 可靠稳重的守护者',
    traits: ['稳重可靠', '有规律', '忠诚守护', '谨慎小心', '责任心强'],
    compatibility: ['适合安静的家庭', '喜欢规律的生活', '是优秀的看家犬']
  },
  'ESFP': {
    type: 'ESFP',
    description: '外向感觉情感感知型 - 快乐活泼的表演者',
    traits: ['爱玩爱闹', '享受当下', '友善亲和', '适应力强', '喜欢被关注'],
    compatibility: ['适合热闹的家庭', '喜欢与人互动', '容易适应新环境']
  },
  'INTJ': {
    type: 'INTJ',
    description: '内向直觉思维判断型 - 独立自主的战略家',
    traits: ['独立思考', '有主见', '冷静分析', '目标明确', '善于解决问题'],
    compatibility: ['需要适度的独处时间', '喜欢智力游戏', '对陌生人保持警惕']
  },
  'ENFJ': {
    type: 'ENFJ',
    description: '外向直觉情感判断型 - 温暖体贴的教导者',
    traits: ['热情友善', '善于理解他人', '喜欢帮助他人', '有领导能力', '富有同情心'],
    compatibility: ['适合有孩子的家庭', '喜欢参与家庭活动', '需要情感连接']
  },
  'ISTP': {
    type: 'ISTP',
    description: '内向感觉思维感知型 - 冷静理性的工匠',
    traits: ['冷静理性', '动手能力强', '独立自主', '善于解决问题', '喜欢探索'],
    compatibility: ['适合有经验的主人', '需要精神刺激', '喜欢独立完成任务']
  },
  'ESFJ': {
    type: 'ESFJ',
    description: '外向感觉情感判断型 - 热心周到的照顾者',
    traits: ['热心友善', '喜欢照顾他人', '遵守规则', '忠诚可靠', '善于合作'],
    compatibility: ['适合家庭环境', '喜欢规律的生活', '需要被需要的感觉']
  },
  'INTP': {
    type: 'INTP',
    description: '内向直觉思维感知型 - 理性好奇的思想家',
    traits: ['理性分析', '好奇心强', '独立思考', '善于解决问题', '喜欢探索'],
    compatibility: ['需要智力刺激', '喜欢独立活动', '对新鲜事物感兴趣']
  },
  'ENTP': {
    type: 'ENTP',
    description: '外向直觉思维感知型 - 机智灵活的辩论者',
    traits: ['机智灵活', '好奇心强', '善于辩论', '富有创意', '喜欢挑战'],
    compatibility: ['需要大量刺激', '喜欢学习新技能', '容易感到无聊']
  },
  'ISFJ': {
    type: 'ISFJ',
    description: '内向感觉情感判断型 - 温柔体贴的保护者',
    traits: ['温柔体贴', '细心周到', '忠诚可靠', '有责任感', '善于照顾他人'],
    compatibility: ['适合安静的家庭', '喜欢稳定的环境', '是优秀的伴侣犬']
  },
  'ESTP': {
    type: 'ESTP',
    description: '外向感觉思维感知型 - 大胆实际的行动者',
    traits: ['大胆实际', '行动导向', '适应力强', '善于解决问题', '喜欢冒险'],
    compatibility: ['适合活跃的主人', '喜欢户外活动', '需要大量运动']
  },
  'INFJ': {
    type: 'INFJ',
    description: '内向直觉情感判断型 - 富有洞察力的理想主义者',
    traits: ['富有洞察力', '理想主义', '善于理解他人', '有创造力', '有使命感'],
    compatibility: ['需要深度连接', '喜欢安静的环境', '对主人非常忠诚']
  },
  'ENTJ': {
    type: 'ENTJ',
    description: '外向直觉思维判断型 - 果断有力的指挥官',
    traits: ['果断有力', '有领导能力', '目标明确', '善于规划', '有决断力'],
    compatibility: ['需要明确的规则', '喜欢承担责任', '适合有经验的主人']
  },
  'ISFP': {
    type: 'ISFP',
    description: '内向感觉情感感知型 - 温和敏感的艺术家',
    traits: ['温和敏感', '审美能力强', '温和友善', '适应力强', '享受当下'],
    compatibility: ['适合温和的环境', '需要情感支持', '喜欢舒适的生活']
  },
  'ESTJ': {
    type: 'ESTJ',
    description: '外向感觉思维判断型 - 务实高效的执行者',
    traits: ['务实高效', '有组织能力', '遵守规则', '有责任感', '善于管理'],
    compatibility: ['适合有规律的生活', '需要明确的规则', '喜欢完成任务']
  },
  'INFP': {
    type: 'INFP',
    description: '内向直觉情感感知型 - 理想主义的调解者',
    traits: ['理想主义', '富有同情心', '善于理解他人', '有创造力', '追求和谐'],
    compatibility: ['需要情感连接', '喜欢安静的环境', '对主人非常忠诚']
  }
}