import { Component, ErrorInfo } from 'react';
import { Button } from '../../buttons';
import { ContainerComponent } from '../../types';
import ErrorWrapper from '../ErrorWrapper';

export interface ErrorBoundaryProps extends ContainerComponent<'div'> {
    title: string
}

interface ErrorBoundaryState {
    errors: Error[],
    title: string,
    buttonText: string;
}

// TODO: Use localisation for title and button text

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            errors: [],
            title: props.title || 'Oops something went wrong and we cannot recover from it.',
            buttonText: 'Reload'
        };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return {
            errors: [{
                message: error.message
            }]
        };
    }

    override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState((state) => {
            return {
                ...state,
                errors: [error]
            };
        });
    }

    override render() {
        const errors = this.state.errors;
        const title = this.state.title;
        const buttonText = this.state.buttonText;

        const { children } = this.props;
        return (errors && errors.length > 0) ? (
            <ErrorWrapper
                title={title}
                errors={errors}
            >
                <Button
                    icon="refresh"
                    color="secondary"
                    onClick={() => {
                        // eslint-disable-next-line no-restricted-globals
                        location.reload();
                    }}
                >
                    {buttonText}
                </Button>
            </ErrorWrapper>
        ) : children
    }
}

export default ErrorBoundary;