# My Daily Meals

## Di cosa si tratta: 
 
Un servizio web che consente all'utente di costruirsi la propria giornata alimentare tipo combinando i vari tipi di alimenti. Il suo scopo è quello di mostrare come è possibile prendere i dati da un'api esterna, manipolarli a proprio piacimento e salvarli in localstorage.


## Utilizzo:

Quando uno dei pulsanti "+" viene premuto, viene aperta una finestra modale dalla quale sarà possibile cercare l'alimento desiderato ed una volta selezionato impostare la relativa quantità in grammi: sarà l'applicazione infatti, ad effettuare tutti i calcoli in maniera automatica. A tale proposito troviamo i calcoli automatici inerenti ai macronutrienti totali suddivisi per pasto e quelli globali dell'intera giornata.
È possibile altresì eliminare gli alimenti inseriti cliccando sull'alimento inserito.
Ogni qualvolta l'utente preme il Bottone "Submit Data", i dati vengono salvati in localstorage e mostrati nella tabella "history" indicando anche i pasti dai quali provengono gli alimenti inseriti. Inoltre se vengono aggiunti nuovi alimenti è possibile aggiungerli a quelli preesistenti nella stessa tabella: questi dati verranno aggiunti a seguire.


## Come è strutturato il progetto:
Lo store dei dati principali del progetto è realizzato utilizzando le "context api" di react, non rendendo necessario di fatto l'utilizzo di un'ulteriore libreria Javascript per la gestione semplificata dello stato come Redux. Per quanto riguarda la parte di build e di deployment, il webserver viene gestito da netlify. 

Per la realizzazione è stata utilizzata un API esterna concessa dal sito: https://api.edamam.com, tramite la quale è possibile effettuare le ricerche dei cibi nel loro database.
 

## Come utilizzarlo offline:

Per l'utilizzo online si consigliano i seguenti passaggi:

* Andare sul sito di edamam.com e registrarsi per ottenere le credenziali.

* Creare nella root del progetto il file .env con le chiavi "REACT_APP_APP_ID" e "REACT_APP_APP_KEY".

* Scaricare il progetto ed aprirlo nel proprio editor preferito


* installare le dipendenze: 
  ```
  npm install
  ```
* avviare la build: 
  ```
  npm run build
  ```
* avviare il webserver in locale:
  ```
  npm start
  ```

Ecco che il progetto sarà visibile all'indirizzo:
http://localhost:3000

A seguire il link dove è possibile provare l'applicazione.

Happy Coding!

## Live Demo:

https://mydailymeals.netlify.app/
