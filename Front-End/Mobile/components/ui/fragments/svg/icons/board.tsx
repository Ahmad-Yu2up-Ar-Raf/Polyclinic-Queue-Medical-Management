import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const HistoryIcon = ({ title, titleId, ...props }: SvgProps & SVGRProps) => {
  return (
    <Svg
      viewBox="0 0 32 32"
      width={24}
      height={24}
      fill={props.fill}
      aria-labelledby={titleId}
      {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <Path d="M29 11H3v13.009a5 5 0 0 0 5 5h16a5.001 5.001 0 0 0 5-5V11ZM9 24h2a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Zm6 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2Zm6 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2ZM9 20h2a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Zm6 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2Zm6 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2ZM9 16h2a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Zm6 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2Zm6 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2ZM10 3.009V6a1 1 0 0 1-2 0V3.009a5.004 5.004 0 0 0-3.536 1.464A5.004 5.004 0 0 0 3 8.009V9h26v-.991a5.004 5.004 0 0 0-1.464-3.536A5.004 5.004 0 0 0 24 3.009V6a1 1 0 0 1-2 0V3.009H10Z" />
    </Svg>
  );
};
export default HistoryIcon;
