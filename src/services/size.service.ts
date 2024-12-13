import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors';
import { API_URL } from '@/config/api.config';
import { STORE_URL } from '@/config/url.config';
import { ISize, ISizeInput } from '@/shared/types/size.interface';

class SizeService {
  async getAll() {
    const { data } = await axiosClassic<ISize[]>({
      url: STORE_URL.sizes(),
      method: 'GET',
    });
    return data;
  }

  async getByStoreId(storeId: string) {
    const { data } = await axiosClassic<ISize[]>({
      url: `${API_URL.sizes(`/by-storeId/${storeId}`)}`, // Correct the API URL
      method: 'GET',
    });
    return data;
  }
  

  async getById(id: string) {
    const { data } = await axiosClassic<ISize>({
      url: STORE_URL.sizes(`/by-id/${id}`),
      method: 'GET',
    });
    return data;
  }

  async create(data: ISizeInput, storeId: string) {
    return axiosWithAuth.post(`${API_URL.sizes(`/${storeId}`)}`, data); // Ensure the correct API URL
  }
  


  

  async update(id: string, data: ISizeInput) {
    const { data: updatedSize } = await axiosWithAuth<ISize>({
      url: STORE_URL.sizes(`/${id}`),
      method: 'PUT',
      data,
    });
    return updatedSize;
  }

  async delete(id: string) {
    const { data: deletedSize } = await axiosWithAuth<ISize>({
      url: STORE_URL.sizes(`/${id}`),
      method: 'DELETE',
    });
    return deletedSize;
  }
}

export const sizeService = new SizeService();
