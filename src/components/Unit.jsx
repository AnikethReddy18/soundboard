import { Image } from "expo-image";

function Unit(props) {
    console.log(props.thumbnail)
    return ( <Image source={props.thumbnail} style={{height: 100, width: 100}} /> );
}

export default Unit;