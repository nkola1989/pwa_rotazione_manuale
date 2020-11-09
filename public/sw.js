const { response } = require("express");

// Inizializzo l'applicazione, questo codice, almeno chè non modificato, verrà processato solo una volta
self.addEventListener("install", e => {
/* console.log("Applicazione installabile sui dispositivi!"); */
    
    // do un nome che sarà mostrato nelle cache storage del browser
    var nameCacheStorage="db_app" 
    //strutturo la memorizzazione nelle cache
    e.waitUntil(
        caches.open(nameCacheStorage).then(cache =>{
            // metto in cache questi percorsi
            return cache.addAll(["./", "./src/master.css","./images/logo192.png"]);
        })
    )
});

//richiamo le cache
self.addEventListener("fetch", e =>{
    console.log(`Ottenuto questa richiesta fetch per : ${e.request.url}`);

    //gestisco le informazioni dentro le cache
    e.respondWith(
        //cerco tra le cache se c'è lo storage definito dentro nameCacheStorage
        caches.match(e.request).then(response => {
            // se esistono campi li prendo  oppure me li vado a cercare nel server
            return response || fetch(e.request);
        })
    )
})