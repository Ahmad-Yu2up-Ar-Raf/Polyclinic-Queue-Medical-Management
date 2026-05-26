import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';
import { View } from 'react-native';
import { Text } from '@/components/ui/fragments/shadcn-ui/text';
import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Href, router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import {
  CalendarClock,
  Clock8Icon,
  LogOutIcon,
  LucideIcon,
  NotepadText,
  Settings,
  Star,
} from 'lucide-react-native';
import { Icon } from '@/components/ui/fragments/shadcn-ui/icon';
import { cn } from '@/lib/utils';

import { Separator } from '@/components/ui/fragments/shadcn-ui/separator';
import { LogoAdaptive } from '@/components/ui/fragments/svg/logo-app';
import { useAuth } from '@/hooks/use-auth';

interface DrawerMenuItem {
  Icon: LucideIcon;
  label: string;
  route: Href;
  match: string;
  activeIcon?: LucideIcon;
}

const DRAWER_MENU: DrawerMenuItem[] = [
  { Icon: Clock8Icon, label: 'Antrian', route: '/(drawwer)/(tabs)', match: '/' },
  { Icon: CalendarClock, label: 'Booking', route: '/(auth)/login', match: '/login' },
  { Icon: Settings, label: 'Settings', route: '/(drawwer)/(tabs)/profile', match: '/riwayat' },
] as const;

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colorScheme } = useColorScheme();
  const currentTheme = colorScheme ?? 'light';
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { handleLogout } = useAuth();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        position: 'relative',
        paddingTop: insets.top + 12,

        backgroundColor: THEME[currentTheme].background,
      }}
      className="relative">
      {/* Branding */}
      <View className="h-full w-full items-start justify-start gap-8 px-5">
        <View className="items-start justify-start gap-7 text-start">
          <View className="w-fit flex-row items-center gap-6">
            <View className="size-12">
              <LogoAdaptive />
            </View>

            <Text
              variant="h4"
              className="font-figtree_bold text-center text-2xl tracking-tighter text-primary">
              LiveUp
            </Text>
          </View>
        </View>

        {/* Divider */}
        <Separator className="m-auto mb-1 mt-0 w-full" />
        <View className="w-full gap-1 px-0">
          {DRAWER_MENU.map((item) => {
            const isActive = pathname === item.match;
            return (
              <Button
                size={'lg'}
                variant={'ghost'}
                key={item.label}
                onPress={() => {
                  router.push(item.route as Href);
                  props.navigation.closeDrawer();
                }}
                className={cn(
                  'w-full flex-row items-center justify-start gap-5 p-0 px-2 active:opacity-60',
                  item.label == 'Settings' && 'mt-14'
                )}>
                <Icon
                  as={isActive && item.activeIcon ? item.activeIcon : item.Icon}
                  className={cn(isActive ? 'text-primary' : 'text-muted-foreground', 'size-5')}
                />
                <Text
                  className={cn(
                    'text-base',
                    isActive ? 'text-primary' : 'text-muted-foreground',
                    'font-figtree_medium'
                  )}>
                  {item.label}
                </Text>
              </Button>
            );
          })}
        </View>
        <Button
          onPress={handleLogout}
          size={'lg'}
          variant={'ghost'}
          key={'logout'}
          className="absolute bottom-5 left-6 m-auto h-fit w-full flex-row items-center justify-start gap-5 p-2 active:opacity-60">
          <Icon as={LogOutIcon} className={cn('size-5 text-destructive')} />
          <Text className={cn('font-figtree_medium text-destructive')}>Logout</Text>
        </Button>
      </View>
      {/* Menu Items */}
    </DrawerContentScrollView>
  );
}

// ─── Drawer Layout ────────────────────────────────────────────────────────────

export default function DrawerLayout() {
  const { colorScheme } = useColorScheme();
  const currentTheme = colorScheme ?? 'light';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="(tabs)"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          drawerStyle: {
            backgroundColor: THEME[currentTheme].background,
            width: 280,
          },
          overlayColor: 'rgba(0,0,0,0.35)',
          swipeEnabled: true,
          swipeEdgeWidth: 50,
        }}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="riwayat"
          options={{
            drawerLabel: 'Riwayat',
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="booking"
          options={{
            drawerLabel: 'Booking',
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
