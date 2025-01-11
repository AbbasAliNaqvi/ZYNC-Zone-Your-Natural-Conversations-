import {Text, View} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'



function Empty({ icon, message, centered=true}){
    return(
    <View
    style={{
        flex:1,
        justifyContent: centered ? 'center':'flex-start',
        alignItems: 'center',
        paddingVertical :120,
    }}
    >
        <FontAwesomeIcon
        icon={icon}
        size={80}
        color='#d0d0d0'
        style={{
            marginBottom: 16
        }}
        />
        <Text
        style={{
            color:'#c3c3c3',
            fontSize:18,
        }}
        >
            {message}
        </Text>
    </View>
    )
}

export default Empty