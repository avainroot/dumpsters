import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const AppProvider = (props: PropsWithChildren) => {
  return <QueryClientProvider client={queryClient} {...props} />;
};

export default AppProvider;
