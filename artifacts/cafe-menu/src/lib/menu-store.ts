import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MenuItem } from "./types";

const INITIAL_MENU_ITEMS: MenuItem[] = [
    {
        "id": 41,
        "name": "اسبريسو",
        "description": null,
        "price": 2500,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 54,
        "name": "ايس امريكانو",
        "description": null,
        "price": 3000,
        "category": "iced_coffee",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 61,
        "name": "هوت شوكولت",
        "description": null,
        "price": 3500,
        "category": "hot_drinks",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 67,
        "name": "Specialty V60",
        "description": null,
        "price": 5000,
        "category": "specialty",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 70,
        "name": "كوكتيل",
        "description": null,
        "price": 4000,
        "category": "fresh_juices",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 77,
        "name": "منجا سموذي",
        "description": null,
        "price": 4000,
        "category": "cold_drinks",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 83,
        "name": "موهيتو كلاسيك",
        "description": null,
        "price": 3000,
        "category": "mojito",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 94,
        "name": "تايگر مكسيكي",
        "description": null,
        "price": 3500,
        "category": "energy",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 97,
        "name": "ماء",
        "description": null,
        "price": 500,
        "category": "soft_drinks",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 99,
        "name": "كريب نوتيلا",
        "description": null,
        "price": 5000,
        "category": "crepe",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 104,
        "name": "وافل نوتيلا",
        "description": null,
        "price": 5000,
        "category": "waffle",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 110,
        "name": "بان كيك نوتلا",
        "description": null,
        "price": 5000,
        "category": "pancake",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 42,
        "name": "ريستريتو",
        "description": null,
        "price": 2500,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 55,
        "name": "ايس لاتيه",
        "description": null,
        "price": 3500,
        "category": "iced_coffee",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 62,
        "name": "نسكافية",
        "description": null,
        "price": 3000,
        "category": "hot_drinks",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 68,
        "name": "Premium V60",
        "description": null,
        "price": 7000,
        "category": "specialty",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 71,
        "name": "برتقال",
        "description": null,
        "price": 3000,
        "category": "fresh_juices",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 78,
        "name": "فراولة سموذي",
        "description": null,
        "price": 4000,
        "category": "cold_drinks",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 84,
        "name": "موهيتو فراوله",
        "description": null,
        "price": 3500,
        "category": "mojito",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 89,
        "name": "ميلك شيك اوريو",
        "description": null,
        "price": 4500,
        "category": "milkshake",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 95,
        "name": "تايگر فراولة",
        "description": null,
        "price": 4000,
        "category": "energy",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 98,
        "name": "صودا ليمون",
        "description": null,
        "price": 1000,
        "category": "soft_drinks",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 100,
        "name": "كريب لوتس",
        "description": null,
        "price": 5500,
        "category": "crepe",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 105,
        "name": "وافل لوتس",
        "description": null,
        "price": 5500,
        "category": "waffle",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 111,
        "name": "بان كيك فواكه",
        "description": null,
        "price": 6000,
        "category": "pancake",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 43,
        "name": "امريكانو",
        "description": null,
        "price": 3000,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 56,
        "name": "سبانش لاتيه",
        "description": null,
        "price": 4500,
        "category": "iced_coffee",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 63,
        "name": "قهوة تركية",
        "description": null,
        "price": 2500,
        "category": "hot_drinks",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 69,
        "name": "Chemex",
        "description": null,
        "price": 5000,
        "category": "specialty",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 72,
        "name": "ليمون",
        "description": null,
        "price": 3000,
        "category": "fresh_juices",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 79,
        "name": "ميامي موكتيل",
        "description": null,
        "price": 4000,
        "category": "cold_drinks",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 85,
        "name": "موهيتو بلو كرواسو",
        "description": null,
        "price": 3500,
        "category": "mojito",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 90,
        "name": "ميلك شيك بيستاشيو",
        "description": null,
        "price": 5000,
        "category": "milkshake",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 96,
        "name": "تايگر كلاسك",
        "description": null,
        "price": 3000,
        "category": "energy",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 101,
        "name": "كريب اوريو",
        "description": null,
        "price": 5500,
        "category": "crepe",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 106,
        "name": "وافل اوريو",
        "description": null,
        "price": 5500,
        "category": "waffle",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 112,
        "name": "بان كيك بستاشيو",
        "description": null,
        "price": 6000,
        "category": "pancake",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 44,
        "name": "كورتادو",
        "description": null,
        "price": 3500,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 57,
        "name": "ايس كرميل مكياتو",
        "description": null,
        "price": 4000,
        "category": "iced_coffee",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 64,
        "name": "متة",
        "description": null,
        "price": 3000,
        "category": "hot_drinks",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 73,
        "name": "موز",
        "description": null,
        "price": 3000,
        "category": "fresh_juices",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 80,
        "name": "جمايكا موكتيل",
        "description": null,
        "price": 4500,
        "category": "cold_drinks",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 86,
        "name": "موهيتو بلوبيري",
        "description": null,
        "price": 3500,
        "category": "mojito",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 91,
        "name": "ميلك شيك نوتيلا",
        "description": null,
        "price": 4500,
        "category": "milkshake",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 102,
        "name": "كريب بستاشيو",
        "description": null,
        "price": 6000,
        "category": "crepe",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 107,
        "name": "وافل فواكه",
        "description": null,
        "price": 6000,
        "category": "waffle",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 113,
        "name": "بان كيك اوريو",
        "description": null,
        "price": 5500,
        "category": "pancake",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 45,
        "name": "فلات وايت",
        "description": null,
        "price": 3500,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 5
    },
    {
        "id": 58,
        "name": "ايس بستاشيو لاتيه",
        "description": null,
        "price": 5000,
        "category": "iced_coffee",
        "available": true,
        "sortOrder": 5
    },
    {
        "id": 65,
        "name": "شاي عراقي كوب",
        "description": null,
        "price": 1000,
        "category": "hot_drinks",
        "available": true,
        "sortOrder": 5
    },
    {
        "id": 81,
        "name": "تروبيكا موكتيل",
        "description": null,
        "price": 3500,
        "category": "cold_drinks",
        "available": true,
        "sortOrder": 5
    },
    {
        "id": 87,
        "name": "موهيتو باشن فروت",
        "description": null,
        "price": 4000,
        "category": "mojito",
        "available": true,
        "sortOrder": 5
    },
    {
        "id": 92,
        "name": "ميلك شيك لوتس",
        "description": null,
        "price": 4500,
        "category": "milkshake",
        "available": true,
        "sortOrder": 5
    },
    {
        "id": 103,
        "name": "كريب فواكه",
        "description": null,
        "price": 6000,
        "category": "crepe",
        "available": true,
        "sortOrder": 5
    },
    {
        "id": 108,
        "name": "وافل بيستاشيو",
        "description": null,
        "price": 6000,
        "category": "waffle",
        "available": true,
        "sortOrder": 5
    },
    {
        "id": 114,
        "name": "بان كيك لوتس",
        "description": null,
        "price": 5500,
        "category": "pancake",
        "available": true,
        "sortOrder": 5
    },
    {
        "id": 46,
        "name": "لاتيه",
        "description": null,
        "price": 3500,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 6
    },
    {
        "id": 59,
        "name": "ايس الفريدو اسبريسو",
        "description": null,
        "price": 2500,
        "category": "iced_coffee",
        "available": true,
        "sortOrder": 6
    },
    {
        "id": 66,
        "name": "شاي عراقي فنجان",
        "description": null,
        "price": 500,
        "category": "hot_drinks",
        "available": true,
        "sortOrder": 6
    },
    {
        "id": 75,
        "name": "منجا",
        "description": null,
        "price": 4000,
        "category": "fresh_juices",
        "available": true,
        "sortOrder": 6
    },
    {
        "id": 82,
        "name": "بيناكولادا",
        "description": null,
        "price": 4000,
        "category": "cold_drinks",
        "available": true,
        "sortOrder": 6
    },
    {
        "id": 93,
        "name": "ميلك شيك سيريلاك",
        "description": null,
        "price": 5500,
        "category": "milkshake",
        "available": true,
        "sortOrder": 6
    },
    {
        "id": 109,
        "name": "ميكس شوكلا",
        "description": null,
        "price": 7000,
        "category": "waffle",
        "available": true,
        "sortOrder": 6
    },
    {
        "id": 47,
        "name": "كابتشينو",
        "description": null,
        "price": 3500,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 7
    },
    {
        "id": 60,
        "name": "ايس اسبريسو مارتيني",
        "description": null,
        "price": 3000,
        "category": "iced_coffee",
        "available": true,
        "sortOrder": 7
    },
    {
        "id": 76,
        "name": "فراولة",
        "description": null,
        "price": 3500,
        "category": "fresh_juices",
        "available": true,
        "sortOrder": 7
    },
    {
        "id": 48,
        "name": "كوكنت لاتيه",
        "description": null,
        "price": 4000,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 8
    },
    {
        "id": 49,
        "name": "سبانش لاتيه",
        "description": null,
        "price": 4500,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 9
    },
    {
        "id": 50,
        "name": "بستاشيو لاتيه",
        "description": null,
        "price": 5000,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 10
    },
    {
        "id": 51,
        "name": "كرميل مكياتو",
        "description": null,
        "price": 4000,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 11
    },
    {
        "id": 52,
        "name": "دارك موكا",
        "description": null,
        "price": 4000,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 12
    },
    {
        "id": 53,
        "name": "موكاتشينو",
        "description": null,
        "price": 4000,
        "category": "hot_coffee",
        "available": true,
        "sortOrder": 13
    },
    {
        "id": 115,
        "name": "ايس كركدي بالفراولة",
        "description": null,
        "price": 4000,
        "category": "cold_drinks",
        "available": true,
        "sortOrder": 7
    },
    {
        "id": 116,
        "name": "ايس كركدي",
        "description": null,
        "price": 2000,
        "category": "cold_drinks",
        "available": true,
        "sortOrder": 8
    },
    {
        "id": 117,
        "name": "ببسي",
        "description": null,
        "price": 1000,
        "category": "soft_drinks",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 118,
        "name": "ببسي دايت",
        "description": null,
        "price": 1000,
        "category": "soft_drinks",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 119,
        "name": "سفن آب",
        "description": null,
        "price": 1000,
        "category": "soft_drinks",
        "available": true,
        "sortOrder": 5
    },
    {
        "id": 120,
        "name": "شاي مثلج بالخوخ",
        "description": null,
        "price": 3500,
        "category": "iced_tea",
        "available": true,
        "sortOrder": 1
    },
    {
        "id": 121,
        "name": "شاي مثلج بالليمون",
        "description": null,
        "price": 3500,
        "category": "iced_tea",
        "available": true,
        "sortOrder": 2
    },
    {
        "id": 122,
        "name": "شاي مثلج بالنعناع",
        "description": null,
        "price": 3500,
        "category": "iced_tea",
        "available": true,
        "sortOrder": 3
    },
    {
        "id": 123,
        "name": "شاي مثلج مكس",
        "description": null,
        "price": 4000,
        "category": "iced_tea",
        "available": true,
        "sortOrder": 4
    },
    {
        "id": 124,
        "name": "قجرات استكان",
        "description": null,
        "price": 500,
        "category": "hot_drinks",
        "available": true,
        "sortOrder": 7
    },
    {
        "id": 125,
        "name": "قجرات كوب",
        "description": null,
        "price": 1000,
        "category": "hot_drinks",
        "available": true,
        "sortOrder": 8
    },
    {
        "id": 126,
        "name": "نومي حامض استكان",
        "description": null,
        "price": 500,
        "category": "hot_drinks",
        "available": true,
        "sortOrder": 9
    },
    {
        "id": 127,
        "name": "نومي حامض كوب",
        "description": null,
        "price": 1000,
        "category": "hot_drinks",
        "available": true,
        "sortOrder": 10
    }
];
let nextId = Math.max(...INITIAL_MENU_ITEMS.map((i) => i.id)) + 1;

interface MenuStore {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, "id">) => MenuItem;
  updateItem: (id: number, data: Partial<Omit<MenuItem, "id">>) => MenuItem | null;
  deleteItem: (id: number) => boolean;
  getItems: (category?: string) => MenuItem[];
}

export const useMenuStore = create<MenuStore>()(
  persist(
    (set, get) => ({
      items: INITIAL_MENU_ITEMS,

      addItem: (data) => {
        const newItem: MenuItem = { id: nextId++, ...data };
        set((state) => ({ items: [...state.items, newItem] }));
        return newItem;
      },

      updateItem: (id, data) => {
        let updated: MenuItem | null = null;
        set((state) => {
          const items = state.items.map((item) => {
            if (item.id === id) {
              updated = { ...item, ...data };
              return updated;
            }
            return item;
          });
          return { items };
        });
        return updated;
      },

      deleteItem: (id) => {
        const exists = get().items.some((i) => i.id === id);
        if (!exists) return false;
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
        return true;
      },

      getItems: (category) => {
        const items = get().items;
        const filtered = category ? items.filter((i) => i.category === category) : items;
        return filtered.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      },
    }),
    {
      name: "cafe-menu-items",
    }
  )
);

