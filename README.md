# Exemple de backend + frontend payzen

# backend

basé sur express.js

## Run

```
cd backend
npm start
```

url: http://localhost:3000/payment

# frontend

basé sur Angular

librairie lyra/embedded-form-glue:
https://github.com/lyra/embedded-form-glue/tree/master/examples/angular/minimal-example
https://github.com/lyra/embedded-form-glue/issues/155

documentation OSB:
https://secure.osb.pf/doc/fr-FR/rest/V4.0/javascript/quick_start_popin.html
https://secure.osb.pf/doc/en-EN/rest/V4.0/javascript/

## Démo

Terminal 1 : lancement du backend

```bash
cd backend
npm install

## créer un fichier backend/.env en se basant sur backend/example.env

npm start
```


Terminal 2 : lancement du frontend

```bash
cd frontend/basic-popin-single-page # ou frontend/basic-single-page pour le formulaire intégré dans la page
npm install

## créer un fichier dans src/app/environments/environment.ts en se basant sur src/app/environments/environment.example.ts

ng serve --host 0.0.0.0 --port <myport> --disable-host-check
```


url: http://localhost:<port>/
