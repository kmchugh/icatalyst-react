import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { FunctionComponent } from 'react';
import { BaseComponent } from '../../types';


const useStyles = makeStyles((theme:any)=>{
  return {
    root : {
      display : 'flex',
      flexDirection : 'row',
      alignItems: 'center',
      overflow: 'hidden',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  };
});

export type CommandPanelItemprops={
    style?:Object
}&BaseComponent<'div'>

export const CommandPanelItem :FunctionComponent<CommandPanelItemprops>=({
    style = {},
    className,
    children
})=>{
    const styles = useStyles();
    return (
        <div
          className={clsx(styles.root, className)}
          style={style}
        >
          {children}
        </div>
      );

}








