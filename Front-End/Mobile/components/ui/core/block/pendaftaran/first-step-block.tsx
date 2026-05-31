import { View } from 'react-native';
import React, { useState } from 'react';

import FirstStepForm from '../../feauture/form/app/pendaftaran/first-step-form';

import { Text } from '../../../fragments/shadcn-ui/text';
import { Separator } from '../../../fragments/shadcn-ui/separator';

import { Wrapper } from '../../layout/wrapper';
import ProgresHeader from '../../layout/progress-header';
import FloatingComponent from '@/components/ui/fragments/custom-ui/button/floating-button';
import { router, Stack } from 'expo-router';
import { SCREEN_OPTIONS } from '../../layout/nav';
import { useScrollTracker } from '@/hooks/useScrollTracker';
import { ChevronLeft, MedicalMaskFreeIcons, User } from '@hugeicons/core-free-icons';
import { setReset } from '@/store/pendaftaran-store';
import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import { Spinner } from '@/components/ui/fragments/shadcn-ui/spinner';
import { Header } from '@/components/ui/fragments/custom-ui/typography/header';

export default function FirstStep() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitForm, setSubmitForm] = useState<() => void>(() => () => {});
  const { scrollPosition, handleScroll } = useScrollTracker();

  const handleLeave = () => {
    router.push('/(tabs)');
    setReset();
  };

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
            <Header title="Daftar Konsultasi" icon={MedicalMaskFreeIcons} />
            <Separator className="mb-4 mt-7" />
            <FirstStepForm
              onSubmitRef={(fn) => setSubmitForm(() => fn)}
              onLoadingChange={(loading) => setIsSubmitting(loading)}
            />
          </View>
        </Wrapper>
        <FloatingComponent>
          <Button
            className="w-full"
            variant="default"
            size={'lg'}
            onPress={submitForm}
            disabled={isSubmitting}>
            <Text className="font-figtree_bold text-lg text-primary-foreground">Berikutnya</Text>
            {isSubmitting && <Spinner className="text-primary-foreground" />}
          </Button>
        </FloatingComponent>
      </View>
    </>
  );
}
