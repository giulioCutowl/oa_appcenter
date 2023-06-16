import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ComponentScreen from "./ComponentScreen";
import AppMenuCell from "rn_ordine_avvocati_milano/src/component/partial/menu/AppMenuCell";
import { menuList } from "rn_ordine_avvocati_milano/src/constants";
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";
import Router from "rn_ordine_avvocati_milano/src/controller/Router";
import User from "rn_ordine_avvocati_milano/src/model/User";
import { connect } from "react-redux";
import { updateUser } from "rn_ordine_avvocati_milano/src/redux/actions";
import Collapsible from 'react-native-collapsible';
import Config from "rn_ordine_avvocati_milano/src/config/config.js";

const AppMenu = (props) => {
  
  const [data, setData] = useState([
    { id: "home", icon: "home", description: "Home" },
    ...menuList,
  ])

  const [expandedKey, setExpandedKey] = useState(null)

  useEffect(()=> {

    if ( props.user != null ) {
      setData([{ id: "home", icon: "home", description: "Home" }, ...menuList, { id: "logout", description: "Logout" }])
    }
    else{
      setData([{ id: "home", icon: "home", description: "Home" }, ...menuList])
    }
  },[props.user])

  function navigateToScreen(id, params) {
    Router.getInstance().navigate(id, params);
  }

  function renderItem({ item, index }) {

    let collapsed = expandedKey != item.id

    let expandable = item.list != null
    let expanded = expandedKey == item.id

    return (
      <Collapsible collapsed={ collapsed } collapsedHeight={50} enablePointerEvents={true}>
        <AppMenuCell
          key={item.id}
          label={item.description}
          icon={item.icon}
          item={item}
          explandable={expandable}
          expanded={expanded}
          onPress={(subElem) => {

            if (subElem != null) {
              navigateToScreen(subElem.id, subElem);
            } else if (expandable){
              if (expanded){
                setExpandedKey(null)
              }
              else{
                setExpandedKey(item.id)
              }
            } else if (item.id !== "logout"){
              navigateToScreen(item.id, item);
            }
            else{
              navigateToScreen("home");
              User.getInstance().logout()
            }
          }}
        />
      </Collapsible>
    );
  }

    return (
      <ComponentScreen noHeader style={styles.content}>
        <View style={styles.header}>
          <CustomButton
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            name="close"
            iconSize={18}
            style={{ height: 40, width: 40 }}
          />
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </ComponentScreen>
    );

}

const styles = StyleSheet.create({
  content: {
    padding: 13,
    paddingTop: 20,
    backgroundColor: Config.getMenuBackgroundColor(),
    flex: 1,
    flexDirection: "column",
  },
  header: {
    marginLeft: 10,
    height: 40
  }
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { updateUser })(AppMenu);
