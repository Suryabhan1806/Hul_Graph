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
import {
  rootCauseData,
  rejectionData,
  zoneChartData,
} from "../data/dashboardData";
import CommonZoneLineBarChart from "../components/CommonZoneLineBarChart";
import CommonZoneTable from "../components/CommonZoneTable";

const Dashboard = () => {
  const [activeLeft, setActiveLeft] = useState("graph");
  const [activeRight, setActiveRight] = useState("graph");
  const [activeZone, setActiveZone] = useState("graph");

  // Table column headers
  const zoneColumns = zoneChartData.map((item) => item.week);

  // // Table data (Graph data -> Table format)
  // const zoneTableData = [
  //   {
  //     label: "Acceptance %",
  //     values: zoneChartData.map((item) => item.acceptance + "%"),
  //     zones: zoneChartData.map((item) => item.zone),
  //   },
  //   {
  //     label: "Adoption %",
  //     values: zoneChartData.map((item) => item.adoption + "%"),
  //     zones: zoneChartData.map((item) => item.zone),
  //   },
  //   {
  //     label: "Bar Value",
  //     values: zoneChartData.map((item) => item.bar),
  //     zones: zoneChartData.map((item) => item.zone),
  //   },
  // ];
  const maxBar = Math.max(...zoneChartData.map((item) => item.bar));

  const zoneTableData = [
    {
      label: "Acceptance",
      values: zoneChartData.map((item) => item.acceptance + "%"),
      zones: zoneChartData.map((item) => item.zone),
    },
    {
      label: "Adoption",
      values: zoneChartData.map((item) => item.adoption + "%"),
      zones: zoneChartData.map((item) => item.zone),
    },
    {
      label: "Accepted %",
      values: zoneChartData.map(
        (item) => Math.round((item.bar / maxBar) * 100) + "%",
      ),
      zones: zoneChartData.map((item) => item.zone),
    },
    {
      label: "Accepted value",
      values: zoneChartData.map((item) => item.bar),
      zones: zoneChartData.map((item) => item.zone),
    },
  ];

  const zoneExportData = zoneChartData.map((item) => ({
    Week: item.week,
    Acceptance: item.acceptance + "%",
    Adoption: item.adoption + "%",
    Bar: item.bar,
    Zone: item.zone,
  }));

  const totalLeft = rootCauseData.reduce((sum, item) => sum + item.value, 0);

  const leftTableData = rootCauseData.map((item) => ({
    ...item,
    percentage: ((item.value / totalLeft) * 100).toFixed(1) + "%",
  }));

  const leftColumns = [
    { header: "Root Causes Split", accessor: "name" },
    { header: "Value", accessor: "value", align: "center" },
    { header: "Percentage %", accessor: "percentage", align: "center" },
  ];

  const totalRight = rejectionData.reduce((sum, item) => sum + item.value, 0);

  const rightTableData = rejectionData.map((item) => ({
    ...item,
    percentage: ((item.value / totalRight) * 100).toFixed(1) + "%",
  }));

  const rightColumns = [
    { header: "Top Rejection Reasons", accessor: "name" },
    { header: "Value", accessor: "value", align: "center" },
    { header: "Percentage %", accessor: "percentage", align: "center" },
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

            <ExportButton data={leftTableData} fileName="root-causes.xls" />
          </div>
        </div>

        {activeLeft === "graph" ? (
          <div className="graph-container">
            <CommonSemiDonutChart data={rootCauseData} />
          </div>
        ) : (
          <div className="table-container">
            <CommonTable data={leftTableData} columns={leftColumns} />
          </div>
        )}
      </div>

      {/* ================= RIGHT CARD ================= */}
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <div className="header-left">
            <h2 className="dashboard-title">Top Rejection Reasons</h2>
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

            <ExportButton data={rightTableData} fileName="issue-category.xls" />
          </div>
        </div>
        {activeRight === "graph" ? (
          <div className="graph-container">
            <CommonBarGraph data={rejectionData} />
          </div>
        ) : (
          <div className="table-container">
            <CommonTable data={rightTableData} columns={rightColumns} />
          </div>
        )}
      </div>

      {/* ================= BOTTOM FULL WIDTH ZONE CHART ================= */}

      <div className="dashboard-wrapper full-width-card">
        <div className="dashboard-header">
          <div className="header-left">
            <h2 className="dashboard-title">
              Weekly Acceptance & Adoption Trend
            </h2>
          </div>

          <div className="header-right">
            <div className="toggle-wrapper">
              <IconButton
                Icon={HubIcon}
                active={activeZone === "graph"}
                onClick={() => setActiveZone("graph")}
              />
              <TableIconButton
                Icon={TableRowsIcon}
                active={activeZone === "table"}
                onClick={() => setActiveZone("table")}
              />
            </div>

            <ExportButton
              data={zoneExportData}
              fileName="weekly-acceptance-adoption.xls"
            />
          </div>
        </div>

        {activeZone === "graph" ? (
          <div className="graph-container">
            <CommonZoneLineBarChart data={zoneChartData} />
          </div>
        ) : (
          <div className="table-container">
            <CommonZoneTable data={zoneTableData} columns={zoneColumns} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
