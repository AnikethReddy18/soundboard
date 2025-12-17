import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { createSoundboard, getSoundboards } from "../utils/fileSystem.js";


export default function Index() {
  const [soundboardName, setSoundboardName] = useState("")
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >


      <TextInput placeholder="enter sound board name" value={soundboardName} onChangeText={setSoundboardName}></TextInput>
      <Button title="Create Soundboard" onPress={() => {
        try{
          createSoundboard(soundboardName)
        }catch(err){
          console.log(err)
        }
        }} />
        <Button title="Get Soundboards" onPress={getSoundboards} />
    </View>
  );
}
