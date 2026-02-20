import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      contentStyle: {
         backgroundColor: "#0D1117",
        },
        headerStyle: {
          backgroundColor: "#161B22"
        },
        headerTitleStyle: {
          color: "#ffffff"
        },
        headerTintColor: "white",
       }}>
      <Stack.Screen name="index" options={{
        title: "Soundboard App"
      }} />
    </Stack>
  );
}
