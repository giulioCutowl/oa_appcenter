import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator, 
} from "react-native";
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";
import CodiciCell from "rn_ordine_avvocati_milano/src/component/partial/codici/CodiciCell";
import SearchBar from "rn_ordine_avvocati_milano/src/component/partial/common/SearchBar";
import RadioForm from 'react-native-simple-radio-button';

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";

import User from "rn_ordine_avvocati_milano/src/model/User";
import Api from "rn_ordine_avvocati_milano/src/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import Router from "rn_ordine_avvocati_milano/src/controller/Router";

import Config from "rn_ordine_avvocati_milano/src/config/config.js";

const CodiciScreen = (props) => {

  (async () => {
    const users = await fetchUsers();
    setUsers(users);
  })();

  const [category, setCategory] = useState(null)
  const [numArt, setNumArt] = useState(null)
  const [text, setText] = useState(null)
  const [currentLoadedPage, setCurrentLoadedPage] = useState(0)
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)
  const [authorized] = useState(User.getInstance().isAuthorized())
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false)
  const [privacy1, setPrivacy1] = useState(0)
  const [privacy2, setPrivacy2] = useState(0)
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)

  useEffect(async () => {
    const showPrivacyConsent = await Config.getShowPrivacyConsent() && !User.getInstance().isPrivacyAccepted()
    setShowPrivacyPopup(showPrivacyConsent)

    if (authorized) {
      search()
    }
    
  }, [])

  function updateParams(data) {
    const { text, category, numArt } = data

    setText(text ? text : null)
    setCategory(category ? category : null)
    setNumArt(numArt ? numArt : null)

    search(text, [], 0, numArt, category)
  }

  function search(text, list = [], page = 0, numArt = null, category = null) {

    let api = new Api();
  
    api.search(text, page * 10, category, numArt)
    .then((data) => {
      console.log("result", data)

      setDocuments([...list, ...data.data.esSearch.hits.hits])
    })
    .catch((error) => {
      console.log("error", error)
    })
  }

  function savePrivacy(){
    User.getInstance().savePrivacyPolicy(privacy1, privacy2).then((result) => {
      setShowPrivacyPopup(false)
      console.log(result)
    }).catch((e)=>{
      setShowPrivacyPopup(false)
      console.log(result)
    }) 
  }

  function openFilters() {
    props.navigation.push("Filters", {
      ...{category, numArt, text},
      updateParams: updateParams
    });
  }

  function didSelectedRow(item) {
    const { idDocMaster } = item

    props.navigation.push("Article", {
      articleId: idDocMaster
    });
  }

  function renderItem({ item, index }) {

    const { _source: { provvedimento: { idDocMaster, campiCalcolati: { estremo: subhead, estremo_breve: title } } } } = item

    return (
      <CodiciCell
        key={index}
        data={{ idDocMaster, subhead, title }}
        onPress={didSelectedRow.bind(this, { idDocMaster, subhead, title })}
      />
    );
  }

  function getHeader() {
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
          <Text style={styles.title}>CODICI</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "stretch",
            justifyContent: "center"
          }}
        >
          <SearchBar style={styles.searchBar} search={search} text={text} onTextChanged={setText}/>
          <CustomButton
            style={{
              height: 40,
              marginRight: 0,
              flex: 1
            }}
            name="filtro-ricerca"
            iconSize={22}
            iconColor="#5DAAE7"
            onPress={openFilters}
          />
        </View>
        {documents.size > 0 ? (
          <Text style={styles.numResultsLabel}>
            {documents.size} RISULTATI
          </Text>
        ) : null}
        <View
          style={{
            ...styles.separator,
            marginTop: documents.size > 0 ? 14 : 30
          }}
        />
      </View>
    );
  }

  function getContent() {

      return (

        loading && documents.length == 0 ? 
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="gray" />
          </View> : 
                <FlatList
                  style={styles.list}
                  data={documents}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  enableEmptySections={true}
                  onEndReachedThreshold={0.5}
                  keyExtractor={(item, index) => index.toString()}
                  onEndReached={() => {

                    if (!onEndReachedCalledDuringMomentum) {

                      if (!loading && documents.length > 0) {
                        let page = currentLoadedPage + 1

                        setCurrentLoadedPage(page)
                        search(text, documents, page)
                      }
                      setOnEndReachedCalledDuringMomentum(true);
                    }
                  }}
                  onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
                />

      );

  }

  function getPrivacy(){
    
    var radio_props = [
      {label: 'Acconsento', value: 1 },
      {label: 'Non acconsento', value: 0 }
    ];

    return(
      <View>
        <Text>
        Letta e compresa <Text style={{textDecorationLine: 'underline'}} onPress={() => { Router.getInstance().openCodiciPrivacy()}}>l’informativa privacy</Text>, per il trattamento dei miei dati personali da parte di Giuffrè Francis Lefebvre S.p.A.:
        </Text>
        <Text>
        per attività di marketing attraverso e-mail, newsletter, telefono, sms, MMS e posta tradizionale 
        </Text>
        <RadioForm
          radio_props={radio_props}
          initial={1}
          onPress={(value) => {setPrivacy1(value)}}
          style={{marginTop:20, marginBottom: 20}}
          buttonColor={mainColor}
          selectedButtonColor={mainColor}
        />
        <Text>
        per finalità di profilazione e invio di comunicazioni personalizzate tramite e-mail, newsletter, telefono, sms, MMS e posta tradizionale 
        </Text>
        <RadioForm
          radio_props={radio_props}
          initial={1}
          onPress={(value) => {setPrivacy2(value)}}
          style={{marginTop:20, marginBottom: 20}}
          buttonColor={mainColor}
          selectedButtonColor={mainColor}
        />

        <View style={styles.continueButton}>
          <TouchableOpacity onPress={() => { savePrivacy() }}>
            <Text  style={{color:"white", height: 20, }}>Continua</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

/*if (error) return (
                <View>
                  <Text>`Error! ${error.message}`</Text>
                </View>
              );*/
  return(
      authorized ? ( !showPrivacyPopup ? <View style={styles.content}>
        {getHeader()}
        {getContent()} 
      </View> : <View style={styles.content}>
        {getPrivacy()}
      </View>) : null
  )
}

const styles = StyleSheet.create({
  header: {
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    flex: 1,
    backgroundColor: "white"
  },
  separator: {
    marginTop: 16,
    backgroundColor: mainColor,
    height: 2,
    alignSelf: "stretch"
  },
  searchBar: {
    height: 40,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 40,
    flex: 8,
    marginRight: 10,
    paddingLeft: 20
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
  },
  continueButton: {
    backgroundColor: 
    mainColor, color:"white", 
    height: 44, 
    width: 200, 
    alignItems: "center", 
    alignSelf: "center", 
    justifyContent: "center", 
    borderRadius: 22
  }
});

export default CodiciScreen;
