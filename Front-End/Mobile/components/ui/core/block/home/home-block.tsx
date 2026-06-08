import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Wrapper } from '../../layout/wrapper';

import LoadingIndicator from '../../loading-indicator';
import DokterCard from '../../../fragments/custom-ui/card/dokter-card';
import { Icon } from '../../../fragments/shadcn-ui/icon';
import { Calendar, Calendar02FreeIcons, Stethoscope02Icon } from '@hugeicons/core-free-icons';
import { THEME } from '@/lib/theme';

import { FetchOverview } from '@/components/ui/core/block/home/hooks/use-overview';
import { Antrean } from '@/components/ui/core/block/jadwal/types/jadwal-types';
import CtaCard from './components/cta-card';

import MenuCard from './components/menu-card';
import JadwalCard from '../../../fragments/custom-ui/card/jadwal-card';
import { Link } from 'expo-router';
import { Dokter } from '../dokter/types/dokter-type';
import PendaftaranMode from '@/components/ui/fragments/custom-ui/dialog/pendaftaran-select-mode-dialog';

export default function HomeBlock() {
  const { isLoading, data, isError, error } = FetchOverview();
  const [showDialogOption, setDialogOption] = useState(false);

  const dokter: Dokter[] = data?.data?.dokter ?? [];
  const antrian: Antrean[] = data?.data?.antrianUser ?? [];

  console.log('=== DEBUGGING API ===');
  console.log('Is Loading:', isLoading);
  console.log('Is Error:', isError);
  if (isError) {
    console.log('Pesan Error:', error?.message);
  }
  console.log('Data:', data);
  console.log('=====================');
  if (isLoading) {
    return <LoadingIndicator />;
  }
  console.log(antrian);

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center pt-10">
        <Text className="font-bold text-red-500">Gagal narik data: {error?.message}</Text>
      </View>
    );
  }
  return (
    <>
      <PendaftaranMode showDialogOption={showDialogOption} setDialogOption={setDialogOption} />
      <Wrapper
        edges={[]}
        className="items-start justify-start gap-10 pb-20 pt-8"
        containerClassName="px-0">
        <View className="w-full items-center gap-7 px-9">
          <CtaCard setDialogOption={setDialogOption} optionActive={antrian.length > 0} />
        </View>

        <View className="mb-6 w-full items-center gap-7 px-6">
          <MenuCard setDialogOption={setDialogOption} optionActive={antrian.length > 0} />
        </View>
        {antrian.length > 0 && (
          <View className="w-full items-center gap-6">
            <View className="flex w-full flex-row items-center justify-between px-9">
              <View className="flex flex-row items-center gap-4">
                <Icon icon={Calendar} strokeWidth={2.2} color={THEME.light.primary} size={24} />
                <View className="flex flex-row items-center font-figtree_semibold">
                  <Text className="font-figtree_semibold text-xl tracking-tighter">Jadwal </Text>
                  <Text className="font-figtree_bold text-xl tracking-tighter text-primary">
                    Saya
                  </Text>
                </View>
              </View>
              <Link href={'/(tabs)/jadwal'}>
                <Text className="font-figtree_regular text-xs">Lihat Semua</Text>
              </Link>
            </View>
            <View className="flex w-full flex-row flex-wrap gap-0">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 36, gap: 11 }}>
                {antrian.map((antrian, index) => (
                  <JadwalCard
                    className="w-80 flex-1"
                    key={`antrian-${antrian.id}-${index}`}
                    Antrean={antrian}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        )}
        <View className="w-full items-center gap-6">
          <View className="flex w-full flex-row items-center justify-between px-9">
            <View className="flex flex-row items-center gap-4">
              <Icon
                icon={Stethoscope02Icon}
                strokeWidth={2.2}
                color={THEME.light.primary}
                size={24}
              />
              <View className="flex flex-row items-center font-figtree_semibold">
                <Text className="font-figtree_semibold text-xl tracking-tighter">Dokter </Text>
                <Text className="font-figtree_bold text-xl tracking-tighter text-primary">
                  Unggulan
                </Text>
              </View>
            </View>
            <Link href={'/(tabs)/dokter'}>
              <Text className="font-figtree_regular text-xs">Lihat Semua</Text>
            </Link>
          </View>

          <View className="flex w-full flex-row flex-wrap gap-0 px-8">
            {dokter.map((item, i) => (
              <View className="h-fit w-1/2 p-1 pb-5" key={i}>
                <DokterCard Dokter={item} />
              </View>
            ))}
          </View>
        </View>
      </Wrapper>
    </>
  );
}
