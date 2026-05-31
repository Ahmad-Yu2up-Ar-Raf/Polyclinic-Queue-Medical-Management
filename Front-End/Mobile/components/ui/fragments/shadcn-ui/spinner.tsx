import { cn } from '@/lib/utils';
import { Icon } from './icon';
import { HugeiconsProps } from '@hugeicons/react-native';
import { Loading03Icon } from '@hugeicons/core-free-icons';
import { THEME } from '@/lib/theme';

type IconProps = {
  className?: string;
  size?: number | 'sm' | 'md' | 'lg';
  color?: string;
};

// Map size variants to pixel values
const sizeVariants: Record<string | number, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

function Spinner({ className, size = 'md', color }: IconProps) {
  // Convert size variant to pixel value if needed
  const pixelSize = typeof size === 'number' ? size : sizeVariants[size] || 20;

  return (
    <Icon
      color={color ?? THEME.light.primaryForeground}
      icon={Loading03Icon}
      size={pixelSize}
      aria-label="Loading"
      className={cn('animate-spin', className)}
    />
  );
}

export { Spinner };
