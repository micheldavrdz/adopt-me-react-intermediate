import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedstateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    } else if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <Link to="/">Click here</Link> to go back to the home page. You may
          also wait for a few seconds and you will be automatically redirected.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
