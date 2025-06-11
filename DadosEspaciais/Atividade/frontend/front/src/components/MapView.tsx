
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Tooltip } from 'react-leaflet';
import 'Leaflet/dist/leaflet.css';
import { useAppContext } from '../context/AppContext';
import L, { GeoJSON as LeafletGeoJSON } from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import type { Geometry, FeatureCollection, Feature, GeoJsonProperties } from 'geojson';


const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapView: React.FC = () => {
  const { geojson, cidadeSelecionada, irradiacao } = useAppContext();
  const geoJsonLayerRef = useRef<LeafletGeoJSON | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | undefined>(undefined);

  useEffect(() => {
  if (!geojson) return;

  try {
    const layer = L.geoJSON(geojson);
    const center = layer.getBounds().getCenter();
    console.log("Centro calculado universalmente:", center);
    setMarkerPosition(center);
  } catch (error) {
    console.error("Erro ao calcular centro com L.geoJSON:", error);
  }
}, [geojson]);

useEffect(() => {
    if (!geojson || !geojson.type) return;

    let geometry: Geometry | null = null;

if ((geojson as FeatureCollection).type === "FeatureCollection") {
  const feature = (geojson as FeatureCollection<Geometry, GeoJsonProperties>).features?.[0];
  geometry = feature?.geometry ?? null;
} else if ((geojson as Feature).type === "Feature") {
  geometry = (geojson as Feature<Geometry, GeoJsonProperties>).geometry ?? null;
} else {
  geometry = geojson as Geometry;
}
    console.log("Geometry final usada para cálculo:", geometry);

    try {
      let coords: [number, number][] | undefined;

      if (geometry.type === 'Point') {
        const [lng, lat] = geometry.coordinates as [number, number];
        const pos: [number, number] = [lat, lng];
        console.log("Marcador tipo Point:", pos);
        setMarkerPosition(pos);
        return;
      }

      if (geometry.type === 'Polygon') {
        const raw = geometry.coordinates;

        if (
          Array.isArray(raw) &&
          Array.isArray(raw[0]) &&
          Array.isArray(raw[0][0])
        ) {
          coords = raw[0] as [number, number][];
        }
      } else if (geometry.type === 'MultiPolygon') {
        coords = (geometry.coordinates as [number, number][][][])[0][0];
      }

      if (coords && coords.length > 0) {
        const latlngCoords = coords.map(([lng, lat]) => [lat, lng]) as [number, number][];
        const center = L.polygon(latlngCoords).getBounds().getCenter();
        console.log("Centro calculado:", center);
        setMarkerPosition(center);
      } else {
        console.warn("Coordenadas não definidas ou vazias para tipo:", geometry.type);
      }
    } catch (err) {
      console.error("Erro ao calcular markerPosition:", err);
    }
  }, [geojson]);

  useEffect(() => {
  if (!geojson) return;

  try {
    const layer = L.geoJSON(geojson);
    const center = layer.getBounds().getCenter();
    console.log("Centro calculado universalmente:", center);
    setMarkerPosition(center);
  } catch (error) {
    console.error("Erro ao calcular centro com L.geoJSON:", error);
  }
}, [geojson]);

useEffect(() => {
    if (geojson && geoJsonLayerRef.current && mapRef.current) {
      const bounds = geoJsonLayerRef.current.getBounds();
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [geojson]);

  const geoJsonStyle = {
    color: 'red',
    weight: 2,
    fillColor: 'red',
    fillOpacity: 0.2,
  };

  return (
    <MapContainer
      center={[-14.2, -51.9]}
      zoom={5}
      style={{ height: '500px', width: '100%' }}
      ref={(ref) => {
        if (ref) mapRef.current = ref;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {geojson && (
        <GeoJSON
          key={JSON.stringify(geojson)}
          data={geojson}
          style={geoJsonStyle}
          ref={(layer) => {
            if (layer) geoJsonLayerRef.current = layer;
          }}
        />
      )}

      {cidadeSelecionada && markerPosition && (
  <>
    {console.log("Renderizando marcador:", markerPosition, cidadeSelecionada)}
    <Marker position={markerPosition} icon={customIcon}>
      <Popup>
        <strong>{cidadeSelecionada.nome}</strong>
      </Popup>
      <Tooltip>{cidadeSelecionada.nome}</Tooltip>
    </Marker>
  </>
)}

      {irradiacao && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            zIndex: 1000,
          }}
        >
          <h4>Irradiação</h4>
          {Object.entries(irradiacao).map(([mes, valor]) => (
            <div key={mes}>
              {mes.charAt(0).toUpperCase() + mes.slice(1)}: {valor}
            </div>
          ))}
        </div>
      )}
    </MapContainer>
  );
};

export default MapView;
