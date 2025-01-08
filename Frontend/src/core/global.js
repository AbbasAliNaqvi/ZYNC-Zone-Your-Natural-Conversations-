import { create } from 'zustand'
import secure from './secure'
const useGlobal = create((set) => ({
  
    authenticated: false,
    user:{},

    login: (credentials , user) => {
        secure.set('credentials', credentials)
        set((state) => ({
            authenticated : true,
            user: user
        }))
    },


    logout: ()=> {
        secure.wipe()
        set((state) => ({
            authenticated:false,
            user:{}
        }))

        }
}))

export default useGlobal