import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { useState } from 'react';
import { Button, TextInput, View, Alert } from "react-native";
import { createUnit } from '../utils/fileSystem';

function MakeUnit(props) {
    const [audioPath, setAudioPath] = useState(null);
    const [thumbnailPath, setThumbnailPath] = useState(null);

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
        setThumbnailPath(path);
    }

    async function pickAudio() {
        const result = await DocumentPicker.getDocumentAsync({
            type: "audio/*"
        })

        if (result.canceled) return;
        const path = result.assets[0].uri;
        setAudioPath(path);
    }

    function handlePressMakeUnit() {
        if (!thumbnailPath) {
            Alert.alert("Select Thumbnail!");
        } else if (!audioPath) {
            Alert.alert("Enter Soundboard Name!");
        } else {
            const res = createUnit(props.soundboardName, thumbnailPath, audioPath);
            console.log(res)
            //props.setUnits((prev) => [...prev, { audio, thumbnail}])
        }
    }

    return (<View>
        <Button title='Open Image' onPress={pickImage} />
        <Button title='Open Audio' onPress={pickAudio} />
        <Button title='Make Unit' onPress={handlePressMakeUnit} />
    </View>);
}

export default MakeUnit;