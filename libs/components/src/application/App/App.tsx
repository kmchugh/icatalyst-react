import { CssBaseline } from '@mui/material';
import { Store } from '@reduxjs/toolkit';
import React, { useContext } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from '../../errors';
import { Layout } from '../../layouts';
import { UpdateAvailable } from '../../notifications';
import { Theme } from '../../themes';
import { ContainerComponent, LayoutT, RouteT } from '../../types';

export type AppContext = {
    layouts?: LayoutT[],
    routes?: RouteT[]
};

export const AppContext = React.createContext<AppContext>({});

export interface AppProps extends ContainerComponent<'div'> {
    store: Store,
    layouts: LayoutT[],
    routes: RouteT[],
}

export function App({
    store,
    layouts,
    children,
    routes = []
}: AppProps) {
    // Allow for rendering apps inside apps
    const context = useContext(AppContext);
    const useRouter = Object.keys(context).length === 0;

    const content = (
        <>
            <CssBaseline />
            <AppContext.Provider value={{
                routes: routes,
                layouts: layouts,
            }}>
                <Provider store={store}>
                    {/* <SettingsProvider/> */}
                    <Theme>
                        <UpdateAvailable />
                        <ErrorBoundary>
                            {/* TODO: Allow wrapping of the layout to include things like Singularity */}
                            <Layout>
                                {children}
                            </Layout>
                        </ErrorBoundary>
                    </Theme>
                    {/* </SettingsProvider> */}
                </Provider>
            </AppContext.Provider>
        </>
    );


    return useRouter ? (
        <Router>
            {content}
        </Router>
    ) : content;
}

export default App;



// /*global gtag*/

// import { CssBaseline } from "@mui/material";
// import { Store } from "@reduxjs/toolkit";
// import { ReactNode } from "react";
// import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
// import { ErrorBoundary } from "../errors";
// import { UpdateAvailable } from "../notifications";
// import { Theme } from "../themes";

// // export function reportWebVitals({
// //     name,
// //     delta,
// //     value,
// //     id
// // }){
// //     if (gtag !== undefined) {
// //         gtag('event', name, {
// //             value : delta,
// //             metric_id : id,
// //             metric_value : value,
// //             metric_delta : delta,
// //             nonInteraction  :true,
// //             transport : 'beacon'
// //         });
// //     }
// // }

// export interface AppProps {
//   children?: ReactNode,
// };

// export interface CreateAppProps<T extends Store> {
//   store: T
// };

// export function createApp<T extends Store>({
//   store
// }: CreateAppProps<T>) {

//   const App = ({
//     children
//   }: AppProps) => {
//     return (
//       <AppContextComponent>
//         <Provider store={store}>
//           <Theme>
//             <CssBaseline />
//             <UpdateAvailable />
//             <ErrorBoundary>
//               <Router>
//                 {children}
//               </Router>
//             </ErrorBoundary>
//           </Theme>
//         </Provider>
//       </AppContextComponent>
//     );
//   };
//   return App;
// };

// export default createApp;


// {/* <SettingsProvider getReducerRoot={({icatalyst})=>{
//                 return icatalyst.settings;
//               }}>
//                 <Theme>
//                   <ErrorBoundary>
//                     <Router history={history}>
//                       <Singularity config={{
//                         ...singularityConfig,
//                         mapRoles : mapAuthRoles,
//                         // Allows customisation of the roles that are displayed to the user
//                         // filterDisplayRoles : filterDisplayRoles,
//                       }}>
//                         <CssBaseline/>
//                         <Layout/>
//                       </Singularity>
//                     </Router>
//                   </ErrorBoundary>
//                 </Theme>
//               </SettingsProvider> */}