import { View, Text } from 'react-native';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../fragments/shadcn-ui/card';
import OnboardingFifth from '../../../../fragments/svg/onboarding/onboarding-5';
import { Button } from '../../../../fragments/shadcn-ui/button';
import { Icon } from '../../../../fragments/shadcn-ui/icon';
import { THEME } from '@/lib/theme';
import { ChevronRight } from '@hugeicons/core-free-icons';
import { router } from 'expo-router';

type componentProps = {
  optionActive: boolean;
  setDialogOption: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CtaCard({ optionActive, setDialogOption }: componentProps) {
  const handlePendaftaran = () => {
    if (optionActive) {
      setDialogOption(true);
    } else {
      router.push('/daftar/pendaftaran_baru/first-step');
    }
  };

  return (
    <>
      <Card className="w-full overflow-hidden rounded-2xl bg-primary">
        <CardContent className="relative h-24 w-full gap-4 px-6">
          <CardHeader className="relative h-fit gap-1 self-start p-0">
            <CardTitle className="relative z-10 font-figtree_bold text-xl tracking-tighter text-primary-foreground">
              Daftar Online
            </CardTitle>
            <CardDescription className="font-figtree_medium text-primary-foreground/90">
              Ambil antrian dari rumah.
            </CardDescription>
          </CardHeader>
          <View className="w-fit">
            <Button
              onPress={handlePendaftaran}
              className="h-fit w-fit gap-1 self-start px-3"
              variant={'secondary'}>
              <Text className="font-figtree_extrabold text-xs tracking-tighter text-primary">
                Daftar Konsultasi
              </Text>
              <Icon color={THEME.light.primary} icon={ChevronRight} />
            </Button>
          </View>
        </CardContent>
        <View className="absolute bottom-[-50] right-[-60] z-0 size-52">
          <OnboardingFifth />
        </View>
      </Card>
    </>
  );
}
