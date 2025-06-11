import { Request, Response } from "express";
import db from "./db";

export async function cidade(req: Request, res: Response) {
  try {
    const resultado = await db.query("SELECT * FROM cidades");
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    res.status(500).json({ erro: "Erro ao buscar cidades" });
  }
}

export const buscarIrradiacaoPorCidade = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT 
        i.anual, i.jan, i.fev, i.mar, i.abr, i.mai, i.jun, i.jul, 
        i.ago, i.set, i.out, i.nov, i.dez,
        ST_AsGeoJSON(i.geom)::json AS geojson
      FROM incidencias i
      INNER JOIN cidades c ON ST_Contains(i.geom, c.geom)
      WHERE c.id = $1
      LIMIT 1
    `;

    const resultado = await db.query(query, [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: "Nenhum dado encontrado para esta cidade." });
    }

    const { geojson, ...irradiacao } = resultado.rows[0];

    res.json({
      irradiacao,
      geojson
    });

  } catch (error) {
    console.error("Erro ao buscar irradiação:", error);
    res.status(500).json({ error: "Erro interno ao buscar irradiação" });
  }
};
