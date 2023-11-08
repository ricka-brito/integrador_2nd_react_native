import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import Svg, { Circle, Defs, Rect, Mask } from 'react-native-svg';

const OverlayPayment = () => {
  const { height, width } = Dimensions.get('window');
  const circleRadius = width / 2.5;
  const viewBox = `0 0 ${width} ${height}`
  return (
    <View aspectRatio={1}>
      <Svg
        height={height}
        viewBox={viewBox}
      >
        <Defs>
          <Mask id="mask">
            <Rect height={height} width={width} fill="#fff" />
            <Rect x={width * 0.1} y={height*0.3} height={width * 0.8} width={width * 0.8} rx={15} fill="#666" />
          </Mask>
        </Defs>

        <Rect
          height={height}
          width={width}
          fill="rgba(0, 0, 0, 0.6)"
          mask="url(#mask)"
        />
      </Svg>
    </View>
  );
};

export default OverlayPayment;