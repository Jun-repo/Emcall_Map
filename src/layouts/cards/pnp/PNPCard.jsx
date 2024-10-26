import './pnp.css';
import '../cards.css';
import BarangayStatistic from '../../barangaystatistic/BarangayStatistic';

const PNPCard = () => {
  return (
    <div id='cards' className="card-pnp">
    <BarangayStatistic/>
    </div>
  );
};

export default PNPCard;
