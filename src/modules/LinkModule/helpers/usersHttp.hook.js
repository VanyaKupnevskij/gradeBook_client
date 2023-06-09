import { useAuth } from '../../../hooks/auth.hook';
import { useHttp } from '../../../hooks/http.hook';

export function useUsersHttp() {
  const { loading, request, error } = useHttp();
  const { token } = useAuth();

  async function requestUsers() {
    try {
      const responce = await request({
        url: '/auth',
        method: 'get',
        bearerToken: token,
      });

      return responce;
    } catch (e) {}
  }

  async function updateUser(id, data) {
    try {
      const responce = await request({
        url: '/auth/' + id,
        method: 'put',
        data: data,
        bearerToken: token,
      });

      return responce;
    } catch (e) {}
  }

  async function deleteUser(id) {
    try {
      const responce = await request({
        url: '/auth/' + id,
        method: 'delete',
        bearerToken: token,
      });

      return responce;
    } catch (e) {}
  }

  return {
    deleteUser,
    requestUsers,
    updateUser,
    loading,
    error,
  };
}
