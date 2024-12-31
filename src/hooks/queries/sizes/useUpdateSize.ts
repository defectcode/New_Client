import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { sizeService } from '@/services/size.service';

export const useUpdateSize = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSize, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update size'],
    mutationFn: ({ id, data }: { id: string; data: { value: string } }) =>
      sizeService.update(id, data),
    onSuccess: () => {
      // queryClient.invalidateQueries(['get sizes']);
      toast.success('Size updated');
    },
    onError: () => {
      toast.error('Error updating size');
    },
  });

  return { updateSize, isLoadingUpdate };
};
