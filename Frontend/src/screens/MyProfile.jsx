import {
    View,
    SafeAreaView,
    Text,
    Image,
    Touchable,
    TouchableOpacity,
    } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import useGlobal from '../core/global';
    function Profilelogout(){
    const logout = useGlobal(state => state.logout)
        return(
            <TouchableOpacity 
            onPress={logout}
            style={{
                flexDirection: 'row',
                height:52,
                borderRadius: 24,
                justifyContent:'center',
                paddingHorizontal:26,
                backgroundColor:'#202020',
                marginTop:20,
            }}
            >
            <FontAwesomeIcon 
             icon='right-from-bracket'
             size={20}
             color='#d0d0d0'
             style={{marginRight:12,marginTop:15,}}
             />
            <Text style={{
                fontWeight:'bold',
                color:'#d0d0d0',
                textAlign:'center',
                justifyContent:'center',
                alignContent:'center',
                marginTop:15,
            }}>
                LOGOUT
            </Text>
            </TouchableOpacity>
        )
    }
    
    function MyProfileScreen(){
        return(
            <View
            style={{
            flex:1,
            alignItems:'center',
            paddingTop:100,
            }}
            >
            <Image source={require('../assets/Profilepic.png')}
                    style={{
                    marginLeft:10 ,
                    width:200,
                    height:200,
                    }}
            />
            <Text style={{
            textAlign:'center',
            color: 'grey',
            fontSize:20,
            fontWeight:'bold',
            marginTop:6,
            }}>
            Abbas Ali
            </Text>
            <Text style={{
            textAlign:'center',
            color:'blue',
            fontSize:14,
            }}>
            @Admin
            </Text>
            <Profilelogout/>
            </View>
    
    
        )
    }
    
    export default MyProfileScreen
