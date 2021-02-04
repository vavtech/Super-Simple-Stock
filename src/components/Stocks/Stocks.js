import StocksTable from '../StockTable/StocksTable';
import Options from '../Options/Options';
import TradeTable from '../TradeTable/TradeTable';

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