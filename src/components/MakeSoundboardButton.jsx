import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { createSoundboard } from '../utils/fileSystem';

import { pickImageFromCamera, pickImageFromGallery } from '../utils/pick';

function MakeSoundboardButton(props) {
  const [soundboardName, setSoundboardName] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  async function makeSoundBoard(method) {
    const thumbnailPath = method === "gallery" ? await pickImageFromGallery() : await pickImageFromCamera();

    if(thumbnailPath) {
      const newtThumbnailPath = createSoundboard(soundboardName, thumbnailPath);
      props.setSoundboards((prev) => [...prev, { name: soundboardName, thumbnail: newtThumbnailPath }]);
      setSoundboardName(null);
      setModalVisible(false);
    }
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

          <View style={styles.thumbnailButtonsContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && { opacity: 0.8 }
              ]}
              onPress={()=>{
                if(!soundboardName) {
                  Alert.alert("Error", "Please enter a soundboard name first.");
                  return;
                }
                makeSoundBoard("camera")
              }}
            >
              <Text style={styles.primaryButtonText}>Camera</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && { opacity: 0.8 }
              ]}
              onPress={() =>{
                if(!soundboardName) {
                  Alert.alert("Error", "Please enter a soundboard name first.");
                  return;
                }
                makeSoundBoard("gallery")}
              }
            >
              <Text style={styles.primaryButtonText}>Gallery</Text>
            </Pressable>
          </View>
        </View>


      </View>
    </Modal>
  </View>);
}

export default MakeSoundboardButton;

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
    flex: 1,
  },

  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  thumbnailButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
