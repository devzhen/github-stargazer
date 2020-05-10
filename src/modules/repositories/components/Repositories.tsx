import * as R from 'ramda';
import React from 'react';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Section from '@components/Section';

// @ts-ignore
import deleteIcon from './assets/ic_delete.png';

interface RepositoriesProps {
  repositories: any;
  isFetchingNow: boolean;
  onPressItem: any;
  deleteItem: any;
}

class Repositories extends React.Component<RepositoriesProps> {
  swipableRefs: any;

  constructor(props: any) {
    super(props);

    this.swipableRefs = {};
  }

  /**
   * Prepare repositories.
   */
  prepareRepositories = () => {
    const { repositories } = this.props;

    const prepared = (Object as any)
      .values(repositories)
      .sort((a: any, b: any) => {
        const aStar = R.propOr(0, 'stargazers_count', a);
        const bStar = R.propOr(0, 'stargazers_count', b);

        return bStar - aStar;
      });

    return prepared;
  };

  deleteItemHandler = (item: any) => {
    const { deleteItem } = this.props;

    const ref = R.prop(item.id, this.swipableRefs);
    const closeGesture = R.propOr(() => {}, 'close', ref);

    deleteItem(item);

    closeGesture();
  };

  /**
   * Key extractor.
   */
  keyExtractor = (item: any) => R.compose(R.toString, R.prop('id'))(item);

  /**
   * Render item.
   */
  renderItem = ({ item }: any) => {
    const { onPressItem } = this.props;

    const name = R.propOr('repo-name', 'name', item);
    const stargazersCount = R.compose((value: any) => {
      if (value > 1000) {
        return '1000+';
      }

      return value;
    }, R.propOr(0, 'stargazers_count'))(item);

    return (
      <Swipeable
        ref={(ref) => {
          this.swipableRefs = R.assoc(item.id, ref, this.swipableRefs);
        }}
        onSwipeableRightWillOpen={this.deleteItemHandler.bind(null, item)}
        renderRightActions={() => (
          <RemoveWrapper>
            <Image
              source={deleteIcon}
              style={{ height: 20, width: 20 }}
              resizeMode="contain"
            />
          </RemoveWrapper>
        )}
      >
        <TouchableOpacity onPress={onPressItem.bind(null, item)}>
          <Repository>
            <Card>
              <NameWrapper>
                <Name numberOfLines={1}>{name}</Name>
              </NameWrapper>
              <StarWrapper>
                <Stars>{stargazersCount}</Stars>
              </StarWrapper>
            </Card>
          </Repository>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  render() {
    const { repositories, isFetchingNow } = this.props;

    if (isFetchingNow || R.isEmpty(repositories) || R.isNil(repositories)) {
      return null;
    }

    return (
      <Section fluid bgColor="#fff">
        <FlatListStyled
          data={this.prepareRepositories()}
          extraData={repositories}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 20,
            paddingBottom: 100,
          }}
        />
      </Section>
    );
  }
}

const FlatListStyled = styled(FlatList)`
  flex: 1;
`;

const Repository = styled.View`
  width: 100%;
  padding-horizontal: 20px;
  margin-bottom: 30px;
`;

const Card = styled.View`
  flex-direction: row;
  width: 100%;
  height: 50px;
  padding-left: 14px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.gray};
  border-radius: 8px;
`;

const NameWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const StarWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
`;

const Name = styled.Text`
  font-size: 17px;
  line-height: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.lightBlack};
`;

const Stars = styled(Name)`
  font-weight: normal;
  color: ${(props) => props.theme.colors.orange};
`;

const RemoveWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 50px;
`;

export default Repositories;
