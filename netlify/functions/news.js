// LISBON ALIVE 10.1 — RSS on the server. No secrets, no arbitrary URL input.
const FEEDS = Object.freeze({
 lisboa:'https://news.google.com/rss/search?q=Lisboa+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt-150',
 portugal:'https://news.google.com/rss/search?q=Portugal&hl=pt-PT&gl=PT&ceid=PT:pt-150',
 europa:'https://www.europarl.europa.eu/rss/doc/press-releases/pt.xml',
 noite:'https://news.google.com/rss/search?q=Lisboa+(agenda+cultural+OR+concertos+OR+exposi%C3%A7%C3%B5es+OR+teatro)+when%3A2d&hl=pt-PT&gl=PT&ceid=PT:pt-150',
 patrimonio:'https://news.google.com/rss/search?q=Lisboa+(patrim%C3%B3nio+OR+museus+OR+monumentos+OR+hist%C3%B3ria+OR+exposi%C3%A7%C3%B5es)+when%3A2d&hl=pt-PT&gl=PT&ceid=PT:pt-150'
});
const EUROPE_FALLBACK='https://news.google.com/rss/search?q=Uni%C3%A3o+Europeia+Parlamento+Europeu&hl=pt-PT&gl=PT&ceid=PT:pt-150';
const decode=s=>s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/<[^>]*>/g,'').trim();
// Conservative geographic and cultural relevance filter for the night programme.
// RSS headlines are not evidence that an event is happening tonight.
const nightRelevant=item=>{
 const norm=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const title=norm(item.title),source=norm(item.source);
 const local=/\b(lisboa|lisbon|alfama|belem|chiado|bairro alto|parque das nacoes|campo pequeno|marvila|alcantara|benfica|avenida da liberdade)\b/.test(title)||/agenda cultural de lisboa/.test(source);
 const cultural=/\b(patrimonio|historico|historia|monumento|monumentos|cultura|cultural|agenda|concerto|concertos|musica|musical|teatro|cinema|festival|festivais|exposicao|exposicoes|espetaculo|espetaculos|museu|museus|arte|artes|galeria|livro|livros|danca|palco|bilhete|bilhetes|evento|eventos)\b/.test(title)||/agenda cultural de lisboa/.test(source);
 return local&&cultural;
};
// Dedicated heritage filter: require a heritage subject in the headline, not merely "história" as a generic phrase.
const heritageRelevant=item=>{
 const norm=value=>String(value||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();
 const title=norm(item.title),source=norm(item.source);
 const local=/\\b(lisboa|lisbon|alfama|belem|chiado|bairro alto|marvila|alcantara|ajuda|graca|castelo de sao jorge|mosteiro dos jeronimos|museu nacional)\\b/.test(title)||/agenda cultural de lisboa/.test(source);
 const heritage=/\\b(patrimonio|patrimonial|monumento|monumentos|museu|museus|exposicao|exposicoes|galeria|galerias|arqueologia|arqueologico|restauro|restauracao|azulejos|arquivo|arquivos|arquitetura|arquitectura|edificio historico|edificios historicos|visita guiada|visitas guiadas|colecao|colecoes|acervo|palacio|palacios|castelo|mosteiro|convento)\\b/.test(title);
 return local&&heritage;
};
const field=(item,name)=>decode((item.match(new RegExp('<'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+name+'>','i'))||[])[1]||'');
exports.handler=async event=>{
 const group=event.queryStringParameters?.group;
 if(!Object.hasOwn(FEEDS,group))return {statusCode:400,headers:{'Access-Control-Allow-Origin':'https://ideavaulthq-del.github.io'},body:'Invalid group'};
 try{
  const sources=group==='europa'?[FEEDS.europa,EUROPE_FALLBACK]:[FEEDS[group]];
  let items=[],usedSource=null;
  const now=Date.now();
  for(const url of sources){
   try{
    const response=await fetch(url,{signal:AbortSignal.timeout(9000),headers:{'User-Agent':'LisbonAliveNewsReader/10.2 (+public RSS)','Accept':'application/rss+xml, application/xml, text/xml'}});
    if(!response.ok)throw Error('upstream '+response.status);
    const xml=await response.text();
    if(xml.length>1500000)throw Error('feed too large');
    const parsed=[...xml.matchAll(new RegExp('<item(?:\\s[^>]*)?>([\\s\\S]*?)<\\/item>','gi'))].slice(0,40).map(m=>{
     const x=m[1],date=field(x,'pubDate'),link=field(x,'link'),stamp=Date.parse(date);
     return {title:field(x,'title').slice(0,230),source:(field(x,'source')||new URL(url).hostname).slice(0,90),date,url:link,stamp};
    }).filter(x=>x.title&&/^https:\/\//.test(x.url)&&Number.isFinite(x.stamp)&&x.stamp<=now+300000&&now-x.stamp<=48*3600000&&(group==='noite'?nightRelevant(x):group==='patrimonio'?heritageRelevant(x):true)).slice(0,12).map(({stamp,...rest})=>rest);
    if(parsed.length){items=parsed;usedSource=new URL(url).hostname;break}
   }catch(e){console.warn('RSS source unavailable',new URL(url).hostname,e.message)}
  }
  if(!items.length)throw Error('No recent RSS items');
  return {statusCode:200,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=120','Access-Control-Allow-Origin':'https://ideavaulthq-del.github.io'},body:JSON.stringify({group,items,checkedAt:new Date().toISOString(),editorialStatus:'unverified-rss',feedHost:usedSource})};
 }catch(e){return {statusCode:503,headers:{'Content-Type':'application/json','Cache-Control':'no-store','Access-Control-Allow-Origin':'https://ideavaulthq-del.github.io'},body:JSON.stringify({error:'Source unavailable',items:[]})}}
};
