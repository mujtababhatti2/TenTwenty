import React, { useEffect, useMemo } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../assets/utilities';
import { LoadingComp } from '../../../components/gerenal/loadingComp';
import { ApiInstance, api_key } from '../../../service/apiInstance';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { MovieDetailsComp } from '../../../components/feeds/movieDetails';
import { GenersComp } from '../../../components/feeds/genersComp';
import { OverViewComp } from '../../../components/feeds/overViewComp';
import type { RootState } from '../../../store/store';
import {
  clearMovieDetail,
  setDetailError,
  setDetailLoading,
  setMovieDetail,
} from '../../../store/slices/movieDetailSlice';

interface DetailProps {
  navigation: any;
  route: { params: { movieId: number } };
}

const MovieDetail = ({ navigation, route }: DetailProps) => {
  const { movieId } = route.params;
  const dispatch = useDispatch();

  const {
    loading = false,
    movie = null,
    error = null,
  } = useSelector((s: RootState) => s.movieDetail ?? {});

  useEffect(() => {
    let mounted = true;

    const fetchDetail = async () => {
      try {
        dispatch(setDetailLoading(true));
        const res = await ApiInstance.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`
        );
        if (!mounted) return;
        dispatch(setMovieDetail(res?.data ?? null));
      } catch (e: any) {
        console.log(e);
        if (!mounted) return;
        dispatch(setDetailError(e?.message ?? 'Failed to load details'));
      } finally {
        if (mounted) dispatch(setDetailLoading(false));
      }
    };

    fetchDetail();
    return () => {
      mounted = false;
      dispatch(clearMovieDetail());
    };
  }, [dispatch, movieId]);

  const formattedDate = useMemo(() => {
    const raw = (movie as any)?.release_date;
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return String(raw);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions);
  }, [movie]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <LoadingComp loading={loading} title="Fetching..." />

      <View>
        <MovieDetailsComp
          image={(movie as any)?.backdrop_path}
          onPress={() => navigation.goBack()}
          title={(movie as any)?.title ?? ''}
          releaseDate={formattedDate}
          ticketPress={() => {}}
          watchPress={() =>
            navigation.navigate('VideoPlayer', { movieId: (movie as any)?.id })
          }
        />
      </View>

      <View style={styles.wrapper}>
        <GenersComp header="Genres" data={Array.isArray((movie as any)?.genres) ? (movie as any)?.genres : []} />
        <View style={styles.divider} />
        <OverViewComp title="Overview" desc={(movie as any)?.overview ?? ''} />
      </View>

      <View style={{ height: responsiveHeight(10) }} />
    </ScrollView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  wrapper: { width: '80%', alignSelf: 'center', marginTop: responsiveHeight(3) },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgrey',
    marginVertical: responsiveHeight(1),
  },
});
