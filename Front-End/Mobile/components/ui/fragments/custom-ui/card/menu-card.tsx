import { View, Text } from 'react-native';
import React from 'react';

import { Icon } from '../../shadcn-ui/icon';
import {
  Calendar,
  Calendar02FreeIcons,
  Information,
  Monitor,
  MonitorDotIcon,
  Note01FreeIcons,
  Plus,
} from '@hugeicons/core-free-icons';

import { THEME } from '@/lib/theme';
import { Button } from '../../shadcn-ui/button';
import { IconSvgElement } from '@hugeicons/react-native';
import { Href, Link } from 'expo-router';

interface menuCategory {
  icon: IconSvgElement;
  label: string;
  href?: Href;
}

export default function MenuCard() {
  const menuData: menuCategory[] = [
    {
      icon: Plus,
      label: 'Daftar',
      href: '/daftar/stepper/first-step',
    },
    {
      icon: MonitorDotIcon,
      label: 'Monitor',
      href: '/monitor',
    },
    {
      icon: Calendar02FreeIcons,
      label: 'Jadwal',
      href: '/(tabs)/riwayat',
    },
    {
      icon: Information,
      label: 'Info',
    },
  ];

  return (
    <View className="w-full gap-12">
      <View className="flex w-full flex-row items-center justify-between px-4">
        <View className="flex flex-row items-center gap-3">
          <View>
            <Text className="font-figtree_medium text-base tracking-widest">Kategori Menu </Text>
          </View>
        </View>
      </View>
      <View className="flex w-full flex-row items-center justify-between p-0">
        {menuData.map((item, i) => (
          <Link asChild key={i} href={item.href || '/'}>
            <Button
              variant={'ghost'}
              className="group m-0 w-fit flex-col gap-4 active:bg-background active:opacity-55">
              <View className="flex size-14 content-center items-center justify-center rounded-2xl border border-border bg-transparent group-active:bg-muted">
                <Icon icon={item.icon} color={THEME.light.primary} size={26} />
              </View>
              <Text className="font-figtree_semibold text-xs tracking-wider text-foreground/60">
                {item.label}
              </Text>
            </Button>
          </Link>
        ))}
      </View>
    </View>
  );
}
