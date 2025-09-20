import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LoadingComp } from "../../../components/gerenal/loadingComp";
import { ApiInstance, api_key } from "../../../service/apiInstance";
import { colors } from "../../../assets/utilities";
import { StatusBar } from "react-native";
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

interface movieListProps {
  navigation: any;
  route: any;
}

const List = ({ navigation, route }: movieListProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<object> | any>([]);
  const [searchFlag, setSearchFlag] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [genres, setGenres] = useState<Array<object> | any>([]);

  useEffect(() => {
    handleGetMovies();
  }, [searchFlag]);

  const handleGetMovies = () => {
    try {
      ApiInstance.get(`/movie/upcoming?api_key=${api_key}`)
        .then((res) => {
          console.log(res);
          setData(res.data);
          handlegetGenres();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlegetGenres = () => {
    try {
      ApiInstance.get(`genre/movie/list?language=en&api_key=${api_key}`)
        .then((res) => {
          console.log({ data: res.data?.genres });
          setGenres(res?.data?.genres);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenderItem = (item: object | any, index: number) => {
    return (
      <MovieListComp
        image={{ uri: `https://image.tmdb.org/t/p/w500${item?.backdrop_path}` }}
        title={item?.original_title}
        onPress={() => {
          navigation.navigate("MovieDetail", {
            movieId: item?.id,
          });
        }}
      />
    );
  };

  const handleGenresItem = (item: any, index: any) => {
    return (
      <View style={styles.mainView}>
        <View style={styles.linear}>
          <LinearGradient
            style={styles.linearView}
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
          >
            <Text style={styles.textName}>{item.name}</Text>
          </LinearGradient>
        </View>
      </View>
    );
  };

  const handleSearch = (query: string) => {
    const filteredItems = data?.results?.filter((item: any) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filteredItems);

    setSearchData(filteredItems);
    setSearch(query);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <LoadingComp loading={loading} title="Fetching..." />
      <HeaderComp
        title={"Watch"}
        flag={searchFlag}
        onPress={() => {
          setSearchFlag(true);
        }}
        onPressSearch={() => {
          setSearchFlag(false);
        }}
        onChangeText={(text: string) => handleSearch(text)}
        value={search}
      />
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {searchFlag ? (
          <>
            {search.length > 2 ? (
              <FlatList
                scrollEnabled={false}
                data={searchData}
                numColumns={2}
                keyExtractor={(item: any) => item?.id.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <SearchComp
                      image={{
                        uri: `https://image.tmdb.org/t/p/w500${item?.backdrop_path}`,
                      }}
                      title={item?.title}
                      genre={""}
                    />
                  );
                }}
              />
            ) : (
              <FlatList
                scrollEnabled={false}
                data={genres}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {
                  return handleGenresItem(item, index);
                }}
              />
            )}
          </>
        ) : (
          <FlatList
            scrollEnabled={false}
            data={data?.results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              return handleRenderItem(item, index);
            }}
          />
        )}
        <View style={{ height: vtscale(80) }} />
      </ScrollView>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  wrapper: {
    width: "90%",
    alignSelf: "center",
  },
  mainView: {
    width: scale(150),
    backgroundColor: "rgba(255,255,255,0.3)",
    marginRight: scale(10),
    marginBottom: responsiveHeight(2),
  },
  linear: {
    height: responsiveHeight(12),
  },
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
