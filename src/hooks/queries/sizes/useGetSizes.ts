import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { sizeService } from '@/services/size.service';

export const useGetSizes = () => {
  const params = useParams<{ storeId: string }>();

  const { data: sizes, isLoading } = useQuery({
    queryKey: ['get sizes for store dashboard', params?.storeId],
    queryFn: () => {
      if (!params?.storeId) throw new Error('Store ID is missing');
      return sizeService.getByStoreId(params.storeId);
    },
    enabled: !!params?.storeId, // Only run if storeId exists
  });

  return { sizes, isLoading };
};
