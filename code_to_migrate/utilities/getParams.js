/**
 * Gets the query string portion of the passed query.
 * Using this instead of URLSearchParameters as some
 * browsers don't support
 * @method getQueryStringParams
 * @param  {String}             query the query string
 * @return {Object}                   map of parameters
 */
export function getParams(query) {
  return query ?
    (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        let [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, {}
      ) :
    {};
}
