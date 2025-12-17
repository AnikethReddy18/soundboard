import { File, Paths, Directory } from 'expo-file-system';

const root =  new Directory(Paths.document);

// Root
export function createFolderInRoot(folderName){
    try{
        new Directory(root, folderName).create();
    }catch(err){
        console.log("Unalbe to create folder in root: " + err);
        throw err;
    }
}

export function folderExistsInRoot(folderName){
    return new Directory(root, folderName).exists;
}

// Folder
export function createFolder(parentFolderName, folderName){
    try{
        new Directory(root, parentFolderName, folderName).create();
    }catch(err){
        console.log("Unalbe to create folder: " + err);
        throw err;
    }
}

export function folderExists(parentFolderName, folderName){
    return new Directory(root, parentFolderName, folderName).exists;
}





// Useful API

// Create the actual soundboard folder
export function createSoundboard(soundboardName){
    try{
        createFolderInRoot(soundboardName);
    }catch(err){
        console.log("Soundboard creation failed: ", err);
        throw err;
    }
}

// Create the unit within the given soundboard
export function createUnit(soundboardName, unitName){
    try{
        createFolder(soundboardName, unitName);
    }catch(err){
        console.log("Unit creation failed: ", err);
        throw err;
    }
}