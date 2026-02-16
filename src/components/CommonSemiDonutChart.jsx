import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const COLORS = [
  "#7A6C9D",
  "#5E4B8B",
  "#8A88A8",
  "#1F4E79",
  "#3E6EA1",
  "#6C8EBF",
  "#5B9BD5",
  "#3BA7B8",
  "#4F7F84",
  "#0E5A61"
];

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 22;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#1f2937"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={13}
      fontWeight={500}
    >
      {`${value} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const CommonSemiDonutChart = ({ data }) => {
  return (
    <div className="semi-donut-wrapper">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="90%"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={3}
            dataKey="value"
            label={renderLabel}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="custom-legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <span
              className="legend-dot"
              style={{ background: COLORS[index % COLORS.length] }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};


export default CommonSemiDonutChart;
