import {
  ResponsiveContainer,
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

  return (
    <div className="bar-chart-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          barCategoryGap="30%"   
          margin={{ top: 40, right: 20, left: 20, bottom: 20 }} 
        >
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#dcdcdc"
          />

          <XAxis
            dataKey={nameKey}
            tick={{ fontSize: 13 }}
            interval={0}
          />

          <YAxis hide />

          <Tooltip />

          <Bar
            dataKey={dataKey}
            radius={[12, 12, 0, 0]}
            barSize={40}   
          >
            <LabelList
              dataKey={dataKey}
              position="top"
              content={({ x, y, width, value, index }) => {
                const percentage = formattedData[index].percentage;

                return (
                  <text
                    x={x + width / 2}
                    y={y - 18}   
                    fill="#000"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="600"
                  >
                    {value}
                    <tspan
                      x={x + width / 2}
                      dy="16"
                      fontSize="13"
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
      </ResponsiveContainer>
    </div>
  );
};

export default CommonBarGraph;
