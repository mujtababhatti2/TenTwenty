import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale, vtscale } from '../../assets/constants/pixelRatio'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { colors } from '../../assets/utilities'
import { fontFamily } from '../../assets/utilities/font'

interface MovieCompProps {
  image?: string | any | undefined
  title?: string | any | undefined
  onPress?:()=> void
}

export const MovieListComp = ({
  image,
  title,
  onPress
}: MovieCompProps) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity activeOpacity={0.2} onPress={onPress}>
        <ImageBackground
          source={image}
          style={styles.backgroundImage}
          borderRadius={scale(10)}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
            style={styles.linear}>
              <Text style={styles.title}>{title}</Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: scale(175),
    borderRadius: scale(10),
    justifyContent:"flex-end"
  },
  mainView: {
    marginVertical: vtscale(10)
  },
  linear:{
    width:'100%',
    height: vtscale(70),
    borderBottomRightRadius: scale(10),
    borderBottomLeftRadius: scale(10) ,
    justifyContent:"center"
  },
  title:{
    fontSize: responsiveFontSize(2),
    color: colors.white,
    width: '90%',
    alignSelf:"center",
    fontFamily: fontFamily.appTextSemiBold
  }
})