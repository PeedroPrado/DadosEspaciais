import React from 'react';
import { useAppContext } from '../context/AppContext';

const IrradiationPanel: React.FC = () => {
  const { irradiacao } = useAppContext();

  if (!irradiacao) return null;

  return (
    <div style={{ padding: 10 }}>
      <h4>Irradiação</h4>
      <ul>
        {Object.entries(irradiacao).map(([mes, valor]) => (
          <li key={mes}>{mes}: {valor}</li>
        ))}
      </ul>
    </div>
  );
};

export default IrradiationPanel;
