import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { useSelector } from 'react-redux'


export const HomePage = () => {

  const { userInformation }   =  useSelector(state => state.auth)

  const { username, rol } = userInformation

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Bienvenido, {username} </h2>
                <p className="text-xl text-gray-600 mb-8">Tu plataforma de gestión de clientes y horarios de cortes por sectores</p>
                {
                  rol === 'administrador' && (
                    <div className="flex justify-center space-x-4">
                      <Link to="/sectores" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                        Ver Sectores
                      </Link>
                      <Link to="/clientes" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        Ver Clientes
                      </Link>
                    </div>
                  )
                }
                {
                  rol === 'cliente' && (
                    <Link to="/cortes" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                      Ver Cortes
                    </Link>
                  )
                }
              </div>
            </div>
          </div>
        </main>
      </Navbar>
    </div>
  )
}

