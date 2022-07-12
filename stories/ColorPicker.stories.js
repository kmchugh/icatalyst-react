import React from 'react';
import ColorPicker from '../components/ColorPicker/index';

export default {
  title: 'ColorPicker',
  component: ColorPicker,
};
export const ColorPickercomp = (args) =><ColorPicker {...args}/>;

ColorPickercomp.args={
    
      hideTextfield :false,
      defaultColor :"green"
}