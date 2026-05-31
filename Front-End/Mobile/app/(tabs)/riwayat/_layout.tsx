import React from 'react';

import { router, Stack } from 'expo-router';
import { SCREEN_OPTIONS } from '@/components/ui/core/layout/nav';
import { ChevronLeft, Plug01FreeIcons, PlusSignIcon } from '@hugeicons/core-free-icons';

export default function HomeLayout() {
  const handleLeave = () => {
    router.push('/daftar/stepper/first-step');
  };
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={SCREEN_OPTIONS({
          title: 'Jadwal Saya',
          leftIcon: ChevronLeft,
          rightAction: handleLeave,
          rightIcon: PlusSignIcon,
          className: 'px-5',
        })}
      />
    </Stack>
  );
}
