import { SCREEN_OPTIONS } from '@/components/ui/core/layout/nav';

import { ChevronLeft } from '@hugeicons/core-free-icons';

import { Href, Stack, usePathname } from 'expo-router';
import * as React from 'react';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="stepper" />
      <Stack.Screen name="[id]" />

      {/* Tambahkan screen lain di sini jika ada nested routes */}
    </Stack>
  );
}
