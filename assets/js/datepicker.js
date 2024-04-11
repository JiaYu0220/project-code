const appointmentSetting = {
  minDate: 0,
  maxDate: '+1M +10D',
  formatDate: 'yy-mm-dd',
};
const birthdaySetting = {
  changeMonth: true,
  changeYear: true,
};

function datepickerDefault() {
  $.datepicker.setDefaults($.datepicker.regional['zh-TW']);
}

function setAppointDatepicker(target, disabledDates) {
  $(target).datepicker('option', 'beforeShowDay', function (date) {
    // 將日期格式化為 "YYYY/MM/DD"
    const dateString = $.datepicker.formatDate('yy/mm/dd', date);
    // 檢查日期是否在禁用日期列表中
    if (disabledDates.indexOf(dateString) === -1) {
      // 返回 [false] 禁用日期
      return [false];
    }
    // 預設啟用日期
    return [true];
  });
  $(target).datepicker('show');
}
export {
  datepickerDefault,
  appointmentSetting,
  birthdaySetting,
  setAppointDatepicker,
};
