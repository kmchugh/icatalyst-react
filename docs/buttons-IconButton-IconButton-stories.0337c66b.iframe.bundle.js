"use strict";(self.webpackChunk_icatalyst_react=self.webpackChunk_icatalyst_react||[]).push([[919],{"./libs/components/src/buttons/IconButton/IconButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,h:()=>IconButton});var _home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"),_home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__),_mui_material__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/@mui/material/Tooltip/Tooltip.js")),_mui_material__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@mui/material/IconButton/IconButton.js"),_mui_styles__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js"),clsx__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),_icons_Icon__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./libs/components/src/icons/Icon/index.ts")),_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),_excluded=["className","title","icon","style","color","size","id"],useStyles=(0,_mui_styles__WEBPACK_IMPORTED_MODULE_4__.Z)((function(theme){return{root:{},icon:{},iconBtn:function iconBtn(_ref){var size=_ref.size,sizes={inherit:"1.3em",small:theme.typography.pxToRem(28),medium:theme.typography.pxToRem(32),large:theme.typography.pxToRem(44)};return{width:sizes[size],height:sizes[size]}}}}));function IconButton(_ref2){var className=_ref2.className,title=_ref2.title,icon=_ref2.icon,style=_ref2.style,color=_ref2.color,_ref2$size=_ref2.size,size=void 0===_ref2$size?"medium":_ref2$size,id=_ref2.id,rest=_home_runner_work_icatalyst_react_icatalyst_react_node_modules_babel_runtime_helpers_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0___default()(_ref2,_excluded),styles=useStyles({size});return(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Z,{title:title||"",children:(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)("span",{id,className:(0,clsx__WEBPACK_IMPORTED_MODULE_7__.Z)(styles.root),children:(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Z,Object.assign({className:(0,clsx__WEBPACK_IMPORTED_MODULE_7__.Z)(styles.iconBtn,className),"aria-label":title,style},rest,{children:(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(_icons_Icon__WEBPACK_IMPORTED_MODULE_3__.Z,{size,color,className:(0,clsx__WEBPACK_IMPORTED_MODULE_7__.Z)(styles.icon),children:icon})}))})})}const __WEBPACK_DEFAULT_EXPORT__=IconButton;try{IconButton.displayName="IconButton",IconButton.__docgenInfo={description:"",displayName:"IconButton",props:{title:{defaultValue:null,description:"The text provided here is used as both the tooltip and the aria-label",name:"title",required:!1,type:{name:"string"}},color:{defaultValue:null,description:"Specify the color of the icon",name:"color",required:!1,type:{name:"enum",value:[{value:'"inherit"'},{value:'"action"'},{value:'"disabled"'},{value:'"primary"'},{value:'"secondary"'},{value:'"error"'},{value:'"info"'},{value:'"success"'},{value:'"warning"'}]}},size:{defaultValue:{value:"medium"},description:"The size of the control",name:"size",required:!1,type:{name:"enum",value:[{value:'"inherit"'},{value:'"large"'},{value:'"medium"'},{value:'"small"'}]}},icon:{defaultValue:null,description:"The icon to display.",name:"icon",required:!1,type:{name:"string"}},action:{defaultValue:null,description:"A ref for imperative actions.\nIt currently only supports `focusVisible()` action.",name:"action",required:!1,type:{name:"Ref<ButtonBaseActions>"}},disabled:{defaultValue:{value:"false\nfalse"},description:"If `true`, the component is disabled.",name:"disabled",required:!1,type:{name:"boolean"}},children:{defaultValue:null,description:"The icon to display.\nThe content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"Partial<IconButtonClasses> & Partial<ClassNameMap<never>>"}},tabIndex:{defaultValue:{value:"0"},description:"",name:"tabIndex",required:!1,type:{name:"number"}},centerRipple:{defaultValue:{value:"false"},description:"If `true`, the ripples are centered.\nThey won't start at the cursor interaction position.",name:"centerRipple",required:!1,type:{name:"boolean"}},disableRipple:{defaultValue:{value:"false"},description:"If `true`, the ripple effect is disabled.\n\n⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure\nto highlight the element by applying separate styles with the `.Mui-focusVisible` class.",name:"disableRipple",required:!1,type:{name:"boolean"}},disableTouchRipple:{defaultValue:{value:"false"},description:"If `true`, the touch ripple effect is disabled.",name:"disableTouchRipple",required:!1,type:{name:"boolean"}},focusRipple:{defaultValue:{value:"false"},description:"If `true`, the base button will have a keyboard focus ripple.",name:"focusRipple",required:!1,type:{name:"boolean"}},focusVisibleClassName:{defaultValue:null,description:"This prop can help identify which element has keyboard focus.\nThe class name will be applied when the element gains the focus through keyboard interaction.\nIt's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).\nThe rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).\nA [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components\nif needed.",name:"focusVisibleClassName",required:!1,type:{name:"string"}},LinkComponent:{defaultValue:{value:"'a'"},description:"The component used to render a link when the `href` prop is provided.",name:"LinkComponent",required:!1,type:{name:"ElementType<any>"}},onFocusVisible:{defaultValue:null,description:"Callback fired when the component is focused with a keyboard.\nWe trigger a `onFocus` callback too.",name:"onFocusVisible",required:!1,type:{name:"FocusEventHandler<any>"}},TouchRippleProps:{defaultValue:null,description:"Props applied to the `TouchRipple` element.",name:"TouchRippleProps",required:!1,type:{name:"Partial<TouchRippleProps>"}},touchRippleRef:{defaultValue:null,description:"A ref that points to the `TouchRipple` element.",name:"touchRippleRef",required:!1,type:{name:"Ref<TouchRippleActions>"}},disableFocusRipple:{defaultValue:{value:"false"},description:"If `true`, the  keyboard focus ripple is disabled.",name:"disableFocusRipple",required:!1,type:{name:"boolean"}},edge:{defaultValue:{value:"false"},description:"If given, uses a negative margin to counteract the padding on one\nside (this is often helpful for aligning the left or right\nside of the icon with content above or below, without ruining the border\nsize and shape).",name:"edge",required:!1,type:{name:'false | "start" | "end"'}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"Ref<HTMLButtonElement>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/components/src/buttons/IconButton/IconButton.tsx#IconButton"]={docgenInfo:IconButton.__docgenInfo,name:"IconButton",path:"libs/components/src/buttons/IconButton/IconButton.tsx#IconButton"})}catch(__react_docgen_typescript_loader_error){}},"./libs/components/src/icons/Icon/Icon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>Icon_Icon,Z:()=>icons_Icon_Icon});__webpack_require__("./node_modules/core-js/modules/es.string.starts-with.js"),__webpack_require__("./node_modules/core-js/modules/es.regexp.exec.js"),__webpack_require__("./node_modules/core-js/modules/es.string.split.js");var index_es=__webpack_require__("./node_modules/@fortawesome/react-fontawesome/index.es.js"),Icon=__webpack_require__("./node_modules/@mui/material/Icon/Icon.js"),makeStyles=__webpack_require__("./node_modules/@mui/styles/makeStyles/makeStyles.js"),clsx_m=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),fontawesome_svg_core_index_es=__webpack_require__("./node_modules/@fortawesome/fontawesome-svg-core/index.es.js"),free_solid_svg_icons_index_es=__webpack_require__("./node_modules/@fortawesome/free-solid-svg-icons/index.es.js"),free_regular_svg_icons_index_es=__webpack_require__("./node_modules/@fortawesome/free-regular-svg-icons/index.es.js"),free_brands_svg_icons_index_es=__webpack_require__("./node_modules/@fortawesome/free-brands-svg-icons/index.es.js");fontawesome_svg_core_index_es.vI.add(free_solid_svg_icons_index_es.mRB,free_regular_svg_icons_index_es.NCV,free_brands_svg_icons_index_es.vnX);var emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js"),useStyles=(0,makeStyles.Z)((function(theme){return{root:{},sizeFn:function sizeFn(_ref){var size=_ref.size;return{fontSize:{inherit:"inherit",small:theme.typography.pxToRem(20),medium:theme.typography.pxToRem(24),large:theme.typography.pxToRem(36)}[size]}},colorFn:function colorFn(_ref2){var color=_ref2.color;return{color:{primary:theme.palette.primary.main,secondary:theme.palette.secondary.main,info:theme.palette.info.main,success:theme.palette.success.main,warning:theme.palette.warning.main,action:theme.palette.action.active,error:theme.palette.error.main,disabled:theme.palette.action.disabled,inherit:void 0}[color]}}}}));function Icon_Icon(_ref3){var className=_ref3.className,style=_ref3.style,sx=_ref3.sx,_ref3$children=_ref3.children,children=void 0===_ref3$children?"fa question":_ref3$children,_ref3$color=_ref3.color,color=void 0===_ref3$color?"inherit":_ref3$color,_ref3$size=_ref3.size,size=void 0===_ref3$size?"medium":_ref3$size,styles=useStyles({size,color});if(children.startsWith("fa ")){var faType=children.substring(3).split(" ",2);1===faType.length&&faType.unshift("fas");var faIcon=faType;return(0,emotion_react_jsx_runtime_browser_esm.tZ)(index_es.G,{className:(0,clsx_m.Z)(styles.root,styles.sizeFn,styles.colorFn,className),icon:faIcon,style})}return(0,emotion_react_jsx_runtime_browser_esm.tZ)(Icon.Z,{className:(0,clsx_m.Z)(styles.root,className),style,color,fontSize:size,sx,children})}const icons_Icon_Icon=Icon_Icon;try{Icon_Icon.displayName="Icon",Icon_Icon.__docgenInfo={description:"",displayName:"Icon",props:{children:{defaultValue:{value:"fa question"},description:"The name of the icon to display.\nSupports material icons by using the string directly.  e.g. 'dashboard'\nSupports fontawesome with 'fa' prefix.  e.g. 'fa fab facebook' or 'fa question'",name:"children",required:!1,type:{name:"string"}},color:{defaultValue:{value:"inherit"},description:"The colour of the icon",name:"color",required:!1,type:{name:"enum",value:[{value:'"inherit"'},{value:'"action"'},{value:'"disabled"'},{value:'"primary"'},{value:'"secondary"'},{value:'"error"'},{value:'"info"'},{value:'"success"'},{value:'"warning"'}]}},size:{defaultValue:{value:"medium"},description:"The size of the icon",name:"size",required:!1,type:{name:"enum",value:[{value:'"inherit"'},{value:'"large"'},{value:'"medium"'},{value:'"small"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},onChange:{defaultValue:null,description:"called when the value is changed through user interaction on the interactive control",name:"onChange",required:!1,type:{name:"(e: any, value: any) => {}"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/components/src/icons/Icon/Icon.tsx#Icon"]={docgenInfo:Icon_Icon.__docgenInfo,name:"Icon",path:"libs/components/src/icons/Icon/Icon.tsx#Icon"})}catch(__react_docgen_typescript_loader_error){}},"./libs/components/src/icons/Icon/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_Icon__WEBPACK_IMPORTED_MODULE_0__.J});var _Icon__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/components/src/icons/Icon/Icon.tsx")},"./libs/components/src/buttons/IconButton/IconButton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{IconButton:()=>IconButton,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.function.bind.js");var _IconButton__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/components/src/buttons/IconButton/IconButton.tsx"),_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js");const __WEBPACK_DEFAULT_EXPORT__={component:_IconButton__WEBPACK_IMPORTED_MODULE_2__.h,argTypes:{},parameters:{controls:{expanded:!0}}};var IconButton=function Template(args){return(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(_IconButton__WEBPACK_IMPORTED_MODULE_2__.h,Object.assign({},args))}.bind({});IconButton.args={},IconButton.parameters=Object.assign({storySource:{source:"args => <Component {...args} />"}},IconButton.parameters);var __namedExportsOrder=["IconButton"];try{Meta.displayName="Meta",Meta.__docgenInfo={description:"Metadata to configure the stories for a component.",displayName:"Meta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["libs/components/src/buttons/IconButton/IconButton.stories.tsx#Meta"]={docgenInfo:Meta.__docgenInfo,name:"Meta",path:"libs/components/src/buttons/IconButton/IconButton.stories.tsx#Meta"})}catch(__react_docgen_typescript_loader_error){}}}]);