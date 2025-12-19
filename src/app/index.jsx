import { useEffect, useState } from "react";
import { Button, TextInput, ScrollView } from "react-native";
import { getSoundboards } from "../utils/fileSystem.js";
import Soundboard from "../components/Soundboard";
import MakeSoundboard from "../components/MakeSoundboard.jsx"


export default function Index() {
  const [soundboards, setSoundboards] = useState([]);

  useEffect(()=>{
    setSoundboards(getSoundboards())
  }, [])

  return (
    <ScrollView>
      {soundboards.map((board)=><Soundboard name={board.name} thumbnail={board.thumbnail} key={board.name}/>)}
      <MakeSoundboard setSoundboards={setSoundboards} />
    </ScrollView>
  );
}
