import { IconSvgElement } from '@hugeicons/react-native';

export interface MenuDetail {
  icon?: IconSvgElement;
  Label: string;
  onPress?: () => void;
  Value?: string | number;
  rigthComponent?: React.ReactNode;
}
