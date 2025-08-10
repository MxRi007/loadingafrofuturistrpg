// Starfield + simple UI behavior + blog loader + lightbox
(function(){
  // Year stamps
  document.getElementById('year')?.replaceWith(document.createTextNode(new Date().getFullYear()));
  document.getElementById('year2')?.replaceWith(document.createTextNode(new Date().getFullYear()));
  document.getElementById('year3')?.replaceWith(document.createTextNode(new Date().getFullYear()));
  document.getElementById('year4')?.replaceWith(document.createTextNode(new Date().getFullYear()));
})();

(function starfield(){
  const canvas = document.getElementById('starfield');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w,h,stars=[];
  function resize(){ w=canvas.width=innerWidth; h=canvas.height=innerHeight; init(); }
  function init(){
    stars = [];
    const count = Math.floor((w*h)/8000);
    for(let i=0;i<count;i++){
      stars.push({
        x: Math.random()*w,
        y: Math.random()*h,
        z: Math.random()*1.5+0.2,
        r: Math.random()*1.2+0.2
      });
    }
  }
  function frame(){
    ctx.clearRect(0,0,w,h);
    for(let s of stars){
      s.x += (s.z*0.15);
      if(s.x>w){ s.x=0; s.y=Math.random()*h; }
      const alpha = 0.5 + (s.z*0.5);
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,'+alpha+')';
      ctx.arc(s.x,s.y,s.r*s.z,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  addEventListener('resize', resize);
  resize(); frame();
})();

// Lightbox for gallery
(function lightbox(){
  const gallery = document.getElementById('gallery');
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  if(!gallery || !lb) return;
  gallery.addEventListener('click', e=>{
    const a = e.target.closest('a.thumb');
    if(!a) return;
    e.preventDefault();
    lbImg.src = a.href;
    lb.classList.add('show');
    lb.setAttribute('aria-hidden','false');
  });
  lbClose.addEventListener('click', ()=>{
    lb.classList.remove('show');
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
  });
  lb.addEventListener('click', e=>{
    if(e.target===lb) { lbClose.click(); }
  });
})();

// Blog loader: loads posts listed in /posts/index.json
(function blogLoader(){
  const container = document.getElementById('posts');
  if(!container) return;
  fetch('posts/index.json').then(res=>{
    if(!res.ok) throw new Error('index.json not found — add posts/index.json or run generator');
    return res.json();
  }).then(list=>{
    // list is [{title, url, date, excerpt}]
    list.sort((a,b)=> new Date(b.date)-new Date(a.date));
    container.innerHTML = '';
    for(const p of list){
      const el = document.createElement('article');
      el.className='post-card';
      el.innerHTML = `<h3><a href="${p.url}">${p.title}</a></h3>
        <p class="meta">${p.date}</p>
        <p>${p.excerpt||''}</p>`;
      container.appendChild(el);
    }
  }).catch(err=>{
    container.innerHTML = '<p style="color:#f99">Could not load posts index: '+err.message+'</p>';
  });
})();
