import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'MontserratAlternates-SemiBold': require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
        'MontserratAlternates-thin': require('../assets/fonts/MontserratAlternates-Thin.ttf'),
        'MontserratAlternates-regular': require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  });