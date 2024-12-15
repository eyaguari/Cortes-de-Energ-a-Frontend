
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import cortesEnergiaApi from '../apis/cortesEnergiaApi'
import { toast } from 'react-toastify'

// hook para obtener datos del sector

export const useGetSector = () => {
    return useQuery(['sectorList'], async () => {
        const { data } = await cortesEnergiaApi.get('/sectores') 
        return data
    })
}

// Hook para obtener un sector por id

export const useGetSectorById = (id) => {
    return useQuery(['sector', id], async () => {
        const { data } = await cortesEnergiaApi.get(`/sectores/${id}/`)
        return data
    }, {
        enabled: !!id // Solo se ejecuta si id es diferente de null
    })
}

// Hook para crear un nuevo sector
export const useCreateSector = () => {
    const queryClient = useQueryClient();
    return useMutation(async (newSector) => {
        const { data } = await cortesEnergiaApi.post('/sectores/', newSector);
        return data.message;
},
    {
        onSuccess: (message) => {
            queryClient.invalidateQueries(['sectorList']);
            toast.success(message);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || error.message);
        }
    }
    );
};

// Hook para actualizar un sector

export const useUpdateSector = () => {
    const queryClient = useQueryClient();
    return useMutation(async (updateSector) => {
        const { data } = await cortesEnergiaApi.put(`/sectores/${updateSector.sectorId}/`, updateSector);
        return data.message;
    },
    {
        onSuccess: (message) => {
            queryClient.invalidateQueries(['sectorList']);
            toast.success(message);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || error.message);
        }
    }
    );
}


// hook para eliminar un sector

export const useDeleteSector = () => {
    const queryClient = useQueryClient()
    return useMutation(async (id)=> {
        const { data } = await cortesEnergiaApi.delete(`/sectores/${id}/`)
        return data.message;
    }, {
        onSuccess: (message) => {
            
            queryClient.invalidateQueries(['sectorList'])
            toast.success(message)
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || error.message)
        }
    }
)
}

//****************************************************************************************************************************

// Hook para obtener los clientes

export const useGetClientes = () => {
    return useQuery(['clienteList'], async () => {
        const { data } = await cortesEnergiaApi.get('/clientes') 
        return data
    })
}

// Hook para crear un nuevo cliente

export const useGetClienteBy = (id) => {
    return useQuery(['cliente', id], async () => {
        const { data } = await cortesEnergiaApi.get(`/clientes/${id}/`)
        return data
    }, {
        enabled: !!id // Solo se ejecuta si id es diferente de null
    })
}

// Hook para crear un nuevo cliente

export const useCreateCliente = () => {
    const queryClient = useQueryClient();
    return useMutation(async (newCliente) => {
        const { data } = await cortesEnergiaApi.post('/clientes/', newCliente);
        return data.message;
},
    {
        onSuccess: (message) => {
            queryClient.invalidateQueries(['clienteList']);
            toast.success(message);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || error.message);
        }
    }
    );
};

// Hook para actualizar un cliente

export const useUpdateCliente = () => {
    const queryClient = useQueryClient();
    return useMutation(async (updateCliente) => {
        const { data } = await cortesEnergiaApi.put(`/clientes/${updateCliente.clienteId}/`, updateCliente);
        return data.message;
    },
    {
        onSuccess: (message) => {
            queryClient.invalidateQueries(['clienteList']);
            toast.success(message);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || error.message);
        }
    }
    );
}

export const useDeleteCliente = () => {
    const queryClient = useQueryClient()
    return useMutation(async (id)=> {
        const { data } = await cortesEnergiaApi.delete(`/clientes/${id}/`)
        return data.message;
    }, {
        onSuccess: (message) => {
            
            queryClient.invalidateQueries(['clienteList'])
            toast.success(message)
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || error.message)
        }
    }
)
}


