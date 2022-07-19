"use strict";(self.webpackChunk_icatalyst_react=self.webpackChunk_icatalyst_react||[]).push([[519],{"./libs/layouts/src/pages/InfoPage/InfoPage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{InfoPage:()=>InfoPage_stories_InfoPage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>InfoPage_stories});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.function.bind.js");var src=__webpack_require__("./libs/components/src/index.ts"),core_src=__webpack_require__("./libs/core/src/index.ts"),Typography=__webpack_require__("./node_modules/@mui/material/Typography/Typography.js"),makeStyles=__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js"),clsx_m=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),react=__webpack_require__("./node_modules/react/index.js"),Page=__webpack_require__("./libs/layouts/src/pages/Page/Page.tsx"),emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),useStyles=(0,makeStyles.Z)((function(theme){return console.log(theme),{root:{alignItems:"center",justifyContent:"center"},title:{marginBottom:theme.spacing(2)},excerpt:{marginBottom:theme.spacing(1)},content:{marginBottom:theme.spacing(2)},iconFn:function iconFn(_ref){var _mostReadable,_ref2,backgroundColor=_ref.backgroundColor,iconColor=(null==(_mostReadable=(0,core_src.vX)(backgroundColor||theme.palette.background.default,[theme.palette.primary.main,theme.palette.secondary.main]))?void 0:_mostReadable.toHex8String())||theme.palette.primary.main;return(_ref2={width:theme.spacing(12),height:theme.spacing(12),fontSize:theme.spacing(12)})[theme.breakpoints.up("md")]={width:theme.spacing(16),height:theme.spacing(16),fontSize:theme.spacing(16)},_ref2.marginBottom=theme.spacing(4),_ref2.color=iconColor,_ref2},contentWrapper:{marginBottom:theme.spacing(2)},captionColorFn:function captionColorFn(_ref3){var _mostReadable2,backgroundColor=_ref3.backgroundColor;return{color:(null==(_mostReadable2=(0,core_src.vX)(backgroundColor||theme.palette.background.default,[theme.palette.text.disabled,theme.palette.text.secondary,theme.palette.text.primary,theme.palette.grey[500]]))?void 0:_mostReadable2.toHex8String())||theme.palette.text.secondary}}}}));function InfoPage(_ref4){var className=_ref4.className,style=_ref4.style,children=_ref4.children,title=_ref4.title,icon=_ref4.icon,excerpt=_ref4.excerpt,content=_ref4.content,backgroundColor=_ref4.backgroundColor,iconName="string"==typeof icon?icon:null,excerptText="string"==typeof excerpt?excerpt:null,contentText="string"==typeof content?content:null,_useState=(0,react.useState)(backgroundColor),derivedBackground=_useState[0],setDerivedBackground=_useState[1];(0,react.useEffect)((function(){setDerivedBackground(backgroundColor)}),[backgroundColor]);var styles=useStyles({backgroundColor}),pageRef=(0,src.zu)((function(ref){if(ref&&!derivedBackground){var color=(0,core_src.HA)(getComputedStyle(ref).backgroundColor);color.getAlpha()>0&&setDerivedBackground(color.toHex8String())}}),[])[0];return(0,emotion_react_jsx_runtime_browser_esm.BX)(Page.T,{className:(0,clsx_m.Z)(styles.root,className),backgroundColor,style,ref:pageRef,children:[iconName?(0,emotion_react_jsx_runtime_browser_esm.tZ)(src.JO,{className:(0,clsx_m.Z)(styles.iconFn),children:iconName}):icon,(0,emotion_react_jsx_runtime_browser_esm.tZ)(Typography.Z,{variant:"h4",component:"h1",className:(0,clsx_m.Z)(styles.title),children:title}),excerptText?(0,emotion_react_jsx_runtime_browser_esm.tZ)(Typography.Z,{variant:"subtitle1",component:"div",className:(0,clsx_m.Z)(styles.excerpt,styles.captionColorFn),children:excerpt}):excerpt,contentText?(0,emotion_react_jsx_runtime_browser_esm.tZ)(Typography.Z,{variant:"caption",component:"div",className:(0,clsx_m.Z)(styles.content,styles.captionColorFn),children:content}):content,children&&(0,emotion_react_jsx_runtime_browser_esm.tZ)("div",{className:(0,clsx_m.Z)(styles.contentWrapper,styles.captionColorFn),children})]})}try{InfoPage.displayName="InfoPage",InfoPage.__docgenInfo={description:"",displayName:"InfoPage",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},icon:{defaultValue:null,description:"Can be the string for the icon to display or a component to render",name:"icon",required:!1,type:{name:"ReactNode"}},excerpt:{defaultValue:null,description:"Can be the string for the excerpt box or a component to render",name:"excerpt",required:!1,type:{name:"ReactNode"}},content:{defaultValue:null,description:"Can be the string for the content box or a component to render",name:"content",required:!1,type:{name:"ReactNode"}},backgroundColor:{defaultValue:null,description:"Sets the background color and text updates to reflect most readable",name:"backgroundColor",required:!1,type:{name:"string"}},renderNavigation:{defaultValue:null,description:"Renders a navbar toggle button if on a small device",name:"renderNavigation",required:!1,type:{name:"boolean"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"RefObject<HTMLElement>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/layouts/src/pages/InfoPage/InfoPage.tsx#InfoPage"]={docgenInfo:InfoPage.__docgenInfo,name:"InfoPage",path:"libs/layouts/src/pages/InfoPage/InfoPage.tsx#InfoPage"})}catch(__react_docgen_typescript_loader_error){}const InfoPage_stories={component:InfoPage,argTypes:{},parameters:{controls:{expanded:!0}}};var InfoPage_stories_InfoPage=function Template(args){return(0,emotion_react_jsx_runtime_browser_esm.tZ)(InfoPage,Object.assign({},args))}.bind({});InfoPage_stories_InfoPage.args={title:"An Info Page",icon:"info",excerpt:"Some information here",content:"Some content here",style:{minWidth:"80vw",minHeight:"70vh"},children:"child content"},InfoPage_stories_InfoPage.parameters=Object.assign({storySource:{source:"args => <Component {...args} />"}},InfoPage_stories_InfoPage.parameters);var __namedExportsOrder=["InfoPage"];try{Meta.displayName="Meta",Meta.__docgenInfo={description:"Metadata to configure the stories for a component.",displayName:"Meta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/layouts/src/pages/InfoPage/InfoPage.stories.tsx#Meta"]={docgenInfo:Meta.__docgenInfo,name:"Meta",path:"libs/layouts/src/pages/InfoPage/InfoPage.stories.tsx#Meta"})}catch(__react_docgen_typescript_loader_error){}}}]);