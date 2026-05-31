import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';
import { Text } from '@/components/ui/fragments/shadcn-ui/text';

import { Button } from '../../fragments/shadcn-ui/button';
import { LogoAdaptive } from '../../fragments/svg/logo-app';

import { Icon } from '../../fragments/shadcn-ui/icon';

import { router } from 'expo-router';

import { cn } from '@/lib/utils';
import Animated, { type SharedValue } from 'react-native-reanimated';

import { IconSvgElement } from '@hugeicons/react-native';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export interface ScreenOptionsParams {
  title?: string;
  transparent?: boolean;
  leftIcon?: IconSvgElement;
  leftAction?: () => void;
  rightIcon?: IconSvgElement;
  id?: number;
  RigthComponent?: React.ReactNode | undefined;
  rightAction?: () => void;
  className?: string;
  scrollAnimatedPosition?: SharedValue<number>;
  scrollTriggerPoint?: number;
  scrollAnimationType?: 'fade' | 'slide' | 'scale';
  children?: React.ReactNode;
}

interface HeaderComponentProps extends ScreenOptionsParams {}

function HeaderComponent({
  title,
  transparent = true,
  RigthComponent,
  leftIcon: LeftIcon,
  leftAction,
  children,
  rightIcon: RightIcon,
  rightAction,
  className,
  scrollAnimatedPosition,
  scrollTriggerPoint = 100,
  scrollAnimationType = 'slide',
}: HeaderComponentProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const currentTheme = colorScheme ?? 'light';

  const handleLeave = () => {
    router.back();
  };

  const bgColor = transparent ? 'transparent' : THEME[currentTheme].background;

  const animatedTitleStyle = useScrollAnimation(
    scrollAnimatedPosition,
    scrollTriggerPoint,
    scrollAnimationType
  );
  return (
    <>
      <View
        style={{ paddingTop: insets.top + 10, backgroundColor: bgColor }}
        className={cn('flex-row items-center justify-between px-6 pb-3', className)}>
        {LeftIcon && (
          <View className="z-50 w-10 items-start" pointerEvents="box-none">
            <Button
              variant={'ghost'}
              onPress={leftAction ?? handleLeave}
              size="icon"
              className="size-12 rounded-full">
              <Icon icon={LeftIcon} className="size-6" />
            </Button>
          </View>
        )}
        {title || scrollAnimatedPosition ? (
          <View
            className="absolute inset-0 top-1/2 -translate-y-4 transform items-center justify-center px-5 pb-0"
            style={{ paddingTop: insets.top + 5 }}>
            <Animated.View
              style={animatedTitleStyle}
              className="flex-1 items-center justify-center">
              <Text
                variant="h4"
                className="line-clamp-1 text-center font-figtree_bold text-xl tracking-tighter text-accent-foreground/70"
                numberOfLines={1}>
                {title}
              </Text>
            </Animated.View>
          </View>
        ) : title ? (
          <View
            className="absolute inset-0 top-1/2 -translate-y-4 transform items-center justify-center px-5 pb-0"
            style={{ paddingTop: insets.top + 5 }}>
            <View className="flex-1 items-center justify-center">
              <Text
                variant="h4"
                className="line-clamp-1 text-center font-figtree_bold text-xl tracking-tighter text-accent-foreground/70"
                numberOfLines={1}>
                {title}
              </Text>
            </View>
          </View>
        ) : (
          <View className="items-center justify-center gap-7 text-center">
            <View className="w-fit flex-row items-center gap-1">
              <View className="size-12 scale-[.70]">
                <LogoAdaptive />
              </View>

              <Text
                variant="h3"
                className="text-center font-figtree_bold text-2xl tracking-tighter text-primary">
                LiveUp
              </Text>
            </View>
          </View>
        )}

        <View className="z-50 items-end" pointerEvents="box-none">
          {RigthComponent ? (
            RigthComponent
          ) : RightIcon ? (
            <Button
              variant={'ghost'}
              onPress={rightAction ?? handleLeave}
              size="icon"
              className={cn(`size-10 rounded-full`)}>
              <Icon icon={RightIcon} className="size-5" />
            </Button>
          ) : null}
        </View>
      </View>

      {children}
    </>
  );
}

export const SCREEN_OPTIONS = ({
  title,
  transparent = true,
  leftIcon,
  leftAction,
  rightIcon,
  RigthComponent,
  rightAction,
  className,
  children,
  scrollAnimatedPosition,
  scrollTriggerPoint,
  scrollAnimationType,
}: ScreenOptionsParams) => ({
  headerShown: true,

  header: () => (
    <HeaderComponent
      title={title}
      className={className}
      transparent={transparent}
      leftIcon={leftIcon}
      leftAction={leftAction}
      rightIcon={rightIcon}
      RigthComponent={RigthComponent}
      children={children}
      rightAction={rightAction}
      scrollAnimatedPosition={scrollAnimatedPosition}
      scrollTriggerPoint={scrollTriggerPoint}
      scrollAnimationType={scrollAnimationType}
    />
  ),
});
