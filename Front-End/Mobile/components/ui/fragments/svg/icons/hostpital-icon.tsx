import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const HostpitalIcon = ({ title, titleId, ...props }: SvgProps & SVGRProps) => (
  <Svg   viewBox="0 0 50.596 49.994" strokeWidth={1.5} width={22} height={22}  aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <Path d="M48.648 15.387H35.026V1.925A1.932 1.932 0 0 0 33.083 0H17.512a1.932 1.932 0 0 0-1.941 1.925v13.461H1.948C.873 15.387 0 16.245 0 17.307v15.385c0 1.062.873 1.916 1.947 1.916H15.57v13.463c0 1.06.867 1.923 1.941 1.923h15.571a1.931 1.931 0 0 0 1.941-1.923V34.608h13.622c1.075 0 1.948-.854 1.948-1.916V17.307c.003-1.062-.87-1.92-1.945-1.92z" />
  </Svg>
);
export default HostpitalIcon;
