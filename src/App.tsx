import './App.css';
import ContasPagarListDT from './feature/contas-a-pagar/pages/ContasPagarList';

import HeaderAppBar from './shared/layout/header';

function App() {
  return (
    <div className="App">
        <HeaderAppBar />
        <ContasPagarListDT />
    </div>
  );
}

export default App;
