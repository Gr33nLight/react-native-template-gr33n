import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },

  // Header
  headerLogo: {
    justifyContent: 'center',
    alignSelf: 'center',
    top: 10,
    marginBottom: 10,
    width: 50,
    height: 50,
  },
  headerStyle: {
    backgroundColor: '#fff',
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
    height: 70,
  },

  // Shop Item
  shopItemCard: {
    marginBottom: 12,
    height: 228,
    width: 350,
  },
  shopItemImage: {
    height: 148,
  },
  shopItemText: {
    height: 20,
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  shopItemSubText: {
    fontSize: 13,
  },

  // Shop Category
  shopCategory: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginRight: 8,
  },

  shopCategoryText: {
    fontSize: 10,
    marginTop: 3,
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
  },
  shopCategoryList: {
    marginBottom: 20,
    paddingTop: 10,
    paddingLeft: 20,
  },

  // Search
  search: {
    width: 350,
    alignSelf: 'center',
  },
  searchContainer: {
    paddingTop: 10,
    backgroundColor: '#fff',
    zIndex: 9999,
    elevation: 2,
  },

  // Profile
  profileScreen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 70,
    height: '100%',
  },
  profileAvatar: {
    width: 112,
    height: 112,
  },
  profileInfo: {
    flex: 1.5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 24,
  },

  // Shop detail
  shopDetail: {
    backgroundColor: '#fff',
    flex: 1,
    height: '100%',
  },
});
