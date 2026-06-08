import { View, Pressable, ScrollView } from 'react-native'; 
import React, { useState } from 'react';

import { Wrapper } from '../../layout/wrapper';
import { Stack, router } from 'expo-router';
import { SCREEN_OPTIONS } from '../../layout/nav';
import { batasiKata } from '@/hooks/use-word';
import {
  Calendar,
  Calendar02FreeIcons,
  Calendar02Icon,
  Certificate01FreeIcons,
  CheckmarkBadge01FreeIcons,
  ChevronLeft,
  Moon,
  Sun,
  User,
} from '@hugeicons/core-free-icons';
import { useScrollTracker } from '@/hooks/use-scroll-tracker';
import { Text } from '@/components/ui/fragments/shadcn-ui/text';
import { useInitials } from '@/hooks/use-initial';
import { Badge } from '@/components/ui/fragments/shadcn-ui/badge';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/fragments/shadcn-ui/image';
import FloatingComponent from '@/components/ui/fragments/custom-ui/button/floating-button';
import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import {
  useOnboardingStore,
  setDokterPoli,
} from '@/components/ui/core/block/pendaftaran/store/pendaftaran-store';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/components/ui/fragments/shadcn-ui/card';
import { Icon } from '@/components/ui/fragments/shadcn-ui/icon';
import { THEME } from '@/lib/theme';
import { Dokter } from '../dokter/types/dokter-type';
import PendaftaranMode from '@/components/ui/fragments/custom-ui/dialog/pendaftaran-select-mode-dialog';

type compoenentProp = {
  Dokter: Dokter;
};

// 1. Helper function untuk menghitung pengalaman dari created_at
const getPengalaman = (dateString: Date) => {
  const start = new Date(dateString);
  const now = new Date();
  const diffYears = now.getFullYear() - start.getFullYear();

  if (diffYears < 1) {
    return 'Baru';
  }
  return `${diffYears} Thn`;
};

// ====================================================================
// 2. HELPER UTILITY: MENGECEK APAKAH JADWAL AKTIF SEKARANG (REAL-TIME)
// ====================================================================
const checkIsJadwalActive = (hari: string, jamMulai: string, jamSelesai: string): boolean => {
  const listHariIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const sekarang = new Date();

  // Ambil nama hari ini (e.g., "Senin")
  const hariIni = listHariIndo[sekarang.getDay()];
  if (hari.toLowerCase() !== hariIni.toLowerCase()) return false;

  // Ambil waktu sekarang format HH:mm
  const jamSekarang = String(sekarang.getHours()).padStart(2, '0');
  const menitSekarang = String(sekarang.getMinutes()).padStart(2, '0');
  const waktuSekarangStr = `${jamSekarang}:${menitSekarang}`;

  // Ambil HH:mm dari database (antisipasi jika data dari backend tipenya HH:mm:ss)
  const mulai = jamMulai.substring(0, 5);
  const selesai = jamSelesai.substring(0, 5);

  // Cek apakah waktu saat ini masuk dalam range jadwal dokter
  return waktuSekarangStr >= mulai && waktuSekarangStr <= selesai;
};

export default function DokterDetailBlock({ Dokter }: compoenentProp) {
  const Nama = batasiKata(Dokter.nama, 3);
  const [showDialogOption, setDialogOption] = useState(false);
  const { scrollPosition, handleScroll } = useScrollTracker();
  const Poli = Dokter.poli;
  const initial = useInitials();

  const handlePendaftaran = () => {
    setDialogOption(true);
  };
  const getShiftWaktu = (jamMulai: string): string => {
    // Ambil 2 digit pertama dari jam_mulai (misal "08:00:00" -> "08")
    const jam = parseInt(jamMulai.substring(0, 2), 10);

    // Kalau di bawah jam 15 (3 Sore) anggap Pagi/Siang, sisanya Malam
    return jam < 15 ? 'Pagi' : 'Malam';
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  const overviewStats = [
    {
      id: 'pasien',
      title: 'Total Pasien',
      value: Dokter.antrian_count,
      icon: User,
      iconColor: 'hsl(330, 81%, 60%)',
      bgColor: 'hsl(330, 81%, 95%)',
    },
    {
      id: 'pengalaman',
      title: 'Pengalaman',
      value: getPengalaman(Dokter.created_at),
      icon: Certificate01FreeIcons,
      iconColor: 'hsl(217, 91%, 60%)',
      bgColor: 'hsl(217, 91%, 95%)',
    },
    {
      id: 'jadwal',
      title: 'Total Jadwal',
      value: Dokter.jadwal_count,
      icon: Calendar02FreeIcons,
      iconColor: 'hsl(142, 71%, 45%)',
      bgColor: 'hsl(142, 71%, 95%)',
    },
  ];

  const handleJadwalkanKonsultasi = () => {
    const store = useOnboardingStore.getState(); // <-- Ini udah bener banget

    // 1. Simpan ID-nya
    store.setData({
      dokter_id: Dokter.id,
      poli_id: Dokter.poli_id ?? Poli?.id,
    });

    // 2. Simpan Objek Utuhnya (Untuk kebutuhan visual di Step 3)
    setDokterPoli({
      Dokter: Dokter,
      poli: Poli.nama,
    });

    router.push('/daftar/pendaftaran_baru/first-step');
  };

  return (
    <>
      <Stack.Screen
        options={SCREEN_OPTIONS({
          title: Nama,
          leftIcon: ChevronLeft,
          className: 'px-5',
          scrollAnimatedPosition: scrollPosition,
          scrollTriggerPoint: 400,
          scrollAnimationType: 'slide',
        })}
      />
      <PendaftaranMode showDialogOption={showDialogOption} setDialogOption={setDialogOption} />
      <View style={{ flex: 1 }}>
        <Wrapper
          animatedScrollHandler={handleScroll}
          edges={[]}
          className="items-start justify-start gap-7 pb-48 pt-6"
          containerClassName="px-0">
          <View className="w-full gap-12">
            {/* BAGIAN HEADER PROFIL */}
            <View className="flex flex-row items-center gap-7 px-9">
              <View>
                <View className="relative size-24 overflow-hidden rounded-full border border-border">
                  <Image
                    source={{ uri: Dokter.foto }}
                    width="100%"
                    height="100%"
                    contentFit="cover"
                  />
                </View>
                <View className="absolute -bottom-1 -right-2 flex size-10 content-center items-center justify-center rounded-b-2xl">
                  <Icon
                    icon={CheckmarkBadge01FreeIcons}
                    color={THEME.light.primaryForeground}
                    fill={THEME.light.primary}
                    size={30}
                  />
                </View>
              </View>

              <View className="gap-2">
                <Badge
                  className={cn(
                    'self-start',
                    Dokter.tersedia ? 'bg-primary/10' : 'bg-destructive/10'
                  )}
                  variant={Dokter.tersedia ? 'default' : 'destructive'}>
                  <Text
                    className={cn(
                      'font-figtree_bold text-[10px]',
                      Dokter.tersedia ? 'text-primary' : 'text-destructive'
                    )}>
                    {Dokter.tersedia ? 'Tersedia' : 'Tidak Tersedia'}
                  </Text>
                </Badge>
                <View className="gap-2">
                  <Text className="font-figtree_bold text-xl tracking-tighter text-foreground">
                    {Nama}
                  </Text>
                  <Text className="font-figtree_regular text-sm tracking-tighter text-muted-foreground">
                    {`${Poli.nama}  •  ${Dokter.spesialisasi} `}
                  </Text>
                </View>
              </View>
            </View>

            {/* BAGIAN STATS OVERVIEW */}
            <View className="w-full px-9">
              <View className="flex w-full flex-row items-center justify-between gap-3">
                {overviewStats.map((stat) => (
                  <Card key={stat.id} className="flex-1 border-muted px-1 py-5 pt-0 shadow-none">
                    <CardContent className="flex flex-col items-center gap-4 p-0 pt-0">
                      <CardHeader
                        className="flex size-12 content-center items-center justify-center rounded-b-2xl"
                        style={{ backgroundColor: stat.bgColor }}>
                        <Icon icon={stat.icon} color={stat.iconColor} size={23} />
                      </CardHeader>
                      <View className="flex items-center gap-1">
                        <CardTitle className="text-center font-figtree_bold text-base text-accent-foreground">
                          {stat.value}
                        </CardTitle>
                        <CardDescription className="text-center text-[10px] text-muted-foreground">
                          {stat.title}
                        </CardDescription>
                      </View>
                    </CardContent>
                  </Card>
                ))}
              </View>
            </View>

            <View className="gap-5 px-9">
              <Text className="font-figtree_bold">Tentang Dokter</Text>
              <View className="relative">
                <Text
                  className="text-sm text-muted-foreground"
                  numberOfLines={isExpanded ? undefined : 4}
                  onTextLayout={(e) => {
                    if (e.nativeEvent.lines.length >= 4 && !showReadMore) {
                      setShowReadMore(true);
                    }
                  }}>
                  {Dokter.deskripsi}
                </Text>

                {showReadMore && !isExpanded && (
                  <Pressable
                    onPress={() => setIsExpanded(true)}
                    className="absolute bottom-0 right-0 flex-row items-center gap-2 bg-background pl-2">
                    <Text className="font-figtree_bold text-sm">....</Text>
                    <Text className="font-figtree_bold text-sm text-primary">
                      Baca Selengkapnya
                    </Text>
                  </Pressable>
                )}

                {/* {showReadMore && isExpanded && (
                  <Pressable onPress={() => setIsExpanded(false)} className="mt-2">
                    <Text className="font-figtree_bold text-sm text-primary">
                      Tampilkan Lebih Sedikit
                    </Text>
                  </Pressable>
                )} */}
              </View>
            </View>

            {/* ====================================================================
                SECTION BARU: WORKING TIME
               ==================================================================== */}
            <View className="w-full gap-4 px-9">
              <Text className="font-figtree_bold">Waktu Kerja</Text>
              {Dokter.jadwal && Dokter.jadwal.length > 0 ? (
                (() => {
                  // Ambil hari dari elemen pertama & terakhir di array buat nampilin *range* harinya
                  const firstSchedule = Dokter.jadwal[0];
                  const lastSchedule = Dokter.jadwal[Dokter.jadwal.length - 1];

                  // Kalau jadwalnya cuma 1 hari, tampilin hari itu aja. Kalau lebih, pakai format "HariAwal - HariAkhir"
                  const dayRange =
                    Dokter.jadwal.length === 1
                      ? firstSchedule.hari
                      : `${firstSchedule.hari} - ${lastSchedule.hari}`;

                  // Potong detik pada jam (HH:mm:ss -> HH:mm)
                  const timeRange = `${firstSchedule.jam_mulai.substring(
                    0,
                    5
                  )} - ${firstSchedule.jam_selesai.substring(0, 5)}`;

                  return (
                    <Card className="flex-row items-center justify-between rounded-2xl border border-border bg-background px-4 py-4 shadow-none">
                      <View className="flex-row items-center gap-3">
                        <View className="items-center justify-center rounded-full bg-primary/10 p-2">
                          <Icon icon={Calendar} color={THEME.light.primary} size={18} />
                        </View>
                        <Text className="font-figtree_bold text-sm text-foreground">
                          {dayRange}
                        </Text>
                      </View>
                      <Badge variant="secondary" className="bg-muted px-3 py-1">
                        <Text className="font-figtree_medium text-xs tracking-tight text-muted-foreground">
                          {timeRange}
                        </Text>
                      </Badge>
                    </Card>
                  );
                })()
              ) : (
                <Text className="font-figtree_regular text-sm italic text-muted-foreground">
                  Informasi waktu kerja belum tersedia.
                </Text>
              )}
            </View>

            {/* ====================================================================
                NEW SECTION: CAROUSEL JADWAL PRAKTIK
               ==================================================================== */}
            <View className="w-full gap-5">
              <Text className="px-9 font-figtree_bold">Jadwal Praktek</Text>

              {Dokter.jadwal && Dokter.jadwal.length > 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 36, gap: 11 }}
                  contentContainerClassName="flex-row gap-3 pr-9">
                  {Dokter.jadwal.map((j, i) => {
                    // 1. Cek Aktif atau Nggak
                    const isActive = checkIsJadwalActive(j.hari, j.jam_mulai, j.jam_selesai);

                    // 2. INI CARA NGECEK SHIFT PAGI/MALAM NYA BRO
                    const shiftWaktu = getShiftWaktu(j.jam_mulai);

                    return (
                      <Card
                        key={i}
                        className={cn(
                          'flex-row items-center gap-3 rounded-2xl border px-4 py-3',
                          isActive
                            ? 'border-primary bg-primary shadow-sm shadow-primary/20'
                            : 'border-border bg-background active:bg-muted/40'
                        )}>
                        {/* Hari */}
                        <CardContent className="flex flex-row items-center gap-4 px-2">
                          <Icon
                            icon={shiftWaktu == 'Pagi' ? Sun : Moon}
                            color={isActive ? THEME.light.primaryForeground : THEME.dark.foreground}
                            size={20}
                          />

                          <View>
                            <CardTitle
                              className={cn(
                                'font-figtree_bold text-sm tracking-wide',
                                isActive ? 'text-primary-foreground' : 'text-foreground'
                              )}>
                              {j.hari}
                            </CardTitle>

                            {/* Jam Mulai - Jam Selesai */}
                            <CardDescription
                              className={cn(
                                'font-figtree_medium text-xs tracking-tight',
                                isActive ? 'text-primary-foreground/90' : 'text-muted-foreground'
                              )}>
                              {`${j.jam_mulai.substring(0, 5)} - ${j.jam_selesai.substring(0, 5)}`}
                            </CardDescription>
                          </View>
                        </CardContent>
                      </Card>
                    );
                  })}
                </ScrollView>
              ) : (
                <Text className="px-9 font-figtree_regular text-sm italic text-muted-foreground">
                  Belum ada jadwal praktik yang tersedia.
                </Text>
              )}
            </View>
          </View>
        </Wrapper>

        <FloatingComponent>
          <Button
            className="w-full gap-4"
            variant="default"
            size={'lg'}
            onPress={handlePendaftaran}
            disabled={!Dokter.tersedia}>
            <Icon icon={Calendar02Icon} color={THEME.light.primaryForeground} size={20} />

            <Text className="font-figtree_bold text-base text-primary-foreground">
              {Dokter.tersedia ? 'Konsultasi Bersama' : 'Dokter Tidak Tersedia'}
            </Text>
          </Button>
        </FloatingComponent>
      </View>
    </>
  );
}
