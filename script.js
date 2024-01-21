import {Kart, Deste, Blackjack} from "./bj.js";

let game = new Blackjack();
let kasaacik = false;
let go = false;
let cuzdan = 600;
let bet = 200;

//////////////////// BUTONLAR ///////////////////////
let buton1 = document.createElement("button");
document.getElementById("secim").appendChild(buton1);
buton1.textContent = "+";

let buton2 = document.createElement("button");
document.getElementById("secim").appendChild(buton2);
buton2.textContent = "-";

let buton3 = document.createElement("button");
document.getElementById("secim").appendChild(buton3);
buton3.textContent = "x2";

let go_btn = document.createElement("button");
let bet_up = document.createElement("button");
let bet_down = document.createElement("button");
let bet_text = document.createElement("p");
let go_info = document.createElement("div");
document.getElementById("secim").append(go_info);
document.getElementById("bet").appendChild(bet_down);
document.getElementById("bet").appendChild(bet_text);
document.getElementById("bet").appendChild(bet_up);
document.getElementById("bet").appendChild(go_btn);
bet_down.textContent = "-";
bet_up.textContent = "+";
go_btn.textContent = "go";
go_info.id = "go_info";

// bu cüzdanı gösteriyo buton değil
let cuzdan_bar = document.getElementById("cuzdan");

///////////////// KARRTLAR VE DESTE ///////////////////////
function kartlar_init(){
    let result = document.createElement("h2");
    for(let i = 0; i < 52; i++){
        let kart = document.createElement("div");
        let seri = document.createElement("img");
        let isim = document.createElement("div");
        let resim = document.createElement("img");
        kart.id = game.kartlar[i].koz + game.kartlar[i].isim;
        seri.className = "koz";
        isim.className = "deger";
        kart.className = "denemekart";
        isim.innerHTML = game.kartlar[i].isim;
        resim.style.width = "50px";
        resim.style.height = "50px";
        seri.style.height = "25px";
        seri.style.width = "25px";
        resim.style.margin = "auto";
        let k = game.kartlar[i];
        if(k.seri === 0){
            seri.src = "img/heart.png";
        }else if(k.seri === 1){
            seri.src = "img/diamond.png";
        }else if(k.seri === 2){
            seri.src = "img/clubs.png";
        }else{
            seri.src = "img/spades.png";
        }
        
        if(k.deger === 1){
            resim.src = "img/a.png";    
        }else{
            if(k.deger === 10){
                if(k.isim === "J"){
                resim.src = "img/carnival.png";
                }else if(k.isim === "Q"){
                    resim.src = "img/queen.png"
                }else if(k.isim === "K"){
                    resim.src = "img/king.png";
                }else{
                    resim.src = seri.src;
                }
            }else{
                resim.src = seri.src;
            }
        }
        resim.className = "resim";
        document.getElementById("kartlar").appendChild(kart);
        document.getElementById(game.kartlar[i].koz + game.kartlar[i].isim).appendChild(seri);
        document.getElementById(game.kartlar[i].koz + game.kartlar[i].isim).appendChild(resim);
        document.getElementById(game.kartlar[i].koz + game.kartlar[i].isim).appendChild(isim);
        
    }
    document.getElementById("gameover").appendChild(result);
}


/////////////////// GÜNCELLEME FONKSİYONLARI //////////////////
function player_guncelle()
{
    cuzdan_bar.textContent = cuzdan;
    let olanlar = [];
    function guncelle()
    {
        for(let i = 0; i < game.player.count; i++)
        {
            // let control = true;
            // let kart = game.player.el[i];
            // olanlar.forEach(olan => 
            // {
            //     if(olan === kart){
            //         control = false;
            //         break;
            //     }else{
            //         olanlar.push(kart);
            //     }
            // })
            // for (let j = 0; j < olanlar.length; j++) {
            //     if (olanlar[j] === kart) {
            //         control = false;
            //         break;
            //     }
            // }

            // if(control)
            // {
            //     let fiziksel_kart = document.getElementById(kart.koz + kart.isim);
            //     fiziksel_kart.className ="pk";
            //     fiziksel_kart.style.backgroundColor = (i == game.player.count - 1 && game.player.count > 2) ? "#bcb" : "#fff";
            //     document.getElementById("player").append(fiziksel_kart);
            // }
            // olanlar.push(kart);

            let kart = game.player.el[i];
            let control = true;
            
            if(kart in olanlar){
                control = false;
            }else{
                olanlar.push(kart);
            }

            if(control){
                let fiziksel_kart = document.getElementById(kart.koz + kart.isim);
                fiziksel_kart.className ="pk";
                fiziksel_kart.style.backgroundColor = (i == game.player.count - 1 && game.player.count > 2) ? "#bcb" : "#fff";
                document.getElementById("player").append(fiziksel_kart);
            }
        }
        document.getElementById("info").innerHTML = game.player.sum;

    }
    return guncelle;
}



function kasa_guncelle()
{
    let olanlar = [];
    
    function guncelle()
    {

        for(let i = 0; i < game.kasa.count; i++){
            let kart = game.kasa.el[i];
            let control = true;
            
            if(kart in olanlar){
                control = false;
            }else{
                olanlar.push(kart);
            }

            if(control){
                let fiziksel_kart = document.getElementById(kart.koz + kart.isim);
                fiziksel_kart.className = (!kasaacik && i == 1) ? "deneme" : "item"; 
                document.getElementById("kasa").appendChild(fiziksel_kart);
            }
        }
        document.getElementById("kasainfo").innerHTML = (kasaacik) ? game.kasa.sum : "-";
    }
    return guncelle;
}

/////////// bekleme fonksiyon /////////////////
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

/////////// ANA DÖNGÜ //////////////////
var game_interval;
var menu_interval;
function main(){

    if(game.deste.top > 52 - 6){
        game.deste.top = 0;
        game.deste.deste_kar();
        async ()=>{
            document.getElementById("karistir").style.display = "flex";
            await sleep(3000);
            document.getElementById("karistir").style.display = "none";
        }
        
    }

    async function kasaAc(){
        buton1.style.display = "none";
        buton2.style.display = "none";
        buton3.style.display = "none";
        kasaacik = true;
        await sleep(500);
        let kasa_acacan = game.kasa_ac();
        let getir = kasa_acacan.next();
        while(!getir.done){
            await sleep(750);
            getir = kasa_acacan.next();
            k_update();
        }
        go = true;
        go_info.innerHTML = "kasa " + game.kasa.sum + " | sen " + game.player.sum;
    }
    
    buton1.style.display = "flex";
    buton2.style.display = "flex";
    buton3.style.display = "flex";
    let is_double = false;
    let k_update = kasa_guncelle();
    let pl_update = player_guncelle();
    document.getElementById("gameover").style.display = "none";
    document.getElementById("go_info").style.display = "none";

    game.kart_dagit();
    kasaacik = false;
    
    game_interval = setInterval(()=>
    {
        console.log(game.deste.top );
        let player_durum = game.isbj(game.player);
        let el_bitir = game.el_bitir();
        k_update();      
        pl_update();

        if(player_durum != 0){
            buton1.style.display = "none";
            buton3.style.display = "none";
        }

        ////// BUTON FONKSİYONLARI ///////
        buton1.onclick = ()=>{
            game.kart_iste();
        }
        buton2.onclick = async function(){
            kasaAc();
        }
        buton3.onclick = async ()=>{
            game.kart_iste();
            is_double = true;
            await sleep(1000);
            kasaAc();
        }

        document.getElementById("info").innerHTML = game.player.sum;
        document.getElementById("kasainfo").innerHTML = (kasaacik) ? game.kasa.sum : "-";

        if(go){
            if(el_bitir === "kazandın"){
                console.log("kazandin");
                cuzdan += bet*2;
                if(is_double)
                    cuzdan += bet;
            }else if(el_bitir === "berabere"){
                console.log("berabere");
                cuzdan += bet;
                if(is_double)
                    cuzdan -= bet;
            }else{
                console.log("kaybettin");
            }

            document.getElementById("result").textContent = el_bitir;
            document.getElementById("gameover").style.display = "flex";
            document.getElementById("go_info").style.display = "flex";
            game_over(0);
        }
        player_durum = game.isbj(game.player);
        k_update();      
        pl_update();
    }, 500);
}

function menu(){

    bet_text.textContent = bet;
    cuzdan_bar.textContent = cuzdan;

    menu_interval = setInterval(()=>
    {
        bet_up.onclick = ()=>
        {
            if(cuzdan > bet){
                bet += 100;
                bet_text.textContent = bet;
            }
        }
        bet_down.onclick = ()=>
        {
            if(bet > 200){
                bet -= 100;
                bet_text.textContent = bet;
            }
        }
        go_btn.onclick = ()=>
        {
            cuzdan -= bet;
            game_over(1);
        }
    },500)

}

function game_over(sec){

    [game.player , game.kasa].forEach( kisi =>{
        kisi.sum = 0;
        kisi.count = 0;
        kisi.el = new Array;
    })

    if(sec === 1){
        clearInterval(menu_interval);

        let kasa_items = Array.from(document.getElementsByClassName("item"));
        let player_items = Array.from(document.getElementsByClassName("pk"));
        kasa_items.forEach( eski => {
            document.getElementById("iskarta-kartlar").appendChild(eski);
            eski.className = "iskarta";
        })
        player_items.forEach( eski => {
            document.getElementById("iskarta-kartlar").appendChild(eski);
            eski.className = "iskarta";
        })

        main();
    }else if(sec === 0){
        clearInterval(game_interval);
        kasaacik = false;
        go = false; // bunu yazmayı unutmak 1 günüme mal oldu aq AAAAAAAAAAAAAAAAAAAAAĞĞĞĞĞĞĞĞĞĞĞĞĞ
        menu();
    }

}

/////////// oyunu başlattım ////////////////
if(window.innerWidth > 600)
{
    kartlar_init();
    menu();    
}else{
    alert("ekran boyutu küçük, böyle olmaz :(");
    document.getElementById("mobile").textContent = "ekran boyutu çok küçük, böyle olmaz :(";
}
