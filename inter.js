
const PLANETS = [
  { name:'Mercury', cardId:'card-mercury', orbitRadius:0.079, orbitPeriod:6,  size:6,  color:'#b0a090', glow:'rgba(176,160,144,0.7)', gradient:'radial-gradient(circle at 35% 35%,#c8bdb0,#7a6e6a 50%,#4a4340)', hasRings:false },
  { name:'Venus',   cardId:'card-venus',   orbitRadius:0.116, orbitPeriod:10, size:9,  color:'#e8c070', glow:'rgba(232,192,112,0.7)', gradient:'radial-gradient(circle at 35% 35%,#f5deb3,#e8b96a 45%,#c49a2e)', hasRings:false },
  { name:'Earth',   cardId:'card-earth',   orbitRadius:0.153, orbitPeriod:15, size:9,  color:'#4fc3f7', glow:'rgba(79,195,247,0.7)',  gradient:'radial-gradient(circle at 35% 35%,#4fc3f7,#1565c0 40%,#2e7d32 70%,#1b5e20)', hasRings:false },
  { name:'Mars',    cardId:'card-mars',    orbitRadius:0.192, orbitPeriod:22, size:7,  color:'#ef9a9a', glow:'rgba(239,154,154,0.7)', gradient:'radial-gradient(circle at 35% 35%,#ef9a9a,#c62828 50%,#7b1818)', hasRings:false },
  { name:'Jupiter', cardId:'card-jupiter', orbitRadius:0.253, orbitPeriod:38, size:18, color:'#f0c987', glow:'rgba(240,201,135,0.7)', gradient:'radial-gradient(circle at 35% 35%,#f0c987,#c8860a 30%,#8b5e1a 60%,#c8860a 80%,#8b5e1a)', hasRings:false },
  { name:'Saturn',  cardId:'card-saturn',  orbitRadius:0.322, orbitPeriod:60, size:15, color:'#f4e0a0', glow:'rgba(244,224,160,0.7)', gradient:'radial-gradient(circle at 35% 35%,#f4e0a0,#c4a035 50%,#8a6f20)', hasRings:true },
  { name:'Uranus',  cardId:'card-uranus',  orbitRadius:0.390, orbitPeriod:88, size:12, color:'#b2ebf2', glow:'rgba(178,235,242,0.7)', gradient:'radial-gradient(circle at 35% 35%,#b2ebf2,#26c6da 50%,#00838f)', hasRings:false },
  { name:'Neptune', cardId:'card-neptune', orbitRadius:0.455, orbitPeriod:120,size:11, color:'#80cbc4', glow:'rgba(21,101,192,0.7)',  gradient:'radial-gradient(circle at 35% 35%,#80cbc4,#1565c0 40%,#0d47a1)', hasRings:false },
];


function rand(min, max) { return Math.random() * (max - min) + min; }


const cDot = document.getElementById('cDot');
const cRing = document.getElementById('cRing');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cDot.style.left=mx+'px'; cDot.style.top=my+'px';
});
function animRing(){
  rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
  cRing.style.left=rx+'px'; cRing.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,[data-tilt]').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cRing.style.width='56px'; cRing.style.height='56px';
    cRing.style.borderColor='rgba(255,209,102,0.7)';
    cDot.style.transform='translate(-50%,-50%) scale(1.5)';
  });
  el.addEventListener('mouseleave',()=>{
    cRing.style.width='36px'; cRing.style.height='36px';
    cRing.style.borderColor='rgba(160,184,255,0.6)';
    cDot.style.transform='translate(-50%,-50%) scale(1)';
  });
});


const bgEl = document.getElementById('bg-parallax');
document.addEventListener('mousemove', e => {
  const x=(e.clientX/window.innerWidth-0.5)*14;
  const y=(e.clientY/window.innerHeight-0.5)*10;
  bgEl.style.transform=`translate(${x}px,${y}px) scale(1.05)`;
});
window.addEventListener('scroll', ()=>{
  bgEl.style.transform=`translateY(${window.scrollY*0.22}px) scale(1.05)`;
});


(function buildSolarSystem(){
  const container = document.getElementById('solarSystem');
  const cW = container.offsetWidth;
  const half = cW / 2;

  PLANETS.forEach((p) => {
    const r = p.orbitRadius * cW; // orbit radius in px

    /* orbit ring */
    const ring = document.createElement('div');
    ring.className = 'orbit-ring';
    ring.style.width  = r * 2 + 'px';
    ring.style.height = r * 2 + 'px';
    container.appendChild(ring);

    /* spinning wrapper — rotates around sun */
    const orbitWrap = document.createElement('div');
    orbitWrap.className = 'planet-orbit-wrap';
    orbitWrap.style.width         = r * 2 + 'px';
    orbitWrap.style.height        = r * 2 + 'px';
    orbitWrap.style.animationDuration = p.orbitPeriod + 's';
    orbitWrap.style.animationDelay   = '-' + rand(0, p.orbitPeriod) + 's';

    /* planet dot positioned at top of orbit circle */
    const dot = document.createElement('div');
    dot.className = 'planet-dot';
    dot.style.width  = p.size + 'px';
    dot.style.height = p.size + 'px';
    dot.style.background = p.gradient;
    dot.style.boxShadow  = `0 0 ${p.size * 2}px ${p.glow}, 0 0 ${p.size}px ${p.glow}`;
    dot.style.top  = '0px';
    dot.style.left = '50%';
    dot.style.transform = `translate(-50%, -${p.size / 2}px)`;
    dot.title = p.name;

    /* counter-rotate label so it stays readable */
    const label = document.createElement('span');
    label.className = 'planet-label';
    label.textContent = p.name;

    /* hover: enlarge dot + show label */
    dot.addEventListener('mouseenter', () => {
      dot.style.transform = `translate(-50%, -${p.size / 2}px) scale(1.8)`;
      dot.style.boxShadow = `0 0 ${p.size * 4}px ${p.glow}, 0 0 ${p.size * 2}px ${p.glow}`;
      label.style.opacity = '1';
      label.style.color   = '#a0b8ff';
    });
    dot.addEventListener('mouseleave', () => {
      dot.style.transform = `translate(-50%, -${p.size / 2}px)`;
      dot.style.boxShadow = `0 0 ${p.size * 2}px ${p.glow}, 0 0 ${p.size}px ${p.glow}`;
      label.style.opacity = '0';
    });
    dot.addEventListener('click', () => {
      const card = document.getElementById(p.cardId);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    /* Saturn ring overlay on the diagram */
    if (p.hasRings) {
      const rw = document.createElement('div');
      rw.style.cssText = `
        position:absolute; top:0; left:50%;
        width:${p.size * 2.4}px; height:${p.size * 0.55}px;
        border:${Math.max(2, p.size * 0.12)}px solid rgba(200,180,100,.45);
        border-radius:50%;
        transform:translate(-50%, ${-(p.size * 0.25 + p.size * 0.12 / 2)}px);
        pointer-events:none; z-index:3;
      `;
      orbitWrap.appendChild(rw);
    }

    orbitWrap.appendChild(dot);
    orbitWrap.appendChild(label);
    container.appendChild(orbitWrap);
  });
})();


(function(){
  const c=document.getElementById('star-canvas'), ctx=c.getContext('2d');
  let W, H, stars=[], shoots=[];
  function resize(){ W=c.width=innerWidth; H=c.height=innerHeight; }
  resize();
  window.addEventListener('resize', ()=>{ resize(); buildStars(); });
  function buildStars(){
    stars=[];
    const n=Math.floor(W*H/3200);
    for(let i=0;i<n;i++) stars.push({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*1.6+.15,
      a:Math.random()*.85+.15,
      sp:Math.random()*.004+.0008,
      ph:Math.random()*Math.PI*2,
      c:Math.random()<.05?'g':Math.random()<.07?'v':'w'
    });
  }
  buildStars();
  function spawnShoot(){
    if(Math.random()>.4) return;
    shoots.push({ x:Math.random()*W*.6+W*.05, y:Math.random()*H*.35, dx:5+Math.random()*5, dy:2.5+Math.random()*2, len:60+Math.random()*110, life:0, maxLife:48 });
  }
  setInterval(spawnShoot, 3500);
  let frame=0;
  function draw(){
    ctx.clearRect(0,0,W,H); frame++;
    stars.forEach(s=>{
      const a=s.a*(.55+.45*Math.sin(frame*s.sp+s.ph));
      if(s.r>1){
        const g=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*4.5);
        const rgb=s.c==='g'?'232,200,122':s.c==='v'?'157,111,255':'197,212,240';
        g.addColorStop(0,`rgba(${rgb},${a*.28})`); g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r*4.5,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=s.c==='g'?`rgba(232,200,122,${a})`:s.c==='v'?`rgba(157,111,255,${a})`:`rgba(245,240,255,${a})`;
      ctx.fill();
    });
    shoots=shoots.filter(ss=>{
      ss.life++; ss.x+=ss.dx; ss.y+=ss.dy;
      const a=Math.max(0,1-ss.life/ss.maxLife);
      const g=ctx.createLinearGradient(ss.x,ss.y,ss.x-ss.dx*ss.len/10,ss.y-ss.dy*ss.len/10);
      g.addColorStop(0,`rgba(245,240,255,${a})`);
      g.addColorStop(.4,`rgba(197,212,240,${a*.5})`);
      g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.moveTo(ss.x,ss.y); ctx.lineTo(ss.x-ss.dx*ss.len/10,ss.y-ss.dy*ss.len/10);
      ctx.strokeStyle=g; ctx.lineWidth=1.2; ctx.stroke();
      return ss.life<ss.maxLife;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ══════════════════════════════════════════
   CARD MINI PARTICLES
══════════════════════════════════════════ */
document.querySelectorAll('.cpart').forEach(c=>{
  const cx=c.getContext('2d'); const ps=[];
  for(let i=0;i<45;i++) ps.push({
    x:rand(0,300), y:rand(0,210),
    s:rand(0.3,1.2), sp:rand(0.1,0.5),
    ph:rand(0,Math.PI*2), op:rand(0.08,0.4)
  });
  function dc(){
    cx.clearRect(0,0,300,210);
    ps.forEach(p=>{
      p.ph+=0.025; p.y-=p.sp*0.38; if(p.y<-2) p.y=212;
      const a=p.op*(0.5+0.5*Math.sin(p.ph));
      cx.beginPath(); cx.arc(p.x,p.y,p.s,0,Math.PI*2);
      cx.fillStyle=`rgba(200,220,255,${a})`; cx.fill();
    });
    requestAnimationFrame(dc);
  }
  dc();
});


function setupTilt(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-0.5;
      const y = (e.clientY-r.top)/r.height-0.5;
      card.style.transition='transform 0.12s ease,box-shadow 0.4s,border-color 0.4s';
      card.style.transform=`perspective(1000px) rotateX(${-y*16}deg) rotateY(${x*18}deg) translateZ(10px) scale(1.02)`;
      card.classList.add('is-hovered');
      const sx=(x+0.5)*100; const sy=(y+0.5)*100;
      card.style.background=`radial-gradient(circle at ${sx}% ${sy}%, rgba(160,184,255,0.08), rgba(6,14,40,0.9) 60%), linear-gradient(145deg, rgba(6,14,40,0.9), rgba(3,8,22,0.95))`;
      const gs=card.querySelector('.glow-strip');
      if(gs) gs.style.opacity='1';
      const pbg=card.querySelector('.planet-bg-glow');
      if(pbg) pbg.style.opacity='1';
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transition='transform 0.5s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.4s,border-color 0.4s,background 0.5s';
      card.style.transform='perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)';
      card.classList.remove('is-hovered');
      card.style.background='';
      const gs=card.querySelector('.glow-strip');
      if(gs) gs.style.opacity='0';
      const pbg=card.querySelector('.planet-bg-glow');
      if(pbg) pbg.style.opacity='0';
    });
  });
}
setupTilt('[data-tilt]');

/* ══════════════════════════════════════════
   HAMBURGER MENU
══════════════════════════════════════════ */
const ham=document.getElementById('hamburger'), mm=document.getElementById('mobile-menu');
let mo=false;
function openM(){  mo=true;  ham.classList.add('open');    mm.classList.add('open');    document.body.style.overflow='hidden'; ham.setAttribute('aria-expanded','true');  }
function closeM(){ mo=false; ham.classList.remove('open'); mm.classList.remove('open'); document.body.style.overflow='';       ham.setAttribute('aria-expanded','false'); }
ham.addEventListener('click', ()=>mo?closeM():openM());
document.querySelectorAll('.mobile-nav-link').forEach(l=>l.addEventListener('click',closeM));
document.addEventListener('click', e=>{ if(mo&&!ham.contains(e.target)&&!mm.contains(e.target)) closeM(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape'&&mo) closeM(); });

/* ══════════════════════════════════════════
   NAV SCROLL HIGHLIGHT
══════════════════════════════════════════ */
window.addEventListener('scroll', ()=>{
  document.getElementById('navbar').style.background = window.scrollY>60 ? 'rgba(2,5,16,0.92)' : 'rgba(2,5,16,0.5)';
  const secs=document.querySelectorAll('section[id]'), nls=document.querySelectorAll('.nav-links a');
  let cur='';
  secs.forEach(s=>{ if(window.scrollY>=s.offsetTop-120) cur=s.id; });
  nls.forEach(a=>{ a.style.color=(a.getAttribute('href')==='#'+cur)?'#a0b8ff':''; });
});

/* ══════════════════════════════════════════
   FADE-IN ON SCROLL
══════════════════════════════════════════ */
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
