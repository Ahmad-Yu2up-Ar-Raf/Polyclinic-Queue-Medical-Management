import { View, Text } from 'react-native';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/components/ui/fragments/shadcn-ui/alert-dialog';
import { Icon } from '../../../../fragments/shadcn-ui/icon';
import { Warning } from '@hugeicons/core-free-icons';
import { THEME } from '@/lib/theme';

type componentProps = {
  showAlertOption: boolean;
  action: () => void;
  setAlertOption: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PendaftaranAlert({
  showAlertOption,
  setAlertOption,
  action,
}: componentProps) {
  return (
    <AlertDialog open={showAlertOption} onOpenChange={setAlertOption}>
      <AlertDialogContent>
        <AlertDialogHeader className="gap-3 text-center">
          <View className="m-auto flex size-12 content-center items-center justify-center rounded-2xl border border-border">
            <Icon icon={Warning} color={THEME.light.destructive} size={25} />
          </View>
          <View className="gap-2">
            <AlertDialogTitle className="text-center">Hapus perubahan?</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-sm">
              Anda memiliki data yang belum disimpan. Hapus?
            </AlertDialogDescription>
          </View>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onPress={action} variant={'destructive'}>
            <Text className="font-figtree_bold text-primary-foreground">Hapus</Text>
          </AlertDialogAction>
          <AlertDialogCancel>
            <Text>Batal</Text>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
