import { useState } from "react";
import { ShoppingBag, Minus, Plus, Trash2, Tag, X } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { applyDiscountCode } from "@/lib/discount-codes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_NUMBER = "9647744464462";

export function CartDrawer({
  externalOpen,
  onExternalClose,
}: {
  externalOpen?: boolean;
  onExternalClose?: () => void;
} = {}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = externalOpen !== undefined ? externalOpen || isOpen : isOpen;
  const setOpen = (v: boolean) => {
    setIsOpen(v);
    if (!v) onExternalClose?.();
  };
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [discountInput, setDiscountInput] = useState("");
  const [discountRate, setDiscountRate] = useState<number | null>(null);
  const [discountError, setDiscountError] = useState("");

  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } =
    useCartStore();
  const totalItems = getTotalItems();
  const rawTotal = getTotalPrice();
  const discountAmount = discountRate ? Math.round(rawTotal * discountRate) : 0;
  const finalTotal = rawTotal - discountAmount;

  const handleApplyDiscount = () => {
    if (!discountInput.trim()) return;
    const rate = applyDiscountCode(discountInput);
    if (rate !== null) {
      setDiscountRate(rate);
      setDiscountError("");
    } else {
      setDiscountRate(null);
      setDiscountError("كود الخصم غير صحيح");
    }
  };

  const handleRemoveDiscount = () => {
    setDiscountRate(null);
    setDiscountInput("");
    setDiscountError("");
  };

  const handleSendOrder = () => {
    if (items.length === 0) return;

    let message = `طلب جديد من كوفي أجواء ☕\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `👤 اسم الزبون: ${customerName || "—"}\n`;
    message += `📞 رقم التواصل: ${phone || "—"}\n`;
    message += `📍 العنوان: ${address || "—"}\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `🛒 الطلبات:\n`;

    items.forEach((item) => {
      const itemTotal = Number(item.menuItem.price) * item.quantity;
      message += `• ${item.menuItem.name} × ${item.quantity} = ${itemTotal.toLocaleString("ar-IQ")} د.ع\n`;
    });

    message += `━━━━━━━━━━━━━━━\n`;
    message += `💰 المجموع: ${rawTotal.toLocaleString("ar-IQ")} د.ع\n`;

    if (discountRate) {
      message += `🎁 خصم (${Math.round(discountRate * 100)}%): -${discountAmount.toLocaleString("ar-IQ")} د.ع\n`;
      message += `✅ الإجمالي بعد الخصم: ${finalTotal.toLocaleString("ar-IQ")} د.ع\n`;
    }

    if (notes.trim()) message += `📝 ملاحظات: ${notes}\n`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
    setOpen(false);
    clearCart();
    setCustomerName("");
    setPhone("");
    setAddress("");
    setNotes("");
    handleRemoveDiscount();
  };

  return (
    <>
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
          >
            <Button
              size="lg"
              data-testid="btn-open-cart"
              onClick={() => setOpen(true)}
              className="rounded-full shadow-2xl h-14 px-8 text-base font-bold pointer-events-auto bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              <ShoppingBag className="ml-2 h-5 w-5" />
              اطلب الآن عبر واتساب
              <span className="mr-3 bg-amber-400 text-black px-2.5 py-0.5 rounded-full text-sm font-extrabold">
                {totalItems}
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="h-[92dvh] flex flex-col px-0 rounded-t-3xl"
        >
          <SheetHeader className="px-6 pt-2 pb-3 text-right flex-row items-center justify-between">
            <SheetTitle className="text-xl flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              سلة المشتريات
            </SheetTitle>
          </SheetHeader>

          <Separator />

          <ScrollArea className="flex-1 px-5 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-3">
                <ShoppingBag className="h-12 w-12 opacity-20" />
                <p className="text-sm">السلة فارغة</p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="flex items-center gap-3 bg-secondary/50 p-3 rounded-xl border"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{item.menuItem.name}</h4>
                        <div className="text-amber-500 font-bold text-sm mt-0.5">
                          {(Number(item.menuItem.price) * item.quantity).toLocaleString("ar-IQ")} د.ع
                        </div>
                      </div>

                      <div className="flex items-center gap-1 bg-background border rounded-xl p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-lg"
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-5 text-center text-sm font-bold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-lg"
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-lg"
                        onClick={() => removeItem(item.menuItem.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order details form */}
                <div className="space-y-3 bg-secondary/30 p-4 rounded-2xl border border-dashed">
                  <h3 className="font-bold text-base">تفاصيل الطلب</h3>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">اسم الزبون</label>
                    <Input
                      data-testid="input-customer-name"
                      placeholder="أدخل اسمك"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">رقم التواصل</label>
                    <Input
                      data-testid="input-phone"
                      placeholder="+964 7XX XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-xl"
                      type="tel"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">العنوان</label>
                    <Input
                      data-testid="input-address"
                      placeholder="مثال: بغداد، المنصور، شارع 14"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">ملاحظات</label>
                    <Textarea
                      data-testid="input-notes"
                      placeholder="أي تعديلات أو طلبات خاصة؟"
                      className="resize-none rounded-xl"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  {/* Discount code */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">كود الخصم</label>
                    {discountRate ? (
                      <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-xl px-3 py-2">
                        <Tag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="flex-1 text-sm text-emerald-700 dark:text-emerald-300 font-semibold">
                          خصم {Math.round(discountRate * 100)}% مفعّل
                        </span>
                        <button onClick={handleRemoveDiscount} className="text-muted-foreground hover:text-foreground">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          data-testid="input-discount-code"
                          placeholder="أدخل كود الخصم"
                          value={discountInput}
                          onChange={(e) => {
                            setDiscountInput(e.target.value);
                            setDiscountError("");
                          }}
                          className="rounded-xl flex-1"
                          dir="ltr"
                        />
                        <Button
                          variant="outline"
                          onClick={handleApplyDiscount}
                          className="rounded-xl shrink-0"
                          data-testid="btn-apply-discount"
                        >
                          تطبيق
                        </Button>
                      </div>
                    )}
                    {discountError && (
                      <p className="text-xs text-destructive">{discountError}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          <div className="px-5 py-4 border-t bg-background space-y-3">
            {discountRate ? (
              <div className="space-y-1">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>المجموع قبل الخصم</span>
                  <span>{rawTotal.toLocaleString("ar-IQ")} د.ع</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                  <span>الخصم ({Math.round(discountRate * 100)}%)</span>
                  <span>− {discountAmount.toLocaleString("ar-IQ")} د.ع</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>الإجمالي</span>
                  <span className="text-amber-500">{finalTotal.toLocaleString("ar-IQ")} د.ع</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="font-medium">الإجمالي</span>
                <span className="text-xl font-extrabold text-amber-500">
                  {rawTotal.toLocaleString("ar-IQ")} د.ع
                </span>
              </div>
            )}

            <Button
              data-testid="btn-send-order"
              className="w-full h-12 text-base font-bold rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white"
              onClick={handleSendOrder}
              disabled={items.length === 0}
            >
              <SiWhatsapp className="ml-2 h-5 w-5" />
              إرسال الطلب عبر واتساب
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
