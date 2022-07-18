const uris = {};

 const URIService = {
  registerURI : (service, key, uri)=>{
    if (!uris[service]) {
      uris[service] = {};
    }
    uris[service][key] = uri;
  },
  getURI : (service, key)=>{
    if (!uris[service] || !uris[service][key]) {
      console.error(`invalid uri requested ${service}/${key}`);
      return null;
    }
    return uris[service][key];
  }
};

export default URIService;