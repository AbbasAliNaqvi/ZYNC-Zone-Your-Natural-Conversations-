import { create } from 'zustand'
import secure from './secure'
import api from './api'
import utlis from './utlis'
import { SearchBar } from 'react-native-screens'


function responseSearch(set, get,data){
    set((state)=> ({
     searchlist: data
    })) 
}


function responseThumbnail(set,get,data){
 set((state)=> ({
    user: data
 }))
}



const useGlobal = create((set,get) => ({
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
    const url = `ws://192.168.1.3:8000/Chatting/?token=${tokens.access}`
    const socket = new WebSocket(url)
    socket.onopen = () => {
        utlis.log('socket.onopen')
    }
    socket.onmessage = (event) => {
        const parsed = JSON.parse(event.data)

        utlis.log('onmessage: ',parsed)

        const responses ={
            'search': responseSearch ,
            'thumbnail': responseThumbnail
        }
        const resp = responses[parsed.source]
        if(!resp){
            utlis.log('parsed.source "' + parsed.source + ' "not found')
        }
        resp (set,get,parsed.data)
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
        const socket = get().socket
        if(socket){
            socket.close()
        }
        set((state)=>({
            socket:null
        })
        )

    },
    //Search
    searchlist:null,
    searchUsers: (query)=> {
        if(query){
        const socket = get().socket
        socket.send(JSON.stringify({
            source: 'search',
            query: query
        }))
        }else {
        set((state)=>({
            searchlist:null
        })
        )
        }
    },

    uploadThumbnail: (file)=> {
        const socket = get().socket
        socket.send(JSON.stringify({
            source: 'thumbnail',
            base64: file.base64,
            filename: file.fileName
        }))
    }




}))

export default useGlobal
