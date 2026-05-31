import { IconSvgElement } from '@hugeicons/react-native';
import { LucideIcon } from 'lucide-react-native';

export interface MenuDetail {
  icon?: IconSvgElement;
  Label: string;
  onPress?: () => void;
  Value?: string | number;
  rigthComponent?: React.ReactNode;
}
