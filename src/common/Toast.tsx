
import toast from 'react-hot-toast'

/**OPTIONS FOR TOAST */
let options: any = {
  position: 'top-center',
  // autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  id: 'toast',
  duration: 5000,
  className: 'toster-bar',
}

/**TOAST COMPONENT FOR NOTIFICATIONS */
class Toaster {
  /**FOR SUCCESS */
  success = (message: any, option: Partial<typeof options> = {}) => {
    toast.success(message, { ...options, ...option });
  };

  /**FOR ERRROR */
  error = (message: any) => {
    toast.error(message, options)
  }

  /**FOR INFO */
  info = (message: any) => {
    toast.success(message, options)
  }
}
const toaster = new Toaster()
export default toaster