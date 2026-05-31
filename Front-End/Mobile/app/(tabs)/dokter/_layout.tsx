import React from 'react';

import { router, Stack } from 'expo-router';
import { SCREEN_OPTIONS } from '@/components/ui/core/layout/nav';
import { ChevronLeft } from '@hugeicons/core-free-icons';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={SCREEN_OPTIONS({
          title: 'Daftar Dokter',
          leftIcon: ChevronLeft,
          className: 'px-5',
        })}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
      {/* Tambahkan screen lain di sini jika ada nested routes */}
    </Stack>
  );
}
