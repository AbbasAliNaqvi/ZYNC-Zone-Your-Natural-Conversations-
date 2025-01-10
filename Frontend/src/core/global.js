import { create } from 'zustand'
import secure from './secure'
import api from './api'
import utlis from './utlis'
const useGlobal = create((set) => ({
    // initialization
    initialized: false,
    init: async () => {
        const credentials = await secure.get('credentials')
        if (credentials) {
            try {
                const response = await api({
                    method: 'POST',
                    url: "signin/", 
                    data: {
                        username: credentials.username,
                        password: credentials.password,
                    },
                })
                if (response.status !== 200) {
                    throw 'Authentication error'
                }
                const user = response.data.user
                const tokens = response.data.tokens

                secure.set('tokens' , tokens)

                set((state) => ({
                    initialized: true,
                    authenticated: true,
                    user: user
                }))
                return
            } catch (error) {
                console.log('useGlobal.init: ', error)
            }
        }
        set((state) => ({
            initialized: true,
        }))
    },

    // authentication
    authenticated: false,
    user: {},

    login: (user, tokens, credentials) => {
        secure.set('credentials', {
            username: user.username,
            password: user.password,
            
        });
        secure.set('tokens' , tokens),
        set((state) => ({
            authenticated: true,
            user: user,
        }));
    },

    logout: () => {
        secure.remove('credentials'); 
        secure.removeKeyFromRegistry('credentials');
        set((state) => ({
            authenticated: false,
            user: {},
        }))
    },
    //WEBSOCKET
    socket: null,
    socketConnect: async()=>{
    const tokens = await secure.get('tokens')
    const url = `ws://192.168.1.7:8000/Chatting/?token=${tokens.access}`
    utlis.log(url)
    const socket = new WebSocket(url)
    socket.onopen = () => {
        utlis.log('socket.onopen')
    }
    socket.onmessage = () => {
        utlis.log('socket.onmessage')
    }    
    socket.onerror = () => {
        utlis.log('socket.onerror')
    }
    socket.onclose = () => {
        utlis.log('socket.onclose')
    }
    set((state) => ({
        socket : socket
    }))
    },
    socketClose: ()=>{

    }





}))

export default useGlobal
