import AppProvider from "@provider";
import { Layout, Side } from "@components";
import { Spinner } from "@components/ui/spinner";
import { lazy, Suspense } from "react";
import { Toaster } from "@components/ui/sonner";

const Map = lazy(() => import("./components/Map/Map"));

function App() {
  return (
    <AppProvider>
      <Layout>
        <Suspense
          fallback={
            <div className="flex items-center justify-center flex-1">
              <Spinner className="size-6" />
            </div>
          }
        >
          <Map />
        </Suspense>

        <Side />
        <Toaster position="bottom-left" />
      </Layout>
    </AppProvider>
  );
}

export default App;
