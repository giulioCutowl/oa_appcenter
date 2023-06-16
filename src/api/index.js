import {
  apiGraphQlURL,
  graphQlAuthorization,
  wsHostURL
} from "rn_ordine_avvocati_milano/src/constants";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
  ApolloLink
} from '@apollo/client';
import User from "rn_ordine_avvocati_milano/src/model/User";
import DeviceInfo from 'react-native-device-info';
import Config from "rn_ordine_avvocati_milano/src/config/config.js";

var client

export default class Api {

  constructor() {

    const httpLink = new HttpLink({
      uri: apiGraphQlURL
    });

    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: User.getInstance().getToken() ? User.getInstance().getToken() : graphQlAuthorization
        }
      });

      // Call the next link in the middleware chain.
      return forward(operation);
    });

    client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink)
    })
  }

  async getToken(infoUser) {

    let token = await client.mutate({
      mutation: gql `
            mutation {
                sign(
                    user: "${infoUser.codFisc}", product: 4, modules: 1 ){
                        token 
                    }
            }
        `
    }).then(result => {
      return result.data.sign.token
    })

    return token
  }

  search(text = null, from, pacchetti = null, numArt = null) {

    return client.query({
      query: gql `query {
            esSearch(
              index: "dpp_codici_ipertestuali"
              _source: ["*"]
              from:${from}
              size:10
              query: {
                bool: {
                  must: [
                    ${text != null ? "{ match_phrase: { arg: { name:\"testo\", value: { query: \"" + text + "\", slop: 5 } } } }" : ""}
                    ${pacchetti != null ? "{ term: { arg: { name:\"pacchetti\", value: { value: \"" + pacchetti + "\" } } } }" : ""}
                    ${numArt != null ? "{ term: { arg: { name:\"provvedimento.numArtAll\", value: { value: \"" + numArt + "\" } } } }" : ""}
                  ]
                  filter: [
                    {
                      range: {
                        arg: {
                          name: "dpp.dataAggiornamento"
                          value: { gte: "1800-01-01", lte: "2050-01-01" }
                        }
                      }
                    }
                  ]
                }
              }
            ) {
              hits {
                hits {
                  highlight
                  _source {
                    provvedimento {
                      numero
                      numArtAll
                      campiCalcolati
                      idDocMaster
                      nomefile
                      pagine
                    }
                    documento {
                      campiCalcolati
                      idDocMaster
                      idUnitaDoc
                      nvigUnitaDoc
                      nomefile
                      pagine
                    }
                    testo
                  }
                }
              }
            }
          }`
    })
  }

  loadArticle(id) {
    return client.query({
      query: gql `
      query {
        getDocumentByTipoUd(idDocMaster:${id},tipoUd:[172,167],text:true,clearLink: true, packets:false,baseArticle:"codici")
      }
      `
    })
  }

  loadArticleHref(href, id) {

    return client.query({
      query: gql`
      query {
        getLinksByHref(href:"${href}", idDocMaster:${id}){
          iddocmasterj
        }
      }
      `
    })
  }

  savePrivacy(codicefiscale, privacy1, privacy2){
    let url = wsHostURL+"api/v1/device/marketing/"+codicefiscale
    let body = {marketing_info: privacy1 || privacy2 ? "true" : "false"}
    
    return fetch(url,{
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  logout(){

    let deviceId = DeviceInfo.getUniqueId();
    let gestoreId = Config.getIdGestore();
    let url = `${wsHostURL}api/v1/device/logout/${deviceId}/${gestoreId}`
    
    return fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })  
  }
}