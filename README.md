# Soundboard 🎵

A React Native app built with Expo that lets you create, organize, and play custom soundboards with your favorite sounds.

## Features

- **Create Soundboards**: Organize sounds into custom soundboards with custom thumbnails
- **Add Sounds**: Pick audio files from your device and add them to soundboards
- **Play Audio**: Play sounds with a tap, perfect for memes, notifications, or creative projects
- **Persistent Storage**: Sounds and soundboards are saved to your device storage
- **Cross-Platform**: Runs on Android, iOS, and web platforms

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm start
   ```

3. Open on your platform:
   - **Android**: Press `a` in the terminal
   - **iOS**: Press `i` in the terminal
   - **Web**: Press `w` in the terminal
   - **Expo Go**: Scan the QR code with Expo Go app

## Project Structure

```
src/
├── app/                    # App screens (file-based routing)
│   ├── index.jsx          # Home screen
│   ├── [soundboardScreen].jsx  # Soundboard detail screen
│   └── _layout.tsx        # Layout wrapper
├── components/            # Reusable components
│   ├── Soundboard.jsx     # Soundboard item
│   ├── Unit.jsx           # Sound unit item
│   ├── MakeSoundboardButton.jsx
│   └── MakeUnitButton.jsx
└── utils/                 # Utility functions
    ├── fileSystem.js      # File system operations
    └── pick.js            # File picker utilities
```

## Available Scripts

- `npm start` - Start development server
- `npm run android` - Build and run on Android
- `npm run ios` - Build and run on iOS
- `npm run web` - Run web version
- `npm run lint` - Run ESLint

## Technologies Used

- **React Native** - Cross-platform mobile development
- **Expo** - Simplified React Native development
- **Expo Audio** - Audio playback
- **Expo File System** - Local storage access
- **Expo Router** - File-based routing
