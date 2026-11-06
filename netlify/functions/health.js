// LISBON ALIVE™ — Diagnóstico de fontes (não é um sinal de vídeo).
// Sem segredos, sem URLs arbitrários, sem dados de demonstração.
const {handler: news} = require('./news');
const groups=['lisboa','portugal','europa'];
exports.handler=async ()=>{
 const checks=await Promise.all(groups.map(async group=>{
  try{
   const response=await news({queryStringParameters:{group}});
   const payload=JSON.parse(response.body||'{}');
   const count=Array.isArray(payload.items)?payload.items.length:0;
   return {group,ok:response.statusCode===200&&count>0,count,checkedAt:payload.checkedAt||null};
  }catch{return {group,ok:false,count:0,checkedAt:null}}
 }));
 const healthy=checks.every(x=>x.ok);
 return {statusCode:healthy?200:503,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Access-Control-Allow-Origin':'*'},body:JSON.stringify({service:'LISBON ALIVE RSS',status:healthy?'ok':'degraded',checkedAt:new Date().toISOString(),checks,notes:'Verificação de disponibilidade de RSS; não valida a veracidade editorial nem o estado do TikTok LIVE.'})};
};
