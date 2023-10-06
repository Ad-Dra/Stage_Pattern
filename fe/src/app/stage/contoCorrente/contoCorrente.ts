export abstract class ContoCorrente{

    private idContoCorrente:Number | undefined;
    private saldo: Number | undefined;
    private iban: string | undefined;
    private dataCreazione: string | undefined;
    private descrizione: string | undefined; 

    constructor(idContoCorrente:Number,saldo: Number,iban: string,dataCreazione: string,descrizione: string){
        this.idContoCorrente=idContoCorrente;
        this.saldo=saldo;
        this.iban=iban;
        this.dataCreazione=dataCreazione;
        this.descrizione=descrizione;
    }

    getIdContoCorrente(){
        return this.idContoCorrente;
    }

    getSaldo(){
        return this.saldo;
    }

    getIban(){
        return this.iban;
    }

    getDataCreazione(){
        return this.dataCreazione;
    }

    getDescrizione(){
        return this.descrizione;
    }
}