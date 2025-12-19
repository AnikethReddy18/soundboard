import { ScrollView, Text, Button } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import Unit from "../components/Unit";
import {getUnits} from "../utils/fileSystem"
import MakeUnit from "../components/MakeUnit";
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
        <ScrollView>
            {units && units.map((unit, index)=><Unit thumbnail={unit.thumbnail} audio={unit.audio} audioPlayer={audioPlayer} key={index} />)}
            <MakeUnit soundboardName={name} setUnits={setUnits} />
        </ScrollView>
    );
}

export default SoundboardScreen;