import { File, Paths, Directory } from 'expo-file-system';

const root =  new Directory(Paths.document)

export function createFolderInRoot(name){
    console.log(root.uri)
    return new Directory(root, name).create();
}

export function folderExistsInRoot(name){
    return new Directory(root.uri, name).exists;
}

console.log(root.parentDirectory)
