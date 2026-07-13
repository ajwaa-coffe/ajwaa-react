import { useState } from "react";
import { useMenuStore } from "@/lib/menu-store";
import { MenuItem } from "@/lib/types";
import { useCartStore } from "@/lib/cart";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Sun, Moon, Coffee, Flame, Snowflake, Droplets,
  Leaf, Milk, Grid3x3, Star, GlassWater, Zap, CupSoda,
  UtensilsCrossed, LayoutGrid, Layers, ShoppingCart,
} from "lucide-react";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { CartDrawer } from "@/components/cart-drawer";

const WHATSAPP_NUMBER = "9647744464462";
const INSTAGRAM_HANDLE = "ajwaaiq";

const categories = [
  { id: "all",          label: "الكل",          icon: Grid3x3 },
  { id: "hot_coffee",   label: "هوت كوفي",      icon: Coffee },
  { id: "iced_coffee",  label: "ايس كوفي",      icon: Snowflake },
  { id: "hot_drinks",   label: "ساخنة",         icon: Flame },
  { id: "specialty",    label: "مختصة",         icon: Star },
  { id: "fresh_juices", label: "عصائر",         icon: Droplets },
  { id: "cold_drinks",  label: "باردة",         icon: GlassWater },
  { id: "iced_tea",     label: "الشاي المثلج",  icon: Snowflake },
  { id: "mojito",       label: "موهيتو",        icon: Leaf },
  { id: "milkshake",    label: "ميلك شيك",      icon: Milk },
  { id: "energy",       label: "طاقة",          icon: Zap },
  { id: "soft_drinks",  label: "سوفت درنك",     icon: CupSoda },
  { id: "crepe",        label: "كريب",          icon: UtensilsCrossed },
  { id: "waffle",       label: "وافل",          icon: LayoutGrid },
  { id: "pancake",      label: "بان كيك",       icon: Layers },
];

const categoryGradients: Record<string, string> = {
  hot_coffee:   "from-amber-900 via-amber-700 to-yellow-800",
  iced_coffee:  "from-slate-700 via-blue-900 to-slate-800",
  hot_drinks:   "from-red-900 via-orange-800 to-amber-900",
  specialty:    "from-zinc-800 via-stone-700 to-zinc-900",
  fresh_juices: "from-orange-700 via-yellow-600 to-lime-700",
  cold_drinks:  "from-cyan-800 via-blue-700 to-indigo-800",
  iced_tea:     "from-teal-800 via-lime-700 to-yellow-700",
  mojito:       "from-emerald-800 via-green-700 to-teal-800",
  milkshake:    "from-pink-800 via-rose-700 to-fuchsia-800",
  energy:       "from-yellow-700 via-orange-600 to-red-700",
  soft_drinks:  "from-sky-700 via-cyan-600 to-blue-700",
  crepe:        "from-amber-800 via-yellow-700 to-orange-800",
  waffle:       "from-yellow-900 via-amber-800 to-yellow-700",
  pancake:      "from-orange-900 via-amber-700 to-yellow-600",
};

const categoryIcons: Record<string, string> = {
  hot_coffee: "☕", iced_coffee: "🧊", hot_drinks: "🍵",
  specialty: "✨", fresh_juices: "🍊", cold_drinks: "🥤", iced_tea: "🧊",
  mojito: "🌿", milkshake: "🥛", energy: "⚡", soft_drinks: "💧",
  crepe: "🥞", waffle: "🧇", pancake: "🥞",
};

function ItemImage({ id, category }: { id: number; category: string }) {
  const [hasImage, setHasImage] = useState(true);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const gradient = categoryGradients[category] ?? "from-zinc-800 via-zinc-700 to-zinc-900";
  const icon = categoryIcons[category] ?? "☕";

  return (
    <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3">
      {hasImage ? (
        <img
          src={`${base}/images/item-${id}.png`}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setHasImage(false)}
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <span className="text-5xl opacity-60">{icon}</span>
        </div>
      )}
    </div>
  );
}

function MenuItemCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      data-testid={`card-item-${item.id}`}
      className="bg-card border border-border rounded-2xl p-4 flex flex-col hover:shadow-md transition-shadow duration-300"
    >
      <ItemImage id={item.id} category={item.category} />

      <div className="flex justify-between items-start gap-2 mb-1">
        <h3 className="text-sm font-bold leading-snug flex-1">{item.name}</h3>
        <div className="text-base font-extrabold text-amber-500 dark:text-amber-400 whitespace-nowrap tabular-nums shrink-0">
          {Number(item.price).toLocaleString("ar-IQ")}
          <span className="text-[10px] font-medium mr-0.5">د.ع</span>
        </div>
      </div>

      {item.description && (
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1 mb-2">
          {item.description}
        </p>
      )}

      <div className="flex justify-between items-center mt-auto pt-2">
        {!item.available ? (
          <Badge variant="secondary" className="text-xs text-muted-foreground">
            غير متوفر
          </Badge>
        ) : (
          <Badge className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-0">
            متوفر
          </Badge>
        )}
        <Button
          size="sm"
          disabled={!item.available}
          onClick={onAdd}
          data-testid={`btn-add-${item.id}`}
          className="rounded-xl h-8 px-4 text-xs font-bold bg-foreground text-background hover:opacity-80"
        >
          <Plus className="w-3.5 h-3.5 ml-1" />
          إضافة
        </Button>
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { getItems } = useMenuStore();
  const { addItem, items: cartItems } = useCartStore();
  const { theme, toggleTheme } = useTheme();
  const [cartOpen, setCartOpen] = useState(false);

  const allItems = getItems();
  const filteredItems = selectedCategory === "all"
    ? allItems
    : allItems.filter((item) => item.category === selectedCategory);

  const categoryLabel = categories.find((c) => c.id === selectedCategory)?.label ?? "الكل";
  const totalCartItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300" dir="rtl">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-card/90 backdrop-blur-xl border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coffee className="w-6 h-6 text-amber-500 shrink-0" />
          <div>
            <h1 className="text-lg font-black leading-none">كوفي أجواء</h1>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">أهلاً وسهلاً</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-[#25D366]/10 hover:text-[#25D366] transition-colors"
          >
            <SiWhatsapp className="w-4 h-4" />
          </a>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-pink-500/10 hover:text-pink-500 transition-colors"
          >
            <SiInstagram className="w-4 h-4" />
          </a>

          <button
            onClick={() => setCartOpen(true)}
            className="relative w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -left-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>

          <button
            data-testid="btn-theme-toggle"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-foreground" />
            )}
          </button>
        </div>
      </header>

      {/* Body: Sidebar + Content */}
      <div className="flex">

        {/* Right Sidebar — categories */}
        <aside className="w-[76px] shrink-0 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto bg-card border-l no-scrollbar">
          <div className="flex flex-col py-2 gap-1 px-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center gap-1 py-3 px-1 rounded-xl transition-all duration-200 w-full ${
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-[9px] font-bold leading-tight text-center whitespace-pre-wrap break-words w-full">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-32">
          <div className="px-3 pt-4 pb-2">
            <h2 className="text-base font-bold">{categoryLabel}</h2>
            <p className="text-[11px] text-muted-foreground">{filteredItems.length} صنف</p>
          </div>

          <div className="px-3">
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" layout>
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} onAdd={() => addItem(item)} />
                ))}
              </AnimatePresence>
              {filteredItems.length === 0 && (
                <div className="col-span-full py-20 text-center text-muted-foreground text-sm">
                  لا توجد أصناف في هذا القسم حالياً
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 bg-card" dir="rtl">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
          <p className="text-xs text-muted-foreground/60">
            تم انشاء هذا الموقع المطور المهندس علي خالد
          </p>
        </div>
      </footer>

      <CartDrawer externalOpen={cartOpen} onExternalClose={() => setCartOpen(false)} />
    </div>
  );
}


