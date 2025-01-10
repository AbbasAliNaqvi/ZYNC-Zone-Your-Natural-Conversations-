import { Platform } from "react-native"
import ProfileImage from '../assets/Profilepic.png'
import ADDRESS from '../core/api'
function log() {
    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i]
        if (typeof arg == 'object') {
            arg = JSON.stringify(arg, null, 2)
        }
        console.log(`[${Platform.OS}]`,arg)
    }
}


function thumbnail(url) {
    if(!url){
        return ProfileImage
    }
    return{
        uri : 'http://' + ADDRESS + url
    }
}
export default { log, thumbnail }