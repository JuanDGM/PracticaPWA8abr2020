
importScripts('js/app-utils.js');

const CACHE_STATIC = 'static-v2';
const CACHE_DYNAMIC = 'dynamic-v1';
const CACHE_INMUTABLE = 'inmutable-v1';


const app_shell = [
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/spiderman.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/wolverine.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/hulk.jpg',
    'js/app.js',
    'js/app-utils.js',
    'manifest.json'
];

const app_shell_inmutable = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];


self.addEventListener('install',e=>{
    
    const resStatic = caches.open(CACHE_STATIC).then(cache=>{
        cache.addAll(app_shell);
    });
    
    const resInmutable = caches.open(CACHE_INMUTABLE).then(cache=>{
        cache.addAll(app_shell_inmutable);
    });
    
    e.waitUntil(Promise.all([resStatic, resInmutable]));
    
});


self.addEventListener('activate',e=>{
    
    const respuesta = caches.keys().then(keys=>{
        
        keys.forEach(key=>{
            if(key!==CACHE_STATIC && key.includes('static')){
               return caches.delete(key);
            }
        });
        
    });
    
    e.waitUntil(respuesta);
    
});


self.addEventListener('fetch',e=>{
    
//    1. Cache with network fallback
    
    const respuesta = caches.match(e.request).then(res=>{
        
        if(res){
            return res;
        }else{
            console.log('Error', e.request.url);
            
            return fetch(e.request).then(newRes=>{
                peticionalNewwork(e.request,CACHE_DYNAMIC,newRes);
                
            });
            
        }
    });
    
    e.respondWith( respuesta );
    
});




