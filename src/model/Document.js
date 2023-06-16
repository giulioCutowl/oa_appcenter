export default class Document {
    
    constructor(doc){
        this.subhead = doc.titolo1
        this.title = doc.titolo3
        this.documentId = doc.iddocmaster
        this.iddatabank = doc.iddatabank
    }

    getDataBankId(){
        return this.iddatabank
    }

    getDocumentId(){
        return this.documentId
    }

    getSubhead(){
        return this.subhead
    }

    getTitle(){
        return this.title
    }
};