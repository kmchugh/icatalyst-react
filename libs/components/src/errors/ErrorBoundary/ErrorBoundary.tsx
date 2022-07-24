import { Component, ErrorInfo } from 'react';
import { Button } from '../../buttons';
import { Icon } from '../../icons';
import { ContainerComponent } from '../../types';
import ErrorWrapper from '../ErrorWrapper';

export interface ErrorBoundaryProps extends ContainerComponent<'div'> {
    test?: string
}

interface ErrorBoundaryState {
    errors: Error[]
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { errors: [] };
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
        this.setState({
            errors: [error]
        });
    }

    // TODO: Use localisation for title and button text

    override render() {
        const errors = this.state.errors;
        const { children } = this.props;
        return (errors && errors.length > 0) ? (
            <ErrorWrapper
                title={'Oops something went wrong and we cannot recover from it.'}
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
                    Reload
                </Button>
            </ErrorWrapper>
        ) : children
    }
}

export default ErrorBoundary;