import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import MakeSoundboardButton from "../components/MakeSoundboardButton.jsx";
import Soundboard from "../components/Soundboard";
import { getSoundboards } from "../utils/fileSystem.js";


export default function Index() {
  const [soundboards, setSoundboards] = useState([]);

  useEffect(() => {
    setSoundboards(getSoundboards())
  }, [])

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.soundboardsContainer}>
        {soundboards.map((board) => <Soundboard name={board.name} thumbnail={board.thumbnail} key={board.name} />)}
        </View>
        <MakeSoundboardButton setSoundboards={setSoundboards} /> 
      </ScrollView>
  );
}


const styles = StyleSheet.create({
  container:{
    alignItems: "center",
    padding: 30
  },
  soundboardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: 20,
    columnGap: 20,
    paddingBlock: 30
  },
})