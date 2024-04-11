function datepickerDefault() {
  $.datepicker.setDefaults($.datepicker.regional['zh-TW']);
}

const appointmentSetting = {
  minDate: 0,
  maxDate: '+1M +10D',
  formatDate: 'yy-mm-dd',
};
const birthdaySetting = {
  changeMonth: true,
  changeYear: true,
};

export { datepickerDefault, appointmentSetting, birthdaySetting };
