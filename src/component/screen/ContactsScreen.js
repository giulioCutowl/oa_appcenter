import React, { PureComponent } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Linking
} from "react-native";

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";


class ContactsScreen extends PureComponent {

  getContent() {
    return (
      <ScrollView style={styles.content} contentInset={{bottom: 30}} showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>CONTATTI</Text>

        <Text style={styles.title}>Ordine degli Avvocati di Milano</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Via Carlo Freguglia, 1</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >20122 Milano</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Tel. 02.54.92.92.1 r.a.</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:segreteria@ordineavvocatimilano.it') }>mail segreteria@ordineavvocatimilano.it</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:consiglio@cert.ordineavvocatimilano.it') }>P.E.C. consiglio@cert.ordineavvocatimilano.it</Text>

        <Text style={styles.title}>Uffici di Segreteria</Text>
        <Text style={styles.detail}>Palazzo di Giustizia - 1° piano,</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >ingresso da Largo Biagi - corridoio a sinistra</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Tel. 02-54.92.92.1 r.a.</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Fax 02-55.181.003</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:segreteria@ordineavvocatimilano.it') }>mail segreteria@ordineavvocatimilano.it</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Servizio emergenze</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:emergenza@ordineavvocatimilano.it') }>mail emergenza@ordineavvocatimilano.it</Text>


        <Text style={styles.title}>Ufficio patrocinio a spese dello Stato</Text>
        <Text style={styles.detail}>Palazzo di Giustizia - 1° piano,</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >atrio d'ingresso Largo Biagi - Sportelli 3 e 4</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:patrocinio@ordineavvocatimilano.it') }>mail patrocinio@ordineavvocatimilano.it</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Orario: Lunedì - Mercoledì - Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Biblioteca Avv. Giorgio Ambrosoli</Text>
        <Text style={styles.detail}>Palazzo di Giustizia - 1° piano,</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >ingresso da Largo Biagi - corridoio a destra</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Fax 02-55.013.669</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:biblioteca@ordineavvocatimilano.it') }>mail biblioteca@ordineavvocatimilano.it</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Orario Mattina:</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Lunedì / Venerdì dalle 9.00 alle 13.00</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Orario Pomeriggio:</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Lunedì / Giovedì dalle 14.00 alle 17.45</Text>


        <Text style={styles.title}>Organismo di composizione della crisi da sovraindebitamento</Text>
        <Text style={styles.detail}>c / o Segreteria dell'Ordine - 1° piano Palazzo di Giustizia</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Corso di Porta Vittoria(Largo Biagi)</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:occ@ordineavvocatimilano.it') }>PEC occ@ordineavvocatimilano.it</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Orario: Lunedì / Giovedì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Ufficio Formazione Professionale Continua</Text>
        <Text style={styles.detail}>Palazzina ANMIG - piano terra</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Via Freguglia 14</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Tel. 0255199347, Fax 0254104147</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:segreteriaformazione@ordineavvocatimilano.it') }>mail segreteriaformazione@ordineavvocatimilano.it</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Organismo di Conciliazione Forense</Text>
        <Text style={styles.detail}>Palazzina ANMIG - piano terra</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Via Freguglia 14</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Tel. 0254019715, Fax 0254059046</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:conciliazione@ordineavvocatimilano.it') }>mail conciliazione@ordineavvocatimilano.it</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Organismo di Conciliazione Forense</Text>
        <Text style={styles.detail}>Sede distaccata di Rho</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Via Martiri di Belfiore 12 Rho(Mi)</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Tel. 0283470512</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:conciliazione@ordineavvocatimilano.it') }>mail conciliazione@ordineavvocatimilano.it</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Sportello per il Cittadino</Text>
        <Text style={styles.detail}>Palazzo di Giustizia - 1° piano,</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >atrio d'ingresso Largo Biagi - Sportello 2</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Tel. 0254101935</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:sportello@ordineavvocatimilano.it') }>mail sportello@ordineavvocatimilano.it</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Sportello Informatico</Text>
        <Text style={styles.detail}>Palazzo di Giustizia - 1° piano, Lato San Barnaba</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Tel. 02 54121683</Text>
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('mailto:infopct@ordineavvocatimilano.it') }>mail infopct@ordineavvocatimilano.it</Text>
        <Text style={styles.detail} dataDetectorType={"all"} >Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Sala Avvocati</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Palazzo di Giustizia - 1° piano, atrio centrale</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Sala Avvocati</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Palazzo di Giustizia - 1° piano, lato San Barnaba</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Orario: Lunedì / Venerdì dalle 9.30 alle 13.00</Text>

        <Text style={styles.title}>Sala Avvocati</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Palazzina Uff.Giud. - 1° piano, Stanza 30 / A</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Via San Barnaba 50/Text </Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Guardaroba</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Palazzo di Giustizia - 1° piano</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Orario: Lunedì / Venerdì dalle 8.45 alle 14.00</Text>

        <Text style={styles.title}>Ufficio fotocopie</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Palazzo di Giustizia - 1° piano, atrio centrale</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Ufficio fotocopie</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Palazzo di Giustizia - 6° piano</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Ufficio Fotocopie</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Palazzina Uff.Giud. - 1° piano, Stanza 30 / A</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Via San Barnaba</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Ufficio fotocopie</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Tribunale Amministrativo Regionale - 2° piano</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Via F.Corridoni 39</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>

        <Text style={styles.title}>Ufficio fotocopie</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Ufficio del Giudice di Pace - 1° piano</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Via F.Sforza 23</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>Orario: Lunedì / Venerdì dalle 9.00 alle 13.00</Text>
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.content}>
        {this.getContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    color: mainColor
  },
  title: {
    marginTop: 10,
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 20,
    color: mainColor
  },
  mainTitle: {
    marginTop: 10,
    marginBottom:20,
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 18,
    alignSelf: "center",
    color: mainColor
  },
  detail: {
    color: mainColor
  }
});

export default ContactsScreen;