import { View, Text } from 'react-native';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../shadcn-ui/card';
import OnboardingFifth from '../../svg/onboarding/onboarding-5';
import { Button } from '../../shadcn-ui/button';
import { Link } from 'expo-router';
import { Icon } from '../../shadcn-ui/icon';
import { THEME } from '@/lib/theme';
import { ChevronRight } from '@hugeicons/core-free-icons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
type componentProps = {
  optionActive: boolean;
};

export default function CtaCard({ optionActive }: componentProps) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: 4,
  };
  return (
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
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-fit w-fit gap-1 self-start px-3" variant={'secondary'}>
                <Text className="font-figtree_extrabold text-xs tracking-tighter text-primary">
                  Daftar Antrian
                </Text>
                <Icon color={THEME.light.primary} icon={ChevronRight} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              insets={contentInsets}
              sideOffset={2}
              className="w-40"
              align="start">
              <DropdownMenuLabel className="sr-only">My Account</DropdownMenuLabel>

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Text className="font-figtree_medium text-xs">Pendaftaran Baru</Text>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Text className="font-figtree_medium text-xs">Pendaftaran Lama</Text>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <Link asChild href={'/daftar/stepper/first-step'}>
            <Button className="h-fit w-fit gap-1 self-start px-3" variant={'secondary'}>
              <Text className="font-figtree_extrabold text-xs tracking-tighter text-primary">
                Daftar Konsultasi
              </Text>
              <Icon color={THEME.light.primary} icon={ChevronRight} />
            </Button>
          </Link>
        </View>
      </CardContent>
      <View className="absolute bottom-[-50] right-[-60] z-0 size-52">
        <OnboardingFifth />
      </View>
    </Card>
  );
}
