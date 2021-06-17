import Home from './components/Home';
import BedState from './components/context/BedState';
import Header from './components/Header';

function App() {
  return (
    <BedState>
      <div className='App'>
        <Header />
        <Home />
      </div>
    </BedState>
  );
}

export default App;
