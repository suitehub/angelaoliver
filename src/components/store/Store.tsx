import { useMemo, useState } from "react";
import {
  Truck, Lock, CreditCard, Menu, Search, User, ShoppingBag, ChevronDown, ArrowRight,
  Heart, Headphones, X, Minus, Plus, Trash2, Smartphone, Gem, Brush,
} from "lucide-react";
import heroModel from "@/assets/hero-model.jpg.asset.json";
import heroProducts from "@/assets/hero-products.jpg.asset.json";
import bottomBanner from "@/assets/bottom-banner.jpg.asset.json";
import { categories, formatBRL, products, type Category, type Product } from "./data";
import { CartProvider, useCart } from "./cart";
import { Logo } from "./Logo";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* 1 — barra superior */
function InfoBar() {
  const items = [
    { Icon: Truck, t: "Enviamos para todo o Brasil", s: "com segurança e rastreamento" },
    { Icon: Lock, t: "Compra segura", s: "seus dados protegidos" },
    { Icon: CreditCard, t: "Diversas formas de pagamento", s: "Pix, cartão de crédito e boleto" },
  ];
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-white/25 py-2">
        {items.map(({ Icon, t, s }) => (
          <div key={t} className="flex items-center justify-center gap-2 px-2">
            <Icon className="h-4 w-4 shrink-0 text-blush md:h-5 md:w-5" strokeWidth={1.5} />
            <div className="min-w-0 leading-tight">
              <p className="text-[9px] font-semibold md:text-[11px]">{t}</p>
              <p className="hidden text-[10px] text-white/70 sm:block">{s}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NAV = [
  { label: "INÍCIO", target: "inicio" },
  { label: "MAQUIAGEM", target: "destaques", cat: "MAQUIAGEM" as Category, sub: true },
  { label: "ACESSÓRIOS", target: "destaques", cat: "ACESSÓRIOS" as Category, sub: true },
  { label: "CAPAS DE CELULAR", target: "destaques", cat: "CAPAS DE CELULAR" as Category, sub: true },
  { label: "PROMOÇÕES", target: "destaques" },
  { label: "SOBRE NÓS", target: "sobre" },
  { label: "CONTATO", target: "contato" },
];

/* 2 + 3 — cabeçalho e menu */
function Header({ query, setQuery, onNav, active }: {
  query: string; setQuery: (q: string) => void; onNav: (n: (typeof NAV)[number]) => void; active: string;
}) {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); scrollTo("destaques"); };
  const searchField = (
    <form onSubmit={submit} className="flex items-center rounded-full border border-white/50 px-3 py-1.5">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="O que você está procurando?"
        aria-label="Pesquisar produtos"
        className="w-full min-w-0 bg-transparent text-[11px] text-white placeholder:text-white/70 outline-hidden"
      />
      <button type="submit" aria-label="Buscar"><Search className="h-4 w-4 text-white" /></button>
    </form>
  );
  return (
    <header className="sticky top-0 z-40">
      <div className="border-t border-white/15 bg-ink">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 pb-4 pt-6 md:grid-cols-[1fr_auto_1fr] md:px-6">
          <button aria-label="Abrir menu" onClick={() => setMenu(true)} className="text-white"><Menu className="h-6 w-6" strokeWidth={1.5} /></button>
          <button onClick={() => scrollTo("inicio")} aria-label="Angela Oliver — início" className="justify-self-center"><Logo /></button>
          <div className="flex items-center justify-end gap-3 md:gap-4">
            <div className="hidden w-56 lg:block">{searchField}</div>
            <button className="text-white lg:hidden" aria-label="Pesquisar" onClick={() => setSearchOpen((v) => !v)}><Search className="h-5 w-5" strokeWidth={1.5} /></button>
            <button aria-label="Minha conta" className="hidden text-white sm:block"><User className="h-5 w-5" strokeWidth={1.5} /></button>
            <button aria-label="Abrir sacola" onClick={() => setOpen(true)} className="relative text-white">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && <span data-testid="cart-count" className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-rose px-1 text-[9px] font-bold text-white">{count}</span>}
            </button>
          </div>
        </div>
        {searchOpen && <div className="px-4 pb-3 lg:hidden">{searchField}</div>}
      </div>
      <nav className="hidden bg-pastel md:block">
        <ul className="mx-auto flex max-w-6xl justify-between px-6">
          {NAV.map((n) => (
            <li key={n.label}>
              <button onClick={() => onNav(n)} className={`flex items-center gap-1 py-2.5 text-[11px] font-medium tracking-wide text-ink hover:text-rose ${active === n.label ? "border-b-2 border-ink" : "border-b-2 border-transparent"}`}>
                {n.label}{n.sub && <ChevronDown className="h-3 w-3" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {menu && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 max-w-[85%] bg-blush p-6">
            <div className="mb-6 flex justify-between"><span className="font-serif text-xl">Menu</span><button aria-label="Fechar menu" onClick={() => setMenu(false)}><X /></button></div>
            <ul className="space-y-1">
              {NAV.map((n) => (
                <li key={n.label}><button onClick={() => { onNav(n); setMenu(false); }} className="w-full border-b border-pastel py-3 text-left text-xs font-medium tracking-wider">{n.label}</button></li>
              ))}
            </ul>
          </div>
          <button aria-label="Fechar" className="flex-1 bg-ink/50" onClick={() => setMenu(false)} />
        </div>
      )}
    </header>
  );
}

/* 4 — hero */
function Hero({ onCategory }: { onCategory: (c: Category) => void }) {
  const cats = [
    { Icon: Brush, label: "MAQUIAGEM" as Category },
    { Icon: Gem, label: "ACESSÓRIOS" as Category },
    { Icon: Smartphone, label: "CAPAS DE CELULAR" as Category },
  ];
  return (
    <section id="inicio" className="relative overflow-hidden bg-ink">
      <div className="relative mx-auto grid min-h-[420px] grid-cols-1 md:grid-cols-[1fr_1.1fr_1fr] md:min-h-[460px]">
        <div className="absolute inset-0 md:relative">
          <img src={heroModel.url} alt="Modelo com maquiagem sofisticada" fetchPriority="high" className="h-full w-full object-cover object-[20%_center] opacity-60 md:opacity-100" />
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-linear-to-l from-ink to-transparent md:block" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-10 text-center">
          <Logo size="lg" subtitle={false} />
          <h1 className="mt-4 font-script text-3xl leading-tight text-white md:text-4xl">
            Sua beleza, seu estilo,<br />em um só lugar!
          </h1>
          <div className="mt-6 flex divide-x divide-white/40">
            {cats.map(({ Icon, label }) => (
              <button key={label} onClick={() => onCategory(label)} className="flex flex-col items-center gap-1.5 px-4 text-white hover:text-pastel">
                <Icon className="h-6 w-6" strokeWidth={1.2} />
                <span className="text-[9px] tracking-wider">{label}</span>
              </button>
            ))}
          </div>
          <button onClick={() => scrollTo("destaques")} className="mt-6 flex items-center gap-2 rounded-full bg-pastel px-7 py-2.5 text-[11px] font-semibold tracking-widest text-ink hover:bg-rose hover:text-white">
            COMPRE AGORA <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="relative hidden md:block">
          <img src={heroProducts.url} alt="Maquiagens, brincos dourados e capas de celular" className="h-full w-full object-cover" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-ink to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* 5 — categorias */
function Categories({ onCategory }: { onCategory: (c: Category) => void }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 md:px-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {categories.map((c) => (
          <button key={c.name} onClick={() => onCategory(c.name)} className="group overflow-hidden border border-pastel/60 bg-blush text-center">
            <div className="aspect-[16/8] overflow-hidden">
              <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="py-3">
              <h3 className="font-serif text-lg font-semibold tracking-wide">{c.name}</h3>
              <span className="inline-flex items-center gap-1 text-[11px] text-ink/80 group-hover:text-rose">Ver produtos <ArrowRight className="h-3 w-3" /></span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ p, onOpen }: { p: Product; onOpen: () => void }) {
  const { add } = useCart();
  return (
    <article className="flex flex-col border border-border bg-white">
      <button onClick={onOpen} className="aspect-square overflow-hidden bg-blush" aria-label={`Ver detalhes de ${p.name}`}>
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
      </button>
      <div className="flex flex-1 flex-col p-2.5">
        <p className="text-[9px] tracking-wider text-muted-foreground">{p.category}</p>
        <button onClick={onOpen} className="mt-0.5 text-left text-xs font-medium hover:text-rose">{p.name}</button>
        <p className="mt-2 text-base font-bold text-ink">{formatBRL(p.price)}</p>
        <button onClick={() => add(p)} className="mt-2 rounded-sm bg-rose py-1.5 text-[10px] font-semibold tracking-widest text-white hover:bg-ink">COMPRAR</button>
      </div>
    </article>
  );
}

/* 6 — destaques */
function Featured({ filter, query, clear, onOpen }: { filter: Category | null; query: string; clear: () => void; onOpen: (p: Product) => void }) {
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => (!filter || p.category === filter) && (!q || `${p.name} ${p.category}`.toLowerCase().includes(q)));
  }, [filter, query]);
  return (
    <section id="destaques" className="mx-auto max-w-6xl scroll-mt-40 px-4 pb-8 md:px-6">
      <div className="flex items-center gap-4 py-4">
        <span className="h-px flex-1 bg-ink/40" />
        <h2 className="font-serif text-xl font-semibold tracking-[0.2em] md:text-2xl">PRODUTOS EM DESTAQUE</h2>
        <span className="h-px flex-1 bg-ink/40" />
      </div>
      {(filter || query) && (
        <p className="mb-3 text-center text-xs text-muted-foreground">
          {filter ? `Categoria: ${filter}` : ""}{filter && query ? " · " : ""}{query ? `Busca: “${query}”` : ""} —{" "}
          <button onClick={clear} className="underline hover:text-rose">ver todos</button>
        </p>
      )}
      {list.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {list.map((p) => <ProductCard key={p.id} p={p} onOpen={() => onOpen(p)} />)}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-muted-foreground">Nenhum produto encontrado.</p>
      )}
    </section>
  );
}

/* 7 — benefícios */
function Benefits() {
  const items = [
    { Icon: Heart, t: "Produtos de qualidade", s: "com as melhores marcas" },
    { Icon: Truck, t: "Entrega rápida", s: "para todo o Brasil" },
    { Icon: Headphones, t: "Atendimento personalizado", s: "estamos todos os dias com você" },
  ];
  return (
    <section className="bg-blush">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-ink/20 px-4 py-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map(({ Icon, t, s }) => (
          <div key={t} className="flex items-center justify-center gap-3 py-2">
            <Icon className="h-7 w-7 shrink-0" strokeWidth={1.2} />
            <div className="leading-tight"><p className="text-xs font-semibold">{t}</p><p className="text-[11px] text-ink/70">{s}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* 8 — banner institucional */
function BottomBanner() {
  const Orn = () => <span className="mt-2 flex items-center gap-2 text-gold"><span className="h-px w-8 bg-gold" /><Heart className="h-2.5 w-2.5" /><span className="h-px w-8 bg-gold" /></span>;
  return (
    <section id="sobre" className="relative overflow-hidden bg-ink">
      <img src={bottomBanner.url} alt="Maquiagens, acessórios e capas de celular" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50 md:opacity-100" />
      <div className="relative mx-auto flex min-h-[220px] max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row md:px-12">
        <div className="flex flex-col items-center text-center">
          <p className="font-script text-5xl text-pastel">Beleza</p>
          <p className="mt-1 text-[11px] font-medium tracking-[0.2em] text-white">NÃO É SÓ APARÊNCIA.<br />É AUTENTICIDADE.</p>
          <Orn />
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="font-script text-4xl text-pastel">Angela Oliver</p>
          <p className="mt-1 text-[11px] font-medium tracking-[0.2em] text-white">MAIS QUE PRODUTOS,<br />É SOBRE VOCÊ.</p>
          <Orn />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contato" className="bg-ink py-6 text-center text-[11px] text-white/70">
      <p className="font-serif text-base tracking-[0.2em] text-pastel">ANGELA OLIVER</p>
      <p className="mt-1">BELEZA • ACESSÓRIOS • CAPAS DE CELULAR</p>
      <p className="mt-2">© {new Date().getFullYear()} Angela Oliver. Todos os direitos reservados.</p>
    </footer>
  );
}

function ProductModal({ p, close }: { p: Product; close: () => void }) {
  const { add } = useCart();
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4" onClick={close}>
      <div role="dialog" aria-label={p.name} className="relative grid max-h-[90vh] w-full max-w-3xl overflow-auto bg-white md:grid-cols-2" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Fechar detalhes" onClick={close} className="absolute right-3 top-3 z-10 bg-white/80 p-1"><X className="h-5 w-5" /></button>
        <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
        <div className="flex flex-col p-6">
          <p className="text-[10px] tracking-widest text-muted-foreground">{p.category}</p>
          <h3 className="mt-1 font-serif text-3xl">{p.name}</h3>
          <p className="mt-3 text-2xl font-bold">{formatBRL(p.price)}</p>
          <p className="text-xs text-muted-foreground">ou em até 3x de {formatBRL(p.price / 3)} sem juros</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/80">{p.description}</p>
          <button onClick={() => { add(p); close(); }} className="mt-auto rounded-sm bg-rose py-3 text-xs font-semibold tracking-widest text-white hover:bg-ink">COMPRAR</button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer() {
  const { lines, open, setOpen, change, remove, subtotal } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Fechar sacola" className="flex-1 bg-ink/50" onClick={() => setOpen(false)} />
      <aside role="dialog" aria-label="Sua sacola" className="flex w-96 max-w-[90%] flex-col bg-white">
        <div className="flex items-center justify-between bg-ink px-5 py-4 text-white">
          <span className="font-serif text-xl tracking-widest">SUA SACOLA</span>
          <button aria-label="Fechar" onClick={() => setOpen(false)}><X /></button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {lines.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">Sua sacola está vazia.</p>}
          {lines.map(({ product: p, qty }) => (
            <div key={p.id} className="grid grid-cols-[64px_minmax(0,1fr)_auto] gap-3 border-b border-border py-3">
              <img src={p.image} alt={p.name} className="h-16 w-16 object-cover" />
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{p.name}</p>
                <p className="text-xs font-bold">{formatBRL(p.price)}</p>
                <div className="mt-1 flex items-center border border-border w-fit">
                  <button aria-label={`Diminuir ${p.name}`} onClick={() => change(p.id, -1)} className="p-1"><Minus className="h-3 w-3" /></button>
                  <span className="w-6 text-center text-xs" data-testid={`qty-${p.id}`}>{qty}</span>
                  <button aria-label={`Aumentar ${p.name}`} onClick={() => change(p.id, 1)} className="p-1"><Plus className="h-3 w-3" /></button>
                </div>
              </div>
              <button aria-label={`Remover ${p.name}`} onClick={() => remove(p.id)} className="self-start text-muted-foreground hover:text-rose"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-5">
          <div className="flex justify-between text-sm"><span>Subtotal</span><strong data-testid="subtotal">{formatBRL(subtotal)}</strong></div>
          <button disabled={!lines.length} className="mt-4 w-full rounded-sm bg-rose py-3 text-xs font-semibold tracking-widest text-white disabled:opacity-50">FINALIZAR COMPRA</button>
        </div>
      </aside>
    </div>
  );
}

function StoreInner() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Category | null>(null);
  const [detail, setDetail] = useState<Product | null>(null);
  const [active, setActive] = useState("INÍCIO");
  const pickCategory = (c: Category) => { setFilter(c); setActive(c); scrollTo("destaques"); };
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-ink">
      <InfoBar />
      <Header query={query} setQuery={setQuery} active={active} onNav={(n) => {
        setActive(n.label);
        if (n.cat) setFilter(n.cat); else if (n.target === "destaques") setFilter(null);
        scrollTo(n.target);
      }} />
      <main>
        <Hero onCategory={pickCategory} />
        <Categories onCategory={pickCategory} />
        <Featured filter={filter} query={query} clear={() => { setFilter(null); setQuery(""); }} onOpen={setDetail} />
        <Benefits />
        <BottomBanner />
      </main>
      <Footer />
      {detail && <ProductModal p={detail} close={() => setDetail(null)} />}
      <CartDrawer />
    </div>
  );
}

export function Store() {
  return <CartProvider><StoreInner /></CartProvider>;
}
