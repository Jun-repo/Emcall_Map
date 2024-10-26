
import Map from './hooks/map_handler/Map'
import BarangayStatistic from './layouts/barangaystatistic/BarangayStatistic'
import AnalyticsCard from './layouts/cards/analytics/AnalyticsCard'
import NavigationBar from './layouts/navigation_bar/NavigationBar'
import './styles/app.css'

const App = () => {
  return (
    
    <div>
    <NavigationBar/> 
    <Map/> 
    <AnalyticsCard/>  
    <div>
      <BarangayStatistic/>
    </div>
    {/* <di>
      <Direction/>
    </di> */}
  </div>
  )
}

export default App
