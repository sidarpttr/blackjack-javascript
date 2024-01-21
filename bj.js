export class Kart{
    constructor(seri, deger){
        this.seri = seri;
        this.kozlar = ["kupa","karo","maça","sinek"];
        this.koz = this.kozlar[seri];
        this.deger = deger;
        this.isim = (deger === 1) ? "A" :
                (deger === 11) ? "J":
                (deger === 12) ? "Q":
                (deger === 13) ? "K":
                                    deger;
        if(deger === 1)
            this.degis = 1;
    }
    kart_goster(){  return this.koz + " " + deger;  }
}

export class Deste{
    constructor(){
        this.top = 0;
        this.kartlar = new Array(52);
        for(let i = 0; i <52; i++){
            this.kartlar[i] = new Kart(Math.floor(i/13), (i%13)+1);
        }
    }
    deste_goster(){
        this.kartlar.forEach(kart => {
            kart.kart_goster();
        })
    }
    kart_getir(){
        return this.kartlar[this.top++];
    }
    deste_kar(sayi = 100){
        while(sayi > 0){
            let x = Math.floor(Math.random()*100) % 52;
            let y = Math.floor(Math.random()*100) % 52;
            let temp = this.kartlar[x];
            this.kartlar[x] = this.kartlar[y];
            this.kartlar[y] = temp;
            sayi--;
        }
    }
}

export class Blackjack{
    constructor(){
        this.player = {
            sum : 0,
            count : 0,
            el : new Array(11)
        }
        this.kasa = {
            sum : 0,
            count : 0,
            el : new Array(11)
        }

        this.deste = new Deste();
        this.kartlar = this.deste.kartlar;

        this.kartlar.forEach(kart  => {
            kart.deger = (kart.deger > 10) ? 10 : kart.deger;
        })
        this.deste.deste_kar();
    }
    
    kart_dagit(){
        for(let i = 0; i < 2; i++){
            this.player.el[i] = this.deste.kart_getir();
            this.kasa.el[i] = this.deste.kart_getir();

            this.player.sum += this.player.el[this.player.count++].deger;
            this.kasa.sum += this.kasa.el[this.kasa.count++].deger;
        }
    }

    el_goster(kisi){
        for(let i = 0; i < kisi.count; i++){
            kisi.el[i].kart_goster();
        }
    }

    kart_iste(){
        this.player.el[this.player.count] = this.deste.kart_getir();
        this.player.sum += this.player.el[this.player.count++].deger;
    }

    *kasa_ac() {
        let kasa_durum = this.isbj(this.kasa);
    
        while (this.kasa.sum < 17) {
            if (this.kasa.sum >= 21) {
                yield undefined;
                break;
            }
    
            this.kasa.el[this.kasa.count] = this.deste.kart_getir();
            this.kasa.sum += this.kasa.el[this.kasa.count++].deger;
    
            yield;
    
            kasa_durum = this.isbj(this.kasa);
        }
    }

    el_bitir(){
        let kasa_sum = this.kasa.sum;
        let player_sum = this.player.sum;


        if(kasa_sum > 21){
            if(player_sum > 21){
                return "berabere";
            }else{
                return "kazandın";
            }
        }else{
            if(player_sum > 21){
                return "kaybettin";
            }else{
                if(player_sum < kasa_sum){
                    return "kaybettin";
                }else if(player_sum > kasa_sum){
                    return "kazandın";
                }else{
                    return "berabere";
                }
            }
        }
    }

    isbj(kisi){
        
        for(let i = 0; i < kisi.count; i++){
            if(kisi.el[i].isim === "A"){
                if(kisi.el[i].degis === 1){
                    if(kisi.sum + 10 <= 21){
                        kisi.sum += 10;
                        kisi.el[i].degis = 11;
                        break;
                    }
                }else{
                    if(kisi.sum - 10 <= 21 && kisi.sum > 21){
                        kisi.el[i].degis = 1;
                        kisi.sum -= 10;
                        break;
                    }
                }
            }
        }
        if(kisi.sum < 21){
            return 0;
        }else if(kisi.sum === 21){
            return 1;
        }else{
            return -1;
        }
    }


}