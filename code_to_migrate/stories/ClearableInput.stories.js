import React from 'react';
import  ClearableInput  from '../components/ClearableInput/index';

export default {
  title: 'ClearableInput',
  component: ClearableInput,
};
export const ClearableInputComp = (args) =><ClearableInput {...args}/>;

ClearableInputComp.args={
    icon : "*",
    label :"Input",
    
   
}