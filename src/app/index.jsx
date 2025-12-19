import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { getSoundboards } from "../utils/fileSystem.js";
import Soundboard from "../components/Soundboard";
import MakeSoundboard from "../components/MakeSoundboard.jsx"


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
        <MakeSoundboard setSoundboards={setSoundboards} /> 
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