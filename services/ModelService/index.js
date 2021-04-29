const models = {};

const ModelService = {
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
