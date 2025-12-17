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
    const res = []
    for(const folder of folders){
        const name = folder.uri.split("/");
        res.push(name[name.length - 2].replaceAll("%20", " "))
    }

    return res;
}
