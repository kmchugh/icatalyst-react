export const CLIENT_UPDATED = '[CLIENT] UPDATED';
export const CLIENT_SINGULARITY_UPDATED = '[CLIENT] SINGULARITY UPDATED';

// {
//   "defaultscope": "profile auth",
//   "created": 1557786121265,
//   "createdby": "unknown",
//   "modified": 1613368672328,
//   "description": null,
//   "requiretermsaccepted": true,
//   "initialroleid": null,
//   "hascredentials": true,
//   "modifiedby": "unknown",
//   "redirectionuris": "http://localhost:9000/login http://localhost:9001/login https://api-dev.meacora.com/login http://0.0.0.0:4335/",
//   "websiteuri": "https://www.icatalyst.com",
//   "backgrounduri": "https://meacora.com/wp-content/uploads/sites/6/brizy/10143/assets/images/iW=5000&iH=any/c97446d6930e420a934b5915a15f1bbd.jpg",
//   "adminemail": null,
//   "guid": "24baf9b1-5b92-4b09-b85e-d465315b3fa5",
//   "billingemail": null,
//   "clienttype": "CONFIDENTIAL",
//   "companyid": "b8d8a9b672985b1df0c1c580e2981200646f9120945b31f5407722bda0e1e62a",
//   "name": "CORA - DEV",
//   "termsuri": null,
//   "logouri": "https://meacora.com/wp-content/uploads/sites/6/brizy/10143/assets/images/iW=118&iH=166&oX=0&oY=0&cW=118&cH=166/e967786c22f3ff3c2ed543ce49a71b64.png",
//   "privacyuri": "https://icatalyst.com/privacy-policy/"
// }

export function setClient(client) {
  return {
    type : CLIENT_UPDATED,
    payload : {
      ...client
    }
  };
}

export function setSingularityClient(client) {
  return {
    type : CLIENT_SINGULARITY_UPDATED,
    payload : {
      ...client
    }
  };
}
