/**
 * Ensures that the value provided is a human readable string that:
 * - Is alpha numeric (includes unicode characters),
 * - Allows spaces, underscores, and hyphens
 * - Starts and ends with a letter or number
 * @param  {String}  text The text value to check
 * @return {boolean}      true if the passed value is valid
 */
export declare const isName: (text: string) => boolean;
