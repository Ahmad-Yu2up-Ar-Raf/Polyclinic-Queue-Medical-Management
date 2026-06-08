import { View, Text } from 'react-native';
import React, { useState } from 'react';

import { Icon } from '../../../../fragments/shadcn-ui/icon';
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
import { Button } from '../../../../fragments/shadcn-ui/button';
import { IconSvgElement } from '@hugeicons/react-native';
import { Href, Link, router } from 'expo-router';
import PendaftaranMode from '@/components/ui/fragments/custom-ui/dialog/pendaftaran-select-mode-dialog';

interface menuCategory {
  icon: IconSvgElement;
  label: string;
  onPress?: () => void;
}

type componentProps = {
  setDialogOption: React.Dispatch<React.SetStateAction<boolean>>;
  optionActive: boolean;
};

export default function MenuCard({ optionActive, setDialogOption }: componentProps) {
  const handlePendaftaran = () => {
    if (optionActive) {
      setDialogOption(true);
    } else {
      router.push('/daftar/pendaftaran_baru/first-step');
    }
    console.log('hellow');
  };

  const menuData: menuCategory[] = [
    {
      icon: Plus,
      label: 'Daftar',
      onPress: handlePendaftaran,
    },
    {
      icon: MonitorDotIcon,
      label: 'Monitor',
    },
    {
      icon: Calendar02FreeIcons,
      label: 'Jadwal',
    },
    {
      icon: Information,
      label: 'Info',
    },
  ];

  return (
    <>
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
            <Button
              onPress={item.onPress}
              key={i}
              variant={'ghost'}
              className="group m-0 w-fit flex-col gap-4 active:bg-background active:opacity-55">
              <View className="flex size-14 content-center items-center justify-center rounded-2xl border border-border bg-transparent group-active:bg-muted">
                <Icon icon={item.icon} color={THEME.light.primary} size={26} />
              </View>
              <Text className="font-figtree_semibold text-xs tracking-wider text-foreground/60">
                {item.label}
              </Text>
            </Button>
          ))}
        </View>
      </View>
    </>
  );
}
