import React from "react";
import { Text } from "react-native";
import { KeyboardTypeOptions, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { fontFamily } from "../../assets/utilities/font";
interface props {
    iconName?: any,
    iconType?: string,
    onChangeText?: any,
    inputStyle?: {},
    placeholder?: string,
    eye?: boolean,
    passname?: any,
    passType?: string,
    onPress?: () => void,
    secureTextEntry?: boolean,
    keyboardType?: KeyboardTypeOptions,
    mainStyle?: {},
    autoCapitalize?: any
    value?: any
    maxLength?: any
    title?: any
}
export const Textinput = ({
    iconName,
    iconType,
    onChangeText,
    inputStyle,
    placeholder,
    eye = false,
    passname,
    passType,
    onPress,
    secureTextEntry,
    keyboardType,
    mainStyle,
    autoCapitalize,
    maxLength,
    value,
    title,
    ...otherProps
}: props) => {
    return (
        <View style={[styles.mainView, mainStyle]}>
            <View style={styles.innerView}>
                <Icon
                    name={iconName}
                    type={iconType}
                    size={responsiveFontSize(2.5)}
                    color={'black'}
                />
                <TextInput
                    onChangeText={onChangeText}
                    style={inputStyle}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    enablesReturnKeyAutomatically
                    placeholderTextColor={"#ccc"}
                    value={value}
                    maxLength={maxLength}
                    {...otherProps}
                />
                {eye ? (
                    <TouchableOpacity onPress={onPress} >
                        <Icon
                            name={passname}
                            type={passType}
                            size={responsiveFontSize(2.5)}
                            color={'black'}
                        />
                    </TouchableOpacity>
                ) : <Icon
                    name={iconName}
                    type={iconType}
                    size={responsiveFontSize(2.5)}
                    color={'white'}
                />
                }

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor: "white",
        borderRadius: responsiveWidth(2)

    },
    innerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: responsiveHeight(1),

    },
    title: {
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(1.6),
        color: 'black'
    }
})