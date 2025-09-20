import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SimpleHeader } from '../gerenal/header'
import LinearGradient from 'react-native-linear-gradient'
import { ButtonComp } from '../gerenal/buttonComp'
import { fontFamily } from '../../assets/utilities/font'
import { colors } from '../../assets/utilities'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { vtscale } from '../../assets/constants/pixelRatio'

interface detailProps {
    onPress: () => void
    ticketPress: () => void
    watchPress: () => void
    title: string | any
    image: string | any
    releaseDate: string | any
}

export const MovieDetailsComp = ({
    onPress,
    ticketPress,
    watchPress,
    title,
    releaseDate,
    image
}: detailProps) => {
    return (
        <View style={styles.imageView}>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }}
                style={styles.image}
                resizeMode='cover'

            >
                <SimpleHeader
                    title={"Watch"}
                    onPress={onPress}
                />
                <LinearGradient
                    style={styles.linear}
                    colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}>
                    <View style={styles.textView}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.date}>{`In Theaters ${releaseDate}`}</Text>
                        <ButtonComp
                            title='Get Tickets'
                            btnStyle={styles.btn}
                            onPress={ticketPress}
                        />
                        <ButtonComp
                            title='Watch Trailer'
                            btnStyle={styles.btnstyle}
                            icon={true}
                            iconName={'play'}
                            iconType='font-awesome'
                            onPress={watchPress}
                        />
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
    linear: {
        width: '100%',
        height: '79%',
    },
    imageView: {
        width: '100%',
        height: vtscale(470)
    },
    title: {
        fontFamily: fontFamily.appTextSemiBold,
        color: colors.white,
        fontSize: responsiveFontSize(2)
    },
    textView: {
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: "flex-end",
        height: "90%",
    },
    date: {
        fontFamily: fontFamily.appTextMedium,
        color: colors.white,
        fontSize: responsiveFontSize(2),
        marginTop: 10
    },
    btn: {
        width: responsiveWidth(70),
        marginTop: responsiveHeight(3),
    },
    btnstyle: {
        backgroundColor: "transparent",
        borderWidth: 1,
        width: responsiveWidth(70),
        borderColor: colors.btnColor,
        marginTop: responsiveHeight(2)
    }
})