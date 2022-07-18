import React from 'react';
import DropZone from '../components/DropZone/index';
import { Provider } from 'react-redux';
import createApp from '../utilities/createApp';

import store from '../../icatalyst/src/app/store/index';

export default {
  title: 'DropZone',
  component: DropZone,
  decorators:[(story) => <Provider store={store}>{story()}</Provider>]

};
// const template=args=><Image {...args}/>

export const DropZonecomp = (args) =><DropZone {...args}/>;

DropZonecomp.args={
 
}