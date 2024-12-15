import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useCreateCliente, useUpdateCliente, useGetClienteBy } from '../../hooks'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FormCliente = ({clienteId, setSelectedId}) => {

    const { register, handleSubmit, reset,setValue, formState: { errors } } = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const createMutation = useCreateCliente()
    const updateMutation = useUpdateCliente()
    const { data: cliente } = useGetClienteBy(clienteId)

    useEffect( () => {
        if(cliente) {
            setValue('cedula', cliente.cedula)
            setValue('nombres', cliente.nombres)
            setValue('apellidos', cliente.apellidos)
            setValue('correo_electronico', cliente.correo_electronico)
            setValue('coordenadas', cliente.coordenadas)
        }
    }, [cliente, setValue] )

    const onSubmit = async (data) => {
        console.log(data)
        setIsSubmitting(true)
        if (clienteId) {
            updateMutation.mutate({clienteId, ...data})
            reset()
            setSelectedId(null)
        }else{
            createMutation.mutate(data)
            reset()
        }
    
        setIsSubmitting(false)
    }

    const handleCancel = () => {
        reset()
        setSelectedId(null)
    }

    return (
        <div className="w-full border-4 border-dashed border-gray-200 p-6 rounded-lg">
            <h2 className="text-center text-xl font-bold mb-4 text-gray-900">
                {clienteId ? 'Editar cliente' : 'Ingresa un nuevo cliente'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="cedula" className="sr-only">
                            Cédula
                        </label>
                        <input
                            id="cedula"
                            {
                            ...register('cedula', {
                                required: 'La cédula es requerida',
                                minLength: {
                                    value: 10,
                                    message: 'La cédula debe tener al menos 10 caracteres'
                                },
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: 'La cédula debe ser numérica'
                                }
                            })
                            }
                            type="number"
                            autoComplete="cedula"
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.cedula ? 'border-red-300' : 'border-gray-300'}  border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Número de Cédula"
                        />
                        {errors.cedula && <p className="mb-2 text-sm text-red-600">{errors.cedula.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="nombre" className="sr-only">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            {
                            ...register('nombres', {
                                required: 'El nombre es requerido',
                                minLength: {
                                    value: 3,
                                    message: 'El nombre debe tener al menos 3 caracteres'
                                },
                                pattern: {
                                    value: /^[a-zA-Z\s]*$/,
                                    message: 'El nombre debe contener solo letras'
                                }
                            })
                            }
                            type="text"
                            autoComplete="nombre"
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.nombres ? 'border-red-300' : 'border-gray-300'}  border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Nombres"
                        />
                        {errors.nombres && <p className="mb-2 text-sm text-red-600">{errors.nombres.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="apellido" className="sr-only">
                            Apellido
                        </label>
                        <input
                            id="apellido"
                            {
                            ...register('apellidos', {
                                required: 'El apellido es requerido',
                                minLength: {
                                    value: 3,
                                    message: 'El apellido debe tener al menos 3 caracteres'
                                },
                                pattern: {
                                    value: /^[a-zA-Z\s]*$/,
                                    message: 'El apellido debe contener solo letras'
                                }
                            })
                            }
                            type="text"
                            autoComplete="apellido"
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.apellidos ? 'border-red-300' : 'border-gray-300'}  border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Apellidos"
                        />
                        {errors.apellidos && <p className="mb-2 text-sm text-red-600">{errors.apellidos.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="sr-only">
                            Correo Electrónico
                        </label>
                        <input
                            
                            id="email"
                            {
                            ...register('correo_electronico', {
                                required: 'El correo electrónico es requerido',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'El formato del correo electrónico no es válido'
                                }
                            })
                            }
                            type="email"
                            autoComplete="correo_electronico"
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.correo_electronico ? 'border-red-300' : 'border-gray-300'}  border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Correo Electrónico"
                        />
                        {errors.correo_electronico && <p className="mb-2 text-sm text-red-600">{errors.correo_electronico.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="coordenadas" className="sr-only">
                            Coordenadas
                        </label>
                        <input
                            id="coordenadas"
                            {
                            ...register('coordenadas', {
                                required: 'Las coordenadas son requeridas',
                                minLength: {
                                    value: 3,
                                    message: 'Las coordenadas deben tener al menos 3 caracteres'
                                },
                                pattern: {
                                    value: /^-?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-?((1[0-7]\d(\.\d+)?|180(\.0+)?)|\d{1,2}(\.\d+)?)$/,
                                    message: 'Ingresa coordenadas válidas en formato latitud,longitud (ej. -0.1841235,-78.4872125)'
                                }
                            })
                            }
                            type="text"
                            autoComplete="coordenadas"
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.coordenadas ? 'border-red-300' : 'border-gray-300'}  border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Coordenadas"
                        />
                        {errors.coordenadas && <p className="mb-2 text-sm text-red-600">{errors.coordenadas.message}</p>}

                    </div>

                    {/* boton de envio */}
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {isSubmitting ? 'Enviando datos...' : clienteId ? 'Actualizar Cliente' : 'Crear Cliente'}
                        </button>
                        {
                            clienteId && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
    )
}
