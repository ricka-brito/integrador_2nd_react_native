import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import COLORS from '../constants/colors';

const GradientIcon = (props) => {
  return (
    <MaskedView maskElement={<AntDesign {...props} />}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        //locations={props.locations}
        >
        <AntDesign
          {...props}
          style={{
            opacity: 0,
          }}
        />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientIcon;