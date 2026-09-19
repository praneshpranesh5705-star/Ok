const menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');menu?.addEventListener('click',()=>nav.classList.toggle('open'));
const theme=document.querySelector('#theme');theme?.addEventListener('click',()=>{document.body.classList.toggle('dark');theme.textContent=document.body.classList.contains('dark')?'☀':'☾';localStorage.setItem('farmflow-theme',document.body.classList.contains('dark')?'dark':'light')});if(localStorage.getItem('farmflow-theme')==='dark'){document.body.classList.add('dark');if(theme)theme.textContent='☀'}
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const chat=document.querySelector('#chat'),input=document.querySelector('#chatInput'),form=document.querySelector('#chatForm');
const answers=[
[/soil|moisture|water/i,'Check soil moisture at root depth before irrigating. Water according to crop stage, soil type and local weather rather than using a fixed schedule.'],
[/plant|sowing|seed/i,'Before planting, check seed quality, soil preparation, suitable season, spacing, drainage and expected weather. Use local agricultural guidance for crop-specific recommendations.'],
[/water|irrigation/i,'To reduce water waste, irrigate near the root zone, avoid overwatering, maintain good soil cover and adjust irrigation after rainfall.'],
[/fertilizer|nutrient|fertil/i,'Use a soil test where available and follow crop- and soil-specific nutrient recommendations. Avoid applying fertilizer just before heavy rain.'],
[/pest|disease|leaf/i,'Inspect leaves, stems and the underside of leaves regularly. For an unknown disease or pest, use a clear photo and consult a local agriculture expert before treatment.']
];
function addMessage(text,type){const d=document.createElement('div');d.className='message '+type;d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
function reply(q){const hit=answers.find(([re])=>re.test(q));addMessage(hit?hit[1]:'I can help with basic crop planning, soil, irrigation, fertilizer and pest-awareness questions. For crop-specific treatment, confirm with a local agriculture expert.','bot')}
form?.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(!q)return;addMessage(q,'user');input.value='';setTimeout(()=>reply(q),250)});
document.querySelectorAll('.quick button').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.q;form.requestSubmit()}));