import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  nameDarija: string;
  category: 'tacos' | 'burgers' | 'pizzas' | 'plats' | 'boissons';
  price: number;
  oldPrice?: number;
  description: string;
  image: string;
  inStock: boolean;
  isPopular?: boolean;
}

export interface DailyPromo {
  isActive: boolean;
  title: string;
  titleDarija: string;
  description: string;
  promoPrice: number;
  originalPrice: number;
  expiresIn: string;
}

export interface SnackSettings {
  name: string;
  nameDarija: string;
  tagline: string;
  whatsappNumber: string;
  city: string;
  address: string;
  deliveryFee: number;
  minOrderForFreeDelivery: number;
  adminPin: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

const DEFAULT_SETTINGS: SnackSettings = {
  name: 'Snack Le Gourmet Express',
  nameDarija: 'سناك الضيافة السريعة',
  tagline: 'أشهى ساندويتشات، طاكوس وبرغر طازج ومقرمش يومياً فكازا',
  whatsappNumber: '0621908195', // Specified phone number: 0621908195
  city: 'Casablanca',
  address: 'Boulevard Zerktouni, à côté de la pharmacie, Casablanca',
  deliveryFee: 15,
  minOrderForFreeDelivery: 120,
  adminPin: 'hamid123321', // Secret password requested by user
};

const DEFAULT_PROMO: DailyPromo = {
  isActive: true,
  title: 'Menu Tacos XL Double Viande + Frites + Coca',
  titleDarija: 'عرض اليوم الخارق : طاكوس XL دجاج ولحم + فريت + كوكا',
  description: 'طاكوس عملاق محشو بصلصة الجبن السويسرية، دجاج مقلي، كفتة متبلة، فريت مقرمش ومشروب غازي بارد.',
  promoPrice: 38,
  originalPrice: 52,
  expiresIn: '23:59 اليوم',
};

const DEFAULT_MENU: MenuItem[] = [
  {
    id: 'tacos-xl-supreme',
    name: 'Tacos XL Suprême Fromager',
    nameDarija: 'طاكوس XL سوبريم بالجبن والكفتة',
    category: 'tacos',
    price: 38,
    oldPrice: 48,
    description: 'دجاج متبل، كفتة طرية، صوص ألجيريان وصوص فروماجير منزلية غنية.',
    image: '/src/assets/images/snack_tacos_morocco_1792173196294.jpg',
    inStock: true,
    isPopular: true,
  },
  {
    id: 'smash-cheeseburger',
    name: 'Double Smash Bacon Cheddar',
    nameDarija: 'دوبل سماش برغر بالجبن والشيدار',
    category: 'burgers',
    price: 42,
    oldPrice: 50,
    description: 'قطعتين كفتة سماش محمرة على الصاج، دوبل شيدار ذائب، خس طري، وخبز بريوش خفيف.',
    image: '/src/assets/images/snack_burger_gourmet_1792173197898.jpg',
    inStock: true,
    isPopular: true,
  },
  {
    id: 'pizza-artisan-reine',
    name: 'Pizza Artisanale Reine & Mozza',
    nameDarija: 'بيتزا إيطالية بالجبن والموتزاريلا',
    category: 'pizzas',
    price: 45,
    description: 'عجينة مخمرة 48 ساعة، صلصة طماطم إيطالية، موتزاريلا طازجة مطاطية، فطر وزيتون.',
    image: '/src/assets/images/snack_pizza_artisan_1792173198435.jpg',
    inStock: true,
    isPopular: true,
  },
  {
    id: 'tacos-lyon-cordon',
    name: 'Tacos Lyon Cordon Bleu',
    nameDarija: 'طاكوس ليوني بالكوردون بلو',
    category: 'tacos',
    price: 35,
    description: 'كوردون بلو مقرمش، صوص ساموراي حارة، بطاطس مقلية وجبن فرنسي.',
    image: '/src/assets/images/snack_tacos_morocco_1792173196294.jpg',
    inStock: true,
  },
  {
    id: 'chicken-crispy-burger',
    name: 'Crispy Chicken Zinger Burger',
    nameDarija: 'برغر الدجاج المقرمش زينجر',
    category: 'burgers',
    price: 36,
    description: 'صدر دجاج مقلي ومتبل، مايونيز بالثوم، مخلل وخس أمريكي مقرمش.',
    image: '/src/assets/images/snack_burger_gourmet_1792173197898.jpg',
    inStock: true,
  },
  {
    id: 'boisson-coca-hawai',
    name: 'Boisson Canette 33cl (Coca / Hawai / Poms)',
    nameDarija: 'مشروب غازي بارد (كوكا / هاواي / بومس)',
    category: 'boissons',
    price: 8,
    description: 'علبة باردة مثلجة بنكهتك المفضلة.',
    image: '/src/assets/images/snack_burger_gourmet_1792173197898.jpg',
    inStock: true,
  },
];

interface SnackContextType {
  settings: SnackSettings;
  updateSettings: (newSettings: Partial<SnackSettings>) => void;
  promo: DailyPromo;
  updatePromo: (newPromo: Partial<DailyPromo>) => void;
  menu: MenuItem[];
  updateMenuItem: (id: string, updatedFields: Partial<MenuItem>) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  deleteMenuItem: (id: string) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  totalCartMAD: number;
  formatOrderMessage: (customerInfo: { name: string; phone: string; addressOrTable: string; notes?: string }) => string;
  generateWhatsAppLink: (customerInfo: { name: string; phone: string; addressOrTable: string; notes?: string }) => string;
  getFormattedPhoneNumber: () => string;
  resetAllDefaults: () => void;
  isAdminAuthenticated: boolean;
  verifyPinAndLogin: (pin: string) => boolean;
  logoutAdmin: () => void;
}

const SnackContext = createContext<SnackContextType | undefined>(undefined);

export const SnackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SnackSettings>(() => {
    try {
      const saved = localStorage.getItem('snack_demo_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Force the requested phone number 0621908195 if old dummy number is present
        if (!parsed.whatsappNumber || parsed.whatsappNumber.includes('12345678')) {
          parsed.whatsappNumber = '0621908195';
        }
        return parsed;
      }
      return DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [promo, setPromo] = useState<DailyPromo>(() => {
    try {
      const saved = localStorage.getItem('snack_demo_promo');
      return saved ? JSON.parse(saved) : DEFAULT_PROMO;
    } catch {
      return DEFAULT_PROMO;
    }
  });

  const [menu, setMenu] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('snack_demo_menu');
      return saved ? JSON.parse(saved) : DEFAULT_MENU;
    } catch {
      return DEFAULT_MENU;
    }
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('snack_admin_logged') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('snack_demo_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('snack_demo_promo', JSON.stringify(promo));
  }, [promo]);

  useEffect(() => {
    localStorage.setItem('snack_demo_menu', JSON.stringify(menu));
  }, [menu]);

  const verifyPinAndLogin = (pin: string) => {
    const cleanPin = pin.trim();
    if (cleanPin === 'hamid123321' || cleanPin === settings.adminPin.trim()) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('snack_admin_logged', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('snack_admin_logged');
  };

  const updateSettings = (newSettings: Partial<SnackSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updatePromo = (newPromo: Partial<DailyPromo>) => {
    setPromo((prev) => ({ ...prev, ...newPromo }));
  };

  const updateMenuItem = (id: string, updatedFields: Partial<MenuItem>) => {
    setMenu((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    setMenu((prev) => [newItem, ...prev]);
  };

  const deleteMenuItem = (id: string) => {
    setMenu((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.menuItem.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((c) => (c.menuItem.id === itemId ? { ...c, quantity: qty } : c))
    );
  };

  const clearCart = () => setCart([]);

  const totalCartMAD = cart.reduce(
    (acc, curr) => acc + curr.menuItem.price * curr.quantity,
    0
  );

  // Moroccan international standard phone formatter
  const getFormattedPhoneNumber = () => {
    let clean = (settings.whatsappNumber || '0621908195').replace(/[^0-9]/g, '');
    if (clean.startsWith('06') || clean.startsWith('07')) {
      clean = '212' + clean.substring(1);
    } else if (!clean.startsWith('212') && clean.length === 9) {
      clean = '212' + clean;
    }
    return clean || '212621908195';
  };

  const formatOrderMessage = (customerInfo: {
    name: string;
    phone: string;
    addressOrTable: string;
    notes?: string;
  }) => {
    const itemsList = cart
      .map(
        (c) =>
          `• ${c.quantity}x ${c.menuItem.nameDarija || c.menuItem.name} (${c.menuItem.price * c.quantity} DH)`
      )
      .join('\n');

    const total = totalCartMAD;
    const delivery = total >= settings.minOrderForFreeDelivery ? 0 : settings.deliveryFee;
    const finalTotal = total + delivery;

    return `Salam 3alaykom *${settings.nameDarija || settings.name}* ! 🍔
Bghit n-commander had l-talab 3afak:

${itemsList}

💰 *Sous-total :* ${total} DH
🛵 *Livraison :* ${delivery === 0 ? 'GRATUITE (فابور)' : `${delivery} DH`}
⭐️ *Total à payer :* *${finalTotal} DH*

👤 *Client :* ${customerInfo.name}
📱 *Téléphone :* ${customerInfo.phone}
📍 *Adresse / Table :* ${customerInfo.addressOrTable}
${customerInfo.notes ? `📝 *Remarques :* ${customerInfo.notes}` : ''}

Chokran !`;
  };

  const generateWhatsAppLink = (customerInfo: {
    name: string;
    phone: string;
    addressOrTable: string;
    notes?: string;
  }) => {
    const message = formatOrderMessage(customerInfo);
    const cleanPhone = getFormattedPhoneNumber();
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const resetAllDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setPromo(DEFAULT_PROMO);
    setMenu(DEFAULT_MENU);
    setCart([]);
    localStorage.removeItem('snack_demo_settings');
    localStorage.removeItem('snack_demo_promo');
    localStorage.removeItem('snack_demo_menu');
  };

  return (
    <SnackContext.Provider
      value={{
        settings,
        updateSettings,
        promo,
        updatePromo,
        menu,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        totalCartMAD,
        formatOrderMessage,
        generateWhatsAppLink,
        getFormattedPhoneNumber,
        resetAllDefaults,
        isAdminAuthenticated,
        verifyPinAndLogin,
        logoutAdmin,
      }}
    >
      {children}
    </SnackContext.Provider>
  );
};

export const useSnack = () => {
  const context = useContext(SnackContext);
  if (!context) {
    throw new Error('useSnack must be used within a SnackProvider');
  }
  return context;
};
