import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FetchAntreanDetail } from '@/hooks/app/use-antrian';
import LoadingIndicator from '@/components/ui/core/loading-indicator';
import SuccesBlock from '@/components/ui/core/block/detail/succes-block';

export default function DetailAntreanPage() {
  const { id } = useLocalSearchParams();

  const antrianId = Array.isArray(id) ? id[0] : id;

  const { isLoading, data, refetch, isRefetching } = FetchAntreanDetail(antrianId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return <SuccesBlock Antrean={data?.data!} />;
}
