
// ══════════════════════════════════════════════════════════
//  CANVAS — Enhanced Earth & Stars
// ══════════════════════════════════════════════════════════
const C=document.getElementById('bgc'),X=C.getContext('2d');
function rsz(){C.width=innerWidth;C.height=innerHeight;}rsz();addEventListener('resize',rsz);

// Stars with varied sizes and slow twinkling
const ST=Array.from({length:320},()=>({
  x:Math.random()*.72,
  y:Math.random(),
  r:Math.random()*1.2+.2,
  a:Math.random()*.75+.12,
  sp:Math.random()*.00022+.00006,
  ph:Math.random()*Math.PI*2,
  col:Math.random()<.12?'#a0d4ff':Math.random()<.06?'#ffe0a0':'#ffffff'
}));

const PL={x:.79,y:.5,rot:0,rs:.000055};
let T=0;

function dneb(){
  const w=C.width,h=C.height;
  const g=X.createLinearGradient(0,0,w*.85,0);
  g.addColorStop(0,'rgba(0,0,0,.35)');
  g.addColorStop(.35,'rgba(4,8,18,.12)');
  g.addColorStop(.65,'rgba(10,22,48,.18)');
  g.addColorStop(1,'rgba(12,28,55,.08)');
  X.fillStyle=g;X.fillRect(0,0,w,h);
  const g2=X.createRadialGradient(w*.82,h*.48,h*.12,w*.78,h*.52,Math.max(w,h)*.72);
  g2.addColorStop(0,'rgba(40,120,200,.14)');
  g2.addColorStop(.35,'rgba(25,70,130,.08)');
  g2.addColorStop(.65,'rgba(8,18,40,0)');
  g2.addColorStop(1,'rgba(0,0,0,0)');
  X.fillStyle=g2;X.fillRect(0,0,w,h);
}

function dstar(){
  ST.forEach(s=>{
    const drift=Math.sin(T*s.sp*180+s.ph)*.002;
    const op=s.a*(.35+.65*Math.sin(T*s.sp*200+s.ph));
    const x=(s.x+drift)*C.width,y=s.y*C.height;
    X.beginPath();
    X.arc(x,y,s.r,0,Math.PI*2);
    X.fillStyle=s.col==='#ffffff'?`rgba(255,255,255,${op})`:
      s.col==='#a0d4ff'?`rgba(160,212,255,${op})`:`rgba(255,224,160,${op})`;
    X.fill();
  });
}

function dplan(){
  const parx=(typeof PL.px==='number'?PL.px:0),pary=(typeof PL.py==='number'?PL.py:0);
  const w=C.width,h=C.height;
  const r=Math.min(w,h)*.54;
  const cx=w*PL.x+parx*w*.035;
  const cy=h*PL.y+pary*h*.028;
  const of=(PL.rot%(Math.PI*2))*r*.85;

  const halo=X.createRadialGradient(cx-r*.2,cy,r*.15,cx,cy,r*1.35);
  halo.addColorStop(0,'rgba(50,140,220,.22)');
  halo.addColorStop(.35,'rgba(25,80,150,.12)');
  halo.addColorStop(.65,'rgba(10,30,70,.06)');
  halo.addColorStop(1,'rgba(2,4,12,0)');
  X.beginPath();X.arc(cx,cy,r*1.38,0,Math.PI*2);X.fillStyle=halo;X.fill();

  X.save();X.beginPath();X.arc(cx,cy,r,0,Math.PI*2);X.clip();

  const bg=X.createRadialGradient(cx-r*.25,cy+r*.08,0,cx,cy,r*1.02);
  bg.addColorStop(0,'#0c1830');
  bg.addColorStop(.45,'#060d1c');
  bg.addColorStop(.8,'#03060e');
  bg.addColorStop(1,'#010205');
  X.fillStyle=bg;X.fillRect(cx-r*1.2,cy-r*1.2,r*2.4,r*2.4);

  function cont(bx,by,bw,bh,col,alpha,rotA=0){
    const x=((bx+of)%(r*2.2))-r*1.1+cx;
    const gr=X.createRadialGradient(x,by+cy,0,x,by+cy,Math.max(bw,bh)*1.1);
    const rgba=(rgb,a)=>`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
    const base=Array.isArray(col)?col:col.match(/\d+/g).map(Number);
    gr.addColorStop(0,rgba(base,alpha));
    gr.addColorStop(.72,rgba(base,alpha*.5));
    gr.addColorStop(1,'rgba(0,0,0,0)');
    X.beginPath();X.ellipse(x,by+cy,bw,bh,rotA,0,Math.PI*2);X.fillStyle=gr;X.fill();
  }

  cont(-r*.35,-r*.02,r*.42,r*.22,[18,42,52],.42,.08);
  cont(-r*.42,.06,r*.28,r*.16,[22,48,58],.35,-.1);
  cont(-r*.08,.22,r*.36,r*.2,[14,38,48],.38,.05);
  cont(.12,-r*.18,r*.32,r*.18,[16,44,54],.36,0);
  cont(.38,-r*.08,r*.22,r*.14,[20,50,58],.32,.12);
  cont(-r*.55,.32,r*.2,r*.12,[18,46,55],.34,-.15);
  cont(-r*.85,-r*.28,r*.18,r*.12,[14,40,50],.3,0);
  cont(.52,.18,r*.16,r*.1,[22,52,58],.28,0);
  cont(-r*.22,-r*.38,r*.2,r*.11,[12,36,48],.34,.1);
  cont(-r*.65,.42,r*.14,r*.09,[18,44,52],.3,0);
  cont(-r*.12,-r*.22,r*.15,r*.1,[40,55,62],.22,0);
  cont(.28,.38,r*.12,r*.08,[45,58,62],.2,.05);
  cont(-r*.48,-r*.45,r*.12,r*.08,[35,48,55],.22,0);

  const termCx=cx+r*.04;
  X.save();
  X.globalCompositeOperation='screen';
  for(let k=0;k<720;k++){
    const a=(k*137.5)%360*Math.PI/180;
    const rad=(.12+.88*Math.pow((k*73)%100/100,.42))*r;
    let lx=cx+Math.cos(a)*rad*.78+of*.0025*k*.01;
    let ly=cy+Math.sin(a*1.06)*rad*.58;
    if(lx>termCx-r*.06)continue;
    const br=((k*17)%100)/100;
    if(br<.28)continue;
    const s=.35+(k%7)*.22;
    const warm=k%5>2;
    const al=.28+br*.62;
    const rf=warm?255:250,gf=warm?185:195,bf=warm?95:110;
    X.beginPath();
    X.arc(lx,ly,s,0,Math.PI*2);
    X.fillStyle=`rgba(${rf},${gf},${bf},${al*.62})`;
    X.fill();
    if(k%5===0){
      X.beginPath();
      X.arc(lx+(k%4)*.8,ly-(k%5)*.6,s*1.8,0,Math.PI*2);
      X.fillStyle=`rgba(255,205,130,${al*.22})`;
      X.fill();
    }
  }
  for(let j=0;j<180;j++){
    const u=(j*97)%360*Math.PI/180;
    const v=(.25+.75*((j*13)%100)/100)*r;
    const lx=cx+Math.cos(u)*v*.55;
    const ly=cy+Math.sin(u*.95)*v*.48;
    if(lx>termCx-r*.05)continue;
    X.beginPath();
    X.arc(lx,ly,1.1+(j%4)*.4,0,Math.PI*2);
    X.fillStyle=`rgba(255,230,180,${.18+((j*7)%20)/180})`;
    X.fill();
  }
  X.restore();

  X.save();X.globalAlpha=.12;
  const cloudOff=(PL.rot*r*.45)%(r*2.2);
  function cloud(bx,by,bw,bh){
    const cx2=((bx+cloudOff+of*.2)%(r*2.2))-r*1.1+cx;
    const cg=X.createRadialGradient(cx2,by+cy,0,cx2,by+cy,Math.max(bw,bh));
    cg.addColorStop(0,'rgba(255,255,255,.25)');
    cg.addColorStop(1,'rgba(255,255,255,0)');
    X.beginPath();X.ellipse(cx2,by+cy,bw,bh,0,0,Math.PI*2);X.fillStyle=cg;X.fill();
  }
  cloud(-r*.48,-r*.18,r*.26,.06);cloud(.12,-r*.28,r*.18,.05);
  X.restore();

  const day=X.createLinearGradient(cx-r*1.05,cy,cx+r*1.05,cy);
  day.addColorStop(0,'rgba(2,5,12,.92)');
  day.addColorStop(.48,'rgba(4,10,22,.55)');
  day.addColorStop(.62,'rgba(8,18,40,.18)');
  day.addColorStop(.88,'rgba(140,200,255,.18)');
  day.addColorStop(1,'rgba(220,240,255,.32)');
  X.fillStyle=day;X.fillRect(cx-r*1.2,cy-r*1.2,r*2.4,r*2.4);

  const n2=X.createLinearGradient(cx-r,cy,cx+r*.22,cy);
  n2.addColorStop(0,'rgba(0,0,0,.82)');
  n2.addColorStop(.5,'rgba(2,6,14,.2)');
  n2.addColorStop(1,'rgba(0,0,0,0)');
  X.globalAlpha=.88;X.fillStyle=n2;X.fillRect(cx-r*1.2,cy-r*1.2,r*2.4,r*2.4);X.globalAlpha=1;

  X.restore();

  X.save();
  X.beginPath();X.arc(cx,cy,r+1.2,0,Math.PI*2);
  X.strokeStyle='rgba(90,190,255,.55)';X.lineWidth=2.4;
  X.shadowColor='rgba(100,200,255,.75)';X.shadowBlur=22;
  X.stroke();X.shadowBlur=0;
  X.strokeStyle='rgba(220,245,255,.7)';X.lineWidth=1.1;
  X.stroke();
  X.restore();

  X.save();
  X.beginPath();X.arc(cx,cy,r*1.002,Math.PI*.12,Math.PI*.88);
  X.strokeStyle='rgba(160,225,255,.5)';X.lineWidth=4;X.filter='blur(4px)';
  X.stroke();X.filter='none';
  X.restore();

  X.save();X.beginPath();X.arc(cx,cy,r,0,Math.PI*2);X.clip();
  const sp=X.createRadialGradient(cx+r*.34,cy-r*.2,0,cx+r*.28,cy-r*.16,r*.55);
  sp.addColorStop(0,'rgba(255,255,255,.22)');
  sp.addColorStop(.45,'rgba(180,215,255,.1)');
  sp.addColorStop(1,'rgba(0,0,0,0)');
  X.fillStyle=sp;X.fillRect(cx-r,cy-r,r*2,r*2);
  X.restore();
}

function frm(ts){
  T=ts;
  X.clearRect(0,0,C.width,C.height);
  X.fillStyle='#050a18';X.fillRect(0,0,C.width,C.height);
  dneb();
  PL.rot+=PL.rs;
  dstar();
  dplan();
  requestAnimationFrame(frm);
}
requestAnimationFrame(frm);
document.addEventListener('mousemove',e=>{
  PL.px=(e.clientX/innerWidth-.5);
  PL.py=(e.clientY/innerHeight-.5);
});

function chatEnsureWelcome(){
  const box=document.getElementById('chatmsgs');
  if(box.dataset.ready)return;
  box.dataset.ready='1';
  addChatBubble('a','Hi — I can help with roles, matching, and trust on OrbitLink. What would you like to know?');
}
function toggleChatDock(){
  const d=document.getElementById('chatdock');
  const open=!d.classList.contains('open');
  d.classList.toggle('open',open);
  document.getElementById('chatfab').setAttribute('aria-expanded',open?'true':'false');
  if(open){
    chatEnsureWelcome();
    setTimeout(()=>document.getElementById('chatin').focus(),80);
  }
}
function openChatDock(){
  const d=document.getElementById('chatdock');
  d.classList.add('open');
  document.getElementById('chatfab').setAttribute('aria-expanded','true');
  chatEnsureWelcome();
  setTimeout(()=>document.getElementById('chatin').focus(),80);
}
function closeChatDock(){
  document.getElementById('chatdock').classList.remove('open');
  document.getElementById('chatfab').setAttribute('aria-expanded','false');
}
function addChatBubble(side,text){
  const el=document.createElement('div');
  el.className='chat-b '+(side==='u'?'u':'a');
  el.textContent=text;
  document.getElementById('chatmsgs').appendChild(el);
  el.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function botReply(q){
  const t=q.toLowerCase();
  if(/hello|hi|hey|merhaba|selam/.test(t))return 'Hello — select a role card to register, or ask how matching works.';
  if(/role|contractor|supplier|lab|startup|prime/.test(t))return 'Choose Prime, Supplier, Lab, or Startup to shape your profile and capability tags.';
  if(/match|compat|percent|score/.test(t))return 'Match scores compare your TRL, certifications, and capabilities with partner needs.';
  if(/trust|rating|review|star/.test(t))return 'Trust comes from reviews after collaboration. Each account can leave one review and one report per organization.';
  if(/report|complaint|şikayet/.test(t))return 'Reports are limited to one per organization for your account; serious patterns can trigger a review.';
  if(/orbit|what is|nedir/.test(t))return 'OrbitLink links verified space organizations for B2B collaboration — profiles, compatibility, and governance.';
  return 'Try asking about roles, match scores, or trust. You can also scroll down and pick a role to get started.';
}
function sendChat(){
  const inp=document.getElementById('chatin');
  const v=(inp.value||'').trim();
  if(!v)return;
  addChatBubble('u',v);
  inp.value='';
  const a=botReply(v);
  setTimeout(()=>addChatBubble('a',a),360);
}

// ══════════════════════════════════════════════════════════
//  DATA
// ══════════════════════════════════════════════════════════
let curRole='',curStep=1,reqSent=0,selStars=0,curFilter='All';

// Role-specific domains
const ROLE_DOMAINS={
  'Project Owner / Prime Contractor':['Satellite Systems','Launch Vehicle Programs','Space Station / Habitat','Earth Observation Missions','Deep Space Exploration','Defense & Security Space','Scientific Research Missions'],
  'Supplier / Manufacturer':['Structural Components','Propulsion Hardware','Avionics & Electronics','Thermal Management','CubeSat / SmallSat Parts','RF & Antenna Hardware','Composite Structures','Optical Systems'],
  'R&D / Test Laboratory':['EMC/EMI Testing','Thermal Vacuum Testing','Vibration & Shock Testing','Optical Calibration','Materials Research','Software Validation','Clean Room Services','Structural Testing'],
  'SpaceTech Startup':['AI & Data Analytics','In-Space Propulsion','Earth Observation Data','Space Debris Solutions','On-Orbit Servicing','Launch Aggregation','Space Communications','BioTech in Space']
};

// Role-specific capabilities
const ROLE_CAPS={
  'Project Owner / Prime Contractor':['Systems Engineering','Mission Architecture','Budget & Schedule Mgmt','Supply Chain Integration','Risk Management','PDR/CDR Leadership','Payload Integration','Regulatory Compliance','Safety Assessment','Subsystem Oversight'],
  'Supplier / Manufacturer':['RF Systems','PCB Manufacturing','Embedded Systems','Avionics','Composite Materials','CNC Precision','Propulsion Hardware','Thermal Management','Structural Analysis','Quality Assurance','3D Printing / AM','Optical Fabrication'],
  'R&D / Test Laboratory':['Thermal Analysis','EMC/EMI Testing','Clean Room','Vibration Testing','Thermal Vacuum','Optical Testing','Environmental Testing','Simulation & Modelling','Materials Characterization','Non-Destructive Testing'],
  'SpaceTech Startup':['AI / Data Analytics','Telemetry','Ground Station','Software Development','Data Processing','ML / Deep Learning','Cloud Infrastructure','API Integration','Autonomous Systems','Computer Vision']
};

const CERTS_ALL=['ISO 9001','AS9100','ECSS Standards','Clean Room','EMC/EMI','Thermal Vacuum','IPC Standards','DO-178C','MIL-STD','ISO 14001'];
const COLLAB_ALL=['Prime Partnerships','Startup Integration','University R&D','Test / Validation','International Collaboration','Joint Bids'];

// DB: registered users stored by normalized email key
let DB={};
function emailKey(e){return(String(e||'').trim().toLowerCase());}
function loadDB(){
  try{
    const raw=localStorage.getItem('orbitlink_db');
    if(raw) DB=JSON.parse(raw);
  }catch(e){}
}
function persistDB(){
  try{localStorage.setItem('orbitlink_db',JSON.stringify(DB));}catch(e){}
}
loadDB();

const UP={org:'',email:'',country:'Turkey 🇹🇷',domain:'',trl:'TRL 4–6',role:'',caps:[],certs:[],collab:[]};

const NOTIFS=[
  {tp:'info',ic:'🔔',ti:'New Match Available',bo:'CosmoLab Istanbul matches your profile at 89% compatibility.',tm:'2 hours ago'},
  {tp:'success',ic:'✅',ti:'Profile Verified',bo:'Your organization profile has been successfully verified.',tm:'1 day ago'}
];

// Default companies per country and role category
const COS=[
  // Turkey
  {id:1,nm:'Nova Aero Components',tp:'Supplier / Manufacturer',co:'Turkey 🇹🇷',tg:['RF Systems','PCB Manufacturing','Embedded Systems'],cr:['ISO 9001','AS9100'],trl:'TRL 4–7',rat:4.7,rev:23,rep:0,ur:false,m:{cp:95,dm:90,tl:90,ct:100},ov:94},
  {id:2,nm:'CosmoLab Istanbul',tp:'R&D / Test Laboratory',co:'Turkey 🇹🇷',tg:['Thermal Analysis','EMC/EMI Testing','Clean Room'],cr:['Clean Room','Thermal Vacuum'],trl:'TRL 3–7',rat:4.5,rev:17,rep:0,ur:false,m:{cp:88,dm:82,tl:95,ct:90},ov:89},
  {id:3,nm:'TurkSpace Defense',tp:'Project Owner / Prime Contractor',co:'Turkey 🇹🇷',tg:['Systems Engineering','Avionics','Payload Integration'],cr:['AS9100','ISO 9001'],trl:'TRL 7–9',rat:4.9,rev:41,rep:0,ur:false,m:{cp:85,dm:88,tl:80,ct:100},ov:87},
  {id:4,nm:'SatSens Technologies',tp:'SpaceTech Startup',co:'Turkey 🇹🇷',tg:['Antenna Systems','RF Systems','Telemetry'],cr:['IPC Standards','ISO 9001'],trl:'TRL 3–6',rat:4.1,rev:6,rep:0,ur:false,m:{cp:78,dm:72,tl:80,ct:80},ov:79},
  {id:5,nm:'Roketsan Prime',tp:'Project Owner / Prime Contractor',co:'Turkey 🇹🇷',tg:['Mission Architecture','Systems Engineering','Risk Management'],cr:['AS9100','MIL-STD'],trl:'TRL 6–9',rat:4.8,rev:32,rep:0,ur:false,m:{cp:90,dm:92,tl:88,ct:95},ov:91},
  {id:6,nm:'BilimTech Labs',tp:'R&D / Test Laboratory',co:'Turkey 🇹🇷',tg:['Vibration Testing','Materials Characterization','Simulation & Modelling'],cr:['ISO 9001','ECSS Standards'],trl:'TRL 2–6',rat:4.3,rev:11,rep:0,ur:false,m:{cp:82,dm:78,tl:90,ct:85},ov:83},
  // Germany
  {id:7,nm:'OrbitalEdge GmbH',tp:'SpaceTech Startup',co:'Germany 🇩🇪',tg:['AI / Data Analytics','Telemetry','Ground Station'],cr:['IPC Standards'],trl:'TRL 5–8',rat:4.2,rev:9,rep:0,ur:false,m:{cp:80,dm:75,tl:85,ct:70},ov:81},
  {id:8,nm:'PropulTech GmbH',tp:'Supplier / Manufacturer',co:'Germany 🇩🇪',tg:['Propulsion Hardware','Composite Materials','CNC Precision'],cr:['ISO 9001','AS9100'],trl:'TRL 4–6',rat:3.8,rev:12,rep:2,ur:false,m:{cp:72,dm:70,tl:75,ct:65},ov:72},
  {id:9,nm:'Astro Systems AG',tp:'R&D / Test Laboratory',co:'Germany 🇩🇪',tg:['Optical Testing','EMC/EMI Testing','Thermal Vacuum'],cr:['ISO 9001','ECSS Standards'],trl:'TRL 3–8',rat:4.6,rev:28,rep:0,ur:false,m:{cp:86,dm:84,tl:92,ct:88},ov:87},
  {id:10,nm:'SpaceForge Europa',tp:'Project Owner / Prime Contractor',co:'Germany 🇩🇪',tg:['Mission Architecture','Budget & Schedule Mgmt','Regulatory Compliance'],cr:['AS9100','ISO 9001'],trl:'TRL 6–9',rat:4.7,rev:19,rep:0,ur:false,m:{cp:88,dm:86,tl:82,ct:92},ov:88},
  // USA
  {id:11,nm:'Apex Aerospace Inc.',tp:'Project Owner / Prime Contractor',co:'USA 🇺🇸',tg:['Systems Engineering','PDR/CDR Leadership','Payload Integration'],cr:['AS9100','DO-178C'],trl:'TRL 7–9',rat:4.9,rev:55,rep:0,ur:false,m:{cp:92,dm:94,tl:90,ct:98},ov:93},
  {id:12,nm:'NovaStar Composites',tp:'Supplier / Manufacturer',co:'USA 🇺🇸',tg:['Composite Materials','3D Printing / AM','Structural Analysis'],cr:['AS9100','ISO 9001'],trl:'TRL 5–8',rat:4.5,rev:22,rep:0,ur:false,m:{cp:85,dm:80,tl:85,ct:88},ov:84},
  {id:13,nm:'DataOrbit Labs',tp:'SpaceTech Startup',co:'USA 🇺🇸',tg:['AI / Data Analytics','ML / Deep Learning','Data Processing'],cr:['ISO 9001'],trl:'TRL 4–7',rat:4.3,rev:14,rep:0,ur:false,m:{cp:82,dm:76,tl:80,ct:72},ov:80},
  {id:14,nm:'TechTest USA',tp:'R&D / Test Laboratory',co:'USA 🇺🇸',tg:['Vibration Testing','Thermal Vacuum','Non-Destructive Testing'],cr:['MIL-STD','AS9100'],trl:'TRL 4–8',rat:4.6,rev:31,rep:0,ur:false,m:{cp:87,dm:83,tl:91,ct:90},ov:87},
  // France
  {id:15,nm:'ArianeGroup Suppliers',tp:'Supplier / Manufacturer',co:'France 🇫🇷',tg:['Propulsion Hardware','Thermal Management','Optical Fabrication'],cr:['ECSS Standards','AS9100'],trl:'TRL 5–9',rat:4.8,rev:38,rep:0,ur:false,m:{cp:90,dm:88,tl:94,ct:96},ov:92},
  {id:16,nm:'CNES Innovation Hub',tp:'R&D / Test Laboratory',co:'France 🇫🇷',tg:['Optical Calibration','Materials Research','Clean Room'],cr:['ECSS Standards','ISO 9001'],trl:'TRL 3–8',rat:4.7,rev:25,rep:0,ur:false,m:{cp:88,dm:90,tl:88,ct:92},ov:89},
  {id:17,nm:'Thales Alenia Partners',tp:'Project Owner / Prime Contractor',co:'France 🇫🇷',tg:['Mission Architecture','Supply Chain Integration','Safety Assessment'],cr:['AS9100','ISO 9001'],trl:'TRL 7–9',rat:4.9,rev:47,rep:0,ur:false,m:{cp:94,dm:92,tl:90,ct:98},ov:93},
  {id:18,nm:'SkyTech Paris',tp:'SpaceTech Startup',co:'France 🇫🇷',tg:['Earth Observation Data','Cloud Infrastructure','API Integration'],cr:['ISO 9001'],trl:'TRL 4–7',rat:4.2,rev:8,rep:0,ur:false,m:{cp:78,dm:80,tl:78,ct:70},ov:78},
  // Italy
  {id:19,nm:'Leonardo Space Solutions',tp:'Project Owner / Prime Contractor',co:'Italy 🇮🇹',tg:['Systems Engineering','Payload Integration','Regulatory Compliance'],cr:['AS9100','ECSS Standards'],trl:'TRL 6–9',rat:4.8,rev:36,rep:0,ur:false,m:{cp:91,dm:89,tl:88,ct:95},ov:90},
  {id:20,nm:'SpaceRoma Components',tp:'Supplier / Manufacturer',co:'Italy 🇮🇹',tg:['Avionics','PCB Manufacturing','Quality Assurance'],cr:['ISO 9001','AS9100'],trl:'TRL 4–7',rat:4.4,rev:18,rep:0,ur:false,m:{cp:84,dm:80,tl:82,ct:86},ov:83},
  {id:21,nm:'Politecnico Aerospace Lab',tp:'R&D / Test Laboratory',co:'Italy 🇮🇹',tg:['Structural Testing','Simulation & Modelling','Materials Characterization'],cr:['ECSS Standards','ISO 9001'],trl:'TRL 2–7',rat:4.5,rev:21,rep:0,ur:false,m:{cp:85,dm:86,tl:88,ct:84},ov:86},
  {id:22,nm:'OrbitalMilano Startup',tp:'SpaceTech Startup',co:'Italy 🇮🇹',tg:['In-Space Propulsion','Autonomous Systems','Software Development'],cr:['ISO 9001'],trl:'TRL 3–6',rat:4.0,rev:7,rep:0,ur:false,m:{cp:76,dm:74,tl:76,ct:68},ov:75},
  // UK
  {id:23,nm:'SSTL Partners Ltd',tp:'Supplier / Manufacturer',co:'UK 🇬🇧',tg:['RF & Antenna Hardware','Embedded Systems','Optical Systems'],cr:['AS9100','ISO 9001'],trl:'TRL 5–8',rat:4.6,rev:29,rep:0,ur:false,m:{cp:88,dm:84,tl:86,ct:90},ov:87},
  {id:24,nm:'Harwell Space Labs',tp:'R&D / Test Laboratory',co:'UK 🇬🇧',tg:['Environmental Testing','EMC/EMI Testing','Thermal Vacuum'],cr:['ISO 9001','ECSS Standards'],trl:'TRL 3–8',rat:4.5,rev:24,rep:0,ur:false,m:{cp:86,dm:82,tl:90,ct:88},ov:86},
  {id:25,nm:'OneSpace UK',tp:'SpaceTech Startup',co:'UK 🇬🇧',tg:['Space Debris Solutions','On-Orbit Servicing','ML / Deep Learning'],cr:['ISO 9001'],trl:'TRL 4–7',rat:4.3,rev:12,rep:0,ur:false,m:{cp:80,dm:78,tl:82,ct:72},ov:80},
  {id:26,nm:'BAE Space Prime',tp:'Project Owner / Prime Contractor',co:'UK 🇬🇧',tg:['Mission Architecture','Systems Engineering','Defense & Security Space'],cr:['AS9100','MIL-STD'],trl:'TRL 7–9',rat:4.8,rev:43,rep:0,ur:false,m:{cp:92,dm:90,tl:88,ct:96},ov:91},
  // UAE
  {id:27,nm:'Mohamed bin Rashid Space',tp:'Project Owner / Prime Contractor',co:'UAE 🇦🇪',tg:['Mission Architecture','Systems Engineering','Deep Space Exploration'],cr:['AS9100','ISO 9001'],trl:'TRL 6–9',rat:4.9,rev:28,rep:0,ur:false,m:{cp:91,dm:93,tl:86,ct:94},ov:91},
  {id:28,nm:'Emirates Avionics',tp:'Supplier / Manufacturer',co:'UAE 🇦🇪',tg:['Avionics','Embedded Systems','RF Systems'],cr:['AS9100','ISO 9001'],trl:'TRL 5–8',rat:4.5,rev:15,rep:0,ur:false,m:{cp:85,dm:82,tl:84,ct:88},ov:85},
  {id:29,nm:'Khalifa University Lab',tp:'R&D / Test Laboratory',co:'UAE 🇦🇪',tg:['Materials Research','Simulation & Modelling','Optical Calibration'],cr:['ECSS Standards','ISO 9001'],trl:'TRL 2–7',rat:4.4,rev:11,rep:0,ur:false,m:{cp:83,dm:85,tl:86,ct:82},ov:84},
  {id:30,nm:'Bayanat Space Analytics',tp:'SpaceTech Startup',co:'UAE 🇦🇪',tg:['AI / Data Analytics','Earth Observation Data','Cloud Infrastructure'],cr:['ISO 9001'],trl:'TRL 4–7',rat:4.2,rev:9,rep:0,ur:false,m:{cp:79,dm:81,tl:78,ct:72},ov:79},
];

function syncUserToCOS(){
  if(!UP||!UP.email)return;
  const ek=emailKey(UP.email);
  let existing=COS.find(c=>c._user&&emailKey(c._email)===ek);
  const nid=existing?existing.id:Math.max(0,...COS.map(c=>c.id||0))+1;
  const entry={
    id:nid,nm:UP.org,tp:UP.role,co:UP.country,
    tg:[...(UP.caps||[])],cr:[...(UP.certs||[])],trl:UP.trl,
    rat:existing?existing.rat:4.5,rev:existing?existing.rev:0,rep:existing?existing.rep||0:0,ur:existing?!!existing.ur:false,
    m:{cp:85,dm:85,tl:85,ct:85},ov:85,_user:true,_email:ek
  };
  if(existing)Object.assign(existing,entry);
  else COS.push(entry);
}

(function hydrateCOSfromDB(){
  Object.keys(DB).forEach(k=>{
    const u=DB[k];
    if(!u||!u.org) return;
    let existing=COS.find(c=>c._user&&emailKey(c._email)===k);
    const nid=existing?existing.id:Math.max(0,...COS.map(c=>c.id||0))+1;
    const entry={
      id:nid,nm:u.org,tp:u.role,co:u.country,tg:[...(u.caps||[])],cr:[...(u.certs||[])],trl:u.trl,
      rat:existing?existing.rat:4.5,rev:existing?existing.rev:0,rep:existing?existing.rep||0:0,ur:existing?!!existing.ur:false,
      m:{cp:85,dm:85,tl:85,ct:85},ov:85,_user:true,_email:k
    };
    if(existing) Object.assign(existing,entry);
    else COS.push(entry);
  });
})();

function feedbackPairKey(cid){
  const ek=emailKey(UP.email||'');
  if(!ek)return '';
  return ek+'::'+cid;
}
function loadReviewsMap(){try{return JSON.parse(localStorage.getItem('orbitlink_reviews')||'{}');}catch(e){return{};}}
function saveReviewsMap(m){try{localStorage.setItem('orbitlink_reviews',JSON.stringify(m));}catch(e){}}
function loadReportsMap(){try{return JSON.parse(localStorage.getItem('orbitlink_reports')||'{}');}catch(e){return{};}}
function saveReportsMap(m){try{localStorage.setItem('orbitlink_reports',JSON.stringify(m));}catch(e){}}
function getStoredReview(cid){
  const k=feedbackPairKey(cid);
  if(!k)return null;
  return loadReviewsMap()[k]||null;
}
function getStoredReport(cid){
  const k=feedbackPairKey(cid);
  if(!k)return null;
  return loadReportsMap()[k]||null;
}
function persistCompanyStats(){
  const s={};
  COS.forEach(c=>{s[c.id]={rat:c.rat,rev:c.rev,rep:c.rep||0,ur:!!c.ur};});
  try{localStorage.setItem('orbitlink_company_stats',JSON.stringify(s));}catch(e){}
}
function loadCompanyStats(){
  try{
    const s=JSON.parse(localStorage.getItem('orbitlink_company_stats')||'{}');
    Object.keys(s).forEach(id=>{
      const c=COS.find(x=>x.id===+id);
      if(c){
        if(typeof s[id].rat==='number')c.rat=s[id].rat;
        if(typeof s[id].rev==='number')c.rev=s[id].rev;
        if(typeof s[id].rep==='number')c.rep=s[id].rep;
        if(s[id].ur)c.ur=true;
      }
    });
  }catch(e){}
}
function rrLabel(v){
  const m={misleading:'Misleading profile / false capabilities',certs:'Invalid or missing certifications',unresponsive:'Unresponsive after collaboration request',mismatch:'Delivery / capability mismatch',other:'Other'};
  return m[v]||v||'—';
}
loadCompanyStats();

// ══════════════════════════════════════════════════════════
//  NAV
// ══════════════════════════════════════════════════════════
function sp(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));document.getElementById(id).classList.add('on');}
function goHero(){sp('ph');}
function closeMregSafe(){cm('mreg');}

// ══════════════════════════════════════════════════════════
//  MODAL
// ══════════════════════════════════════════════════════════
function om(id){document.getElementById(id).classList.add('open');}
function cm(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.mb').forEach(b=>b.addEventListener('click',e=>{if(e.target===b)b.classList.remove('open');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.mb.open').forEach(m=>m.classList.remove('open'));});

// ══════════════════════════════════════════════════════════
//  PASSWORD
// ══════════════════════════════════════════════════════════
function togglePw(id,btn){
  const el=document.getElementById(id);
  if(el.type==='password'){el.type='text';btn.textContent='🙈';}
  else{el.type='password';btn.textContent='👁';}
}
function checkPw(){
  const v=document.getElementById('fpw').value;
  const checks={len:v.length>=8,up:/[A-Z]/.test(v),num:/[0-9]/.test(v),sym:/[^a-zA-Z0-9]/.test(v)};
  const map={len:'ph-len',up:'ph-up',num:'ph-num',sym:'ph-sym'};
  const labels={len:'8+ chars',up:'Uppercase',num:'Number',sym:'Symbol'};
  Object.keys(checks).forEach(k=>{
    const el=document.getElementById(map[k]);
    el.className=checks[k]?'ok':'fail';
    el.textContent=(checks[k]?'✓ ':'✗ ')+labels[k];
  });
  checkPwMatch();
}
function checkPwMatch(){
  const pw=document.getElementById('fpw').value;
  const pc=document.getElementById('fpwc').value;
  const err=document.getElementById('pw-err');
  if(pc.length>0&&pw!==pc){err.style.display='block';}
  else{err.style.display='none';}
}
function pwValid(){
  const v=document.getElementById('fpw').value;
  return v.length>=8&&/[A-Z]/.test(v)&&/[0-9]/.test(v)&&/[^a-zA-Z0-9]/.test(v);
}

// ══════════════════════════════════════════════════════════
//  CAP ITEMS (checkbox style)
// ══════════════════════════════════════════════════════════
function toggleCap(el){el.classList.toggle('sel');}
function buildCapList(containerId,items){
  const c=document.getElementById(containerId);c.innerHTML='';
  items.forEach(item=>{
    const d=document.createElement('div');d.className='cap-item';
    d.onclick=function(){toggleCap(this);};
    d.innerHTML=`<div class="cap-cb"></div><span class="cap-lbl">${item}</span>`;
    c.appendChild(d);
  });
}
function getSelected(containerId){
  return [...document.querySelectorAll(`#${containerId} .cap-item.sel`)].map(e=>e.querySelector('.cap-lbl').textContent);
}

// ══════════════════════════════════════════════════════════
//  REGISTER
// ══════════════════════════════════════════════════════════
function openReg(role,num){
  curRole=role;curStep=1;
  document.getElementById('rbd').textContent=`${num} — ${role}`;
  document.getElementById('rtit').textContent='Join OrbitLink';
  document.getElementById('rsub').textContent=`Register as: ${role}`;
  // Populate role-specific domain
  const domSel=document.getElementById('fd');
  domSel.innerHTML='';
  (ROLE_DOMAINS[role]||[]).forEach(d=>{const o=document.createElement('option');o.textContent=d;domSel.appendChild(o);});
  document.getElementById('lbl-domain').textContent='Primary Space Domain';
  // Populate capabilities
  buildCapList('ctg',ROLE_CAPS[role]||[]);
  buildCapList('crtg',CERTS_ALL);
  updDots();
  document.querySelectorAll('.fs').forEach(s=>s.classList.remove('act'));
  document.getElementById('s1').classList.add('act');
  document.querySelectorAll('#mreg .tb').forEach((b,i)=>b.classList.toggle('act',i===0));
  document.querySelectorAll('#mreg .fp').forEach((p,i)=>p.classList.toggle('act',i===0));
  om('mreg');
}
function sw(pid,btn){
  document.querySelectorAll('#mreg .tb').forEach(b=>b.classList.remove('act'));btn.classList.add('act');
  document.querySelectorAll('#mreg .fp').forEach(p=>p.classList.remove('act'));
  document.getElementById(pid).classList.add('act');
}
function updDots(){
  const d=document.getElementById('sdots');d.innerHTML='';
  [1,2,3].forEach(i=>{const e=document.createElement('div');e.className='sd'+(i===curStep?' act':i<curStep?' done':'');d.appendChild(e);});
}
function ns(n){document.querySelectorAll('.fs').forEach(s=>s.classList.remove('act'));curStep=n;document.getElementById('s'+n).classList.add('act');updDots();}

function goStep2(){
  const org=document.getElementById('fo').value.trim();
  const email=document.getElementById('fe').value.trim();
  if(!org){toast('tw','Required Field','Please enter your organization name.');return;}
  if(!email||!/\S+@\S+\.\S+/.test(email)){toast('tw','Invalid Email','Please enter a valid work email.');return;}
  ns(2);
}
function goStep3(){
  const caps=getSelected('ctg');
  if(caps.length===0){toast('tw','Capabilities Required','Please select at least one technical capability to continue.');return;}
  ns(3);
}

function creg(){
  if(!pwValid()){toast('tw','Weak Password','Password must be 8+ chars with uppercase, number, and symbol.');return;}
  const pw=document.getElementById('fpw').value;
  const pc=document.getElementById('fpwc').value;
  if(pw!==pc){toast('tw','Password Mismatch','Passwords do not match. Please try again.');return;}

  UP.org=document.getElementById('fo').value||'My Organization';
  UP.email=document.getElementById('fe').value||'user@org.com';
  UP.country=document.getElementById('fc').value;
  UP.domain=document.getElementById('fd').value;
  UP.trl=document.getElementById('ft').value;
  UP.role=curRole;
  UP.caps=getSelected('ctg');
  UP.certs=getSelected('crtg');
  UP.collab=getSelected('collab-tg');

  // Save to DB (normalized key)
  DB[emailKey(UP.email)]={...UP};
  persistDB();
  syncUserToCOS();

  // Reset form
  document.getElementById('fo').value='';
  document.getElementById('fe').value='';
  document.getElementById('fpw').value='';
  document.getElementById('fpwc').value='';
  document.getElementById('pw-err').style.display='none';
  ['ph-len','ph-up','ph-num','ph-sym'].forEach(id=>{
    const el=document.getElementById(id);
    el.className='fail';
    el.textContent=(id==='ph-len'?'✗ 8+ chars':id==='ph-up'?'✗ Uppercase':id==='ph-num'?'✗ Number':'✗ Symbol');
  });

  cm('mreg');
  enterDash();
}

function clog(){
  const emailRaw=document.getElementById('le').value.trim();
  if(!emailRaw){toast('tw','Email Required','Please enter your work email.');return;}
  const ek=emailKey(emailRaw);
  if(DB[ek]){
    Object.assign(UP,DB[ek]);
    UP.email=DB[ek].email||emailRaw;
  }else{
    const role=curRole||'Supplier / Manufacturer';
    UP.email=emailRaw;
    UP.org=emailRaw.split('@')[0]||'User';
    UP.role=role;
    UP.country='Turkey 🇹🇷';
    UP.domain=(ROLE_DOMAINS[role]||['General'])[0];
    UP.trl='TRL 4–6 (Prototype)';
    UP.caps=(ROLE_CAPS[role]||[]).slice(0,2);
    UP.certs=[];
    UP.collab=[];
    toast('ti','New session','No saved profile for this email — showing starter data. Register to save your company.');
  }
  document.getElementById('le').value='';
  document.getElementById('lpw').value='';
  cm('mreg');
  enterDash();
}

function enterDash(){
  const ab=UP.org.charAt(0).toUpperCase();
  ['sbav','pav2'].forEach(id=>document.getElementById(id).textContent=ab);
  document.getElementById('sbn').textContent=UP.org;
  document.getElementById('sbr').textContent=UP.role;
  document.getElementById('nrb').textContent=UP.role;
  // Sidebar profile
  document.getElementById('pon2').textContent=UP.org;
  document.getElementById('prd2').textContent=UP.role;
  document.getElementById('pco2').textContent=UP.country;
  document.getElementById('pem2').textContent=UP.email;
  document.getElementById('ptrl2').textContent=UP.trl;
  document.getElementById('pdom2').textContent=UP.domain;
  document.getElementById('pcerts2').textContent=UP.certs&&UP.certs.length?UP.certs.join(', '):'—';
  document.getElementById('pcollab2').textContent=UP.collab&&UP.collab.length?UP.collab.join(', '):'—';
  const ce=document.getElementById('pcaps2');ce.innerHTML='';
  (UP.caps||[]).forEach(c=>{const t=document.createElement('div');t.className='cap-tag-display';t.textContent=c;ce.appendChild(t);});
  const myCo=COS.find(c=>c._user&&emailKey(c._email)===emailKey(UP.email));
  const trEl=document.getElementById('ptrust');
  if(trEl)trEl.textContent=myCo&&myCo.rev>0?`⭐ ${myCo.rat} (${myCo.rev} reviews)`:'⭐ New — build trust with collaborations';
  rmatch();rexp('','All');rnot();
  sp('pd');
  stab('matches',document.querySelectorAll('.sbi')[0]);
}

// ══════════════════════════════════════════════════════════
//  EDIT PROFILE
// ══════════════════════════════════════════════════════════
function openEditProfile(){
  document.getElementById('efo').value=UP.org;
  document.getElementById('efe').value=UP.email;
  document.getElementById('efc').value=UP.country;
  // Domain
  const efd=document.getElementById('efd');
  efd.innerHTML='';
  (ROLE_DOMAINS[UP.role]||[]).forEach(d=>{const o=document.createElement('option');o.textContent=d;efd.appendChild(o);});
  efd.value=UP.domain;
  document.getElementById('eft').value=UP.trl;
  // Build cap lists with current selections
  buildCapList('ectg',ROLE_CAPS[UP.role]||[]);
  (UP.caps||[]).forEach(cap=>{
    [...document.querySelectorAll('#ectg .cap-item')].forEach(el=>{
      if(el.querySelector('.cap-lbl').textContent===cap)el.classList.add('sel');
    });
  });
  buildCapList('ecrtg',CERTS_ALL);
  (UP.certs||[]).forEach(cert=>{
    [...document.querySelectorAll('#ecrtg .cap-item')].forEach(el=>{
      if(el.querySelector('.cap-lbl').textContent===cert)el.classList.add('sel');
    });
  });
  buildCapList('ecollab',COLLAB_ALL);
  (UP.collab||[]).forEach(col=>{
    [...document.querySelectorAll('#ecollab .cap-item')].forEach(el=>{
      if(el.querySelector('.cap-lbl').textContent===col)el.classList.add('sel');
    });
  });
  om('medit');
}

function saveEdit(){
  const caps=getSelected('ectg');
  if(caps.length===0){toast('tw','Capabilities Required','Please select at least one capability.');return;}
  UP.org=document.getElementById('efo').value||UP.org;
  UP.email=document.getElementById('efe').value||UP.email;
  UP.country=document.getElementById('efc').value;
  UP.domain=document.getElementById('efd').value;
  UP.trl=document.getElementById('eft').value;
  UP.caps=caps;
  UP.certs=getSelected('ecrtg');
  UP.collab=getSelected('ecollab');
  DB[emailKey(UP.email)]={...UP};
  persistDB();
  syncUserToCOS();
  cm('medit');
  enterDash();
  toast('ts','Profile Updated ✅','Your profile has been successfully saved and updated across the ecosystem.');
}

// ══════════════════════════════════════════════════════════
//  TABS
// ══════════════════════════════════════════════════════════
function stab(tid,btn){
  document.querySelectorAll('.mc').forEach(t=>t.classList.remove('act'));
  const tmap={matches:'tm',explore:'te',notifications:'tn',profile:'tpr'};
  document.getElementById(tmap[tid]||'tm').classList.add('act');
  document.querySelectorAll('.sbi').forEach(b=>b.classList.remove('act'));
  if(btn)btn.classList.add('act');
}

// ══════════════════════════════════════════════════════════
//  CARDS
// ══════════════════════════════════════════════════════════
function bcard(c,bars){
  const d=document.createElement('div');d.className='mcard';
  const urb=c.ur?`<div class="urbdg">⚠ Under Review</div>`:'';
  const br=bars?`<div class="bars">
    <div class="br"><span class="bl">Capability</span><div class="bt"><div class="bf" style="width:${c.m.cp}%"></div></div><span class="bp">${c.m.cp}%</span></div>
    <div class="br"><span class="bl">Domain</span><div class="bt"><div class="bf" style="width:${c.m.dm}%"></div></div><span class="bp">${c.m.dm}%</span></div>
    <div class="br"><span class="bl">TRL</span><div class="bt"><div class="bf" style="width:${c.m.tl}%"></div></div><span class="bp">${c.m.tl}%</span></div>
    <div class="br"><span class="bl">Cert</span><div class="bt"><div class="bf" style="width:${c.m.ct}%"></div></div><span class="bp">${c.m.ct}%</span></div>
  </div>`:'';
  const hasRev=!!getStoredReview(c.id);
  const hasRep=!!getStoredReport(c.id);
  d.innerHTML=`${urb}
  <div class="mct">
    <div><div class="cn">${c.nm}</div><div class="ct">${c.tp} · ${c.co}</div></div>
    <div class="msb"><div class="spct">${c.ov}%</div><div class="slbl">Match</div></div>
  </div>
  ${br}
  <div class="ctags">${c.tg.map(t=>`<div class="ctag">${t}</div>`).join('')}</div>
  <div class="cf">
    <div class="crat"><span class="stars">${'★'.repeat(Math.floor(c.rat))}${'☆'.repeat(5-Math.floor(c.rat))}</span><span class="rc2">${c.rat} (${c.rev})</span></div>
    <div class="ca">
      <button type="button" class="bc bconn" onclick="ocolm(${c.id})">Request →</button>
      <button type="button" class="bc" style="background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.2);color:var(--cyan);font-family:var(--ff-head);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;padding:.28rem .55rem;border-radius:2px;cursor:pointer;${hasRev?'opacity:.88':''}" onclick="oratm(${c.id})">${hasRev?'View review':'Rate'}</button>
      <button type="button" class="bc brep" title="${hasRep?'Report already filed for your account':'Report organization'}" onclick="orptm(${c.id})" style="${hasRep?'opacity:.5;border-color:rgba(0,229,160,.35);color:rgba(0,229,160,.85);':''}">${hasRep?'✓':'⚑'}</button>
    </div>
  </div>`;
  return d;
}

function rmatch(){
  const g=document.getElementById('mgrid');g.innerHTML='';
  [...COS].sort((a,b)=>b.ov-a.ov).forEach(c=>g.appendChild(bcard(c,true)));
}

let curSearch='';
function applyFilters(){
  const country=document.getElementById('countryFilter').value;
  const sort=document.getElementById('sortMode').value;
  rexp(curSearch,curFilter,country,sort);
}

function fexp(v){curSearch=v.toLowerCase();applyFilters();}
function setF(tp,btn){curFilter=tp;document.querySelectorAll('.fbt').forEach(b=>b.classList.remove('act'));btn.classList.add('act');applyFilters();}

function rexp(f='',tp='All',country='',sort='match'){
  const g=document.getElementById('egrid');g.innerHTML='';
  let l=[...COS];
  if(tp!=='All')l=l.filter(c=>c.tp===tp);
  if(country)l=l.filter(c=>c.co===country);
  if(f)l=l.filter(c=>c.nm.toLowerCase().includes(f)||c.tg.some(t=>t.toLowerCase().includes(f)));
  if(sort==='match')l.sort((a,b)=>b.ov-a.ov);
  else if(sort==='rating')l.sort((a,b)=>b.rat-a.rat);
  else if(sort==='name')l.sort((a,b)=>a.nm.localeCompare(b.nm));
  else if(sort==='country')l.sort((a,b)=>a.co.localeCompare(b.co));
  l.forEach(c=>g.appendChild(bcard(c,false)));
}

// ══════════════════════════════════════════════════════════
//  NOTIFICATIONS
// ══════════════════════════════════════════════════════════
function rnot(){
  const l=document.getElementById('nlist');l.innerHTML='';
  NOTIFS.forEach(n=>{
    const d=document.createElement('div');
    d.className=`ni ni${n.tp==='info'?'i':n.tp==='success'?'s':'t2'}`;
    d.innerHTML=`<div class="nic">${n.ic}</div><div><div class="nit">${n.ti}</div><div class="nib">${n.bo}</div><div style="font-size:.6rem;color:rgba(255,255,255,.22);font-family:var(--ff-mono);margin-top:.35rem;">${n.tm}</div></div>`;
    l.appendChild(d);
  });
  document.getElementById('nbdg').textContent=NOTIFS.length;
}
function anot(tp,ic,ti,bo,pct){
  const pm=pct?`<span class="nim">MATCH: ${pct}%</span>`:'';
  NOTIFS.unshift({tp,ic,ti,bo:bo+pm,tm:'Just now'});rnot();
}

// ══════════════════════════════════════════════════════════
//  COLLAB
// ══════════════════════════════════════════════════════════
let tco=null;
function ocolm(id){
  tco=COS.find(c=>c.id===id);
  document.getElementById('clan').textContent=tco.nm;
  document.getElementById('clat').textContent=tco.tp;
  document.getElementById('clam').textContent=`MATCH: ${tco.ov}%`;
  document.getElementById('clt').value='';
  document.getElementById('cld').value='';
  om('mcol');
}
function scol(){
  if(!tco)return;
  cm('mcol');reqSent++;
  document.getElementById('rsc').textContent=reqSent;
  toast('ts','Request Sent ✅',`Your request has been sent to ${tco.nm}. Expected response: 3–5 business days.`);
  anot('success','📨',`Request Delivered to ${tco.nm}`,'Your request was sent. Response expected within 3–5 business days.');
  setTimeout(()=>anot('info','🤝',`${UP.org||'A company'} sent you a collaboration request`,'New collaboration request received. ',tco.ov),2000);
}

// ══════════════════════════════════════════════════════════
//  REPORT
// ══════════════════════════════════════════════════════════
let rptcid=null;
function orptm(id){
  const c=COS.find(x=>x.id===id);
  const nm=c?c.nm:'';
  rptcid=id;
  document.getElementById('rtn').textContent=`Reporting: ${nm}`;
  const prev=getStoredReport(id);
  const fp=document.getElementById('rpt-form-wrap');
  const pw=document.getElementById('rpt-prev-wrap');
  const tit=document.getElementById('rpt-tit');
  tit.textContent=prev?'Your report':'Report Profile';
  if(prev){
    pw.style.display='block';
    fp.style.display='none';
    const dt=prev.at?new Date(prev.at).toLocaleString():'';
    document.getElementById('rpt-prev-detail').textContent=rrLabel(prev.cat)+(dt?` · ${dt}`:'');
  }else{
    pw.style.display='none';
    fp.style.display='block';
    document.querySelectorAll('input[name=rr]').forEach(r=>r.checked=false);
  }
  om('mrpt');
}
function srpt(){
  const c=COS.find(x=>x.id===rptcid);if(!c)return;
  const ek=emailKey(UP.email||'');
  if(!ek){toast('tw','Sign in required','Please sign in from the role cards to submit a report.');return;}
  const k=feedbackPairKey(rptcid);
  if(loadReportsMap()[k]){toast('tw','Already reported','You have already submitted a report for this organization.');return;}
  const sel=document.querySelector('#mrpt input[name=rr]:checked');
  if(!sel){toast('tw','Select a reason','Please choose a report category.');return;}
  const repMap=loadReportsMap();
  repMap[k]={cat:sel.value,at:Date.now()};
  saveReportsMap(repMap);
  c.rep=(c.rep||0)+1;
  persistCompanyStats();
  cm('mrpt');
  if(c.rep>=3&&!c.ur){c.ur=true;persistCompanyStats();toast('tw','Account Under Review ⚠',`${c.nm} has been placed under review after multiple reports.`);anot('warn','🚨','Account Under Review',`${c.nm} has been placed under review.`);}
  else{toast('ti','Report Submitted','Your report has been recorded.');}
  rmatch();applyFilters();
}

// ══════════════════════════════════════════════════════════
//  RATING
// ══════════════════════════════════════════════════════════
let ratcid=null;
function fillPrevStars(containerId,n){
  const el=document.getElementById(containerId);
  if(!el)return;
  el.innerHTML=[1,2,3,4,5].map(i=>`<span class="si${i<=n?' on':''}" data-v="${i}">★</span>`).join('');
}
function oratm(id){
  const c=COS.find(x=>x.id===id);
  ratcid=id;
  document.getElementById('ratn').textContent=c?c.nm:'';
  const prev=getStoredReview(id);
  const pwrap=document.getElementById('rat-prev-wrap');
  const nwrap=document.getElementById('rat-new-wrap');
  const tit=document.getElementById('rat-tit');
  if(prev){
    tit.textContent='Your review';
    pwrap.style.display='block';
    nwrap.style.display='none';
    fillPrevStars('strd-prev',prev.stars||0);
    document.getElementById('rat-prev-note').textContent=prev.text||'No additional comment was provided.';
  }else{
    tit.textContent='Leave a Review';
    pwrap.style.display='none';
    nwrap.style.display='block';
    selStars=0;
    updStar();
    document.getElementById('ratcm').value='';
  }
  om('mrat');
}
document.getElementById('strd').addEventListener('click',function(e){
  const t=e.target.closest('.si');
  if(!t)return;
  selStars=+t.dataset.v;
  updStar();
});
function updStar(){
  const lb=['','Poor','Fair','Good','Very Good','Excellent'];
  document.querySelectorAll('#strd .si').forEach(el=>el.classList.toggle('on',+el.dataset.v<=selStars));
  document.getElementById('strl').textContent=lb[selStars]||'Tap a star to rate';
}
function srat(){
  const ek=emailKey(UP.email||'');
  if(!ek){toast('tw','Sign in required','Please complete sign-in to leave a review.');return;}
  if(getStoredReview(ratcid)){toast('tw','Review on file','You already submitted a review for this organization. Open Rate again to see it.');return;}
  if(!selStars){toast('tw','No Rating','Please select a star rating.');return;}
  const c=COS.find(x=>x.id===ratcid);
  if(c){c.rat=Math.round((c.rat*c.rev+selStars)/(c.rev+1)*10)/10;c.rev++;}
  const rm=loadReviewsMap();
  rm[feedbackPairKey(ratcid)]={stars:selStars,text:(document.getElementById('ratcm').value||'').trim(),at:Date.now()};
  saveReviewsMap(rm);
  persistCompanyStats();
  cm('mrat');
  toast('ts','Review Submitted','Thank you — one review per organization is stored for your account.');
  rmatch();applyFilters();
}

// ══════════════════════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════════════════════
function toast(tp,ti,bo){
  const t=document.createElement('div');t.className=`toast ${tp}`;
  t.innerHTML=`<div class="toast-title">${ti}</div><div class="toast-body">${bo}</div>`;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),5000);
}
