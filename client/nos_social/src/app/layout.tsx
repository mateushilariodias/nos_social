'use client'

import { UserContextProvider } from '@/context/userContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function FeedUserLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  return (
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>{children}</UserContextProvider>
        </QueryClientProvider>
  );
}