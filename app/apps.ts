export type Platform = 'Mac' | 'Android';
export type App = {
  name: string;
  slug: string;
  desc: string;
  category: string;
  about: string;
  useful: string;
  url: string | null;
  platform?: Platform;
  icon?: string;
  note?: string;
};
export const apps: App[] = [
  {
    name: 'Rectangle',
    slug: 'rectangle',
    desc: 'Ogni finestra, al posto giusto.',
    category: 'Produttività',
    about:
      'Organizza le finestre con scorciatoie da tastiera e trascinandole ai bordi dello schermo. Affianca due app o distribuisci il lavoro in una griglia.',
    useful: 'Per lavorare con più finestre senza sistemarle ogni volta a mano.',
    url: 'https://rectangleapp.com/',
  },
  {
    name: 'Maccy',
    slug: 'maccy',
    desc: 'Tutto quello che copi. A portata di mano.',
    category: 'Produttività',
    about:
      'Una cronologia degli appunti leggera, accessibile dalla barra dei menu. Cerca tra gli elementi copiati e recupera quello che ti serve.',
    useful: 'Per ritrovare un link o un testo copiato qualche minuto fa.',
    url: 'https://maccy.app/',
  },
  {
    name: 'Keka',
    slug: 'keka',
    desc: 'File più piccoli. Possibilità più grandi.',
    category: 'File e spazio',
    about:
      'Comprimi ed estrai archivi in molti formati. Puoi proteggere gli archivi con una password e dividere i file più grandi in più parti.',
    useful: 'Per gestire ZIP, RAR e 7Z con un semplice trascinamento.',
    url: 'https://www.keka.io/',
  },
  {
    name: 'Amphetamine',
    slug: 'amphetamine',
    desc: 'Il tuo Mac resta sveglio, quando serve.',
    category: 'Utility',
    about:
      'Controlla quando il Mac può andare in stop. Avvia una sessione dalla barra dei menu e imposta una durata o condizioni personalizzate.',
    useful:
      'Durante download, presentazioni e attività che richiedono il Mac attivo.',
    url: 'https://apps.apple.com/app/amphetamine/id937984704',
  },
  {
    name: 'Blip',
    slug: 'blip',
    icon: 'blip.jpg',
    desc: 'I tuoi file, da un dispositivo all’altro.',
    category: 'File e spazio',
    about:
      'Invia file e cartelle direttamente ad altri dispositivi con Blip. I trasferimenti funzionano anche tra piattaforme diverse, senza dover creare un link pubblico.',
    useful: 'Per spostare file tra Mac, telefono e altri computer.',
    url: 'https://blip.net/',
  },
  {
    name: 'CotEditor',
    slug: 'coteditor',
    desc: 'Un editor di testo che si sente a casa.',
    category: 'Scrittura e codice',
    about:
      'Un editor di testo semplice e nativo per macOS, con evidenziazione della sintassi, ricerca avanzata e strumenti per lavorare con testo e codice.',
    useful: 'Per aprire velocemente file di testo, script e configurazioni.',
    url: 'https://coteditor.com/',
  },
  {
    name: 'Pearcleaner',
    slug: 'pearcleaner',
    desc: 'Disinstalla le app, senza lasciare tracce.',
    category: 'File e spazio',
    about:
      'Individua un’app e i file di supporto associati, così puoi esaminarli prima di rimuoverli. Include strumenti per trovare residui di applicazioni.',
    useful: 'Per fare ordine quando elimini software che non usi più.',
    url: 'https://github.com/alienator88/Pearcleaner',
  },
  {
    name: 'LinearMouse',
    slug: 'linearmouse',
    desc: 'Il mouse, esattamente come lo vuoi.',
    category: 'Personalizzazione',
    about:
      'Personalizza velocità del puntatore, accelerazione, scorrimento e pulsanti. Puoi configurare mouse e trackpad separatamente.',
    useful: 'Per rendere più naturale l’utilizzo di un mouse esterno sul Mac.',
    url: 'https://linearmouse.app/',
  },
  {
    name: 'Klack',
    slug: 'klack',
    desc: 'Il piacere di una tastiera meccanica.',
    category: 'Personalizzazione',
    about:
      'Aggiunge suoni di tastiere meccaniche alla digitazione. Scegli un suono e regola l’esperienza dalla barra dei menu.',
    useful: 'Per chi ama il feedback sonoro dei tasti, anche sul portatile.',
    url: 'https://tryklack.com/',
  },
  {
    name: 'Android File Transfer',
    slug: 'android-file-transfer',
    desc: 'Il collegamento storico tra Android e Mac.',
    category: 'File e spazio',
    about:
      'La storica utility Google per trasferire file tramite USB tra dispositivi Android e Mac.',
    useful: 'Una voce della selezione originale, conservata come riferimento.',
    url: null,
    note: 'Il download ufficiale non è più disponibile dalla precedente pagina Google. Questa scheda rimane in archivio; per i trasferimenti tra dispositivi puoi esplorare Blip.',
  },
  {
    name: 'Blu-ray Player Pro',
    slug: 'blu-ray-player-pro',
    desc: 'La tua collezione Blu-ray, sul Mac.',
    category: 'Video e media',
    about:
      'Macgo Mac Blu-ray Player Pro riproduce dischi Blu-ray, menu, immagini ISO e diversi formati video sul Mac.',
    useful:
      'Per guardare la tua collezione di dischi con un lettore compatibile.',
    url: 'https://www.macblurayplayer.com/',
  },
  {
    name: 'Cling',
    slug: 'cling',
    desc: 'Trova quel file. Anche al primo tentativo.',
    category: 'Produttività',
    about:
      'Cerca velocemente i file con una ricerca approssimata del nome. Dalla finestra dei risultati puoi aprirli, copiarli o trascinarli dove servono.',
    useful:
      'Quando ricordi parte di un nome, ma non la cartella in cui l’hai salvato.',
    url: 'https://lowtechguys.com/cling/',
  },
  {
    name: 'FluxMarkdown',
    slug: 'fluxmarkdown',
    desc: 'Il Markdown, già bello in Anteprima rapida.',
    category: 'Scrittura e codice',
    about:
      'Estende Anteprima rapida del Finder per visualizzare documenti Markdown, inclusi diagrammi Mermaid e formule matematiche.',
    useful:
      'Per leggere un README premendo la barra spaziatrice, senza aprire un editor.',
    url: 'https://github.com/xykong/flux-markdown',
  },
  {
    name: 'KeyboardCleanTool',
    slug: 'keyboardcleantool',
    desc: 'Pulisci i tasti. Senza scrivere per sbaglio.',
    category: 'Utility',
    about:
      'Blocca temporaneamente gli input della tastiera per permetterti di pulirla senza attivare scorciatoie o digitare caratteri.',
    useful: 'Per la pulizia periodica della tastiera del Mac.',
    url: 'https://folivora.ai/keyboardcleantool/',
  },
  {
    name: 'LaunchOS',
    slug: 'launchos',
    icon: 'launchos.svg',
    desc: 'Tutte le tue app. Come nel Launchpad.',
    category: 'Personalizzazione',
    about:
      'Riporta una griglia di applicazioni in stile Launchpad, con cartelle e organizzazione delle icone.',
    useful: 'Per chi preferisce aprire le app da una griglia visiva.',
    url: 'https://launchosapp.com/',
    note: 'Controlla i requisiti della versione sul sito ufficiale: LaunchOS è pensato per le versioni recenti di macOS.',
  },
  {
    name: 'Mac Sai',
    slug: 'mac-sai',
    desc: 'Uno spazio per prenderti cura del Mac.',
    category: 'Utility',
    about:
      'Un’app open source con strumenti di pulizia, disinstallazione, analisi dello spazio e manutenzione, in un’interfaccia SwiftUI.',
    useful: 'Per raccogliere diverse attività di manutenzione in una sola app.',
    url: 'https://github.com/iliyami/MacSai',
  },
  {
    name: 'MakeMKV',
    slug: 'makemkv',
    desc: 'Dai tuoi dischi a un file MKV.',
    category: 'Video e media',
    about:
      'Converte i contenuti dei dischi DVD e Blu-ray in file MKV, mantenendo tracce audio, video e capitoli.',
    useful: 'Per gestire in formato digitale i contenuti dei tuoi dischi.',
    url: 'https://www.makemkv.com/',
  },
  {
    name: 'MarkText',
    slug: 'marktext',
    desc: 'Scrivi in Markdown, senza distrazioni.',
    category: 'Scrittura e codice',
    about:
      'Un editor Markdown con anteprima durante la scrittura e un’interfaccia essenziale, disponibile anche su altre piattaforme.',
    useful: 'Per appunti, documentazione e testi in Markdown.',
    url: 'https://github.com/marktext/marktext',
  },
  {
    name: 'OmniDiskSweeper',
    slug: 'omnidisksweeper',
    desc: 'Scopri dove finisce tutto quello spazio.',
    category: 'File e spazio',
    about:
      'Mostra cartelle e file ordinati per dimensione, per aiutarti a individuare cosa occupa il disco.',
    useful: 'Per trovare cartelle dimenticate e file particolarmente grandi.',
    url: 'https://www.omnigroup.com/more',
  },
  {
    name: 'Sleepless',
    slug: 'sleepless',
    desc: 'Un piccolo aiuto contro lo stop.',
    category: 'Utility',
    about: 'Un’utility per impedire al Mac di andare in stop.',
    useful: 'Quando vuoi mantenere il computer attivo durante un’attività.',
    url: 'https://apps.apple.com/app/sleepless/id926084628',
    note: 'Questa scheda si riferisce a Sleepless di Object, presente sul Mac App Store. Esistono anche app omonime.',
  },
  {
    name: 'Stirling-PDF',
    slug: 'stirling-pdf',
    desc: 'Tanti strumenti. Un solo posto per i PDF.',
    category: 'Scrittura e codice',
    about:
      'Una raccolta di strumenti per unire, dividere, convertire e organizzare documenti PDF, con opzioni per lavorare localmente.',
    useful:
      'Per le operazioni quotidiane sui PDF, senza passare tra tanti servizi.',
    url: 'https://www.stirling.com/',
  },
  {
    name: 'Sublime Text',
    slug: 'sublime-text',
    desc: 'Un editor veloce, anche quando il codice cresce.',
    category: 'Scrittura e codice',
    about:
      'Un editor per codice, markup e testo, con selezioni multiple, ricerca nei progetti e un sistema di pacchetti per estenderlo.',
    useful: 'Per modificare testo e codice con strumenti rapidi da tastiera.',
    url: 'https://www.sublimetext.com/',
  },
  {
    name: 'Transnomino',
    slug: 'transnomino',
    icon: 'transnomino.webp',
    desc: 'Un nome migliore. Per tutti i tuoi file.',
    category: 'File e spazio',
    about:
      'Rinomina molti file in una volta con sostituzioni, numerazioni e regole basate sugli attributi dei file.',
    useful: 'Per mettere ordine nei nomi di foto, documenti ed esportazioni.',
    url: 'https://www.transnomino.com/',
  },
  {
    name: 'UPDF',
    slug: 'updf',
    desc: 'Leggi, annota e modifica i tuoi PDF.',
    category: 'Scrittura e codice',
    about:
      'Un editor PDF con strumenti per annotare, modificare contenuti, organizzare pagine e convertire documenti.',
    useful: 'Per lavorare sui documenti PDF in un’unica interfaccia.',
    url: 'https://updf.com/updf-for-mac/',
  },
  {
    name: 'DBase Downloader',
    slug: 'dbase-downloader',
    platform: 'Android',
    icon: 'dbase-downloader.png',
    desc: 'Video e musica da oltre 1.750 siti.',
    category: 'Video e media',
    about:
      'Scarica video e audio dai siti supportati da yt-dlp, con strumenti per scegliere il formato, gestire code e convertire i file tramite FFmpeg.',
    useful:
      'Per salvare sul dispositivo contenuti che hai il diritto di scaricare.',
    url: 'https://f-droid.org/packages/rs.in.dbase.downloader/',
    note: 'Usa l’app nel rispetto dei diritti d’autore e delle condizioni dei servizi da cui scarichi.',
  },
  {
    name: 'FotMob',
    slug: 'fotmob',
    platform: 'Android',
    icon: 'fotmob.png',
    desc: 'Il calcio, senza complicazioni.',
    category: 'Sport',
    about:
      'Raccoglie risultati in diretta, calendari, classifiche, statistiche, notizie e aggiornamenti sulle principali competizioni calcistiche.',
    useful:
      'Per seguire squadre, campionati e partite da un’unica app semplice da consultare.',
    url: 'https://www.fotmob.com/download',
  },
  {
    name: 'Liseur',
    slug: 'liseur',
    platform: 'Android',
    icon: 'liseur.png',
    desc: 'La tua libreria EPUB, sempre con te.',
    category: 'Lettura',
    about:
      'Un lettore EPUB open source che gestisce libri locali e librerie calibre-web, Komga e OPDS, con temi, annotazioni e sincronizzazione della posizione.',
    useful:
      'Per leggere senza pubblicità e riunire libri locali e librerie personali in uno scaffale.',
    url: 'https://f-droid.org/packages/com.chmouel.liseur/',
  },
  {
    name: 'PXPlay',
    slug: 'pxplay',
    platform: 'Android',
    icon: 'pxplay.png',
    desc: 'La tua PlayStation, anche lontano dalla TV.',
    category: 'Giochi',
    about:
      'Un client Remote Play ottimizzato per giocare in streaming dalla PlayStation, con supporto per controller di terze parti, rimappatura e connessioni mobili.',
    useful:
      'Per giocare da telefono, tablet o Android TV usando il controller che preferisci.',
    url: 'https://play.google.com/store/apps/details?id=psplay.grill.com',
    note: 'PXPlay è un’app a pagamento e non è affiliata a Sony.',
  },
  {
    name: 'Soothing Noise Player',
    slug: 'soothing-noise-player',
    platform: 'Android',
    icon: 'soothing-noise-player.png',
    desc: 'Suoni rilassanti, senza distrazioni.',
    category: 'Benessere',
    about:
      'Riproduce e combina rumore bianco e altri suoni rilassanti, con volumi separati, profili personalizzati e timer di spegnimento.',
    useful:
      'Per coprire i rumori di fondo mentre dormi, studi o cerchi concentrazione.',
    url: 'https://f-droid.org/packages/ie.delilahsthings.soothingloop/',
  },
  {
    name: 'Tabata Xtreme',
    slug: 'tabata-xtreme',
    platform: 'Android',
    icon: 'tabata-xtreme.png',
    desc: 'Intervalli Tabata, configurati come vuoi.',
    category: 'Benessere',
    about:
      'Un timer open source per allenamenti Tabata con durate personalizzabili per preparazione, lavoro, riposo, serie e round.',
    useful:
      'Per guidare allenamenti a intervalli senza pubblicità, analisi o permessi di rete.',
    url: 'https://f-droid.org/packages/com.fiveseven.tabataxtreme/',
  },
  {
    name: 'YTDLnis',
    slug: 'ytdlnis',
    platform: 'Android',
    icon: 'ytdlnis.png',
    desc: 'Download audio e video con yt-dlp.',
    category: 'Video e media',
    about:
      'Un’interfaccia gratuita e open source per yt-dlp che permette di configurare formato, qualità e metadati dei download su Android.',
    useful:
      'Per archiviare video o musica che hai il diritto di scaricare, con controlli più avanzati sul risultato.',
    url: 'https://ytdlnis.org/',
    note: 'Non è disponibile sul Play Store. Scaricala solo dal sito ufficiale, da GitHub o da F-Droid e rispetta i diritti sui contenuti.',
  },
  {
    name: 'Glextor App Manager',
    slug: 'glextor-app-manager',
    platform: 'Android',
    icon: 'glextor-app-manager.png',
    desc: 'Ogni app nella categoria giusta.',
    category: 'Utility',
    about:
      'Organizza automaticamente le app installate in categorie e cartelle, con gruppi personalizzati, ricerca, preferiti e strumenti di gestione.',
    useful:
      'Per ritrovare velocemente le app quando il telefono ne contiene molte.',
    url: 'https://play.google.com/store/apps/details?id=com.glextor.appmanager.free',
  },
  {
    name: 'Adobe Scan',
    slug: 'adobe-scan',
    platform: 'Android',
    icon: 'adobe-scan.png',
    desc: 'Dalla carta a un PDF pulito.',
    category: 'Produttività',
    about:
      'Trasforma documenti, ricevute, moduli e lavagne in PDF o JPEG, rilevando i bordi e migliorando automaticamente la scansione; include il riconoscimento del testo.',
    useful:
      'Per digitalizzare documenti fisici con la fotocamera e conservarli o condividerli.',
    url: 'https://play.google.com/store/apps/details?id=com.adobe.scan.android',
    note: 'Il download è gratuito; alcune funzioni avanzate possono richiedere acquisti o un abbonamento.',
  },
];
export function appPlatform(app: App): Platform {
  return app.platform || 'Mac';
}
export function filterApps(
  category: string,
  query: string,
  platform: Platform = 'Mac',
) {
  const q = query.trim().toLocaleLowerCase('it');
  return apps.filter(
    (a) =>
      appPlatform(a) === platform &&
      (category === 'Tutte le app' || a.category === category) &&
      (!q ||
        `${a.name} ${a.desc} ${a.category}`
          .toLocaleLowerCase('it')
          .includes(q)),
  );
}
