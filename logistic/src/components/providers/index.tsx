'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 1,
        },
    }
});

export const Providers = ({ children }: { children: ReactNode }) => (
<>
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
</>
);