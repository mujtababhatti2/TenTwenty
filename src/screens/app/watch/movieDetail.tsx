import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../assets/utilities'
import { LoadingComp } from '../../../components/gerenal/loadingComp'
import { ApiInstance, api_key } from '../../../service/apiInstance'
import { fontFamily } from '../../../assets/utilities/font'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { MovieListComp } from '../../../components/feeds/movieListComp'
import { MovieDetailsComp } from '../../../components/feeds/movieDetails'
import { GenersComp } from '../../../components/feeds/genersComp'
import { OverViewComp } from '../../../components/feeds/overViewComp'

interface detailProps {
    navigation: any
    route: any | string | undefined
}

const MovieDetail = ({ navigation, route }: detailProps) => {
    const { movieId } = route.params
    const [loading, setLoading] = useState<boolean>(true)
    const [movieData, setData] = useState<object | any>({})

    useEffect(() => {
        handleGetMovie()
    }, [])

    const handleGetMovie = () => {
        try {
            ApiInstance.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`)
                .then(res => {
                    console.log(res.data);
                    setData(res?.data)
                }).catch(err => console.log(err))
                .finally(() => setLoading(false))
        } catch (error) {
            console.log(error);
        }
    }

    function handleDate(_date: Date) {
        console.log(_date);
        const inputDate = new Date('2023-12-06');
        const options: object = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const formattedDate = inputDate.toLocaleDateString('en-US', options);
        return formattedDate

    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar
                translucent={true}
                barStyle={'light-content'}
                backgroundColor={'transparent'}
            />
            <LoadingComp loading={loading} title='Fetching...' />
            <View style={{ backgroundColor: "red" }}>
                <MovieDetailsComp
                    image={movieData?.backdrop_path}
                    onPress={() => navigation.goBack()}
                    title={movieData?.title}
                    releaseDate={handleDate(movieData?.release_date)}
                    ticketPress={() => { }}
                    watchPress={() => { navigation.navigate('VideoPlayer', { movieId: movieData?.id }) }}
                />
            </View>
            <View style={styles.wrapper}>
                <GenersComp
                    header='Genres'
                    data={movieData?.genres}
                />
                <View style={styles.divider} />
                <OverViewComp
                    title='Overview'
                    desc={movieData?.overview}
                />
            </View>
            <View style={{ height: responsiveHeight(10) }} />
        </ScrollView>
    )
}

export default MovieDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    wrapper: {
        width: "80%",
        alignSelf: "center",
        marginTop: responsiveHeight(3)
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'lightgrey',
        marginVertical: responsiveHeight(1)
    }
})