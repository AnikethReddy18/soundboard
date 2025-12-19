import { Text, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import { Link } from "expo-router";

function Soundboard(props) {
    return (
        <Link href={props.name} asChild>
            <Pressable>
                <View>
                    <Image style={{ 
                        height: 175, 
                        width: 175,
                        borderRadius: 5,
                        }} source={props.thumbnail} />
                    <Text style={{alignSelf: "center"}}> {props.name} </Text>
                </View>
            </Pressable>
        </Link>);
}

export default Soundboard;
