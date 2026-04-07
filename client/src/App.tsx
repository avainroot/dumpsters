import AppProvider from "@provider";
import { Layout, Loader, Side } from "@components";
import { lazy, Suspense } from "react";
import { Toaster } from "@components/ui/sonner";

const Map = lazy(() => import("./components/Map/Map"));

function App() {
  return (
    <AppProvider>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Map />
        </Suspense>

        <Side />
        <Toaster position="bottom-left" duration={17000} />
      </Layout>
    </AppProvider>
  );
}

export default App;
