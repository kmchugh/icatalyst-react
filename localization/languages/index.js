export {isRTL} from './languages';
export {default as languages} from './languages';

export const getPreferredLanguage = ()=>{
  return navigator.languages
    ? navigator.languages[0]
    : (navigator.language || navigator.userLanguage);
};
