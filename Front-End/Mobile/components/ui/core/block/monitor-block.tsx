import { View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SCREEN_OPTIONS } from '../layout/nav';
import { ChevronLeft, Monitor } from '@hugeicons/core-free-icons';

import LoadingIndicator from '../loading-indicator';
import { Wrapper } from '../layout/wrapper';
import AntreanCard from '../../fragments/custom-ui/card/antrian-card';
import { FetchAntreanMonitor } from '@/hooks/app/use-antrian';
import { Antrean } from '@/types/antrian-types';
import { Header } from '../../fragments/custom-ui/typography/header';
import { useScrollTracker } from '@/hooks/useScrollTracker';
import { Separator } from '../../fragments/shadcn-ui/separator';

// BEST PRACTICE: Gunakan penamaan kapital untuk interface agar beda dari variabel
interface AntreanCardData {
  title: string;
  deskripsi: string;
  status: string;
  Antrean: Antrean[];
}

export default function MonitorBlock() {
  const { isLoading, data, refetch, isRefetching } = FetchAntreanMonitor();
  const { scrollPosition, handleScroll } = useScrollTracker();
  const antrianDipanggil = data?.data?.dipanggil ?? [];
  const antrianMenunggu = data?.data?.menunggu ?? [];
  const antrianDilewati = data?.data?.dilewati ?? [];
  const antrianSelesai = data?.data?.selesai ?? [];

  const antrianCardList: AntreanCardData[] = [
    {
      title: 'Antrean Dipanggil',
      deskripsi: 'Daftar antrian   dipanggil',
      status: 'dipanggil',
      Antrean: antrianDipanggil,
    },
    {
      title: 'Antrean Menunggu',
      deskripsi: 'Daftar antrian menunggu giliran',
      status: 'menunggu',
      Antrean: antrianMenunggu,
    },
    {
      title: 'Antrean Selesai',
      deskripsi: 'Daftar antrian selesai diperiksa',
      status: 'selesai',
      Antrean: antrianSelesai,
    },
    {
      title: 'Antrean Dilewati',
      deskripsi: 'Daftar antrian terlewat',
      status: 'dilewati',
      Antrean: antrianDilewati,
    },
  ];

  return (
    <>
      <Stack.Screen
        options={SCREEN_OPTIONS({
          leftIcon: ChevronLeft,
          className: 'px-5',

          title: 'Monitor',
          scrollAnimatedPosition: scrollPosition,
          scrollTriggerPoint: 400,
          scrollAnimationType: 'slide',
        })}
      />

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Wrapper
          animatedScrollHandler={handleScroll}
          edges={[]}
          className="items-start justify-start gap-10 px-9 py-4"
          containerClassName="px-0">
          <Header title="Monitor Antrean" icon={Monitor} />
          <Separator className="" />
          <View className="w-full gap-10">
            {antrianCardList.map((item, i) => (
              <AntreanCard
                key={i}
                status={item.status}
                Title={item.title}
                Antrean={item.Antrean}
                Deskripsi={item.deskripsi}
              />
            ))}
          </View>
        </Wrapper>
      )}
    </>
  );
}
