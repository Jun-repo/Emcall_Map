/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  PieChart, Pie, Sector, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './analyticscard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const incidentData = [
  { name: 'Street Fights', value: 45, fill: '#FF6384' }, // Red
  { name: 'Vehicle Accidents', value: 25, fill: '#36A2EB' }, // Blue
  { name: 'Theft', value: 10, fill: '#FFCE56' }, // Yellow
  { name: 'Health Emergencies', value: 20, fill: '#4BC0C0' }, // Teal
];

const monthlyData = [
  { name: 'Jan', fill:'#4BC0C0', people: 20 }, { name: 'Feb', people: 40 },
  { name: 'Mar', fill:'#4BC0C0', people: 10 }, { name: 'Apr', people: 20 },
  { name: 'May', fill:'#4BC0C0', people: 50 }, { name: 'Jun', people: 60 },
  { name: 'Jul', fill:'#4BC0C0', people: 80 }, { name: 'Aug', people: 70 },
  { name: 'Sep', fill:'#4BC0C0', people: 30 }, { name: 'Oct', people: 20 },
  { name: 'Nov', fill:'#4BC0C0', people: 10 }, { name: 'Dec', people: 40 },
];

const AnalyticsCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => setActiveIndex(index);

  return (
    <div className="analytics-card">
      <div className="analytics-content">
{/* Monthly Incident Rates Bar Chart */}
<div className="analytics-row">
  <h2 className="analytics-header">Monthly Incident Rates</h2>
  <ResponsiveContainer className="chart-container" width='100%' height={230}>
    <BarChart 
      className="bar-chart" 
      data={monthlyData} 
      margin={{ top: 5, right: 5, left: 0, bottom: 0 }} // Reduced left margin
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="name" 
        interval={0} 
        tick={{ fill: '#FF1D1DFF',fontSize: 10, }} 
        padding={{ left: 10, right: 10 }} // Adds padding inside the X-axis
      />
      <YAxis 
        tick={{fill: '#FF1D1DFF', fontSize: 10 }} 
        width={30} // Reducing Y-axis width for a compact layout
      />
      <Tooltip />
      <Bar 
        dataKey="people" 
        fill="rgba(0, 123, 255, 0.8)" 
        barSize={15} // Controls the width of each bar
      />
    </BarChart>
  </ResponsiveContainer>
</div>
  {/* Incident Types Pie Chart */}
  <div className="analytics-row">
          <h2 className="analytics-header">Incident Types Breakdown</h2>
          <ResponsiveContainer className="chart-container" width="100%" height={250}>
            <PieChart className="pie-chart">
              <Pie
                activeIndex={activeIndex}
                activeShape={(props) => <CustomActiveShape {...props} />}
                data={incidentData}
                cx="50%" cy="50%"
                innerRadius={40} outerRadius={60}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {incidentData.map((entry, index) => (
                  <Sector key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Response List */}
        <div className="analytics-row">
          <h2 className="analytics-header">Response List</h2>
          <div className="avatar-list">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="avatar-item">
                <div className="avatar" />
                <div className="avatar-info">
                  <span style={{ color: '#FFFFFF' }}>Name {index + 1}</span>
                  <span style={{ color: '#AAAAAA' }}>Phone: {Math.floor(Math.random() * 100000000)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomActiveShape = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos; // Slightly adjust for the line position
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
<text x={cx} y={cy} dy={120} textAnchor="middle" fill={fill}>
  {payload.name}
</text>
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius} outerRadius={outerRadius}
        startAngle={startAngle} endAngle={endAngle}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} />
      <g transform={`translate(${ex + (cos >= 0 ? 1 : -1) * 12}, ${ey})`}>
        <FontAwesomeIcon icon={faUser} color="#FFFFFFFF"  width={"15px"} height={"15px"}/>
      </g>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={-4} textAnchor={textAnchor} fill="#FFFFFFFF"> {/* Adjusted dy for compactness */}
        {value}
      </text>
    </g>
  );
};

export default AnalyticsCard;
