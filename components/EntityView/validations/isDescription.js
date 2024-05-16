import { getCleanText } from '@icatalyst/utilities/getCleanText';

export const isDescription = (text) => {
  return getCleanText(text.description) !== text.description ?
    'The "description" property cannot contain script tags, potentially dangerous tags, or attributes like "onload" or "onerror" ' :
    null;

};