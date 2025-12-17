import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { createFolder, createFolderInRoot, folderExists, folderExistsInRoot } from "../utils/fileSystem.js";


export default function Index() {
  const [folderName, setFolderName] = useState("")
  const [folderName2, setFolderName2] = useState("")
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput placeholder="enter folder name" value={folderName} onChangeText={setFolderName}></TextInput>
      <TextInput placeholder="enter folder name" value={folderName2} onChangeText={setFolderName2}></TextInput>
      <Button title="Load Sound" onPress={() => {
        try{
          createFolderInRoot(folderName)
          createFolder(folderName, folderName2)
        }catch(err){
          console.log(err)
        }
        console.log(folderExistsInRoot(folderName))
        console.log(folderExists(folderName, folderName2))
        }} />
    </View>
  );
}
