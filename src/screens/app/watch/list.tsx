import React, { useEffect, useCallback, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import { LoadingComp } from "../../../components/gerenal/loadingComp";
import { ApiInstance, api_key } from "../../../service/apiInstance";
import { colors } from "../../../assets/utilities";
import { MovieListComp } from "../../../components/feeds/movieListComp";
import { scale, vtscale } from "../../../assets/constants/pixelRatio";
import { HeaderComp } from "../../../components/gerenal/header";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import LinearGradient from "react-native-linear-gradient";
import { fontFamily } from "../../../assets/utilities/font";
import SearchComp from "../../../components/feeds/searchComp";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setUpcoming,
  setGenres,
  setSearchQuery,
  setSearchResults,
} from "../../../store/slices/moviesSlice";

type RootState = {
  movies?: {
    loading?: boolean;
    upcoming?: any[];
    genres?: any[];
    searchQuery?: string;
    searchResults?: any[];
  };
};

const List = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();

  // SAFE selector with defaults — prevents undefined during first render/rehydration
  const {
    loading = false,
    upcoming = [],
    genres = [],
    searchQuery = "",
    searchResults = [],
  } = useSelector((state: RootState) => state?.movies ?? {});

  // UI-only toggle can stay local
  const [searchFlag, setSearchFlag] = useState<boolean>(false);

  // Fetch once on mount (don’t tie to searchFlag to avoid refetch on toggle)
  useEffect(() => {
    const run = async () => {
      try {
        dispatch(setLoading(true));

        const upc = await ApiInstance.get(`/movie/upcoming?api_key=${api_key}`);
        const upcomingResults = Array.isArray(upc?.data?.results)
          ? upc.data.results
          : [];
        dispatch(setUpcoming(upcomingResults));

        const gen = await ApiInstance.get(
          `genre/movie/list?language=en&api_key=${api_key}`
        );
        const genList = Array.isArray(gen?.data?.genres) ? gen.data.genres : [];
        dispatch(setGenres(genList));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    run();
  }, [dispatch]);

  const handleRenderItem = useCallback(
    (item: any) => {
      return (
        <MovieListComp
          image={{
            uri: `https://image.tmdb.org/t/p/w500${item?.backdrop_path}`,
          }}
          title={item?.original_title}
          onPress={() => {
            navigation.navigate("MovieDetail", { movieId: item?.id });
          }}
        />
      );
    },
    [navigation]
  );

  const handleGenresItem = useCallback((item: any) => {
    return (
      <View style={styles.mainView}>
        <View style={styles.linear}>
          <LinearGradient
            style={styles.linearView}
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
          >
            <Text style={styles.textName}>{item?.name ?? ""}</Text>
          </LinearGradient>
        </View>
      </View>
    );
  }, []);

  // Safe search handler (never passes undefined to inputs/components)
  const handleSearch = useCallback(
    (query?: string) => {
      const q = String(query ?? "");
      dispatch(setSearchQuery(q));

      if (q.length < 1) {
        dispatch(setSearchResults([]));
        return;
      }

      const base = Array.isArray(upcoming) ? upcoming : [];
      const filtered = base.filter((m: any) =>
        String(m?.title ?? "").toLowerCase().includes(q.toLowerCase())
      );
      dispatch(setSearchResults(filtered));
    },
    [dispatch, upcoming]
  );

  // Data guards for FlatList to avoid crashes + keyExtractor safety
  const safeUpcoming = Array.isArray(upcoming) ? upcoming : [];
  const safeGenres = Array.isArray(genres) ? genres : [];
  const safeSearchResults = Array.isArray(searchResults) ? searchResults : [];

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <LoadingComp loading={loading} title="Fetching..." />

      <HeaderComp
        title={"Watch"}
        flag={searchFlag}
        onPress={() => setSearchFlag(true)}
        onPressSearch={() => {
          setSearchFlag(false);
          handleSearch(""); // clear safely
        }}
        onChangeText={handleSearch}
        value={searchQuery ?? ""} // force a string; prevents hasValue crash
      />

      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {searchFlag ? (
          <>
            {searchQuery?.length > 2 ? (
              <FlatList
                scrollEnabled={false}
                data={safeSearchResults}
                numColumns={2}
                keyExtractor={(item) => String(item?.id ?? Math.random())}
                renderItem={({ item }) => (
                  <SearchComp
                    image={{
                      uri: `https://image.tmdb.org/t/p/w500${
                        item?.backdrop_path ?? ""
                      }`,
                    }}
                    title={item?.title ?? ""}
                    genre={""}
                  />
                )}
              />
            ) : (
              <FlatList
                scrollEnabled={false}
                data={safeGenres}
                numColumns={2}
                keyExtractor={(item) => String(item?.id ?? Math.random())}
                renderItem={({ item }) => handleGenresItem(item)}
              />
            )}
          </>
        ) : (
          <FlatList
            scrollEnabled={false}
            data={safeUpcoming}
            keyExtractor={(item) => String(item?.id ?? Math.random())}
            renderItem={({ item }) => handleRenderItem(item)}
          />
        )}
        <View style={{ height: vtscale(80) }} />
      </ScrollView>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: { backgroundColor: colors.primary, flex: 1 },
  wrapper: { width: "90%", alignSelf: "center" },
  mainView: {
    width: scale(150),
    backgroundColor: "rgba(255,255,255,0.3)",
    marginRight: scale(10),
    marginBottom: responsiveHeight(2),
  },
  linear: { height: responsiveHeight(12) },
  linearView: {
    height: "100%",
    borderRadius: responsiveWidth(3),
    justifyContent: "flex-end",
  },
  textName: {
    color: "white",
    height: responsiveHeight(4),
    marginLeft: responsiveWidth(3),
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.9),
  },
});
