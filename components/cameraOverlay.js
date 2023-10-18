import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import Svg, { Circle, Defs, Rect, Mask } from 'react-native-svg';

const CameraOverlay = () => {
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
            <Rect x={width * 0.1} y={height*0.15} height={height * 0.5} width={width * 0.8} rx={30} fill="#000" />
            <Circle x={width * 0.38} y={height*0.59} cx="50" cy="50" r="60" fill="#fff" />
          </Mask>
        </Defs>

        <Rect
          height={height}
          width={width}
          fill="rgba(255, 255, 255, 0.7)"
          mask="url(#mask)"
        />
      </Svg>
    </View>
  );
};

export default CameraOverlay;