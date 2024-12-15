import { useDeleteCliente, useGetClientes } from '../../hooks'


export const ListCliente = ({setSelectedId}) => {

    const { data, error, isLoading } = useGetClientes()
    const deleteMutation = useDeleteCliente();

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    

    const onDelete = (id) => {
        deleteMutation.mutate(id);
    }

    return (
        <div className="w-full border-4 border-dashed border-gray-200 p-6 rounded-lg">
            <h2 className="text-center text-xl font-bold mb-4 text-gray-900">Listado de clientes</h2>
            <ul className="list-disc pl-5">
                {data.map(cliente => (
                    <li key={cliente.id} className="flex items-center justify-between mb-2 bg-gray-300 p-2 rounded-lg text-grey-900 font-bold">
                        <span>{cliente.nombres} {cliente.apellidos}</span>
                        <div className="flex space-x-2">
                            <button onClick={ () => setSelectedId(cliente.id) }>
                                <box-icon type='solid' name='edit-alt' color='orange' animation='tada-hover'></box-icon>

                            </button>

                            <button onClick={ () => onDelete(cliente.id) }>
                                <box-icon name='trash-alt' type='solid' color="red" animation='tada-hover'></box-icon>
                            </button>

                        </div>
                    </li>
                ))}
            </ul>
        </div>

    )
}
