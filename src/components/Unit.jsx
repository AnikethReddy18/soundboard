import { Image } from "expo-image";
import { Pressable } from "react-native";

function Unit({ thumbnail, audio, audioPlayer }) {
    function playAudio() {
        audioPlayer.replace(audio);
        audioPlayer.play()
    }

    return (
        <Pressable onPress={playAudio}>
            <Image style={{
                height: 175,
                width: 175,
                borderRadius: 5,
            }} source={thumbnail} />
        </Pressable>
    );
}

export default Unit;