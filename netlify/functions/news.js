// LISBON ALIVE 10.1 — RSS on the server. No secrets, no arbitrary URL input.
const FEEDS = Object.freeze({
 lisboa:'https://news.google.com/rss/search?q=Lisboa+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt-150',
 portugal:'https://news.google.com/rss/search?q=Portugal&hl=pt-PT&gl=PT&ceid=PT:pt-150',
 europa:'https://www.europarl.europa.eu/rss/doc/press-releases/pt.xml'
});
const EUROPE_FALLBACK='https://news.google.com/rss/search?q=Uni%C3%A3o+Europeia+Parlamento+Europeu&hl=pt-PT&gl=PT&ceid=PT:pt-150';
const decode=s=>s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/<[^>]*>/g,'').trim();
const field=(item,name)=>decode((item.match(new RegExp('<'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+name+'>','i'))||[])[1]||'');
exports.handler=async event=>{
 const group=event.queryStringParameters?.group;
 if(!Object.hasOwn(FEEDS,group))return {statusCode:400,body:'Invalid group'};
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
    const parsed=[...xml.matchAll(/<item(?:\\s[^>]*)?>([\\s\\S]*?)<\\/item>/gi)].slice(0,40).map(m=>{
     const x=m[1],date=field(x,'pubDate'),link=field(x,'link'),stamp=Date.parse(date);
     return {title:field(x,'title').slice(0,230),source:(field(x,'source')||new URL(url).hostname).slice(0,90),date,url:link,stamp};
    }).filter(x=>x.title&&/^https:\/\//.test(x.url)&&Number.isFinite(x.stamp)&&x.stamp<=now+300000&&now-x.stamp<=48*3600000).slice(0,12).map(({stamp,...rest})=>rest);
    if(parsed.length){items=parsed;usedSource=new URL(url).hostname;break}
   }catch(e){console.warn('RSS source unavailable',new URL(url).hostname,e.message)}
  }
  if(!items.length)throw Error('No recent RSS items');
  return {statusCode:200,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=120'},body:JSON.stringify({group,items,checkedAt:new Date().toISOString(),editorialStatus:'unverified-rss',feedHost:usedSource})};
 }catch(e){return {statusCode:503,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify({error:'Source unavailable',items:[]})}}
};
