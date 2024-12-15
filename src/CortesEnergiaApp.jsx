import React from 'react'
import { AppRouter } from './router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

export const CortesEnergiaApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store} >
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>


  )
}
