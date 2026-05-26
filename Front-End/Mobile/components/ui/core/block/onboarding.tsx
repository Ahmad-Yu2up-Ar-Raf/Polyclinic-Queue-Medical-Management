import { Onboarding, useOnboarding } from '@/components/ui/fragments/shadcn-ui/onboarding';

import { Redirect } from 'expo-router';
import Onboarding1 from '@/components/ui/fragments/svg/onboarding/onboarding-1';
import Onboarding2 from '@/components/ui/fragments/svg/onboarding/onboarding-2';
import Onboarding3 from '@/components/ui/fragments/svg/onboarding/onboarding-3';
import Onboarding4 from '@/components/ui/fragments/svg/onboarding/onboarding-4';
import { View } from 'react-native';
import React from 'react';
export const OnboardingPresets = {
  welcome: [
    {
      id: 'welcome',
      title: 'Selamat Datang di LiveUp',
      description: 'Solusi cerdas untuk berobat lebih nyaman tanpa perlu bosan menunggu di klinik.',
      icon: (
        <View className="flex h-fit scale-[.55] content-center items-center justify-start overflow-hidden">
          <Onboarding1 className=" " />
        </View>
      ),
    },
    {
      id: 'features',
      title: 'Ambil Antrean dari Rumah',
      description:
        'Pilih poli, tentukan dokter pilihanmu, dan dapatkan nomor antrean dalam hitungan detik.',
      icon: (
        <View className="flex h-fit scale-[.55] content-center items-center justify-start overflow-hidden">
          <Onboarding2 className=" " />
        </View>
      ),
    },
    {
      id: 'personalize',
      title: 'Pantau Secara Real-time',
      description: 'Lacak nomor giliranmu yang sedang dipanggil langsung dari genggaman HP.',
      icon: (
        <View className="flex h-fit scale-[.50] content-center items-center justify-start overflow-hidden">
          <Onboarding3 className=" " />
        </View>
      ),
    },
    {
      id: 'ready',
      title: 'Siap untuk Berobat',
      description:
        'Kesehatanmu adalah prioritas kami. Yuk, mulai pengalaman berobat yang lebih mudah sekarang!',
      icon: (
        <View className="flex h-fit scale-[.55] content-center items-center justify-start overflow-hidden">
          <Onboarding4 className=" " />
        </View>
      ),
    },
  ],
};
export function OnboardingDemo() {
  const { hasCompletedOnboarding, completeOnboarding, skipOnboarding } = useOnboarding();

  if (hasCompletedOnboarding) {
    return <Redirect href={'/(auth)/login'} />;
  }

  return (
    <>
      <Onboarding
        steps={OnboardingPresets.welcome}
        onComplete={completeOnboarding}
        onSkip={skipOnboarding}
        showSkip={true}
        showProgress={true}
        swipeEnabled={true}
        primaryButtonText="Get Started"
        skipButtonText="Skip"
        nextButtonText="Next"
        backButtonText="Back"
      />
      {/* <View className="absolute z-10 h-full w-full bg-card" /> */}
    </>
  );
}
