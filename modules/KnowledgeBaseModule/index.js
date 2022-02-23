import {createRouteConfig} from '../../utilities';
import {createModule as manageKnowledgeBase} from './Administration';
import {createModule as displayKnowledgeBase} from './KnowledgeBase';
import FAQComponent from './KnowledgeBase/FAQComponent';

export function createModule(config={}){

  const { modules = {}, ...rest } = config;
  const {
    admin, display
  } = modules;

  return createRouteConfig({
    name: 'knowledgeBase',
    title: 'KnowledgeBase',
    icon : 'school',
    path: 'knowledgeBase',
    auth : 'everyone',
    component : null,
    paths : [
      display && display.visible === false ? null : {
        ...createRouteConfig(displayKnowledgeBase(display)),
        path : 'knowledge-base-faq',
        component : FAQComponent,
      },
      admin && admin.visible === false ? null : {
        ...createRouteConfig(manageKnowledgeBase(admin)),
        path : 'admin'
      }
    ].filter(i=>i)
  }, rest);
}
