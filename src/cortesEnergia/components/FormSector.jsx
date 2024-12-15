import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useCreateSector, useGetSectorById, useUpdateSector } from "../../hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PolygonMap } from './PolygonMap';
import { stringToPolygon, polygonToString } from '../../helpers/convertArray';

export const FormSector = ({ sectorId, setSelectedId }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);

    const createMutation = useCreateSector();
    const updateMutation = useUpdateSector();
    const { data: sector } = useGetSectorById(sectorId);

    useEffect(() => {
        if (sector) {
            setValue('nombre', sector.nombre);
            setValue('hora_inicio', sector.hora_inicio);
            setValue('hora_fin', sector.hora_fin);
            setPolygonCoordinates(stringToPolygon(sector.poligono_coordenadas));
        } else {
            reset();
            setPolygonCoordinates([]);
        }
    }, [sector, setValue, reset]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        const formData = {
            ...data,
            poligono_coordenadas: polygonToString(polygonCoordinates)
        };

        if (sectorId) {
            updateMutation.mutate({ sectorId, ...formData })
            reset();
            setSelectedId(null);
        } else {
            createMutation.mutate(formData)
            reset();
            setPolygonCoordinates([]);
        }

        setIsSubmitting(false);
    };

    const handleCancel = () => {
        reset();
        setPolygonCoordinates([]);
        setSelectedId(null);
    };


    return (
        <div className="w-full border-4 border-dashed border-gray-200 p-6 rounded-lg">
            <h2 className="text-center text-xl font-bold mb-4 text-gray-900">
                {sectorId ? 'Editar sector' : 'Ingresa un nuevo sector'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="nombre" className="sr-only">Nombre</label>
                        <input
                            id="nombre"
                            {...register('nombre', {
                                required: 'El nombre es requerido',
                                minLength: {
                                    value: 3,
                                    message: 'El nombre debe tener al menos 3 caracteres'
                                },
                                pattern: {
                                    value: /^[a-zA-Z\s]*$/,
                                    message: 'El nombre debe contener solo letras'
                                }
                            })}
                            type="text"
                            autoComplete="nombre"
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.nombre ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Nombre del sector"
                        />
                        {errors.nombre && <p className="mb-2 text-sm text-red-600">{errors.nombre.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="hora_inicio" className="sr-only">Hora de inicio</label>
                        <input
                            id="hora_inicio"
                            type="text"
                            {...register('hora_inicio', {
                                required: 'La hora de inicio es requerida',
                                pattern: {
                                    value: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
                                    message: 'Ingresa una hora válida en formato HH:mm:ss (ej. 14:30:00)'
                                }
                            })}
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.hora_inicio ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="HH:mm:ss"
                        />
                        {errors.hora_inicio && <p className="mb-2 text-sm text-red-600">{errors.hora_inicio.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="hora_fin" className="sr-only">Hora de finalización</label>
                        <input
                            id="hora_fin"
                            type="text"
                            {...register('hora_fin', {
                                required: 'La hora de finalizacion es requerida',
                                pattern: {
                                    value: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
                                    message: 'Ingresa una hora válida en formato HH:mm:ss (ej. 14:30:00)'
                                }
                            })}
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.hora_fin ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="HH:mm:ss"
                        />
                        {errors.hora_fin && <p className="mb-2 text-sm text-red-600">{errors.hora_fin.message}</p>}
                    </div>
                    <div>
                        <PolygonMap polygonCoordinates={polygonCoordinates} setPolygonCoordinates={setPolygonCoordinates} />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {isSubmitting ? 'Enviando datos...' : sectorId ? 'Actualizar Sector' : 'Registrar Sector'}
                        </button>
                        {
                            sectorId && (
                                <button
                                    onClick={handleCancel}
                                    className='mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                                >
                                    Cancelar
                                </button>
                            )
                        }
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};