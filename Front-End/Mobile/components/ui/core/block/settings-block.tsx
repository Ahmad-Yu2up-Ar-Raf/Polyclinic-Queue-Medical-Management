import React from 'react';
import { Wrapper } from '../layout/wrapper';

import { Stack } from 'expo-router';
import { SCREEN_OPTIONS } from '../layout/nav';

import { View } from 'react-native';
import { Button } from '../../fragments/shadcn-ui/button';
import { Icon } from '../../fragments/shadcn-ui/icon';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';
import { Text } from '../../fragments/shadcn-ui/text';
import { cn } from '@/lib/utils';
import { MenuDetail } from '@/types';
import { Switch } from '../../fragments/shadcn-ui/switch';
import MenuCard from '../../fragments/custom-ui/card/feature-menu';
import {
  Bell,
  Bookmark01FreeIcons,
  ChevronLeft,
  Pen01FreeIcons,
  Pencil,
  Setting07FreeIcons,
} from '@hugeicons/core-free-icons';
import { useAuth } from '@/hooks/app/use-auth';
import UserAvatar from '../../fragments/avatar/user-avatar';
import { batasiKata } from '@/hooks/use-word';
import { useAuthStore } from '@/store/auth-store';
export default function SettingsBlock() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const menuDetails2: MenuDetail[] = [
    {
      Label: 'Tersimpan',
      icon: Bookmark01FreeIcons,
    },
    {
      Label: 'Settings',
      icon: Setting07FreeIcons,
    },

    // {
    //   Label: 'Dark Mode',
    //   icon: Moon,
    //   rigthComponent: (
    //     <Switch
    //       checked={colorScheme === 'dark'}
    //       onCheckedChange={toggleColorScheme}
    //       id="toggle-dark-mode"
    //       nativeID="toggle-dark-mode"
    //     />
    //   ),

    //   onPress: toggleColorScheme,
    // },

    {
      Label: 'Notifikasi',
      icon: Bell,
    },
  ];
  const user = useAuthStore.getState().user;
  const currentTheme = colorScheme ?? 'light';
  const { handleLogout } = useAuth();
  const tintColor = THEME[currentTheme].primaryForeground;
  function onSignOut() {
    handleLogout();
  }
  const title = batasiKata(user?.name!, 2);
  return (
    <>
      <Stack.Screen
        options={SCREEN_OPTIONS({
          title: 'Settings',
          leftIcon: ChevronLeft,
          rightIcon: Setting07FreeIcons,
        })}
      />
      <Wrapper
        className="flex-1 content-start items-start justify-start gap-0 pt-11"
        edges={['bottom', 'left', 'right']}>
        <View className="w-full gap-6">
          <View className="relative w-fit">
            <UserAvatar className="m-auto size-24 rounded-full" />
            <Button
              size={'icon'}
              className="absolute bottom-1/2 left-1/2 top-2 m-auto -mt-4 size-10 translate-x-5 transform rounded-full border-4 border-background p-2">
              <Icon
                color={tintColor}
                icon={Pen01FreeIcons}
                className="size-full text-primary-foreground"
              />
            </Button>
          </View>
          <View className="w-full gap-2">
            <Text
              variant={'h3'}
              className="text-center font-figtree_semibold text-2xl tracking-tighter">
              {title}
            </Text>
            <Text
              variant={'small'}
              className="text-center font-figtree_medium text-sm tracking-tighter text-muted-foreground/60">
              {user?.email}
            </Text>
          </View>
        </View>
        <MenuCard MenuList={menuDetails2} onSignOut={onSignOut} />
      </Wrapper>
    </>
  );
}
