// TODO: Also make a localstorage hook with state
// updates based on localstorage change events



export function getFromLocalStore(key){
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key)) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls;
}

export function saveToLocalStore(key, value){
  if (global.localStorage) {
    global.localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }
}
