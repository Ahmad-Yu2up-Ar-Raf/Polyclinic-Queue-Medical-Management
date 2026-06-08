// File: @/components/ui/core/block/third-step-block.tsx
import React from 'react';
import { View } from 'react-native';
import { router, Stack, Redirect } from 'expo-router';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

import { Text } from '../../../fragments/shadcn-ui/text';
import { Separator } from '../../../fragments/shadcn-ui/separator';
import { Wrapper } from '../../layout/wrapper';
import ProgresHeader from '../../layout/progress-header';
import { SCREEN_OPTIONS } from '../../layout/nav';
import { useScrollTracker } from '@/hooks/use-scroll-tracker';

import { useFinalSubmit } from '@/components/ui/core/block/pendaftaran/hooks/use-pendaftaran';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/fragments/shadcn-ui/card';
import { Icon } from '@/components/ui/fragments/shadcn-ui/icon';
import { THEME } from '@/lib/theme';
import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import FloatingComponent from '@/components/ui/fragments/custom-ui/button/floating-button';
import { Spinner } from '@/components/ui/fragments/shadcn-ui/spinner';
import { Header } from '@/components/ui/fragments/custom-ui/typography/header';

// 1. IMPORT JADWAL CARD LU (Sesuaikan path-nya ya bro)
import JadwalCard from '@/components/ui/fragments/custom-ui/card/jadwal-card';

import { IconSvgElement } from '@hugeicons/react-native';
import {
  ChevronLeft,
  IdentityCardFreeIcons,
  User,
  Call02FreeIcons,
  MaleSymbolFreeIcons,
  FemaleSymbolFreeIcons,
  VolumeHighIcon,
  NextIcon,
  Clock01Icon,
  CheckmarkCircle01Icon,
  DoorOpen,
  Money01FreeIcons,
  HeartAddFreeIcons,
  Calendar01FreeIcons,
  NoteDoneFreeIcons,
} from '@hugeicons/core-free-icons';
import { useOnboardingStore } from '@/components/ui/core/block/pendaftaran/store/pendaftaran-store';

interface detailType {
  value: string;
  label: string;
  Icon: IconSvgElement;
  IconColor?: string;
  className?: string;
}

export default function ThirdStepBlock() {
  const { scrollPosition, handleScroll } = useScrollTracker();
  const { setData, ...storeState } = useOnboardingStore();
  const { submitAction, isLoading } = useFinalSubmit();

  const handleLeave = () => {
    router.push('/daftar/pendaftaran_baru/second-step');
  };

  // Guard Clause: Lempar balik ke step 1 kalau data wajib belum terisi
  if (!storeState.nama || !storeState.nik || !storeState.Dokter || !storeState.poli_id) {
    return <Redirect href="/daftar/pendaftaran_baru/first-step" />;
  }

  // Parsing Tanggal
  const tanggal_lahir = parseISO(storeState.tanggal_lahir!);
  const tanggalLahir = format(tanggal_lahir, 'dd MMMM yyyy', { locale: id });

  const jadwal_kunjungan = parseISO(storeState.jadwal_kunjungan!);
  const jawdwalKunjugan = format(jadwal_kunjungan, 'dd MMMM yyyy', { locale: id });

  const jenisKelamin = storeState.jenis_kelamin;
  const status = (storeState as any).status || 'menunggu'; // Fallback aman ke 'menunggu'
  const metodePembayaran = (storeState as any).metode_pembayaran;

  // 2. ADAPTER DATA: Bentuk objek Antrean tiruan agar memuaskan TypeProps JadwalCard
  const antreanPreviewData = {
    nomor_antrian: (storeState as any).nomor_antrian || storeState.nomor_urut || 0,
    status: status,
    jadwal_kunjungan: jadwal_kunjungan, // Kita kirim berupa objek Date hasil parseISO
    dokter: {
      nama: storeState.Dokter.nama,
      foto: storeState.Dokter.foto || 'https://via.placeholder.com/150', // Fallback avatar aman
      spesialisasi: storeState.Dokter.spesialisasi,
    },
    poli: {
      nama: storeState.poli || 'Poli Tujuan',
    },
  };

  const pasienDetailData: detailType[] = [
    { value: storeState.nama, label: 'Nama Lengkap', Icon: User },
    {
      value: storeState.nik,
      label: 'NIK',
      IconColor: 'hsl(260, 30%, 60%)',
      Icon: IdentityCardFreeIcons,
      className: 'border-b-purple-500 ',
    },
    {
      value: storeState.no_hp!,
      label: 'Nomor',
      IconColor: 'hsl(120, 100%, 50%)',
      Icon: Call02FreeIcons,
      className: 'border-b-green-500 ',
    },
    { value: tanggalLahir, label: 'Tanggal Lahir', Icon: Calendar01FreeIcons },
    {
      value: jenisKelamin!,
      label: 'Jenis Kelamin',
      Icon: jenisKelamin === 'pria' ? MaleSymbolFreeIcons : FemaleSymbolFreeIcons,
      IconColor: jenisKelamin === 'pria' ? THEME.light.primary : 'hsl(330 81.2% 60.4%)',
      className: jenisKelamin === 'pria' ? 'border-b-primary' : 'border-b-pink-500',
    },
  ];

  const statusConfig: Record<
    string,
    { colorClass: string; hslCode: string; icon: IconSvgElement }
  > = {
    dipanggil: {
      colorClass: 'border-b-blue-600',
      hslCode: 'hsl(221, 83%, 53%)',
      icon: VolumeHighIcon,
    },
    dilewati: { colorClass: 'border-b-destructive', hslCode: 'hsl(0, 84%, 60%)', icon: NextIcon },
    menunggu: { colorClass: 'border-b-amber-600', hslCode: 'hsl(32, 95%, 44%)', icon: Clock01Icon },
    selesai: {
      colorClass: 'border-b-emerald-600',
      hslCode: 'hsl(161, 94%, 30%)',
      icon: CheckmarkCircle01Icon,
    },
  };

  const currentStatus = statusConfig[status] || {
    colorClass: 'border-b-muted-foreground',
    hslCode: 'hsl(240, 4%, 46%)',
    icon: Clock01Icon,
  };

  const antrianDetailData: detailType[] = [
    {
      value: storeState.poli!,
      label: 'Poli Tujuan',
      Icon: DoorOpen,
      IconColor: 'hsl(330 81.2% 60.4%)',
      className: 'border-b-pink-500 ',
    },
    {
      value: status,
      label: 'Antrean Status',
      Icon: currentStatus.icon,
      IconColor: currentStatus.hslCode,
      className: currentStatus.colorClass,
    },
    { value: jawdwalKunjugan, label: 'Jadwal Kunjungan', Icon: Calendar01FreeIcons },
    {
      value: metodePembayaran!,
      label: 'Metode Pembayaran',
      IconColor: metodePembayaran === 'BPJS' ? 'hsl(120, 100%, 50%)' : 'hsl(311 46.4% 30%)',
      Icon: metodePembayaran === 'BPJS' ? HeartAddFreeIcons : Money01FreeIcons,
      className: metodePembayaran === 'BPJS' ? 'border-b-green-500' : 'border-b-purple-500',
    },
  ];

  return (
    <>
      <Stack.Screen
        options={SCREEN_OPTIONS({
          leftIcon: ChevronLeft,
          className: 'px-5',
          leftAction: handleLeave,
          title: 'Pendaftaran',
          scrollAnimatedPosition: scrollPosition,
          scrollTriggerPoint: 400,
          scrollAnimationType: 'slide',
        })}
      />
      <View style={{ flex: 1 }}>
        <Wrapper
          animatedScrollHandler={handleScroll}
          edges={[]}
          className="items-start justify-start gap-10 pb-60 pt-2"
          containerClassName="px-8">
          <ProgresHeader />

          <View className="w-full px-1">
            <Header title="Konfirmasi Konsultasi" icon={NoteDoneFreeIcons} />
            <Separator className="mb-10 mt-7" />

            <View className="gap-12">
              <View className="w-full">
                <Text className="mb-4 px-1 font-figtree_medium text-sm uppercase tracking-widest text-foreground">
                  Tiket Antrean:
                </Text>
                {/* Nomor Urut & Antrean Box */}
                <Card className="w-full overflow-hidden rounded-3xl border-primary bg-primary/5">
                  <CardContent className="flex flex-row items-center justify-between gap-5 px-4 py-1">
                    <View className="flex-1 items-center justify-center">
                      <Text className="mb-1 font-figtree_bold text-lg tracking-widest text-primary">
                        {(storeState as any).nomor_antrian || '-'}
                      </Text>
                      <Text className="font-figtree_medium text-xs uppercase tracking-wider text-primary/90">
                        Nomor Antrean
                      </Text>
                    </View>

                    <Separator
                      orientation="vertical"
                      className="h-16 w-[3px] bg-primary opacity-50"
                    />

                    <View className="flex-1 items-center justify-center">
                      <Text className="mb-1 font-figtree_bold text-lg tracking-widest text-primary">
                        {storeState.nomor_urut || '-'}
                      </Text>
                      <Text className="font-figtree_medium text-xs uppercase tracking-wider text-primary/90">
                        Nomor Urut
                      </Text>
                    </View>
                  </CardContent>
                </Card>
              </View>

              {/* SECTION REVIEW KARTU JADWAL */}
              <View className="w-full">
                <Text className="mb-4 px-1 font-figtree_medium text-sm uppercase tracking-widest text-foreground">
                  Dokter Anda:
                </Text>
                {/* Nomor 
                {/* 3. RENDER KOMPONEN JADWAL CARD DI SINI */}
                <JadwalCard Antrean={antreanPreviewData as any} />
              </View>

              {/* Data Detail Lainnya */}
              <DetailCard label="Detail Antrean" data={antrianDetailData} />
              <DetailCard label="Detail Pasien" data={pasienDetailData} />
            </View>
          </View>
        </Wrapper>

        <FloatingComponent>
          <Button
            className="w-full"
            variant="default"
            size={'lg'}
            onPress={submitAction}
            disabled={isLoading}>
            <Text className="font-figtree_bold text-lg text-primary-foreground">Kirim</Text>
            {isLoading && <Spinner className="text-primary-foreground" />}
          </Button>
        </FloatingComponent>
      </View>
    </>
  );
}

// Komponen DetailCard tetap di bawah...
type detailCardProps = {
  label: string;
  data: detailType[];
};

export function DetailCard({ label, data }: detailCardProps) {
  return (
    <View>
      <Text className="mb-5 px-1 font-figtree_medium text-sm uppercase tracking-widest text-foreground">
        {label}
      </Text>
      <Card className="gap-4 px-7 py-10">
        <CardContent className="flex flex-col gap-10 rounded-2xl bg-card p-0">
          {data.map((item, i) => (
            <View
              key={i}
              className={cn(
                'w-full flex-row items-center justify-between gap-5 border-b border-primary px-0 pb-5',
                item.className
              )}>
              <View className="flex flex-row items-center gap-4">
                <Icon icon={item.Icon} size={16} color={item.IconColor ?? THEME.light.primary} />
                <Text className="font-figtree_medium text-xs tracking-widest text-muted-foreground">
                  {item.label}:
                </Text>
              </View>
              <Text className="flex-1 text-right font-figtree_bold text-xs tracking-tighter text-foreground/60">
                {item.value}
              </Text>
            </View>
          ))}
        </CardContent>
      </Card>
    </View>
  );
}
