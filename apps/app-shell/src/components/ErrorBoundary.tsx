import React from "react";

type Props = React.PropsWithChildren<{}>;
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
      return <h1>Sentimos muito por isso.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
