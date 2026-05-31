import { View, Text } from 'react-native';
import React from 'react';
import { usePathname } from 'expo-router';
import { cn } from '@/lib/utils';
import { Progress } from '../../fragments/shadcn-ui/progress';

type progresSchema = {
  label: string;
  path: string[];
};

const Progres: progresSchema[] = [
  {
    label: 'Indentitas',
    path: ['/daftar/stepper/first-step'],
  },
  {
    label: 'Layanan',
    path: ['/daftar/stepper/second-step'],
  },
  {
    label: 'Tinjau',
    path: ['/daftar/stepper/third-step'],
  },
];

export default function ProgresHeader() {
  const path = usePathname();

  // 1. Debugging: Pastikan path yang didapat benar
  console.log('Current Path:', path);

  // 2. Cari index dengan toleransi (menggunakan .includes agar lebih aman)
  const currentIndex = Progres.findIndex((item) => item.path.some((p) => path.includes(p)));

  // Jika currentIndex masih -1, paksa jadi 0 (untuk fallback awal)
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <View className="relative flex flex-row gap-2 overflow-hidden px-1 pt-1 sm:gap-3">
      {Progres.map((item, i) => {
        const isCompleted = i < activeIndex;
        const isActiveStep = i === activeIndex;
        const isActive = i <= activeIndex;

        return (
          <View key={i} className="flex-1 gap-3">
            <View>
              <Text
                className={cn(
                  'font-figtree_semibold text-sm transition-colors',

                  isActiveStep
                    ? 'text-primary'
                    : isCompleted
                      ? 'text-primary/70'
                      : 'text-muted-foreground/40'
                )}>
                {i + 1}. {item.label}
              </Text>
            </View>
            <Progress
              value={isActive ? 100 : 0}
              // Memastikan background terlihat saat tidak aktif
              className={cn('h-1', !isActive && 'bg-muted')}
              indicatorClassName={cn('h-1', isActive && 'bg-primary')}
            />
          </View>
        );
      })}
    </View>
  );
}
