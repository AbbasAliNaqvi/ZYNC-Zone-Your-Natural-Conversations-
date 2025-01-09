import {
View,
SafeAreaView,
Text,
Touchable,
TouchableOpacity,
Image,
} from 'react-native';
import { useEffect, useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import RequestScreen from '../screens/Requests'
import MyFriendsScreen from '../screens/MyFriends'
import MyProfileScreen from '../screens/MyProfile'
import useGlobal from '../core/global';
const Tab = createBottomTabNavigator()


function HomeScreen({ navigation }){

    const socketConnect = useGlobal(state => state.socketConnect)
    const socketClose = useGlobal(state => state.socketClose)


       useLayoutEffect(() => {
            navigation.setOptions({
                headerShown: false  
            })
          },[])
        useEffect(()=>{
            socketConnect()
            return ()=>{
                socketClose()
            }
        },
        [])
    return(
        <Tab.Navigator screenOptions={({ route , navigation})=> ({
            headerLeft:()=> (
                <View>
                    <Image source={require('../assets/Profilepic.png')}
                    style={{marginLeft:10 , width:30, height:30}}
                    />
                </View>

            ),
            headerRight:()=> (
                <TouchableOpacity>
                    <FontAwesomeIcon 
                    style={{ marginRight: 12}}
                    icon='magnifying-glass'
                    size={28} 
                    color='black' />                    
                </TouchableOpacity>

            ),
            tabBarIcon: ({ focused , color , size }) => {
                const icons = {
                    Requests: 'person-circle-question',
                    MyFriends: 'user-group',
                    MyProfile: 'id-badge',
                }
                const icon = icons[route.name]
                return(
                <FontAwesomeIcon icon={icon} size={28} color={color} />
                )
            },
            tabBarActiveTintColor: 'black',
            tabBarShowLabel: false,
        })} 
            
            
            >
        <Tab.Screen name="Requests" component={RequestScreen} />
        <Tab.Screen name="MyFriends" component={MyFriendsScreen} />
        <Tab.Screen name="MyProfile" component={MyProfileScreen} />
      </Tab.Navigator>
    )
}
export default HomeScreen