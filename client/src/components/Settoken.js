export const Yup = () => {

      localStorage.getItem('token') ?localStorage.removeItem('token') : localStorage.setItem('token',"hiatthetoken")
}