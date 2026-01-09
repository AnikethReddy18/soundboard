import { ScrollView, StyleSheet, View} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import Unit from "../components/Unit";
import {getUnits} from "../utils/fileSystem"
import MakeUnitButton from "../components/MakeUnitButton";
import { useAudioPlayer } from "expo-audio"

function SoundboardScreen() {
    const audioPlayer = useAudioPlayer();
    const navigation = useNavigation();
    const name = useLocalSearchParams().soundboardScreen;

    const [units, setUnits] = new useState();

    useEffect(() => {
        navigation.setOptions({
            title: name,
        });

        setUnits(getUnits(name));
    }, []);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.unitsContainer}>
            {units && units.map((unit, index)=><Unit thumbnail={unit.thumbnail} audio={unit.audio} audioPlayer={audioPlayer} key={index} />)}
            </View>
            <MakeUnitButton soundboardName={name} setUnits={setUnits} />
        </ScrollView>
    );
}

export default SoundboardScreen;

const styles = StyleSheet.create({
  container:{
    alignItems: "center",
    padding: 30
  },
  unitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: 20,
    columnGap: 20,
    paddingBlock: 30
  },
})