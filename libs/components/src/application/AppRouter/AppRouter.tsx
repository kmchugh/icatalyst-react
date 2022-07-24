import { ReactNode, useContext, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppContext } from '../App/App';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppRouterProps {
    children?: ReactNode
}

export function AppRouter({
    children
}: AppRouterProps) {
    const { routes = [] } = useContext(AppContext);

    // Order the routes, and add a default if one does not exist
    const renderedRoutes = useMemo(() => {
        const sortedRoutes = routes.sort((a, b) => {
            // Default path is always last
            if (a.path === '*') { return 1; }
            if (b.path === '*') { return -1; }
            return a.path.localeCompare(b.path);
        });

        if (sortedRoutes.length === 0 || sortedRoutes[sortedRoutes.length - 1].path !== '*') {
            // Add the default route if it was not specified
            sortedRoutes.push({
                title: 'default',
                component: children || <div>ADD A DEFAULT NOT FOUND PAGE</div>,
                path: '*',
                navigation: false
            });
        }
        return sortedRoutes.map((route) => {
            return (<Route
                key={route.path}
                path={route.path}
                element={route.component}
            />);
        });
    }, [routes]);

    return (
        <Routes>
            {renderedRoutes}
        </Routes>
    );
}

export default AppRouter;