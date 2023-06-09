import styles from './style.module.scss';

import Loading from '../../../../ui/Loading';

import { useEffect, useState } from 'react';
import { useUsersHttp } from '../../helpers/usersHttp.hook';

function LinkModule() {
  const { loading, error, deleteUser, requestUsers, updateUser } = useUsersHttp();

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const responceUsers = await requestUsers();

    let tempListTeachers = [];
    let tempListStudents = [];

    for (let user of responceUsers) {
      if (user.role === 'teacher') {
        tempListTeachers.push(user);
      } else if (user.role === 'student') {
        tempListStudents.push(user);
      }
    }

    setTeachers(tempListTeachers);
    setStudents(tempListStudents);
  }

  async function handleClickDelete(id) {
    await deleteUser(id);

    await loadUsers();
  }

  async function handleSelectStudent(teacher, studentId) {
    if (teacher.students.some((stud) => stud === studentId)) {
      teacher.students.splice(teacher.students.indexOf(studentId), 1);
    } else {
      teacher.students.push(studentId);
    }

    await updateUser(teacher._id, {
      name: teacher.name,
      role: teacher.role,
      name_subject: teacher.name_subject,
      students: teacher.students,
    });

    await loadUsers();
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.root}>
      {error ? (
        <div className={styles.error_message}>{error.message}</div>
      ) : (
        teachers.map((teacher) => {
          return (
            <div key={teacher._id} className={styles.teacher}>
              <div className={styles.teacher__header}>
                <h2 className={styles.teacher__title}>
                  Ім'я:
                  <i> {teacher.name}</i>
                  <br />
                  Предмет:
                  <i> {teacher.name_subject}</i>
                </h2>
                <span
                  className={styles.teacher__delete}
                  onClick={() => handleClickDelete(teacher._id)}></span>
              </div>
              <ul className={styles.list_student}>
                {students.map((student) => {
                  return (
                    <li key={student._id} className={styles.student}>
                      <span
                        className={`${styles.student__select} ${
                          teacher.students.some((stud) => stud === student._id)
                            ? styles.student__select_active
                            : ''
                        }`}
                        onClick={() => handleSelectStudent(teacher, student._id)}></span>
                      <p className={styles.student__text}>
                        {student.name} {'<' + student.email + '>'}
                      </p>
                      <span
                        className={styles.student__delete}
                        onClick={() => handleClickDelete(student._id)}></span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}

export default LinkModule;
