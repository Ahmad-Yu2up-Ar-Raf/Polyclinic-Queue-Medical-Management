// File: RiwayatBlock.tsx
import {
  RefreshControl,
  View,
  Text,
  SectionList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, { useState, useRef } from 'react';
import LoadingIndicator from '../../loading-indicator';
import { FetchJadwal } from '@/components/ui/core/block/jadwal/hooks/use-jadwal';
import JadwalCard from '../../../fragments/custom-ui/card/jadwal-card';
import AntreanCardHeader from '../../../fragments/custom-ui/card/antrian-card';
import { SearchBar } from '../../../fragments/custom-ui/searchbar';
import { router, Stack } from 'expo-router';
import { SCREEN_OPTIONS } from '../../layout/nav';
import { ChevronLeft, Plus, PlusSignCircleFreeIcons } from '@hugeicons/core-free-icons';
import PendaftaranMode from '@/components/ui/fragments/custom-ui/dialog/pendaftaran-select-mode-dialog';

export default function JadwalBlock() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [showDialogOption, setDialogOption] = useState(false);
  const { isLoading, data, refetch } = FetchJadwal(searchQuery);
  const antrianDipanggil = data?.data?.dipanggil ?? [];
  const antrianMenunggu = data?.data?.menunggu ?? [];
  const antrianDilewati = data?.data?.dilewati ?? [];
  const antrianSelesai = data?.data?.selesai ?? [];
  const handlePendaftaran = () => {
    if (
      antrianDipanggil.length > 0 ||
      antrianMenunggu.length > 0 ||
      antrianDilewati.length > 0 ||
      antrianSelesai.length > 0
    ) {
      setDialogOption(true);
    } else {
      router.push('/daftar/pendaftaran_baru/first-step');
    }
  };

  const sectionsData = [
    { title: 'Jadwal Menanti', status: 'dipanggil', data: antrianDipanggil },
    { title: 'Jadwal Mendatang', status: 'menunggu', data: antrianMenunggu },
    { title: 'Jadwal Selesai', status: 'selesai', data: antrianSelesai },
    { title: 'Jadwal Dilewati', status: 'dilewati', data: antrianDilewati },
  ].filter((section) => section.data.length > 0);

  // === SETUP ANIMASI REALTIME ===
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  // Tambahan: Kita butuh ref untuk nyimpen posisi search bar saat ini
  const currentTranslateY = useRef(0);
  const searchBarHeight = 70; // Sesuaikan dengan tinggi search bar + padding lu

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    // Kalo lagi ngetik atau scroll mantul di atas (iOS bounce), simpen nilai terakhir trus stop
    if (isSearchFocused || currentScrollY < 0) {
      lastScrollY.current = currentScrollY;
      return;
    }

    // 1. Hitung seberapa jauh jari user nge-scroll dari posisi sebelumnya
    const diff = currentScrollY - lastScrollY.current;

    // 2. Hitung posisi baru (geser kebalikan dari arah scroll jari)
    let newTranslateY = currentTranslateY.current - diff;

    // 3. CLAMP (Batasi pergerakannya)
    // - Gak boleh lebih dari 0 (mentok bawah / muncul semua)
    // - Gak boleh kurang dari -searchBarHeight (mentok atas / sembunyi semua)
    newTranslateY = Math.max(-searchBarHeight, Math.min(0, newTranslateY));

    // 4. Langsung tembak nilainya SECARA REALTIME (tanpa animasi delay)
    translateY.setValue(newTranslateY);

    // 5. Update ref buat referensi scroll sepersekian detik selanjutnya
    currentTranslateY.current = newTranslateY;
    lastScrollY.current = currentScrollY;
  };

  if (isLoading && !searchQuery) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Stack.Screen
        options={SCREEN_OPTIONS({
          title: 'Jadwal Saya',
          leftIcon: ChevronLeft,
          rightAction: handlePendaftaran,
          rightIcon: Plus,
          className: 'px-5',
        })}
      />
      <PendaftaranMode showDialogOption={showDialogOption} setDialogOption={setDialogOption} />
      <View className="w-full flex-1 gap-7 overflow-hidden bg-background pt-0">
        <Animated.View
          style={{
            transform: [{ translateY }],
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backgroundColor: 'white', // Sesuaikan sama background aplikasi lu
          }}
          className="px-7 pb-4 pt-1">
          <SearchBar
            placeholder="Cari nomor antrian, dokter, poli..."
            onSearch={(query) => setSearchQuery(query)}
            onClear={() => setSearchQuery('')}
            // loading={isFetching && !isLoading}
            onFocus={() => {
              setIsSearchFocused(true);
              // Paksa search bar muncul full seketika kalo user maksa klik pas lagi setengah ketutup
              translateY.setValue(0);
              currentTranslateY.current = 0;
            }}
            onBlur={() => setIsSearchFocused(false)}
          />
        </Animated.View>

        <SectionList
          className="h-full w-full"
          contentContainerStyle={{
            paddingTop: searchBarHeight + 0,
            paddingBottom: 100,
            flexGrow: 1,
          }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          sections={sectionsData}
          keyExtractor={(item, index) => `antrian-${item.id || index}`}
          renderSectionHeader={({ section }) => (
            <AntreanCardHeader title={section.title} status={section.status} />
          )}
          renderItem={({ item }) => (
            <View className="px-8 pb-4">
              <JadwalCard Antrean={item} />
            </View>
          )}
          renderSectionFooter={() => <View className="h-6" />}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center pt-20">
              <Text className="font-figtree_regular text-base text-muted-foreground">
                {searchQuery ? 'Yah, antrian tidak ditemukan.' : 'Belum ada antrian'}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      </View>
    </>
  );
}
