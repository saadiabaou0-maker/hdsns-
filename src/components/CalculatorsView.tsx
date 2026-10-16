import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, PieChart, ShieldAlert } from 'lucide-react';

export const CalculatorsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cod' | 'freelance' | 'budget'>('cod');

  // COD Calculator State
  const [sellingPrice, setSellingPrice] = useState<number>(249);
  const [productCost, setProductCost] = useState<number>(65);
  const [shippingFee, setShippingFee] = useState<number>(35);
  const [returnFee, setReturnFee] = useState<number>(20);
  const [deliveryRate, setDeliveryRate] = useState<number>(70); // 70%
  const [adSpendPerOrder, setAdSpendPerOrder] = useState<number>(45);
  const [monthlyOrders, setMonthlyOrders] = useState<number>(150);

  // COD Calculations
  // Total cost per delivered parcel = productCost + shippingFee + adSpendPerOrder + ((1 - deliveryRate/100) * returnFee)
  const deliveredOrdersCount = Math.round(monthlyOrders * (deliveryRate / 100));
  const returnedOrdersCount = monthlyOrders - deliveredOrdersCount;
  const totalRevenue = deliveredOrdersCount * sellingPrice;
  const totalProductCost = deliveredOrdersCount * productCost;
  const totalShippingDelivered = deliveredOrdersCount * shippingFee;
  const totalReturnCost = returnedOrdersCount * returnFee;
  const totalAdSpend = monthlyOrders * adSpendPerOrder;
  const totalCosts = totalProductCost + totalShippingDelivered + totalReturnCost + totalAdSpend;
  const netMonthlyProfit = totalRevenue - totalCosts;
  const netProfitPerDelivered = deliveredOrdersCount > 0 ? Math.round(netMonthlyProfit / deliveredOrdersCount) : 0;
  const profitMarginPercent = totalRevenue > 0 ? Math.round((netMonthlyProfit / totalRevenue) * 100) : 0;

  // Freelance Calculator State
  const [incomeGoal, setIncomeGoal] = useState<number>(7500);
  const [pricePerClient, setPricePerClient] = useState<number>(1500);
  const [hoursPerClientPerWeek, setHoursPerClientPerWeek] = useState<number>(5);

  const clientsNeeded = Math.ceil(incomeGoal / Math.max(pricePerClient, 1));
  const weeklyWorkHours = clientsNeeded * hoursPerClientPerWeek;
  const pitchesNeededToClose = clientsNeeded * 10; // 10% close rate

  // Budget Calculator State
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState<number>(6000);
  const livingExpenses = Math.round(monthlyIncomeInput * 0.5);
  const businessReinvestment = Math.round(monthlyIncomeInput * 0.3);
  const emergencySavings = Math.round(monthlyIncomeInput * 0.2);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <span>حاسبات الأرباح وتحديد الأهداف المالية (MAD)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            أرقام حقيقية بالدرهم المغربي لحساب التكاليف الصافية ونسب التوصيل قبل ما تبدا.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('cod')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'cod'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            أرباح التجارة COD
          </button>
          <button
            onClick={() => setActiveTab('freelance')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'freelance'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            هدف العمل الحر
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'budget'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            خطة 50/30/20 للأرباح
          </button>
        </div>
      </div>

      {/* Tab 1: COD E-Commerce Calculator */}
      {activeTab === 'cod' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-5">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>إدخال معطيات المنتوج والحملة</span>
              <span className="text-xs font-mono text-emerald-400 font-normal">بالدرهم المغربي (DH)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  ثمن البيع للكليان (Prix de vente)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">DH</span>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  ثمن الشراء بالجملة (Prix d'achat)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={productCost}
                    onChange={(e) => setProductCost(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">DH</span>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  تكلفة التوصيل (Livraison livrée)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={shippingFee}
                    onChange={(e) => setShippingFee(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">DH</span>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  تكلفة الإعلان للطلب (CPA / Ads per order)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={adSpendPerOrder}
                    onChange={(e) => setAdSpendPerOrder(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">DH</span>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  نسبة التوصيل الفعلية (Taux de livraison)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="30"
                    max="95"
                    value={deliveryRate}
                    onChange={(e) => setDeliveryRate(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">%</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">المعدل العادي بالمغرب بين 65% و 75%</p>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  مجموع الطلبيات الشهرية المسجلة
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">colis</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>
                ملاحظة واقعية: الكولي لي كيرجع (Retour) كياخد عليه الموزع فالمغرب ما بين 15 و 25 درهم مصاريف إرجاع، وهو محسوب هنا تلقائياً.
              </span>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-5 bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>النتيجة الصافية (Bénéfice Net)</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <p className="text-xs text-slate-400">الربح الصافي الشهري المقدر</p>
                <p className={`text-3xl font-extrabold font-mono tabular-nums mt-1 ${netMonthlyProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {netMonthlyProfit.toLocaleString()} DH
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  هامش ربح صافي: <span className="font-mono text-white font-bold">{profitMarginPercent}%</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <p className="text-slate-400">الربح الصافي لكل كولي واصل</p>
                  <p className="text-white font-bold font-mono tabular-nums mt-0.5">
                    {netProfitPerDelivered} DH
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <p className="text-slate-400">عدد الطلبيات المستلمة</p>
                  <p className="text-white font-bold font-mono tabular-nums mt-0.5">
                    {deliveredOrdersCount} / {monthlyOrders}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <p className="text-slate-400">مجموع مداخيل الكاش</p>
                  <p className="text-white font-bold font-mono tabular-nums mt-0.5">
                    {totalRevenue.toLocaleString()} DH
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <p className="text-slate-400">مجموع مصاريف الإعلانات</p>
                  <p className="text-white font-bold font-mono tabular-nums mt-0.5">
                    {totalAdSpend.toLocaleString()} DH
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Freelance Calculator */}
      {activeTab === 'freelance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-5">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              تحديد أهداف خدمات العمل الحر (SMMA / مونتاج / تصاميم)
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  المدخول الشهري المستهدف (Objectif mensuel)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={incomeGoal}
                    onChange={(e) => setIncomeGoal(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">DH</span>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  ثمن الخدمة لكل كليان أو مشروع (Prix par client)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={pricePerClient}
                    onChange={(e) => setPricePerClient(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">DH</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">مثال: 1,500 DH لإدارة صفحة مقهى، أو 80 DH لكل ريلز مركب</p>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  ساعات العمل التقديرية لكل كليان فالأسبوع
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={hoursPerClientPerWeek}
                    onChange={(e) => setHoursPerClientPerWeek(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">ساعات</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              خطة العمل المطلوبة للوصول لهدفك
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <p className="text-xs text-slate-400">عدد الكليان الدائمين المطلوبين</p>
                <p className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums mt-1">
                  {clientsNeeded} كليان فقط
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  بمعدل {pricePerClient} درهم لكل واحد = {incomeGoal.toLocaleString()} DH
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <p className="text-slate-400">ساعات العمل الأسبوعية</p>
                  <p className="text-white font-bold font-mono tabular-nums mt-0.5">
                    {weeklyWorkHours} ساعة / سيمانة
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <p className="text-slate-400">رسائل مقترحة لإغلاق الصفقات</p>
                  <p className="text-white font-bold font-mono tabular-nums mt-0.5">
                    {pitchesNeededToClose} رسالة DM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Budget Allocation */}
      {activeTab === 'budget' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-400" />
              <span>قاعدة 50/30/20 لتنظيم أرباح البيزنس بالمغرب</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              الغلط الكبير لي كيطيحو فيه المبتدئين فاش كيبداو يدخلو الفلوس هو كيصرفو كلشي وما كيعاودوش يستثمرو فالبيزنس.
              هاد التقسيم كيعطيك أمان مالي واستمرارية.
            </p>

            <div className="text-xs pt-2">
              <label className="text-slate-300 font-medium block mb-1">
                المدخول الشهري الحالي أو المتوقع (MAD)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={monthlyIncomeInput}
                  onChange={(e) => setMonthlyIncomeInput(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-slate-500 font-mono">DH</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              توزيع الميزانية المقترح
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">50% المصاريف الشخصية والمعيشة</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">كراء، أكل، نقل، تعبئة الهاتف</p>
                </div>
                <span className="text-sm font-bold text-white font-mono tabular-nums">
                  {livingExpenses.toLocaleString()} DH
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <p className="font-bold text-emerald-300">30% إعادة الاستثمار فالبيزنس</p>
                  <p className="text-emerald-400/80 text-[11px] mt-0.5">إعلانات، شراء سلع جديدة، تطوير الماتيريال</p>
                </div>
                <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                  {businessReinvestment.toLocaleString()} DH
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-sky-950/20 border border-sky-500/30 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sky-300">20% صندوق الطوارئ والادخار</p>
                  <p className="text-sky-400/80 text-[11px] mt-0.5">في حساب بنكي منفصل (CIH / Attijariwafa)</p>
                </div>
                <span className="text-sm font-bold text-sky-400 font-mono tabular-nums">
                  {emergencySavings.toLocaleString()} DH
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
