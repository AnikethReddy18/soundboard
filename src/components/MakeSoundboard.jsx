import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, TextInput, View, Alert, Modal, Text, Pressable } from "react-native";
import { createSoundboard } from '../utils/fileSystem';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function MakeSoundboard(props) {
  const [soundboardName, setSoundboardName] = useState();
  const [modalVisible, setModalVisible] = useState(false)

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

  async function makeSoundBoard() {
    const thumbnailPath = await pickImage();

    if (!thumbnailPath) {
      Alert.alert("Select Thumbnail!");
    } else if (!soundboardName) {
      Alert.alert("Enter Soundboard Name!");
    } else {
      const newtThumbnailPath = createSoundboard(soundboardName, thumbnailPath);
      props.setSoundboards((prev) => [...prev, { name: soundboardName, thumbnail: newtThumbnailPath }])
    }

    setSoundboardName(null);
    setModalVisible(false);
  }

  return (<View style={{ width: "100%" }}>
    <Pressable style={{
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
    }}
    onPress={() => setModalVisible(true)}>
      <Text style={{fontSize: 30, alignSelf: "center"}}>Make Soundboard </Text>
    </Pressable>

    <Modal transparent={true} visible={modalVisible}>
      <MaterialIcons name="close" size={22} onPress={() => setModalVisible(false)} />
      <TextInput placeholder='Enter the name of soundboard' value={soundboardName} onChangeText={setSoundboardName} />
      <Button title='Pick Image' disabled={soundboardName == null} onPress={makeSoundBoard} />
    </Modal>

  </View>);
}

export default MakeSoundboard;