export function unflatten(data) {
  if (Object(data) !== data || Array.isArray(data))
    return data;
  var result = {}, cur, prop, parts, idx;
  for(var p in data) {
    cur = result, prop = '';
    parts = p.split('.');
    for(var i=0; i<parts.length; i++) {
      idx = !isNaN(parseInt(parts[i]));
      cur = cur[prop] || (cur[prop] = (idx ? [] : {}));
      prop = parts[i];
    }
    cur[prop] = data[p];
  }
  return result[''];
}
