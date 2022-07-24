import { BaseComponent, ComponentColor, ComponentSize, IconButton, IconButtonProps, NavigationToggleButton, useSettingsSelector } from '@icatalyst/react/components';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { isValidElement, ReactNode } from 'react';

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            marginBottom: theme.spacing(3),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

            [theme.breakpoints.down('md')]: {
                alignItems: 'flex-start',
            }
        },
        title: {
            paddingTop: theme.spacing(.25),

            [theme.breakpoints.down('md')]: {
                fontSize: theme.typography.h5.fontSize,
            },

            [theme.breakpoints.down('xs')]: {
                paddingTop: 0
            },

            display: '-webkit-box',
            '-webkit-line-clamp': 2,
            lineClamp: 2,
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        mobileNavButton: {
            marginRight: theme.spacing(1),
            display: 'none',

            [theme.breakpoints.down('lg')]: {
                display: 'inline-flex'
            }
        },
        spacer: {
            flexGrow: 1,
            minWidth: theme.spacing(1),
            height: '100%'
        },
        actions: {
            display: 'flex',
            flexDirection: 'column',

            [theme.breakpoints.up('sm')]: {
                flexDirection: 'row',
            }
        },


        iconColorFn: {},
    };
});

export interface PageHeaderProps extends BaseComponent<'span'> {
    renderNavigation?: boolean;
    title: string;
    size?: ComponentSize;
    actions?: (IconButtonProps | ReactNode)[]
}

export function PageHeader({
    className,
    style,
    renderNavigation = true,
    title,
    size = 'medium',
    actions
}: PageHeaderProps) {
    const styles = useStyles();

    const typographyVariants: {
        [key in ComponentSize]: Variant | 'inherit';
    } = {
        inherit: 'inherit',
        small: 'h5',
        medium: 'h4',
        large: 'h2'
    };

    const { toolbar } = useSettingsSelector((settings) => {
        return settings.current?.layout;
    });

    return (
        <div
            className={clsx(styles.root, className)}
            style={style}
        >
            {
                // If the toolbar is not displayed then we need
                // to allow access to the navigation
                (!toolbar.display && renderNavigation) && (
                    <NavigationToggleButton className={clsx(
                        styles.mobileNavButton,
                        styles.iconColorFn
                    )}
                        title={'toggle'}
                    />
                )
            }

            <Typography
                className={styles.title}
                variant={typographyVariants[size]}
                component="h1"
            >
                {title}
            </Typography>

            <div className={styles.spacer} />

            {actions && (
                <div className={styles.actions}>
                    {
                        actions.map((action) => {
                            if (isValidElement(action)) {
                                return action;
                            }
                            const iconProps = action as IconButtonProps;
                            return <IconButton
                                key={iconProps.icon}
                                {...iconProps}
                                size={iconProps.size || 'small'}
                                color={iconProps.color || 'primary' as ComponentColor}
                            />;
                        }).filter(i => i)
                    }
                </div>
            )}
        </div>
    );
}

export default PageHeader;