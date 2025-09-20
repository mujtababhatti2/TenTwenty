import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import FastImage from 'react-native-fast-image'
import { scale } from '../../assets/constants/pixelRatio'
import { Icon } from 'react-native-elements'
import { fontFamily } from '../../assets/utilities/font'

interface props {
    image: string | any
    title: string | any
    genre: string | any
}

const SearchComp = ({
    image,
    title,
    genre
}: props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.innerView}>
                <View style={styles.fdView}>
                    <FastImage
                        style={styles.fastImage}
                        source={image}
                    />
                    <View style={styles.textView}>
                        <Text numberOfLines={1} style={styles.title}>{title}</Text>
                        <Text numberOfLines={1} style={styles.title1}>{genre}</Text>
                    </View>
                    <Icon
                        name="dots-three-horizontal"
                        type='entypo'
                        size={responsiveFontSize(3)}
                        color={'#61C3F2'}
                    />
                </View>
            </View>
        </View>
    )
}

export default SearchComp

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        marginTop: responsiveHeight(1)
    },
    innerView: {
        marginVertical: responsiveHeight(1)
    },
    fastImage: {
        width: scale(120),
        height: scale(90),
        borderRadius: responsiveWidth(3)
    },
    fdView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(2),
        color: "#202C43"
    },
    textView: {
        width: scale(130)
    },
    title1:{
        fontFamily: fontFamily.appTextRegular,
        fontSize: responsiveFontSize(1.5),
        color: "#DBDBDF",
        marginTop: responsiveHeight(1)
    }
})