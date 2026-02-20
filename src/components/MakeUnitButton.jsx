import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { Alert, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { createUnit } from '../utils/fileSystem';
import { pickAudioFromFiles, pickImageFromCamera, pickImageFromGallery, useMicrophone } from '../utils/pick';

function MakeUnitButton(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [thumbnailModalVisible, setThumbnailModalVisible] = useState(false);
    const [audioModalVisible, setAudioModalVisible] = useState(false);

    const [thumbnailPath, setThumbnailPath] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const recorder = useMicrophone();

    async function handlePressMakeUnit(audioPath) {
        console.log(thumbnailPath + " t " + audioPath);
        if (!thumbnailPath) return;
        if (!audioPath) return;

       const res = createUnit(props.soundboardName, thumbnailPath, audioPath);
        props.setUnits((prev) => [...prev, { audio: res.audio, thumbnail: res.thumbnail }])
        setModalVisible(false);
        setThumbnailPath(null);
    }

    return (
        <View style={{ width: "100%" }}>
            <Pressable onPress={() => setModalVisible(true)} style={styles.primaryButton}>
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

                        <View style={{ gap: 12 }}>
                            <View style={styles.thumbnailPreviewRow}>
                                {thumbnailPath ? (
                                    <Image source={{ uri: thumbnailPath }} style={styles.thumbnailPreview} />
                                ) : (
                                    <View style={styles.thumbnailPlaceholder} />
                                )}
                                <Pressable
                                    style={styles.secondaryButton}
                                    onPress={() => setThumbnailModalVisible(true)}
                                >
                                    <Text style={styles.secondaryButtonText}>Choose Thumbnail</Text>
                                </Pressable>
                            </View>

                            <Pressable disabled={!thumbnailPath}
                                style={styles.primaryButton}
                                onPress={() => setAudioModalVisible(true)}
                            >
                                <Text style={styles.primaryButtonText}>Add Audio</Text>
                            </Pressable>
                        </View>
                    </View>


                </View>
            </Modal>

            {/* Thumbnail modal */}
            <Modal transparent visible={thumbnailModalVisible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modalCard}>
                        <MaterialIcons
                            name="close"
                            size={24}
                            style={styles.closeIcon}
                            onPress={() => setThumbnailModalVisible(false)}
                        />

                        <View style={styles.thumbnailButtonsContainer}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.primaryButton,
                                    pressed && { opacity: 0.8 }
                                ]}
                                onPress={async () => {
                                    const path = await pickImageFromCamera();
                                    setThumbnailPath(path);
                                    setThumbnailModalVisible(false);
                                }}
                            >
                                <Text style={styles.primaryButtonText}>Camera</Text>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.primaryButton,
                                    pressed && { opacity: 0.8 }
                                ]}
                                onPress={async () => {
                                    const path = await pickImageFromGallery();
                                    setThumbnailPath(path);
                                    setThumbnailModalVisible(false);
                                }}
                            >
                                <Text style={styles.primaryButtonText}>Gallery</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Audio modal */}
            <Modal transparent visible={audioModalVisible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modalCard}>
                        <MaterialIcons
                            name="close"
                            size={24}
                            style={styles.closeIcon}
                            onPress={() => setAudioModalVisible(false)}
                        />

                        <View style={styles.thumbnailButtonsContainer}>
                            {!isRecording ? (
                                <>
                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.primaryButton,
                                            pressed && { opacity: 0.8 }
                                        ]}
                                        onPress={async () => {
                                            await recorder.startRecording();
                                            setIsRecording(true);
                                        }}
                                    >
                                        <Text style={styles.primaryButtonText}>Start Recording</Text>
                                    </Pressable>

                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.primaryButton,
                                            pressed && { opacity: 0.8 }
                                        ]}
                                        onPress={async () => {
                                            const path = await pickAudioFromFiles();
                                            handlePressMakeUnit(path);
                                            setAudioModalVisible(false);
                                        }}
                                    >
                                        <Text style={styles.primaryButtonText}>Import from Files</Text>
                                    </Pressable>
                                </>
                            ) : (
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.primaryButton,
                                        pressed && { opacity: 0.8 }
                                    ]}
                                    onPress={async () => {
                                        const path = await recorder.stopRecording();
                                        setIsRecording(false);
                                        handlePressMakeUnit(path);
                                        setAudioModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.primaryButtonText}>Stop Recording</Text>
                                </Pressable>
                            )}
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
    },

    primaryButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },

    thumbnailButtonsContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 10,
    },
    thumbnailPreviewRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
    },
    thumbnailPreview: {
        width: 64,
        height: 64,
        borderRadius: 8,
        backgroundColor: '#eee'
    },
    thumbnailPlaceholder: {
        width: 64,
        height: 64,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    secondaryButton: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#eee',
        borderRadius: 8,
    },
    secondaryButtonText: {
        color: '#111',
        fontSize: 14,
    },
});

export default MakeUnitButton;