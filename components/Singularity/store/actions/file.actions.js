import {generateActions} from '@icatalyst/utilities/generateActions';
import {generateOperations} from '@icatalyst/utilities/generateOperations';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('singularity_files');

export const operations = generateOperations({
  uri: ()=>{
    return URIService.getURI('singularity', 'fileUpload');
  }
}, actions);

export function uploadFile(accessToken, root='/', file, callback) {
  return (dispatch) => {
    let fileBlob = file;
    if (file.size === undefined) {
      fileBlob = new Blob(['.directory'], {type:'text/plain'});
      Object.keys(file).forEach((key)=>{
        fileBlob[key] = file[key];
      });
      fileBlob['path'] = (root + file.path).replaceAll('\\/\\/', '/');
    }

    const formData = new FormData();

    Object.keys(fileBlob).forEach((key)=>{
      formData.append(key, fileBlob[key]);
    });
    formData.append('file', fileBlob, file.name);
    formData.append('size', fileBlob.size);
    formData.append('type', fileBlob.type);
    formData.append('state', 'fileupload');

    if (file.size !== undefined) {
      // This was a file object so append required fields
      formData.append('name', file.name);
      formData.append('path', (root + file.path.replace(file.name, '')).replaceAll('//', '/'));
      formData.append('extension', file.type);
      formData.append('usermodified', file.lastModified || new Date(file.lastModifiedDate).getTime());
    }
    const addOperation = operations['ADD_ENTITY'];

    return dispatch(
      addOperation(formData,
        callback, {
          parse : false,
          contentType : 'multipart/form-data',
          accessToken : accessToken,
          params : {}
        }
      )
    );
  };
}

export function uploadFiles(accessToken, root='/', files, callback) {
  return (dispatch)=>{
    return Promise.allSettled(files.map((file)=>dispatch(uploadFile(accessToken, root, file)).promise)).then(results=>{
      const resultSet = results.reduce((acc, result, index)=>{
        if (result.status === 'rejected') {
          acc['rejected'].push({
            index : index,
            file : files[index],
            reason : result.reason
          });
        } else {
          acc['accepted'].push(result.value);
        }
        return acc;
      }, {
        rejected : [],
        accepted : []
      });
      // TODO: Pass errors back to callback
      callback(
        resultSet.rejected.length > 0 ? resultSet.rejected : null,
        resultSet.accepted.length > 0 ? resultSet.accepted : null,
      );
    });
  };
}
