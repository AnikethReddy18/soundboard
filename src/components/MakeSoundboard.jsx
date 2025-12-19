import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, TextInput, View, Alert, Modal, Text, Pressable } from "react-native";
import { createSoundboard } from '../utils/fileSystem';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';

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
    <Pressable style={styles.primaryButton}
      onPress={() => setModalVisible(true)}>
      <Text style={styles.primaryButtonText}>Make Soundboard </Text>
    </Pressable>

    <Modal transparent visible={modalVisible} animationType="fade">
      <View style={styles.overlay}>

        <View style={styles.modalCard}>
          <MaterialIcons
            name="close"
            size={24}
            style={styles.closeIcon}
            onPress={() => setModalVisible(false)}
          />

          <Text style={styles.title}>Create Soundboard</Text>

          <TextInput
            placeholder="Enter soundboard name"
            value={soundboardName}
            onChangeText={setSoundboardName}
            style={styles.input}
          />

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && { opacity: 0.8 }
            ]}
            disabled={!soundboardName}
            onPress={makeSoundBoard}
          >
            <Text style={styles.primaryButtonText}>Pick Thumbnail</Text>
          </Pressable>
        </View>

      </View>
    </Modal>


  </View>);
}

export default MakeSoundboard;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },

  closeIcon: {
    alignSelf: "flex-end",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  primaryButton: {
    backgroundColor: "#2979FF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
