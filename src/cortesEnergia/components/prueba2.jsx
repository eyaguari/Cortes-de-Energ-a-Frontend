import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const PolygonMap = ({ polygonCoordinates, setPolygonCoordinates }) => {
    const [polygon, setPolygon] = useState(polygonCoordinates || []);

    useEffect(() => {
        setPolygon(polygonCoordinates || []);
    }, [polygonCoordinates]);

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPolygon((prev) => [...prev, [lat, lng]]);
            }
        });
        return null;
    };

    const handleSavePolygon = () => {
        setPolygonCoordinates(polygon);
    };

    const handleClearPolygon = () => {
        setPolygon([]);
        setPolygonCoordinates([]);
    };

    return (
        <div>
            <MapContainer center={[-2.133766186504391, -79.59295517125375]} zoom={14} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {polygon.length > 0 && <Polygon positions={polygon} />}
                <MapEvents />
            </MapContainer>
            <p onClick={handleSavePolygon} className="mt-2 bg-blue-500 text-white p-2 rounded cursor-pointer">Guardar Polígono</p>
            <p onClick={handleClearPolygon} className="mt-2 bg-red-500 text-white p-2 rounded">Limpiar Polígono</p>
        </div>
    );
};