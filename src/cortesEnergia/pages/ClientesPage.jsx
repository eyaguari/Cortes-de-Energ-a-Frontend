import { Navbar } from "../components/Navbar"
import { FormCliente } from "../components/FormCliente"
import { ListCliente } from "../components/ListCliente"
import { useState } from "react"

export const ClientesPage = () => {

    const [selectedId, setSelectedId] = useState(null)

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar>
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormCliente  clienteId={selectedId} setSelectedId={setSelectedId}/>
                        <ListCliente setSelectedId={setSelectedId}/>  
                    </div>

                </main>
            </Navbar>

        </div>

    )
}
