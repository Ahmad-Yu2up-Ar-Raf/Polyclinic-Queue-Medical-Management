import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Wrapper } from '../layout/wrapper';

import { Dokter } from '@/types/dokter-type';
import LoadingIndicator from '../loading-indicator';
import DokterCard from '../../fragments/custom-ui/card/dokter-card';
import { Icon } from '../../fragments/shadcn-ui/icon';
import { Calendar, Calendar02FreeIcons, Stethoscope02Icon } from '@hugeicons/core-free-icons';
import { THEME } from '@/lib/theme';

import { FetchOverview } from '@/hooks/app/use-overview';
import { Antrean } from '@/types/antrian-types';
import CtaCard from '../../fragments/custom-ui/card/cta-card';

import MenuCard from '../../fragments/custom-ui/card/menu-card';
import JadwalCard from '../../fragments/custom-ui/card/jadwal-card';
import { Link } from 'expo-router';

export default function HomeBlock() {
  const { isLoading, data } = FetchOverview();
  const dokter: Dokter[] = data?.data.dokter ?? [];
  const antrian: Antrean[] = data?.data.antrianUser ?? [];
  console.log(data);
  if (isLoading) {
    return <LoadingIndicator />;
  }
  console.log(antrian);
  return (
    <Wrapper
      edges={[]}
      className="items-start justify-start gap-7 pb-20 pt-8"
      containerClassName="px-0">
      <View className="w-full items-center gap-7 px-9">
        <CtaCard optionActive={antrian.length > 0} />
      </View>

      <View className="w-full items-center gap-7 px-6">
        <MenuCard />
      </View>
      <View className="mt-10 w-full items-center gap-6">
        <View className="flex w-full flex-row items-center justify-between px-9">
          <View className="flex flex-row items-center gap-4">
            <Icon
              icon={Calendar02FreeIcons}
              strokeWidth={2.2}
              color={THEME.light.primary}
              size={24}
            />
            <View className="flex flex-row items-center font-figtree_semibold">
              <Text className="font-figtree_semibold text-xl tracking-wider">Jadwal </Text>
              <Text className="font-figtree_semibold text-xl tracking-wider text-primary">
                Saya
              </Text>
            </View>
          </View>
          <Link href={'/(tabs)/riwayat'}>
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
      <View className="mt-5 w-full items-center gap-6">
        <View className="flex w-full flex-row items-center justify-between px-9">
          <View className="flex flex-row items-center gap-4">
            <Icon
              icon={Stethoscope02Icon}
              strokeWidth={2.2}
              color={THEME.light.primary}
              size={24}
            />
            <View className="flex flex-row items-center font-figtree_semibold">
              <Text className="font-figtree_semibold text-xl tracking-wider">Dokter </Text>
              <Text className="font-figtree_semibold text-xl tracking-wider text-primary">
                Ungulan
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
  );
}
