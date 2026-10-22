import React from "react";

type Props = React.PropsWithChildren<{ fallback?: React.ReactNode }>;
type State = { hasError: boolean };

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Sentimos muito por isso.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
