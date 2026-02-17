import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    LabelList,
} from "recharts";
import "./common.css";

const CommonBarGraph = ({
    data,
    dataKey = "value",
    nameKey = "name",
    color = "#2f3e9e",
}) => {
    const total = data.reduce((sum, item) => sum + item[dataKey], 0);

    const formattedData = data.map((item) => ({
        ...item,
        percentage: ((item[dataKey] / total) * 100).toFixed(0),
    }));

    const chartWidth = Math.max(data.length * 110, 600);

    return (
        <div className="bar-scroll-wrapper">
            <div style={{ width: chartWidth, height: "100%" }}>
                <BarChart
                    width={chartWidth}
                    height={350}
                    data={formattedData}
                    barCategoryGap="25%"
                    margin={{ top: 50, right: 20, left: 20, bottom: 10 }}
                >
                    <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="#e5e5e5"
                    />

                    <XAxis
                        dataKey={nameKey}
                        interval={0}
                        height={60}
                        tick={({ x, y, payload }) => {
                            const words = payload.value.split(" ");

                            let firstLine = "";
                            let secondLine = "";

                            if (words.length <= 2) {
                                firstLine = words[0];
                                secondLine = words[1] || "";
                            } else {
                                firstLine = words.slice(0, words.length - 1).join(" ");
                                secondLine = words[words.length - 1];
                            }

                            return (
                                <text
                                    x={x}
                                    y={y + 10}
                                    textAnchor="middle"
                                    fill="#444"
                                    fontSize={13}
                                >
                                    <tspan x={x} dy="0">
                                        {firstLine}
                                    </tspan>
                                    {secondLine && (
                                        <tspan x={x} dy="15">
                                            {secondLine}
                                        </tspan>
                                    )}
                                </text>
                            );
                        }}
                    />



                    <YAxis hide />


                    <Tooltip
                        cursor={false}
                        contentStyle={{
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                        }}
                    />


                    <Bar
                        dataKey={dataKey}
                        radius={[10, 10, 0, 0]}
                        barSize={35}
                    >
                        <LabelList
                            dataKey={dataKey}
                            position="top"
                            content={({ x, y, width, value, index }) => {
                                const percentage =
                                    formattedData[index].percentage;

                                return (
                                    <text
                                        x={x + width / 2}
                                        y={y - 20}
                                        fill="#000"
                                        textAnchor="middle"
                                        fontSize="13"
                                        fontWeight="600"
                                    >
                                        {value}
                                        <tspan
                                            x={x + width / 2}
                                            dy="15"
                                            fontSize="12"
                                            fontWeight="500"
                                        >
                                            ({percentage}%)
                                        </tspan>
                                    </text>
                                );
                            }}
                        />

                        {formattedData.map((entry, index) => (
                            <Cell key={index} fill={color} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
};

export default CommonBarGraph;
