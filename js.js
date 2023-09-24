const cells =document.querySelectorAll('.cell');
let cells2=document.querySelectorAll('.cells');
let resetbtn=document.querySelector('.reset');
let score1=document.querySelector('.score1');
let score2=document.querySelector('.score2');
let draw = document.querySelector('.draw');
let winingdad = document.querySelector('#winingdad');
let whoturn=document.querySelector('whoturn');
let winmessage = document.getElementById('winmessage');
let btcolse = document.getElementById('btcolse');
let x=document.getElementById('x');
let o=document.getElementById('o');
let after=document.getElementById('after');
let robotbtn=document.getElementById('robot');
let friendbtn=document.getElementById('friend');
 const wincombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
    
 ]

let player1={
    Symbol:'<i class="fa fa-close"></i>',
    played:[],
    score:0,
}
let player2={
    Symbol:'<i class="fa fa-circle-o"></i>',
    played:[],
    score:0,
}
let drawtest=true;
let turn = true;
let player1score=0;
let player2score=0;
let playersdraw=0;
////// ai ///////
let usedcless =[];
let emptycless=[0,1,2,3,4,5,6,7,8];
let aitest=true;
let usedclessai=[];
let mojode=0;
////////////////
friendbtn.addEventListener('click',function(){
    if(usedcless.length==0){
    after.style.left='50%';
    aitest=false;
    /////تصفير الاحصائيات
    player1score=0;
    score1.innerHTML=player1score;
    player2score=0;
    score2.innerHTML=player2score;
    playersdraw=0;
    draw.innerHTML=playersdraw;
    /////////
    }
})
robotbtn.addEventListener('click',function(){
    if(usedcless.length==0){
    after.style.left='0';
    aitest=true;
 /////تصفير الاحصائيات
 player1score=0;
 score1.innerHTML=player1score;
 player2score=0;
 score2.innerHTML=player2score;
 playersdraw=0;
 draw.innerHTML=playersdraw;
 /////////
    }
    
})




for(let i=0;i<9;i++){
cells[i].addEventListener('click',function addsymbol(ramdom){
    if(cells[i].innerHTML!=player1.Symbol && cells[i].innerHTML!=player2.Symbol){
    if(turn ){
        cells[i].innerHTML=player1.Symbol;
        player1.played.push(i);
        setTimeout(checkwin ,300,player1);
        o.style.color='#febf14';
        x.style.color='#a7bfdc';
        turn=false;
        usedcless.push(i);
        setTimeout(ai ,2000);
        
    }
    else if(turn==false && aitest==false){
        cells[i].innerHTML=player2.Symbol;
        player2.played.push(i);
        setTimeout(checkwin ,300,player2);
        x.style.color='#febf14';
        o.style.color='#a7bfdc';
        turn=true;   
        
    }
   
}
})
}
function checkwin(player){
wincombos.some(combo =>{
    if(combo.every(index => player.played.includes(index) )){
        drawtest=false;
        usedcless=[];
        usedclessai=[];
       if(player==player1){
        player1score++;
        score1.innerHTML=player1score;
        
        winingdad.style.display='flex';
        winmessage.innerHTML=player1.Symbol+' is the <br><h2>winner</h2>';
        
        }
        else {
        player2score++;
        score2.innerHTML=player2score;
        winingdad.style.display='flex';
        winmessage.innerHTML=player2.Symbol+' is the <br><h2>winner</h2>';
        
        }
    }
})
if(player1.played.concat(player2.played).length==9 && drawtest==true ){
     playersdraw++;
     draw.innerHTML=playersdraw;
     winingdad.style.display='flex';
     winmessage.innerHTML='It is a <h2>draw</h2>';
     
}
}


function resetf(){
    cells.forEach(cell => {
        cell.innerHTML='';
    })
    player1.played=[];
    player2.played=[];
    usedcless=[];
    usedclessai=[];
    turn=true;
    drawtest=true;
    x.style.color='#febf14';
    o.style.color='#a7bfdc';
}


btcolse.addEventListener('click',function(){
    winingdad.style.display='none';
    resetf();
})
//////////////// ai /////////////////
let ramdom;
function ai(){
    if(aitest==true && turn==false &&drawtest==true){
        for(let i=0; i<10000;i++){
     ramdom =Math.floor(Math.random()*emptycless.length);
     if(!usedcless.includes(ramdom)){
        break;
     }
     }
     //////new ai     ويقطع عليك هذا لي يكمل خط الفوز /////////
     for (var ii = 0; ii < wincombos.length; ii++) {
        mojode=0;
        for (var jj = 0; jj <wincombos[ii].length; jj++) {
          if (player1.played.indexOf(wincombos[ii][jj]) !== -1) {
            mojode++;
            if(mojode==2){
            for(let jjj=0;jjj<3;jjj++){
            if (player1.played.indexOf(wincombos[ii][jjj]) === -1) {
                if(!usedcless.includes(wincombos[ii][jjj])){
                ramdom = wincombos[ii][jjj];
                }  
            }
            }
            }
          }}}
    

    
    
    
     for (var ii = 0; ii < wincombos.length; ii++) {
        mojode=0;
        for (var jj = 0; jj <wincombos[ii].length; jj++) {
          if (usedclessai.indexOf(wincombos[ii][jj]) !== -1) {
            mojode++;
            if(mojode==2){
            for(let jjj=0;jjj<3;jjj++){
            if (usedclessai.indexOf(wincombos[ii][jjj]) == -1) {
                if(!usedcless.includes(wincombos[ii][jjj])){
                ramdom = wincombos[ii][jjj];
                }  
            }
            }
            }
          }}}
   //////////new ai end///////////////
     if(!usedcless.includes(ramdom)){
    usedcless.push(ramdom);
    usedclessai.push(ramdom);
        console.log(usedclessai);
        cells[ramdom].innerHTML=player2.Symbol;
        player2.played.push(ramdom);
        setTimeout(checkwin ,500,player2);
        x.style.color='#febf14';
        o.style.color='#a7bfdc';
        turn=true;
     
     }
}}




  ///////////////// ai ////////////
  /*<i class="fa-light fa-microchip-ai"></i>

  /////////////robot////////////////
  <i class="fa fa-android" aria-hidden="true"></i>
  
  ////////friends////////////
  <i class="fa fa-user" aria-hidden="true"></i>
  
  
  
  
  */
