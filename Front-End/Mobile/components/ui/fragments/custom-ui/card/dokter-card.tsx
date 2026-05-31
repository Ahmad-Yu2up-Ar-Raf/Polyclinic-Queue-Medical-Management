import { View, Text, Pressable } from 'react-native';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../shadcn-ui/card';
import { Image } from '../../shadcn-ui/image';
import { batasiKata } from '@/hooks/use-word';
import { Badge } from '../../shadcn-ui/badge';
import { cn } from '@/lib/utils';
import { router } from 'expo-router';
import { Dokter } from '@/hooks/app/use-dokter';

type componentProps = {
  Dokter: Dokter;
  className?: string;
};

export default function DokterCard({ Dokter, className }: componentProps) {
  const poli = Dokter.poli;
  const Nama = batasiKata(Dokter.nama, 2);

  function navigateToDokter(dokterId: number) {
    router.push({ pathname: '/dokter/[id]', params: { id: dokterId } });
  }
  return (
    <Card className={cn('h-fit w-full border-0 p-1 pb-3', className)}>
      <Pressable onPress={() => navigateToDokter(Dokter.id)}>
        <CardContent className="flex w-full flex-col gap-4 p-0">
          <View className="h-40 w-full overflow-hidden rounded-2xl border border-border">
            <Image source={{ uri: Dokter.foto }} width="100%" height="100%" contentFit="cover" />
          </View>
          <View className="h-16 flex-1 gap-3">
            <CardHeader className="gap-5 p-0 px-1">
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
            </CardHeader>
            <CardFooter className="flex-col items-start justify-start gap-1 p-0">
              <CardTitle className="line-clamp-1 px-2 font-figtree_bold text-base">
                {Nama}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {`   ${Dokter.spesialisasi} `}
              </CardDescription>
            </CardFooter>
          </View>
        </CardContent>
      </Pressable>
    </Card>
  );
}
