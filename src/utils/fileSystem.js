import { File, Paths, Directory } from 'expo-file-system';

const root = new Directory(Paths.document);
const soundboard = new Directory(root, "soundboard");

if (!soundboard.exists) soundboard.create()

// Create the actual soundboard folder
export function createSoundboard(soundboardName, thumbnailURI) {
    try {
        const currSoundboard = new Directory(soundboard, soundboardName);
        currSoundboard.create();
        console.log(currSoundboard);
        const file = new File(thumbnailURI);

        const arr = thumbnailURI.split(".");
        const ext = arr[arr.length - 1];

        file.move(currSoundboard);
        const newName = "thumbnail." + ext;
        file.rename(newName);
        return file.uri;
    } catch (err) {
        console.log("Soundboard creation failed: ", err);
    }
}

// Create the unit within the given soundboard
export function createUnit(soundboardName, thumbnail, audio) {
    try {
        const currSoundboard = new Directory(soundboard, soundboardName);
        const unit = new Directory(currSoundboard, String(currSoundboard.list().length));
        console.log(unit)
        unit.create();

        const thumbnailFile = new File(thumbnail);
        const audioFile = new File(audio);

        thumbnail = thumbnail.split('.');
        audio = audio.split('.');
        const newThumbnail = "thumbnail." + thumbnail[thumbnail.length - 1];
        const newAudio = "audio." + audio[audio.length - 1];

        thumbnailFile.move(unit);
        audioFile.move(unit);
        thumbnailFile.rename(newThumbnail);
        audioFile.rename(newAudio);

        return {audio: audioFile.uri, thumbnail: thumbnailFile.uri}
    } catch (err) {
        console.log("Unit creation failed: ", err);
    }
}

// Get the soundboards
export function getSoundboards() {
    try {
        const folders = new Directory(soundboard).list();
        const res = [];

        for (const folder of folders) {
            const uri = folder.uri.split("/");
            const name = uri[uri.length - 2].replaceAll("%20", " ");
            const thumbnail = folder.list()[folder.list().length -1].uri;

            const board = { name, thumbnail }
            res.push(board);
        }

        return res;
    } catch (err) {
        console.log("Getting soundboards failed: " + err);
    }
}

// Get Units
export function getUnits(soundboardName) {
    try {
        const dir = new Directory(soundboard, soundboardName);
        const units = [];
        const contents = dir.list();
        for (let i=0; i<contents.length-1; i++) { // Skip the thumbnail file
            const folder = contents[i].list();

            const unit = {
                audio: folder[0].uri,
                thumbnail: folder[1].uri
            };

            units.push(unit);
        }

        return units;
    } catch (err) {
        console.log("Getting units failed: " + err);
    }
}