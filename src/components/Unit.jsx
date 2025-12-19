import { Image } from "expo-image";
import { Pressable } from "react-native";

function Unit({ thumbnail, audio, audioPlayer }) {
    function playAudio() {
        audioPlayer.replace(audio);
        audioPlayer.play()
    }

    return (
        <Pressable onPress={playAudio}>
            <Image source={thumbnail} style={{ height: 100, width: 100 }} />
        </Pressable>
    );
}

export default Unit;