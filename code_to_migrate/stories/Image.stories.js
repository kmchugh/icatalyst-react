import React from 'react';

import { Image } from '..';
export default {
  title: 'Image',
  component: Image,
  argTypes:{
      control:"color"
  }
};
// const template=args=><Image {...args}/>

export const ImagePage = (args) =><Image {...args}/>;

ImagePage.args={
  title:"kmckmckm",
  message:"cnf n chnhc"
}