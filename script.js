const menu=document.querySelector('.menu');const nav=document.querySelector('.nav nav');menu?.addEventListener('click',()=>nav.classList.toggle('open'));
const theme=document.querySelector('#theme');theme?.addEventListener('click',()=>{document.body.classList.toggle('dark');theme.textContent=document.body.classList.contains('dark')?'☀':'☾';localStorage.setItem('agri-theme',document.body.classList.contains('dark')?'dark':'light')});
if(localStorage.getItem('agri-theme')==='dark'){document.body.classList.add('dark');if(theme)theme.textContent='☀'}
const search=document.querySelector('#cropSearch');search?.addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('.table .tr:not(.th)').forEach(row=>row.style.display=row.textContent.toLowerCase().includes(q)?'grid':'none')});
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
