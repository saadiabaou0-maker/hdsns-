import React, { useState } from 'react';
import { useSnack, MenuItem } from '../../context/SnackContext';
import {
  ShoppingBag,
  Flame,
  Phone,
  MapPin,
  Clock,
  QrCode,
  Plus,
  Minus,
  Trash2,
  X,
  Lock,
  Check,
  Send,
  KeyRound
} from 'lucide-react';

interface SnackClientViewProps {
  onOpenAdmin: () => void;
}

export const SnackClientView: React.FC<SnackClientViewProps> = ({ onOpenAdmin }) => {
  const {
    settings,
    promo,
    menu,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    totalCartMAD,
    generateWhatsAppLink,
    verifyPinAndLogin,
    isAdminAuthenticated,
  } = useSnack();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  
  // Secret Admin Authentication modal triggered by the stealth button
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [secretCodeInput, setSecretCodeInput] = useState('');
  const [codeError, setCodeError] = useState(false);

  // Checkout form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressOrTable, setAddressOrTable] = useState('توصيل للمنزل : حي السلام، عمارة 4');
  const [orderNotes, setOrderNotes] = useState('بدون بصل، وزيد شوية صوص ألجيريان');

  const filteredItems = menu.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const cartTotalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !addressOrTable) {
      alert('عفاك عمر سميتك ونمرتك والعنوان باش نصيفطو الطلب فـ WhatsApp.');
      return;
    }

    const waUrl = generateWhatsAppLink({
      name: customerName,
      phone: customerPhone,
      addressOrTable,
      notes: orderNotes,
    });

    window.open(waUrl, '_blank');
  };

  const handleSecretLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPinAndLogin(secretCodeInput)) {
      setIsSecretModalOpen(false);
      setSecretCodeInput('');
      setCodeError(false);
      onOpenAdmin();
    } else {
      setCodeError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F141F] text-slate-100 flex flex-col justify-between">
      <div>
        {/* Top Header for Customers (100% Restaurant identity) */}
        <header className="bg-[#151D2C] border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg">
                🍔
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-extrabold text-white">
                  {settings.nameDarija}
                </h1>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="line-clamp-1">{settings.address}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="p-2 sm:px-3 sm:py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="كود QR لقائمة الطعام"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">كود QR للطاولة</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="font-mono tabular-nums">{totalCartMAD} DH</span>
                {cartTotalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-mono flex items-center justify-center font-bold">
                    {cartTotalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Food Menu Section */}
        <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
          {/* Daily Promo Hero Banner */}
          {promo.isActive && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/70 via-red-950/50 to-slate-900 border border-amber-500/40 p-5 sm:p-7 shadow-xl">
              <div className="absolute top-3 left-3 bg-red-500/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono uppercase tracking-wider animate-pulse">
                <Flame className="w-3 h-3" />
                <span>Promo du Jour</span>
              </div>

              <div className="max-w-xl space-y-2 mt-2">
                <span className="text-xs font-semibold text-amber-400">
                  عرض خاص اليوم محدود حتى {promo.expiresIn} :
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {promo.titleDarija || promo.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {promo.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                      {promo.promoPrice} DH
                    </span>
                    {promo.originalPrice > promo.promoPrice && (
                      <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                        {promo.originalPrice} DH
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      const promoMenuItem = menu[0] || {
                        id: 'promo-deal',
                        name: promo.title,
                        nameDarija: promo.titleDarija,
                        category: 'tacos',
                        price: promo.promoPrice,
                        description: promo.description,
                        image: '/src/assets/images/snack_tacos_morocco_1792173196294.jpg',
                        inStock: true,
                      };
                      addToCart(promoMenuItem);
                      setIsCartOpen(true);
                    }}
                    className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>طلب هاد العرض دابا</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Categories Horizontal Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'الكل (Menu Complet)' },
              { id: 'tacos', label: 'طاكوس (Tacos)' },
              { id: 'burgers', label: 'برغر (Burgers)' },
              { id: 'pizzas', label: 'بيتزا (Pizzas)' },
              { id: 'boissons', label: 'مشروبات (Boissons)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Food Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl border bg-[#151D2C] overflow-hidden flex flex-col justify-between transition-all group ${
                  item.inStock
                    ? 'border-slate-800 hover:border-slate-700'
                    : 'border-red-900/30 opacity-75'
                }`}
              >
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151D2C] via-transparent to-transparent" />

                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    {item.inStock ? (
                      item.isPopular && (
                        <span className="bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          الأكثر طلباً 🔥
                        </span>
                      )
                    ) : (
                      <span className="bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        سالات السلعة (Rupture)
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-mono tabular-nums text-amber-400 font-bold">
                    {item.price} DH
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.nameDarija || item.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.name}</p>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-white font-mono tabular-nums">
                        {item.price} DH
                      </span>
                      {item.oldPrice && (
                        <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                          {item.oldPrice} DH
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (item.inStock) {
                          addToCart(item);
                          setIsCartOpen(true);
                        }
                      }}
                      disabled={!item.inStock}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                        item.inStock
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{item.inStock ? 'إضافة للطلب' : 'غير متوفر'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Discrete Footer with the Secret Button (الكليان ما كيردش ليه البال نهائياً) */}
      <footer className="mt-16 border-t border-slate-800/60 bg-[#0E131F] py-8 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1">
            <span>© 2026 {settings.nameDarija}. جميع الحقوق محفوظة.</span>
            
            {/* The Tiny Subtle Secret Trigger: A microscopic dot that looks like punctuation, but opens the code prompt */}
            <button
              onClick={() => {
                if (isAdminAuthenticated) {
                  onOpenAdmin();
                } else {
                  setIsSecretModalOpen(true);
                }
              }}
              className="text-slate-700 hover:text-slate-500 p-0.5 text-[10px] cursor-default select-none transition-colors"
              title=""
            >
              •
            </button>
          </p>

          <div className="flex items-center gap-3 text-slate-500 text-[11px]">
            <span>توصيل سريع فـ كازا</span>
            <span aria-hidden="true">·</span>
            <span>طازج ومحضر يومياً</span>
          </div>
        </div>
      </footer>

      {/* Secret Password Modal (Must enter: hamid123321) */}
      {isSecretModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#151D2C] border border-slate-800 rounded-2xl w-full max-w-xs p-6 text-center relative shadow-2xl space-y-4">
            <button
              onClick={() => {
                setIsSecretModalOpen(false);
                setCodeError(false);
                setSecretCodeInput('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">الرمز السري لمول السناك</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                دخل الكود السري ديالك باش تحل لوحة التحكم وتبدل الأثمنة والعروض.
              </p>
            </div>

            <form onSubmit={handleSecretLogin} className="space-y-3">
              <input
                type="password"
                placeholder="أدخل الكود السري..."
                value={secretCodeInput}
                onChange={(e) => {
                  setSecretCodeInput(e.target.value);
                  setCodeError(false);
                }}
                className={`w-full bg-slate-900 border rounded-xl px-4 py-2.5 text-center text-sm font-mono text-white focus:outline-none ${
                  codeError ? 'border-red-500' : 'border-slate-800 focus:border-emerald-500'
                }`}
                autoFocus
              />

              {codeError && (
                <p className="text-[11px] text-red-400 font-medium">الرمز السري غير صحيح !</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                تأكيد الدخول
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#151D2C] border border-slate-800 rounded-2xl w-full max-w-lg p-5 sm:p-6 relative shadow-2xl">
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 pr-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>سلة الطلبيات (Panier)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                الطلب كيوصل نيشان فـ WhatsApp ديال السناك
              </p>
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                السلة خاوية دابا. اختار شي وجبة باش تطلبها !
              </div>
            ) : (
              <div className="space-y-4 max-h-56 overflow-y-auto pr-1 divide-y divide-slate-800">
                {cart.map((c) => (
                  <div key={c.menuItem.id} className="pt-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-white">
                        {c.menuItem.nameDarija || c.menuItem.name}
                      </p>
                      <p className="text-[11px] text-amber-400 font-mono tabular-nums">
                        {c.menuItem.price} DH × {c.quantity} = {c.menuItem.price * c.quantity} DH
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
                        <button
                          onClick={() => updateCartQuantity(c.menuItem.id, c.quantity - 1)}
                          className="p-1 hover:text-amber-400 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-mono font-bold">{c.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(c.menuItem.id, c.quantity + 1)}
                          className="p-1 hover:text-amber-400 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(c.menuItem.id)}
                        className="p-1 text-slate-500 hover:text-red-400 cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <form onSubmit={handleOrderSubmit} className="mt-5 pt-4 border-t border-slate-800 space-y-3 text-xs">
                <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-slate-300">
                    <span>مجموع الطلبيات :</span>
                    <span className="font-mono tabular-nums font-bold">{totalCartMAD} DH</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>مصاريف التوصيل :</span>
                    <span className="font-mono tabular-nums">
                      {totalCartMAD >= settings.minOrderForFreeDelivery
                        ? 'فابور (Gratuit)'
                        : `${settings.deliveryFee} DH`}
                    </span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-1 border-t border-slate-800">
                    <span>المجموع الإجمالي :</span>
                    <span className="text-sm font-mono text-amber-400 tabular-nums">
                      {totalCartMAD +
                        (totalCartMAD >= settings.minOrderForFreeDelivery
                          ? 0
                          : settings.deliveryFee)}{' '}
                      DH
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-medium">اسمك (Nom)</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: يوسف العلمي"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-medium">رقم هاتفك (Téléphone)</label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 06 12 34 56 78"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-medium">العنوان أو رقم الطاولة</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: توصيل للمنزل حي السلام أو طاولة رقم 3"
                    value={addressOrTable}
                    onChange={(e) => setAddressOrTable(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>تأكيد الطلب وإرساله فـ WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Table QR Code Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#151D2C] border border-slate-800 rounded-2xl w-full max-w-sm p-6 text-center relative shadow-2xl space-y-4">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <QrCode className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">كود QR لقائمة الطعام</h3>
              <p className="text-xs text-slate-400 mt-1">
                يطبع هذا الكود ويلصق على طاولات السناك لكي يمسحه الزبون بهاتفه مباشرة.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl inline-block shadow-inner mx-auto">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://snack-express-maroc.ma"
                alt="QR Code Snack"
                className="w-44 h-44 object-contain"
              />
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              طباعة كود QR للطاولات
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
