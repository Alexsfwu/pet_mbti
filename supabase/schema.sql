-- 创建用户表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- 创建测试结果表
CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    mbti_type VARCHAR(4) NOT NULL,
    answers INTEGER[] NOT NULL,
    pet_name VARCHAR(50),
    analysis JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建MBTI类型表
CREATE TABLE mbti_types (
    type VARCHAR(4) PRIMARY KEY,
    description TEXT NOT NULL,
    traits JSONB NOT NULL,
    compatibility JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
CREATE INDEX idx_test_results_user_id ON test_results(user_id);
CREATE INDEX idx_test_results_created_at ON test_results(created_at DESC);
CREATE INDEX idx_test_results_mbti_type ON test_results(mbti_type);

-- 插入初始MBTI类型数据
INSERT INTO mbti_types (type, description, traits) VALUES
('ENFP', '外向直觉情感感知型 - 热情洋溢的探险家', '["活泼好动", "好奇心强", "容易兴奋", "喜欢社交", "富有创意"]'),
('ISTJ', '内向感觉思维判断型 - 可靠稳重的守护者', '["稳重可靠", "有规律", "忠诚守护", "谨慎小心", "责任心强"]'),
('ESFP', '外向感觉情感感知型 - 快乐活泼的表演者', '["爱玩爱闹", "享受当下", "友善亲和", "适应力强", "喜欢被关注"]'),
('INTJ', '内向直觉思维判断型 - 独立自主的战略家', '["独立思考", "有主见", "冷静分析", "目标明确", "善于解决问题"]'),
('ENFJ', '外向直觉情感判断型 - 温暖体贴的教导者', '["热情友善", "善于理解他人", "喜欢帮助他人", "有领导能力", "富有同情心"]'),
('ISTP', '内向感觉思维感知型 - 冷静理性的工匠', '["冷静理性", "动手能力强", "独立自主", "善于解决问题", "喜欢探索"]'),
('ESFJ', '外向感觉情感判断型 - 热心周到的照顾者', '["热心友善", "喜欢照顾他人", "遵守规则", "忠诚可靠", "善于合作"]'),
('INTP', '内向直觉思维感知型 - 理性好奇的思想家', '["理性分析", "好奇心强", "独立思考", "善于解决问题", "喜欢探索"]'),
('ENTP', '外向直觉思维感知型 - 机智灵活的辩论者', '["机智灵活", "好奇心强", "善于辩论", "富有创意", "喜欢挑战"]'),
('ISFJ', '内向感觉情感判断型 - 温柔体贴的保护者', '["温柔体贴", "细心周到", "忠诚可靠", "有责任感", "善于照顾他人"]'),
('ESTP', '外向感觉思维感知型 - 大胆实际的行动者', '["大胆实际", "行动导向", "适应力强", "善于解决问题", "喜欢冒险"]'),
('INFJ', '内向直觉情感判断型 - 富有洞察力的理想主义者', '["富有洞察力", "理想主义", "善于理解他人", "有创造力", "有使命感"]'),
('ENTJ', '外向直觉思维判断型 - 果断有力的指挥官', '["果断有力", "有领导能力", "目标明确", "善于规划", "有决断力"]'),
('ISFP', '内向感觉情感感知型 - 温和敏感的艺术家', '["温和敏感", "审美能力强", "温和友善", "适应力强", "享受当下"]'),
('ESTJ', '外向感觉思维判断型 - 务实高效的执行者', '["务实高效", "有组织能力", "遵守规则", "有责任感", "善于管理"]'),
('INFP', '内向直觉情感感知型 - 理想主义的调解者', '["理想主义", "富有同情心", "善于理解他人", "有创造力", "追求和谐"]');

-- 授予匿名用户基本读取权限
GRANT SELECT ON mbti_types TO anon;
GRANT SELECT ON test_results TO anon;

-- 授予认证用户完整权限
GRANT ALL PRIVILEGES ON users TO authenticated;
GRANT ALL PRIVILEGES ON test_results TO authenticated;
GRANT ALL PRIVILEGES ON mbti_types TO authenticated;

-- 设置行级安全策略
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的测试结果
CREATE POLICY "用户查看自己的测试结果" ON test_results
    FOR SELECT USING (auth.uid() = user_id);

-- 用户可以插入新的测试结果
CREATE POLICY "用户插入测试结果" ON test_results
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用户可以删除自己的测试结果
CREATE POLICY "用户删除自己的测试结果" ON test_results
    FOR DELETE USING (auth.uid() = user_id);

-- 创建存储桶用于存储分享图片
INSERT INTO storage.buckets (id, name, public) VALUES ('pet-mbti-results', 'pet-mbti-results', true);

-- 设置存储权限
CREATE POLICY "公开读取分享图片" ON storage.objects
    FOR SELECT USING (bucket_id = 'pet-mbti-results');

CREATE POLICY "认证用户上传分享图片" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'pet-mbti-results' AND auth.role() = 'authenticated');