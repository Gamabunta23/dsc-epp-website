'use strict';
const canvas=document.querySelector('canvas'),c=canvas.getContext('2d'),scene=canvas.parentElement;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let hostActive=true;
let paused=reduced,light=false,angle=-.25,tilt=.35,drag=false,lastX=0,lastY=0,last=0,time=0,land=[],w=1,h=1,r=1;
const rad=Math.PI/180;
const vector=(lon,lat)=>[Math.cos(lat*rad)*Math.sin(lon*rad),Math.sin(lat*rad),Math.cos(lat*rad)*Math.cos(lon*rad)];
const home=vector(9.9937,53.5511);
// Representative coastal starting points; illustrative connections, not service promises.
const countries=[
 ['USA',-74,40.7],['KANADA',-63.6,44.6],['MEXIKO',-96.1,19.2],
 ['BRASILIEN',-46.3,-23.9],['ARGENTINIEN',-58.4,-34.6],['CHILE',-71.6,-33],
 ['GROSSBRITANNIEN',-1.4,50.9],['SPANIEN',-.3,39.5],['TÜRKEI',29,41],
 ['MAROKKO',-7.6,33.6],['ÄGYPTEN',32.3,31.3],['SÜDAFRIKA',18.4,-33.9],
 ['VAE',55.3,25.2],['INDIEN',72.9,19],['SRI LANKA',79.9,6.9],
 ['CHINA',121.5,31.2],['JAPAN',139.7,35.4],['SÜDKOREA',129.1,35.1],
 ['VIETNAM',106.7,10.8],['SINGAPUR',103.8,1.3],['INDONESIEN',106.8,-6.1],
 ['AUSTRALIEN',151.2,-33.9],['NEUSEELAND',174.8,-36.8]
];
const ports=countries.map(([name,lon,lat])=>vector(lon,lat));
// Inland label anchors, independent of coastal route endpoints.
const labelLocations=[[-100,39],[-105,58],[-102,24],[-52,-12],[-64,-36],[-71,-30],[-3,55],[-4,40],[35,39],[-7,32],[29,27],[25,-29],[54,24],[79,23],[80.7,7.7],[104,35],[138,37],[128,36],[107,16],[103.8,1.3],[117,-3],[134,-25],[173,-41]].map(p=>vector(...p));
let ca=1,sa=0,ct=1,st=0;
function project(v,k=1){const a=v[0]*ca+v[2]*sa,z=v[2]*ca-v[0]*sa,y=v[1]*ct-z*st,depth=v[1]*st+z*ct;return [w*.55+a*r*k,h*.49-y*r*k,depth]}
function dot(p,size,color){c.fillStyle=color;c.beginPath();c.arc(p[0],p[1],size,0,Math.PI*2);c.fill()}
function arcPoint(v,t){const omega=Math.acos(Math.min(1,Math.max(-1,home.reduce((a,n,i)=>a+n*v[i],0)))),s=Math.sin(omega);return home.map((n,i)=>(n*Math.sin((1-t)*omega)+v[i]*Math.sin(t*omega))/s)}
// Great-circle geometry is invariant: compute once, interpolate during playback.
const routes=ports.map(v=>Array.from({length:257},(_,i)=>{const t=i/256,k=1+.2*Math.sin(Math.PI*t);return arcPoint(v,t).map(n=>n*k)}));
function route(j,t){const q=Math.max(0,Math.min(256,t*256)),i=Math.min(255,Math.floor(q)),f=q-i;return routes[j][i].map((n,k)=>n+(routes[j][i+1][k]-n)*f)}
const halo=document.createElement('canvas');halo.width=halo.height=48;
const hc=halo.getContext('2d'),hg=hc.createRadialGradient(24,24,0,24,24,24);
hg.addColorStop(0,'#a8f5ffcc');hg.addColorStop(.2,'#00caff66');hg.addColorStop(1,'#00caff00');hc.fillStyle=hg;hc.fillRect(0,0,48,48);
let drawnAngle=NaN,drawnTilt=NaN,drawnLight=null;
function resize(){w=scene.clientWidth;h=scene.clientHeight;r=Math.min(w*(window.parent!==window ? .46 : .41),h*(window.parent!==window ? .46 : .41));const d=Math.min(devicePixelRatio,1.5);canvas.width=w*d;canvas.height=h*d;c.setTransform(d,0,0,d,0,0);drawnAngle=NaN}
new ResizeObserver(resize).observe(scene);
function frame(now){const dt=last?Math.min(.05,(now-last)/1000):0;last=now;if(!paused&&!drag&&!document.hidden){angle+=dt*.075;time+=dt}
 if(!hostActive||document.hidden||((paused||drag)&&drawnAngle===angle&&drawnTilt===tilt&&drawnLight===light)){requestAnimationFrame(frame);return;}
 drawnAngle=angle;drawnTilt=tilt;drawnLight=light;ca=Math.cos(angle);sa=Math.sin(angle);ct=Math.cos(tilt);st=Math.sin(tilt);
 c.clearRect(0,0,w,h);const cx=w*.55,cy=h*.49;
 let glow=c.createRadialGradient(cx,cy,r*.94,cx,cy,r*1.19);glow.addColorStop(0,'#00b9e500');glow.addColorStop(.28,light?'#00a5d52b':'#00c6ff55');glow.addColorStop(1,'#00b9e500');c.fillStyle=glow;c.fillRect(0,0,w,h);
 let ocean=c.createRadialGradient(cx-r*.4,cy-r*.5,r*.05,cx,cy,r);ocean.addColorStop(0,light?'#dceef7':'#102c43');ocean.addColorStop(.75,light?'#e5f0f6':'#071321');ocean.addColorStop(1,light?'#b1d5e8':'#124764');c.fillStyle=ocean;c.beginPath();c.arc(cx,cy,r,0,7);c.fill();
 // Batch land dots into eight depth bands instead of thousands of fill calls.
 const bands=Array.from({length:8},()=>new Path2D());
 for(const v of land){const p=project(v);if(p[2]>0){const i=Math.min(7,Math.floor(p[2]*8)),sz=Math.max(.35,(.5+p[2]*.65)*r/330);bands[i].moveTo(p[0]+sz,p[1]);bands[i].arc(p[0],p[1],sz,0,Math.PI*2);}}
 bands.forEach((path,i)=>{c.fillStyle=light?`rgba(25,83,115,${.2+i*.65/7})`:`rgba(142,215,239,${.2+i*.7/7})`;c.fill(path)});

 // Fixed upper-left light source: the rotating continents pass through day/night.
 // Two clipped gradients avoid per-pixel lighting or costly blur filters.
 c.save();c.beginPath();c.arc(cx,cy,r,0,Math.PI*2);c.clip();
 const sun=c.createRadialGradient(cx-r*.68,cy-r*.6,0,cx-r*.4,cy-r*.35,r*1.5);
 sun.addColorStop(0,light?'#e7fcff99':'#66dfff55');sun.addColorStop(.5,light?'#55d6ff18':'#20beed15');sun.addColorStop(1,'#00b9e500');c.fillStyle=sun;c.fillRect(cx-r,cy-r,r*2,r*2);
 const night=c.createLinearGradient(cx-r*.7,cy-r*.5,cx+r*.8,cy+r*.55);
 night.addColorStop(0,'#03102000');night.addColorStop(.35,'#03102000');night.addColorStop(.62,light?'#10344a25':'#02091666');night.addColorStop(1,light?'#10344aa0':'#010611e8');c.fillStyle=night;c.fillRect(cx-r,cy-r,r*2,r*2);c.restore();

 ports.forEach((v,j)=>{c.strokeStyle=light?'#008db366':'#00c8f877';c.lineWidth=.9;c.beginPath();let pen=false;
 for(let i=0;i<=80;i++){const t=i/80,p=project(route(j,t));if(p[2]>.03){if(!pen)c.moveTo(p[0],p[1]);else c.lineTo(p[0],p[1]);pen=true}else pen=false}c.stroke();
 // Progress runs from the overseas endpoint (t=1) towards Hamburg (t=0).
 const progress=(time*.16+j*.17)%1,u=1-progress;
 const tail=.13;
 for(let n=12;n>0;n--){
  const behind=u+tail*n/12,next=u+tail*(n-1)/12;
  if(behind>1)continue;
  const a=project(route(j,behind));
  const b=project(route(j,next));
  if(a[2]<=.03||b[2]<=.03)continue;
  const strength=1-n/13;
  c.strokeStyle=light?`rgba(0,147,192,${strength*.9})`:`rgba(51,210,255,${strength*.9})`;
  c.lineWidth=.3+strength*2.6;c.lineCap='round';
  
  c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();
 }
 const p=project(route(j,u));
 if(p[2]>.03){c.drawImage(halo,p[0]-12,p[1]-12,24,24);dot(p,2.7,light?'#008fb9':'#e1fbff');dot(p,1.2,'#ffffff');}
 c.shadowBlur=0;c.lineCap='butt';
 const end=project(v);if(end[2]>.05)dot(end,2,light?'#009bc2':'#53d9f7');});
 // Fixed geographic labels: never shuffle them off their own country.
 const hp=project(home),occupied=[];
 if(hp[2]>.05)occupied.push([hp[0]+10,hp[1]-24,85,22]);
 c.font='600 10px Arial';c.textAlign='center';c.textBaseline='middle';
 countries.forEach((country,i)=>{
 const p=project(labelLocations[i]);if(p[2]<.3)return;
 const name=country[0],width=c.measureText(name).width+8,height=15,x=p[0]-width/2,y=p[1]-height/2;
 if(occupied.some(([a,b,c,d])=>x<a+c+3&&x+width+3>a&&y<b+d+2&&y+height+2>b))return;
 occupied.push([x,y,width,height]);c.globalAlpha=Math.min(1,(p[2]-.3)/.2);
 c.lineWidth=3;c.strokeStyle=light?'#e3f1f8':'#071a2b';c.strokeText(name,p[0],p[1]);
 c.fillStyle=light?'#16455e':'#d4f2ff';c.fillText(name,p[0],p[1]);
 });
 c.globalAlpha=1;c.textAlign='start';c.textBaseline='alphabetic';
 if(hp[2]>.05){c.strokeStyle='#00bde6';c.lineWidth=1;c.beginPath();c.arc(hp[0],hp[1],7+3*Math.sin(time*2),0,7);c.stroke();dot(hp,4,'#00bde6');c.font='600 11px Arial';c.fillStyle=light?'#12384c':'#e4f9ff';c.fillText('HAMBURG',hp[0]+15,hp[1]-10)}requestAnimationFrame(frame)}
fetch('land.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{land=data.map(p=>vector(...p));resize();requestAnimationFrame(frame)}).catch(()=>document.querySelector('.hint').textContent='KARTE KONNTE NICHT GELADEN WERDEN');
const pause=document.getElementById('pause');pause.textContent=paused?'Drehen':'Pause';pause.setAttribute('aria-pressed',String(paused));pause.onclick=()=>{paused=!paused;pause.textContent=paused?'Drehen':'Pause';pause.setAttribute('aria-pressed',String(paused))};
document.getElementById('theme').onclick=e=>{light=!light;document.body.classList.toggle('light',light);e.target.textContent=light?'Dunkle Ansicht':'Helle Ansicht';e.target.setAttribute('aria-pressed',String(light))};
canvas.onpointerdown=e=>{drag=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)};canvas.onpointermove=e=>{if(!drag)return;angle+=(e.clientX-lastX)*.005;tilt=Math.max(-.8,Math.min(.8,tilt+(e.clientY-lastY)*.003));lastX=e.clientX;lastY=e.clientY};canvas.onpointerup=canvas.onpointercancel=()=>drag=false;

if(window.parent!==window){
 hostActive=false;
 window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent||e.data?.type!=='dsc-globe')return;light=!!e.data.light;hostActive=!!e.data.active;document.body.classList.toggle('light',light);drawnAngle=NaN;});
 const control=document.getElementById('embed-pause');
 if(control){control.textContent=paused?'Drehen':'Pause';control.setAttribute('aria-pressed',String(paused));control.onclick=()=>{paused=!paused;control.textContent=paused?'Drehen':'Pause';control.setAttribute('aria-pressed',String(paused));};}
}
