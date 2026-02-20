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
  stackedData,
  weeklyZoneChartData,
  monthlyZoneChartData,
} from "../data/dashboardData";
import CommonZoneLineBarChart from "../components/CommonZoneLineBarChart";
import CommonZoneTable from "../components/CommonZoneTable";
import CommonStackedScrollableChart from "../components/CommonStackedScrollableChart";
import CommonToggleButton from "../components/CommonToggleButton";
import MaiBarChart from "../components/MaiBarChart";
import { maiData } from "../data/dashboardData";

const Dashboard = () => {
  const [activeLeft, setActiveLeft] = useState("graph");
  const [activeRight, setActiveRight] = useState("graph");
  const [activeZone, setActiveZone] = useState("graph");
  const [activeAccepted, setActiveAccepted] = useState("graph");
  const [trendType, setTrendType] = useState("Weekly");
  const [activeMai, setActiveMai] = useState("graph");

  const zoneData =
    trendType === "Weekly" ? weeklyZoneChartData : monthlyZoneChartData;

  // 🔥 Columns
  const zoneColumns = zoneData.map((item) => item.week);

  // 🔥 Max Bar
  const maxBar = Math.max(...zoneData.map((item) => item.bar));

  // 🔥 Table Data
  const zoneTableData = [
    {
      label: "Acceptance",
      values: zoneData.map((item) => item.acceptance + "%"),
      zones: zoneData.map((item) => item.zone),
    },
    {
      label: "Adoption",
      values: zoneData.map((item) => item.adoption + "%"),
      zones: zoneData.map((item) => item.zone),
    },
    {
      label: "Accepted %",
      values: zoneData.map(
        (item) => Math.round((item.bar / maxBar) * 100) + "%",
      ),
      zones: zoneData.map((item) => item.zone),
    },
    {
      label: "Accepted value",
      values: zoneData.map((item) => item.bar),
      zones: zoneData.map((item) => item.zone),
    },
  ];

  // 🔥 Export Data
  const zoneExportData = zoneData.map((item) => ({
    Period: item.week,
    Acceptance: item.acceptance + "%",
    Adoption: item.adoption + "%",
    "Accepted %": Math.round((item.bar / maxBar) * 100) + "%",
    "Accepted value": item.bar,
  }));

  const acceptedPercentageData = stackedData.map((item) => {
    const total =
      item.IUT + item.PRPO + item.AltVendor + item.Expedited + item.Other;

    return {
      week: item.week,
      IUT: ((item.IUT / total) * 100).toFixed(1) + "%",
      PRPO: ((item.PRPO / total) * 100).toFixed(1) + "%",
      AltVendor: ((item.AltVendor / total) * 100).toFixed(1) + "%",
      Expedited: ((item.Expedited / total) * 100).toFixed(1) + "%",
      Other: ((item.Other / total) * 100).toFixed(1) + "%",
    };
  });

  const acceptedColumns = [
    { header: "Week", accessor: "week" },
    { header: "IUT ", accessor: "IUT", align: "center" },
    { header: "PRPO ", accessor: "PRPO", align: "center" },
    { header: "Alt Vendor ", accessor: "AltVendor", align: "center" },
    { header: "Expedited ", accessor: "Expedited", align: "center" },
    { header: "Other ", accessor: "Other", align: "center" },
  ];

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
        <div className="trend-top-header">
          <div className="trend-left">
            <h2 className="trend-main-title">Trend Monitoring</h2>
          </div>

          <div className="trend-right">
            <CommonToggleButton
              options={["Weekly", "Monthly"]}
              value={trendType}
              onChange={setTrendType}
            />
          </div>
        </div>

        <div className="dashboard-header">
          <div className="header-left">
            <h2 className="dashboard-title">{trendType} Trend</h2>
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
            <CommonZoneLineBarChart data={zoneData} />
            {/* data={zoneChartData} */}
          </div>
        ) : (
          <div className="table-container">
            <CommonZoneTable data={zoneTableData} columns={zoneColumns} />
          </div>
        )}
      </div>

      {/* ================= 4TH ROW HALF GRAPH ================= */}
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <div className="header-left">
            <h2 className="dashboard-title">Accepted Recommendation Trend</h2>
          </div>

          <div className="header-right">
            <div className="toggle-wrapper">
              <IconButton
                Icon={HubIcon}
                active={activeAccepted === "graph"}
                onClick={() => setActiveAccepted("graph")}
              />
              <TableIconButton
                Icon={TableRowsIcon}
                active={activeAccepted === "table"}
                onClick={() => setActiveAccepted("table")}
              />
            </div>

            <ExportButton
              data={acceptedPercentageData}
              fileName="accepted-recommendation-trend.xls"
            />
          </div>
        </div>

        {activeAccepted === "graph" ? (
          <div className="graph-container">
            <CommonStackedScrollableChart
              data={stackedData}
              xKey="week"
              stackBars={[
                { dataKey: "IUT", color: "#4f6f8f" },
                { dataKey: "PRPO", color: "#8c7b8b" },
                { dataKey: "AltVendor", color: "#5f8f5f" },
                { dataKey: "Expedited_Expedited_Expedited", color: "#6c6c91" },
                { dataKey: "Other", color: "#1f4e79" },
              ]}
            />
          </div>
        ) : (
          <div className="table-container">
            <CommonTable
              data={acceptedPercentageData}
              columns={acceptedColumns}
            />
          </div>
        )}
      </div>
      {/* ================= MAI CARD ================= */}
      {/* ================= MAI CARD ================= */}
      <div className="dashboard-wrapper new-row-card">
        <div className="dashboard-header">
          <div className="header-left">
            <h2 className="dashboard-title">MAI %</h2>
          </div>

          <div className="header-right">
            <div className="toggle-wrapper">
              <IconButton
                Icon={HubIcon}
                active={activeMai === "graph"}
                onClick={() => setActiveMai("graph")}
              />
              <TableIconButton
                Icon={TableRowsIcon}
                active={activeMai === "table"}
                onClick={() => setActiveMai("table")}
              />
            </div>

            <ExportButton data={maiData} fileName="mai-trend.xls" />
          </div>
        </div>

        {activeMai === "graph" ? (
          <div className="graph-container">
            <MaiBarChart data={maiData} />
          </div>
        ) : (
          <div className="table-container">
            <CommonTable
              data={maiData}
              columns={[
                { header: "Week", accessor: "week" },
                { header: "Start %", accessor: "start", align: "center" },
                { header: "End %", accessor: "end", align: "center" },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
