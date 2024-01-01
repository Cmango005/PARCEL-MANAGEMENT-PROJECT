import { useEffect, useState } from "react";


const Menu = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/dashboard/menu')
            .then(res => res.json())
            .then(data => {
                const sortedMenu = data.sort((a, b) => a.name.localeCompare(b.name));
                setMenu(sortedMenu);
            })
    }, [menu])
    return (
        <div className="min-h-screen p-2" style={{ background: "linear-gradient(90deg, #1ee3bf, #6e6bd8)" }}>
            <h1 className="text-center font-semibold text-2xl p-3 text-white wel">OUR SELLING ITEMS......</h1>
            <div className="grid grid-cols-3 p-3 gap-5">
                {
                    menu.map(items => <div key={items._id} className="card card-compact w-80 h-60 backdrop-blur bg-transparent text-white border-2 shadow-xl">
                        <figure><img src={items.img} className="w-56 h-4/5 rounded" /></figure>
                        <div className="card-body text-center text-xl font-bold">
                            <h2 className="">{items.name}</h2>
                            <p>Price:{items.price_per_kg}$/kg</p>

                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Menu;