import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = ["#FF0800", "#FFD700"];

const Statistics = () => {
    const [allOrder, setAllOrder] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/order")
            .then((res) => res.json())
            .then((data) => setAllOrder(data));
    }, [allOrder]);
    const delivered = allOrder.filter(delivery => delivery.status === 'paid' || delivery.status === "delivered")
    const data2 = [
        { name: "All Order", value: allOrder.length },
        { name: "Delivered", value: delivered.length }
    ];

    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#000"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <p className="text-center text-2xl font-bold">Stats</p>
            <ResponsiveContainer width="100%" height={600}>
                <PieChart>
                    <Pie
                        data={data2}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={180}
                        label={renderLabel}
                    >
                        {data2.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Statistics;


