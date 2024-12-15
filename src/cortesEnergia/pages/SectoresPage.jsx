import { Navbar } from "../components/Navbar"
import { FormSector } from "../components/FormSector"
import { ListSector } from "../components/ListSector"
import { useState } from "react"

export const SectoresPage = () => {
    const [ selectedId, setSelectedId ] = useState(null)

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar>
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormSector sectorId={selectedId} setSelectedId={setSelectedId} />
                        <ListSector onSelectSector={setSelectedId} />  
                    </div>

                </main>
            </Navbar>

        </div>

    )
}
