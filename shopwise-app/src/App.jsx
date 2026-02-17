import { useState } from "react";

const USERS = {
  275427: [6, 295168, 291036, 287572, 242380],
  979592: [345004, 79057, 295168, 272144, 100205],
  203742: [287572, 424932, 100202, 100203, 47353],
  364670: [291036, 345755, 272144, 100207, 100204],
  558444: [6, 345004, 242380, 100205, 79057],
  712983: [100203, 47353, 100206, 100202, 287572],
};

const SIMILARITY = {
  6:      [345004, 79057, 287572, 424932, 242380],
  345004: [6, 79057, 242380, 100205, 287572],
  79057:  [6, 345004, 242380, 287572, 424932],
  287572: [424932, 6, 100202, 79057, 242380],
  424932: [287572, 6, 100202, 79057, 242380],
  242380: [6, 345004, 79057, 287572, 100205],
  295168: [291036, 272144, 345755, 100207, 100204],
  291036: [295168, 272144, 100207, 345755, 100204],
  345755: [295168, 291036, 272144, 100207, 100206],
  272144: [295168, 291036, 345755, 100207, 100204],
  47353:  [100206, 100203, 100202, 287572, 6],
  100202: [424932, 287572, 47353, 100203, 100201],
  100203: [47353, 100206, 100202, 287572, 424932],
  100204: [295168, 291036, 345755, 272144, 100207],
  100205: [345004, 6, 242380, 79057, 100206],
  100206: [47353, 100203, 295168, 291036, 345755],
  100207: [295168, 291036, 345755, 272144, 100204],
  100201: [287572, 424932, 100202, 6, 242380],
};

function getRecs(userId) {
  const items = USERS[userId] || [];
  const scores = {};
  for (const item of items) {
    for (const sim of (SIMILARITY[item] || [])) {
      scores[sim] = (scores[sim] || 0) + 1;
    }
  }
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => Number(id))
    .filter(id => !items.includes(id))
    .slice(0, 8);
}

const PRODUCTS = {
  6:      { name: "Wireless Headphones Pro",  cat: "Electronics", price: 7499,  emoji: "🎧" },
  345004: { name: "Noise Cancelling Earbuds", cat: "Electronics", price: 5499,  emoji: "🎧" },
  79057:  { name: "Bluetooth Speaker Mini",   cat: "Electronics", price: 3299,  emoji: "🔊" },
  287572: { name: "USB-C Fast Charger 65W",   cat: "Accessories", price: 1999,  emoji: "⚡" },
  424932: { name: "Phone Stand & Grip Ring",  cat: "Accessories", price: 999,   emoji: "📱" },
  242380: { name: "Portable Power Bank 20K",  cat: "Electronics", price: 3999,  emoji: "🔋" },
  295168: { name: "Mechanical Keyboard TKL",  cat: "Computers",   price: 10999, emoji: "⌨️" },
  291036: { name: "Ergonomic Mouse Wireless", cat: "Computers",   price: 4499,  emoji: "🖱️" },
  345755: { name: '27" 4K Monitor',           cat: "Computers",   price: 26999, emoji: "🖥️" },
  272144: { name: "Webcam 1080p HD",          cat: "Computers",   price: 6499,  emoji: "📷" },
  47353:  { name: "LED Desk Lamp Smart",      cat: "Home",        price: 3699,  emoji: "💡" },
  100201: { name: 'Laptop Sleeve 15"',        cat: "Accessories", price: 1699,  emoji: "💼" },
  100202: { name: "Cable Management Kit",     cat: "Home",        price: 1399,  emoji: "🔧" },
  100203: { name: "Smart Plug Wi-Fi 4-Pack",  cat: "Home",        price: 2899,  emoji: "🏠" },
  100204: { name: "RGB Gaming Mousepad XL",   cat: "Gaming",      price: 2299,  emoji: "🎮" },
  100205: { name: "Streaming Microphone",     cat: "Electronics", price: 7999,  emoji: "🎙️" },
  100206: { name: "Monitor Light Bar",        cat: "Home",        price: 2999,  emoji: "🌟" },
  100207: { name: "Laptop Cooling Pad",       cat: "Computers",   price: 2499,  emoji: "❄️" },
};

const fmt = (n) => "₹" + n.toLocaleString("en-IN");

function Card({ id, onView, onAdd }) {
  const p = PRODUCTS[id];
  const [added, setAdded] = useState(false);
  if (!p) return null;
  return (
    <div
      onClick={() => onView(id)}
      style={{
        border: "1px solid #e5e7eb", borderRadius: 10,
        padding: 16, cursor: "pointer", background: "#fff",
        transition: "box-shadow 0.15s",
      }}
      onMouseOver={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.09)"}
      onMouseOut={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{
        background: "#f9fafb", borderRadius: 8, height: 110,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 44, marginBottom: 12,
      }}>
        {p.emoji}
      </div>
      <div style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{p.cat}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 12, lineHeight: 1.4, minHeight: 38 }}>{p.name}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>{fmt(p.price)}</span>
        <button
          onClick={e => {
            e.stopPropagation();
            onAdd(id);
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
          style={{
            fontSize: 12, padding: "5px 12px",
            border: "1px solid #d1d5db", borderRadius: 6,
            background: added ? "#111827" : "#fff",
            color: added ? "#fff" : "#374151",
            cursor: "pointer",
          }}
        >{added ? "✓" : "Add"}</button>
      </div>
    </div>
  );
}

export default function App() {
  const [user,    setUser]    = useState(null);
  const [input,   setInput]   = useState("");
  const [error,   setError]   = useState("");
  const [view,    setView]    = useState("home");
  const [product, setProduct] = useState(null);
  const [cart,    setCart]    = useState([]);
  const [toast,   setToast]   = useState("");

  const addToCart = (id) => {
    setCart(prev => {
      const found = prev.find(x => x.id === id);
      return found
        ? prev.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x)
        : [...prev, { id, qty: 1 }];
    });
    setToast(PRODUCTS[id]?.name + " added to cart");
    setTimeout(() => setToast(""), 2000);
  };

  const openProduct = (id) => { setProduct(id); setView("product"); window.scrollTo(0, 0); };
  const cartTotal   = cart.reduce((s, x) => s + (PRODUCTS[x.id]?.price || 0) * x.qty, 0);
  const cartCount   = cart.reduce((s, x) => s + x.qty, 0);
  const recs        = user ? getRecs(user) : [];
  const history     = user ? (USERS[user] || []) : [];

  const signIn = () => {
    const id = Number(input.trim());
    if (USERS[id]) { setUser(id); setError(""); }
    else setError("Visitor ID not found");
  };

  // ── LOGIN ────────────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div style={{
        width: "100vw", minHeight: "100vh",
        background: "#f9fafb",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ width: 400 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Shopwise</div>
            <div style={{ fontSize: 14, color: "#9ca3af" }}>Enter your visitor ID to continue</div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 28, marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 7 }}>Visitor ID</div>
            <input
              value={input}
              onChange={e => { setInput(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && signIn()}
              placeholder="e.g. 275427"
              style={{
                display: "block", width: "100%", padding: "10px 12px",
                border: `1px solid ${error ? "#fca5a5" : "#e5e7eb"}`,
                borderRadius: 8, fontSize: 14, outline: "none",
                marginBottom: 8,
              }}
            />
            {error && <div style={{ fontSize: 12, color: "#ef4444", marginBottom: 8 }}>{error}</div>}
            <button
              onClick={signIn}
              style={{
                display: "block", width: "100%",
                background: "#111827", color: "#fff", border: "none",
                borderRadius: 8, padding: "11px 0",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}
            >Sign in</button>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>Sample visitor IDs</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.keys(USERS).map(id => (
                <button key={id} onClick={() => { setInput(String(id)); setError(""); }}
                  style={{ fontSize: 12, padding: "4px 10px", border: "1px solid #e5e7eb", borderRadius: 6, background: "#f9fafb", cursor: "pointer", fontFamily: "monospace" }}>
                  {id}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 10 }}>
              Real visitor IDs from RetailRocket dataset (users with ≥20 interactions)
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── NAVBAR ───────────────────────────────────────────────────────────────
  const Navbar = () => (
    <div style={{ width: "100%", borderBottom: "1px solid #f3f4f6", background: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
      <div style={{ width: "100%", maxWidth: 1400, margin: "0 auto", padding: "0 48px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span onClick={() => setView("home")} style={{ fontWeight: 700, fontSize: 17, cursor: "pointer" }}>Shopwise</span>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <button onClick={() => setView("cart")} style={{ background: "none", border: "none", fontSize: 14, color: "#374151", cursor: "pointer" }}>
            Cart {cartCount > 0 && <span style={{ background: "#111827", color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 11, marginLeft: 3 }}>{cartCount}</span>}
          </button>
          <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: "monospace" }}>ID: {user}</span>
          <button onClick={() => { setUser(null); setCart([]); setInput(""); }} style={{ fontSize: 13, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>Sign out</button>
        </div>
      </div>
    </div>
  );

  const Wrap = ({ children }) => (
    <div style={{ width: "100%", maxWidth: 1400, margin: "0 auto", padding: "36px 48px 60px" }}>
      {children}
    </div>
  );

  // ── CART ─────────────────────────────────────────────────────────────────
  if (view === "cart") {
    return (
      <div style={{ width: "100%", minHeight: "100vh", background: "#fff" }}>
        <Navbar />
        <Wrap>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 28 }}>Your Cart</div>
          {cart.length === 0
            ? <div style={{ color: "#9ca3af", fontSize: 14 }}>Your cart is empty.</div>
            : <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 40 }}>
                <div>
                  {cart.map(x => {
                    const p = PRODUCTS[x.id]; if (!p) return null;
                    return (
                      <div key={x.id} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid #f3f4f6", alignItems: "center" }}>
                        <div style={{ width: 60, height: 60, background: "#f9fafb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{p.emoji}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{p.name}</div>
                          <div style={{ fontSize: 12, color: "#9ca3af" }}>{p.cat} · qty: {x.qty}</div>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{fmt(p.price * x.qty)}</div>
                        <button onClick={() => setCart(prev => prev.filter(c => c.id !== x.id))} style={{ background: "none", border: "none", color: "#d1d5db", cursor: "pointer", fontSize: 20 }}>×</button>
                      </div>
                    );
                  })}
                </div>
                <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 22, alignSelf: "start", position: "sticky", top: 72 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Order Summary</div>
                  {cart.map(x => {
                    const p = PRODUCTS[x.id]; if (!p) return null;
                    return (
                      <div key={x.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
                        <span>{p.name} × {x.qty}</span><span>{fmt(p.price * x.qty)}</span>
                      </div>
                    );
                  })}
                  <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
                    <span>Total</span><span>{fmt(cartTotal)}</span>
                  </div>
                  <button style={{ marginTop: 14, width: "100%", background: "#111827", color: "#fff", border: "none", borderRadius: 8, padding: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Checkout</button>
                </div>
              </div>
          }
        </Wrap>
      </div>
    );
  }

  // ── PRODUCT ───────────────────────────────────────────────────────────────
  if (view === "product" && product && PRODUCTS[product]) {
    const p    = PRODUCTS[product];
    const sims = (SIMILARITY[product] || []).filter(id => PRODUCTS[id]).slice(0, 4);
    return (
      <div style={{ width: "100%", minHeight: "100vh", background: "#fff" }}>
        <Navbar />
        {toast && <div style={{ position: "fixed", top: 68, right: 28, background: "#111827", color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 13, zIndex: 99 }}>{toast}</div>}
        <Wrap>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", fontSize: 13, color: "#6b7280", cursor: "pointer", marginBottom: 24, padding: 0 }}>← Back</button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, marginBottom: 52, alignItems: "start" }}>
            <div style={{ background: "#f9fafb", borderRadius: 12, height: 300, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 96, border: "1px solid #f3f4f6" }}>{p.emoji}</div>
            <div>
              <div style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{p.cat}</div>
              <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.2, marginBottom: 20 }}>{p.name}</div>
              <div style={{ fontSize: 30, fontWeight: 700, marginBottom: 28 }}>{fmt(p.price)}</div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => addToCart(product)} style={{ flex: 1, background: "#111827", color: "#fff", border: "none", borderRadius: 8, padding: 13, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Add to Cart</button>
                <button style={{ padding: "13px 18px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: 18 }}>♡</button>
              </div>
            </div>
          </div>
          {sims.length > 0 && <>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Similar products</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 16 }}>Based on similar buying patterns</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {sims.map(id => <Card key={id} id={id} onView={openProduct} onAdd={addToCart} />)}
            </div>
          </>}
        </Wrap>
      </div>
    );
  }

  // ── HOME ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      {toast && <div style={{ position: "fixed", top: 68, right: 28, background: "#111827", color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 13, zIndex: 99 }}>{toast}</div>}
      <Wrap>
        {recs.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>Recommended for you</div>
            <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 20 }}>Based on your past interactions</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {recs.slice(0, 4).map(id => <Card key={id} id={id} onView={openProduct} onAdd={addToCart} />)}
            </div>
            {recs.length > 4 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 16 }}>
                {recs.slice(4).map(id => <Card key={id} id={id} onView={openProduct} onAdd={addToCart} />)}
              </div>
            )}
          </div>
        )}
        {history.length > 0 && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>Previously viewed</div>
            <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 20 }}>Items you've interacted with</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
              {history.filter(id => PRODUCTS[id]).map(id => <Card key={id} id={id} onView={openProduct} onAdd={addToCart} />)}
            </div>
          </div>
        )}
      </Wrap>
    </div>
  );
}
