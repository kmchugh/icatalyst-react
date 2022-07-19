"use strict";(self.webpackChunk_icatalyst_react=self.webpackChunk_icatalyst_react||[]).push([[214],{"./libs/components/src/errors/Error/Error.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{j:()=>Error});var _mui_material__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mui/material/Typography/Typography.js"),_mui_styles__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js"),clsx__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),useStyles=(0,_mui_styles__WEBPACK_IMPORTED_MODULE_0__.Z)((function(){return{root:{}}}));function Error(_ref){var className=_ref.className,style=_ref.style,children=_ref.children,styles=useStyles(),message=children&&("string"==typeof children?children:children.message);return(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)("div",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_2__.Z)(styles.root,className),style,children:[message&&(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Z,{children:message}),!message&&children]})}try{Error.displayName="Error",Error.__docgenInfo={description:"",displayName:"Error",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/components/src/errors/Error/Error.tsx#Error"]={docgenInfo:Error.__docgenInfo,name:"Error",path:"libs/components/src/errors/Error/Error.tsx#Error"})}catch(__react_docgen_typescript_loader_error){}},"./libs/components/src/errors/ErrorWrapper/ErrorWrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>ErrorWrapper});__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),__webpack_require__("./node_modules/core-js/modules/es.array.filter.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.array.find-index.js"),__webpack_require__("./node_modules/core-js/modules/es.date.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.regexp.to-string.js");var _icatalyst_react_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./libs/core/src/index.ts"),_mui_material__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/@mui/material/Typography/Typography.js"),_mui_styles__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js"),clsx__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),_icons__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./libs/components/src/icons/index.ts"),_Error_Error__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./libs/components/src/errors/Error/Error.tsx"),_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),useStyles=(0,_mui_styles__WEBPACK_IMPORTED_MODULE_9__.Z)((function(theme){var _mostReadable,_mostReadable2,_mostReadable3,background=(null==(_mostReadable=(0,_icatalyst_react_core__WEBPACK_IMPORTED_MODULE_6__.vX)((0,_icatalyst_react_core__WEBPACK_IMPORTED_MODULE_6__.HA)(theme.palette.background.default),[theme.palette.error.dark,theme.palette.error.main,theme.palette.error.light]))?void 0:_mostReadable.toHex8String())||theme.palette.error.light,border=(null==(_mostReadable2=(0,_icatalyst_react_core__WEBPACK_IMPORTED_MODULE_6__.vX)((0,_icatalyst_react_core__WEBPACK_IMPORTED_MODULE_6__.HA)(background),[theme.palette.error.dark,theme.palette.error.main,theme.palette.error.light]))?void 0:_mostReadable2.toHex8String())||theme.palette.error.dark,text=(null==(_mostReadable3=(0,_icatalyst_react_core__WEBPACK_IMPORTED_MODULE_6__.vX)((0,_icatalyst_react_core__WEBPACK_IMPORTED_MODULE_6__.HA)(background),[theme.palette.error.contrastText,theme.palette.error.dark,theme.palette.error.main,theme.palette.error.light]))?void 0:_mostReadable3.toHex8String())||theme.palette.error.contrastText;return{root:{display:"flex",flexDirection:"column",padding:theme.spacing(2),borderRadius:theme.shape.borderRadius,border:"thin solid "+border,backgroundColor:background,color:text,width:"100%",position:"relative",minHeight:"100%",boxSizing:"border-box"},titleWrapper:{color:text,display:"flex",alignItems:"center"},icon:{marginRight:theme.spacing(2)},list:{},listitem:{listStyle:"circle",marginLeft:theme.spacing(3)},contentWrapper:{textAlign:"center",margin:theme.spacing(2)}}}));function ErrorWrapper(_ref){var className=_ref.className,style=_ref.style,_ref$role=_ref.role,role=void 0===_ref$role?"alert":_ref$role,title=_ref.title,_ref$showDetails=_ref.showDetails,showDetails=void 0!==_ref$showDetails&&_ref$showDetails,_ref$errors=_ref.errors,errors=void 0===_ref$errors?[]:_ref$errors,children=_ref.children,styles=useStyles();return(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.BX)("div",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_11__.Z)(styles.root,className),style,role,children:[title&&(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.BX)("div",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_11__.Z)(styles.titleWrapper),children:[(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)(_icons__WEBPACK_IMPORTED_MODULE_7__.J,{className:(0,clsx__WEBPACK_IMPORTED_MODULE_11__.Z)(styles.icon),children:"error"}),(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)(_mui_material__WEBPACK_IMPORTED_MODULE_12__.Z,{variant:"h5",component:"h1",children:title})]}),(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)("ul",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_11__.Z)(styles.list),children:showDetails&&errors.filter((function(e,index,self){return self.findIndex((function(error){return error.message===e.message}))===index})).map((function(error){var message=error.message||error.toString();return(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)("li",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_11__.Z)(styles.listitem),children:(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)(_Error_Error__WEBPACK_IMPORTED_MODULE_8__.j,{children:message})},message)}))}),children&&(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)("div",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_11__.Z)(styles.contentWrapper),children})]})}try{ErrorWrapper.displayName="ErrorWrapper",ErrorWrapper.__docgenInfo={description:"",displayName:"ErrorWrapper",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},showDetails:{defaultValue:{value:"process.env['NODE_ENV'] !== 'production'"},description:"",name:"showDetails",required:!1,type:{name:"boolean"}},errors:{defaultValue:{value:"[]"},description:"",name:"errors",required:!1,type:{name:"{ message: string; }[]"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},onChange:{defaultValue:null,description:"called when the value is changed through user interaction on the interactive control",name:"onChange",required:!1,type:{name:"(e: any, value: any) => {}"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/components/src/errors/ErrorWrapper/ErrorWrapper.tsx#ErrorWrapper"]={docgenInfo:ErrorWrapper.__docgenInfo,name:"ErrorWrapper",path:"libs/components/src/errors/ErrorWrapper/ErrorWrapper.tsx#ErrorWrapper"})}catch(__react_docgen_typescript_loader_error){}},"./libs/components/src/icons/Icon/Icon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>Icon_Icon,Z:()=>icons_Icon_Icon});__webpack_require__("./node_modules/core-js/modules/es.string.starts-with.js"),__webpack_require__("./node_modules/core-js/modules/es.regexp.exec.js"),__webpack_require__("./node_modules/core-js/modules/es.string.split.js");var index_es=__webpack_require__("./node_modules/@fortawesome/react-fontawesome/index.es.js"),Icon=__webpack_require__("./node_modules/@mui/material/Icon/Icon.js"),makeStyles=__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js"),clsx_m=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),fontawesome_svg_core_index_es=__webpack_require__("./node_modules/@fortawesome/fontawesome-svg-core/index.es.js"),free_solid_svg_icons_index_es=__webpack_require__("./node_modules/@fortawesome/free-solid-svg-icons/index.es.js"),free_regular_svg_icons_index_es=__webpack_require__("./node_modules/@fortawesome/free-regular-svg-icons/index.es.js"),free_brands_svg_icons_index_es=__webpack_require__("./node_modules/@fortawesome/free-brands-svg-icons/index.es.js");fontawesome_svg_core_index_es.vI.add(free_solid_svg_icons_index_es.mRB,free_regular_svg_icons_index_es.NCV,free_brands_svg_icons_index_es.vnX);var emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),useStyles=(0,makeStyles.Z)((function(theme){return{root:{},sizeFn:function sizeFn(_ref){var size=_ref.size;return{fontSize:{inherit:"inherit",small:theme.typography.pxToRem(20),medium:theme.typography.pxToRem(24),large:theme.typography.pxToRem(36)}[size]}},colorFn:function colorFn(_ref2){var color=_ref2.color;return{color:{primary:theme.palette.primary.main,secondary:theme.palette.secondary.main,info:theme.palette.info.main,success:theme.palette.success.main,warning:theme.palette.warning.main,action:theme.palette.action.active,error:theme.palette.error.main,disabled:theme.palette.action.disabled,inherit:void 0}[color]}}}}));function Icon_Icon(_ref3){var className=_ref3.className,style=_ref3.style,sx=_ref3.sx,_ref3$children=_ref3.children,children=void 0===_ref3$children?"fa question":_ref3$children,_ref3$color=_ref3.color,color=void 0===_ref3$color?"inherit":_ref3$color,_ref3$size=_ref3.size,size=void 0===_ref3$size?"medium":_ref3$size,styles=useStyles({size,color});if(children.startsWith("fa ")){var faType=children.substring(3).split(" ",2);1===faType.length&&faType.unshift("fas");var faIcon=faType;return(0,emotion_react_jsx_runtime_browser_esm.tZ)(index_es.G,{className:(0,clsx_m.Z)(styles.root,styles.sizeFn,styles.colorFn,className),icon:faIcon,style})}return(0,emotion_react_jsx_runtime_browser_esm.tZ)(Icon.Z,{className:(0,clsx_m.Z)(styles.root,className),style,color,fontSize:size,sx,children})}const icons_Icon_Icon=Icon_Icon;try{Icon_Icon.displayName="Icon",Icon_Icon.__docgenInfo={description:"",displayName:"Icon",props:{children:{defaultValue:{value:"fa question"},description:"The name of the icon to display.\nSupports material icons by using the string directly.  e.g. 'dashboard'\nSupports fontawesome with 'fa' prefix.  e.g. 'fa fab facebook' or 'fa question'",name:"children",required:!1,type:{name:"string"}},color:{defaultValue:{value:"inherit"},description:"The colour of the icon",name:"color",required:!1,type:{name:"enum",value:[{value:'"inherit"'},{value:'"action"'},{value:'"disabled"'},{value:'"primary"'},{value:'"secondary"'},{value:'"error"'},{value:'"info"'},{value:'"success"'},{value:'"warning"'}]}},size:{defaultValue:{value:"medium"},description:"The size of the icon",name:"size",required:!1,type:{name:"enum",value:[{value:'"inherit"'},{value:'"large"'},{value:'"medium"'},{value:'"small"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},onChange:{defaultValue:null,description:"called when the value is changed through user interaction on the interactive control",name:"onChange",required:!1,type:{name:"(e: any, value: any) => {}"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/components/src/icons/Icon/Icon.tsx#Icon"]={docgenInfo:Icon_Icon.__docgenInfo,name:"Icon",path:"libs/components/src/icons/Icon/Icon.tsx#Icon"})}catch(__react_docgen_typescript_loader_error){}},"./libs/components/src/icons/Icon/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_Icon__WEBPACK_IMPORTED_MODULE_0__.J});var _Icon__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/components/src/icons/Icon/Icon.tsx")},"./libs/components/src/icons/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>_Icon_Icon__WEBPACK_IMPORTED_MODULE_0__.Z});var _Icon_Icon__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/components/src/icons/Icon/Icon.tsx");__webpack_require__("./libs/components/src/icons/Icon/index.ts")},"./libs/components/src/errors/ErrorBoundary/ErrorBoundary.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ErrorBoundary:()=>ErrorBoundary_stories_ErrorBoundary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ErrorBoundary_stories});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.function.bind.js");var Button=__webpack_require__("./node_modules/@mui/material/Button/Button.js"),react=__webpack_require__("./node_modules/react/index.js"),inheritsLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/inheritsLoose.js"),inheritsLoose_default=__webpack_require__.n(inheritsLoose),icons=__webpack_require__("./libs/components/src/icons/index.ts"),ErrorWrapper=__webpack_require__("./libs/components/src/errors/ErrorWrapper/ErrorWrapper.tsx"),emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),ErrorBoundary=function(_Component){function ErrorBoundary(props){var _this;return(_this=_Component.call(this,props)||this).state={errors:[]},_this}inheritsLoose_default()(ErrorBoundary,_Component),ErrorBoundary.getDerivedStateFromError=function getDerivedStateFromError(error){return{errors:[{message:error.message}]}};var _proto=ErrorBoundary.prototype;return _proto.componentDidCatch=function componentDidCatch(error,errorInfo){this.setState({errors:[error]})},_proto.render=function render(){var errors=this.state.errors,children=this.props.children;return errors&&errors.length>0?(0,emotion_react_jsx_runtime_browser_esm.tZ)(ErrorWrapper.V,{title:"Oops something went wrong and we cannot recover from it.",errors,children:(0,emotion_react_jsx_runtime_browser_esm.tZ)(Button.Z,{variant:"contained",color:"secondary",startIcon:(0,emotion_react_jsx_runtime_browser_esm.tZ)(icons.J,{children:"refresh"}),onClick:function onClick(){location.reload()},children:"Reload"})}):children},ErrorBoundary}(react.Component);try{ErrorBoundary.displayName="ErrorBoundary",ErrorBoundary.__docgenInfo={description:"",displayName:"ErrorBoundary",props:{test:{defaultValue:null,description:"",name:"test",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},onChange:{defaultValue:null,description:"called when the value is changed through user interaction on the interactive control",name:"onChange",required:!1,type:{name:"(e: any, value: any) => {}"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/components/src/errors/ErrorBoundary/ErrorBoundary.tsx#ErrorBoundary"]={docgenInfo:ErrorBoundary.__docgenInfo,name:"ErrorBoundary",path:"libs/components/src/errors/ErrorBoundary/ErrorBoundary.tsx#ErrorBoundary"})}catch(__react_docgen_typescript_loader_error){}const ErrorBoundary_stories={component:ErrorBoundary,argTypes:{children:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}};var ErrorButton=function ErrorButton(){var _useState=(0,react.useState)(null),error=_useState[0],setError=_useState[1];if(error)throw error;return(0,emotion_react_jsx_runtime_browser_esm.tZ)(Button.Z,{variant:"contained",onClick:function onClick(){setError(new Error("An error has occurred"))},children:"Throw Error"})},ErrorBoundary_stories_ErrorBoundary=function Template(args){return(0,emotion_react_jsx_runtime_browser_esm.tZ)(ErrorBoundary,Object.assign({},args,{children:(0,emotion_react_jsx_runtime_browser_esm.tZ)(ErrorButton,{})}))}.bind({});ErrorBoundary_stories_ErrorBoundary.args={},ErrorBoundary_stories_ErrorBoundary.parameters=Object.assign({storySource:{source:"args => (\n    <Component {...args}>\n        <ErrorButton/>\n    </Component>\n)"}},ErrorBoundary_stories_ErrorBoundary.parameters);var __namedExportsOrder=["ErrorBoundary"];try{Meta.displayName="Meta",Meta.__docgenInfo={description:"Metadata to configure the stories for a component.",displayName:"Meta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/components/src/errors/ErrorBoundary/ErrorBoundary.stories.tsx#Meta"]={docgenInfo:Meta.__docgenInfo,name:"Meta",path:"libs/components/src/errors/ErrorBoundary/ErrorBoundary.stories.tsx#Meta"})}catch(__react_docgen_typescript_loader_error){}}}]);