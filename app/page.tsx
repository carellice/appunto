'use client';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  Grid2X2,
  Monitor,
  Smartphone,
  Tablet,
  Search,
  ChevronLeft,
  ChevronRight,
  PanelLeft,
  List,
  Wifi,
  BatteryFull,
  SlidersHorizontal,
  Sparkles,
  Folder,
  ArrowUpRight,
  Command,
  MousePointer2,
  FileText,
  Wrench,
  Play,
  Info,
  X,
  Disc3,
  Cable,
  Signal,
  Check,
  Ellipsis,
  Image as ImageIcon,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { apps, appPlatform, filterApps, type App, type Platform } from './apps';
import { SystemPanel, type Panel } from './system-panel';
const categoryDefinitions = [
  { name: 'Produttività', icon: Command },
  { name: 'File e spazio', icon: Folder },
  { name: 'Scrittura e codice', icon: FileText },
  { name: 'Personalizzazione', icon: MousePointer2 },
  { name: 'Utility', icon: Wrench },
  { name: 'Video e media', icon: Play },
  { name: 'Sport', icon: Sparkles },
  { name: 'Lettura', icon: FileText },
  { name: 'Giochi', icon: Play },
  { name: 'Benessere', icon: Sparkles },
];
const wallpapers = [
  'radial-gradient(ellipse at 90% 0%, #225e86 0, transparent 50%), radial-gradient(ellipse at 12% 34%, #071b67 0, transparent 52%), radial-gradient(ellipse at 88% 87%, #312564 0, transparent 44%), linear-gradient(135deg, #102d65, #24547b 43%, #4b568e 68%, #102f62)',
  'radial-gradient(ellipse at 12% 8%, #713e3d 0, transparent 46%), radial-gradient(ellipse at 86% 18%, #7e2e69 0, transparent 48%), radial-gradient(ellipse at 55% 94%, #32235e 0, transparent 55%), linear-gradient(145deg, #572f45, #66375f 48%, #263567)',
  'radial-gradient(ellipse at 90% 2%, #1b5e5e 0, transparent 45%), radial-gradient(ellipse at 10% 80%, #062e55 0, transparent 52%), radial-gradient(ellipse at 58% 40%, #2e7180 0, transparent 55%), linear-gradient(140deg, #0a2948, #235b6b 48%, #3c5f5a)',
  'radial-gradient(ellipse at 18% 0%, #80632c 0, transparent 46%), radial-gradient(ellipse at 94% 78%, #833d36 0, transparent 48%), radial-gradient(ellipse at 42% 52%, #403078 0, transparent 55%), linear-gradient(135deg, #513c2d, #5d3d67 48%, #293267)',
];
function AppIcon({ app }: { app: App }) {
  const generic = appPlatform(app) === 'Android' && !app.icon;
  return (
    <span
      className={`app-icon ${app.slug === 'android-file-transfer' || app.slug === 'makemkv' || generic ? 'generic-icon' : ''}`}
    >
      {app.slug === 'android-file-transfer' ? (
        <Cable />
      ) : app.slug === 'makemkv' ? (
        <Disc3 />
      ) : generic ? (
        <b aria-hidden="true">{app.name.slice(0, 2).toUpperCase()}</b>
      ) : (
        <img
          src={`/icons/${app.icon || app.slug + '.png'}`}
          alt=""
          width={64}
          height={64}
          loading="lazy"
        />
      )}
    </span>
  );
}
export default function Home() {
  const [platform, setPlatform] = useState<Platform>('Mac');
  const [category, setCategory] = useState('Tutte le app');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<App | null>(null);
  const [appOpen, setAppOpen] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [windowMotion, setWindowMotion] = useState('');
  const motionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [appearance, setAppearance] = useState('system');
  const [animations, setAnimations] = useState(true);
  const [prefsReady, setPrefsReady] = useState(false);
  const [about, setAbout] = useState(false);
  const [mobileCategories, setMobileCategories] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [windowOpen, setWindowOpen] = useState(true);
  const [maximized, setMaximized] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const [clock, setClock] = useState('');
  const [date, setDate] = useState('');
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const [dockStackOpen, setDockStackOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [mobilePage, setMobilePage] = useState(0);
  const [iosCategory, setIosCategory] = useState('Tutte le app');
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState(['Tutte le app']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(
    null,
  );
  const dockStackRef = useRef<HTMLDivElement>(null);
  const [dockApps, setDockApps] = useState(() =>
    apps.filter((app) => appPlatform(app) === 'Mac').slice(0, 5),
  );
  const platformApps = useMemo(
    () => apps.filter((app) => appPlatform(app) === platform),
    [platform],
  );
  const macApps = useMemo(
    () => apps.filter((app) => appPlatform(app) === 'Mac'),
    [],
  );
  const categories = useMemo(
    () =>
      categoryDefinitions.filter((item) =>
        platformApps.some((app) => app.category === item.name),
      ),
    [platformApps],
  );
  const filtered = filterApps(category, query, platform);
  const mobileApps = useMemo(
    () => apps.filter((app) => appPlatform(app) === platform),
    [platform],
  );
  const mobileResults = filterApps('Tutte le app', query, platform);
  const iosApps = useMemo(() => {
    return iosCategory === 'Tutte le app'
      ? mobileApps
      : mobileApps.filter((app) => app.category === iosCategory);
  }, [iosCategory, mobileApps]);
  const mobilePages = useMemo(
    () =>
      Array.from(
        { length: Math.max(1, Math.ceil(iosApps.length / 16)) },
        (_, index) => iosApps.slice(index * 16, index * 16 + 16),
      ),
    [iosApps],
  );
  useEffect(() => {
    setDockApps(
      [...apps]
        .filter((app) => appPlatform(app) === 'Mac')
        .sort(() => Math.random() - 0.5)
        .slice(0, 5),
    );
  }, []);
  useEffect(() => {
    let cancelled = false;
    const assets = [
      '/favicon.svg',
      ...apps
        .filter(
          (app) =>
            appPlatform(app) === 'Mac' &&
            (app.icon || app.slug !== 'android-file-transfer'),
        )
        .map((app) => `/icons/${app.icon || app.slug + '.png'}`),
    ];
    const started = performance.now();
    let loaded = 0;
    const update = () => {
      loaded += 1;
      if (!cancelled)
        setBootProgress(Math.round((loaded / assets.length) * 100));
    };
    const preload = assets.map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.onload = () => {
            update();
            resolve();
          };
          image.onerror = () => {
            update();
            resolve();
          };
          image.src = `${src}?boot=${Date.now()}`;
        }),
    );
    Promise.allSettled(preload).then(() => {
      const remaining = Math.max(0, 900 - (performance.now() - started));
      window.setTimeout(() => {
        if (!cancelled) {
          setBootProgress(100);
          setBooting(false);
        }
      }, remaining);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let active: HTMLElement | null = null;
    const reset = () => {
      cancelAnimationFrame(frame);
      active?.style.removeProperty('--light-x');
      active?.style.removeProperty('--light-y');
      active = null;
    };
    const move = (event: PointerEvent) => {
      if (
        event.pointerType !== 'mouse' ||
        media.matches ||
        document.documentElement.dataset.motion === 'reduced'
      )
        return;
      const source = event.target as Element | null;
      const target =
        source?.closest<HTMLElement>('.mac-window.glass') ||
        source?.closest<HTMLElement>('.glass');
      if (!target) {
        reset();
        return;
      }
      if (active && active !== target) {
        active.style.removeProperty('--light-x');
        active.style.removeProperty('--light-y');
      }
      active = target;
      const x = event.clientX,
        y = event.clientY;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--light-x', `${x - rect.left}px`);
        target.style.setProperty('--light-y', `${y - rect.top}px`);
      });
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', reset);
    };
  }, []);
  function openWindow() {
    if (motionTimer.current) clearTimeout(motionTimer.current);
    setWindowOpen(true);
    setMinimized(false);
    setWindowMotion('window-opening');
    motionTimer.current = setTimeout(() => setWindowMotion(''), 420);
  }
  function hideWindow(minimize = false) {
    if (!windowOpen) return;
    if (motionTimer.current) clearTimeout(motionTimer.current);
    setWindowMotion(minimize ? 'window-minimizing' : 'window-closing');
    const ms =
      animations &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 300
        : 0;
    motionTimer.current = setTimeout(() => {
      setWindowOpen(false);
      setMinimized(minimize);
      setWindowMotion('');
    }, ms);
  }
  function zoomWindow() {
    openWindow();
    setMaximized((m) => !m);
    setPosition({ x: 0, y: 0 });
  }
  function centerWindow() {
    openWindow();
    setMaximized(false);
    setPosition({ x: 0, y: 0 });
  }
  function showApp(app: App) {
    setPanel(null);
    setSelected(app);
    setAppOpen(true);
  }
  function navigate(name: string) {
    setCategory(name);
    setQuery('');
    openWindow();
    setMobileCategories(false);
    setHistory((h) => [...h.slice(0, historyIndex + 1), name]);
    setHistoryIndex((i) => i + 1);
    scrollRef.current?.scrollTo({ top: 0 });
  }
  function selectPlatform(next: Platform) {
    setPlatform(next);
    setCategory('Tutte le app');
    setQuery('');
    setHistory(['Tutte le app']);
    setHistoryIndex(0);
    openWindow();
    scrollRef.current?.scrollTo({ top: 0 });
  }
  function step(delta: number) {
    const i = historyIndex + delta;
    if (i < 0 || i >= history.length) return;
    setHistoryIndex(i);
    setCategory(history[i]);
    setQuery('');
    scrollRef.current?.scrollTo({ top: 0 });
  }
  function find() {
    setPanel('search');
  }
  function changeWallpaper() {
    setWallpaperIndex((current) => {
      let next = current;
      while (next === current)
        next = Math.floor(Math.random() * wallpapers.length);
      return next;
    });
  }
  useEffect(() => {
    if (!dockStackOpen) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (!dockStackRef.current?.contains(event.target as Node))
        setDockStackOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutside);
    return () => document.removeEventListener('pointerdown', closeOnOutside);
  }, [dockStackOpen]);
  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem('appunto-preferences') || '{}');
      if (['system', 'light', 'dark'].includes(p.appearance))
        setAppearance(p.appearance);
      if (typeof p.animations === 'boolean') setAnimations(p.animations);
    } catch {}
    setPrefsReady(true);
    return () => {
      if (motionTimer.current) clearTimeout(motionTimer.current);
    };
  }, []);
  useEffect(() => {
    if (!prefsReady) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => {
      document.documentElement.dataset.theme =
        appearance === 'system'
          ? media.matches
            ? 'dark'
            : 'light'
          : appearance;
    };
    update();
    media.addEventListener('change', update);
    document.documentElement.dataset.motion = animations ? 'full' : 'reduced';
    try {
      localStorage.setItem(
        'appunto-preferences',
        JSON.stringify({ appearance, animations }),
      );
    } catch {}
    return () => media.removeEventListener('change', update);
  }, [appearance, animations, prefsReady]);
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setClock(
        n.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      );
      setDate(
        n.toLocaleDateString('it-IT', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }),
      );
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === 'k') {
        e.preventDefault();
        find();
      }
      if (e.key === ',') {
        e.preventDefault();
        setPanel('settings');
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        zoomWindow();
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [animations, windowOpen]);
  const menus = [
    {
      label: '',
      accessible: 'Menu Apple',
      items: [
        {
          label: 'Informazioni su questo desktop',
          action: () => setPanel('desktop'),
        },
        {
          label: 'Impostazioni di Appunto…',
          action: () => setPanel('settings'),
        },
        { label: 'Mostra la raccolta', action: openWindow },
        { label: 'Riordina il desktop', action: centerWindow },
      ],
    },
    {
      label: 'Appunto',
      accessible: 'Menu Appunto',
      items: [
        { label: 'Informazioni su Appunto', action: () => setAbout(true) },
        { label: 'Impostazioni…', action: () => setPanel('settings') },
        { label: 'Nascondi Appunto', action: () => hideWindow(true) },
        { label: 'Mostra Appunto', action: openWindow },
      ],
    },
    {
      label: 'File',
      accessible: 'Menu File',
      items: [
        { label: 'Apri la raccolta', action: () => navigate('Tutte le app') },
        {
          label: 'Esplora le categorie…',
          action: () => setMobileCategories(true),
        },
        { label: 'Cerca un’app…     ⌘K', action: find },
        { label: 'Chiudi finestra', action: () => hideWindow() },
      ],
    },
    {
      label: 'Vista',
      accessible: 'Menu Vista',
      items: [
        {
          label: `${view === 'grid' ? '✓ ' : ''}Come griglia`,
          action: () => {
            setView('grid');
            openWindow();
          },
        },
        {
          label: `${view === 'list' ? '✓ ' : ''}Come elenco`,
          action: () => {
            setView('list');
            openWindow();
          },
        },
        {
          label: sidebar ? 'Nascondi barra laterale' : 'Mostra barra laterale',
          action: () => setSidebar((s) => !s),
        },
        { label: 'Aspetto e animazioni…', action: () => setPanel('settings') },
      ],
    },
    {
      label: 'Finestra',
      accessible: 'Menu Finestra',
      items: [
        { label: 'Riduci nel Dock', action: () => hideWindow(true) },
        {
          label: maximized ? 'Ripristina dimensioni' : 'Espandi finestra',
          action: zoomWindow,
        },
        { label: 'Centra la finestra', action: centerWindow },
        { label: 'Porta Appunto in primo piano', action: openWindow },
      ],
    },
    {
      label: 'Aiuto',
      accessible: 'Menu Aiuto',
      items: [
        { label: 'Come usare Appunto', action: () => setPanel('help') },
        { label: 'Scorciatoie da tastiera', action: () => setPanel('help') },
        { label: 'Informazioni sulla selezione', action: () => setAbout(true) },
      ],
    },
  ];
  return (
    <div
      className={`desktop ${maximized && windowOpen ? 'is-maximized' : ''}`}
      style={{ background: wallpapers[wallpaperIndex] }}
    >
      <header className="menubar">
        <div>
          {menus.map((menu) => (
            <DropdownMenu key={menu.accessible}>
              <DropdownMenuTrigger
                aria-label={menu.accessible}
                className={`menu-trigger ${menu.label === '' ? 'apple' : menu.label === 'Appunto' ? 'menu-title' : ''}`}
              >
                {menu.label}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="os-menu glass">
                {menu.items.map((item) => (
                  <DropdownMenuItem key={item.label} onClick={item.action}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
        <div>
          <button
            aria-label="Stato batteria"
            title="Batteria"
            onClick={() => setPanel('battery')}
          >
            <BatteryFull size={20} />
          </button>
          <button
            aria-label="Stato connessione"
            title="Connessione"
            onClick={() => setPanel('connection')}
          >
            <Wifi size={17} />
          </button>
          <button aria-label="Cerca un’app" title="Cerca · ⌘K" onClick={find}>
            <Search size={16} />
          </button>
          <button
            aria-label="Centro di controllo"
            title="Centro di controllo"
            onClick={() => setPanel('settings')}
          >
            <SlidersHorizontal size={16} />
          </button>
          <button
            aria-label="Data e ora"
            className="clock-button"
            onClick={() => setPanel('clock')}
          >
            <span>{date}</span>
            <span>{clock}</span>
          </button>
        </div>
      </header>
      <div className="ios-status">
        <b>{clock}</b>
        <span aria-hidden="true">
          <Signal size={16} />
          <Wifi size={17} />
          <BatteryFull size={22} />
        </span>
      </div>
      <div className="desktop-caption">Un posto per le app fatte bene.</div>
      <section className="ios-home" aria-label="Home iOS">
        <div className="ios-home-top">
          {spotlightOpen ? (
            <div className="ios-spotlight-input">
              <Search size={19} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca nelle app"
                aria-label="Cerca nelle app"
              />
              <button
                aria-label="Chiudi Spotlight"
                onClick={() => {
                  setSpotlightOpen(false);
                  setQuery('');
                }}
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              className="ios-spotlight"
              onClick={() => {
                setSpotlightOpen(true);
                setQuery('');
              }}
            >
              <Search size={16} />
              <span>Cerca</span>
            </button>
          )}
          <button
            className="ios-home-categories"
            aria-label="Categorie"
            onClick={() => setMobileCategories(true)}
          >
            <Folder size={17} />
          </button>
          <button
            className="ios-home-profile"
            aria-label="Impostazioni"
            onClick={() => setPanel('settings')}
          >
            <SlidersHorizontal size={17} />
          </button>
        </div>
        {spotlightOpen ? (
          <div className="ios-spotlight-view">
            <div className="ios-spotlight-results">
              {mobileResults.map((app) => (
                <button key={app.slug} onClick={() => showApp(app)}>
                  <AppIcon app={app} />
                  <span>
                    <b>{app.name}</b>
                    <small>{app.category}</small>
                  </span>
                  <ChevronRight size={17} />
                </button>
              ))}
              {mobileResults.length === 0 && <p>Nessuna app trovata.</p>}
            </div>
          </div>
        ) : (
          <>
            <div className="ios-mobile-platform" role="group" aria-label="Piattaforma">
              {(['Mac', 'Android'] as const).map((item) => (
                <button
                  key={item}
                  className={platform === item ? 'active' : ''}
                  aria-pressed={platform === item}
                  onClick={() => {
                    setPlatform(item);
                    setIosCategory('Tutte le app');
                    setMobilePage(0);
                  }}
                >
                  {item === 'Mac' ? <Monitor size={15} /> : <Smartphone size={15} />}
                  {item}
                  <span>{apps.filter((app) => appPlatform(app) === item).length}</span>
                </button>
              ))}
            </div>
            <div className="ios-category-label">{iosCategory}</div>
            <div
              className="ios-app-grid"
              aria-label="Pagine app"
              onScroll={(event) => {
                const width = event.currentTarget.clientWidth;
                setMobilePage(
                  width
                    ? Math.round(event.currentTarget.scrollLeft / width)
                    : 0,
                );
              }}
            >
              {mobilePages.map((page, index) => (
                <div className="ios-home-page" key={index}>
                  {page.map((app) => (
                    <button
                      key={app.slug}
                      onClick={() => showApp(app)}
                      aria-label={`Apri ${app.name}`}
                    >
                      <AppIcon app={app} />
                      <span>{app.name}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="ios-page-dots" aria-hidden="true">
              {mobilePages.map((_, index) => (
                <i
                  key={index}
                  className={index === mobilePage ? 'active' : ''}
                />
              ))}
            </div>
            <div className="ios-home-dock">
              {apps.slice(0, 4).map((app) => (
                <button
                  key={app.slug}
                  onClick={() => showApp(app)}
                  aria-label={`Apri ${app.name}`}
                >
                  <AppIcon app={app} />
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </section>
      <div className="desktop-icons">
        {!windowOpen && (
          <>
            <button
              className="desktop-shortcut"
              onClick={changeWallpaper}
              aria-label="Cambia sfondo"
              title="Cambia sfondo"
            >
              <span className="brand-icon wallpaper-icon">
                <ImageIcon />
              </span>
              <span>Sfondo</span>
              <small>Casuale</small>
            </button>
            <button
              className="desktop-shortcut appunto-shortcut"
              onClick={openWindow}
            >
              <span className="brand-icon">
                <Command />
              </span>
              <span>Appunto</span>
              <small>Apri la raccolta</small>
            </button>
          </>
        )}
      </div>
      <main
        className={`mac-window glass ${windowMotion} ${!windowOpen ? 'window-hidden' : ''} ${!sidebar ? 'sidebar-hidden' : ''}`}
        style={
          {
            '--window-x': position.x + 'px',
            '--window-y': position.y + 'px',
          } as CSSProperties
        }
      >
        <SidebarProvider className="window-body">
          <Sidebar collapsible="none" className="finder-sidebar glass">
            <div className="traffic-lights">
              <button
                aria-label="Chiudi finestra"
                title="Chiudi finestra"
                onClick={() => hideWindow()}
              />
              <button
                aria-label="Riduci a icona"
                title="Riduci a icona"
                onClick={() => hideWindow(true)}
              />
              <button
                aria-label="Espandi finestra"
                title="Espandi finestra"
                onClick={zoomWindow}
              />
            </div>
            <div className="sidebar-brand">
              <div className="brand-icon">
                <Command />
              </div>
              <div>
                <b>Appunto</b>
                <small>Una selezione personale</small>
              </div>
            </div>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>La raccolta</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={category === 'Tutte le app'}
                      onClick={() => navigate('Tutte le app')}
                    >
                      <Grid2X2 />
                      <span>Tutte le app</span>
                      <span className="count">{platformApps.length}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Categorie</SidebarGroupLabel>
                <SidebarMenu>
                  {categories.map((c) => (
                    <SidebarMenuItem key={c.name}>
                      <SidebarMenuButton
                        isActive={category === c.name}
                        onClick={() => navigate(c.name)}
                      >
                        <c.icon />
                        <span>{c.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Dispositivi</SidebarGroupLabel>
                <button
                  className={`device ${platform === 'Mac' ? 'active' : ''}`}
                  onClick={() => selectPlatform('Mac')}
                >
                  <Monitor />
                  Mac<span>{macApps.length}</span>
                </button>
                <button
                  className={`device ${platform === 'Android' ? 'active' : ''}`}
                  onClick={() => selectPlatform('Android')}
                >
                  <Smartphone />
                  Android<span>{apps.length - macApps.length}</span>
                </button>
                <button className="device" onClick={() => setPanel('coming')}>
                  <Smartphone />
                  iPhone<small>In arrivo</small>
                </button>
                <button className="device" onClick={() => setPanel('coming')}>
                  <Tablet />
                  iPad<small>In arrivo</small>
                </button>
              </SidebarGroup>
            </SidebarContent>
            <button className="curator" onClick={() => setAbout(true)}>
              <span>F</span>
              <div>
                <b>Scelte da Flavio</b>
                <small>Utili. Curate. Personali.</small>
              </div>
              <Info size={14} />
            </button>
          </Sidebar>
          <section className="main-pane">
            <div
              className="window-toolbar"
              onDoubleClick={(e) => {
                if (!(e.target as Element).closest('button')) zoomWindow();
              }}
              onPointerDown={(e) => {
                if (
                  maximized ||
                  e.pointerType !== 'mouse' ||
                  (e.target as HTMLElement).closest('button,input,label')
                )
                  return;
                drag.current = {
                  x: e.clientX,
                  y: e.clientY,
                  px: position.x,
                  py: position.y,
                };
                e.currentTarget.setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!drag.current) return;
                setPosition({
                  x: Math.max(
                    -window.innerWidth * 0.25,
                    Math.min(
                      window.innerWidth * 0.25,
                      drag.current.px + e.clientX - drag.current.x,
                    ),
                  ),
                  y: Math.max(
                    -30,
                    Math.min(
                      window.innerHeight * 0.35,
                      drag.current.py + e.clientY - drag.current.y,
                    ),
                  ),
                });
              }}
              onPointerUp={() => {
                drag.current = null;
              }}
              onPointerCancel={() => {
                drag.current = null;
              }}
            >
              <button
                aria-label="Mostra o nascondi barra laterale"
                onClick={() => setSidebar((s) => !s)}
              >
                <PanelLeft />
              </button>
              <button
                className="toolbar-back"
                aria-label="Indietro"
                disabled={historyIndex === 0}
                onClick={() => step(-1)}
              >
                <ChevronLeft />
              </button>
              <button
                className="toolbar-forward"
                aria-label="Avanti"
                disabled={historyIndex === history.length - 1}
                onClick={() => step(1)}
              >
                <ChevronRight />
              </button>
              <b>{category}</b>
              <div className="toolbar-end glass">
                <button
                  aria-label="Vista a griglia"
                  aria-pressed={view === 'grid'}
                  onClick={() => setView('grid')}
                >
                  <Grid2X2 />
                </button>
                <button
                  aria-label="Vista a elenco"
                  aria-pressed={view === 'list'}
                  onClick={() => setView('list')}
                >
                  <List />
                </button>
                <span className="divider" />
                <button aria-label="Cerca" onClick={find}>
                  <Search />
                </button>
              </div>
            </div>
            <button
              className="ipad-handle"
              aria-label="Opzioni finestra"
              onClick={() => setPanel('settings')}
            >
              <Ellipsis />
            </button>
            <div className="catalog-scroll" ref={scrollRef}>
              <div className="catalog-heading">
                <div>
                  <div className="eyebrow">
                    {platform === 'Mac' ? (
                      <Monitor size={14} />
                    ) : (
                      <Smartphone size={14} />
                    )}{' '}
                    FATTE PER {platform === 'Mac' ? 'IL TUO MAC' : 'ANDROID'}
                  </div>
                  <h1>{category}</h1>
                  <p>Piccole scoperte che fanno la differenza, ogni giorno.</p>
                </div>
                <span className="selection-label glass">
                  <Sparkles size={14} /> Selezionate a mano
                </span>
              </div>
              {category === 'Tutte le app' && !query && (
                <div className="feature glass">
                  <div>
                    <span className="eyebrow">
                      MENO ATTRITO. PIÙ POSSIBILITÀ.
                    </span>
                    <h2>
                      {platform === 'Mac' ? 'Il tuo Mac.' : 'Il tuo Android.'}
                      <br />
                      Con una marcia in più.
                    </h2>
                    <p>
                      App essenziali, scelte una per una.
                      <br />
                      Trova quella che ti mancava.
                    </p>
                  </div>
                  <div className="feature-icons">
                    {platformApps.slice(0, 3).map((a) => (
                      <button
                        key={a.slug}
                        onClick={() => showApp(a)}
                        aria-label={`Scopri ${a.name}`}
                      >
                        <AppIcon app={a} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="section-label">
                <h2>
                  {query
                    ? 'Risultati di ricerca'
                    : category === 'Tutte le app'
                      ? 'La collezione'
                      : category}
                </h2>
                <label className="search-field glass">
                  <Search size={15} />
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cerca un’app"
                    aria-label="Cerca nel catalogo"
                  />
                  {query ? (
                    <button
                      aria-label="Cancella ricerca"
                      onClick={() => setQuery('')}
                    >
                      <X size={13} />
                    </button>
                  ) : (
                    <kbd>⌘ K</kbd>
                  )}
                </label>
              </div>
              <div
                key={category}
                className={`app-grid ${view === 'list' ? 'list-view' : ''}`}
              >
                {filtered.map((a) => (
                  <button
                    className="app-card glass"
                    key={a.slug}
                    onClick={() => showApp(a)}
                  >
                    <AppIcon app={a} />
                    <div>
                      <h3>{a.name}</h3>
                      <p>{a.desc}</p>
                      <span className="app-category">{a.category}</span>
                    </div>
                    <ChevronRight className="card-arrow" />
                  </button>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="empty-state">
                  <Search size={32} />
                  <h2>Nessuna app trovata</h2>
                  <p>Prova con un altro nome o esplora tutta la raccolta.</p>
                  <button onClick={() => navigate('Tutte le app')}>
                    Mostra tutte le app
                  </button>
                </div>
              )}
              <div className="catalog-end">
                <span>
                  {filtered.length}{' '}
                  {filtered.length === 1
                    ? 'app selezionata'
                    : 'app selezionate'}{' '}
                  per {platform}
                </span>
                <span>Mac e Android, disponibili.</span>
              </div>
            </div>
            <footer className="window-status">
              <span>
                {platform === 'Mac' ? (
                  <Monitor size={13} />
                ) : (
                  <Smartphone size={13} />
                )}{' '}
                {platform} <ChevronRight size={12} /> {category}
              </span>
              <span aria-live="polite">
                {filtered.length} applicazioni · Scelte con cura
              </span>
            </footer>
          </section>
        </SidebarProvider>
      </main>
      <nav className="dock glass" aria-label="Dock">
        <button
          aria-label="Apri Appunto"
          data-tooltip="Appunto"
          title="Appunto"
          onClick={openWindow}
          className={`dock-brand ${minimized ? 'dock-restoring' : ''}`}
        >
          <Command />
          {(windowOpen || minimized) && <i className="running" />}
        </button>
        <span />
        {dockApps.map((a) => (
          <button
            key={a.slug}
            className="dock-app"
            data-tooltip={a.name}
            title={a.name}
            aria-label={`Scopri ${a.name}`}
            onClick={() => showApp(a)}
          >
            <AppIcon app={a} />
          </button>
        ))}
        <span />
        <div ref={dockStackRef} className="dock-stack">
          <button
            aria-label="Apri categorie"
            data-tooltip="Categorie"
            title="Categorie"
            onClick={() => setDockStackOpen((open) => !open)}
            className={`dock-folder ${dockStackOpen ? 'is-open' : ''}`}
          >
            <i />
            <i />
            <Folder />
          </button>
          {dockStackOpen && (
            <div
              className="dock-stack-menu glass"
              role="menu"
              aria-label="Categorie app"
            >
              <div className="dock-stack-menu-title">Categorie</div>
              <div className="dock-stack-menu-grid">
                {[{ name: 'Tutte le app', icon: Grid2X2 }, ...categories].map(
                  (c) => (
                    <button
                      key={c.name}
                      className={`dock-stack-menu-item ${category === c.name ? 'is-active' : ''}`}
                      role="menuitem"
                      aria-current={category === c.name ? 'page' : undefined}
                      onClick={() => {
                        navigate(c.name);
                        setDockStackOpen(false);
                      }}
                    >
                      <span
                        className="dock-stack-folder-art"
                        aria-hidden="true"
                      >
                        <Folder className="dock-stack-folder-base" />
                        <c.icon className="dock-stack-folder-glyph" />
                      </span>
                      <span className="dock-stack-menu-caption">
                        <span className="dock-stack-menu-label">{c.name}</span>
                        <span className="dock-stack-menu-count">
                          {c.name === 'Tutte le app'
                            ? platformApps.length
                            : platformApps.filter((a) => a.category === c.name)
                                .length}
                        </span>
                      </span>
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      <nav className="ios-tabbar glass" aria-label="Navigazione principale">
        <button
          className={!mobileCategories ? 'active' : ''}
          onClick={() => navigate('Tutte le app')}
        >
          <Grid2X2 />
          <span>App</span>
        </button>
        <button
          className={mobileCategories ? 'active' : ''}
          onClick={() => setMobileCategories(true)}
        >
          <Folder />
          <span>Categorie</span>
        </button>
        <button onClick={find}>
          <Search />
          <span>Cerca</span>
        </button>
        <button onClick={() => setAbout(true)}>
          <Info />
          <span>La selezione</span>
        </button>
      </nav>
      <Dialog open={appOpen} onOpenChange={setAppOpen}>
        <DialogContent
          className="app-dialog glass ios-sheet"
          showCloseButton={false}
        >
          {selected && (
            <>
              <div className="detail-top">
                <span>SCHEDA APP</span>
                <DialogClose
                  className="close-detail"
                  aria-label="Chiudi scheda"
                >
                  <X size={18} />
                </DialogClose>
              </div>
              <div className="detail-identity">
                <AppIcon app={selected} />
                <div>
                  <DialogTitle>{selected.name}</DialogTitle>
                  <DialogDescription>{selected.desc}</DialogDescription>
                  <span className="detail-category">
                    {selected.category} <span>·</span>{' '}
                    {appPlatform(selected) === 'Mac' ? 'macOS' : 'Android'}
                  </span>
                </div>
              </div>
              <div className="detail-body">
                <h3>Cosa fa</h3>
                <p>{selected.about}</p>
                <h3>Quando ti torna utile</h3>
                <p>{selected.useful}</p>
                {selected.note && (
                  <p className="detail-note">
                    <Info size={17} />
                    {selected.note}
                  </p>
                )}
              </div>
              <div className="detail-footer">
                <span>
                  <Check size={15} /> Nella selezione di Flavio
                </span>
                {selected.url ? (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sito ufficiale <ArrowUpRight size={17} />
                  </a>
                ) : (
                  <span className="archived">In archivio</span>
                )}
              </div>
              <p className="detail-source">
                {selected.url
                  ? 'Disponibilità, prezzi e requisiti sono indicati dallo sviluppatore.'
                  : 'Download ufficiale non disponibile.'}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={about} onOpenChange={setAbout}>
        <DialogContent
          className="about-dialog glass ios-sheet"
          showCloseButton={false}
        >
          <DialogClose
            className="close-detail"
            aria-label="Chiudi informazioni"
          >
            <X size={18} />
          </DialogClose>
          <div className="brand-icon">
            <Command />
          </div>
          <DialogTitle>Le app giuste. Appunto.</DialogTitle>
          <DialogDescription>
            Una raccolta personale di applicazioni Mac e Android selezionate da
            Flavio: strumenti utili, curati e piacevoli da usare.
          </DialogDescription>
          <p>
            Apri un’app per scoprire cosa fa e quando può esserti utile. Il
            collegamento nella scheda ti porta alla fonte ufficiale.
          </p>
          <div className="about-platforms">
            <Monitor />
            <span>Mac · {macApps.length} app</span>
            <span>Disponibile</span>
          </div>
          <div className="about-platforms">
            <Smartphone />
            <span>Android · {apps.length - macApps.length} app</span>
            <span>Disponibile</span>
          </div>
          <div className="about-platforms">
            <Tablet />
            <span>iPhone e iPad</span>
            <span>In arrivo</span>
          </div>
          <small>
            Progetto indipendente, non affiliato ad Apple. Le icone appartengono
            ai rispettivi sviluppatori.
          </small>
        </DialogContent>
      </Dialog>
      <Dialog open={mobileCategories} onOpenChange={setMobileCategories}>
        <DialogContent
          className="categories-dialog glass ios-sheet"
          showCloseButton={false}
        >
          <div className="detail-top">
            <DialogTitle>Categorie</DialogTitle>
            <DialogClose className="close-detail" aria-label="Chiudi categorie">
              <X size={18} />
            </DialogClose>
          </div>
          <DialogDescription>
            Trova un’app per quello che vuoi fare.
          </DialogDescription>
          <button
            onClick={() => {
              setIosCategory('Tutte le app');
              setMobilePage(0);
              setMobileCategories(false);
            }}
          >
            <Grid2X2 />
            <span>Tutte le app</span>
            <small>{mobileApps.length}</small>
            <ChevronRight />
          </button>
          {categoryDefinitions
            .filter((c) => mobileApps.some((app) => app.category === c.name))
            .map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setIosCategory(c.name);
                  setMobilePage(0);
                  setMobileCategories(false);
                }}
              >
                <c.icon />
                <span>{c.name}</span>
                <small>
                  {mobileApps.filter((a) => a.category === c.name).length}
                </small>
                <ChevronRight />
              </button>
            ))}
        </DialogContent>
      </Dialog>
      <SystemPanel
        panel={panel}
        onClose={() => setPanel(null)}
        appearance={appearance}
        onAppearance={setAppearance}
        animations={animations}
        onAnimations={setAnimations}
        sidebar={sidebar}
        onSidebar={setSidebar}
        view={view}
        onView={setView}
        onApp={showApp}
        onWallpaper={changeWallpaper}
        onOpenWindow={() => {
          setPanel(null);
          openWindow();
        }}
      />
      <div
        className={`boot-screen ${booting ? 'is-visible' : ''}`}
        aria-hidden={!booting}
      >
        <div className="boot-content">
          <img src="/favicon.svg" alt="Appunto" />
          <strong>Appunto</strong>
          <div className="boot-progress">
            <span style={{ width: `${bootProgress}%` }} />
          </div>
          <small>Avvio in corso</small>
        </div>
      </div>
    </div>
  );
}
