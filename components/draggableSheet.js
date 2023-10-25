import React, { useRef } from 'react'; // Import useRef from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native';
import { WINDOW_HEIGHT } from '../constants/utils';
import { PanResponder } from 'react-native';

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.3;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50 ;

const DraggableSheet = ({children}) => {
  const animatedValue = React.useRef(new Animated.Value(0)); // Use React.useRef
  const lastGestureDy = React.useRef(0); // Use React.useRef
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.current.setOffset(lastGestureDy.current); // Use .current to access the ref
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.current.setValue(gesture.dy); // Use .current to access the ref
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.current.flattenOffset(); // Use .current to access the ref
        if (gesture.dy > 0) {
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    })
  );

  const springAnimation = (direction) => {
    lastGestureDy.current = direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue.current, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.current.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.current.panHandlers}>
          <View style={styles.dragHandle} />
        </View>
        {children}
      </Animated.View>
    </View>
  );
};

export default DraggableSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  bottomSheet: {
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    zIndex: 12,
    backgroundColor: '#482128',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 2,
  },
  dragHandle: {
    width: 100,
    height: 4,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  draggableArea: {
    width: "100%",
    height: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
