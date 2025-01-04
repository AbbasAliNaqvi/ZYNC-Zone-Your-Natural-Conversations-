import {
Text,
View
} from "react-native"
function Title({text}){
return(
    <Text style={{
        color:'lavender',
        textAlign:'center',
        fontSize: 48,
        fontFamily: 'sans-serif',
    }}>
        {text}
    </Text>
)
}
export default Title