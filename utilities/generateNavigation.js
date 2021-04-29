function getRouteAuth(initialAuth) {
  let auth = initialAuth && initialAuth.route ? initialAuth.route : initialAuth;
  return auth && !Array.isArray(auth) ? [auth] : auth;
}

function createNavItem(item, accumulator = {
  prefix : 'menu',
  pathPrefix : '/'
}) {
  const {
    title, badge, name,
    auth, paths, icon,
    component, path = name
  } = item;

  const children  = (paths || []).filter(p=>p.navigation);

  const {prefix, pathPrefix} = accumulator;
  const id = `${prefix}-${name.toLowerCase().replaceAll(' ', '-')}-${children.length > 0 ? 'group' : 'item'}`;
  const url = `${pathPrefix}${pathPrefix.endsWith('/') ? '' : '/'}${path}`;

  return {
    id,
    title,
    icon,
    badge,
    component,
    auth : getRouteAuth(auth),
    type : children.length > 0 ? 'collapse' : 'item',
    url : url,
    children : children.map((p)=>createNavItem(p, {
      prefix : id,
      pathPrefix : url
    })),
    visible : item.visible
  };
}

function createNavGroup(group) {
  const {
    title, badge, name,
    auth, paths, icon,
    component, path = name
  } = group;

  const children  = (paths || []).filter(p=>p.navigation);

  const id = name.toLowerCase().replaceAll(' ', '-');
  const url = component && path ? `/${path}` : '';

  return {
    id,
    title,
    icon,
    url : children.length >0 ? url : `/${path}`,
    badge,
    component,
    type : children.length > 0 ? 'group' : 'item',
    auth : getRouteAuth(auth),
    children : children.map((p)=>createNavItem(p, {
      prefix : id,
      pathPrefix : `${url}/${path}`
    }))
  };
}

export function generateNavigation(config) {
  return config.filter(i=>i.navigation).map(createNavGroup);
}
