var URI_PATTERN = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

/**
 * Determines if the URL passed in is a valid url
 * @method isValidURI
 * @param  {String}   value The URL to check
 * @return {Boolean}        true if valid, false otherwise
 */
export const isValidURI = (value) => {
  return !!URI_PATTERN.test(value);
};

/**
 * Converts the number of bytes passed in to a human readable format
 * @method formatBytes
 * @param  {[type]}    bytes        The number of bytes
 * @param  {Number}    [decimals=2] The maximum number of decimal places
 * @return {[type]}                 The human readable format
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
