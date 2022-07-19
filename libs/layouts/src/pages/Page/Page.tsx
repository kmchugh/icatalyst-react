import {forwardRef} from 'react';
import { ContainerComponent, NavigationToggleButton, useHookWithRefCallback } from '@icatalyst/react/components';
import { mostReadable, tinycolor } from '@icatalyst/react/core';
import { Hidden } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { RefObject, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type StyleProps = {
  backgroundColor? : string
};

const useStyles = makeStyles((theme : any) => {
    const transparentPrimary = tinycolor(theme.palette.primary.main).setAlpha(.6).toHex8String();
    const transparentSecondary = tinycolor(theme.palette.secondary.main).setAlpha(.6).toHex8String();
    return {
        root: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        flexShrink: 0
        },
        mobileNavButton : {
        position: 'absolute',
        top: 0,
        left: 0
        },
        backgroundFn : ({backgroundColor} : StyleProps)=>{
            return backgroundColor ? {
                backgroundColor
            } : {};
        },
        iconColorFn : ({backgroundColor} : StyleProps)=>{
            const textColor : string = mostReadable(
            backgroundColor || theme.palette.background.default,
            [
                transparentPrimary,
                transparentSecondary
            ]
            )?.toHex8String() || theme.palette.action.active;
    
            return {
                color : textColor
            };
        },
        colorFn : ({backgroundColor} : StyleProps)=>{
        const textColor : string = mostReadable(
            backgroundColor || theme.palette.background.default,
            [
            theme.palette.text.primary,
            theme.palette.primary.contrastText,
            theme.palette.secondary.contrastText,
            ]
        )?.toHex8String() || theme.palette.text.primary;

        return {
            color : textColor
        };
        }
    };
});

export interface PageProps extends ContainerComponent<'div'> {
  /**
   * Sets the background color and text updates to reflect most readable
   */
  backgroundColor? : string;
  /**
   * Renders a navbar toggle button if on a small device
   */
  renderNavigation? : boolean;
  ref? : RefObject<HTMLElement>;
}

export const Page = forwardRef(({
    className,
    style,
    children,
    backgroundColor,
    renderNavigation = true
} : PageProps, ref)=>{
    // TODO: Create a useBackgroundColor hook which will get the parent element with a background set and extract the color
  const [derivedBackground, setDerivedBackground] = useState<string | undefined>(backgroundColor);

  useEffect(() => {
      setDerivedBackground(backgroundColor);
  }, [backgroundColor]);

  const styles = useStyles({
    backgroundColor
  });

  const {toolbar = {
    display : false
  }} = useSelector<any, {
    toolbar : {
      display : boolean
    }
  }>(({icatalyst}) => icatalyst.settings.current.layout);

  const [pageRef] = useHookWithRefCallback((ref) => {
      if (ref && !derivedBackground) {
          const color = tinycolor(getComputedStyle(ref).backgroundColor);
          if (color.getAlpha() > 0) {
              setDerivedBackground(color.toHex8String());
          }
      }
  }, []);


  return (
    <div 
        className={clsx(
          styles.root, 
          styles.colorFn,
          styles.backgroundFn,
          className
        )} 
        style={style}
        ref={pageRef}
    >
        {
        // If the toolbar is not displayed then we need
        // to allow access to the navigation
        (!toolbar.display && renderNavigation) && (
            <div style={{
                minHeight : 10,
                minWidth: 10,
                position: 'absolute',
                top: 0,
                left: 0,
            }}>
                <Hidden lgUp>
                    <NavigationToggleButton className={clsx(
                        styles.mobileNavButton,
                        styles.iconColorFn
                    )}/>
                </Hidden>
            </div>
        )
      }
        {children}
    </div>
  );
});

export default Page;