/**
 * Converts the number of bytes passed in to a human readable format
 * @method formatBytes
 * @param  {[type]}    bytes        The number of bytes
 * @param  {Number}    [decimals=2] The maximum number of decimal places
 * @return {[type]}                 The human readable format
 */
export function formatBytes(bytes, decimals) {
    if (decimals === void 0) { decimals = 2; }
    if (bytes === 0)
        return '0 Bytes';
    var k = 1024;
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
;
