import { useCartTotalItems } from "@cart-web-vite/shared/hooks/use-cart";
import { lazy, Suspense, useState } from "react";
import type { PropsWithChildren } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./Header.css";

const MiniCartRemote = lazy(() =>
  import("checkout/MiniCart").then((m) => ({ default: m.MiniCart })),
);

function HeaderMiniCartButton({ onClick }: { onClick: () => void }) {
  const total = useCartTotalItems();

  return (
    <button className="header__mini-cart__btn" onClick={onClick}>
      &#128722;
      {total > 0 && <span className="header__mini-cart__badge">{total}</span>}
    </button>
  );
}

function HeaderMiniCartDropdown() {
  return (
    <div className="header__mini-cart__dropdown">
      <ErrorBoundary fallback={<div>Erro ao carregar o mini carrinho</div>}>
        <Suspense fallback={<div>Carregando mini carrinho...</div>}>
          <MiniCartRemote />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function HeaderMiniCart() {
  const [open, setOpen] = useState(false);

  return (
    <div className="header__mini-cart">
      <HeaderMiniCartButton onClick={() => setOpen((prev) => !prev)} />
      {open && <HeaderMiniCartDropdown />}
    </div>
  );
}

export function Header({ children }: PropsWithChildren) {
  return (
    <header className="header">
      <div className="header__left">{children}</div>
      <div className="header__right">
        <HeaderMiniCart />
      </div>
    </header>
  );
}
