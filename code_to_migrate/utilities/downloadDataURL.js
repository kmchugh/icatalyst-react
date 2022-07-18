export function downloadDataURL(data, filename){
  var anchor = document.createElement('a');
  anchor.setAttribute('href', data);
  anchor.setAttribute('download', filename);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
