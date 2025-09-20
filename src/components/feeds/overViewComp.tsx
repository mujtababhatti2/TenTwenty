import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { fontFamily } from '../../assets/utilities/font'

interface titleProps {
    title: string
    desc: string
}

export const OverViewComp = ({
    title,
    desc
}: titleProps) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.innerView}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.descText}>{desc}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        marginTop: responsiveHeight(1)
    },
    innerView: {

    },
    title: {
        marginBottom: responsiveHeight(1),
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(1.9),
        color: "#202C43"
    },
    descText:{
        lineHeight: responsiveHeight(3.5),
        textAlign:"left",
        fontFamily: fontFamily.appTextRegular,
        fontSize: responsiveFontSize(1.6),
        color:"#8F8F8F"
    }
})