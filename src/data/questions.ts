import { Question } from '../types'

export const questions: Question[] = [
  {
    id: 1,
    text: '当你带狗狗去新环境时，它通常会：',
    behavior: '主动探索新环境。'
  },
  {
    id: 2,
    text: '面对陌生人时，你的狗狗会：',
    behavior: '主动上前与陌生人示好。'
  },
  {
    id: 3,
    text: '当门铃响起时，狗狗的反应是：',
    behavior: '迅速靠近门口提醒主人。'
  },
  {
    id: 4,
    text: '在狗公园中，你的狗狗倾向于：',
    behavior: '主动加入狗群玩耍。'
  },
  {
    id: 5,
    text: '学习新指令时，你的狗狗：',
    behavior: '快速理解并掌握新指令。'
  },
  {
    id: 6,
    text: '当遇到新玩具时，狗狗会：',
    behavior: '立刻尝试新玩具的玩法。'
  },
  {
    id: 7,
    text: '在日常散步中，狗狗通常：',
    behavior: '走在前面带路。'
  },
  {
    id: 8,
    text: '面对障碍物（如家具）时，狗狗会：',
    behavior: '尝试自行绕过障碍物。'
  },
  {
    id: 9,
    text: '当你情绪低落时，你的狗狗：',
    behavior: '主动靠近你进行安抚。'
  },
  {
    id: 10,
    text: '在训练过程中，狗狗更关注：',
    behavior: '更关注与主人的互动。'
  },
  {
    id: 11,
    text: '当其他狗狗靠近时，你的狗狗：',
    behavior: '主动示好。'
  },
  {
    id: 12,
    text: '面对主人的指令，狗狗通常：',
    behavior: '快速执行指令。'
  },
  {
    id: 13,
    text: '每天的作息时间，你的狗狗：',
    behavior: '依赖固定作息节奏。'
  },
  {
    id: 14,
    text: '当计划突然改变时（如散步时间），狗狗：',
    behavior: '快速接受新的安排。'
  },
  {
    id: 15,
    text: '面对新的食物，狗狗会：',
    behavior: '大胆尝试新食物。'
  },
]

export const options = [
  { value: 1, label: '非常符合' },
  { value: 2, label: '比较符合' },
  { value: 3, label: '一般' },
  { value: 4, label: '不太符合' },
  { value: 5, label: '完全不符合' }
]
