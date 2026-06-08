import { Tabs } from 'expo-router';
import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeIcon from '@/components/ui/fragments/svg/icons/home-icon';

import { cn } from '@/lib/utils';

import React from 'react';

import { Text } from '@/components/ui/fragments/shadcn-ui/text';

import CalendarIcon from '@/components/ui/fragments/svg/icons/calendar';
import HostpitalIcon from '@/components/ui/fragments/svg/icons/hostpital-icon';

import SettingIcon from '@/components/ui/fragments/svg/icons/setting';

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
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: inactiveTintColor,
          tabBarStyle: {
            backgroundColor,

            height: 70 + insets.bottom,
            paddingTop: 13,
            display: 'flex',
            alignItems: 'center',
            paddingHorizontal: 6,

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
            headerShown: false,
            title: 'Home',
            tabBarLabel: ({ color, focused }) => (
              <Text
                className={cn(
                  'mt-2 text-xs',
                  focused
                    ? 'font-figtree_bold text-primary'
                    : 'font-figtree_medium text-muted-foreground/90'
                )}>
                Beranda
              </Text>
            ),

            tabBarIcon: ({ color, focused }) => (
              <HomeIcon opacity={focused ? 1 : 0.6} fill={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="jadwal"
          options={{
            headerShown: false,
            title: 'Jadwal',
            tabBarLabel: ({ color, focused }) => (
              <Text
                className={cn(
                  'mt-2 text-xs',
                  focused
                    ? 'font-figtree_bold text-primary'
                    : 'font-figtree_medium text-muted-foreground/90'
                )}>
                Jadwal
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <CalendarIcon opacity={focused ? 1 : 0.6} fill={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="dokter"
          options={{
            headerShown: false,
            title: 'dokter',
            tabBarLabel: ({ color, focused }) => (
              <Text
                className={cn(
                  'mt-2 text-xs capitalize',
                  focused
                    ? 'font-figtree_bold text-primary'
                    : 'font-figtree_medium text-muted-foreground/90'
                )}>
                dokter
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <HostpitalIcon opacity={focused ? 1 : 0.6} fill={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            headerShown: false,
            title: 'setting',
            tabBarLabel: ({ color, focused }) => (
              <Text
                className={cn(
                  'mt-2 text-xs capitalize',
                  focused
                    ? 'font-figtree_bold text-primary'
                    : 'font-figtree_medium text-muted-foreground/90'
                )}>
                Setting
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <SettingIcon opacity={focused ? 1 : 0.6} fill={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
