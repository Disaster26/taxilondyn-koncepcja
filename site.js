(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var b=$('#burger'),m=$('#menu');
function zamknij(){m.classList.remove('otw');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');document.body.style.overflow=''}
b.addEventListener('click',function(){var o=!m.classList.contains('otw');m.classList.toggle('otw',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');document.body.style.overflow=o?'hidden':''});
$$('a',m).forEach(function(a){a.addEventListener('click',zamknij)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});
var linki=$$('a[href^="#"]',m);
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){linki.forEach(function(a){a.toggleAttribute('aria-current',a.getAttribute('href')==='#'+x.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
 ['hero','lotniska','odbior','auta','zwiedzanie','rezerwacja'].forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el)});
 var mob=$('#mob');
 new IntersectionObserver(function(en){mob.classList.toggle('widac',!en[0].isIntersecting)},{threshold:0}).observe($('.hero-in'));
}
$('#rok').textContent=new Date().getFullYear();
$$('[data-kar]').forEach(function(k){
 var tor=$('.kar-tor',k),fig=$$('figure',tor),lic=$('.licznik',k),i=0;
 function pokaz(){var w=tor.clientWidth||1;i=Math.round(tor.scrollLeft/w);lic.textContent=(i+1)+' / '+fig.length}
 function idz(n){i=(n+fig.length)%fig.length;tor.scrollTo({left:i*tor.clientWidth,behavior:'smooth'})}
 $$('.kar-btn',k).forEach(function(bt){bt.addEventListener('click',function(){idz(i+(+bt.dataset.p))})});
 var t;tor.addEventListener('scroll',function(){cancelAnimationFrame(t);t=requestAnimationFrame(pokaz)},{passive:true});
 tor.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();idz(i+1)}if(e.key==='ArrowLeft'){e.preventDefault();idz(i-1)}});
 if(fig.length<2)return;
 var x0=0,s0=0,ciag=false;
 tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;x0=e.clientX;s0=tor.scrollLeft;tor.classList.add('ciag');tor.setPointerCapture(e.pointerId)});
 tor.addEventListener('pointermove',function(e){if(ciag)tor.scrollLeft=s0-(e.clientX-x0)});
 function stop(e){if(!ciag)return;ciag=false;tor.classList.remove('ciag');var w=tor.clientWidth,dx=e.clientX-x0,n=Math.round(s0/w)+(dx<-40?1:dx>40?-1:0);idz(Math.max(0,Math.min(fig.length-1,n)))}
 tor.addEventListener('pointerup',stop);tor.addEventListener('pointercancel',stop);
});
$('#formularz').addEventListener('submit',function(e){e.preventDefault();$('#info-form').textContent='To podgląd strony. Po wdrożeniu formularz wyśle rezerwację na info@taxilondyn.com.'});
})();
