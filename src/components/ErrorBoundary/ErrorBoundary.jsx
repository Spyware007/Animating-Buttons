import React from 'react';
import classes from './ErrorBoundary.module.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // You can also log the error to an error reporting service here
    // reportErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={classes.error_boundary}>
          <div className={classes.error_content}>
            <h2 className={classes.error_title}>
              🚫 Something went wrong
            </h2>
            <p className={classes.error_message}>
              We're sorry! Something unexpected happened. Please try refreshing the page or contact support if the problem persists.
            </p>
            
            <div className={classes.error_actions}>
              <button 
                onClick={this.handleRetry} 
                className={classes.retry_button}
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className={classes.refresh_button}
              >
                Refresh Page
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className={classes.error_details}>
                <summary>Error Details (Development Mode)</summary>
                <pre className={classes.error_stack}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;