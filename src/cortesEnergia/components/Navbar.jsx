
import { useState } from 'react'
import { useAuthStore } from '../../hooks'
import { useSelector } from 'react-redux'

export const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { startLogout } = useAuthStore()

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión
    startLogout()
  }

  const { userInformation } = useSelector(state => state.auth)
  const { rol } = userInformation

  return (
    <>
      <nav className="bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href='/' className="text-white font-bold text-xl">
                  Cortes de Energia
                </a>
              </div>
              <div className="hidden md:block">
                {
                  rol === 'administrador' && (
                    <div className="ml-10 flex items-baseline space-x-4">
                      <a href='/clientes' className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                        Clientes
                      </a>
                      <a href='/sectores' className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                        Sectores
                      </a>

                    </div>
                  )
                }

                {
                  rol === 'cliente' && (
                    <div className="ml-10 flex items-baseline space-x-4">
                      <a href='/cortes' className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                        Cortes
                      </a>
                    </div>
                  )
                }

              </div>
            </div>
            <div className="hidden md:block">
              <button
                onClick={startLogout}
                className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Cerrar sesión
              </button>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-700 focus:outline-none"
              >
                <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">


            <a href='/clientes' className="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium">
              Clientes
            </a>
            <a href='/sectores' className="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium">
              Sectores
            </a>

            <button
              onClick={handleLogout}
              className="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>
      {children}
    </>

  )
}

