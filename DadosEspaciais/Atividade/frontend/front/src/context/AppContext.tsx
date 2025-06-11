// src/context/AppContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Interface da cidade
export interface Cidade {
  id: number;
  nome: string;
}

// Interface da resposta de irradiação
export interface Irradiacao {
  anual: number;
  jan: number;
  fev: number;
  mar: number;
  abr: number;
  mai: number;
  jun: number;
  jul: number;
  ago: number;
  set: number;
  out: number;
  nov: number;
  dez: number;
  poligono_geojson: string; // ← Adicione aqui
}

// Tipagem para o contexto
interface ContextProps {
  cidadeSelecionada: Cidade | null;
  setCidadeSelecionada: (cidade: Cidade) => void;
  irradiacao: Irradiacao | null;
  setIrradiacao: (dados: Irradiacao) => void;
  geojson: GeoJSON.FeatureCollection | null;
  setGeojson: (geojson: GeoJSON.FeatureCollection) => void;
}

// Criação do contexto
const AppContext = createContext<ContextProps | undefined>(undefined);

// Provedor do contexto
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cidadeSelecionada, setCidadeSelecionada] = useState<Cidade | null>(null);
  const [irradiacao, setIrradiacao] = useState<Irradiacao | null>(null);
  const [geojson, setGeojson] = useState<GeoJSON.FeatureCollection | null>(null);

  return (
    <AppContext.Provider
      value={{ cidadeSelecionada, setCidadeSelecionada, irradiacao, setIrradiacao, geojson, setGeojson }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar o contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de AppProvider');
  }
  return context;
};

export interface IrradiacaoResponse {
  irradiacao: Irradiacao;
  geojson: GeoJSON.FeatureCollection;
}