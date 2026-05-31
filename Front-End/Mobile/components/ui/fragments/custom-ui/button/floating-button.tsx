import { View, Text } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  KeyboardState,
} from 'react-native-reanimated';
import { Button } from '../../shadcn-ui/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner } from '../../shadcn-ui/spinner';
import { cn } from '@/lib/utils';
import { THEME } from '@/lib/theme';

type componentsProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FloatingComponent({ children, className }: componentsProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
        paddingTop: 11,
        paddingHorizontal: 37,
        backgroundColor: THEME.light.background,

        flexDirection: 'row',
        gap: 9,
        zIndex: 100,
        width: '100%',
      }}
      className={cn('w-full', className)}>
      {children}
    </View>
  );
}
