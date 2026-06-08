import { View } from 'react-native';
import React from 'react';

import { cn } from '@/lib/utils';
import { Text } from '../../shadcn-ui/text';
import { Antrean } from '@/components/ui/core/block/jadwal/types/jadwal-types';
import { batasiKata } from '@/hooks/use-word';
import { format } from 'date-fns';
import { THEME } from '@/lib/theme';
import { IconSvgElement } from '@hugeicons/react-native';
import { Icon } from '../../shadcn-ui/icon';

import {
  VolumeHighIcon,
  NextIcon,
  Clock01Icon,
  CheckmarkCircle01Icon,
  Calendar02FreeIcons,
} from '@hugeicons/core-free-icons';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../shadcn-ui/card';
import { Image } from '../../shadcn-ui/image';
import { id } from 'date-fns/locale';
import { Badge } from '../../shadcn-ui/badge';

type componentsProps = {
  Antrean: Antrean;
  className?: string;
};

export default function JadwalCard({ Antrean, className }: componentsProps) {
  const Dokter = Antrean.dokter;
  const Poli = Antrean.poli;
  const jadwalKunjungan = format(Antrean.jadwal_kunjungan, 'd/M/yy', { locale: id });
  const NamaDokter = batasiKata(Dokter.nama, 2);

  const statusConfig: Record<
    string,
    { colorClass: string; hslCode: string; icon: IconSvgElement; bgColor: string }
  > = {
    dipanggil: {
      colorClass: 'text-primary',
      bgColor: 'bg-primary/10',
      hslCode: THEME.light.primary,
      icon: VolumeHighIcon,
    },
    dilewati: {
      colorClass: 'text-destructive',
      bgColor: 'bg-destructive/10',
      hslCode: 'hsl(0, 84%, 60%)',
      icon: NextIcon,
    },
    menunggu: {
      colorClass: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
      hslCode: 'hsl(32, 95%, 44%)',
      icon: Clock01Icon,
    },
    selesai: {
      colorClass: 'text-emerald-600',
      bgColor: 'bg-emerald-500/10',
      hslCode: 'hsl(161, 94%, 30%)',
      icon: CheckmarkCircle01Icon,
    },
  };

  const currentStatus = statusConfig[Antrean.status] || {
    colorClass: 'text-muted-foreground',
    bgColor: 'bg-muted-500/10',
    hslCode: 'hsl(240, 4%, 46%)',
    icon: Clock01Icon,
  };

  return (
    <Card className={cn('w-full p-3', className)}>
      <CardContent className="flex h-[8em] flex-row items-center gap-5 p-0">
        <View className={cn('h-full w-[6em] overflow-hidden rounded-2xl border border-border')}>
          <Image source={{ uri: Dokter.foto }} width="100%" height="100%" contentFit="cover" />
        </View>
        <View className="flex-1 gap-5 p-0">
          <CardHeader className="gap-1 p-0">
            <CardTitle className="font-figtree_bold text-sm text-foreground">
              {NamaDokter}
            </CardTitle>

            <CardDescription className="text-xs text-muted-foreground">
              {`${Poli.nama}  •  ${Dokter.spesialisasi} `}
            </CardDescription>
          </CardHeader>
          <View>
            <View className="flex flex-row items-center gap-1">
              <Text className="text-xs text-muted-foreground">Nomor Antrean:</Text>
              <Text className="font-figtree_bold text-xs text-foreground">
                #{Antrean.nomor_antrian}
              </Text>
            </View>
          </View>
          <CardFooter className="flex w-full justify-between gap-5 p-0">
            <View className="flex flex-row items-center gap-2">
              <Icon size={12} icon={Calendar02FreeIcons} color={THEME.dark.mutedForeground} />
              <Text className="text-xs text-muted-foreground">{jadwalKunjungan}</Text>
            </View>
            <Badge className={cn('self-start', currentStatus.bgColor)} variant={'default'}>
              <Text
                className={cn(
                  'font-figtree_bold text-[10px] capitalize',
                  currentStatus.colorClass
                )}>
                {Antrean.status}
              </Text>
            </Badge>
          </CardFooter>
        </View>
      </CardContent>
    </Card>
  );
}
