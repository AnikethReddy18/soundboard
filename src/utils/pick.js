import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from "react-native";
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
} from 'expo-audio';


export async function pickImageFromGallery() {
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

export async function pickImageFromCamera() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
        console.log(permissionResult)
        Alert.alert('Permission required', 'Permission to access the camera is required.');
        return;
    }

    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });


    if (result.canceled) return;
    const path = result.assets[0].uri;
    return path;
}

export async function pickAudioFromFiles() {
    const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*"
    })

    if (result.canceled) return;
    const path = result.assets[0].uri;
    return path;
}

export function useMicrophone() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  async function startRecording() {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Permission to access microphone was denied');
        return;
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  async function stopRecording() {
    await audioRecorder.stop();
    return audioRecorder.uri
  };

  return {startRecording, stopRecording};
}