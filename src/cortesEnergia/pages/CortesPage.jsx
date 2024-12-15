import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Navbar } from '../components/Navbar';
import { useGetClienteBy, useGetSector } from '../../hooks';
import { useEffect, useState } from 'react';
import { stringToPolygon } from '../../helpers/convertArray';
import * as turf from '@turf/turf';
import { useSelector } from 'react-redux';

export const CortesPage = () => {
  const { userInformation } = useSelector(state => state.auth);
  const { cliente_id } = userInformation;

  const [clienteCoords, setClienteCoords] = useState(null);
  const [sectorPolygon, setSectorPolygon] = useState(null);
  const [horaCorte, setHoraCorte] = useState('');

  const { data: clienteData, isLoading: isLoadingCliente } = useGetClienteBy(cliente_id); // Reemplaza 'clienteId' con el ID del cliente logueado
  const { data: sectoresData, error, isLoading: isLoadingSectores } = useGetSector();

  useEffect(() => {
    if (clienteData) {
      let coords = stringToPolygon(clienteData.coordenadas);

      // Verifica que los datos sean válidos y extrae el primer elemento
      if (Array.isArray(coords) && coords.length > 0 && coords[0].length === 2) {
        const rawCoords = coords[0]; // Extrae el primer par de coordenadas
        setClienteCoords(rawCoords);
      } else {
        console.error("El formato de las coordenadas no es válido.");
      }
    }
  }, [clienteData]);

  useEffect(() => {
    if (clienteCoords && sectoresData) {
      for (const sector of sectoresData) {
        const polygon = stringToPolygon(sector.poligono_coordenadas);
        const point = turf.point(clienteCoords);

        const primerElemento = polygon[0];
        const ultimoElemento = polygon[polygon.length - 1];

        if (JSON.stringify(primerElemento) !== JSON.stringify(ultimoElemento)) {
          polygon.push([...primerElemento]); // Copiar el primer elemento
          console.log("Se agregó automáticamente el primer elemento al final.");
        } else {
          console.log("El último elemento ya es igual al primero. No se agregó nada.");
        }

        const poly = turf.polygon([polygon]);

        if (turf.booleanPointInPolygon(point, poly)) {
          setSectorPolygon(polygon);
          setHoraCorte(`Tu horario de corte es de ${sector.hora_inicio} a ${sector.hora_fin} ya que perteneces al sector ${sector.nombre}`);
          break;
        } else {
          setSectorPolygon(null);
          setHoraCorte('No se encontró un sector asignado');
        }
      }
    }
  }, [clienteCoords, sectoresData]);

  if (isLoadingCliente || isLoadingSectores) return <p>Cargando...</p>;
  if (error) return <p>Ocurrió un error al cargar los sectores</p>;

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar>
        <div className='max-w-7xl flex flex-col justify-center items-center py-6 sm:px-6 lg:px-8'>
          {clienteCoords && (
            <>
              <h1 className='text-2xl font-bold text-center mb-4'>
                Hola, {clienteData.nombres} {clienteData.apellidos}, {horaCorte}
              </h1>
              <MapContainer center={clienteCoords} zoom={15} style={{ height: '500px', width: '800px' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {sectorPolygon && <Polygon positions={sectorPolygon} color="blue" />}
                {clienteCoords && (
                  <Marker position={clienteCoords}>
                    <Popup>
                      {clienteCoords}
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </>
          )}
        </div>
      </Navbar>
    </div>
  );
};