import { getCleanText } from '../../../utilities';

export const isCleanText = (propName, text) => {
  console.log('text', text);
  console.log('cleanText(text)', getCleanText(text));
  return getCleanText(text) !== text ?
    `The "${propName}" property cannot contain script tags, potentially dangerous tags, or attributes like "onload" or "onerror" ` :
    null;

};