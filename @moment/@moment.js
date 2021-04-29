import moment from 'moment';

moment.locale(window.navigator.userLanguage || window.navigator.language);
export default moment;
