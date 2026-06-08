import { Stack } from 'expo-router';
import * as React from 'react';

export default function PageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="pendaftaran_baru" />
      <Stack.Screen name="pendaftaran_lama" />
      <Stack.Screen name="[id]" />

      {/* Tambahkan screen lain di sini jika ada nested routes */}
    </Stack>
  );
}
