import { useState, useMemo } from "react";
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  ReferenceArea,
  LabelList,
} from "recharts";
import "./commonLineTable.css";
 
const CommonZoneLineBarChart = ({ data }) => {
  const [activeZone, setActiveZone] = useState(null);
 
  const [showAcceptance, setShowAcceptance] = useState(true);
  const [showAdoption, setShowAdoption] = useState(true);
 
  const filteredData = useMemo(() => {
    if (!activeZone) return data;
    return data.filter((item) => item.zone === activeZone);
  }, [data, activeZone]);
 
  const BAR_LIMIT = 22;
  const BAR_WIDTH = 75;
 
  const chartWidth =
    filteredData.length > BAR_LIMIT ? filteredData.length * BAR_WIDTH : "100%";
 
  const maxBar =
    filteredData.length > 0 ? Math.max(...filteredData.map((d) => d.bar)) : 0;
 
  const processedData = useMemo(() => {
    return filteredData.map((item, index) => ({
      ...item,
      uniqueWeek: `${item.week}-${index}`,
    }));
  }, [filteredData]);
 
  return (
    <div className="chart-wrapper">
      <div className="scroll-container">
        <div className="chart-inner">
          <ResponsiveContainer width={chartWidth} height={380}>
            <ComposedChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
 
              <XAxis
                dataKey="uniqueWeek"
                interval={0}
                tickFormatter={(value) => value.split("-")[0]}
              />
 
              <YAxis
                yAxisId="left"
                domain={[0, Math.ceil(maxBar * 1.8)]}
                hide
              />
 
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 105]}
                hide
              />
 
              <Tooltip />
 
              {/* Background Zones */}
              {processedData.map((entry, index) => (
                <ReferenceArea
                  key={index}
                  x1={entry.uniqueWeek}
                  x2={entry.uniqueWeek}
                  y1={0}
                  y2={Math.ceil(maxBar * 1.8)}
                  yAxisId="left"
                  fill={
                    entry.zone === "GREEN"
                      ? "#E9F6EC"
                      : entry.zone === "MID"
                        ? "#FCEBD7"
                        : "#F8D7DA"
                  }
                  fillOpacity={0.6}
                />
              ))}
 
              {/* Bars */}
              <Bar
                yAxisId="left"
                dataKey="bar"
                fill="#0F5C63"
                barSize={30}
                radius={[8, 8, 0, 0]}
              >
                <LabelList
                  content={({ x, y, width, value }) => {
                    if (!value) return null;
                    const percent = Math.round((value / maxBar) * 100);
 
                    return (
                      <text
                        x={x + width / 2}
                        y={y - 6}
                        textAnchor="middle"
                        fill="#2f3e46"
                        fontSize="12"
                        fontWeight="600"
                      >
                        {percent}%
                      </text>
                    );
                  }}
                />
 
                <LabelList
                  dataKey="bar"
                  position="insideTop"
                  style={{ fill: "#fff", fontWeight: 600 }}
                />
              </Bar>
 
              {/* ✅ Acceptance Line Toggle */}
              {showAcceptance && (
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="acceptance"
                  stroke="#B76E3B"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  connectNulls
                >
                  <LabelList
                    dataKey="acceptance"
                    position="top"
                    formatter={(val) => `${val}%`}
                    style={{ fill: "#B76E3B", fontWeight: 600 }}
                  />
                </Line>
              )}
 
              {/* ✅ Adoption Line Toggle */}
              {showAdoption && (
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="adoption"
                  stroke="#1E90A8"
                  strokeDasharray="5 5"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  connectNulls
                >
                  <LabelList
                    dataKey="adoption"
                    position="top"
                    formatter={(val) => `${val}%`}
                    style={{ fill: "#1E90A8", fontWeight: 600 }}
                  />
                </Line>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
 
      {/* Custom Legend */}
      <div className="zone-legend">
        <div
          className="legend-item"
          onClick={() => setShowAcceptance(!showAcceptance)}
        >
          <span className="dot acceptance"></span> Acceptance
        </div>
 
        <div
          className="legend-item"
          onClick={() => setShowAdoption(!showAdoption)}
        >
          <span className="dot adoption"></span> Adoption
        </div>
 
        {["GREEN", "MID", "ALERT"].map((zone) => (
          <div
            key={zone}
            className="legend-item"
            onClick={() => setActiveZone(activeZone === zone ? null : zone)}
          >
            <span
              className={`box ${zone.toLowerCase()} ${
                activeZone === zone ? "active" : ""
              }`}
            ></span>
            {zone} Zone
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default CommonZoneLineBarChart;