import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  DotsThreeCircleIcon,
  ArrowCounterClockwiseIcon,
  FileXlsIcon,
  FunnelIcon,
  GraphIcon,
  TableIcon,
  ArrowsOutSimpleIcon,
  ArrowsInSimpleIcon,
} from "@phosphor-icons/react";
import MetricCard from "../components/MetricCard";
import FilterSelect from "../components/FilterSelect";
import PerformanceFilterBar from "../components/PerformanceFilterBar";
import ExportButton from "../components/ExportButton";
import CommonSemiDonutChart from "../components/CommonSemiDonutChart";
import CommonTable from "../components/CommonTable";
import CommonBarGraph from "../components/CommonBarGraph";
import {
  acceptedRecommendationTrend,
  FGCoverageData,
  maiData,
  monthlyZoneChartData,
  rejectionData,
  rootCauseData,
  rootCauseTrendData,
  weeklyZoneChartData,
} from "../data/dashboardData";
import CommonStackedScrollableChart from "../components/CommonStackedScrollableChart";
import CommonGroupedScrollableChart from "../components/CommonGroupedScrollableChart";
import CommonZoneLineBarChart from "../components/CommonZoneLineBarChart";
import CommonZoneTable from "../components/CommonZoneTable";
import CommonToggleButton from "../components/RMPMToggleButton";
import "./dashboard.css";
import Grid from "@mui/material/Grid2";
import RMPMToggleButton from "../components/RMPMToggleButton";
import CommonDialog from "../components/CommonDialog";
import CommonExpandButton from "../components/CommonExpandButton";
import OpenWithIcon from "@mui/icons-material/OpenWith";

const RMPMSummary = () => {
  // Static Data for Cards
  const metrics = [
    {
      title: "Adoption %",
      value: 56,
      delta: -10,
      infoText: "Adoption Percentage details",
    },
    {
      title: "Acceptance %",
      value: 20,
      delta: 10,
      infoText: "Acceptance Percentage details",
    },
    {
      title: "MAI %",
      value: 25,
      delta: 10,
      infoText: "MAI Percentage details",
    },
    {
      title: "FG Coverage %",
      value: 12,
      delta: 23,
      infoText: "FG Coverage Percentage details",
    },
  ];

  // Filter States
  const [filters, setFilters] = React.useState({
    bg: "",
    siteCluster: "",
    siteCode: "",
  });

  // Performance Analysis section filters (apply to the 4 graphs)
  const [performanceFilters, setPerformanceFilters] = React.useState({
    year: "",
    month: "",
    week: "",
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleFilterChange = (label, value) => {
    const key =
      label === "BG"
        ? "bg"
        : label === "Site cluster"
          ? "siteCluster"
          : "siteCode";
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handlePerformanceFilterChange = (label, value) => {
    const key =
      label === "Year" ? "year" : label === "Month" ? "month" : "week";
    setPerformanceFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      bg: "",
      siteCluster: "",
      siteCode: "",
    });
  };

  // Options for Performance Analysis filters
  const yearOptions = ["2024", "2025"];
  const monthOptions = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weekOptions = ["W1", "W2", "W3", "W4", "W5"];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Mock Options
  const bgOptions = [
    "Beauty & Wellbeing",
    "Personal Care",
    "Home Care",
    "Nutrition",
    "Ice Cream",
  ];
  const clusterOptions = ["North", "South", "East", "West"];
  const siteOptions = ["Site 1", "Site 2", "Site 3"];

  //Merged Code Starts

  const [activeLeft, setActiveLeft] = useState("graph");
  const [activeRight, setActiveRight] = useState("graph");
  const [activeZone, setActiveZone] = useState("graph");
  const [trendType, setTrendType] = useState("Weekly");
  const [activeMaiCoverage, setActiveMaiCoverage] = useState("graph");
  const [activeStartEnd, setActiveStartEnd] = useState("graph");
  const [activeRootCauseTrend, setActiveRootCauseTrend] = useState("graph");
  const [activeAcceptedTrend, setActiveAcceptedTrend] = useState("graph");


  const [openRootCauseDialog, setOpenRootCauseDialog] = useState(false);
  const [openFGDialog, setOpenFGDialog] = useState(false);
  const [openMaiDialog, setOpenMaiDialog] = useState(false);
  const [openAcceptedDialog, setOpenAcceptedDialog] = useState(false);
  const [expandValue, setExpandValue] = useState("");

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

  const acceptedPercentageData = acceptedRecommendationTrend.map((item) => {
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
      PRtoPOConversion:
        ((item.PRtoPOConversion / total) * 100).toFixed(1) + "%",
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
    {
      header: "PR to PO Conversion",
      accessor: "PRtoPOConversion",
      align: "center",
    },
    {
      header: "Supplier & Transit Delay",
      accessor: "SupplierTransitDelay",
      align: "center",
    },
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

  //Merged Code Ends

  return (
    <Box
      sx={{
        backgroundColor: "#E8EEF2",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        overflowY: "auto",
        height: "90vh",
      }}
    >
      {/* Metric Cards Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "16px 24px 0px 24px",
          gap: "20px",
        }}
      >
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            delta={metric.delta}
            infoText={metric.infoText}
          />
        ))}
      </Box>

      {/* Filters Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: "20px",
          padding: "0px 24px",
        }}
      >
        <Box sx={{ minWidth: "320px" }}>
          <FilterSelect
            label="BG"
            options={bgOptions}
            value={filters.bg}
            onChange={handleFilterChange}
          />
        </Box>
        <Box sx={{ minWidth: "320px" }}>
          <FilterSelect
            label="Site cluster"
            options={clusterOptions}
            value={filters.siteCluster}
            onChange={handleFilterChange}
          />
        </Box>
        <Box sx={{ minWidth: "320px" }}>
          <FilterSelect
            label="Site code"
            options={siteOptions}
            value={filters.siteCode}
            onChange={handleFilterChange}
          />
        </Box>

        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <IconButton
            onClick={handleReset}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #D9E1E7",
              padding: "8px",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <ArrowCounterClockwiseIcon size={20} color="#4D5F6E" />
          </IconButton>

          <IconButton
            onClick={handleClick}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #D9E1E7",
              padding: "8px",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <DotsThreeCircleIcon size={20} color="#4D5F6E" />
          </IconButton>

          <Button
            variant="contained"
            startIcon={<FileXlsIcon size={20} color="#2B911C" />}
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#1A2025",
              textTransform: "none",
              fontWeight: 400,
              boxShadow: "none",
              border: "1px solid #D9E1E7",
              borderRadius: "8px",
              padding: "8px 14px",
            }}
          >
            Export
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <FunnelIcon sx={{ marginRight: "10px", color: "#5d6773" }} />
              <Typography variant="body2">More Filters</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Performance Analysis Section */}
      <Box
        sx={{
          backgroundColor: "#F1F5F7",
          borderRadius: "8px",
          padding: "16px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: 20,
              fontWeight: 500,
              color: "#1A2025",
            }}
          >
            Performance Analysis
          </Typography>
          <PerformanceFilterBar
            filters={[
              {
                label: "Year",
                options: yearOptions,
                value: performanceFilters.year,
                onChange: handlePerformanceFilterChange,
              },
              {
                label: "Month",
                options: monthOptions,
                value: performanceFilters.month,
                onChange: handlePerformanceFilterChange,
              },
              {
                label: "Week",
                options: weekOptions,
                value: performanceFilters.week,
                onChange: handlePerformanceFilterChange,
              },
            ]}
          />
        </Box>
        {/* Placeholder for 4 graphs - graph containers use white bg */}
        <Box
          sx={{
            minHeight: 400,
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
            height: "400px", // Just added to ensure the box is visible, can be removed when actual graphs are added
          }}
        ></Box>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12, md: 4 }} className="rmpm-card"></Grid>
          <Grid item size={{ xs: 12, md: 4 }} className="rmpm-card">
            <Box className="rmpm-card-header">
              <Typography variant="h6">Root Causes Split</Typography>

              <Box className="rmpm-card-header-actions">
                <RMPMToggleButton
                  options={[
                    { icon: <GraphIcon />, value: "graph" },
                    { icon: <TableIcon />, value: "table" },
                  ]}
                  value={activeLeft}
                  onChange={setActiveLeft}
                />

                <ExportButton data={leftTableData} fileName="root-causes.xls" />
              </Box>
            </Box>

            {activeLeft === "graph" ? (
              <Box className="rmpm-graph-container">
                <CommonSemiDonutChart data={rootCauseData} />
              </Box>
            ) : (
              <Box className="rmpm-table-container">
                <CommonTable data={leftTableData} columns={leftColumns} />
              </Box>
            )}
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }} className="rmpm-card">
            <Box className="rmpm-card-header">
              <Typography variant="h6">Top Rejection Reasons</Typography>

              <Box className="rmpm-card-header-actions">
                <RMPMToggleButton
                  options={[
                    { icon: <GraphIcon />, value: "graph" },
                    { icon: <TableIcon />, value: "table" },
                  ]}
                  value={activeRight}
                  onChange={setActiveRight}
                />
                <ExportButton
                  data={rightTableData}
                  fileName="issue-category.xls"
                />
              </Box>
            </Box>
            {activeRight === "graph" ? (
              <div className="rmpm-graph-container">
                <CommonBarGraph data={rejectionData} />
              </div>
            ) : (
              <div className="rmpm-table-container">
                <CommonTable data={rightTableData} columns={rightColumns} />
              </div>
            )}
          </Grid>
        </Grid>
        {/* Merged Code Ends */}
      </Box>
      {/* Additional sections with similar structure can be added here */}
      <Box
        sx={{
          backgroundColor: "#F1F5F7",
          borderRadius: "8px",
          padding: "16px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: 20,
              fontWeight: 500,
              color: "#1A2025",
            }}
          >
            Trend Monitoring
          </Typography>
          <Box className="rmpm-card-header-actions">
            <RMPMToggleButton
              options={[
                { title: "Weekly", value: "Weekly" },
                { title: "Monthly", value: "Monthly" },
              ]}
              value={trendType}
              onChange={setTrendType}
            />
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12 }} className="rmpm-card">
            <Box className="rmpm-card-header">
              <Typography variant="h6">{trendType} Trend</Typography>

              <Box className="rmpm-card-header-actions">
                <RMPMToggleButton
                  options={[
                    { icon: <GraphIcon />, value: "graph" },
                    { icon: <TableIcon />, value: "table" },
                  ]}
                  value={activeZone}
                  onChange={setActiveZone}
                />
                <ExportButton
                  data={zoneExportData}
                  fileName="weekly-acceptance-adoption.xls"
                />
              </Box>
            </Box>

            {activeZone === "graph" ? (
              <div className="rmpm-graph-container">
                <CommonZoneLineBarChart data={zoneData} />
                {/* data={zoneChartData} */}
              </div>
            ) : (
              <div className="rmpm-table-container">
                <CommonZoneTable data={zoneTableData} columns={zoneColumns} />
              </div>
            )}
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }} className="rmpm-card">
            <Box className="rmpm-card-header">
              <Typography variant="h6">MAI %</Typography>
              <div className="rmpm-card-header-actions">
                <RMPMToggleButton
                  options={[
                    { icon: <GraphIcon />, value: "graph" },
                    { icon: <TableIcon />, value: "table" },
                  ]}
                  value={activeMaiCoverage}
                  onChange={setActiveMaiCoverage}
                />
                <ExportButton
                  data={maiExportData}
                  fileName="mai-coverage-trend.xls"
                />

                <RMPMToggleButton
                  options={[{ icon: <ArrowsOutSimpleIcon />, value: "expand" }]}
                  value=""
                  onChange={() => setOpenMaiDialog(true)}
                  whiteBg
                />
              </div>
            </Box>

            {activeMaiCoverage === "graph" ? (
              <div className="rmpm-graph-container">
                <CommonGroupedScrollableChart
                  data={maiData}
                  xKey="week"
                  bars={[
                    {
                      dataKey: "start",
                      color: "Lightblue",
                      label: "Start of Week",
                    },
                    { dataKey: "end", color: "#155E63", label: "End of Week" },
                  ]}
                />
              </div>
            ) : (
              <div className="rmpm-table-container">
                <CommonTable data={maiData} columns={maiColumns} />
              </div>
            )}
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }} className="rmpm-card">
            <Box className="rmpm-card-header">
              <Typography variant="h6">FG Coverage</Typography>
              <div className="rmpm-card-header-actions">
                <RMPMToggleButton
                  options={[
                    { icon: <GraphIcon />, value: "graph" },
                    { icon: <TableIcon />, value: "table" },
                  ]}
                  value={activeStartEnd}
                  onChange={setActiveStartEnd}
                />

                <ExportButton
                  data={startEndExportData}
                  fileName="start-end-week-trend.xls"
                />

                <RMPMToggleButton
                  options={[{ icon: <ArrowsOutSimpleIcon />, value: "expand" }]}
                  value=""
                  onChange={() => setOpenFGDialog(true)}
                  whiteBg
                />
              </div>
            </Box>

            {activeStartEnd === "graph" ? (
              <div className="rmpm-graph-container">
                <CommonGroupedScrollableChart
                  data={FGCoverageData}
                  xKey="week"
                  bars={[
                    {
                      dataKey: "start",
                      color: "#B9B3D9",
                      label: "Start of Week",
                    },
                    { dataKey: "end", color: "#5A4CA8", label: "End of Week" },
                  ]}
                />
              </div>
            ) : (
              <div className="rmpm-table-container">
                <CommonTable
                  data={FGCoverageData}
                  columns={startEndColumns}
                />
              </div>
            )}
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }} className="rmpm-card">
            <Box className="rmpm-card-header">
              <Typography variant="h6">Root causes trend</Typography>
              <Box className="rmpm-card-header-actions">
                <RMPMToggleButton
                  options={[
                    { icon: <GraphIcon />, value: "graph" },
                    { icon: <TableIcon />, value: "table" },
                  ]}
                  value={activeRootCauseTrend}
                  onChange={setActiveRootCauseTrend}
                />

                <ExportButton
                  data={rootCauseTrendPercentageData}
                  fileName="root-cause-trend.xls"
                />

                <RMPMToggleButton
                  options={[{ icon: <ArrowsOutSimpleIcon />, value: "expand" }]}
                  value=""
                  onChange={() => setOpenRootCauseDialog(true)}
                  whiteBg
                />
              </Box>
            </Box>

            {activeRootCauseTrend === "graph" ? (
              <div className="rmpm-graph-container">
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
              <div className="rmpm-table-container">
                <CommonTable
                  data={rootCauseTrendPercentageData}
                  columns={rootCauseTrendColumns}
                />
              </div>
            )}
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }} className="rmpm-card">
            <Box className="rmpm-card-header">
              <Typography variant="h6">
                Accepted Recommendation Trend
              </Typography>
              <div className="rmpm-card-header-actions">
                <RMPMToggleButton
                  options={[
                    { icon: <GraphIcon />, value: "graph" },
                    { icon: <TableIcon />, value: "table" },
                  ]}
                  value={activeAcceptedTrend}
                  onChange={setActiveAcceptedTrend}
                />

                <ExportButton
                  data={acceptedPercentageData}
                  fileName="accepted-recommendation-trend.xls"
                />
                {/* <RMPMToggleButton
                  options={[
                    { icon: <ArrowsOutSimpleIcon />, value: "expand" },
                  ]}
                  value=""
                  onChange={() => setOpenAcceptedDialog(true)}
                  whiteBg 
                /> */}
                <CommonExpandButton
                  Icon={OpenWithIcon}
                  onClick={() => setOpenAcceptedDialog(true)}
                  tooltip="Expand"
                />

              </div>
            </Box>

            {activeAcceptedTrend === "graph" ? (
              <div className="rmpm-graph-container">
                <CommonStackedScrollableChart
                  data={acceptedRecommendationTrend}
                  xKey="week"
                  stackBars={[
                    { dataKey: "IUT", color: "#627FA1" },
                    { dataKey: "PRPO", color: "#9B8FBC" },
                    { dataKey: "AltVendor", color: "#C98FA7" },
                    {
                      dataKey: "Expedited_Expedited_Expedited",
                      color: "#8FBF7A",
                    },
                    { dataKey: "Other", color: "#274C8E" },
                  ]}
                />
              </div>
            ) : (
              <div className="rmpm-table-container">
                <CommonTable
                  data={acceptedPercentageData}
                  columns={acceptedColumns}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* MAI % dialog box.  */}
      <CommonDialog
        open={openMaiDialog}
        onClose={() => setOpenMaiDialog(false)}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">MAI %</Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <RMPMToggleButton
                options={[
                  { icon: <GraphIcon />, value: "graph" },
                  { icon: <TableIcon />, value: "table" },
                ]}
                value={activeMaiCoverage}
                onChange={setActiveMaiCoverage}
              />

              <ExportButton
                data={maiExportData}
                fileName="mai-coverage-trend.xls"
              />
            </Box>
          </Box>

          {activeMaiCoverage === "graph" ? (
            <CommonGroupedScrollableChart
              data={maiData}
              xKey="week"
              bars={[
                { dataKey: "start", color: "Lightblue", label: "Start of Week" },
                { dataKey: "end", color: "#155E63", label: "End of Week" },
              ]}
            />
          ) : (
            <CommonTable
              data={maiData}
              columns={maiColumns}
            />
          )}
        </Box>
      </CommonDialog>

      {/* FG coverage dialog box */}
      <CommonDialog
        open={openFGDialog}
        onClose={() => setOpenFGDialog(false)}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">FG Coverage</Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <RMPMToggleButton
                options={[
                  { icon: <GraphIcon />, value: "graph" },
                  { icon: <TableIcon />, value: "table" },
                ]}
                value={activeStartEnd}
                onChange={setActiveStartEnd}
              />

              <ExportButton
                data={startEndExportData}
                fileName="start-end-week-trend.xls"
              />
            </Box>
          </Box>

          {activeStartEnd === "graph" ? (
            <CommonGroupedScrollableChart
              data={FGCoverageData}
              xKey="week"
              bars={[
                { dataKey: "start", color: "#B9B3D9", label: "Start of Week" },
                { dataKey: "end", color: "#5A4CA8", label: "End of Week" },
              ]}
            />
          ) : (
            <CommonTable
              data={FGCoverageData}
              columns={startEndColumns}
            />
          )}
        </Box>
      </CommonDialog>

      {/* Root cause trend dialog box  */}
      <CommonDialog
        open={openRootCauseDialog}
        onClose={() => setOpenRootCauseDialog(false)}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Root Causes Trend</Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <RMPMToggleButton
                options={[
                  { icon: <GraphIcon />, value: "graph" },
                  { icon: <TableIcon />, value: "table" },
                ]}
                value={activeRootCauseTrend}
                onChange={setActiveRootCauseTrend}
              />

              <ExportButton
                data={rootCauseTrendPercentageData}
                fileName="root-cause-trend.xls"
              />
            </Box>
          </Box>

          {activeRootCauseTrend === "graph" ? (
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
          ) : (
            <CommonTable
              data={rootCauseTrendPercentageData}
              columns={rootCauseTrendColumns}
            />
          )}
        </Box>
      </CommonDialog>

      {/* Accepted recommendation trend dialog box  */}
      <CommonDialog
        open={openAcceptedDialog}
        onClose={() => setOpenAcceptedDialog(false)}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">
              Accepted Recommendation Trend
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <RMPMToggleButton
                options={[
                  { icon: <GraphIcon />, value: "graph" },
                  { icon: <TableIcon />, value: "table" },
                ]}
                value={activeAcceptedTrend}
                onChange={setActiveAcceptedTrend}
              />

              <ExportButton
                data={acceptedPercentageData}
                fileName="accepted-recommendation-trend.xls"
              />
            </Box>
          </Box>

          {activeAcceptedTrend === "graph" ? (
            <CommonStackedScrollableChart
              data={acceptedRecommendationTrend}
              xKey="week"
              stackBars={[
                { dataKey: "IUT", color: "#627FA1" },
                { dataKey: "PRPO", color: "#9B8FBC" },
                { dataKey: "AltVendor", color: "#C98FA7" },
                { dataKey: "Expedited", color: "#8FBF7A" },
                { dataKey: "Other", color: "#274C8E" },
              ]}
            />
          ) : (
            <CommonTable
              data={acceptedPercentageData}
              columns={acceptedColumns}
            />
          )}
        </Box>
      </CommonDialog>
    </Box>

  );
};

export default RMPMSummary;
