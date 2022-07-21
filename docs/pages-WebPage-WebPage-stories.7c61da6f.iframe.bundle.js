"use strict";(self.webpackChunk_icatalyst_react=self.webpackChunk_icatalyst_react||[]).push([[400],{"./libs/layouts/src/pages/Page/Page.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>Page});var _home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"),_home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__),_icatalyst_react_components__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./libs/components/src/index.ts")),_icatalyst_react_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/core/src/index.ts"),_mui_styles__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js"),_mui_styles__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@mui/private-theming/useTheme/useTheme.js"),clsx__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/index.js"),react_redux__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-redux/es/index.js"),_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),_excluded=["className","style","children","backgroundColor","renderNavigation"],useStyles=(0,_mui_styles__WEBPACK_IMPORTED_MODULE_6__.Z)((function(theme){var _mobileNavButton,transparentPrimary=(0,_icatalyst_react_core__WEBPACK_IMPORTED_MODULE_3__.HA)(theme.palette.primary.main).setAlpha(.6).toHex8String(),transparentSecondary=(0,_icatalyst_react_core__WEBPACK_IMPORTED_MODULE_3__.HA)(theme.palette.secondary.main).setAlpha(.6).toHex8String();return{root:{boxSizing:"border-box",display:"flex",flexDirection:"column",height:"100%",width:"100%",position:"relative",flexShrink:0},mobileNavButton:(_mobileNavButton={position:"absolute!important",top:theme.spacing(.5),left:theme.spacing(1),display:"none"},_mobileNavButton[theme.breakpoints.down("lg")]={display:"inline-flex"},_mobileNavButton),navigationFn:function navigationFn(_ref){var _ref2;return _ref.renderNavigation?((_ref2={})[theme.breakpoints.down("lg")]={paddingTop:theme.spacing(5)},_ref2):{}},iconColorFn:function iconColorFn(_ref3){var _mostReadable,backgroundColor=_ref3.backgroundColor;return{color:(null==(_mostReadable=(0,_icatalyst_react_core__WEBPACK_IMPORTED_MODULE_3__.vX)(backgroundColor,[transparentPrimary,transparentSecondary]))?void 0:_mostReadable.toHex8String())||theme.palette.action.active}},colorFn:function colorFn(_ref4){var _mostReadable2,backgroundColor=_ref4.backgroundColor;return{color:(null==(_mostReadable2=(0,_icatalyst_react_core__WEBPACK_IMPORTED_MODULE_3__.vX)(backgroundColor,[theme.palette.text.primary,theme.palette.primary.contrastText,theme.palette.secondary.contrastText]))?void 0:_mostReadable2.toHex8String())||theme.palette.text.primary}}}})),Page=(0,react__WEBPACK_IMPORTED_MODULE_4__.forwardRef)((function(_ref5,ref){var className=_ref5.className,style=_ref5.style,children=_ref5.children,backgroundColor=_ref5.backgroundColor,_ref5$renderNavigatio=_ref5.renderNavigation,renderNavigation=void 0===_ref5$renderNavigatio||_ref5$renderNavigatio,rest=_home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0___default()(_ref5,_excluded),theme=(0,_mui_styles__WEBPACK_IMPORTED_MODULE_7__.Z)(),_useState=(0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(),derivedBackground=_useState[0],setDerivedBackground=_useState[1],_useState2=(0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(),innerRef=_useState2[0],setInnerRef=_useState2[1],containerRef=(0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)((function(node){setDerivedBackground((null==node?void 0:node.backgroundColor)||theme.palette.background.default),setInnerRef(node)}),[]),styles=useStyles({backgroundColor:derivedBackground||theme.palette.background.default,renderNavigation}),_useSelector$toolbar=(0,react_redux__WEBPACK_IMPORTED_MODULE_5__.v9)((function(_ref6){return _ref6.icatalyst.settings.current.layout})).toolbar,toolbar=void 0===_useSelector$toolbar?{display:!1}:_useSelector$toolbar;return(0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)((function(){containerRef&&ref&&("function"==typeof ref?ref(innerRef):ref.current=innerRef)}),[innerRef,containerRef,ref]),(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.BX)(_icatalyst_react_components__WEBPACK_IMPORTED_MODULE_2__.W2,Object.assign({className:(0,clsx__WEBPACK_IMPORTED_MODULE_9__.Z)(styles.root,styles.colorFn,styles.navigationFn,className),style,ref:containerRef,backgroundColor},rest,{children:[!toolbar.display&&renderNavigation&&(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)(_icatalyst_react_components__WEBPACK_IMPORTED_MODULE_2__.qv,{className:(0,clsx__WEBPACK_IMPORTED_MODULE_9__.Z)(styles.mobileNavButton,styles.iconColorFn),title:"toggle"}),children]}))}));try{Page.displayName="Page",Page.__docgenInfo={description:"",displayName:"Page",props:{renderNavigation:{defaultValue:{value:"true"},description:"Renders a navbar toggle button if on a small device",name:"renderNavigation",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/layouts/src/pages/Page/Page.tsx#Page"]={docgenInfo:Page.__docgenInfo,name:"Page",path:"libs/layouts/src/pages/Page/Page.tsx#Page"})}catch(__react_docgen_typescript_loader_error){}},"./libs/layouts/src/pages/Page/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_Page__WEBPACK_IMPORTED_MODULE_0__.T});var _Page__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/layouts/src/pages/Page/Page.tsx")},"./libs/layouts/src/pages/TitledPage/TitledPage.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TitledPage});var _home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"),_home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__),_mui_styles__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js")),clsx__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),_Page__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/layouts/src/pages/Page/index.ts"),_components_PageHeader_PageHeader__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/layouts/src/pages/components/PageHeader/PageHeader.tsx"),_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),_excluded=["className","style","children","renderNavigation","headerSize","title","actions","headerClassName","contentClassName"],useStyles=(0,_mui_styles__WEBPACK_IMPORTED_MODULE_4__.Z)((function(){return{root:{},header:{display:"flex",flexGrow:0,flexShrink:0,width:"100%"},content:{display:"flex",flexDirection:"column",flexGrow:1,width:"100%"}}}));function TitledPage(_ref){var className=_ref.className,style=_ref.style,children=_ref.children,renderNavigation=_ref.renderNavigation,headerSize=_ref.headerSize,title=_ref.title,actions=_ref.actions,headerClassName=_ref.headerClassName,contentClassName=_ref.contentClassName,rest=_home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0___default()(_ref,_excluded),styles=useStyles();return(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.BX)(_Page__WEBPACK_IMPORTED_MODULE_2__.Z,Object.assign({className:(0,clsx__WEBPACK_IMPORTED_MODULE_6__.Z)(styles.root,className),style,renderNavigation:!1},rest,{children:[(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(_components_PageHeader_PageHeader__WEBPACK_IMPORTED_MODULE_3__.Z,{className:(0,clsx__WEBPACK_IMPORTED_MODULE_6__.Z)(styles.header,headerClassName),title,renderNavigation,size:headerSize,actions}),(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)("div",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_6__.Z)(styles.content,contentClassName),children})]}))}try{TitledPage.displayName="TitledPage",TitledPage.__docgenInfo={description:"",displayName:"TitledPage",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},headerSize:{defaultValue:null,description:"",name:"headerSize",required:!1,type:{name:"ComponentSize"}},actions:{defaultValue:null,description:"",name:"actions",required:!1,type:{name:"any[]"}},headerClassName:{defaultValue:null,description:"",name:"headerClassName",required:!1,type:{name:"string"}},contentClassName:{defaultValue:null,description:"",name:"contentClassName",required:!1,type:{name:"string"}},renderNavigation:{defaultValue:null,description:"Renders a navbar toggle button if on a small device",name:"renderNavigation",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/layouts/src/pages/TitledPage/TitledPage.tsx#TitledPage"]={docgenInfo:TitledPage.__docgenInfo,name:"TitledPage",path:"libs/layouts/src/pages/TitledPage/TitledPage.tsx#TitledPage"})}catch(__react_docgen_typescript_loader_error){}},"./libs/layouts/src/pages/components/PageHeader/PageHeader.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,m:()=>PageHeader});__webpack_require__("./node_modules/core-js/modules/es.array.filter.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),__webpack_require__("./node_modules/core-js/modules/es.object.assign.js");var _icatalyst_react_components__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/components/src/index.ts"),_mui_material__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@mui/material/Typography/Typography.js"),_mui_styles__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js"),clsx__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/index.js"),react_redux__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react-redux/es/index.js"),_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),useStyles=(0,_mui_styles__WEBPACK_IMPORTED_MODULE_7__.Z)((function(theme){var _root,_title,_mobileNavButton,_actions;return{root:(_root={marginBottom:theme.spacing(3),display:"flex",flexDirection:"row",alignItems:"center"},_root[theme.breakpoints.down("md")]={alignItems:"flex-start"},_root),title:(_title={paddingTop:theme.spacing(.25)},_title[theme.breakpoints.down("md")]={fontSize:theme.typography.h5.fontSize},_title[theme.breakpoints.down("xs")]={paddingTop:0},_title.display="-webkit-box",_title["-webkit-line-clamp"]=2,_title.lineClamp=2,_title["-webkit-box-orient"]="vertical",_title.overflow="hidden",_title.textOverflow="ellipsis",_title),mobileNavButton:(_mobileNavButton={marginRight:theme.spacing(1),display:"none"},_mobileNavButton[theme.breakpoints.down("lg")]={display:"inline-flex"},_mobileNavButton),spacer:{flexGrow:1,minWidth:theme.spacing(1),height:"100%"},actions:(_actions={display:"flex",flexDirection:"column"},_actions[theme.breakpoints.up("sm")]={flexDirection:"row"},_actions),iconColorFn:{}}}));function PageHeader(_ref){var className=_ref.className,style=_ref.style,_ref$renderNavigation=_ref.renderNavigation,renderNavigation=void 0===_ref$renderNavigation||_ref$renderNavigation,title=_ref.title,_ref$size=_ref.size,size=void 0===_ref$size?"medium":_ref$size,actions=_ref.actions,styles=useStyles(),_useSelector$toolbar=(0,react_redux__WEBPACK_IMPORTED_MODULE_6__.v9)((function(_ref2){return _ref2.icatalyst.settings.current.layout})).toolbar,toolbar=void 0===_useSelector$toolbar?{display:!1}:_useSelector$toolbar;return(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.BX)("div",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_9__.Z)(styles.root,className),style,children:[!toolbar.display&&renderNavigation&&(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)(_icatalyst_react_components__WEBPACK_IMPORTED_MODULE_4__.qv,{className:(0,clsx__WEBPACK_IMPORTED_MODULE_9__.Z)(styles.mobileNavButton,styles.iconColorFn),title:"toggle"}),(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)(_mui_material__WEBPACK_IMPORTED_MODULE_10__.Z,{className:styles.title,variant:{inherit:"inherit",small:"h5",medium:"h4",large:"h2"}[size],component:"h1",children:title}),(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)("div",{className:styles.spacer}),actions&&(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)("div",{className:styles.actions,children:actions.map((function(action){if((0,react__WEBPACK_IMPORTED_MODULE_5__.isValidElement)(action))return action;var iconProps=action;return(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)(_icatalyst_react_components__WEBPACK_IMPORTED_MODULE_4__.hU,Object.assign({},iconProps,{size:iconProps.size||"small",color:iconProps.color||"primary"}))})).filter((function(i){return i}))})]})}const __WEBPACK_DEFAULT_EXPORT__=PageHeader;try{PageHeader.displayName="PageHeader",PageHeader.__docgenInfo={description:"",displayName:"PageHeader",props:{renderNavigation:{defaultValue:{value:"true"},description:"",name:"renderNavigation",required:!1,type:{name:"boolean"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},size:{defaultValue:{value:"medium"},description:"",name:"size",required:!1,type:{name:"ComponentSize"}},actions:{defaultValue:null,description:"",name:"actions",required:!1,type:{name:"any[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/layouts/src/pages/components/PageHeader/PageHeader.tsx#PageHeader"]={docgenInfo:PageHeader.__docgenInfo,name:"PageHeader",path:"libs/layouts/src/pages/components/PageHeader/PageHeader.tsx#PageHeader"})}catch(__react_docgen_typescript_loader_error){}},"./libs/layouts/src/pages/WebPage/WebPage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WebPage:()=>WebPage_stories_WebPage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>WebPage_stories});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.function.bind.js");var objectWithoutPropertiesLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"),objectWithoutPropertiesLoose_default=__webpack_require__.n(objectWithoutPropertiesLoose),components_src=__webpack_require__("./libs/components/src/index.ts"),makeStyles=__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js"),clsx_m=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),TitledPage=__webpack_require__("./libs/layouts/src/pages/TitledPage/TitledPage.tsx"),emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),_excluded=["className","style","title","src","sandbox"],useStyles=(0,makeStyles.Z)((function(){return{root:{},container:{background:"aliceblue"}}}));function WebPage(_ref){var className=_ref.className,style=_ref.style,title=_ref.title,src=_ref.src,sandbox=_ref.sandbox,rest=objectWithoutPropertiesLoose_default()(_ref,_excluded),styles=useStyles();return(0,emotion_react_jsx_runtime_browser_esm.tZ)(TitledPage.Z,Object.assign({className:(0,clsx_m.Z)(styles.root,className),style,title},rest,{children:(0,emotion_react_jsx_runtime_browser_esm.tZ)(components_src.tw,{className:(0,clsx_m.Z)(styles.container),title,src,sandbox})}))}try{WebPage.displayName="WebPage",WebPage.__docgenInfo={description:"",displayName:"WebPage",props:{src:{defaultValue:null,description:"",name:"src",required:!0,type:{name:"string"}},sandbox:{defaultValue:null,description:"",name:"sandbox",required:!1,type:{name:"IFrameSandboxProps[]"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},headerSize:{defaultValue:null,description:"",name:"headerSize",required:!1,type:{name:"ComponentSize"}},actions:{defaultValue:null,description:"",name:"actions",required:!1,type:{name:"any[]"}},headerClassName:{defaultValue:null,description:"",name:"headerClassName",required:!1,type:{name:"string"}},contentClassName:{defaultValue:null,description:"",name:"contentClassName",required:!1,type:{name:"string"}},renderNavigation:{defaultValue:null,description:"Renders a navbar toggle button if on a small device",name:"renderNavigation",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/layouts/src/pages/WebPage/WebPage.tsx#WebPage"]={docgenInfo:WebPage.__docgenInfo,name:"WebPage",path:"libs/layouts/src/pages/WebPage/WebPage.tsx#WebPage"})}catch(__react_docgen_typescript_loader_error){}const WebPage_stories={component:WebPage,argTypes:{backgroundColor:{control:{type:"color"}}},parameters:{controls:{expanded:!0},storyPadding:"0"}};var WebPage_stories_WebPage=function Template(args){return(0,emotion_react_jsx_runtime_browser_esm.tZ)(WebPage,Object.assign({},args))}.bind({});WebPage_stories_WebPage.args={title:"A website inside a website",style:{minWidth:"80vw",minHeight:"70vh"},src:"https://singularity.icatalyst.com",imageSrc:"https://cdn.icatalyst.com/wp-content/uploads/sites/5/2014/02/27000520/gear-banner-1920x500.png"},WebPage_stories_WebPage.parameters=Object.assign({storySource:{source:"args => <Component {...args} />"}},WebPage_stories_WebPage.parameters);var __namedExportsOrder=["WebPage"];try{Meta.displayName="Meta",Meta.__docgenInfo={description:"Metadata to configure the stories for a component.",displayName:"Meta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/layouts/src/pages/WebPage/WebPage.stories.tsx#Meta"]={docgenInfo:Meta.__docgenInfo,name:"Meta",path:"libs/layouts/src/pages/WebPage/WebPage.stories.tsx#Meta"})}catch(__react_docgen_typescript_loader_error){}}}]);