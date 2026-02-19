import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import "./common.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {payload.map((entry, index) => (
          <div key={index} className="tooltip-row">
            <div className="tooltip-left">
              <span
                className="tooltip-dot"
                style={{ backgroundColor: entry.color }}
              />
              <span className="tooltip-label">{entry.name}</span>
            </div>
            <span className="tooltip-value">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CommonGroupedScrollableChart = ({
  data = [],
  xKey = "week",
  bars = [],
  height = 340,
}) => {


  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);


  const dynamicWidth = useMemo(() => {
    const calculatedWidth = data.length * 110;
    return Math.max(calculatedWidth, containerWidth);
  }, [data, containerWidth]);

  
  const [activeKeys, setActiveKeys] = useState(
    bars.map((b) => b.dataKey)
  );

  const toggleBar = (key) => {
    setActiveKeys((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  return (
    <div className="scroll-chart-container" ref={containerRef}>
      
      <div className="chart-scroll-area">
        <div
          className="chart-inner-dynamic"
          style={{ width: dynamicWidth }}
        >
          <ResponsiveContainer width="100%" height={height}>
            <ComposedChart
              data={data}
              barCategoryGap="15%"
              barGap={0}
              margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
              />

              <XAxis 
                dataKey={xKey}
                axisLine={false}
                tickLine={false}
              />

              <YAxis 
                hide 
                domain={[0, 110]} 
              />

              <Tooltip content={<CustomTooltip />} />

              {bars
                .filter((bar) => activeKeys.includes(bar.dataKey))
                .map((bar, index) => (
                  <Bar
                    key={index}
                    dataKey={bar.dataKey}
                    fill={bar.color}
                    barSize={42}
                    radius={[10, 10, 0, 0]}
                  >
                    <LabelList
                      dataKey={bar.dataKey}
                      position="insideTop"
    offset={10}  
    formatter={(value) => (value ? `${value}%` : "")}
    style={{
      fontSize: 12,
      fill: "#fff",
      fontWeight: 600,
    }}
  />
</Bar>

                ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔥 Clickable Legend */}
      <div className="custom-legends">
        {bars.map((item, index) => {
          const isActive = activeKeys.includes(item.dataKey);

          return (
            <div
              key={index}
              className="legend-items"
              onClick={() => toggleBar(item.dataKey)}
              style={{
                cursor: "pointer",
                opacity: isActive ? 1 : 0.4,
              }}
            >
              <span
                className="legend-colors"
                style={{ backgroundColor: item.color }}
              />
              <span className="legend-texts">
                {item.label || item.dataKey}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CommonGroupedScrollableChart;
