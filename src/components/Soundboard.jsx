import { Text, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import { Link } from "expo-router";

function Soundboard(props) {
    return (
        <Link href={props.name} asChild>
            <Pressable>
                <View>
                    <Text> {props.name} </Text>
                    <Image style={{ height: 100, width: 100 }} source={props.thumbnail} />
                </View>
            </Pressable>
        </Link>);
}

export default Soundboard;
