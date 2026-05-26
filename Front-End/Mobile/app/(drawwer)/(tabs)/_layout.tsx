import { Tabs } from 'expo-router';
import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeIcon from '@/components/ui/fragments/svg/icons/home-icon';

import { cn } from '@/lib/utils';

import React from 'react';
import UserAvatar from '@/components/ui/fragments/avatar/user-avatar';

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const currentTheme = colorScheme ?? 'light';
  const tintColor = THEME[currentTheme].primary;
  const backgroundColor = THEME[currentTheme].card;
  const mutedForeground = THEME[currentTheme].mutedForeground;
  const inactiveTintColor = THEME[currentTheme].mutedForeground;

  const insets = useSafeAreaInsets();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: tintColor,
          tabBarInactiveTintColor: inactiveTintColor,
          tabBarStyle: {
            backgroundColor,
            height: 60 + insets.bottom,
            paddingTop: 10,
            display: 'flex',
            alignItems: 'center',
            paddingHorizontal: 8,
            borderTopWidth: 0.5,
            borderTopColor: THEME[currentTheme].background,
            shadowColor: mutedForeground,
            shadowOffset: {
              width: 2,
              height: 0,
            },
            shadowOpacity: 20.1,
            shadowRadius: 2.84,
            elevation: 3,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarShowLabel: false,

            tabBarIcon: ({ color, focused }) => (
              <HomeIcon
                fill={focused ? tintColor : 'none'}
                stroke={focused ? 'none' : inactiveTintColor}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: 'Profile',
            tabBarShowLabel: false,

            tabBarIcon: ({ color, focused }) => (
              <UserAvatar className={cn('size-7', focused && 'size-8 border-2 border-primary')} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
