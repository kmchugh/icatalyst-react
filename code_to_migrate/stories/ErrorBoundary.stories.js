import React from 'react';
import ErrorBoundary  from '../components/Errors/ErrorBoundary';

export default {
  title: 'ErrorBoundary',
  component: ErrorBoundary,
};
// const template=args=><Image {...args}/>

export const ErrorBoundarycomp = (args) =><ErrorBoundary {...args}/>;

ErrorBoundarycomp.args={
    children:"Error"
 
}