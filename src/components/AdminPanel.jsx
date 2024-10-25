import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Row, Col, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

function AdminPanel({ profile, onProfileUpdate }) {
  const [editableProfile, setEditableProfile] = useState({ ...profile });
  const [fileList, setFileList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const handleImageUpload = ({ fileList }) => {
    setFileList(fileList);
    const reader = new FileReader();
    reader.onload = () => {
      const newImageUrl = reader.result; // 读取上传的图片数据
      setEditableProfile({ ...editableProfile, image: newImageUrl }); // 更新 profile 的 image 字段
    };
    if (fileList.length > 0) {
      reader.readAsDataURL(fileList[0].originFileObj); // 读取上传的图片文件
    }
  };

 const handleSubmit = () => {
    console.log("Submitting profile update:", editableProfile); // 打印即将提交的数据
    onProfileUpdate(editableProfile); // 触发更新函数
};


  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={16} justify="center">
        <Col xs={24} md={12}>
          <Card
            bordered={false}
            style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}
          >
            <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>Admin Panel</Title>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Name">
                <Input
                  name="name"
                  value={editableProfile.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
              </Form.Item>

              <Form.Item label="Title">
                <Input
                  name="title"
                  value={editableProfile.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                />
              </Form.Item>

              <Form.Item label="Email">
                <Input
                  name="email"
                  value={editableProfile.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Item>

              <Form.Item label="Phone">
                <Input
                  name="phone"
                  value={editableProfile.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </Form.Item>

              <Form.Item label="Research">
                <Input.TextArea
                  name="research"
                  value={editableProfile.research}
                  onChange={handleChange}
                  placeholder="Enter research area"
                  rows={4}
                />
              </Form.Item>

              <Form.Item label="awards">
                <Input.TextArea
                  name="awards"
                  value={editableProfile.awards}
                  onChange={handleChange}
                  placeholder="Enter awards area"
                  rows={4}
                />
              </Form.Item>
              <Form.Item label="lab">
                <Input.TextArea
                  name="lab"
                  value={editableProfile.lab}
                  onChange={handleChange}
                  placeholder="Enter lab area"
                  rows={4}
                />
              </Form.Item>
              <Form.Item label="exchange">
                <Input.TextArea
                  name="exchange"
                  value={editableProfile.exchange}
                  onChange={handleChange}
                  placeholder="Enter community area"
                  rows={4}
                />
              </Form.Item><Form.Item label="graduates">
                <Input.TextArea
                  name="graduates"
                  value={editableProfile.graduates}
                  onChange={handleChange}
                  placeholder="Enter graduates area"
                  rows={4}
                />
              </Form.Item><Form.Item label="scholarship">
                <Input.TextArea
                  name="scholarship"
                  value={editableProfile.scholarship}
                  onChange={handleChange}
                  placeholder="Enter scholarship area"
                  rows={4}
                />
              </Form.Item>
              

              <Form.Item label="Profile Image">
                <Upload
                  listType="picture"
                  fileList={fileList}
                  onChange={handleImageUpload}
                  beforeUpload={() => false} // 阻止自动上传
                >
                  <Button icon={<UploadOutlined />}>上传图片</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminPanel;

