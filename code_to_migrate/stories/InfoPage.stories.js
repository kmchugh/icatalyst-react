import React from 'react';
// import  {InfoPage}  from '../pages/InfoPage';
import InfoPage from '../pages/InfoPage';
import { Provider } from 'react-redux';
import tinycolor, { mostReadable } from '@ctrl/tinycolor';
import createApp from '../utilities/createApp';
import store from '../../icatalyst/src/app/store/index';

console.log(store);
export default {
  title: 'InfoPage',
  component: InfoPage,
  decorators:[(story) => <Provider store={store}>{story()}</Provider>]


};
// const template=args=><Image {...args}/>

export const InfoPagecomp = (args) =><InfoPage {...args}/>;

InfoPagecomp.args={
    icon : 'fa info',
    title : 'Title',
    info : 'info text',
    action : null,
    renderNavigation : true,

}