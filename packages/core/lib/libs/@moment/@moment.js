import moment from 'moment';
// @ts-expect-error
moment.locale(window.navigator.userLanguage || window.navigator.language);
export default moment;
