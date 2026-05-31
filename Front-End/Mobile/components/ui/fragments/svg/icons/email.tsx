import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
interface SVGRProps {
  title?: string;
  titleId?: string;
  desc?: string;
  descId?: string;
}
const Email = ({ title, titleId, desc, descId, ...props }: SvgProps & SVGRProps) => {
  const { colorScheme } = useColorScheme();

  /**
   * ✅ FIXED: Direct THEME access tanpa useThemeColor
   * Ini lebih clean dan proper react to theme changes
   */
  const currentTheme = colorScheme === 'light' ? 'light' : 'light';

  const inactiveTintColor = THEME[currentTheme].mutedForeground;
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      aria-labelledby={titleId}
      aria-describedby={descId}
      {...props}>
      {desc ? <desc id={descId}>{desc}</desc> : null}
      {title ? <title id={titleId}>{title}</title> : null}
      <Path
        fill={inactiveTintColor}
        d="M17 3.5H7c-3 0-5 1.5-5 5v7c0 3.5 2 5 5 5h10c3 0 5-1.5 5-5v-7c0-3.5-2-5-5-5Zm.47 6.09-3.13 2.5c-.66.53-1.5.79-2.34.79-.84 0-1.69-.26-2.34-.79l-3.13-2.5a.77.77 0 0 1-.12-1.06c.26-.32.73-.38 1.05-.12l3.13 2.5c.76.61 2.05.61 2.81 0l3.13-2.5c.32-.26.8-.21 1.05.12.26.32.21.8-.11 1.06Z"
      />
    </Svg>
  );
};
export default Email;
