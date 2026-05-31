// File: antrian-card.tsx
import { View } from 'react-native';
import React from 'react';
import { Icon } from '../../shadcn-ui/icon';
import {
  VolumeHighIcon,
  NextIcon,
  Clock01Icon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons';
import { Text } from '../../shadcn-ui/text';
import { cn } from '@/lib/utils';
import { IconSvgElement } from '@hugeicons/react-native';
import { THEME } from '@/lib/theme';

export interface AntreanCardHeaderProps {
  status: string;
  title?: string;
}

export default function AntreanCardHeader({ status, title }: AntreanCardHeaderProps) {
  const statusConfig: Record<
    string,
    { colorClass: string; hslCode: string; icon: IconSvgElement }
  > = {
    dipanggil: {
      colorClass: 'text-primary',

      hslCode: THEME.light.primary,
      icon: VolumeHighIcon,
    },
    dilewati: { colorClass: 'text-destructive', hslCode: 'hsl(0, 84%, 60%)', icon: NextIcon },
    menunggu: { colorClass: 'text-amber-600', hslCode: 'hsl(32, 95%, 44%)', icon: Clock01Icon },
    selesai: {
      colorClass: 'text-emerald-600',
      hslCode: 'hsl(161, 94%, 30%)',
      icon: CheckmarkCircle01Icon,
    },
  };

  const currentStatus = status
    ? statusConfig[status]
    : {
        colorClass: 'text-muted-foreground',
        hslCode: 'hsl(240, 4%, 46%)',
        icon: Clock01Icon,
      };

  const displayTitle = title || `Antrian ${status}`;
  const words = displayTitle.trim().split(/\s+/);
  const firstWord = words[0] || '';
  const secondWord = words[1] || '';

  return (
    // Tambahin background biar pas scroll nempel di atas (sticky) teksnya gak ketumpuk
    <View className="mb-2 w-full flex-row items-center bg-background px-9 py-4">
      <View className="flex flex-row items-center gap-5">
        <Icon icon={currentStatus.icon} strokeWidth={2.2} color={currentStatus.hslCode} size={20} />
        <View className="flex flex-row items-center font-figtree_semibold">
          <Text className="font-figtree_semibold text-xl tracking-tighter text-accent-foreground/70">
            {firstWord}{' '}
          </Text>
          <Text
            className={cn(
              'font-figtree_semibold text-xl capitalize tracking-tighter',
              currentStatus.colorClass
            )}>
            {secondWord}
          </Text>
        </View>
      </View>
    </View>
  );
}
