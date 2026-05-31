import { View, Text } from 'react-native';
import React from 'react';
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { Dokter, FetchDokterDetail } from '@/hooks/app/use-dokter';
import LoadingIndicator from '@/components/ui/core/loading-indicator';

import DokterDetailBlock from '@/components/ui/core/block/detail/dokter-detai-block';

export default function DokterDetail() {
  const { id } = useLocalSearchParams();

  const dokterId = Array.isArray(id) ? id[0] : id;

  const { isLoading, data, refetch, isRefetching } = FetchDokterDetail(dokterId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!data) {
    return <Redirect href={'/(tabs)/dokter'} />;
  }

  const dokter: Dokter = data.data;

  return (
    <>
      <DokterDetailBlock Dokter={dokter} />
    </>
  );
}
