import React, { PureComponent, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";
import NewsCell from "rn_ordine_avvocati_milano/src/component/partial/news/NewsCell";

import Config from "rn_ordine_avvocati_milano/src/config/config.js";

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";

class NewsScreen extends PureComponent {
  static navigationOptions = ({ navigation, navigationOptions }) => {

    return {
      headerLeft: (
        <CustomButton
          onPress={() => {
            navigation.getScreenProps().drawerNavigation.openDrawer();
          }}
          name="hamburger"
          iconSize={12}
          style={{
            marginLeft: 20
          }}
        />
      ),
      headerStyle: {
        backgroundColor: mainColor
      }/*,
      headerRight: (
        <CustomButton
          onPress={() => {
            navigation.getScreenProps().drawerNavigation.navigate("Profile");
          }}
          name="profilo"
          iconSize={25}
          style={{
            marginRight: 20
          }}
        />
      )*/
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      news: []
    }
  }

  componentDidMount() {

    var page = this.props.route.params && this.props.route.params.id == "news_0" ? 0 : 1

    this.setState({ loading: true })
    fetch(Config.getApiNewsUrl(page)).then((response) => {

      response.json().then((result) => {

        let news
        if(result.news != undefined) {
          news = result.news
        } else {
          news = result
        }
        var list = []

        news.forEach((item) => {
          const { title, date: subhead, id } = item
          list.push({ title, subhead, id })
        })

        this.setState({ news: list, loading: false })
      });
    }).catch((error) => {
      this.setState({ loading: false })
      console.log("error", error)
    })
  }

  didSelectedRow(item) {
    const { id } = item

    this.props.navigation.push("NewsArticle", {
      articleId: id
    });
  }

  renderItem({ item, index }) {

    return (
      <NewsCell
        key={index}
        data={item}
        onPress={this.didSelectedRow.bind(this, item)}
      />
    );
  }

  getHeader() {

    var title = this.props.route && this.props.route.params && this.props.route.params.description ? this.props.route.params.description.toUpperCase() : "NEWS"
    return (
      <View style={styles.header}>
        <View
          style={{
            height: 40,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center"
          }}
        >
          <Text style={styles.title}>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "stretch",
            justifyContent: "center"
          }}
        >
        </View>
        <View
          style={{
            ...styles.separator,
            marginTop: 10
          }}
        />
      </View>
    );
  }

  getContent() {

    if (this.state.loading) {

      return (<View style={styles.loading}>
        <ActivityIndicator size="large" color="gray" />
      </View>)
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.list}
          data={this.state.news}
          renderItem={this.renderItem.bind(this)}
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          onEndReachedThreshold={0.5} ƒ
        />
      </View>
    )
  }

  render() {

    return (
      <View style={styles.content}>
        {this.getHeader()}
        {this.getContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center"
  },
  numResultsLabel: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 20,
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    color: mainColor
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 17,
    color: mainColor
  },
  content: {
    flex: 1,
    backgroundColor: "white"
  },
  separator: {
    marginTop: 16,
    backgroundColor: mainColor,
    height: 2,
    alignSelf: "stretch"
  },
  list: {
    paddingTop: 10,
    paddingBottom: 40
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default NewsScreen;
