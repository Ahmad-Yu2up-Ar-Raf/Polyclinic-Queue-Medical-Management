import {
  RefreshControl,
  View,
  Text,
  SectionList,
  FlatList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { Dokter, FetchDokter } from '@/hooks/app/use-dokter';

import LoadingIndicator from '../loading-indicator';
import DokterCard from '../../fragments/custom-ui/card/dokter-card';
import { SearchBar } from '../../fragments/custom-ui/searchbar';
import { Icon } from '../../fragments/shadcn-ui/icon';
import { Sad } from '@hugeicons/core-free-icons';
import { THEME } from '@/lib/theme';

export default function DokterBlock() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const { isLoading, data, refetch, isRefetching, isFetching } = FetchDokter(searchQuery);

  // === ANIMASI SCROLL LOGIC ===
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const currentTranslateY = useRef(0);
  const searchBarHeight = 80;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (isSearchFocused || currentScrollY < 0) return;
    const diff = currentScrollY - lastScrollY.current;
    let newTranslateY = Math.max(-searchBarHeight, Math.min(0, currentTranslateY.current - diff));
    translateY.setValue(newTranslateY);
    currentTranslateY.current = newTranslateY;
    lastScrollY.current = currentScrollY;
  };

  const sections = (data?.data ?? []).map((poli) => ({
    title: poli.nama,
    data: [poli.dokter],
  }));

  if (isLoading && !searchQuery) return <LoadingIndicator />;

  return (
    <View className="w-full flex-1 gap-7 overflow-hidden bg-background pt-0">
      {/* 1. Header Animasi */}
      <Animated.View
        style={{
          transform: [{ translateY }],
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'white',
        }}
        className="px-7 pb-4 pt-1">
        <SearchBar
          placeholder="Cari dokter, spesialisasi..."
          onSearch={(query) => setSearchQuery(query)}
          onClear={() => setSearchQuery('')}
          loading={isFetching}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </Animated.View>

      <SectionList
        sections={sections}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: searchBarHeight - 4, paddingBottom: 100 }}
        keyExtractor={(item, index) => `section-${index}`}
        renderSectionHeader={({ section }) => (
          <Text className="px-9 py-4 font-figtree_bold text-xl text-accent-foreground/70">
            {section.title}
          </Text>
        )}
        renderItem={({ item: dokterList }) => (
          <View className="mb-6">
            <FlatList
              horizontal
              data={dokterList as Dokter[]}
              keyExtractor={(item) => `dokter-${item.id}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 28, gap: 10 }}
              renderItem={({ item }) => (
                <View style={{ width: 160 }}>
                  <DokterCard Dokter={item} />
                </View>
              )}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            progressViewOffset={searchBarHeight}
          />
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center pt-20">
            {isFetching ? (
              <LoadingIndicator />
            ) : (
              <View className="items-center">
                <Icon icon={Sad} size={48} color={THEME.dark.mutedForeground} />
                <Text className="mt-4 text-center text-base text-muted-foreground">
                  Dokter tidak ditemukan.
                </Text>
              </View>
            )}
          </View>
        }
      />
    </View>
  );
}
