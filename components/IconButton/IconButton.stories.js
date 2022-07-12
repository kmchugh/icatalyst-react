// import IconButton from "../";
import IconButton from ".";

export default {
    title: 'Icon',
    component:IconButton ,
  };
  
  export const Icons = (args) => <IconButton {...args} />;

  Icons.args={
    size:"90px",
    title:"button",
    icon:"*",
    color:"red"
  }