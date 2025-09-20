import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../assets/utilities";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { fontFamily } from "../../assets/utilities/font";
import { Icon } from "react-native-elements";

interface props {
    btnStyle?: {},
    title?: string,
    textStyle?: {},
    onPress?: () => void,
    icon?: boolean,
    iconName?: string | undefined | any,
    iconType?: string
    loading?: boolean
    disabled?: boolean
}

export const ButtonComp = ({
    btnStyle,
    title,
    textStyle,
    onPress,
    icon = false,
    iconName,
    iconType,
    loading = false,
    disabled
}: props) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.mainView, btnStyle]}>
            <View style={styles.innerView}>
                {
                    loading == true ? (
                        <ActivityIndicator color={'white'} />
                    ) : (
                        <>
                            {
                                icon ? (
                                    <Icon
                                        name={iconName}
                                        type={iconType}
                                        size={responsiveFontSize(2.5)}
                                        color={'white'}
                                        style={{ marginRight: responsiveWidth(3), }}
                                    />
                                ) : null}
                            <Text style={[styles.titleText, textStyle]}>{title}</Text>
                        </>
                    )
                }

            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    mainView: {
        width: responsiveWidth(90),
        backgroundColor: colors.btnColor,
        borderRadius: responsiveWidth(3),
        justifyContent: "center",
        height: responsiveHeight(6)

    },
    innerView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    },
    titleText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.appTextSemiBold,
        alignSelf: "center"
    }
})