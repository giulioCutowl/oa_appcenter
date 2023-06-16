import Config from "rn_ordine_avvocati_milano/src/config/config.js";

/*export const menuList = [
  { id: "news", icon: "news", description: "News" },
  //{ id: "corsi", icon: "iscrizionecorsi", description: "Iscrizioni corsi" },
  //{ id: "albo", icon: "albo", description: "Albo" },
  //{ id: "mediazione", icon: "mediazione", description: "Mediazione" },
  //{ id: "patrocinio", icon: "archivio", description: "Patrocinio Spese Stato" },
  //{ id: "ufficio", icon: "difese-dufficio", description: "Difese d'ufficio" },
  //{ id: "biblioteca", icon: "biblioteca", description: "Biblioteca" },
  //{ id: "codici", icon: "codici", description: "Codici" },
  { id: "avvocati", icon: "avvocati", description: "Avvocati.it" },
  //{ id: "consiglio", icon: "consiglio", description: "Ricevimento consiglieri" },
  //{ id: "avvisami", icon: "avvisami", description: "Avvisami" },
  { id: "contatti", icon: "contatti", description: "Contatti" },
  //{ id: "gfl", icon: "agenzia", description: "Agenzia GFL Milano" },
  //{ id: "help", icon: "help", description: "Assistenza" },
  //{ id: "privacy", icon: "privacy", description: "Privacy" },
  //{ id: "terms", icon: "terminiecondizioni", description: "Termini e condizioni" }
];*/

export const menuList = Config.getMenuList();

export const apiGraphQlURL = "https://newton.giuffre.it/graphql"
export const wsHostURL = "https://sfera.giuffre.it/"
export const loginURL = "https://sfera.sferabit.com/areariservata/"
export const graphQlAuthorization = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ3aGVuIjoxNTcyOTcwMDM3MzYzLCJ1c2VyIjoidXNlcl82NF82Nl82N182OF82OV83MF83MV83Ml83MyIsInByb2R1Y3QiOjAsInBhY2tldHMiOls2NCw2Niw2Nyw2OCw2OSw3MCw3MSw3Miw3M10sImlhdCI6MTU3Mjk3MDAzNywiZXhwIjoxODg4NTQ2MDM3fQ.FFedch9iGM5lB9vQhOeQ1ZGEql5dWDg-wDf0bGW6FNBJzgg9tpgtp7B8g749VcqmhE9iE-hqZxUz-v0ISmh9hg"

//COLORS

export const mainColor = Config.getMainColor()
export const iconTextColor = Config.getIconTextColor()
export const homeHamburgerMenuColor = Config.getHomeHamburgerMenuColor()

export const articleHtmlTemplate = `<!DOCTYPE html>
                                    <html>
                                    <head>
                                        <meta charset='utf-8'>
                                        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                                        <meta name='viewport' content='width=device-width, initial-scale=1'>
                                        <style>
                                        @font-face { font-family: 'RobotoCondensed-Regular'; src: url('RobotoCondensed-Regular.ttf'), url("file:///android_asset/fonts/RobotoCondensed-Regular.ttf")}
                                        @font-face { font-family: 'RobotoCondensed-Bold'; src: url('RobotoCondensed-Bold.ttf'), url("file:///android_asset/fonts/RobotoCondensed-Bold.ttf")}
                                        @font-face { font-family: 'Roboto-Bold'; src: url('Roboto-Bold.ttf'), url("file:///android_asset/fonts/Roboto-Bold.ttf")}
                                        @font-face { font-family: 'icomoon'; src: url('icomoon.ttf'), url("file:///android_asset/fonts/icomoon.ttf")}
                                        a {
                                          -webkit-tap-highlight-color: transparent;
                                        }
                                        body {
                                          margin: 20px;
                                          font-family: "RobotoCondensed-Regular";
                                          font-size: 14px;
                                        }
                                        #subhead {
                                          font-size: 16px;
                                          margin-top: 25px;
                                          color: ${mainColor + "77"};
                                        }
                                        #title {
                                          font-family: "RobotoCondensed-Bold";
                                          font-size: 18px;
                                          margin-top: 15px;
                                        }
                                        #content {
                                          font-size: 16px;
                                        }
                                        #separator {
                                          margin-top: 20px;
                                          margin-bottom: 20px;
                                          height: 2px;
                                          width: 100%;
                                          background-color: ${mainColor + "23"};
                                        }

                                        #attachments-title-label{
                                          letter-spacing: 1px;
                                          margin-bottom: 15px;
                                          font-size:14px;
                                          color: ${mainColor + "77"};
                                        }

                                        .attachment-icon:before {
                                          font-family:"icomoon";
                                          content: "\\e918";
                                          font-size:30px;
                                          margin-right:5px;
                                          display: inline-block;
                                          vertical-align: middle;
                                          line-height: normal;
                                          color: ${mainColor};
                                        }

                                        .attachment-title{
                                          color: #5daae7;
                                          font-family: "Roboto-Bold";
                                          font-size: 16px;
                                        }

                                        .attachment-link{
                                          text-decoration: inherit;
                                        }

                                        #content .title_paragraph {
                                          font-family: "RobotoCondensed-Bold";
                                          font-size: 20px;
                                        }

                                        #content .title_focus {
                                          font-family: "RobotoCondensed-Bold";
                                          font-size: 20px;
                                        }

                                        #content .focus-box {
                                          padding: 10px;
                                          background-color: rgb(248, 246, 242);
                                        }
                                        </style>
                                        <script type="text/javascript">

                                        (function() {
                                          function findParent(tagname,el){
                                            while (el){
                                              if ((el.nodeName || el.tagName).toLowerCase()===tagname.toLowerCase()){
                                                return el;
                                              }
                                              el = el.parentNode;
                                            }
                                            return null;
                                          }

                                          function interceptClickEvent(e) {
                                            var id;
                                            var href;
                                            var target = findParent('a', e.target || e.srcElement);
                                            
                                            if (target) {

                                                if (target.getAttribute('data-type') === \"attachment\") {
                                                  let type = target.getAttribute('data-type');
                                                  let href = target.getAttribute('data-href');
                                                  var jsonString = JSON.stringify({"type": type, "href": href})
                                                  window.ReactNativeWebView.postMessage(jsonString);
                                                }
                                                else {
                                                  id = target.getAttribute('id_doc_master');
                                                  href = target.getAttribute('href');
                                                  var jsonString = JSON.stringify({"id_doc_master": id, "href": href})
                                                  window.ReactNativeWebView.postMessage(jsonString);
                                                }
                                                e.preventDefault();
                                            }
                                          }

                                          if (document.addEventListener) {
                                              document.addEventListener('click', interceptClickEvent);
                                          } else if (document.attachEvent) {
                                              document.attachEvent('onclick', interceptClickEvent);
                                          }
                                        })();
                                        </script>
                                    </head>
                                    <body>
                                        <div id="subhead">
                                        __SUBHEAD__
                                        </div>
                                        <div id="title">
                                        __TITLE__
                                        </div>
                                        <div id="separator"></div>
                                        <div id="content">
                                        __CONTENT__
                                        </div>
                                    </body>
                                    </html>`
