export const SET_LANGUAGE = '[LANGUAGE] SET LANGUAGE';

export function setLanguage(lookup) {
  return {
    type : SET_LANGUAGE,
    payload : {
      lookup
    }
  };
}
