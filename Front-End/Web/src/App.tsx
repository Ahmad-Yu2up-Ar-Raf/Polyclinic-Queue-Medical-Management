import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router"
import { router } from "./router"
import { Toaster } from "./components/ui/fragments/shadcn-ui/sonner"

import { TooltipProvider } from "./components/ui/fragments/shadcn-ui/tooltip"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 100,
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
