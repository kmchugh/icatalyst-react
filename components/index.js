import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

export {default as Avatar} from './Avatar';
export {default as ClearableInput} from './ClearableInput';
export * from './Dialogs';
export * from './Menus';
export {default as Icon} from './Icon';
export {default as IconButton} from './IconButton';
export {default as Image} from './Image';
export {default as EntityView} from './EntityView';
export * from './Errors';
export {default as Logo} from './Logo';
export {default as MasterDetail} from './MasterDetail';
export {SessionPanel} from './Session';
export {default as Singularity} from './Singularity';
export { SingularityContext } from './Singularity';
export {default as SplitButton} from './SplitButton';
export * from './Tables';
export {default as Theme} from './Theme';
export {default as Toolbar} from './Toolbar';
export {default as UserMenu} from './UserMenu';
export {default as UserRoles} from './UserRoles';
export {default as WebView} from './WebView';
