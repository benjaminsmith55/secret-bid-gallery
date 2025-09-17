import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import StaticIndex from "./pages/StaticIndex";
import NotFound from "./pages/NotFound";

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="space-x-2">
          <button 
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}

const AppMinimal = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<StaticIndex />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
      </TooltipProvider>
    </ErrorBoundary>
  );
};

export default AppMinimal;
