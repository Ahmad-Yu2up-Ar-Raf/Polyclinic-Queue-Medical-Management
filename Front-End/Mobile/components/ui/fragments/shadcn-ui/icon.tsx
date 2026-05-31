import { TextClassContext } from '@/components/ui/fragments/shadcn-ui/text';
import { cn } from '@/lib/utils';
import { HugeiconsIcon, HugeiconsIconComponent, HugeiconsProps } from '@hugeicons/react-native';
import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import * as React from 'react';

function IconImpl({ ...props }: HugeiconsProps) {
  return <HugeiconsIcon {...props} />;
}

cssInterop(IconImpl, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: 'size',
      width: 'size',
    },
  },
});

function Icon({ className, size = 14, ...props }: HugeiconsProps) {
  const textClass = React.useContext(TextClassContext);
  return (
    <IconImpl className={cn('text-foreground', textClass, className)} size={size} {...props} />
  );
}

export { Icon };
