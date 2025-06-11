import React, { useEffect, useState } from 'react';
import { getCidades, getIrradiacao } from '../services/api';
import { useAppContext } from '../context/AppContext';
import type { Cidade, Irradiacao } from '../context/AppContext';

// Novo tipo para a resposta da API
interface IrradiacaoResponse {
  irradiacao: Irradiacao;
  geojson: GeoJSON.FeatureCollection;
}

const CityList: React.FC = () => {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const { setCidadeSelecionada, setGeojson, setIrradiacao } = useAppContext();

  useEffect(() => {
    getCidades()
      .then(setCidades)
      .catch((err) => console.error("Erro ao buscar cidades:", err));
  }, []);

  const handleClick = async (cidade: Cidade) => {
    try {
      console.log("Cidade clicada: ", cidade);
      setCidadeSelecionada(cidade);

      const dados: IrradiacaoResponse | null = await getIrradiacao(cidade.id);
      console.log("Dados da irradiação: ", dados);

      if (!dados?.geojson || !dados?.irradiacao) {
        console.warn("Dados incompletos ou sem polígono.");
        return;
      }

      setIrradiacao(dados.irradiacao);
      setGeojson(dados.geojson);
    } catch (error) {
      console.error("Erro ao buscar irradiação:", error);
    }
  };

  return (
    <ul>
      {cidades.map((cidade) => (
        <li key={cidade.id} onClick={() => handleClick(cidade)}>
          {cidade.nome}
        </li>
      ))}
    </ul>
  );
};

export default CityList;
