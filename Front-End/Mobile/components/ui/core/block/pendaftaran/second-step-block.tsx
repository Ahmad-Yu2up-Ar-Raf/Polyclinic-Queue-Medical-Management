import { View } from 'react-native';
import React, { useState } from 'react';

import { Text } from '../../../fragments/shadcn-ui/text';
import { Separator } from '../../../fragments/shadcn-ui/separator';

import { Wrapper } from '../../layout/wrapper';
import ProgresHeader from '../../layout/progress-header';
import FloatingComponent from '@/components/ui/fragments/custom-ui/button/floating-button';
import { Redirect, router, Stack } from 'expo-router';
import { SCREEN_OPTIONS } from '../../layout/nav';
import { useScrollTracker } from '@/hooks/use-scroll-tracker';
import { HospitalLocationIcon, ChevronLeft, Stethoscope } from '@hugeicons/core-free-icons';
import { FetchPolisSelect } from '@/components/ui/core/block/pendaftaran/hooks/use-polis-select';
import LoadingIndicator from '../../loading-indicator';
import SecondStepForm from '@/components/ui/core/block/pendaftaran/components/form/second-step-form';
import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import { Spinner } from '@/components/ui/fragments/shadcn-ui/spinner';
import { Header } from '@/components/ui/fragments/custom-ui/typography/header';
import { useOnboardingStore } from '@/components/ui/core/block/pendaftaran/store/pendaftaran-store';
import { SelectType } from './types/select-type';
export default function SecondStepBlock() {
  const { scrollPosition, handleScroll } = useScrollTracker();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitForm, setSubmitForm] = useState<() => void>(() => () => {});
  const { setData, ...storeState } = useOnboardingStore();
  const { isLoading, data } = FetchPolisSelect();
  const polis: SelectType[] = data?.data ?? [];
  if (!storeState.nama || !storeState.nik) {
    return <Redirect href="/daftar/pendaftaran_baru/first-step" />;
  }
  const handleLeave = () => {
    router.replace('/daftar/pendaftaran_baru/first-step');
  };

  return (
    <>
      <Stack.Screen
        options={SCREEN_OPTIONS({
          leftIcon: ChevronLeft,
          leftAction: handleLeave,
          className: 'px-5',
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
            <Header title="Sesuaikan Layanan" icon={Stethoscope} />
            <Separator className="mb-4 mt-7" />
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <SecondStepForm
                polis={polis}
                onSubmitRef={(fn) => setSubmitForm(() => fn)}
                onLoadingChange={(loading) => setIsSubmitting(loading)}
              />
            )}
          </View>
        </Wrapper>
        {!isLoading && (
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
        )}
      </View>
    </>
  );
}
