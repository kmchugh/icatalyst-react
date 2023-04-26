import { cleanText } from '../../../../utilities';

export const isDescription = (text) => {
  return cleanText(text.description) !== text.description ?
    'The "description" property cannot contain script tags, potentially dangerous tags, or attributes like "onload" or "onerror" ' :
    null;

};