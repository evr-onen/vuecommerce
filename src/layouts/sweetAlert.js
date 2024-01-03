import Swal from 'sweetalert2'

export const Toast = () => {
  const SuccessToast = (title, text) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'green',

      customClass: {
        heightAuto: false,
        title: 'toastTitle',
        popup: 'colored-toast toast-height'
      },
      showConfirmButton: false,
      timer: 1500000,
      timerProgressBar: false,
      background: '#EDFEF2'
    })
    Toast.fire({
      icon: 'success',
      title: title,
      text: text,
      timer: 1500,
      showConfirmButton: false
    })
  }
  const ErrorToast = (title, text) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'red',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: false,
      background: '#FCF0F0'
    })
    Toast.fire({
      icon: 'error',
      title: title,
      text: text,
      timer: 1500,
      showConfirmButton: false
    })
  }

  return { SuccessToast, ErrorToast }
}
export const Alert = () => {
  // gelistirilecek
  const QuestionAlert = (title, text, succesMessage, errorMessage, successFunction) => {
    Swal.fire({
      title: title,
      text: text,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'OK',
      denyButtonText: `Cancel`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // successFunction()
        Swal.fire(succesMessage, '', 'success')
      } else if (result.isDenied) {
        Swal.fire(errorMessage, '', 'info')
      }
    })
  }

  return { QuestionAlert }
}
