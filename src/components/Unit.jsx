import { Image } from "react-native";

function Unit(props) {
    console.log(props.thumbnail)
    return ( <Image source={{uri: props.thumbnail}} style={{height: 100, width: 100}} /> );
}

export default Unit;