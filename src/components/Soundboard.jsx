import { Text } from "react-native";
import { Image } from 'expo-image';
import { View } from 'react-native';

function Soundboard(props) {
    return ( <View>
        <Text> {props.name} </Text>
        <Image style={{height: 100, width: 100}} source={props.thumbnail} />
        </View>);
}

export default Soundboard;
