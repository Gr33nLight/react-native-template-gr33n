import React from 'react';
import { View } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';
import Style from '../style/style';

const SearchBar = () => {
  const renderSearchIcon = (props) => (
    <Icon {...props} name="search-outline" fill="#8F9BB3" />
  );

  return (
    <View style={Style.searchContainer}>
      <Input
        placeholder="Cerca... "
        value=""
        style={Style.search}
        accessoryRight={renderSearchIcon}
      />
    </View>
  );
};

export default SearchBar;
