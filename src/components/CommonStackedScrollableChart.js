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
import styles from './CommonStackedScrollableChart.module.css';

const CustomStackedTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${styles.customTooltip}`}>
        {payload.map((entry, index) => (
          <div key={index} className={`${styles.toolTipRow}`}>
            <div className={styles.tooltipLeft}>
              <span
                className={styles.toolTipDot}
                style={{ backgroundColor: entry.color }}
              />
              <span className={styles.toolTipLabel}>
                {entry.name}
              </span>
            </div>
            <span className={styles.toolTipValue}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CommonStackedScrollableChart = ({
  data = [],
  xKey = "week",
  stackBars = [],
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
    const calculatedWidth = data.length * 120;
    return Math.max(calculatedWidth, containerWidth);
  }, [data, containerWidth]);

  const [activeKeys, setActiveKeys] = useState(
    stackBars.map((b) => b.dataKey)
  );

  const toggleBar = (key) => {
    setActiveKeys((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  return (
    <div className={styles.scrollChartContainer} ref={containerRef}>

      <div className={styles.chartScrollArea}>
        <div
          className={styles.chartInnerDynamic}
          style={{ width: dynamicWidth }}
        >
          <ResponsiveContainer width="100%" height={height}>
            <ComposedChart
              data={data}
              barCategoryGap="15%"
              barGap={0}
              margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              <XAxis 
                dataKey={xKey}
                axisLine={false}
                tickLine={false}
              />

              <YAxis hide domain={[0, 110]} />

              <Tooltip content={<CustomStackedTooltip />} />

              {stackBars
                .filter((bar) => activeKeys.includes(bar.dataKey))
                .map((bar, index, filteredBars) => {

                  const isTop = 
                    index === filteredBars.length - 1;

                  return (
                    <Bar
                      key={index}
                      dataKey={bar.dataKey}
                      stackId="a"
                      fill={bar.color}
                      barSize={40}
                      radius={
                        isTop ? [10, 10, 0, 0] : [0, 0, 0, 0]
                      }
                    >
                      <LabelList
                        dataKey={bar.dataKey}
                        position="inside"
                        formatter={(value) =>
                          value ? `${value}%` : ""
                        }
                        style={{
                          fontSize: 12,
                          fill: "#fff",
                          fontWeight: 500,
                        }}
                      />
                    </Bar>
                  );
                })}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔥 Clickable Legend */}
      <div className={styles.customLegends}>
        {stackBars.map((item, index) => {
          const isActive = activeKeys.includes(item.dataKey);

          return (
            <div
              key={index}
              className={styles.legendItems}
              onClick={() => toggleBar(item.dataKey)}
              style={{
                cursor: "pointer",
                opacity: isActive ? 1 : 0.4,
              }}
            >
              <span
                className={styles.legendColors}
                style={{ backgroundColor: item.color }}
              />
              <span className={styles.legendTexts}>
                {item.label || item.dataKey}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CommonStackedScrollableChart;
