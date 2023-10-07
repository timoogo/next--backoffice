import React, { Component, ErrorInfo } from 'react';
import { Props, State } from '@/interfaces/ErrorBoudary.interface';

// ErrorBoundary component
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: ''
        };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can log the error here or send it to an error tracking service
        console.error('Error boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Error: {this.state.errorMessage}</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
