// 24N SHOP LIVE 20.9 — testes sobre o código HTML efetivamente publicado.
// Executar na raiz do repositório: node --test 24-noticias/tests/catalog.test.cjs
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=file=>fs.readFileSync(path.join(root,file),'utf8');
const converter=html('conversor-feeds.html');
const central=html('central.html');
const intervalo=html('intervalo.html');
function section(source,start,end){
 const a=source.indexOf(start),b=source.indexOf(end,a+start.length);
 assert.ok(a>=0&&b>a,'Funções esperadas no HTML: '+start);
 return source.slice(a,b);
}
const csv=vm.runInNewContext(section(converter,'function parseCSV(','function msg(')+';({parseCSV,detect,validHttps})',{URL});
const editor=vm.runInNewContext(section(central,'function validURL(','function audit(')+';({validURL,ageDays,check})',{Date,URL});
test('CSV com aspas, vírgulas e linhas multilinha',()=>{
 const rows=csv.parseCSV('name,description\n"Telemóvel, modelo X","Linha 1\nLinha 2"\n',',');
 assert.equal(rows.length,2);assert.equal(rows[1][0],'Telemóvel, modelo X');assert.equal(rows[1][1],'Linha 1\nLinha 2');
});
test('CSV com ponto e vírgula e aspas escapadas',()=>{
 const rows=csv.parseCSV('name;description\nProduto;"Tem ""aspas"""\n',';');
 assert.equal(rows[1][1],'Tem "aspas"');
});
test('CSV inválido não passa silenciosamente',()=>{
 assert.throws(()=>csv.parseCSV('name,description\n"sem fecho,valor',','));
});
test('detetor de separador e URL HTTPS',()=>{
 assert.equal(csv.detect('name;description;price\nx;y;z'),';');
 assert.equal(csv.validHttps('https://example.com/item'),true);
 assert.equal(csv.validHttps('http://example.com/item'),false);
 assert.equal(csv.validHttps('javascript:alert(1)'),false);
 assert.equal(csv.validHttps('https://user:pass@example.com'),false);
});
const base={name:'Produto de teste',category:'Tecnologia',description:'Teste editorial',store:'Loja de teste',link:'https://example.com/produto',image_url:'',price:'',emoji:'📱',approved:false,reviewed_at:''};
test('rascunho sem data é permitido',()=>assert.doesNotThrow(()=>editor.check(base)));
test('aprovação exige loja, link e revisão recente',()=>{
 const today=new Date().toISOString().slice(0,10);
 assert.throws(()=>editor.check({...base,approved:true}));
 assert.doesNotThrow(()=>editor.check({...base,approved:true,reviewed_at:today}));
 assert.throws(()=>editor.check({...base,approved:true,reviewed_at:'2020-01-01'}));
 assert.throws(()=>editor.check({...base,approved:true,reviewed_at:today,link:''}));
});
test('URLs não HTTPS são rejeitados pelo editor',()=>assert.throws(()=>editor.check({...base,link:'http://example.com'})));
test('catálogo publicado continua vazio, sem produtos comerciais fictícios',()=>{
 const data=JSON.parse(html('products.json'));assert.ok(Array.isArray(data.products));assert.equal(data.products.length,0);
});
test('emissão exige aprovação e data recente',()=>{
 assert.match(intervalo,/p\.approved===true/);
 assert.match(intervalo,/p\.reviewed_at/);
 assert.match(intervalo,/age<=30/);
 assert.match(intervalo,/DEMONSTRAÇÃO VISUAL/);
});
