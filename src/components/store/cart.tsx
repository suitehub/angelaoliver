import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./data";

export interface CartLine { product: Product; qty: number }

export function cartSubtotal(lines: CartLine[]) {
  return Math.round(lines.reduce((s, l) => s + l.product.price * l.qty, 0) * 100) / 100;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (p: Product) => void;
  change: (id: string, delta: number) => void;
  remove: (id: string) => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const value = useMemo<CartCtx>(() => ({
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: cartSubtotal(lines),
    open,
    setOpen,
    add: (p) => {
      setLines((ls) => ls.some((l) => l.product.id === p.id)
        ? ls.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l))
        : [...ls, { product: p, qty: 1 }]);
      setOpen(true);
    },
    change: (id, d) => setLines((ls) => ls.map((l) => (l.product.id === id ? { ...l, qty: l.qty + d } : l)).filter((l) => l.qty > 0)),
    remove: (id) => setLines((ls) => ls.filter((l) => l.product.id !== id)),
  }), [lines, open]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
