(self.webpackChunk_icatalyst_react=self.webpackChunk_icatalyst_react||[]).push([[916],{"./libs/layouts/src/pages/InfoPage/InfoPage.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>InfoPage,Z:()=>InfoPage_InfoPage});var objectWithoutPropertiesLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"),objectWithoutPropertiesLoose_default=__webpack_require__.n(objectWithoutPropertiesLoose),src=(__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./libs/components/src/index.ts")),core_src=__webpack_require__("./libs/core/src/index.ts"),Typography=__webpack_require__("./node_modules/@mui/material/Typography/Typography.js"),makeStyles=__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js"),useTheme=__webpack_require__("./node_modules/@mui/private-theming/useTheme/useTheme.js"),clsx_m=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),react=__webpack_require__("./node_modules/react/index.js"),Page=__webpack_require__("./libs/layouts/src/pages/Page/Page.tsx"),emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),_excluded=["className","style","children","title","icon","excerpt","content","backgroundColor","iconColor"],useStyles=(0,makeStyles.Z)((function(theme){var _icon;return{root:{textAlign:"center"},title:{marginBottom:theme.spacing(2)},excerpt:{marginBottom:theme.spacing(4)},content:{marginBottom:theme.spacing(2)},icon:(_icon={width:theme.spacing(12)+"!important",height:theme.spacing(12)+"!important",fontSize:theme.spacing(12)+"!important"},_icon[theme.breakpoints.up("md")]={width:theme.spacing(16)+"!important",height:theme.spacing(16)+"!important",fontSize:theme.spacing(16)+"!important"},_icon.marginBottom=theme.spacing(4),_icon),iconColorFn:function iconColorFn(_ref){var _mostReadable,backgroundColor=_ref.backgroundColor,iconColor=_ref.iconColor;return{color:null==(_mostReadable=(0,core_src.vX)(backgroundColor,[theme.palette[iconColor].main,theme.palette[iconColor].light,theme.palette[iconColor].dark]))?void 0:_mostReadable.toHex8String()}},contentWrapper:{marginBottom:theme.spacing(2)},captionColorFn:function captionColorFn(_ref2){var _mostReadable2,backgroundColor=_ref2.backgroundColor;return{color:(null==(_mostReadable2=(0,core_src.vX)(backgroundColor,[theme.palette.text.disabled,theme.palette.text.secondary,theme.palette.text.primary,theme.palette.grey[500]]))?void 0:_mostReadable2.toHex8String())||theme.palette.text.secondary}}}})),InfoPage=(0,react.forwardRef)((function(_ref3,ref){var className=_ref3.className,style=_ref3.style,children=_ref3.children,title=_ref3.title,icon=_ref3.icon,excerpt=_ref3.excerpt,content=_ref3.content,backgroundColor=_ref3.backgroundColor,_ref3$iconColor=_ref3.iconColor,iconColor=void 0===_ref3$iconColor?"primary":_ref3$iconColor,rest=objectWithoutPropertiesLoose_default()(_ref3,_excluded),theme=(0,useTheme.Z)(),iconName="string"==typeof icon?icon:null,excerptText="string"==typeof excerpt?excerpt:null,contentText="string"==typeof content?content:null,_useState=(0,react.useState)(),derivedBackground=_useState[0],setDerivedBackground=_useState[1],_useState2=(0,react.useState)(),innerRef=_useState2[0],setInnerRef=_useState2[1],containerRef=(0,react.useCallback)((function(node){setDerivedBackground((null==node?void 0:node.backgroundColor)||theme.palette.background.default),setInnerRef(node)}),[]),styles=useStyles({backgroundColor:derivedBackground||theme.palette.background.default,iconColor});return(0,react.useEffect)((function(){containerRef&&ref&&("function"==typeof ref?ref(innerRef):ref.current=innerRef)}),[innerRef,containerRef,ref]),(0,emotion_react_jsx_runtime_browser_esm.BX)(Page.T,Object.assign({className:(0,clsx_m.Z)(styles.root,className),backgroundColor,style,verticalAlign:"center",horizontalAlign:"center",ref:containerRef},rest,{children:[iconName?(0,emotion_react_jsx_runtime_browser_esm.tZ)(src.JO,{className:(0,clsx_m.Z)(styles.icon,styles.iconColorFn),color:iconColor,children:iconName}):icon,(0,emotion_react_jsx_runtime_browser_esm.tZ)(Typography.Z,{variant:"h4",component:"h1",className:(0,clsx_m.Z)(styles.title),children:title}),excerptText?(0,emotion_react_jsx_runtime_browser_esm.tZ)(Typography.Z,{variant:"subtitle1",component:"div",className:(0,clsx_m.Z)(styles.excerpt,styles.captionColorFn),children:excerpt}):excerpt,contentText?(0,emotion_react_jsx_runtime_browser_esm.tZ)(Typography.Z,{variant:"caption",component:"div",className:(0,clsx_m.Z)(styles.content,styles.captionColorFn),children:content}):content,children&&(0,emotion_react_jsx_runtime_browser_esm.tZ)("div",{className:(0,clsx_m.Z)(styles.contentWrapper,styles.captionColorFn),children})]}))}));const InfoPage_InfoPage=InfoPage;try{InfoPage.displayName="InfoPage",InfoPage.__docgenInfo={description:"",displayName:"InfoPage",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},icon:{defaultValue:null,description:"Can be the string for the icon to display or a component to render",name:"icon",required:!1,type:{name:"ReactNode"}},excerpt:{defaultValue:null,description:"Can be the string for the excerpt box or a component to render",name:"excerpt",required:!1,type:{name:"ReactNode"}},content:{defaultValue:null,description:"Can be the string for the content box or a component to render",name:"content",required:!1,type:{name:"ReactNode"}},iconColor:{defaultValue:{value:"primary"},description:"",name:"iconColor",required:!1,type:{name:"ComponentColor"}},renderNavigation:{defaultValue:null,description:"Renders a navbar toggle button if on a small device",name:"renderNavigation",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/layouts/src/pages/InfoPage/InfoPage.tsx#InfoPage"]={docgenInfo:InfoPage.__docgenInfo,name:"InfoPage",path:"libs/layouts/src/pages/InfoPage/InfoPage.tsx#InfoPage"})}catch(__react_docgen_typescript_loader_error){}},"./libs/layouts/src/pages/ErrorPage/ErrorPage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ErrorPage:()=>ErrorPage_stories_ErrorPage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ErrorPage_stories});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.function.bind.js");var objectWithoutPropertiesLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"),objectWithoutPropertiesLoose_default=__webpack_require__.n(objectWithoutPropertiesLoose),Typography=(__webpack_require__("./node_modules/core-js/modules/es.string.link.js"),__webpack_require__("./node_modules/@mui/material/Typography/Typography.js")),esm_objectWithoutPropertiesLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),clsx_m=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),composeClasses=__webpack_require__("./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),capitalize=__webpack_require__("./node_modules/@mui/material/utils/capitalize.js"),styled=__webpack_require__("./node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("./node_modules/@mui/material/styles/useThemeProps.js"),useIsFocusVisible=__webpack_require__("./node_modules/@mui/material/utils/useIsFocusVisible.js"),useForkRef=__webpack_require__("./node_modules/@mui/material/utils/useForkRef.js"),generateUtilityClass=__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getLinkUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiLink",slot)}const Link_linkClasses=(0,__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js").Z)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]);var style=__webpack_require__("./node_modules/@mui/system/esm/style.js"),colorManipulator=__webpack_require__("./node_modules/@mui/system/esm/colorManipulator.js");const colorTransformations={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Link_getTextDecoration=({theme,ownerState})=>{const transformedColor=(color=>colorTransformations[color]||color)(ownerState.color),color=(0,style.D)(theme,`palette.${transformedColor}`,!1)||ownerState.color,channelColor=(0,style.D)(theme,`palette.${transformedColor}Channel`);return"vars"in theme&&channelColor?`rgba(${channelColor} / 0.4)`:(0,colorManipulator.Fq)(color,.4)};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const _excluded=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],LinkRoot=(0,styled.ZP)(Typography.Z,{name:"MuiLink",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,styles[`underline${(0,capitalize.Z)(ownerState.underline)}`],"button"===ownerState.component&&styles.button]}})((({theme,ownerState})=>(0,esm_extends.Z)({},"none"===ownerState.underline&&{textDecoration:"none"},"hover"===ownerState.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===ownerState.underline&&(0,esm_extends.Z)({textDecoration:"underline"},"inherit"!==ownerState.color&&{textDecorationColor:Link_getTextDecoration({theme,ownerState})},{"&:hover":{textDecorationColor:"inherit"}}),"button"===ownerState.component&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Link_linkClasses.focusVisible}`]:{outline:"auto"}}))),Link_Link=react.forwardRef((function Link(inProps,ref){const props=(0,useThemeProps.Z)({props:inProps,name:"MuiLink"}),{className,color="primary",component="a",onBlur,onFocus,TypographyClasses,underline="always",variant="inherit",sx}=props,other=(0,esm_objectWithoutPropertiesLoose.Z)(props,_excluded),{isFocusVisibleRef,onBlur:handleBlurVisible,onFocus:handleFocusVisible,ref:focusVisibleRef}=(0,useIsFocusVisible.Z)(),[focusVisible,setFocusVisible]=react.useState(!1),handlerRef=(0,useForkRef.Z)(ref,focusVisibleRef),ownerState=(0,esm_extends.Z)({},props,{color,component,focusVisible,underline,variant}),classes=(ownerState=>{const{classes,component,focusVisible,underline}=ownerState,slots={root:["root",`underline${(0,capitalize.Z)(underline)}`,"button"===component&&"button",focusVisible&&"focusVisible"]};return(0,composeClasses.Z)(slots,getLinkUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(LinkRoot,(0,esm_extends.Z)({color,className:(0,clsx_m.Z)(classes.root,className),classes:TypographyClasses,component,onBlur:event=>{handleBlurVisible(event),!1===isFocusVisibleRef.current&&setFocusVisible(!1),onBlur&&onBlur(event)},onFocus:event=>{handleFocusVisible(event),!0===isFocusVisibleRef.current&&setFocusVisible(!0),onFocus&&onFocus(event)},ref:handlerRef,ownerState,variant,sx:[...Object.keys(colorTransformations).includes(color)?[]:[{color}],...Array.isArray(sx)?sx:[sx]]},other))}));var makeStyles=__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js"),useTheme=__webpack_require__("./node_modules/@mui/private-theming/useTheme/useTheme.js"),InfoPage=__webpack_require__("./libs/layouts/src/pages/InfoPage/InfoPage.tsx"),src=__webpack_require__("./libs/core/src/index.ts"),emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),ErrorPage_excluded=["className","style","children","title","message","linkPath","linkText","icon","iconColor"],useStyles=(0,makeStyles.Z)((function(theme){return{root:{},linkWrapper:{marginBottom:theme.spacing(2)},link:{},linkColorFn:function linkColorFn(_ref){var _mostReadable,backgroundColor=_ref.backgroundColor,color=null==(_mostReadable=(0,src.vX)(backgroundColor,[theme.palette.primary.main,theme.palette.primary.light,theme.palette.primary.dark]))?void 0:_mostReadable.toHex8String();return{color,textDecorationColor:color}}}}));function ErrorPage(_ref2){var className=_ref2.className,style=_ref2.style,children=_ref2.children,title=_ref2.title,message=_ref2.message,_ref2$linkPath=_ref2.linkPath,linkPath=void 0===_ref2$linkPath?"/":_ref2$linkPath,linkText=_ref2.linkText,_ref2$icon=_ref2.icon,icon=void 0===_ref2$icon?"error":_ref2$icon,_ref2$iconColor=_ref2.iconColor,iconColor=void 0===_ref2$iconColor?"error":_ref2$iconColor,rest=objectWithoutPropertiesLoose_default()(_ref2,ErrorPage_excluded),theme=(0,useTheme.Z)(),_useState=(0,react.useState)(),derivedBackground=_useState[0],setDerivedBackground=_useState[1],styles=useStyles({backgroundColor:derivedBackground||theme.palette.background.default}),containerRef=(0,react.useCallback)((function(node){setDerivedBackground((null==node?void 0:node.backgroundColor)||theme.palette.background.default)}),[]);return(0,emotion_react_jsx_runtime_browser_esm.tZ)(InfoPage.Z,Object.assign({className:(0,clsx_m.Z)(styles.root,className),style,title,excerpt:message,icon,ref:containerRef,iconColor,renderNavigation:!1,content:linkText&&(0,emotion_react_jsx_runtime_browser_esm.tZ)(Typography.Z,{className:(0,clsx_m.Z)(styles.linkWrapper),children:(0,emotion_react_jsx_runtime_browser_esm.tZ)(Link_Link,{className:(0,clsx_m.Z)(styles.link,styles.linkColorFn),href:linkPath,children:linkText})})},rest,{children}))}try{ErrorPage.displayName="ErrorPage",ErrorPage.__docgenInfo={description:"",displayName:"ErrorPage",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},message:{defaultValue:null,description:"",name:"message",required:!1,type:{name:"string"}},linkPath:{defaultValue:{value:"/"},description:"",name:"linkPath",required:!1,type:{name:"string"}},linkText:{defaultValue:null,description:"",name:"linkText",required:!1,type:{name:"string"}},icon:{defaultValue:{value:"error"},description:"Can be the string for the icon to display or a component to render",name:"icon",required:!1,type:{name:"string"}},iconColor:{defaultValue:{value:"error"},description:"",name:"iconColor",required:!1,type:{name:"ComponentColor"}},excerpt:{defaultValue:null,description:"Can be the string for the excerpt box or a component to render",name:"excerpt",required:!1,type:{name:"ReactNode"}},content:{defaultValue:null,description:"Can be the string for the content box or a component to render",name:"content",required:!1,type:{name:"ReactNode"}},renderNavigation:{defaultValue:null,description:"Renders a navbar toggle button if on a small device",name:"renderNavigation",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/layouts/src/pages/ErrorPage/ErrorPage.tsx#ErrorPage"]={docgenInfo:ErrorPage.__docgenInfo,name:"ErrorPage",path:"libs/layouts/src/pages/ErrorPage/ErrorPage.tsx#ErrorPage"})}catch(__react_docgen_typescript_loader_error){}const ErrorPage_stories={component:ErrorPage,argTypes:{backgroundColor:{control:{type:"color"}}},parameters:{controls:{expanded:!0},storyPadding:"0"}};var ErrorPage_stories_ErrorPage=function Template(args){return(0,emotion_react_jsx_runtime_browser_esm.tZ)(ErrorPage,Object.assign({},args))}.bind({});ErrorPage_stories_ErrorPage.args={style:{minWidth:"80vw",minHeight:"70vh"},title:"An Error has occurred",message:"Do something quickly before it breaks everything",linkPath:"/",linkText:"Click the link to recover",imageSrc:"https://cdn.icatalyst.com/wp-content/uploads/sites/5/2014/02/27000520/gear-banner-1920x500.png"},ErrorPage_stories_ErrorPage.parameters=Object.assign({storySource:{source:"args => <Component {...args} />"}},ErrorPage_stories_ErrorPage.parameters);var __namedExportsOrder=["ErrorPage"];try{Meta.displayName="Meta",Meta.__docgenInfo={description:"Metadata to configure the stories for a component.",displayName:"Meta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/layouts/src/pages/ErrorPage/ErrorPage.stories.tsx#Meta"]={docgenInfo:Meta.__docgenInfo,name:"Meta",path:"libs/layouts/src/pages/ErrorPage/ErrorPage.stories.tsx#Meta"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/core-js/internals/create-html.js":(module,__unused_webpack_exports,__webpack_require__)=>{var uncurryThis=__webpack_require__("./node_modules/core-js/internals/function-uncurry-this.js"),requireObjectCoercible=__webpack_require__("./node_modules/core-js/internals/require-object-coercible.js"),toString=__webpack_require__("./node_modules/core-js/internals/to-string.js"),quot=/"/g,replace=uncurryThis("".replace);module.exports=function(string,tag,attribute,value){var S=toString(requireObjectCoercible(string)),p1="<"+tag;return""!==attribute&&(p1+=" "+attribute+'="'+replace(toString(value),quot,"&quot;")+'"'),p1+">"+S+"</"+tag+">"}},"./node_modules/core-js/internals/string-html-forced.js":(module,__unused_webpack_exports,__webpack_require__)=>{var fails=__webpack_require__("./node_modules/core-js/internals/fails.js");module.exports=function(METHOD_NAME){return fails((function(){var test=""[METHOD_NAME]('"');return test!==test.toLowerCase()||test.split('"').length>3}))}},"./node_modules/core-js/modules/es.string.link.js":(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var $=__webpack_require__("./node_modules/core-js/internals/export.js"),createHTML=__webpack_require__("./node_modules/core-js/internals/create-html.js");$({target:"String",proto:!0,forced:__webpack_require__("./node_modules/core-js/internals/string-html-forced.js")("link")},{link:function link(url){return createHTML(this,"a","href",url)}})}}]);