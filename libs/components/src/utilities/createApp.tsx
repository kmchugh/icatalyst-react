/*global gtag*/

import { Store } from "@reduxjs/toolkit";
import { App, AppProps } from "../application";
import { LayoutT, RouteT } from "../types";
import { ThemeDeclarationT } from "../types/theme-delcaration.type";

// export function reportWebVitals({
//     name,
//     delta,
//     value,
//     id
// }){
//     if (gtag !== undefined) {
//         gtag('event', name, {
//             value : delta,
//             metric_id : id,
//             metric_value : value,
//             metric_delta : delta,
//             nonInteraction  :true,
//             transport : 'beacon'
//         });
//     }
// }

export interface CreateAppProps<T extends Store> {
  store: T,
  layouts: LayoutT[],
  routes: RouteT[],
  themes: ThemeDeclarationT[]
};

export function createApp<T extends Store>({
  store,
  layouts,
  themes,
}: CreateAppProps<T>) {

  const AppContainer = ({
    children,
    routes
  }: AppProps) => {
    return (
      <App
        store={store}
        layouts={layouts}
        routes={routes}
        themes={themes}
      >
        {children}
      </App>
    );
  };

  return AppContainer;
};

export default createApp;