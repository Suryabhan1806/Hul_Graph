import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import "./MaiBarChart.css";

const MaiBarChart = ({ data }) => {
  return (
    <div className="mai-wrapper">
      <div className="mai-scroll">
        <div
          style={{
            width: data.length > 8 ? data.length * 90 : "100%",
            height: 300,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              barGap={0}
            >
              {/* 6 Horizontal Lines */}
              <CartesianGrid
                strokeDasharray="0"
                vertical={false}
                stroke="#e6e6e6"
              />

              <XAxis
                dataKey="week"
                tick={{ fontSize: 13 }}
                axisLine={false}
                tickLine={false}
              />

              {/* <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                axisLine={false}
                tickLine={false}
              /> */}

              <Tooltip />

              <Bar
                dataKey="start"
                fill="#9bc3c8"
                radius={[8, 8, 0, 0]}
                barSize={28}
              />

              <Bar
                dataKey="end"
                fill="#0f5c63"
                radius={[8, 8, 0, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fixed Legend */}
      <div className="mai-legend-fixed">
        <div>
          <span className="dot start-dot"></span> Start of Week
        </div>
        <div>
          <span className="dot end-dot"></span> End of Week
        </div>
      </div>
    </div>
  );
};

export default MaiBarChart;
