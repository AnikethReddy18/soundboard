import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { Button, TextInput, View, Alert } from "react-native";
import { createUnit } from '../utils/fileSystem';

function MakeUnit(props) {

    async function pickImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) return;
        const path = result.assets[0].uri;
        return path;
    }

    async function pickAudio() {
        const result = await DocumentPicker.getDocumentAsync({
            type: "audio/*"
        })

        if (result.canceled) return;
        const path = result.assets[0].uri;
        return path;
    }

    async function handlePressMakeUnit() {
        const thumbnailPath = await pickImage();
        const audioPath = await pickAudio();

        if (!thumbnailPath) {
            Alert.alert("Select Thumbnail!");
        } else if (!audioPath) {
            Alert.alert("Enter Soundboard Name!");
        } else {
            const res = createUnit(props.soundboardName, thumbnailPath, audioPath);
            props.setUnits((prev) => [...prev, { audio: res.audio, thumbnail: res.thumbnail }])
        }
    }

    return (<View>
        <Button title='Make Unit' onPress={handlePressMakeUnit} />
    </View>);
}

export default MakeUnit;