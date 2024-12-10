import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { sizeService } from '@/services/size.service';

export const useDeleteSize = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteSize, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete size'],
    mutationFn: (id: string) => sizeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries('get sizes');
      toast.success('Size deleted');
    },
    onError: () => {
      toast.error('Error deleting size');
    },
  });

  return { deleteSize, isLoadingDelete };
};
