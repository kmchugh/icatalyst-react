// import _ from '@lodash';

export function generateRoutes(routeConfig, accumulator = {
  depth : 0,
  route : ''
}) {
  const {route, depth} = accumulator;
  const {path = '', component, settings} = routeConfig;
  const resolvedPath = `${route}${path}`;

  return [
    // Current path
    (depth > 0 ? {
      path : resolvedPath,
      // exact : true,
      component,
      settings : settings || null,
      routeConfig : routeConfig
    } : null),
    // Child paths
    ...(routeConfig.paths ? routeConfig.paths
      .sort((a, b)=>b.path.length - a.path.length)
      .flatMap((p)=>generateRoutes(p, {
        depth: depth +1,
        route : resolvedPath + '/'
      })) : [])].filter(i=>i && i.component);
}
