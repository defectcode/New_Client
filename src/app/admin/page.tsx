'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { Store } from '@/app/admin/store/[storeId]/Store';
import Admin from './components/Admin';

export default function PageAdmin() {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Admin/>
        </QueryClientProvider>
    );
}
