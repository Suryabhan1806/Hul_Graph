import { useState } from "react";
import IconButton from "../components/IconButton";
import TableIconButton from "../components/TableIconButton";
import CommonSemiDonutChart from "../components/CommonSemiDonutChart";
import CommonTable from "../components/CommonTable";
import ExportButton from "../components/ExportButton";
import HubIcon from "@mui/icons-material/Hub";
import TableRowsIcon from "@mui/icons-material/TableRows";
import "../pages/dashboard.css";
import CommonBarGraph from "../components/CommonBarGraph";
import { rootCauseData, rejectionData } from "../data/dashboardData";

const zoneChartData = [
  { week: "Week 21", acceptance: 93, adoption: 87, bar: 8, zone: "GREEN" },
  { week: "Week 22", acceptance: 90, adoption: 93, bar: 18, zone: "GREEN" },
  { week: "Week 23", acceptance: 88, adoption: 88, bar: 20, zone: "GREEN" },
  { week: "Week 24", acceptance: 91, adoption: 91, bar: 20, zone: "MID" },
  { week: "Week 25", acceptance: 96, adoption: 96, bar: 20, zone: "MID" },
  { week: "Week 26", acceptance: 90, adoption: 90, bar: 20, zone: "MID" },
  { week: "Week 27", acceptance: 89, adoption: 89, bar: 19, zone: "MID" },
  { week: "Week 28", acceptance: 92, adoption: 92, bar: 19, zone: "ALERT" },
  { week: "Week 29", acceptance: 90, adoption: 90, bar: 19, zone: "ALERT" },
  { week: "Week 30", acceptance: 90, adoption: 90, bar: 19, zone: "ALERT" },
  { week: "Week 31", acceptance: 94, adoption: 94, bar: 19, zone: "ALERT" },
];




const Dashboard = () => {
  const [activeLeft, setActiveLeft] = useState("graph");
  const [activeRight, setActiveRight] = useState("graph");

  const totalLeft = rootCauseData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const leftTableData = rootCauseData.map(item => ({
    ...item,
    percentage: ((item.value / totalLeft) * 100).toFixed(1) + "%"
  }));

  const leftColumns = [
    { header: "Root Causes Split", accessor: "name" },
    { header: "Value", accessor: "value", align: "center" },
    { header: "Percentage %", accessor: "percentage", align: "center" }
  ];

  const totalRight = rejectionData.reduce(
    (sum, item) => sum + item.value,
    0
  );


  const rightTableData = rejectionData.map(item => ({
    ...item,
    percentage: ((item.value / totalRight) * 100).toFixed(1) + "%"
  }));


  const rightColumns = [
    { header: "Top Rejection Reasons", accessor: "name" },
    { header: "Value", accessor: "value", align: "center" },
    { header: "Percentage %", accessor: "percentage", align: "center" }
  ];


  return (
    <div className="dashboard-grid">

      {/* ================= LEFT CARD ================= */}
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <div className="header-left">
            <h2 className="dashboard-title">Root Causes Split</h2>
          </div>

          <div className="header-right">
            <div className="toggle-wrapper">
              <IconButton
                Icon={HubIcon}
                active={activeLeft === "graph"}
                onClick={() => setActiveLeft("graph")}
              />
              <TableIconButton
                Icon={TableRowsIcon}
                active={activeLeft === "table"}
                onClick={() => setActiveLeft("table")}
              />
            </div>

            <ExportButton
              data={leftTableData}
              fileName="root-causes.xls"
            />
          </div>
        </div>

        {activeLeft === "graph" ? (
          <div className="graph-container">
            <CommonSemiDonutChart data={rootCauseData} />
          </div>
        ) : (
          <div className="table-container">
            <CommonTable
              data={leftTableData}
              columns={leftColumns}
            />
          </div>
        )}
      </div>

      {/* ================= RIGHT CARD ================= */}
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <div className="header-left">
            <h2 className="dashboard-title">
              Top Rejection Reasons
            </h2>
          </div>

          <div className="header-right">
            <div className="toggle-wrapper">
              <IconButton
                Icon={HubIcon}
                active={activeRight === "graph"}
                onClick={() => setActiveRight("graph")}
              />
              <TableIconButton
                Icon={TableRowsIcon}
                active={activeRight === "table"}
                onClick={() => setActiveRight("table")}
              />
            </div>

            <ExportButton
              data={rightTableData}
              fileName="issue-category.xls"
            />


          </div>
        </div>
        {activeRight === "graph" ? (
          <div className="graph-container">
            <CommonBarGraph data={rejectionData} />
          </div>
        ) : (
          <div className="table-container">
            <CommonTable
              data={rightTableData}
              columns={rightColumns}
            />
          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;
