const ids=["name","role","email","phone","location","summary","education","experience","skills","projects"];
const defaults={name:"",role:"",email:"",phone:"",location:"",summary:"",education:"",experience:"",skills:"",projects:""};
const $=id=>document.getElementById(id);
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
function getData(){return Object.fromEntries(ids.map(id=>[id,$(id).value.trim()]));}
function setValue(id,v){$(id).value=v||"";}
function render(data=getData()){
 $("pName").textContent=data.name||"Your Name";
 $("pRole").textContent=data.role||"Professional Title";
 const contact=[data.email,data.phone,data.location].filter(Boolean);
 $("pContact").textContent=contact.length?contact.join(" • "):"email@example.com • +91 00000 00000 • Location";
 const sections=[
  ["pSummarySec","pSummary",data.summary,"Add a short professional summary to introduce yourself."],
  ["pExperienceSec","pExperience",data.experience,"Add education or experience details."]
 ];
 sections.forEach(([sec,out,val,empty])=>{$(sec).style.display=val?"block":"block";$(out).textContent=val||empty;$(out).className=val?"content":"content empty";});
 $("pEducation").textContent=data.education||"Add your education details.";
 $("pEducation").className=data.education?"content":"content empty";
 $("pProjects").textContent=data.projects||"Add selected projects.";
 $("pProjects").className=data.projects?"content":"content empty";
 const skillBox=$("pSkills");skillBox.innerHTML=data.skills?data.skills.split(/[,\n]/).map(s=>s.trim()).filter(Boolean).map(s=>`<span class="chip">${escapeHtml(s)}</span>`).join(""):'<span class="empty">Add your key skills.</span>';
}
function save(){localStorage.setItem("resumecraft-data",JSON.stringify(getData()));const b=$("saveBtn");b.textContent="Saved ✓";setTimeout(()=>b.textContent="Save",1200);}
const saved=JSON.parse(localStorage.getItem("resumecraft-data")||"null")||defaults;
ids.forEach(id=>setValue(id,saved[id]));
ids.forEach(id=>$(id).addEventListener("input",()=>render()));
$("saveBtn").addEventListener("click",save);
$("printBtn").addEventListener("click",()=>window.print());
$("clearBtn").addEventListener("click",()=>{if(!confirm("Clear all resume data?"))return;localStorage.removeItem("resumecraft-data");ids.forEach(id=>setValue(id,""));render();});
render(saved);