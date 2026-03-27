import { Component, type ErrorInfo } from "react";
import { ServerErrorPage } from "@/pages/Error";
import type { Props, State } from "./type";

// ---------------------------------------------------------------

export class ErrorBoundary extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ServerErrorPage />;
    }

    return this.props.children;
  }
}