import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/spice-nation-hero.jpg.asset.json";
import signaturesAsset from "@/assets/spice-nation-signatures.jpg.asset.json";
import interiorAsset from "@/assets/spice-nation-interior.jpg.asset.json";
import familyAsset from "@/assets/spice-nation-family.jpg.asset.json";
import feastAsset from "@/assets/spice-nation-feast.jpg.asset.json";
import tandoorAsset from "@/assets/spice-nation-tandoor.jpg.asset.json";

const description =
  "Experience flavorful biryanis, Indian favourites and warm dining at Spice Nation, ECIL, Kushaiguda, Secunderabad.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spice Nation | Authentic Indian Restaurant in ECIL, Secunderabad" },
      { name: "description", content: description },
      { property: "og:title", content: "Spice Nation | Authentic Indian Restaurant in ECIL" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Spice Nation",
          telephone: "+91 70134 86961",
          priceRange: "₹200–₹400",
          servesCuisine: ["Indian", "Biryani", "North Indian", "Tandoori"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "A3/4A, First Floor, Electronic Complex, Kushaiguda, ECIL",
            addressLocality: "Secunderabad",
            addressRegion: "Telangana",
            addressCountry: "IN",
          },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "2000" },
        }),
      },
    ],
  }),
  component: SpiceNation,
});

const nav = [
  ["Home", "home"],
  ["Our Story", "story"],
  ["Menu", "menu"],
  ["Gallery", "gallery"],
  ["Reviews", "reviews"],
  ["Contact", "contact"],
] as const;

const menuItems = [
  { name: "Mutton Biryani", cat: "Biryani", desc: "Fragrant basmati, tender mutton and house spices.", price: "₹399", popular: true, veg: false, image: heroAsset.url },
  { name: "Chicken Biryani", cat: "Biryani", desc: "Aromatic dum rice layered with spiced chicken.", price: "₹329", veg: false, image: feastAsset.url },
  { name: "Chicken Tikka Biryani", cat: "Biryani", desc: "Smoky tikka folded through fragrant rice.", price: "₹359", popular: true, veg: false, image: signaturesAsset.url },
  { name: "Tangdi Kabab", cat: "Tandoori", desc: "Char-grilled chicken legs with warm spices.", price: "₹349", popular: true, veg: false, image: signaturesAsset.url },
  { name: "Tandoori Chicken", cat: "Tandoori", desc: "Classic clay-oven chicken, smoky and succulent.", price: "₹399", veg: false, image: tandoorAsset.url },
  { name: "Paneer Tikka", cat: "Vegetarian", desc: "Charred paneer, peppers and aromatic marinade.", price: "₹299", veg: true, image: tandoorAsset.url },
  { name: "Crispy Corn", cat: "Starters", desc: "Crisp kernels tossed with chilli and herbs.", price: "₹239", veg: true, image: feastAsset.url },
  { name: "Tiranga Kebab", cat: "Starters", desc: "A trio of vibrant, delicately spiced kebabs.", price: "₹359", veg: false, image: tandoorAsset.url },
  { name: "Butter Chicken", cat: "Main Course", desc: "Silky tomato gravy with tender tandoori chicken.", price: "₹369", popular: true, veg: false, image: signaturesAsset.url },
  { name: "Butter Garlic Chicken", cat: "Main Course", desc: "Rich, savoury and finished with roasted garlic.", price: "₹379", veg: false, image: signaturesAsset.url },
  { name: "Chettinadu Chicken", cat: "Main Course", desc: "Peppery southern spices with roasted coconut notes.", price: "₹369", veg: false, image: feastAsset.url },
  { name: "Chicken Kulcha", cat: "Breads", desc: "Tandoor-baked bread with a savoury chicken filling.", price: "₹179", veg: false, image: feastAsset.url },
  { name: "Garlic Naan", cat: "Breads", desc: "Soft, blistered naan with garlic and herbs.", price: "₹79", veg: true, image: feastAsset.url },
  { name: "Chicken Manchow Soup", cat: "Soups", desc: "Warming, peppery broth with crisp noodles.", price: "₹199", veg: false, image: feastAsset.url },
  { name: "Apollo Fish", cat: "Seafood", desc: "Crisp fish tossed in a punchy house sauce.", price: "₹379", veg: false, image: feastAsset.url },
  { name: "Chilli Prawns", cat: "Seafood", desc: "Juicy prawns with chilli, garlic and peppers.", price: "₹399", veg: false, image: feastAsset.url },
  { name: "Almond Ice Cream", cat: "Desserts", desc: "Creamy, nutty and gently aromatic.", price: "₹149", veg: true, image: feastAsset.url },
];

const categories = ["Biryani", "Starters", "Tandoori", "Main Course", "Breads", "Soups", "Seafood", "Desserts", "Vegetarian"];
const reviews = [
  "Good food, tasty starters and a nice place to hangout with family and friends.",
  "The place is beautiful and lovely music. Good staff, great service.",
  "Every single item ordered tastes good. Quality and quantity are also great.",
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal, .image-reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function SpiceMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M23 78c28-4 45-20 52-51 8 24 0 54-28 66M36 72c7-4 13-10 18-17M72 28c11 6 19 16 22 29M88 79c-7 8-17 13-30 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M83 70c9-11 14-20 11-27-8 1-15 9-18 22" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const go = (id: string) => { setOpen(false); window.setTimeout(() => scrollTo(id), 50); };
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-ivory/10 bg-charcoal/90 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 lg:px-10">
          <button onClick={() => go("home")} className="text-left text-ivory" aria-label="Spice Nation home">
            <span className="block font-display text-2xl font-bold leading-none">SPICE NATION</span>
            <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[.32em] text-brass">Indian Kitchen</span>
          </button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {nav.map(([label, id]) => <button key={id} onClick={() => go(id)} className="group relative text-xs font-semibold uppercase tracking-[.14em] text-ivory/75 transition-colors hover:text-ivory">{label}<span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform group-hover:scale-x-100" /></button>)}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="spiceOutline" size="lg" onClick={() => go("contact")}>Reserve table</Button>
            <Button variant="spice" size="lg" onClick={() => go("menu")}>Order online <ArrowRight /></Button>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)} className="text-ivory hover:bg-ivory/10 hover:text-ivory lg:hidden" aria-label="Open menu"><Menu className="size-6" /></Button>
        </div>
      </header>
      <div className={`fixed inset-0 z-[60] bg-charcoal transition-all duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`} aria-hidden={!open}>
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between text-ivory"><span className="font-display text-2xl font-bold">SPICE NATION</span><Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="text-ivory hover:bg-ivory/10"><X /></Button></div>
          <nav className="my-auto flex flex-col gap-4" aria-label="Mobile navigation">{nav.map(([label, id], i) => <button key={id} onClick={() => go(id)} className="text-left font-display text-5xl text-ivory transition-colors hover:text-primary" style={{ animationDelay: `${i * 60}ms` }}>{label}</button>)}</nav>
          <div className="grid grid-cols-2 gap-3"><Button variant="spiceOutline" size="lg" onClick={() => go("contact")}>Reserve</Button><Button variant="spice" size="lg" onClick={() => go("menu")}>Order online</Button></div>
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="grain relative min-h-[760px] overflow-hidden bg-charcoal text-ivory lg:min-h-screen">
      <img src={heroAsset.url} width={1920} height={1200} alt="Steaming mutton biryani in a brass handi" className="hero-zoom absolute inset-0 h-full w-full object-cover object-[68%_center]" fetchPriority="high" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--charcoal)_0%,color-mix(in_oklab,var(--charcoal)_86%,transparent)_34%,color-mix(in_oklab,var(--charcoal)_25%,transparent)_70%,color-mix(in_oklab,var(--charcoal)_35%,transparent)_100%)]" />
      <SpiceMark className="drift absolute right-[8%] top-[18%] hidden size-32 text-brass/50 lg:block" />
      <div className="relative mx-auto flex min-h-[760px] max-w-[1500px] items-end px-5 pb-24 pt-32 lg:min-h-screen lg:items-center lg:px-10 lg:pb-16">
        <div className="max-w-3xl">
          <p className="hero-rise mb-5 text-[11px] font-semibold uppercase tracking-[.3em] text-brass" style={{ animationDelay: "100ms" }}>Authentic Indian cuisine</p>
          <h1 className="font-display text-[clamp(4.1rem,8.4vw,9rem)] font-semibold leading-[.76] text-ivory">
            {["WHERE SPICE", "BECOMES A", "MEMORY."].map((line, i) => <span key={line} className="hero-rise block" style={{ animationDelay: `${220 + i * 130}ms` }}>{line}</span>)}
          </h1>
          <p className="hero-rise mt-7 max-w-xl text-sm leading-7 text-ivory/72 md:text-base" style={{ animationDelay: "680ms" }}>Bold flavours, fragrant biryanis and timeless Indian favourites, crafted for moments worth sharing.</p>
          <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "800ms" }}><Button variant="spice" size="lg" onClick={() => scrollTo("menu")}>Explore menu <ArrowRight /></Button><Button variant="spiceOutline" size="lg" onClick={() => scrollTo("menu")}>Order online</Button></div>
        </div>
        <div className="hero-rise absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-ivory/20 pt-4 lg:left-10 lg:right-10" style={{ animationDelay: "950ms" }}>
          <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-ivory/70"><MapPin className="size-4 text-primary" /> ECIL · Kushaiguda · Secunderabad</span>
          <div className="hidden text-right sm:block"><div className="flex justify-end gap-0.5 text-brass">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-current" />)}</div><p className="mt-1 text-[10px] font-semibold tracking-[.18em]">4.7 / 5 · 2,000+ REVIEWS</p></div>
        </div>
      </div>
      <button onClick={() => scrollTo("story")} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ivory/60 lg:block" aria-label="Scroll to our story"><ChevronDown /></button>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-background py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-10">
        <div className="reveal"><p className="mb-6 text-[10px] font-bold uppercase tracking-[.3em] text-primary">The Spice Nation story</p><h2 className="font-display text-6xl font-semibold leading-[.88] md:text-8xl">MORE THAN<br />A MEAL.</h2><p className="mt-8 max-w-lg text-base leading-8 text-muted-foreground">Spice Nation brings together bold Indian flavours, comforting classics and a warm dining experience made for family, friends and unforgettable meals.</p><p className="mt-9 font-display text-xl italic text-spice-deep">Made with spice · Served with heart</p></div>
        <div className="image-reveal relative ml-auto aspect-[4/5] w-full max-w-2xl overflow-hidden"><img src={interiorAsset.url} width={1600} height={1104} loading="lazy" alt="Warm contemporary dining room with brass lights" className="h-full w-full object-cover" /><div className="absolute bottom-5 left-5 border border-ivory/30 bg-charcoal/75 px-5 py-4 text-ivory backdrop-blur-md"><span className="block text-[10px] uppercase tracking-[.24em] text-brass">Designed for</span><span className="mt-1 block font-display text-2xl">Gathering well</span></div></div>
      </div>
      <SpiceMark className="absolute -bottom-12 -left-12 size-64 text-primary/12" />
    </section>
  );
}

function Signatures() {
  const dishes = [
    ["Mutton Biryani", "Slow-cooked layers of fragrance and depth.", "Popular", "bg-[position:0%_0%]"],
    ["Tangdi Kabab", "Smoky, succulent and charred at the edges.", "Chef's pick", "bg-[position:100%_0%]"],
    ["Chicken Tikka Biryani", "Two favourites, brought together beautifully.", "Must try", "bg-[position:0%_100%]"],
    ["Butter Garlic Chicken", "Velvety richness finished with roasted garlic.", "Favourite", "bg-[position:100%_100%]"],
  ];
  return (
    <section className="bg-charcoal py-24 text-ivory lg:py-36">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10"><div className="reveal mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-4 text-[10px] font-bold uppercase tracking-[.3em] text-brass">The signatures</p><h2 className="font-display text-5xl font-semibold leading-none md:text-7xl">THE DISHES PEOPLE<br />COME BACK FOR.</h2></div><button onClick={() => scrollTo("menu")} className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em]">View full menu <ArrowRight className="transition-transform group-hover:translate-x-2" /></button></div>
        <div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-2">{dishes.map(([name, desc, tag, pos], i) => <article key={name} className={`group reveal relative overflow-hidden ${i === 0 ? "min-h-[540px] lg:row-span-2" : "min-h-[260px]"}`}><div className={`absolute inset-0 bg-cover ${pos} transition-transform duration-700 group-hover:scale-[1.04]`} style={{ backgroundImage: `url(${signaturesAsset.url})`, backgroundSize: "200% 200%" }} /><div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" /><span className="absolute left-5 top-5 border border-ivory/30 bg-charcoal/60 px-3 py-2 text-[9px] font-bold uppercase tracking-[.2em] text-brass backdrop-blur-sm">{tag}</span><div className="absolute inset-x-0 bottom-0 translate-y-6 p-6 transition-transform duration-500 group-hover:translate-y-0 lg:p-8"><h3 className="font-display text-4xl font-semibold lg:text-5xl">{name}</h3><div className="mt-2 flex items-end justify-between opacity-0 transition-opacity duration-500 group-hover:opacity-100"><p className="max-w-sm text-sm text-ivory/70">{desc}</p><ArrowRight /></div></div></article>)}</div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [category, setCategory] = useState("Biryani");
  const items = menuItems.filter((item) => item.cat === category || (category === "Vegetarian" && item.veg));
  return (
    <section id="menu" className="bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10"><div className="reveal max-w-3xl"><p className="mb-4 text-[10px] font-bold uppercase tracking-[.3em] text-primary">Explore the menu</p><h2 className="font-display text-6xl font-semibold leading-[.86] md:text-8xl">A TABLE FULL<br />OF FLAVOUR.</h2><p className="mt-6 text-sm text-muted-foreground">Representative selection and pricing. Please call for current availability.</p></div>
        <div className="reveal mt-12 flex gap-2 overflow-x-auto border-b border-border pb-4 [scrollbar-width:none]">{categories.map((cat) => <button key={cat} onClick={() => setCategory(cat)} className={`shrink-0 px-4 py-3 text-[10px] font-bold uppercase tracking-[.16em] transition-colors ${category === cat ? "bg-charcoal text-ivory" : "text-muted-foreground hover:text-foreground"}`}>{cat}</button>)}</div>
        <div key={category} className="menu-in mt-8 grid auto-cols-[82%] grid-flow-col gap-4 overflow-x-auto pb-4 [scrollbar-width:none] md:grid-flow-row md:grid-cols-2 md:overflow-visible lg:grid-cols-3">{items.map((item) => <article key={item.name} className="group overflow-hidden border border-border bg-card"><div className="relative aspect-[16/10] overflow-hidden"><img src={item.image} width={800} height={500} loading="lazy" alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />{item.popular && <span className="absolute left-4 top-4 bg-primary px-3 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-primary-foreground">Popular</span>}</div><div className="p-5"><div className="flex items-start justify-between gap-4"><h3 className="font-display text-3xl font-semibold">{item.name}</h3><span className="font-semibold text-spice-deep">{item.price}</span></div><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p><span className={`mt-5 inline-flex size-4 items-center justify-center border ${item.veg ? "border-leaf" : "border-primary"}`} title={item.veg ? "Vegetarian" : "Non-vegetarian"}><span className={`size-1.5 rounded-full ${item.veg ? "bg-leaf" : "bg-primary"}`} /></span></div></article>)}</div>
      </div>
    </section>
  );
}

function BiryaniFeature() {
  return (
    <section className="grain relative min-h-[820px] overflow-hidden bg-charcoal text-ivory lg:min-h-screen">
      <img src={heroAsset.url} width={1920} height={1200} loading="lazy" alt="Fragrant biryani with saffron and mint" className="absolute inset-0 h-full w-full object-cover object-[68%_center] opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/75 to-transparent" />
      <div className="relative mx-auto flex min-h-[820px] max-w-[1500px] items-center px-5 py-24 lg:min-h-screen lg:px-10"><div className="reveal max-w-3xl"><p className="mb-6 text-[10px] font-bold uppercase tracking-[.3em] text-brass">Our biryani ritual</p><h2 className="font-display text-6xl font-semibold leading-[.82] md:text-9xl">THE HEART OF<br />SPICE NATION.</h2><p className="mt-8 text-xl text-ivory/75">Slow-cooked. Fragrant. Full of flavour.</p><Button variant="spice" size="lg" className="mt-9" onClick={() => { scrollTo("menu"); window.setTimeout(() => document.querySelector<HTMLButtonElement>("button[data-biryani]")?.click(), 400); }}>Discover our biryanis <ArrowRight /></Button></div></div>
      <div className="steam absolute right-[28%] top-[24%] h-32 w-px bg-gradient-to-t from-transparent via-ivory/40 to-transparent" /><div className="steam absolute right-[35%] top-[18%] h-40 w-px bg-gradient-to-t from-transparent via-ivory/30 to-transparent" style={{ animationDelay: "1.4s" }} />
      <div className="absolute bottom-8 right-8 hidden gap-7 text-[10px] font-bold uppercase tracking-[.18em] text-brass lg:flex"><span>Saffron</span><span>Mint</span><span>Fried onion</span><span>Cardamom</span></div>
    </section>
  );
}

function SpiceTrail() {
  const spices = [["01", "CARDAMOM", "Aromatic warmth."], ["02", "CINNAMON", "Sweet, woody depth."], ["03", "CLOVES", "A bold, warming note."], ["04", "SAFFRON", "Fragrant golden depth."], ["05", "MINT", "A fresh finishing note."], ["06", "RICE", "Long-grain and delicate."]];
  return <section className="spice-pattern overflow-hidden bg-secondary py-24 lg:py-32"><div className="mx-auto max-w-[1500px] px-5 lg:px-10"><div className="reveal flex items-end justify-between"><div><p className="mb-4 text-[10px] font-bold uppercase tracking-[.3em] text-primary">From fragrance to flavour</p><h2 className="font-display text-6xl font-semibold md:text-8xl">THE SPICE TRAIL.</h2></div><ArrowRight className="hidden size-10 text-primary md:block" /></div><div className="mt-14 flex snap-x gap-0 overflow-x-auto pb-6 [scrollbar-width:none]">{spices.map(([n, name, desc], i) => <article key={name} className="group relative min-w-[76vw] snap-center border-l border-foreground/20 px-6 py-10 md:min-w-[320px]"><span className="text-[10px] font-bold tracking-[.25em] text-primary">{n}</span><div className="my-9 flex h-24 items-center"><SpiceMark className="size-24 text-spice-deep transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-6" /></div><h3 className="font-display text-4xl font-semibold">{name}</h3><p className="mt-2 text-sm text-muted-foreground">{desc}</p>{i < spices.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 size-5 bg-secondary" />}</article>)}</div></div></section>;
}

function Experience() {
  return <section className="bg-background py-24 lg:py-36"><div className="mx-auto max-w-[1500px] px-5 lg:px-10"><div className="reveal mb-14"><p className="mb-4 text-[10px] font-bold uppercase tracking-[.3em] text-primary">At Spice Nation</p><h2 className="font-display text-5xl font-semibold leading-[.9] md:text-8xl">COME FOR THE FOOD.<br />STAY FOR THE MOMENTS.</h2></div><div className="grid gap-4 lg:grid-cols-[1.4fr_.8fr_1fr] lg:items-end"><Figure src={interiorAsset.url} alt="Contemporary restaurant interior" label="Warm ambience" className="aspect-[4/3]" /><Figure src={familyAsset.url} alt="Family sharing an Indian meal" label="Family dining" className="aspect-[4/5]" /><Figure src={tandoorAsset.url} alt="Paneer and vegetables grilling over charcoal" label="Private dining" className="aspect-[4/3]" /></div></div></section>;
}

function Figure({ src, alt, label, className }: { src: string; alt: string; label: string; className: string }) {
  return <figure className={`image-reveal group relative overflow-hidden ${className}`}><img src={src} width={1000} height={1000} loading="lazy" alt={alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /><figcaption className="absolute bottom-4 left-4 bg-charcoal/75 px-4 py-3 text-[9px] font-bold uppercase tracking-[.2em] text-ivory backdrop-blur-sm">{label}</figcaption></figure>;
}

const gallery = [
  { src: feastAsset.url, alt: "Indian feast with biryani, breads and curries", cls: "md:col-span-2 md:row-span-2" },
  { src: tandoorAsset.url, alt: "Tandoori skewers over glowing charcoal", cls: "" },
  { src: interiorAsset.url, alt: "Warm Spice Nation dining ambience", cls: "md:col-span-2" },
  { src: heroAsset.url, alt: "Close-up of steaming mutton biryani", cls: "md:row-span-2" },
  { src: familyAsset.url, alt: "Guests sharing a generous Indian meal", cls: "" },
  { src: signaturesAsset.url, alt: "Selection of Spice Nation signature dishes", cls: "md:col-span-2" },
];

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); if (e.key === "ArrowRight") setActive((active + 1) % gallery.length); if (e.key === "ArrowLeft") setActive((active - 1 + gallery.length) % gallery.length); };
    window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key);
  }, [active]);
  return <section id="gallery" className="bg-charcoal py-24 text-ivory lg:py-36"><div className="mx-auto max-w-[1500px] px-5 lg:px-10"><div className="reveal mb-14"><p className="mb-4 text-[10px] font-bold uppercase tracking-[.3em] text-brass">A feast for the senses</p><h2 className="font-display text-6xl font-semibold md:text-8xl">IN FRAME.</h2></div><div className="grid auto-rows-[260px] gap-3 md:grid-cols-3">{gallery.map((image, i) => <button key={`${image.alt}-${i}`} onClick={() => setActive(i)} className={`group image-reveal relative overflow-hidden text-left ${image.cls}`} aria-label={`View ${image.alt}`}><img src={image.src} width={900} height={700} loading="lazy" alt={image.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /><span className="absolute inset-0 flex items-end bg-charcoal/0 p-5 text-xs font-bold uppercase tracking-[.15em] opacity-0 transition-all group-hover:bg-charcoal/45 group-hover:opacity-100">View image <ArrowRight className="ml-2" /></span></button>)}</div></div>
    {active !== null && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/95 p-5" role="dialog" aria-modal="true" aria-label="Gallery lightbox"><Button variant="ghost" size="icon" onClick={() => setActive(null)} className="absolute right-5 top-5 text-ivory hover:bg-ivory/10" aria-label="Close lightbox"><X /></Button><Button variant="ghost" size="icon" onClick={() => setActive((active - 1 + gallery.length) % gallery.length)} className="absolute left-4 text-ivory hover:bg-ivory/10" aria-label="Previous image"><ArrowLeft /></Button><img src={gallery[active].src} alt={gallery[active].alt} className="max-h-[84vh] max-w-[84vw] object-contain" /><Button variant="ghost" size="icon" onClick={() => setActive((active + 1) % gallery.length)} className="absolute right-4 text-ivory hover:bg-ivory/10" aria-label="Next image"><ArrowRight /></Button><p className="absolute bottom-5 text-xs uppercase tracking-[.16em] text-ivory/70">{active + 1} / {gallery.length}</p></div>}
  </section>;
}

function Reviews() {
  const [index, setIndex] = useState(0);
  return <section id="reviews" className="bg-background py-24 lg:py-36"><div className="mx-auto grid max-w-[1400px] gap-14 px-5 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:px-10"><div className="reveal"><p className="mb-5 text-[10px] font-bold uppercase tracking-[.3em] text-primary">Guest notes</p><h2 className="font-display text-6xl font-semibold leading-[.86] md:text-8xl">LOVED BY<br />OUR GUESTS.</h2><div className="mt-9 flex items-end gap-4"><span className="font-display text-7xl font-semibold text-spice-deep">4.7</span><div className="pb-2"><div className="flex text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div><p className="mt-2 text-[10px] font-bold uppercase tracking-[.18em]">2,000+ reviews</p></div></div></div><div className="reveal border-l border-border pl-6 md:pl-12"><span className="font-display text-8xl leading-none text-primary">“</span><blockquote key={index} className="menu-in -mt-5 font-display text-3xl leading-tight md:text-5xl">{reviews[index]}</blockquote><p className="mt-7 text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">Guest review · 5 stars</p><div className="mt-9 flex gap-2"><Button variant="quiet" size="icon" onClick={() => setIndex((index - 1 + reviews.length) % reviews.length)} aria-label="Previous review"><ArrowLeft /></Button><Button variant="quiet" size="icon" onClick={() => setIndex((index + 1) % reviews.length)} aria-label="Next review"><ArrowRight /></Button></div></div></div></section>;
}

function Stats() {
  return <section className="border-y border-ivory/10 bg-charcoal text-ivory"><div className="mx-auto grid max-w-[1500px] grid-cols-2 lg:grid-cols-4">{[["4.7★", "Customer rating"], ["2,000+", "Reviews"], ["₹200–₹400", "Average spend"], ["10–45 min", "Typical visit"]].map(([value, label]) => <div key={label} className="reveal border-b border-r border-ivory/10 px-5 py-12 text-center lg:py-16"><strong className="block font-display text-4xl font-semibold text-brass md:text-5xl">{value}</strong><span className="mt-3 block text-[9px] font-bold uppercase tracking-[.2em] text-ivory/60">{label}</span></div>)}</div></section>;
}

function Location() {
  const maps = "https://www.google.com/maps/search/?api=1&query=Spice+Nation+A3%2F4A+Electronic+Complex+Kushaiguda+ECIL+Secunderabad";
  return <section id="contact" className="bg-secondary py-24 lg:py-36"><div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:items-stretch lg:px-10"><div className="reveal py-4"><p className="mb-5 text-[10px] font-bold uppercase tracking-[.3em] text-primary">Visit us</p><h2 className="font-display text-6xl font-semibold leading-[.86] md:text-8xl">FIND YOUR WAY<br />TO FLAVOUR.</h2><h3 className="mt-10 font-display text-3xl font-semibold">Spice Nation</h3><address className="mt-4 not-italic leading-7 text-muted-foreground">A3/4A, First Floor<br />Electronic Complex<br />Kushaiguda, ECIL<br />Secunderabad, Telangana</address><div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="spice" size="lg"><a href={maps} target="_blank" rel="noreferrer">Get directions <MapPin /></a></Button><Button asChild variant="quiet" size="lg"><a href="tel:07013486961">Call restaurant <Phone /></a></Button></div></div><a href={maps} target="_blank" rel="noreferrer" className="group relative min-h-[420px] overflow-hidden bg-charcoal" aria-label="Open Spice Nation location in Google Maps"><div className="spice-pattern absolute inset-0 opacity-60" /><svg className="absolute inset-0 h-full w-full text-brass/35" viewBox="0 0 600 450" fill="none" aria-hidden="true"><path d="M-20 130C120 180 150 90 280 145s170 10 350-70M45 470c90-120 150-110 220-180s100-130 370-120M-20 320c130-50 210 10 330-40s220-20 330 50" stroke="currentColor" strokeWidth="2" strokeDasharray="7 8" /><circle cx="335" cy="215" r="74" stroke="currentColor" /><circle cx="335" cy="215" r="7" fill="currentColor" /></svg><div className="absolute inset-0 flex items-center justify-center"><div className="bg-primary p-5 text-primary-foreground shadow-2xl transition-transform group-hover:-translate-y-2"><MapPin className="size-7" /></div></div><span className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[.2em] text-ivory">Electronic Complex · ECIL</span></a></div></section>;
}

function FinalCTA() {
  return <section className="grain relative overflow-hidden bg-charcoal py-28 text-center text-ivory lg:py-44"><img src={feastAsset.url} width={1600} height={1600} loading="lazy" alt="Indian feast ready to order" className="absolute -right-24 -top-36 h-[480px] w-[480px] rounded-full object-cover opacity-35 lg:h-[620px] lg:w-[620px]" /><img src={tandoorAsset.url} width={1200} height={1600} loading="lazy" alt="Fresh tandoori dishes" className="absolute -bottom-28 -left-20 h-[360px] w-[280px] rotate-6 object-cover opacity-25" /><div className="reveal relative mx-auto max-w-4xl px-5"><p className="mb-5 text-[10px] font-bold uppercase tracking-[.3em] text-brass">Bring home the flavour</p><h2 className="font-display text-6xl font-semibold leading-[.86] md:text-9xl">YOUR NEXT CRAVING<br />IS ONLY A CLICK AWAY.</h2><div className="mt-10 flex flex-wrap justify-center gap-3"><Button variant="spice" size="lg" onClick={() => scrollTo("menu")}>Order online <ArrowRight /></Button><Button variant="spiceOutline" size="lg" onClick={() => scrollTo("menu")}>View menu</Button></div></div></section>;
}

function Footer() {
  return <footer className="bg-charcoal px-5 pb-28 pt-16 text-ivory lg:px-10 lg:pb-10"><div className="mx-auto max-w-[1500px] border-t border-ivory/15 pt-12"><div className="grid gap-10 md:grid-cols-3"><div><span className="font-display text-4xl font-bold">SPICE NATION</span><p className="mt-3 text-[9px] font-bold uppercase tracking-[.24em] text-brass">Authentic · Flavorful · Warm</p></div><nav className="grid grid-cols-2 gap-3" aria-label="Footer navigation">{nav.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className="text-left text-xs uppercase tracking-[.12em] text-ivory/65 hover:text-ivory">{label}</button>)}</nav><div className="md:text-right"><p className="text-sm text-ivory/65">ECIL, Kushaiguda, Secunderabad</p><a href="tel:07013486961" className="mt-2 block font-display text-2xl">070134 86961</a><Button variant="spice" className="mt-5" onClick={() => scrollTo("menu")}>Order online</Button></div></div><div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-[9px] uppercase tracking-[.18em] text-ivory/45 sm:flex-row sm:justify-between"><span>© 2026 Spice Nation. All rights reserved.</span><span>ECIL · Secunderabad</span></div></div></footer>;
}

function FloatingControls() {
  const [shown, setShown] = useState(false);
  useEffect(() => { const fn = () => setShown(window.scrollY > window.innerHeight * .75); fn(); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return <>{shown && <Button variant="spice" size="icon" onClick={() => scrollTo("home")} className="fixed bottom-24 right-4 z-40 hidden shadow-xl md:flex" aria-label="Back to top"><ArrowUp /></Button>}<a href="tel:07013486961" className={`fixed bottom-24 right-4 z-40 flex size-12 items-center justify-center bg-primary text-primary-foreground shadow-xl transition-all md:hidden ${shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`} aria-label="Call Spice Nation"><Phone className="size-5" /></a><div className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ivory/10 bg-charcoal/95 p-2 backdrop-blur-xl transition-transform md:hidden ${shown ? "translate-y-0" : "translate-y-full"}`}><Button variant="spiceOutline" onClick={() => scrollTo("menu")}>View menu</Button><Button variant="spice" onClick={() => scrollTo("menu")}>Order online</Button></div></>;
}

function SpiceNation() {
  useReveal();
  const touchStart = useRef<number | null>(null);
  return <main onTouchStart={(e) => { touchStart.current = e.touches[0]?.clientX ?? null; }} onTouchEnd={() => { touchStart.current = null; }}><Header /><Hero /><Story /><Signatures /><MenuSection /><BiryaniFeature /><SpiceTrail /><Experience /><Gallery /><Reviews /><Stats /><Location /><FinalCTA /><Footer /><FloatingControls /></main>;
}