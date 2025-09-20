import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ApiInstance, api_key } from '../../../service/apiInstance';
import { LoadingComp } from '../../../components/gerenal/loadingComp';
import { SimpleHeader } from '../../../components/gerenal/header';
import VideoPlayer from 'react-native-video-player';


interface props {
    navigation: any
    route: any
}
interface flatlistProp {
    item: any
}

const VideoPlay = ({ navigation, route }: props) => {
    const [loading, setLoading] = useState(true)
    const [player, setPlayer] = useState(true)
    const { movieId } = route.params
    const [data, setData] = useState([])
    const [video, setVideo] = useState([])
    const videoRef: any = useRef<any>(null)
    useEffect(() => {
        handleGetVideo()
    }, [])


    const handleGetVideo = () => {
        try {
            ApiInstance.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&language=en`)
                .then((res: object | any) => {
                    console.log(res.data.results)
                    setData(res?.data?.results)
                    let result = res?.data?.results
                    let vid = result?.filter((v: any) => v.site === "YouTube" && v.type == 'Trailer')
                    setVideo(vid)
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    setTimeout(() => {
                        setLoading(false)
                    }, 2000);
                })
        } catch (error) {
            console.log(error);
        }
    }

    console.log({ video: video });



    return (
        <View style={styles.container}>
            <LoadingComp title={'Loading...'} loading={loading} />
            <VideoPlayer
                ref={videoRef}
                video={{ uri: `https://www.youtube.com/watch?v=${video[0]?.key}` }}
                videoWidth={Dimensions.get('window').width}
                videoHeight={Dimensions.get('window').height}
                onLoad={() => setPlayer(false)}
                onLoadStart={() => setPlayer(true)}
                onEnd={() => navigation.goBack()}
                loop={false}
                autoplay
            />
            {!player && (
                <ActivityIndicator color={'white'} size={'large'}
                    style={styles.loading}
                />
            )}
        </View>
    )
}

export default VideoPlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    item: {
        flex: 1,
        marginBottom: 20,
    },
    video: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    loading: {
        position: 'absolute',
        alignSelf: "center",
        top: '50%'
    }
})