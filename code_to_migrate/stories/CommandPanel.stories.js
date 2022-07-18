import React from 'react';
import CommandPanel  from '../components/CommandPanel/index';

export default {
  title: 'CommandPanel',
  component: CommandPanel,
};
// const template=args=><Image {...args}/>

export const CommandPanelcomp = (args) =><CommandPanel {...args}/>;

CommandPanelcomp.args={
  style:{marginRight: "2px"},
  className:"",
  elevation :1,
  primary :null,
  secondary : null,
}