import { Text, View, Button, TextInput } from "react-native";
import { createFolderInRoot, folderExistsInRoot} from "./utils/fileSystem.js"
import { useState } from "react";

export default function Index() {
  const [folderName, setFolderName] = useState("")
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput placeholder="enter folder name" value={folderName} onChangeText={setFolderName}></TextInput>
      <Button title="Load Sound" onPress={() => {
        createFolderInRoot(folderName)
        console.log(folderExistsInRoot(folderName))
        }} />
    </View>
  );
}
