import useAxios, { configure } from 'axios-hooks'

configure({
  defaultOptions: {
    ssr: false
  }
})

export default useAxios