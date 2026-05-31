import HomeBlock from '@/components/ui/core/block/home-block';
import { SCREEN_OPTIONS } from '@/components/ui/core/layout/nav';
import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import Email from '@/components/ui/fragments/svg/icons/email';

import { useAuth } from '@/hooks/app/use-auth';

import { Link, Stack } from 'expo-router';

import * as React from 'react';
import { View } from 'react-native';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={SCREEN_OPTIONS({
          RigthComponent: <RigthComponent />,
        })}
      />
      <HomeBlock />
    </>
  );
}

const RigthComponent = () => {
  const { handleLogout } = useAuth();
  return (
    <Button
      onPress={handleLogout}
      variant={'ghost'}
      size={'icon'}
      className="relative size-6 rounded-full p-0">
      <Email width={24} height={24} className="size-6 opacity-10 active:opacity-100" />
      <View
        className="absolute -right-1 -top-0.5 size-2.5 rounded-full border-2 border-background bg-primary fill-primary"
        style={{
          backgroundColor: '#108bea',
        }}
      />
    </Button>
  );
};
