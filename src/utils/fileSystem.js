import { File, Paths, Directory } from 'expo-file-system';

const root =  new Directory(Paths.document);
const soundboard = new Directory(root, "soundboard");

if(!soundboard.exists) soundboard.create()

// Create the actual soundboard folder
export function createSoundboard(soundboardName){
    try{
        new Directory(soundboard, soundboardName).create();
    }catch(err){
        console.log("Soundboard creation failed: ", err);
    }
}

export function saveThumbnail(soundboardName, uri){
    try{
        const file = new File(uri);

        const arr = uri.split(".");
        const ext = arr[arr.length - 1]

        file.move(new Directory(soundboard, soundboardName))
        const newName = "thumbnail."+ext;
        file.rename(newName)

        return new File(soundboard, soundboardName, newName)
    }catch(err){
        console.log("Saving thumbnail failed :( -- ", err)
    }
}

// Create the unit within the given soundboard
export function createUnit(soundboardName, unitName){
    try{
        new Directory(soundboard, soundboardName, unitName).create();
    }catch(err){
        console.log("Unit creation failed: ", err);
    }
}

// Get the soundboards
export function getSoundboards(){
    const folders = new Directory(soundboard).list();
    const res = []

    for(const folder of folders){
        const uri = folder.uri.split("/");
        const name = uri[uri.length - 2].replaceAll("%20", " ");
        const thumbnail = folder.list()[0].uri;

        const board = { name, thumbnail, uri: folder.uri}
        res.push(board);
    }

    return res;
}


