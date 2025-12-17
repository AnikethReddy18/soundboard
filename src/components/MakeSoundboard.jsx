import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, TextInput, View, Alert } from "react-native";
import { createSoundboard, saveThumbnail } from '../utils/fileSystem';

function MakeSoundboard(props) {
    const [soundboardName, setSoundboardName] = useState();
    const [thumbnailPath, setThumbnailPath] = useState();

    async function pickImage(){
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    if(result.canceled) return;
    const path = result.assets[0].uri;
    setThumbnailPath(path);
  }

  function handlePressMakeSoundboard(){
    if(!thumbnailPath){
        Alert.alert("Select Thumbnail!");
    }else if(!soundboardName){
        Alert.alert("Enter Soundboard Name!");
    }else{
        createSoundboard(soundboardName);
        const newPath = saveThumbnail(soundboardName, thumbnailPath);
        props.setSoundboards((prev)=> [...prev, {name: soundboardName, thumbnail: newPath}])
    }
  }

    return ( <View>
        <TextInput placeholder='enter name' value={soundboardName} onChangeText={setSoundboardName}/>
        <Button title='Open Image' onPress={pickImage}/>
        <Button title='Make Soundboard' onPress={handlePressMakeSoundboard}/>
    </View> );
}

export default MakeSoundboard;