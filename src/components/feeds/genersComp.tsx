import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { fontFamily } from '../../assets/utilities/font'
import { vtscale } from '../../assets/constants/pixelRatio'

interface generProps {
    header: string
    data: Array<object>
}

interface renderProps {
    item: any
    index: number
}

export const GenersComp = ({
    header,
    data
}: generProps) => {

    const genreColors = ['#15D2BC', '#E26CA5', '#564CA3', '#CD9D0F', 'orange'];
    const RenderItem = (item: any, index: any) => {
        const color = genreColors[index % genreColors.length];
        return (
            <View style={[styles.renderMainView, { backgroundColor: color }]}>
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
        );
    };



    return (
        <View style={styles.mainView}>
            <View style={styles.innerView}>
                <Text style={styles.header}>{header}</Text>
                <View>
                    <FlatList
                        data={data}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item: any) => item.id}
                        renderItem={({ item, index }) => { return RenderItem(item, index) }}
                    />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        width: "100%"
    },
    innerView: {
        marginVertical: responsiveHeight(1)
    },
    renderMainView: {
        height: vtscale(22),
        marginRight: 5,
        borderRadius: responsiveWidth(7),
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        color: 'white',
        fontFamily: fontFamily.appTextSemiBold,
        fontSize: responsiveFontSize(1.4),
        marginHorizontal: responsiveWidth(3.5)
    },
    header: {
        marginBottom: responsiveHeight(1),
        fontFamily: fontFamily.appTextMedium,
        fontSize: responsiveFontSize(1.9),
        color: "#202C43"
    }
})