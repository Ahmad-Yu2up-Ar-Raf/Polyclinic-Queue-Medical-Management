import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/fragments/shadcn-ui/card';
import { Link } from 'expo-router';

import { Text } from '../../fragments/shadcn-ui/text';
import { View } from 'react-native';

import { Button } from '../../fragments/shadcn-ui/button';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  KeyboardState,
} from 'react-native-reanimated';
import { Spinner } from '../../fragments/shadcn-ui/spinner';
import { LogoAdaptive } from '../../fragments/svg/logo-app';
import { Separator } from '../../fragments/shadcn-ui/separator';
import { SocialConnections } from '../feauture/auth/social-connection';

type AuthLayoutProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  quote?: string;

  loading?: boolean;
  className?: string;
  numberOfIterations?: number;
  formType?: 'login' | 'register' | undefined;
  signInGoogleButton?: boolean;
  onPress: () => void;
  textButton?: string;
};

const AuthLayout = ({
  formType,

  numberOfIterations,
  className,
  loading = false,
  signInGoogleButton = true,
  title = `Welcome Back!`,
  quote = `Your ideas are not just talk — make them happen.`,
  description = `The journey is about to begin`,
  onPress,
  textButton = 'Login',
  ...props
}: AuthLayoutProps) => {
  const insets = useSafeAreaInsets();

  const keyboard = useAnimatedKeyboard();

  const bottomWhenClosed = insets.bottom > 0 ? insets.bottom : 12;

  const bottomWhenOpen = 8;

  const animatedButtonStyle = useAnimatedStyle(() => {
    const isKeyboardOpen = keyboard.height.value > 0;
    return {
      bottom: isKeyboardOpen ? keyboard.height.value + bottomWhenOpen : bottomWhenClosed,
    };
  });

  const formTypeLabel = formType == 'register' ? 'Login' : 'Register';
  const formTypeLink = formType == 'register' ? '/' : '/';

  return (
    <SafeAreaView
      edges={['bottom', 'top', 'left', 'right']}
      className="h-full content-start items-start justify-start bg-card p-7 sm:flex-1">
      <Card className="relative m-auto flex h-full w-full max-w-sm content-start justify-start gap-5 border-0 bg-transparent px-0 shadow-none sm:border-border">
        <CardHeader className="relative mb-1 flex w-full flex-col content-start items-center justify-start gap-6 p-0">
          <View className="size-fit scale-110">
            <LogoAdaptive className="relative m-auto size-full overflow-visible" />
          </View>
          <View>
            <CardTitle className="font-cinzel_bold mb-0.5 text-center text-2xl">{title}</CardTitle>
            <CardDescription className="text-center text-base text-muted-foreground sm:text-left">
              {description}
            </CardDescription>
          </View>
        </CardHeader>

        <CardContent className="mb-0 h-fit gap-6 p-0">
          <View className="gap-2.5">{props.children}</View>
        </CardContent>
        {signInGoogleButton && (
          <CardFooter className="relative flex w-full flex-col gap-5 overflow-hidden p-0">
            <View className="flex-row items-center">
              <Separator className="flex-1" />
              <Text className="px-4 text-sm text-muted-foreground">atau lanjutkan dengan</Text>
              <Separator className="flex-1" />
            </View>
            <SocialConnections />
            {formType && (
              <Text className="mt-2 text-start text-sm text-muted-foreground">
                {formType == 'register' ? `Sudah memiliki akun? ` : 'Belum memiliki akun? '}
                <Link href={formTypeLink} className="text-primary underline underline-offset-4">
                  {formTypeLabel}
                </Link>
              </Text>
            )}
          </CardFooter>
        )}
      </Card>

      <Animated.View className="absolute left-0 right-0 px-5" style={animatedButtonStyle}>
        <Button variant="default" size={'lg'} onPress={onPress} disabled={loading}>
          <Text className="font-figtree_semibold text-lg text-primary-foreground">
            {textButton}
          </Text>
          {loading && <Spinner className="text-primary-foreground" />}
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
};

export default AuthLayout;
