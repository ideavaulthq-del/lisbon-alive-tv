// LIVE 21.0 — teste determinístico do ciclo notícias -> publicidade -> notícias.
// Executar: node --test 24-noticias/tests/broadcast-cycle.test.cjs
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const marker='<!-- 24N AUTO BREAK™ | overlay independente do grafismo noticioso -->';
const segment=html.split(marker)[1];
assert.ok(segment,'Controlador de intervalo não encontrado');
const js=segment.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(js,'Script de controlo não encontrado');
function setup(query=''){
 let now=0,nextId=0;
 const tasks=new Map(),events=new Map(),sent=[];
 const frame={style:{display:'none'},attrs:{},setAttribute(k,v){this.attrs[k]=v;},contentDocument:{readyState:'complete'},contentWindow:{postMessage(msg,origin){sent.push({msg,origin});}},addEventListener(){}};
 const window={addEventListener(k,fn){events.set(k,fn);}};
 const context={window,document:{getElementById(id){assert.equal(id,'autoBreak');return frame;}},location:{origin:'https://example.test',search:query},URLSearchParams,Date:{now:()=>now},setTimeout(fn,delay){const id=++nextId;tasks.set(id,{fn,at:now+delay,repeat:0});return id;},clearTimeout(id){tasks.delete(id);},setInterval(fn,delay){const id=++nextId;tasks.set(id,{fn,at:now+delay,repeat:delay});return id;}};
 vm.runInNewContext(js[1],context);
 function advance(ms){
  const end=now+ms;
  for(let steps=0;steps<100000;steps++){
   let id=null,at=Infinity;
   for(const [k,t] of tasks)if(t.at<=end&&t.at<at){id=k;at=t.at;}
   if(id===null)break;
   now=at;const task=tasks.get(id);if(!task)continue;
   if(task.repeat)task.at+=task.repeat;else tasks.delete(id);
   task.fn();
  }
  now=end;
 }
 return {window,frame,sent,events,advance};
}
test('15 minutos notícias -> intervalo automático -> regresso',()=>{
 const t=setup();assert.equal(t.window.N24AutoBreak.active,false);
 t.advance(899000);assert.equal(t.window.N24AutoBreak.active,false);
 t.advance(1000);assert.equal(t.window.N24AutoBreak.active,true);
 assert.equal(t.frame.style.display,'block');assert.equal(t.frame.attrs['aria-hidden'],'false');
 assert.equal(t.sent.at(-1).msg.duration,120000);
 t.events.get('message')({origin:'https://example.test',source:t.frame.contentWindow,data:{type:'24n-break-finished'}});
 assert.equal(t.window.N24AutoBreak.active,false);assert.equal(t.frame.style.display,'none');
 t.advance(899000);assert.equal(t.window.N24AutoBreak.active,false);
 t.advance(1000);assert.equal(t.window.N24AutoBreak.active,true);
});
test('tecla I inicia e Escape termina, sem duplicar intervalo',()=>{
 const t=setup();const key=k=>t.events.get('keydown')({key:k,altKey:false,ctrlKey:false,metaKey:false,repeat:false});
 key('i');key('i');assert.equal(t.sent.length,1);
 key('Escape');assert.equal(t.window.N24AutoBreak.active,false);
});
test('mensagem de origem ou janela diferente não termina intervalo',()=>{
 const t=setup();t.window.N24AutoBreak.start();
 t.events.get('message')({origin:'https://other.test',source:t.frame.contentWindow,data:{type:'24n-break-finished'}});
 assert.equal(t.window.N24AutoBreak.active,true);
 t.events.get('message')({origin:'https://example.test',source:{},data:{type:'24n-break-finished'}});
 assert.equal(t.window.N24AutoBreak.active,true);
});
test('parâmetro intervalo=agora inicia teste após 1,2 segundos',()=>{
 const t=setup('?intervalo=agora');t.advance(1199);assert.equal(t.window.N24AutoBreak.active,false);
 t.advance(1);assert.equal(t.window.N24AutoBreak.active,true);
});
test('fallback de segurança termina intervalo após 122 segundos',()=>{
 const t=setup();t.window.N24AutoBreak.start();t.advance(122000);
 assert.equal(t.window.N24AutoBreak.active,false);
});

test('simulação de três ciclos consecutivos sem bloqueio',()=>{
 const t=setup();
 for(let i=0;i<3;i++){
  t.advance(900000);
  assert.equal(t.window.N24AutoBreak.active,true,'intervalo deve iniciar no ciclo '+(i+1));
  t.advance(122000);
  assert.equal(t.window.N24AutoBreak.active,false,'intervalo deve terminar no ciclo '+(i+1));
  assert.equal(t.frame.style.display,'none');
 }
 assert.equal(t.sent.length,3);
});
test('Escape termina e o temporizador antigo não fecha um novo intervalo',()=>{
 const t=setup();const key=k=>t.events.get('keydown')({key:k,altKey:false,ctrlKey:false,metaKey:false,repeat:false});
 key('i');t.advance(1000);key('Escape');key('i');
 t.advance(121000);
 assert.equal(t.window.N24AutoBreak.active,true);
 t.advance(1000);
 assert.equal(t.window.N24AutoBreak.active,false);
});
