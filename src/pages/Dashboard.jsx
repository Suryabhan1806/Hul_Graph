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

const Dashboard = () => {
  const [activeLeft, setActiveLeft] = useState("graph");
  const [activeRight, setActiveRight] = useState("graph");


  const rootCauseData = [
    { name: "Plan Variation", value: 450 },
    { name: "PR to PO Conversion", value: 600 },
    { name: "Others", value: 350 },
    { name: "Supplier & Transit Delay", value: 180 },
    { name: "Plan Variation 2", value: 140 },
    { name: "Others 2", value: 225 },
    { name: "PR to PO Conversion 2", value: 300 },
    { name: "Supplier Delay", value: 275 },
    { name: "Transit Delay", value: 200 },
    { name: "Others 3", value: 150 }
  ];

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

  const rejectionData = [
    { name: "Quality Issue", value: 320 },
    { name: "Packaging Issue", value: 210 },
    { name: "Late Delivery", value: 280 },
    { name: "Wrong Item", value: 150 },
    { name: "Documentation Error", value: 190 },
    { name: "Quality Issue", value: 320 },
    { name: "Packaging Issue", value: 210 },
    { name: "Late Delivery", value: 280 },
    { name: "Wrong Item", value: 150 },
    { name: "Documentation Error", value: 190 },
       { name: "Packaging Issue", value: 210 },
    { name: "Late Delivery", value: 280 },
    { name: "Wrong Item", value: 150 },
    { name: "Documentation Error", value: 190 },

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
