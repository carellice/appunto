<div align="center">
  <img src="public/favicon.svg" alt="Icona Appunto" width="88" height="88">
  <h1>Appunto</h1>
  <p>Una selezione personale di app per Mac, presentata con un’interfaccia ispirata ai dispositivi Apple.</p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/stato-sviluppo%20locale-087cff?style=flat-square" alt="Sviluppo locale">
  <img src="https://img.shields.io/badge/interfaccia-Liquid%20Glass-6f5bd3?style=flat-square" alt="Liquid Glass">
  <img src="https://img.shields.io/badge/app-24-18304d?style=flat-square" alt="24 app">
</p>

## Cos’è

Appunto è un piccolo catalogo editoriale di applicazioni selezionate personalmente: strumenti utili, curati e piacevoli da usare ogni giorno. Il progetto è pensato per crescere in futuro con raccolte dedicate a iPhone, iPad e Android.

L’esperienza cambia in base al dispositivo:

- **Mac:** desktop e finestra ispirati a macOS;
- **iPad:** layout ottimizzato per una superficie più ampia;
- **iPhone:** Home a pagine orizzontali in stile iOS, con Dock e Spotlight.

## Funzionalità

- Catalogo di 24 app Mac organizzato per categorie.
- Schede dettagliate con descrizione, utilità e collegamento al sito ufficiale.
- Dock macOS con cinque app casuali e tooltip delle icone.
- Pila delle categorie con apertura verso l’alto e chiusura facendo clic fuori.
- Icona desktop per cambiare sfondo con varianti casuali scure e ad alto contrasto.
- Impostazioni per aspetto, animazioni, vista del catalogo e sfondo.
- Home iPhone con pagine a scorrimento orizzontale, indicatori pagina e ricerca Spotlight.
- Schermata di avvio in stile accensione Mac con il logo Appunto e preload delle icone.
- Caricamento degli asset senza cache tramite intestazioni `no-store`.
- Supporto a tema chiaro/scuro e rispetto delle preferenze di movimento del sistema.

## Avvio locale

Richiede Node.js 22 o superiore.

```bash
npm install
npm run dev
```

Apri poi [http://localhost:3000](http://localhost:3000).

Per creare una build locale:

```bash
npm run build
```

Il progetto è configurato per rimanere in esecuzione locale durante questa fase. Non è previsto alcun deploy automatico.

## Struttura principale

```text
app/
├── apps.ts           # Catalogo e metadati delle applicazioni
├── page.tsx          # Desktop, Home iOS e interazioni principali
├── system-panel.tsx  # Impostazioni e pannelli di sistema
├── layout.tsx        # Metadati, viewport e policy anti-cache
└── globals.css       # Liquid Glass, responsive layout e animazioni
public/
├── icons/            # Icone delle applicazioni
└── favicon.svg       # Icona ufficiale di Appunto
```

## Personalizzazione

Per aggiungere o modificare un’app aggiorna `app/apps.ts` e inserisci la relativa icona in `public/icons`. Gli sfondi casuali sono definiti in `app/page.tsx`; i dettagli visivi e i breakpoint responsive si trovano in `app/globals.css`.

## Licenza e attribuzione

Appunto è un progetto indipendente e non affiliato ad Apple. Le icone e i marchi delle applicazioni appartengono ai rispettivi sviluppatori.
