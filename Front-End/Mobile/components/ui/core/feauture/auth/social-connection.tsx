import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, Platform, type ImageSourcePropType } from 'react-native';

const SOCIAL_CONNECTION_STRATEGIES: {
  source: ImageSourcePropType;
  useTint?: boolean;
}[] = [
  {
    source: { uri: 'https://img.clerk.com/static/apple.png?width=160' },
    useTint: true,
  },
  {
    source: { uri: 'https://img.clerk.com/static/google.png?width=160' },
    useTint: false,
  },
  {
    source: { uri: 'https://img.clerk.com/static/github.png?width=160' },
    useTint: true,
  },
];

export function SocialConnections() {
  const { colorScheme } = useColorScheme();

  return (
    <View className="relative flex flex-row gap-2 overflow-hidden sm:gap-3">
      {SOCIAL_CONNECTION_STRATEGIES.map((strategy, i) => {
        return (
          <Button key={i} variant="outline" size="lg" className="w-full flex-1 justify-center">
            <Image
              className={cn('size-5', strategy.useTint && Platform.select({ web: 'dark:invert' }))}
              tintColor={Platform.select({
                native: strategy.useTint ? (colorScheme === 'dark' ? 'white' : 'black') : undefined,
              })}
              source={strategy.source}
            />
          </Button>
        );
      })}
    </View>
  );
}
