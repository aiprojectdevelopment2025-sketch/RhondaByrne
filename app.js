"use strict";
const CARDS=[
 {file:"card1.jpg",title:"Who You Really Are"},
 {file:"card2.jpg",title:"Thoughts Become Things"},
 {file:"card3.jpg",title:"Choose Happiness — Now"},
 {file:"card4.jpg",title:"Money Comes to Me Effortlessly and Easily"},
 {file:"card5.jpg",title:"The Law of Attraction Is Always Listening"},
 {file:"card6.jpg",title:"Believe You Have Received"},
 {file:"card7.jpg",title:"Happiness Attracts Everything You Want"}
];
const KEY="daily-manifestation-seven-v1";
const $=id=>document.getElementById(id);
function today(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-");}
function dateToDay(s){const [y,m,d]=s.split("-").map(Number);return Math.floor(Date.UTC(y,m-1,d)/86400000);}
function shuffled(){const a=CARDS.map((_,i)=>i);for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function read(){try{const v=JSON.parse(localStorage.getItem(KEY));if(v&&/^\d{4}-\d{2}-\d{2}$/.test(v.start)&&Array.isArray(v.order)&&v.order.length===7&&new Set(v.order).size===7&&v.order.every(i=>Number.isInteger(i)&&i>=0&&i<7))return v;}catch(e){}return null;}
function save(v){try{localStorage.setItem(KEY,JSON.stringify(v));return true;}catch(e){return false;}}
function currentDay(v){return Math.max(0,dateToDay(today())-dateToDay(v.start));}
function showCard(i){const c=CARDS[i];const img=document.createElement("img");img.className="card-img";img.src="cards/"+c.file;img.alt=c.title;$("card").replaceChildren(img);$("title").textContent=c.title;}
function render(){const v=read();if(!v){$("day").textContent="Your seven-day journey";$("status").textContent="Your first card is waiting.";return;}
 const day=currentDay(v);if(day>=7){$("day").textContent="Your journey is complete";showCard(v.order[6]);$("reveal").textContent="7-Day Demo Complete";$("reveal").disabled=true;$("status").textContent="All seven cards have been revealed. Thank you for taking this journey.";return;}
 $("day").textContent="Day "+(day+1)+" of 7";if(v.revealedDays&&v.revealedDays.includes(day)){showCard(v.order[day]);$("reveal").textContent="Today's Card Revealed";$("reveal").disabled=true;$("status").textContent="Come back tomorrow for your next card.";}else{$("card").innerHTML='<div class="back"><div class="sun">☼</div><div class="small">Your daily message</div><div>✦ ✦ ✦</div></div>';$("title").textContent="A message awaits you";$("reveal").textContent="Shuffle & Reveal My Card";$("reveal").disabled=false;$("status").textContent="One new card is ready for today.";}}
$("reveal").addEventListener("click",()=>{let v=read();if(!v){v={start:today(),order:shuffled(),revealedDays:[]};}const day=currentDay(v);if(day>=7||v.revealedDays.includes(day))return;v.revealedDays.push(day);if(!save(v)){$("status").textContent="Your browser blocked saving. Please enable browser storage for daily progress.";return;}render();});
const gallery=$("gallery");CARDS.forEach(c=>{const b=document.createElement("button");const im=document.createElement("img");im.src="cards/"+c.file;im.alt=c.title;const t=document.createElement("span");t.textContent=c.title;b.append(im,t);b.addEventListener("click",()=>{$("previewTitle").textContent=c.title;$("previewImage").src=im.src;$("previewDialog").showModal();});gallery.append(b);});
let lastRandomCard = -1;
$("nextRandom").addEventListener("click",()=>{
 const choices=CARDS.map((_,i)=>i).filter(i=>i!==lastRandomCard);
 const i=choices[Math.floor(Math.random()*choices.length)];
 lastRandomCard=i;
 const c=CARDS[i];
 $("previewTitle").textContent=c.title;
 $("previewImage").src="cards/"+c.file;
 $("previewImage").alt=c.title;
 $("previewDialog").showModal();
});
$("preview").addEventListener("click",()=>$("galleryDialog").showModal());$("closeGallery").addEventListener("click",()=>$("galleryDialog").close());$("closePreview").addEventListener("click",()=>$("previewDialog").close());render();document.addEventListener("visibilitychange",()=>{if(!document.hidden)location.reload();});if("serviceWorker" in navigator&&location.protocol==="https:")navigator.serviceWorker.register("sw.js").catch(()=>{});
