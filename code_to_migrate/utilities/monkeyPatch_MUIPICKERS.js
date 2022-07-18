const monkeyPatch = (utils, moment)=>{
  // Monkey patching until the date-picker v5 comes out, expected in ~Nov-Dec 2021
  if (!utils.getDayText){
    const locale = moment.locale();
    const yearMonthFormat = 'MMMM yyyy';
    const format = (date, format) => {
      return date.format(format);
    };

    utils.getDayText = (date) => {
      return format(date, 'DD', { locale: locale });
    };

    utils.getHourText = (date, ampm) => {
      return format(date, ampm ? 'hh' : 'HH', { locale: locale });
    };

    utils.getMinuteText = (date) => {
      return format(date, 'mm', { locale: locale });
    };

    utils.getSecondText = (date) => {
      return format(date, 'ss', { locale: locale });
    };

    utils.getCalendarHeaderText = (date) => {
      return format(date, yearMonthFormat, { locale: locale });
    };

    utils.getYearText = (date) => {
      return format(date, 'yyyy', { locale: locale });
    };

    utils.getDatePickerHeaderText = (date) => {
      return format(date, 'ddd, MMM d', { locale: locale });
    };

    utils.getDateTimePickerHeaderText = (date) => {
      return format(date, 'MMM d', { locale: locale });
    };

    utils.getMonthText = (date) => {
      return format(date, 'MMMM', { locale: locale });
    };

    utils.getMeridiemText = (ampm) => {
      return ampm === 'am' ? 'AM' : 'PM';
    };
  }
};
export default monkeyPatch;
