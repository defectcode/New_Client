'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { categoryService } from '@/services/category.service';
import { SizeColumns } from '../SizeColumns';

export function SizeEdit() {
    // Extragem parametrii fără generice
    const params = useParams();
    const categoryId = params?.categoryId as string | undefined;

    // Verificăm dacă categoryId există
    if (!categoryId) {
        return <div>Category ID is not available.</div>;
    }

    // Folosim useQuery pentru a obține datele categoriei
    const { data, isLoading, error } = useQuery({
        queryKey: ['get category', categoryId],
        queryFn: async () => {
            if (!categoryId) throw new Error('Category ID is missing');
            return categoryService.getById(categoryId);
        },
        enabled: Boolean(categoryId),
    });

    // Gestionăm stările de încărcare și eroare
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {(error as Error).message}</div>;

    // Returnăm componenta cu datele obținute
    // return <SizeColumns category={data} />;
}
