import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import DetailRestaurant from './DetailRestaurant';
import MainSlide from '../components/DetialRestaurant/MainSlide';
import { AntDesign, Feather } from 'react-native-vector-icons';
import { colors } from '../styles/color/Color';
import { POPULAR_SEARCHES } from '../data/data';

const TextInputBox = ({ click, setClick, searchTitle, setSearchTitle, recentSearch, setRecentSearch }) => {
  const [Id, setId] = useState(0);

  const handleTyping = () => {
    setId((Id) => Id + 1);
    const searchTitleId = Id;
    const addSearchTitle = recentSearch.concat({ id: searchTitleId, title: searchTitle });
    setRecentSearch(addSearchTitle);
    setSearchTitle('');
  };

  return (
    <View style={styles.textInputContainer}>
      {click ? <AntDesign name="left" size={25} style={styles.left} /> : null}
      <TextInput
        autoFocus={true}
        returnKeyType="search"
        value={searchTitle}
        style={styles.textinput}
        autoCapitalize="none"
        autoCompleteType="off"
        placeholder="매장, 음식, 지역을 검색해보세요."
        onChangeText={(e) => setSearchTitle(e)}
        onTouchStart={() => setClick(true)}
        onSubmitEditing={(e) => handleTyping(e)}
      />
      <View style={styles.right}>{click ? <Text onPress={() => setSearchTitle('')}>취소</Text> : null}</View>
    </View>
  );
};

const GoToModal = () => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <Text style={{ color: colors.red }}>2명 / 1월 04일(월)</Text>
      </View>
    </View>
  );
};

// const RecentSearches = () => {
//   return (
//     <View style={styles.searchContainer}>
//       <View>
//         <Text style={{ color: colors.defaultgray, fontSize: 12 }}>최근 검색어</Text>
//       </View>
//       <View style={styles.searchBox}>
//         <View style={styles.searchComment}>
//           <Text style={{ fontSize: 13, fontWeight: '300' }}>호텔</Text>
//         </View>
//         <View style={styles.close}>
//           <AntDesign name="close" size={12} style={styles.closeBtn} />
//         </View>
//       </View>
//     </View>
//   );
// };

const RecentSearches = ({ recentSearch, setRecentSearch }) => {
  const updateList = (data) => {
    const lists = recentSearch.map((item) => {
      return item.id === data.id ? data : item;
    });
    setRecentSearch(lists);
  };

  const handleOnDelete = (e, index) => {
    const deleteList = recentSearch.splice(index, 1);
    updateList(deleteList);
  };
  const _renderItem = (item, index) => {
    return (
      <View style={styles.searchBox}>
        <View style={styles.searchComment}>
          <Text style={{ fontSize: 13, fontWeight: '300' }}>{item.title}</Text>
        </View>
        <TouchableOpacity style={styles.close} onPress={(_, e) => handleOnDelete(e, index)}>
          <AntDesign name="close" id={item.id} size={12} style={styles.closeBtn} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Container>
      <View>
        <Text style={{ color: colors.defaultgray, fontSize: 12 }}>최근 검색어</Text>
      </View>
      <FlatList data={recentSearch} renderItem={({ item, index }) => _renderItem(item, index)} keyExtractor={(item) => item.id.toString()} />
    </Container>
  );
};

const PopularSearches = () => {
  return (
    <View style={styles.searchContainer}>
      <View>
        <Text style={{ color: colors.defaultgray, fontSize: 12 }}>인기 검색어</Text>
      </View>
      {[...POPULAR_SEARCHES].map((item) => {
        return (
          <View style={styles.searchBox} key={item.id}>
            <View style={styles.searchComment}>
              <Text style={{ fontSize: 13, fontWeight: '300' }}>{item.title}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default function Searchss() {
  const [click, setClick] = useState(false);
  const [recentSearch, setRecentSearch] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  return (
    <View style={styles.wrap}>
      <SafeAreaView style={styles.viewContainer}>
        <TextInputBox
          click={click}
          setClick={setClick}
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          recentSearch={recentSearch}
          setRecentSearch={setRecentSearch}
        />
        <View style={styles.container}>
          <GoToModal />
          <RecentSearches recentSearch={recentSearch} setRecentSearch={setRecentSearch} />
          <PopularSearches />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  viewContainer: {
    flex: 1,
    width: '100%',
  },
  textinput: {
    width: '90%',
    height: 55,
    fontSize: 17,
    paddingLeft: 30,
  },

  textInputContainer: {
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: colors.red,
  },
  left: {
    left: 20,
    color: colors.red,
  },
  right: {
    position: 'absolute',
    right: 20,
    zIndex: 9,
  },
  modalContainer: {
    justifyContent: 'center',
    height: 50,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 130,
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 15,
  },

  searchContainer: {
    marginTop: 20,
  },
  searchBox: {
    flexDirection: 'row',
    marginTop: 10,
  },
  searchComment: {
    justifyContent: 'center',
    width: '95%',
  },
  close: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    color: colors.defaultgray,
  },
});

const Container = styled.View``;