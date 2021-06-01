
const models = {};

let mapModelFn = ((m)=>m);

const ModelService = {
  setMapModel : (mapFn)=>{
    mapModelFn = mapFn;
  },
  mapModel : (model)=>{
    return mapModelFn ? mapModelFn(model) : model;
  },
  registerModel : (service, model)=>{
    if (!models[service]) {
      models[service] = {};
    }
    if (models[service][model.name]) {
      console.warn(
        `${model.name} is being overwritten.  This is probably an error`, models[service][model.name], model
      );
    }
    models[service][model.name] = model;
  },
  getModel : (service, key)=>{

    if (!models[service] || !models[service][key]) {
      console.warn(`invalid model requested ${service}/${key}`);
      return null;
    }
    return models[service][key];
  }
};

export default ModelService;

try {
  require('app/init');
} catch (err) {
  // Do nothing here
}
