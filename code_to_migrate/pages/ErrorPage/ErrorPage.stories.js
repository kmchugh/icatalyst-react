import React from 'react';

import ErrorPage from './index';

export default {
  title: 'ErrorPage',
  component: ErrorPage,
};
const template=args=><ErrorPage {...args}/>

export const errorspage = () => template.bind({});

errorspage.args={
  title:"kmckmckm",
  message:"cnf n chnhc"
}