import { Pressable, Text, StyleSheet, View, Modal} from "react-native";
import { createUnit } from '../utils/fileSystem';
import { useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { pickImageFromGallery, pickImageFromCamera, pickAudioFromFiles } from '../utils/pick';

function MakeUnitButton(props) {
    const [modalVisible, setModalVisible] = useState(false);

    async function handlePressMakeUnit(inputType) {
        const thumbnailPath = await (inputType === "camera" ? pickImageFromCamera() : pickImageFromGallery());
        if (!thumbnailPath) return;
        const audioPath = await pickAudioFromFiles();
        if (!audioPath) return;

        const res = createUnit(props.soundboardName, thumbnailPath, audioPath);
        props.setUnits((prev) => [...prev, { audio: res.audio, thumbnail: res.thumbnail }])
        setModalVisible(false);
    }

    return (
        <View style={{ width: "100%" }}>
            <Pressable onPress={()=>setModalVisible(true)} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Create Unit</Text>
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

                        <View style={styles.thumbnailButtonsContainer}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.primaryButton,
                                    pressed && { opacity: 0.8 }
                                ]}
                                onPress={() => handlePressMakeUnit("camera")}
                            >
                                <Text style={styles.primaryButtonText}>Camera</Text>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.primaryButton,
                                    pressed && { opacity: 0.8 }
                                ]}
                                onPress={() => handlePressMakeUnit("gallery")}
                            >
                                <Text style={styles.primaryButtonText}>Gallery</Text>
                            </Pressable>

                        </View>
                    </View>


                </View>
            </Modal>
        </View>
    );
}

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

export default MakeUnitButton;