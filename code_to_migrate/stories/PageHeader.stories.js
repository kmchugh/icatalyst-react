import PageHeader from "../components/PageHeader/index";
import { Provider } from 'react-redux';
import store from '../../icatalyst/src/app/store/index';
export default {
    title: 'PageHeader',
  component: PageHeader,
  decorators:[(story) => <Provider store={store}>{story()}</Provider>]

  };
  // const template=args=><Image {...args}/>
  
  // export const LogoPages = (args) =><Logo {...args}/>;
 export const PageHeadercomp = (args) =><PageHeader {...args} />;
  
//   export const Logocomp = LogoPages.bind({});
  
  
//   Logocomp.args={
//     showTitle:true,
//     className:"logo"
  