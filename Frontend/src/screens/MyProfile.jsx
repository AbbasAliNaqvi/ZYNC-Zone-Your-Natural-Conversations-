import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as ImagePicker from 'expo-image-picker';
import useGlobal from '../core/global';
import utlis from '../core/utlis';
import Thumbnail from '../common/Thumbnail';

function ProfileImage() {
    const uploadThumbnail = useGlobal(state => state.uploadThumbnail);
    const user = useGlobal(state => state.user);

    const selectImage = async () => {
        // Request media library permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access media library is required!');
            return;
        }

        // Open the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true, // Optional if needed
        });

        console.log('Image Picker Result:', result);
        

        // Check if user canceled the picker
        if (!result.cancelled) {
            const file = result.assets ? result.assets[0] : null;
            if (file) {
                console.log('Selected File:', file);
                uploadThumbnail(file); // Upload the selected image
            } else {
                console.error('No file found in result.assets');
            }
        } else {
            console.log('Image picking was cancelled');
        }
    };

    return (
        <TouchableOpacity onPress={selectImage}>
            <Thumbnail
				url={user.thumbnail}
				size={180}
			/>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 10,
                    backgroundColor: '#202020',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 4,
                    borderColor: 'white',
                }}
            >
                <FontAwesomeIcon
                    icon='pen'
                    size={15}
                    color='#d0d0d0'
                />
            </View>
        </TouchableOpacity>
    );
}

function ProfileLogout() {
    const logout = useGlobal(state => state.logout);

    return (
        <TouchableOpacity
            onPress={logout}
            style={{
                flexDirection: 'row',
                height: 52,
                borderRadius: 24,
                justifyContent: 'center',
                paddingHorizontal: 26,
                backgroundColor: '#202020',
                marginTop: 20,
            }}
        >
            <FontAwesomeIcon
                icon='right-from-bracket'
                size={20}
                color='#d0d0d0'
                style={{ marginRight: 12, marginTop: 15 }}
            />
            <Text
                style={{
                    fontWeight: 'bold',
                    color: '#d0d0d0',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginTop: 15,
                }}
            >
                LOGOUT
            </Text>
        </TouchableOpacity>
    );
}

function MyProfileScreen() {
    const user = useGlobal(state => state.user);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 100,
            }}
        >
            <ProfileImage />

            <Text
                style={{
                    textAlign: 'center',
                    color: 'grey',
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginTop: 6,
                }}
            >
                {user.name}
            </Text>
            <Text
                style={{
                    textAlign: 'center',
                    color: 'blue',
                    fontSize: 14,
                    marginTop: 6,
                }}
            >
                @{user.username}
            </Text>
            <ProfileLogout />
        </View>
    );
}

export default MyProfileScreen;

