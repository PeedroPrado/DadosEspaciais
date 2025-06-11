import React from 'react';
import { AppProvider } from './context/AppContext';
import CityList from './components/CityList';
import MapView from './components/MapView';


const App: React.FC = () => {
  return (
    <AppProvider>
      <div style={{ display: 'flex', height: '100vh' }}>
        <aside style={{ width: '300px', padding: '1rem', overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
          <h2>Lista de Cidades</h2>
          <CityList />
        </aside>
        <main style={{ flex: 1 }}>
          <MapView />
        </main>
      </div>
    </AppProvider>
  );
};

export default App;
