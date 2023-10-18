import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GradientIcon = (props) => {
  return (
    <MaskedView maskElement={<MaterialCommunityIcons {...props} />}>
      <LinearGradient
        colors={props.colors}
        start={props.start}
        end={props.end}
        //locations={props.locations}
        >
        <MaterialCommunityIcons
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