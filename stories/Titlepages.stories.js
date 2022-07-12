import TitledPage  from "../pages/TitledPage/index";
import { Provider } from 'react-redux';
import store from '../../icatalyst/src/app/store/index';
export default {
    title: 'TitledPage',
  component: TitledPage,
  decorators:[(story) => <Provider store={store}>{story()}</Provider>]

  };
  // const template=args=><Image {...args}/>
  
  // export const LogoPages = (args) =><Logo {...args}/>;
 export const TitledPagecomp = (args) =><TitledPage {...args} />;
  
//   export const Logocomp = LogoPages.bind({});
  
  
TitledPagecomp.args={
   title:"lkcflk"
  }
  