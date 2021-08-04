const NAME = /[\p{L}|\p{N}]+[\p{L}|\p{N}|\s|\-|_]*[\p{L}|\p{N}]+/u;

export const isValidName = (text) => {

  return text != text.match(NAME);
};