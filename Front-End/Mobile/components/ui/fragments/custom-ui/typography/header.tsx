import { View } from 'react-native';
import React from 'react';

import { Text } from '../../shadcn-ui/text';
import { Separator } from '../../shadcn-ui/separator';
import { cn } from '@/lib/utils';
import { Icon } from '../../shadcn-ui/icon';
import { Monitor } from '@hugeicons/core-free-icons';
import { THEME } from '@/lib/theme';
import { IconSvgElement } from '@hugeicons/react-native';

type HeaderProps = {
  title: string;
  icon: IconSvgElement;
  className?: string;
};

export function Header({ title, className, icon }: HeaderProps) {
  // 1. Bersihkan spasi berlebih di awal/akhir, lalu pecah berdasarkan spasi
  const words = title.trim().split(/\s+/);

  // 2. Ambil kata pertama dan kedua (kasih fallback string kosong kalau datanya nggak ada)
  const firstWord = words[0] || '';
  const secondWord = words[1] || '';

  return (
    <View className={cn('w-full', className)}>
      <View className={`w-full gap-6 pr-16`}>
        <View className="flex size-14 content-center items-center justify-center rounded-2xl border border-border">
          <Icon icon={icon} color={THEME.light.primary} size={30} />
        </View>

        {/* <Text variant={'small'} className="uppercase tracking-widest">
          {subTitle}
        </Text> */}
        <View>
          <Text
            variant={'h2'}
            className="m-0 border-0 p-0 text-left font-figtree_semibold text-[2.5rem] uppercase leading-tight tracking-tighter text-accent-foreground">
            {firstWord}
          </Text>
          <Text
            variant={'h2'}
            className="m-0 border-0 p-0 text-left font-figtree_semibold text-[2.5rem] uppercase leading-tight tracking-tighter text-primary">
            {secondWord}
          </Text>
        </View>
      </View>
    </View>
  );
}
