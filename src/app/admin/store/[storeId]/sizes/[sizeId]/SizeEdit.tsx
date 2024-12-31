'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { categoryService } from '@/services/category.service';
import { SizeColumns } from '../SizeColumns';

export function SizeEdit() {
    const params = useParams();
    const categoryId = params?.categoryId as string | undefined;

    if (!categoryId) {
        return <div>Category ID is not available.</div>;
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['get category', categoryId],
        queryFn: async () => {
            if (!categoryId) throw new Error('Category ID is missing');
            return categoryService.getById(categoryId);
        },
        enabled: Boolean(categoryId),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {(error as Error).message}</div>;

    // return <SizeColumns category={data} />;
}
