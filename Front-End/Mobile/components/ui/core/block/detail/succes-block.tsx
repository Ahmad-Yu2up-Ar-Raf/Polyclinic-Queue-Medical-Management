import { View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Antrean } from '@/types/antrian-types';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../../../fragments/shadcn-ui/card';
import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import { Text } from '../../../fragments/shadcn-ui/text';
import { Separator } from '../../../fragments/shadcn-ui/separator';
import { format, parseISO, differenceInCalendarDays } from 'date-fns';
import { id } from 'date-fns/locale';

import { router } from 'expo-router';
import { Icon } from '../../../fragments/shadcn-ui/icon';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { THEME } from '@/lib/theme';

type componentProps = {
  Antrean: Antrean;
};

export default function SuccesBlock({ Antrean }: componentProps) {
  const jadwal_kunjungan = parseISO(Antrean.jadwal_kunjungan!);
  const jadwalKunjungan = format(jadwal_kunjungan, 'EEEE, dd MMMM yyyy', { locale: id });
  // 2. Ambil tanggal hari ini (sekarang)
  const hariIni = new Date();

  // 3. Hitung selisih harinya (Tanggal Tujuan, Tanggal Sekarang)
  const sisaHari = differenceInCalendarDays(jadwal_kunjungan, hariIni);
  // Output misal: "Rabu, 10 Januari 2024"

  let teksStatus;

  if (sisaHari > 0) {
    teksStatus = `Sisa ${sisaHari} hari lagi`; // Contoh: "Sisa 3 hari lagi"
  } else if (sisaHari === 0) {
    teksStatus = 'Jadwal hari ini!';
  } else {
    // Kalau hasilnya minus, berarti jadwalnya udah lewat
    teksStatus = `Sudah lewat ${Math.abs(sisaHari)} hari yang lalu`;
  }
  return (
    <SafeAreaView
      edges={['bottom', 'top', 'left', 'right']}
      className="h-full content-start items-start justify-center pt-3 bg-card px-12 sm:flex-1">
      <View className="flex w-full flex-col items-center justify-center gap-2">
        <View className="size-fit rounded-full bg-primary/5 p-1">
          <Icon
            icon={CheckmarkCircle02Icon}
            color={THEME.light.background}
            fill={'hsl(120, 66%, 72%)'}
            size={40}
          />
        </View>
        <Text className="text-center font-figtree_semibold text-xl text-foreground/70">
          Berhasil
        </Text>
        <Text className="text-center font-figtree_semibold text-base text-muted-foreground/50">
          Posisi Anda dalam antrean telah dibuat.
        </Text>
      </View>
      <Card className="relative m-auto flex h-fit w-full max-w-sm content-center justify-center gap-5 border-0 bg-primary p-0 shadow-none sm:border-border">
        <CardHeader className="relative mb-0 flex w-full flex-col content-center items-center justify-start p-2">
          <View className="w-full gap-3 rounded-2xl bg-background py-7">
            <CardDescription className="text-center font-figtree_thin text-lg text-primary/90 sm:text-left">
              Nomor Antrean
            </CardDescription>
            <CardTitle className="mb-0.5 text-center font-figtree_bold text-5xl tracking-tighter text-primary">
              {Antrean.nomor_antrian}
            </CardTitle>
          </View>
        </CardHeader>
        <CardContent className="mb-3 gap-4 px-7 py-0">
          <View className="gap-2">
            <Text className="font-figtree_regular text-xs text-primary-foreground/80">POLI</Text>
            <Text className="font-figtree_semibold text-lg text-primary-foreground">
              {Antrean.poli.nama}
            </Text>
          </View>
          <Separator className="h-[0.6px] bg-primary-foreground/50" />

          <View className="gap-2">
            <Text className="font-figtree_regular text-xs text-primary-foreground/80">DOKTER</Text>
            <Text className="font-figtree_semibold text-lg text-primary-foreground">
              dr. {Antrean.dokter.nama}
            </Text>
          </View>
        </CardContent>
        <CardFooter className={'relative border-t-2 border-dashed border-primary-foreground px-0'}>
          <View className="absolute -top-4 w-full flex-row items-center justify-between">
            <View className="-ml-4 size-8 gap-4 rounded-full bg-background" />
            <View className="-mr-4 size-8 gap-4 rounded-full bg-background" />
          </View>
          <View className="px-7 pb-6 pt-8">
            <View className="gap-2">
              <Text className="font-figtree_regular text-xs text-primary-foreground/80">
                TANGGAL KUNJUNGAN
              </Text>
              <Text className="font-figtree_semibold text-lg text-primary-foreground">
                {jadwalKunjungan}
              </Text>
              <Text className="font-figtree_regular text-xs text-primary-foreground/80">
                {teksStatus}
              </Text>
            </View>
          </View>
        </CardFooter>
      </Card>
      <View className="w-full gap-4">
        <Button
          onPress={() => router.push('/(tabs)/riwayat')}
          className="w-full"
          variant="default"
          size={"lg"}>
          <Text className="font-figtree_semibold  text-primary-foreground">
            Lihat Riwayat
          </Text>
        </Button>
        <Button onPress={() => router.push('/')} className="w-full" variant="outline" size={"lg"}>
          <Text className="font-figtree_semibold  text-secondary-foreground/60">
            Kembali ke Beranda
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
