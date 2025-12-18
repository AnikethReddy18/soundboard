import { Text } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";

function SoundboardScreen() {
    const name = useLocalSearchParams().soundboardScreen;
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: name,
        });
    }, [navigation]);
    return (
        <Text> {name.soundboardScreen}</Text>
    );
}

export default SoundboardScreen;