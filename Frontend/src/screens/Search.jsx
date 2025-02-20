import {
View,
SafeAreaView,
Text,
TextInput,
FlatList,
TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useState } from 'react';
import Empty from '../common/Empty';
import useGlobal from '../core/global';
import Thumbnail from '../common/Thumbnail';
import Cell from "../common/Cell";
function SearchButton({user}){
    if (user.status === 'connected'){
        return(
            <FontAwesomeIcon
            icon='circle-check'
            size={35}
            color='#20d080'
            style={{
                 marginRight:10
            }}
            />
        )
    }
    const requestConnect = useGlobal(state => state.requestConnect)
    const data = {}
    switch(user.status){
        case 'no-connection':
            data.text='Connect'
            data.disabled = false 
            data.onPress = () => requestConnect(user.username)
            break
            case 'pending-them':
                data.text='Pending'
                data.disabled = true 
                data.onPress = () => {}
                break   
            case 'pending-me':
                data.text='Accept '
                data.disabled = false 
                data.onPress = () => {}
                break    
            default: break       
    }
    return(
        <TouchableOpacity
        style={{
            backgroundColor: data.disabled ? '#505055' : '#202020',
            paddingHorizontal:14,
            height:36,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:18
        }}
        disabled={data.disabled}
        onPress={data.onPress}
        
        >
        <Text
        style={{
            color: data.disabled ? '#808080' : 'white',
            fontWeight:'bold' ,
        }}
        >
            {data.text}
        </Text>
        </TouchableOpacity>
    )
    
}


function SearchRow({ user }) {

	return (
		<Cell>
			<Thumbnail
			url={user.thumbnail}
			size={76}
			/>
			<View
			style={{
			flex: 1,
			paddingHorizontal: 16
			}}
			>
			<Text
			style={{
			fontWeight: 'bold',
			color: '#202020',
			marginBottom: 4
			}}
			>
			{user.name}
			</Text>
			<Text
			style={{
			color: '#606060',
			}}
			>
			{user.username}
			</Text>
			</View>
			<SearchButton user={user} />
		</Cell>
	)
}

function SearchScreen(){
    const [query, setQuery ]=useState('')
    const searchlist = useGlobal(state => state.searchlist)
    const searchUsers = useGlobal(state => state.searchUsers)
    
    useEffect(() => {
        searchUsers(query)
}, [query]);

    return(
        <SafeAreaView style={{flex:1}}>
        <View
        style={{
        backgroundColor:'lavender',
        padding: 16,
        borderBottomWidth: 1,
        borderColor:'#f0f0f0',
        }}
        >
        <TextInput
            style={{
                backgroundColor: 'white',
                height:50,
                borderRadius:10,
                padding:15,
                fontSize:16,
                paddingLeft:50,
            }}
            value={query}
            onChangeText={setQuery}
            placeholder='Search..'
            placeholderTextColor="b0b0b0"
            />
            <FontAwesomeIcon
            icon='magnifying-glass'
            size={23}
            color='#505050'
            style={{
                position: 'absolute',
                left: 35,
                top: 29,
            }}
            />
        </View>
        {searchlist === null?(
        <Empty
        icon='magnifying-glass'
        message={'Search For Friends..'}
        centered={false}
        />            
        ): searchlist.length === 0 ? (
        <Empty
            icon='triangle-exclamation'
            message={'No User Found for "'+ query + '"'}
            centered={false}
        />
        ) : ( 
            <FlatList
            data={searchlist}
            renderItem={({ item }) => (
                <SearchRow user={item} />
            )}
            keyExtractor={item => item.username}
        />
            
        )}
        </SafeAreaView>


    )
}

export default SearchScreen