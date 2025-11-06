import "./menu.css";

export default function MenuPage() {
  const menuItems = [
    { id: 1, name: "Robot Special Pizza", desc: "Crispy crust with AI-selected toppings.", price: 299 },
    { id: 2, name: "Neon Noodles", desc: "Glowing noodles infused with futuristic flavors.", price: 249 },
    { id: 3, name: "Quantum Burger", desc: "Served with uncertainty fries and a secret sauce.", price: 199 },
    { id: 4, name: "Holographic Salad", desc: "Fresh greens with light-projected dressing.", price: 179 },
    { id: 5, name: "AI Smoothie", desc: "Smart blend of fruits optimized for taste.", price: 149 },
    { id: 6, name: "Binary Brownie", desc: "Zeroes and ones of chocolate goodness.", price: 99 },
  ];

  return (
    <div className="menu-page">
      <div className="menu-container">
        <h1 className="menu-title">Robot Restaurant Menu 🤖</h1>

        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-card">
              <h2>{item.name}</h2>
              <p className="menu-desc">{item.desc}</p>
              <p className="menu-price">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
