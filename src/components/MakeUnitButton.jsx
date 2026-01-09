import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { Alert, Pressable, Text } from "react-native";
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
        if (!thumbnailPath) return;
        const audioPath = await pickAudio();
        if (!audioPath) return;

        const res = createUnit(props.soundboardName, thumbnailPath, audioPath);
        props.setUnits((prev) => [...prev, { audio: res.audio, thumbnail: res.thumbnail }])

    }

    return (
        <Pressable onPress={handlePressMakeUnit} style={{
            backgroundColor: "#2979FF",
            paddingVertical: 14,
            borderRadius: 10,
            width: "100%",
            alignItems: "center",
        }}>
            <Text style={{
                color: "white",
                fontSize: 16,
                fontWeight: "600",
            }}>Create Unit</Text>
        </Pressable>
    );
}

export default MakeUnit;