import React, { PureComponent } from "react";
import {
  View,
  Dimensions,
  ScrollView
} from "react-native";
import PageControl from "react-native-page-control";
import ScreenSelectorButton from "./ScreenSelectorButton";
import { menuList } from "rn_ordine_avvocati_milano/src/constants";
import Router from "rn_ordine_avvocati_milano/src/controller/Router";

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";

const { width, height } = Dimensions.get("window");

const margin = 20;
const buttonWidth = (width - (margin * 2)) / 3;
var buttonHeight = 100

export default class ScreenSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      numButtonsPerRow: Math.floor((width - 2 * margin) / buttonWidth),
      boxHeight: 0,
      currentPageIndex: 0
    };
  }

  drawPager(event) {
    const { height } = event.nativeEvent.layout;
    const boxHeight = height;

    buttonHeight = menuList.length > 3 ? buttonHeight : boxHeight - (margin * 2);

    this.setState({
      boxHeight
    });
  }

  onMomentumScrollEnd(event) {
    this.setState({
      currentPageIndex: event.nativeEvent.contentOffset.x / width
    });
  }

  navigateToScreen(id, params) {
    Router.getInstance().navigate(id, params);
  }

  render() {
    let { numButtonsPerRow, boxHeight, currentPageIndex } = this.state;
    let buttonPages = [];

    let containerButtonsWidth = width - 2 * margin;

    let newMenuList = menuList.flatMap(item => item.list ? item.list : item);

    let numRows = Math.ceil(newMenuList.length / numButtonsPerRow);
    let maxRowsPerPage = Math.floor((boxHeight - 2 * margin) / buttonHeight);
    maxRowsPerPage = maxRowsPerPage > 0 ? maxRowsPerPage : 1;
    let numPages = Math.ceil(numRows / maxRowsPerPage);

    if (numPages > 0) {
      var currentIndex = 0;
      for (var i = 0; i < numPages; i++) {
        if (!buttonPages[i]) {
          buttonPages[i] = [];
        }
        for (var j = 0; j < maxRowsPerPage; j++) {
          buttonPages[i][j] = newMenuList.slice(
            currentIndex,
            currentIndex + numButtonsPerRow
          );
          currentIndex = currentIndex + numButtonsPerRow;
        }
      }
    }

    var idx = 0;

    return (
      <View style={this.props.style} onLayout={this.drawPager.bind(this)}>
        <ScrollView
          style={{
            flex: 1,
            flexGrow: 10,
            flexDirection: "row"
          }}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)}
          showsHorizontalScrollIndicator={false}
        >
          {buttonPages.map((page, i) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  width: width - margin * 2,
                  height: boxHeight - margin * 2,
                  margin: margin
                }}
                key={i}
              >
                {page.map((row, j) => {
                  var style = {
                    flex: 1,
                    flexDirection: "row",
                    height: buttonHeight
                  };

                  if (row.length == numButtonsPerRow) {
                    style.justifyContent = "space-between";
                  }
                  return (
                    <View key={j} style={style}>
                      {row.map((buttonInfo, n) => {
                        var style = {
                          width: buttonWidth,
                          height: buttonHeight,
                          justifyContent: "flex-start",
                          flexDirection: "column"
                        };

                        if (row.length != numButtonsPerRow) {
                          style.marginRight =
                            (containerButtonsWidth -
                              numButtonsPerRow * buttonWidth) /
                            (numButtonsPerRow - 1);
                        }

                        idx++;

                        return (
                          <ScreenSelectorButton
                            onPress={() => {
                              this.navigateToScreen(buttonInfo.id, buttonInfo);
                            }}
                            buttonInfo={buttonInfo}
                            key={idx}
                            style={style}
                            backgroundColor={mainColor}
                          />
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
        <PageControl
          style={{ flexGrow: 1 }}
          numberOfPages={numPages}
          currentPage={currentPageIndex}
          hidesForSinglePage
          pageIndicatorTintColor="gray"
          currentPageIndicatorTintColor={mainColor}
          indicatorStyle={{ borderRadius: 5 }}
          currentIndicatorStyle={{ borderRadius: 5 }}
          indicatorSize={{ width: 8, height: 8 }}
          onPageIndicatorPress={this.onItemTap}
        />
      </View>
    );
  }
}
