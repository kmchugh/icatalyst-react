import { Icon, useHookWithRefCallback } from '@icatalyst/react/components';
import { mostReadable, tinycolor } from '@icatalyst/react/core';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';
import Page, { PageProps } from '../Page';

type StyleProps = {
  backgroundColor? : string
};

const useStyles = makeStyles((theme : any) => {
  return {
    root: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    title : {
      marginBottom: theme.spacing(2),
    },
    excerpt : {
      marginBottom: theme.spacing(1),
    },
    content : {
      marginBottom: theme.spacing(2),
    },
    iconFn : ({backgroundColor} : StyleProps)=> {
      const iconColor : string = mostReadable(
        backgroundColor || theme.palette.background.default,
        [
          theme.palette.primary.main,
          theme.palette.secondary.main
        ]
      )?.toHex8String() || theme.palette.primary.main;

      return {
        width: `${theme.spacing(12)}!important`,
        height: `${theme.spacing(12)}!important`,
        fontSize: `${theme.spacing(12)}!important`,

        [theme.breakpoints.up('md')]: {
          width:  `${theme.spacing(16)}!important`,
          height: `${theme.spacing(16)}!important`,
          fontSize: `${theme.spacing(16)}!important`,
        },
        marginBottom: theme.spacing(4),
        color : backgroundColor ? iconColor : theme.palette.primary.main
      };
    },
    contentWrapper : {
      marginBottom: theme.spacing(2)
    },
    captionColorFn : ({backgroundColor} : StyleProps)=>{
      const textColor : string = mostReadable(
        backgroundColor || theme.palette.background.default,
        [
          theme.palette.text.disabled,
          theme.palette.text.secondary,
          theme.palette.text.primary,
          theme.palette.grey[500]
        ]
      )?.toHex8String() || theme.palette.text.secondary;

      return {
        color : textColor
      };
    }
  };
});

export interface InfoPageProps extends Omit<PageProps, 'children'> {
  title: string;
  /**
   * Can be the string for the icon to display or a component to render
   */
  icon? : ReactNode;
  /**
   * Can be the string for the excerpt box or a component to render
   */
  excerpt? : ReactNode;
  /**
   * Can be the string for the content box or a component to render
   */
  content? : ReactNode;
  children? : ReactNode;
}

export function InfoPage({
  className,
  style,
  children,
  title,
  icon,
  excerpt,
  content,
  backgroundColor
}: InfoPageProps) {
  
  // icon could be the icon text, or could be a full node
  const iconName = typeof icon === 'string' ? icon : null;
  const excerptText = typeof excerpt === 'string' ? excerpt : null;
  const contentText = typeof content === 'string' ? content : null;

  // TODO: Create a useBackgroundColor hook which will get the parent element with a background set and extract the color
  const [derivedBackground, setDerivedBackground] = useState<string | undefined>(backgroundColor);

  useEffect(() => {
      setDerivedBackground(backgroundColor);
  }, [backgroundColor]);

  const styles = useStyles({
    backgroundColor
  });

  const [pageRef] = useHookWithRefCallback((ref) => {
      if (ref && !derivedBackground) {
          const color = tinycolor(getComputedStyle(ref).backgroundColor);
          if (color.getAlpha() > 0) {
              setDerivedBackground(color.toHex8String());
          }
      }
  }, []);


  return (
    <Page 
        className={clsx(
          styles.root,
          className
        )}
        backgroundColor={backgroundColor}
        style={style}
        ref={pageRef}
    >
      {
        // Render the IconName or the specified icon Component
        iconName ? (
          <Icon 
            className={clsx(styles.iconFn)}>
              {iconName}
            </Icon>
        ) : icon
      }

      <Typography
        variant="h4"
        component="h1"
        className={clsx(styles.title)}
      >
        {title}
      </Typography>

      {
        // Render the excerpt text or the specified info Component
        excerptText ? (
          <Typography
            variant="subtitle1"
            component="div"
            className={clsx(styles.excerpt, styles.captionColorFn)}
          >
              {excerpt}
            </Typography>
        ) : excerpt
      }

      {
        // Render the content text or the specified info Component
        contentText ? (
          <Typography
            variant="caption"
            component="div"
            className={clsx(styles.content, styles.captionColorFn)}
          >
              {content}
            </Typography>
        ) : content
      }

      {
        children && (
          <div className={clsx(styles.contentWrapper, styles.captionColorFn)}>
            {children}
          </div>
        )
      }

    </Page>
  );
}

export default InfoPage;