import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"
import { ClientesPage, CortesPage, HomePage, SectoresPage } from "../cortesEnergia"
import {ProtectedRoute} from './ProtectedRoute';

export const AppRouter = () => {

  const { status, checkToken } = useAuthStore()

  useEffect(() => {
    checkToken()
  }, [])

  if (status === 'checking') {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl">Cargando...</p>
      </div>
    )
  }

  return (
    <Routes>
      {
        status === 'not-authenticated'
          ? (
            <>
              <Route path="/auth/*" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/sectores" element={<ProtectedRoute element={<SectoresPage />} allowedRoles={['administrador']} />} />
              <Route path="/clientes" element={<ProtectedRoute element={<ClientesPage />} allowedRoles={['administrador']} />} />
              <Route path="/cortes" element={<ProtectedRoute element={<CortesPage />} allowedRoles={['cliente']} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )
      }
    </Routes>
  )
}