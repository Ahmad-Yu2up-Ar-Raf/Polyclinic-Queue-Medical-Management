import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/fragments/shadcn-ui/card';
import { Href, Link } from 'expo-router';

import { Text } from '../../fragments/shadcn-ui/text';
import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Spinner } from '../../fragments/shadcn-ui/spinner';
import { LogoAdaptive } from '../../fragments/svg/logo-app';

import { cn } from '@/lib/utils';
import FloatingComponent from '../../fragments/custom-ui/button/floating-button';
import { Button } from '../../fragments/shadcn-ui/button';

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
  const formTypeLabel = formType === 'register' ? 'Login' : 'Register';
  const formTypeLink: Href = formType === 'register' ? '/(auth)/login' : '/(auth)/register';

  return (
    <SafeAreaView
      edges={['bottom', 'top', 'left', 'right']}
      className="h-full content-start items-start justify-center p-10 sm:flex-1">
      <Card className="relative m-auto flex h-full w-full max-w-sm content-center justify-center gap-6 border-0 bg-transparent px-0 shadow-none sm:border-border">
        <CardHeader className="relative mb-1 flex w-full flex-col content-center items-center justify-start gap-3 p-0">
          <View className="size-fit scale-100">
            <LogoAdaptive className="relative m-auto size-full overflow-visible" />
          </View>
          <View>
            <CardTitle className="mb-0.5 text-center font-figtree_bold text-2xl text-foreground">
              {title}
            </CardTitle>
            <CardDescription className="text-center text-sm text-muted-foreground sm:text-left">
              {description}
            </CardDescription>
          </View>
        </CardHeader>

        <CardContent className={cn('h-fi t gap-4 p-0', className)}>
          <View className="gap-2.5">{props.children}</View>
          <Button haptic variant="default" onPress={onPress} disabled={loading}>
            <Text className="font-figtree_bold text-base text-primary-foreground">
              {textButton}
            </Text>
            {loading && <Spinner className="text-primary-foreground" />}
          </Button>
        </CardContent>
        <CardFooter className="relative flex w-full flex-col gap-6 overflow-hidden p-0">
          {formType && (
            <Text className="mt-2 text-start text-sm text-muted-foreground">
              {formType === 'register' ? `Sudah memiliki akun? ` : 'Belum memiliki akun? '}
              <Link href={formTypeLink} asChild>
                <Text className="text-primary underline underline-offset-4">{formTypeLabel}</Text>
              </Link>
            </Text>
          )}
        </CardFooter>
      </Card>

      {/* <FloatingComponent textButton={textButton} loading={loading} onPress={onPress} /> */}
    </SafeAreaView>
  );
};

export default AuthLayout;
