import { useEffect, useState } from "react";
import { Button, TextInput, View } from "react-native";
import { createSoundboard, getSoundboards } from "../utils/fileSystem.js";
import Soundboard from "../components/Soundboard"

export default function Index() {
  const [soundboardName, setSoundboardName] = useState("")
  const [soundboards, setSoundboards] = useState([]);

  useEffect(()=>{
    setSoundboards(getSoundboards())
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {soundboards.map((name)=><Soundboard name={name} key={name}/>)}

      <TextInput placeholder="enter sound board name" value={soundboardName} onChangeText={setSoundboardName}></TextInput>
      <Button title="Create Soundboard" onPress={() => {
        try{
          createSoundboard(soundboardName)
        }catch(err){
          console.log(err)
        }
        }} />
    </View>
  );
}
