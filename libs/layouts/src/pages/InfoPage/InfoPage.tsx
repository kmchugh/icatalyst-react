import { ComponentColor, ContainerRef, Icon } from '@icatalyst/react/components';
import { mostReadable } from '@icatalyst/react/core';
import { Typography } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import { forwardRef, ReactNode, useCallback, useEffect, useState } from 'react';
import Page, { PageProps } from '../Page';

type StyleProps = {
  backgroundColor: string;
  iconColor: string;
};

const useStyles = makeStyles((theme: any) => {
  return {
    root: {
      textAlign: 'center',
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    excerpt: {
      marginBottom: theme.spacing(4),
    },
    content: {
      marginBottom: theme.spacing(2),
    },
    icon: {
      width: `${theme.spacing(12)}!important`,
      height: `${theme.spacing(12)}!important`,
      fontSize: `${theme.spacing(12)}!important`,

      [theme.breakpoints.up('md')]: {
        width: `${theme.spacing(16)}!important`,
        height: `${theme.spacing(16)}!important`,
        fontSize: `${theme.spacing(16)}!important`,
      },
      marginBottom: theme.spacing(4),
    },
    iconColorFn: ({ backgroundColor, iconColor }: StyleProps) => {
      const color = mostReadable(
        backgroundColor,
        [
          theme.palette[iconColor].main,
          theme.palette[iconColor].light,
          theme.palette[iconColor].dark,
        ]
      )?.toHex8String();

      return {
        color: color
      };
    },
    contentWrapper: {
      marginBottom: theme.spacing(2)
    },
    captionColorFn: ({ backgroundColor }: StyleProps) => {
      const textColor: string = mostReadable(
        backgroundColor,
        [
          theme.palette.text.disabled,
          theme.palette.text.secondary,
          theme.palette.text.primary,
          theme.palette.grey[500]
        ]
      )?.toHex8String() || theme.palette.text.secondary;

      return {
        color: textColor
      };
    }
  };
});

export interface InfoPageProps extends Omit<PageProps, 'children'> {
  title: string;
  /**
   * Can be the string for the icon to display or a component to render
   */
  icon?: ReactNode;
  /**
   * Can be the string for the excerpt box or a component to render
   */
  excerpt?: ReactNode;
  /**
   * Can be the string for the content box or a component to render
   */
  content?: ReactNode;
  iconColor?: ComponentColor;
  children?: ReactNode;
}

export const InfoPage = forwardRef(({
  className,
  style,
  children,
  title,
  icon,
  excerpt,
  content,
  backgroundColor,
  iconColor = 'primary',
  ...rest
}: InfoPageProps, ref) => {
  const theme: any = useTheme();

  // icon could be the icon text, or could be a full node
  const iconName = typeof icon === 'string' ? icon : null;
  const excerptText = typeof excerpt === 'string' ? excerpt : null;
  const contentText = typeof content === 'string' ? content : null;

  const [derivedBackground, setDerivedBackground] = useState<string>();
  const [innerRef, setInnerRef] = useState<ContainerRef>();

  const containerRef = useCallback((node: ContainerRef) => {
    setDerivedBackground(node?.backgroundColor || theme.palette.background.default);
    setInnerRef(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = useStyles({
    backgroundColor: derivedBackground || theme.palette.background.default,
    iconColor
  });

  useEffect(() => {
    if (!containerRef || !ref) {
      return;
    }
    if (typeof ref === 'function') {
      ref(innerRef);
    } else {
      ref.current = innerRef;
    }
  }, [innerRef, containerRef, ref]);

  return (
    <Page
      className={clsx(
        styles.root,
        className
      )}
      backgroundColor={backgroundColor}
      style={style}
      verticalAlign="center"
      horizontalAlign="center"
      ref={containerRef}
      {...rest}
    >
      {
        // Render the IconName or the specified icon Component
        iconName ? (
          <Icon
            className={clsx(
              styles.icon,
              styles.iconColorFn
            )}
            color={iconColor}
          >
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
});

export default InfoPage;