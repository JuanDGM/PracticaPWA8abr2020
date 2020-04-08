


function peticionalNewwork(req,cacheName,Res){
    caches.open(cacheName).then(cache=>{
                    return cache.put(req,Res);
                });
}
