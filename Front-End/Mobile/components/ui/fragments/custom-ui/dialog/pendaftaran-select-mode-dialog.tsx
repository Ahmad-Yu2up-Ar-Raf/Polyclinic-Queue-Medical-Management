import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/fragments/shadcn-ui/dialog';

import { Button } from '../../shadcn-ui/button';
import { Text } from '../../shadcn-ui/text';
import { View } from 'react-native';
import { Icon } from '../../shadcn-ui/icon';
import { Calendar, Calendar02FreeIcons, Ticket, User, UserPlus } from '@hugeicons/core-free-icons';
import { THEME } from '@/lib/theme';
import {  router } from 'expo-router';
import { IconSvgElement } from '@hugeicons/react-native';
import { useOnboardingStore } from '@/components/ui/core/block/pendaftaran/store/pendaftaran-store';

type componentProps = {
  showDialogOption: boolean;

  setDialogOption: React.Dispatch<React.SetStateAction<boolean>>;
};

type ModeLink = {
  Icon: IconSvgElement;
  title: string;
  deskripsi: string;
  iconColor: string;
  mode: string;
};

export default function PendaftaranMode({ showDialogOption, setDialogOption }: componentProps) {
  const MenuMode: ModeLink[] = [
    {
      Icon: User,
      title: 'Pendaftaran Lama',
      deskripsi: 'Pasien sudah terdaftar',
      mode: 'pendaftaran_lama',
      iconColor: THEME.light.primary,
    },
    {
      Icon: UserPlus,
      title: 'Pendaftaran Baru',
      deskripsi: 'Pasien belum terdaftar',
      mode: 'pendaftaran_baru',
      iconColor: 'hsl(140 69.3% 39.6%)',
    },
  ];

  const goPendaftaran = (mode:  string) => {
    // Navigasi ke file 'profile.tsx' sambil bawa data
    setDialogOption(false);

    useOnboardingStore.setState({
      mode: mode,
    });

    router.push({
      pathname: '/daftar/pendaftaran_baru/first-step',
      params: { mode: mode },
    });
  };

  return (
    <Dialog open={showDialogOption} onOpenChange={setDialogOption}>
      <DialogContent className="w-full gap-9">
        <DialogHeader className="gap-5 text-center">
          <View className="m-auto flex size-12 content-center items-center justify-center rounded-2xl border border-border">
            <Icon icon={Calendar02FreeIcons} color={THEME.light.primary} size={25} />
          </View>
          <View className="gap-2">
            <DialogTitle className="text-center">Jadwalkan Pendaftaran</DialogTitle>
            <DialogDescription className="text-center text-sm">
              Silakan pilih opsi pendaftaran di bawah ini
            </DialogDescription>
          </View>
        </DialogHeader>

        <View className="h-fit w-full gap-4">
          {MenuMode.map((item, i) => (
            <Button
              key={i}
              onPress={() => goPendaftaran(item.mode)}
              variant={'outline'}
              className="h-fit w-full gap-6 px-5 py-4">
              <View className="flex size-10 content-center items-center justify-center rounded-2xl border border-border">
                <Icon icon={item.Icon} color={item.iconColor} size={20} />
              </View>
              <View className="flex-1">
                <Text className="font-figtree_semibold">{item.title}</Text>
                <Text className="text-xs text-muted-foreground">{item.deskripsi}</Text>
              </View>
            </Button>
          ))}
        </View>
      </DialogContent>
    </Dialog>
  );
}
