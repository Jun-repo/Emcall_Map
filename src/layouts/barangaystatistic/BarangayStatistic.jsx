// BarangayStatistic.jsx
import{ PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import './barangaystatistic.css'; // Import the CSS for styling

const barangayData = [
  { name: 'Berong', value: 90, fullMark: 150 },
  { name: 'Aramaywan', value: 110, fullMark: 150 },
  { name: 'Isugod', value: 75, fullMark: 150 },
  { name: 'Maasin', value: 100, fullMark: 150 },
  { name: 'Tabon', value: 30, fullMark: 150 },
  { name: 'Alfonso XIII', value: 120, fullMark: 150 },
  { name: 'Pinaglabanan', value: 100, fullMark: 150 },
  { name: 'Panitian', value: 95, fullMark: 150 },
  { name: 'Tagusao', value: 80, fullMark: 150 },
  { name: 'Calatagbak', value: 60, fullMark: 150 },
  { name: 'Malatgao', value: 110, fullMark: 150 },
  { name: 'Quinlogan', value: 65, fullMark: 150 },
  { name: 'Calumpang', value: 50, fullMark: 150 },
  { name: 'Suwangan', value: 70, fullMark: 150 },
];

export default class BarangayStatistic extends PureComponent {
  render() {
    return (
          <div className="responsive-wrapper">
          <h2 id="chart-title">Barangay Statistics</h2>
            <ResponsiveContainer width="90%" height={250}>
              <RadarChart cx="50%" cy="50%" outerRadius="60%" data={barangayData}>
                <PolarGrid stroke="#ccc" />
                <PolarAngleAxis 
                  dataKey="name" 
                  tick={{ fill: '#FFFFFFFF', fontSize: 10 }} 
                />
                <PolarRadiusAxis tick={{ fill: '#FF2222FF', fontSize: 8 }} />
                <Radar 
                  name="Population Score" 
                  dataKey="value" 
                  stroke="#0051FFFF" 
                  fill="#00A6FFFF" 
                  fillOpacity={0.6} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
      );
  }
}
