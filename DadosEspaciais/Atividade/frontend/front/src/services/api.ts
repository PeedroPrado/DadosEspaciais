// src/services/api.ts
import type { Irradiacao } from '../context/AppContext';

const API_URL = 'http://localhost:3004';

// Buscar cidades
export const getCidades = async () => {
  const res = await fetch(`${API_URL}/cidade`);
  if (!res.ok) throw new Error('Erro ao buscar cidades');
  return res.json();
};

// Buscar irradiação e geojson por cidade
export const getIrradiacao = async (
  id: number
): Promise<{ irradiacao: Irradiacao; geojson: GeoJSON.FeatureCollection } | null> => {
  try {
    const res = await fetch(`${API_URL}/cidade/${id}`);
    if (!res.ok) {
      console.warn(`Erro ao buscar dados da cidade ${id}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Erro na requisição de irradiação:', error);
    return null;
  }
};
