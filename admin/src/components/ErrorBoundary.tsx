import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle={this.state.error?.message || 'An unexpected error occurred'}
          extra={[
            <Button 
              type="primary" 
              key="home"
              onClick={() => window.location.href = '/'}
            >
              Go Home
            </Button>,
            <Button 
              key="reload"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          ]}
        />
      );
    }

    return this.props.children;
  }
} 