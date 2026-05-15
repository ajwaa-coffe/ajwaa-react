/**
 * كودات الخصم لكوفي أجواء
 *
 * لإضافة كود خصم جديد:
 * أضف سطراً جديداً بالصيغة:
 *   "CODENAME": 0.XX,
 *
 * مثال: "WELCOME10": 0.10 → خصم 10%
 *        "VIP25": 0.25     → خصم 25%
 *        "STAFF50": 0.50   → خصم 50%
 *
 * الكودات غير حساسة لحالة الأحرف (كبير/صغير).
 */
export const DISCOUNT_CODES: Record<string, number> = {
  "AJWA05":     0.05,
  "COFFEE10":   0.10,
  "AJWAA15":    0.15,
  "WELCOME20":  0.20,
  "SPECIAL25":  0.25,
  "GOLD30":     0.30,
  "ELITE35":    0.35,
  "KING40":     0.40,
  "ROYAL45":    0.45,
  "LEGEND55":   0.55,
};

export function applyDiscountCode(code: string): number | null {
  const upper = code.trim().toUpperCase();
  const discount = DISCOUNT_CODES[upper];
  return discount !== undefined ? discount : null;
}
