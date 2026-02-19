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
  acceptedRecommendationTrend,
  rootCauseTrendData,
   weeklyZoneChartData,
  monthlyZoneChartData,
  FGCoverageData,
  maiData
} from "../data/dashboardData";
import CommonZoneLineBarChart from "../components/CommonZoneLineBarChart";
import CommonZoneTable from "../components/CommonZoneTable";
import CommonStackedScrollableChart from "../components/CommonStackedScrollableChart";
import CommonToggleButton from "../components/CommonToggleButton";
import CommonGroupedScrollableChart from "../components/CommonGroupedScrollableChart";


const Dashboard = () => {
  const [activeLeft, setActiveLeft] = useState("graph");
  const [activeRight, setActiveRight] = useState("graph");
  const [activeZone, setActiveZone] = useState("graph");
  const [trendType, setTrendType] = useState("Weekly");
  const [activeMaiCoverage, setActiveMaiCoverage] = useState("graph");
  const [activeStartEnd, setActiveStartEnd] = useState("graph");
  const [activeRootCauseTrend, setActiveRootCauseTrend] = useState("graph");
const [activeAcceptedTrend, setActiveAcceptedTrend] = useState("graph");




const zoneData =
  trendType === "Weekly"
    ? weeklyZoneChartData
    : monthlyZoneChartData;

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
      (item) => Math.round((item.bar / maxBar) * 100) + "%"
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


const acceptedPercentageData = acceptedRecommendationTrend.map((item) => {
  const total =
    item.IUT +
    item.PRPO +
    item.AltVendor +
    item.Expedited +
    item.Other;

  return {
    week: item.week,
    IUT: ((item.IUT / total) * 100).toFixed(1) + "%",
    PRPO: ((item.PRPO / total) * 100).toFixed(1) + "%",
    AltVendor: ((item.AltVendor / total) * 100).toFixed(1) + "%",
    Expedited: ((item.Expedited / total) * 100).toFixed(1) + "%",
    Other: ((item.Other / total) * 100).toFixed(1) + "%",
  };
});

const rootCauseTrendPercentageData = rootCauseTrendData.map((item) => {
  const total =
    item.PlanVariation +
    item.PRtoPOConversion +
    item.SupplierTransitDelay +
    item.QualityIssues +
    item.Others;

  return {
    week: item.week,
    PlanVariation: ((item.PlanVariation / total) * 100).toFixed(1) + "%",
    PRtoPOConversion: ((item.PRtoPOConversion / total) * 100).toFixed(1) + "%",
    SupplierTransitDelay:
      ((item.SupplierTransitDelay / total) * 100).toFixed(1) + "%",
    QualityIssues: ((item.QualityIssues / total) * 100).toFixed(1) + "%",
    Others: ((item.Others / total) * 100).toFixed(1) + "%",
  };
});


   const rightColumns = [
    { header: "Top Rejection Reasons", accessor: "name" },
    { header: "Value", accessor: "value", align: "center" },
    { header: "Percentage %", accessor: "percentage", align: "center" },
  ];

  const leftColumns = [
    { header: "Root Causes Split", accessor: "name" },
    { header: "Value", accessor: "value", align: "center" },
    { header: "Percentage %", accessor: "percentage", align: "center" },
  ];

const acceptedColumns = [
  { header: "Week", accessor: "week" },
  { header: "IUT ", accessor: "IUT", align: "center" },
  { header: "PRPO ", accessor: "PRPO", align: "center" },
  { header: "Alt Vendor ", accessor: "AltVendor", align: "center" },
  { header: "Expedited ", accessor: "Expedited", align: "center" },
  { header: "Other ", accessor: "Other", align: "center" },
];

const rootCauseTrendColumns = [
  { header: "Week", accessor: "week" },
  { header: "Plan Variation", accessor: "PlanVariation", align: "center" },
  { header: "PR to PO Conversion", accessor: "PRtoPOConversion", align: "center" },
  { header: "Supplier & Transit Delay", accessor: "SupplierTransitDelay", align: "center" },
  { header: "Quality Issues", accessor: "QualityIssues", align: "center" },
  { header: "Others", accessor: "Others", align: "center" },
];


const startEndColumns = [
  { header: "Weeks", accessor: "week" },
  { header: "Start of Week", accessor: "start", align: "center" },
  { header: "End of Week", accessor: "end", align: "center" },
];

const maiColumns = [
  { header: "Weeks", accessor: "week" },
  { header: "Start of Week", accessor: "start", align: "center" },
  { header: "End of Week", accessor: "end", align: "center" },
];


const startEndExportData = FGCoverageData.map((item) => ({
  Week: item.week,
  "Start of Week": item.start + "%",
  "End of Week": item.end + "%",
}));

const maiExportData = maiData.map((item) => ({
  Week: item.week,
  "Start of Week": item.start + "%",
  "End of Week": item.end + "%",
}));


  const totalLeft = rootCauseData.reduce((sum, item) => sum + item.value, 0);

  const leftTableData = rootCauseData.map((item) => ({
    ...item,
    percentage: ((item.value / totalLeft) * 100).toFixed(1) + "%",
  }));

  const totalRight = rejectionData.reduce((sum, item) => sum + item.value, 0);

  const rightTableData = rejectionData.map((item) => ({
    ...item,
    percentage: ((item.value / totalRight) * 100).toFixed(1) + "%",
  }));


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
            <h2 className="dashboard-title">
              {trendType} Trend
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
      <h2 className="dashboard-title">
        MAI %
      </h2>
    </div>

    <div className="header-right">
      <div className="toggle-wrapper">
        <IconButton
          Icon={HubIcon}
          active={activeMaiCoverage === "graph"}
          onClick={() => setActiveMaiCoverage("graph")}
        />
        <TableIconButton
          Icon={TableRowsIcon}
          active={activeMaiCoverage === "table"}
          onClick={() => setActiveMaiCoverage("table")}
        />
      </div>

      <ExportButton
        data={maiExportData}
        fileName="mai-coverage-trend.xls"
      />
    </div>
  </div>

  {activeMaiCoverage === "graph" ? (
    <div className="graph-container">
      <CommonGroupedScrollableChart
        data={maiData}
        xKey="week"
        bars={[
          { dataKey: "start", color: "Lightblue", label: "Start of Week" },
          { dataKey: "end", color: "#155E63", label: "End of Week" },
        ]}
      />
    </div>
  ) : (
    <div className="table-container">
      <CommonTable
        data={maiData}
        columns={maiColumns}
      />
    </div>
  )}
</div>


      <div className="dashboard-wrapper">
  <div className="dashboard-header">
    <div className="header-left">
      <h2 className="dashboard-title">
        FG Coverage
      </h2>
    </div>

    <div className="header-right">
      <div className="toggle-wrapper">
        <IconButton
          Icon={HubIcon}
          active={activeStartEnd === "graph"}
          onClick={() => setActiveStartEnd("graph")}
        />
        <TableIconButton
          Icon={TableRowsIcon}
          active={activeStartEnd === "table"}
          onClick={() => setActiveStartEnd("table")}
        />
      </div>

      <ExportButton
        data={startEndExportData}
        fileName="start-end-week-trend.xls"
      />
    </div>
  </div>

  {activeStartEnd === "graph" ? (
    <div className="graph-container">
      <CommonGroupedScrollableChart
        data={FGCoverageData}
        xKey="week"
        bars={[
          { dataKey: "start", color: "#B9B3D9", label: "Start of Week" },
          { dataKey: "end", color: "#5A4CA8", label: "End of Week" },
        ]}
      />
    </div>
  ) : (
    <div className="table-container">
      <CommonTable
  columns={startEndColumns}
/>

    </div>
  )}
</div>


 {/* <div className="force-new-row" /> */}

{/* ================= 5TH ROW HALF GRAPH ================= */}

<div className="dashboard-wrapper">
  <div className="dashboard-header">
    <div className="header-left">
      <h2 className="dashboard-title">Root causes trend</h2>
    </div>

    <div className="header-right">
      <div className="toggle-wrapper">
        <IconButton
          Icon={HubIcon}
          active={activeRootCauseTrend === "graph"}
          onClick={() => setActiveRootCauseTrend("graph")}
        />
        <TableIconButton
          Icon={TableRowsIcon}
          active={activeRootCauseTrend === "table"}
          onClick={() => setActiveRootCauseTrend("table")}
        />
      </div>

      <ExportButton
        data={rootCauseTrendPercentageData}
        fileName="root-cause-trend.xls"
      />
    </div>
  </div>

  {activeRootCauseTrend === "graph" ? (
    <div className="graph-container">
      <CommonStackedScrollableChart
        data={rootCauseTrendData}
        xKey="week"
        stackBars={[
          { dataKey: "PlanVariation", color: "#627FA1" },
          { dataKey: "PRtoPOConversion", color: "#9B8FBC" },
          { dataKey: "SupplierTransitDelay", color: "#C98FA7" },
          { dataKey: "QualityIssues", color: "#8FBF7A" },
          { dataKey: "Others", color: "#274C8E" },
        ]}
      />
    </div>
  ) : (
    <div className="table-container">
      <CommonTable
        data={rootCauseTrendPercentageData}
        columns={rootCauseTrendColumns}
      />
    </div>
  )}
</div>

<div className="dashboard-wrapper">
  <div className="dashboard-header">
    <div className="header-left">
      <h2 className="dashboard-title">Accepted Recommendation Trend</h2>
    </div>

    <div className="header-right">
      <div className="toggle-wrapper">
        <IconButton
          Icon={HubIcon}
          active={activeAcceptedTrend === "graph"}
          onClick={() => setActiveAcceptedTrend("graph")}
        />
        <TableIconButton
          Icon={TableRowsIcon}
          active={activeAcceptedTrend === "table"}
          onClick={() => setActiveAcceptedTrend("table")}
        />
      </div>

      <ExportButton
        data={acceptedPercentageData}
        fileName="accepted-recommendation-trend.xls"
      />
    </div>
  </div>

  {activeAcceptedTrend === "graph" ? (
    <div className="graph-container">
      <CommonStackedScrollableChart
        data={acceptedRecommendationTrend}
        xKey="week"
        stackBars={[
          { dataKey: "IUT", color: "#627FA1" },
          { dataKey: "PRPO", color: "#9B8FBC" },
          { dataKey: "AltVendor", color: "#C98FA7" },
          { dataKey: "Expedited_Expedited_Expedited", color: "#8FBF7A" },
          { dataKey: "Other", color: "#274C8E" },
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


    </div>
  );
};

export default Dashboard;
