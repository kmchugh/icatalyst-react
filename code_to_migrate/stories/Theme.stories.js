import  Theme  from "../components/Theme/index";
import { Provider } from 'react-redux';
import store from '../../icatalyst/src/app/store/index';
export default {
    title: 'Theme',
  component: Theme,
  decorators:[(story) => <Provider store={store}>{story()}</Provider>]

  };
  // const template=args=><Image {...args}/>
  
  // export const LogoPages = (args) =><Logo {...args}/>;
 export const Themecomp = (args) =><Theme {...args} />;
  
//   export const Logocomp = LogoPages.bind({});
  
  
//   Logocomp.args={
//     showTitle:true,
//     className:"logo"
  