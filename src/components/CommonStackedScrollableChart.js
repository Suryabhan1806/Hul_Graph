import React, { useMemo } from "react";
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

const CustomStackedTooltip = ({ active, payload }) => {
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
              <span className="tooltip-label">
                {entry.name}
              </span>
            </div>

            <span className="tooltip-value">
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

  const BAR_WIDTH = 40;

  const dynamicWidth = useMemo(() => {
    return data.length * 120;
  }, [data]);

  return (
    <div className="scroll-chart-container">

      {/* 🔥 Scroll Area */}
      <div className="chart-scroll-area">
        <div
          className="chart-inner-dynamic"
          style={{ width: dynamicWidth }}
        >
          <ResponsiveContainer width="100%" height={height}>
            <ComposedChart data={data} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis hide domain={[0, 100]} />
              {/* <Tooltip /> */}
              <Tooltip content={<CustomStackedTooltip />} />

              {stackBars.map((bar, index) => {
                const isTop = index === stackBars.length - 1;

                return (
                  <Bar
                    key={index}
                    dataKey={bar.dataKey}
                    stackId="a"
                    fill={bar.color}
                    barSize={BAR_WIDTH}
                    radius={isTop ? [10, 10, 0, 0] : [0, 0, 0, 0]}
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

      {/* 🔥 Legend BELOW Scrollbar */}
<div className="custom-legends">
  {stackBars.map((item, index) => (
    <div key={index} className="legend-items">
      <span
        className="legend-colors"
        style={{ backgroundColor: item.color }}
      />
      <span className="legend-texts">
        {item.label || item.dataKey}
      </span>
    </div>
  ))}
</div>


    </div>
  );
};

export default CommonStackedScrollableChart;
