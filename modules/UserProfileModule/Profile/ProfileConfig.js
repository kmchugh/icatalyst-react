import {createRouteConfig} from '../../../utilities';
import ProfileComponent from './components/ProfileComponent';

export function createModule(overrides = {
  auth : 'user'
}){
  return createRouteConfig({
    icon : 'person_outline',
    name: 'profile',
    title : 'profile',
    navigation: true,
    component : ProfileComponent
  }, overrides);
}
