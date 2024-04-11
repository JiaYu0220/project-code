function showConfirmSwal(
  title,
  text = '',
  confirmText = '確定',
  denyText = '我再想想'
) {
  return Swal.fire({
    title,
    text,
    showDenyButton: true,
    confirmButtonColor: '#115BC9',
    confirmButtonText: confirmText,
    denyButtonText: denyText,
  });
}

function showAlertSwal(title, text = '', icon = 'error') {
  return Swal.fire({
    icon,
    title,
    text,
    confirmButtonColor: '#115BC9',
    position: 'center',
  });
}

function showToastSwal(title, text = '', icon = 'success') {
  return Swal.fire({
    icon,
    title,
    text,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
  });
}

export { showConfirmSwal, showAlertSwal, showToastSwal };
