import { useAuth } from '../../../hooks/auth.hook';
import { useHttp } from '../../../hooks/http.hook';

export function useRecordsHttp() {
  const { loading, request, error } = useHttp();
  const { token, role } = useAuth();

  async function requestRecords() {
    try {
      const responceRecords = await request({
        url: '/records',
        method: 'get',
        bearerToken: token,
      });

      return responceRecords;
    } catch (e) {}
  }

  async function requestStudents() {
    let resultList = [];

    try {
      const listStudentsId = (
        await request({
          url: '/auth/self',
          method: 'get',
          bearerToken: token,
        })
      ).students;

      for (let studentId of listStudentsId) {
        const responceStudent = await request({
          url: '/auth/' + studentId,
          method: 'get',
          bearerToken: token,
        });

        resultList.push(responceStudent);
      }
    } catch (e) {}

    return resultList;
  }

  async function updateRecord(newDataRecord) {
    try {
      const responceRecord = await request({
        url: '/records/update/' + newDataRecord.id,
        method: 'put',
        bearerToken: token,
        data: newDataRecord,
      });

      return responceRecord;
    } catch (e) {}
  }
  async function createRecord(newDataRecord) {
    try {
      const responceRecord = await request({
        url: '/records/create',
        method: 'post',
        bearerToken: token,
        data: newDataRecord,
      });

      return responceRecord;
    } catch (e) {}
  }
  async function deleteRecord(id) {
    try {
      const responce = await request({
        url: '/records/' + id,
        method: 'delete',
        bearerToken: token,
      });

      return responce;
    } catch (e) {}
  }

  return {
    deleteRecord,
    createRecord,
    updateRecord,
    requestRecords,
    requestStudents,
    loading,
    error,
    role,
  };
}
