import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Row, Col, Typography, Segmented } from 'antd';

const { Title, Text } = Typography;

const Profile = ({ profile }) => {
  const [imageUrl, setImageUrl] = useState('/images/picture.jpg');
  const [segmentKey, setSegmentKey] = useState('research');

  useEffect(() => {
    if (profile.image) {
      setImageUrl(profile.image);
    }
  }, [profile]);

  const handleSegmentChange = (value) => {
    setSegmentKey(value);
  };

  if (!profile || Object.keys(profile).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '40px', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card
        bordered={false}
        style={{
          width: '100%',
          height: '100%',
          margin: '0 auto',
          padding: '40px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          backgroundColor: '#fff',
        }}
      >
        <Row gutter={[24, 24]}>
          <Col span={6} style={{ textAlign: 'center', marginTop: '30px' }}>
         
              <img
                src={imageUrl}
                alt="profile"
                style={{
                  width: '210px',
                  height: '210px',
                  borderRadius: '50%',
                }}
              />
        
          </Col>

          <Col span={18}>
            <Title level={3} style={{ marginBottom: '16px', color: '#1890ff' }}>
              {profile.name || 'No name available'}
            </Title>
            <Descriptions column={1}
             bordered
             labelStyle={{ fontWeight: 'bold', color: '#595959' }}// 加粗并调整标签颜色
             contentStyle={{ fontSize: '16px', color: '#333' }}  // 内容字体加大，颜色更深
             >
              <Descriptions.Item label="职位"  >
                <Text style={{ color: '#1890ff', fontWeight: 'bold' }}
                >{profile.title || '未设置职位'}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="邮箱">
                <Text style={{ color: '#3e3e3e', fontWeight: '500' }}
                >{profile.email || '未设置邮箱'}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="电话">
                <Text style={{ color: '#3e3e3e', fontWeight: '500' }}
                >{profile.phone || '未设置电话'}</Text>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Row style={{ marginTop: '40px' }}>
          <Col span={24}>
            <Segmented
              options={[
                { label: '研究方向', value: 'research ' ,},
                { label: '获奖荣誉', value: 'awards' },
                { label: '实验室介绍', value: 'lab' },
                { label: '学术交流', value: 'community' },
                { label: '已毕业研究生', value: 'graduates' },
                { label: '研究生国家奖学金', value: 'scholarship' },
              ]}
              value={segmentKey}
              onChange={handleSegmentChange}
              style={{ 
                width :'100%',
                fontSize: '16px', // 增大字体
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#e6f7ff',
                textAlign: 'center',
                fontWeight: 'bold',}}
            />
            <Card
              title={<Title level={4}>{segmentKey}</Title>}
              bordered={false}
              style={{
                backgroundColor: '#f9f8f9',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Text>
                {segmentKey === 'research' && profile.research
                  ? profile.research
                  : segmentKey === 'awards' && profile.awards
                  ? profile.awards
                  : segmentKey === 'lab' && profile.lab
                  ? profile.lab
                  : segmentKey === 'community' && profile.exchange
                  ? profile.exchange
                  : segmentKey === 'graduates' && profile.graduates
                  ? profile.graduates
                  : segmentKey === 'scholarship' && profile.scholarship
                  ? profile.scholarship
                  : '未设置内容'}
              </Text>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Profile;
