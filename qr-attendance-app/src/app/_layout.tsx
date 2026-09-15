import React, { useEffect, useState } from 'react';
import { Stack } from "expo-router";
import '../../global.css';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { initDb } from "../db/db";


export default function RootLayout() {

  const [dbReady, setDbReady] = useState(false);
  const [dbError, setDbError] = useState<Error | null>(null);

  useEffect(() => {
    initDb()
      .then(() => setDbReady(true))
      .catch((err) => setDbError(err));
  }, []);

  if (dbError) {
    return null; // or an error screen
  }

  if (!dbReady) {
    return null; // or a loading spinner
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
