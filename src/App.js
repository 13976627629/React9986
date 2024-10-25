
import './App.css';
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import Profile from './components/Profile';
import ErrorBoundary from './components/ErrorBoundary';

const { Header, Content, Footer } = Layout;

function App() {
  const [profile, setProfile] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Fetch initial profile data from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/profiles')
      .then(response => {
        setProfile(response.data[0]); // Assuming response contains an array of profiles
      })
      .catch(error => console.log(error));
  }, []);

  // Handle user login
  const handleLogin = (credentials) => {
    axios.get('http://localhost:8080/api/profiles') // Fetch all users
      .then(response => {
        const users = response.data;
        const user = users.find(u => u.username === credentials.username && u.password === credentials.password); // Find matching user

        if (user) {
          setIsAuthenticated(true); // If login is successful, update state
          navigate('/admin'); // Redirect to AdminPanel after login
        } else {
          alert("登录失败！检查用户名和密码。"); // Alert on failed login
        }
      })
      .catch(error => {
        console.error("获取用户列表失败:", error);
        alert("获取用户列表失败，请重试。");
      });
  };
  const handleProfileUpdate = (updatedProfile) => {
    axios.put(`http://localhost:8080/api/profiles/${updatedProfile.id}`, updatedProfile)
      .then(response => {
        console.log(response.data)
        setProfile(response.data);
        console.log(`Profile updated successfully at: http://localhost:8080/api/profiles/${updatedProfile.id}`);
        alert("Profile updated successfully!");
       
      })
      .catch(error => console.log(error));
  };
  return (
    <ErrorBoundary>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header style={{ color: '#fff', textAlign: 'center', fontSize: '24px' }}>
          个人主页管理系统
        </Header>
        <Content style={{ padding: '20px 50px' }}>
          <Routes>
            <Route path="/" element={<Profile profile={profile} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route 
              path="/admin" 
              element={isAuthenticated ? (
                <AdminPanel profile={profile} onProfileUpdate={handleProfileUpdate} />
              ) : (
                <div>Please log in to access the admin panel</div>
              )} 
            />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>浙江大学 ©2023</Footer>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
