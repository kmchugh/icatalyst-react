// import React from 'react';
import  Logo  from '../components/Logo/index';
import * as React from 'react'
import { Provider } from 'react-redux';
import createApp from '../utilities/createApp';

import store from '../../icatalyst/src/app/store/index';

console.log(store);


export default {
  title: 'Logo',
component: Logo,
decorators:[(story) => <Provider store={store}>{story()}</Provider>]
};
// const template=args=><Image {...args}/>

// export const LogoPages = (args) =><Logo {...args}/>;
const LogoPages = (args) =><Logo {...args} />;

export const Logocomp = LogoPages.bind({});


Logocomp.args={
  showTitle:true,
  className:"logo"

}