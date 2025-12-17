import { File, Paths, Directory } from 'expo-file-system';

const root =  new Directory(Paths.document);
const soundboard = new Directory(root, "soundboard");

// Create the actual soundboard folder
export function createSoundboard(soundboardName){
    try{
        new Directory(soundboard, soundboardName).create();
    }catch(err){
        console.log("Soundboard creation failed: ", err);
        throw err;
    }
}

// Create the unit within the given soundboard
export function createUnit(soundboardName, unitName){
    try{
        new Directory(soundboard, soundboardName, unitName).create();
    }catch(err){
        console.log("Unit creation failed: ", err);
        throw err;
    }
}

// Get the soundboards
export function getSoundboards(){
    const folders = new Directory(soundboard).list();
    for(const folder of folders){
        console.log(folder.uri); // Make sure it is not a file
    }
}
