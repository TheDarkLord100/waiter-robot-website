import "./menu.css";
import { useState, useEffect } from "react";

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMenu() {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/menu`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                // console.log("Fetched menu data:", response.json());
                const data = await response.json();
                console.log("Fetched menu data:", data);
                setMenuItems(data);
            }
            catch (err) {
                setError("Failed to load menu. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    return (
        <div className="menu-page">
            <div className="menu-container">
                <h1 className="menu-title">Robot Restaurant Menu 🤖</h1>

                <div className="menu-grid">
                    {menuItems.map((item) => (
                        <div key={item._id || item.id} className="menu-card">
                            {/* Image Section */}
                            {item.image ? (
                                <div className="menu-image-container">
                                    <img src={item.image} alt={item.name} className="menu-image" />
                                </div>
                            ) : (
                                <div className="menu-image-placeholder">🍽️</div>
                            )}

                            {/* Text Section */}
                            <div className="menu-content">
                                <h2>{item.name}</h2>
                                <p className="menu-desc">{item.description}</p>
                                <p className="menu-price">₹{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
