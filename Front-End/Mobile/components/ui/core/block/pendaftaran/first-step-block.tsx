import { View } from 'react-native';
import React, { useState } from 'react';

import { Text } from '../../../fragments/shadcn-ui/text';
import { Separator } from '../../../fragments/shadcn-ui/separator';

import { Wrapper } from '../../layout/wrapper';
import ProgresHeader from '../../layout/progress-header';
import FloatingComponent from '@/components/ui/fragments/custom-ui/button/floating-button';
import { router, Stack } from 'expo-router';
import { SCREEN_OPTIONS } from '../../layout/nav';
import { useScrollTracker } from '@/hooks/use-scroll-tracker';
import { ChevronLeft, MedicalMaskFreeIcons } from '@hugeicons/core-free-icons';

import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import { Spinner } from '@/components/ui/fragments/shadcn-ui/spinner';
import { Header } from '@/components/ui/fragments/custom-ui/typography/header';
import {
  setReset,
  useOnboardingStore,
} from '@/components/ui/core/block/pendaftaran/store/pendaftaran-store';
import PendaftaranAlert from './components/hapus-alert';
import FirstStepForm from './components/form/first-step-form';
import { useLocalSearchParams } from 'expo-router';
import { FetchPasienSelect } from './hooks/use-pasien-select';

import { SelectType } from './types/select-type';
import LoadingIndicator from '../../loading-indicator';
import SelectPasienForm from './components/form/select-pasien-form';

export default function FirstStep() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [submitForm, setSubmitForm] = useState<() => void>(() => () => {});
  const { mode } = useLocalSearchParams();
  console.log(mode);
  const { scrollPosition, handleScroll } = useScrollTracker();
  const [showAlertOption, setAlertOption] = useState(false);
  const { ...storeState } = useOnboardingStore();
  const { isLoading, data } = FetchPasienSelect();
  const pasien: SelectType[] = data?.data ?? [];
  const handleLeave = () => {
    if (isFormDirty || storeState.nama || storeState.nik || storeState.pasien_id) {
      setAlertOption(true);
    } else {
      router.push('/(tabs)');
    }
  };

  const actionLeave = () => {
    if (storeState.nama || storeState.nik || storeState.pasien_id) {
      setReset();
    }
    router.push('/(tabs)');
  };

  return (
    <>
      <PendaftaranAlert
        action={actionLeave}
        showAlertOption={showAlertOption}
        setAlertOption={setAlertOption}
      />
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
            {mode == 'pendaftaran_lama' ? (
              <>
                {isLoading ? (
                  <LoadingIndicator />
                ) : (
                  <SelectPasienForm
                    onSubmitRef={(fn) => setSubmitForm(() => fn)}
                    onLoadingChange={(loading) => setIsSubmitting(loading)}
                    onDirtyChange={(dirty) => setIsFormDirty(dirty)}
                    pasien={pasien}
                    // 🔥 3. Tangkep data dirty-nya di sini
                  />
                )}
              </>
            ) : (
              <FirstStepForm
                onSubmitRef={(fn) => setSubmitForm(() => fn)}
                onLoadingChange={(loading) => setIsSubmitting(loading)}
                onDirtyChange={(dirty) => setIsFormDirty(dirty)}
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
