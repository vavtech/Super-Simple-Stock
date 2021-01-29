import StocksTable from './StocksTable';
import Options from './Options';
import TradeTable from '../components/TradeTable';

function Stocks() {
    return (
        <div>
            <StocksTable />
            <Options />
            <TradeTable />
        </div>
    );
}


export default Stocks;