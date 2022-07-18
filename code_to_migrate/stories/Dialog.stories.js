import React from 'react';
import  Dialog  from '../components/Dialogs/Dialog';

export default {
  title: 'Dialog',
  component: Dialog,
};
// const template=args=><Image {...args}/>

export const DialogComp = (args) =><Dialog {...args}/>;

DialogComp.args={
    open :true,
    fullScreen :false,
    fullWidth :false,
    title: "Button",
    description: "Dialog Box",
    allowClose : true,
    showTitle :true,
    // children: PropTypes.oneOfType([
    //   PropTypes.arrayOf(PropTypes.node),
    //   PropTypes.node
    // ]),
    className :"dialog",
    // classes : PropTypes.object,
    titleVariant : "default",
    // style : PropTypes.object
  
}