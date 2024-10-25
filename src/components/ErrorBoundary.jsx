import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新状态，使下一次渲染能够显示错误UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你也可以将错误日志发送到服务器
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级UI
      return <h1>出现了错误，请稍后再试。</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
