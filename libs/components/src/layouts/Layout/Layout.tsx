import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { JSXElementConstructor, ReactElement, ReactNode, useContext, useMemo } from 'react';
import { AppContext, AppRouter } from '../../application';
import { useSettingsSelector } from '../../store';
import { ContainerComponent } from '../../types';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {
            width: '100%',
            height: '100%'
        },
    };
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LayoutProps extends Omit<ContainerComponent<'div'>, 'children'> {
    children?: ReactNode
}


export function Layout({
    children,
    ...rest
}: LayoutProps) {
    const styles = useStyles();

    const { layouts = [] } = useContext(AppContext);

    const { current, defaults } = useSettingsSelector(state => state);

    console.log({ current, defaults });

    const Component: JSXElementConstructor<any> = useMemo(() => {
        // First get the layout from current
        // if not available take the default

        //(currentSettings.layout.component || defaultSettings.layout.component)();

        // If not available take the first from layouts
        if (layouts.length > 0) {
            return layouts[0].component;
        }

        return (({ children }: any) => {
            // If not available create a default
            return (
                <div className={clsx(styles.root)}>
                    <AppRouter>{children}</AppRouter>
                </div>
            );
        });
    }, [
        layouts, styles.root//, current, defaults, 
    ]);

    return <Component {...rest}>
        {children}
    </Component>
}

export default Layout;