import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Sector } from 'recharts';

function Home() {
    const data = [
        { date: '2024-11-24', attempts: 30, averageScore: 75, topScore: 95 },
        { date: '2024-11-25', attempts: 25, averageScore: 68, topScore: 90 },
        { date: '2024-11-26', attempts: 40, averageScore: 80, topScore: 98 },
        { date: '2024-11-27', attempts: 35, averageScore: 72, topScore: 92 },
        { date: '2024-11-28', attempts: 20, averageScore: 78, topScore: 94 },
        { date: '2024-11-29', attempts: 50, averageScore: 85, topScore: 100 },
        { date: '2024-11-30', attempts: 45, averageScore: 82, topScore: 97 },
    ];

    const pieData = [
        { name: 'Attempted', value: 250 },
        { name: 'Not Attempted', value: 150 },
    ];

    const COLORS = ['#4caf50', '#f44336']; // Colors for PieChart segments

    // Function to customize the shape of the Pie chart when hovered
    const renderActiveShape = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
        const RADIAN = Math.PI / 180;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const ex = cx + (outerRadius + 30) * cos;
        const ey = cy + (outerRadius + 30) * sin;
        const textAnchor = sx > cx ? 'start' : 'end';

        return (
            <g>
                <text x={sx} y={sy} textAnchor={textAnchor} fill="#333" fontSize={14} fontWeight="bold">{payload.name}</text>
                {/* Removed the value display */}
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 10}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    };

    return (
        <main className="home-container">
            <h1 className="main-title">Dashboard</h1>

            {/* Charts Container */}
            <div className="charts-container">
                {/* Bar Chart */}
                <div className="chart-box">
                    <h3>Daily Quiz Attempts</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="attempts" fill="#4caf50" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart */}
                <div className="chart-box">
                    <h3>Daily Quiz Scores</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="averageScore" stroke="#2196f3" />
                            <Line type="monotone" dataKey="topScore" stroke="#f44336" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="chart-box">
                    <h3>Quiz Attempt Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                activeShape={renderActiveShape} // Applying the custom shape for active sectors
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <style jsx>{`
                .home-container {
                    padding: 20px;
                    background-color: #E4E0E1; /* Background color */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    height: 100vh;
                }

                .main-title {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 24px;
                    color: #333;
                }

                .charts-container {
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: nowrap;
                    width: 100%;
                    max-width: 100%;
                    padding: 0 20px;
                    justify-content: center; /* Centers the charts */
                }

                .chart-box {
                    background-color: #fff;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    width: 30%; /* Each chart takes up 30% of the container width */
                    min-width: 300px;
                    max-width: 500px; /* Ensures that charts don't grow too large */
                }

                .chart-box h3 {
                    margin-bottom: 10px;
                    color: #333;
                }

                /* Responsive adjustment for smaller screens */
                @media (max-width: 768px) {
                    .charts-container {
                        flex-direction: column;
                        align-items: center;
                    }

                    .chart-box {
                        width: 90%; /* Full width for each chart on smaller screens */
                        margin-bottom: 20px;
                    }

                    .search-container {
                        padding: 0 20px;
                    }

                    .search-input {
                        width: 100%;
                        font-size: 14px;
                    }
                }
            `}</style>
        </main>
    );
}

export default Home;
