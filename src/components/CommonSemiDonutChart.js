import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector
} from "recharts";
import { useState } from "react";
import styles from "./CommonSemiDonutChart.module.css";

const COLORS = [
  "#6D5CA7",
  "#4F46A5",
  "#7C83FD",
  "#1E3A8A",
  "#2F80ED",
  "#9CA3AF",
  "#4B5563",
  "#14B8A6",
  "#6B7280",
  "#065F46"
];

let prevY = null;

const renderLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  value
}) => {
  const RADIAN = Math.PI / 180;

  const baseOffset = 10;
  const smallSliceExtra = percent < 0.07 ? 8 : 0;
  const radius = outerRadius + baseOffset + smallSliceExtra;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  let y = cy + radius * Math.sin(-midAngle * RADIAN);

  const minGap = 16;

  if (prevY !== null && Math.abs(y - prevY) < minGap) {
    y = y > prevY ? prevY + minGap : prevY - minGap;
  }

  prevY = y;

  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={13}
      fontWeight={600}
      fill="#111827"
    >
      {`${value} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill
  } = props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 8}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <strong>{payload[0].name}</strong>
        <div>Value: {payload[0].value}</div>
      </div>
    );
  }
  return null;
};

const CommonSemiDonutChart = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Decide which slice should be active
  const activeIndex =
    selectedIndex !== null ? selectedIndex : hoverIndex;

  return (
    <div className={styles.semiDonutWrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<CustomTooltip />} />

          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="75%"
            innerRadius={100}
            outerRadius={160}
            paddingAngle={0}
            labelLine={false}
            label={renderLabel}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            isAnimationActive={false}
          >
            {data.map((entry, index) => {
              const isVisible =
                selectedIndex === null || selectedIndex === index;

              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  cursor="pointer"
                  opacity={isVisible ? 1 : 0.3}
                  onClick={() =>
                    setSelectedIndex(
                      selectedIndex === index ? null : index
                    )
                  }
                />
              );
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Clickable Legend */}
      <div className={styles.customLegend}>
        {data.map((item, index) => {
          const isActive =
            selectedIndex === null || selectedIndex === index;

          return (
            <div
              key={index}
              className={styles.legendItem}
              onClick={() =>
                setSelectedIndex(
                  selectedIndex === index ? null : index
                )
              }
              style={{
                cursor: "pointer",
                opacity: isActive ? 1 : 0.4
              }}
            >
              <span
                className={styles.legendDot}
                style={{
                  backgroundColor:
                    COLORS[index % COLORS.length]
                }}
              />
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommonSemiDonutChart;