export function asMenuItem(definition, config = {}){
  return {
    id: definition.name + '-component',
    title: config.title || definition.labelPlural,
    type: 'item',
    icon: definition.icon,
    url: (config.root || '/') + definition.namePlural,
    auth: config.auth || definition.auth || 'everyone'
  };
}
