import './App.css';
import Stocks from './components/Stocks';
import Store from './context/Store';

function App() {
  return (
    <div className="App">
      <Store>
        <h1 style={{ color: '#28529e' }}>Welcome to Super Simple Stocks</h1>
        <Stocks />
      </Store>
    </div>
  );
}

export default App;
