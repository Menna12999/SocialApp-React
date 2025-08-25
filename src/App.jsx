import { RouterProvider } from "react-router-dom"
import { routes } from "./routing/AppRoutes"
import AuthContextProvider from "./context/AuthContext"
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";




const queryClient = new QueryClient()
function App() {


  return (
    <> 
  <QueryClientProvider client={queryClient}>
  <AuthContextProvider>
  
      <RouterProvider router={ routes}>
          
       
         </RouterProvider>
         <ToastContainer/>

  </AuthContextProvider>
  </QueryClientProvider> 
  </>
  )

  
}

export default App
