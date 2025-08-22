import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Offline from "./pages/Offline";
import UssdSimulator from "./pages/UssdSimulator";
import MenuBalance from "./pages/MenuBalance";
import MenuLoan from "./pages/MenuLoan";
import MenuReport from "./pages/MenuReport";
import MenuTips from "./pages/MenuTips";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="/ussd-simulator" element={<UssdSimulator />} />
          <Route path="/menu-balance" element={<MenuBalance />} />
          <Route path="/menu-loan" element={<MenuLoan />} />
          <Route path="/menu-report" element={<MenuReport />} />
          <Route path="/menu-tips" element={<MenuTips />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;