import { useEffect, useState } from 'react';
import styles from './style.module.scss';

import Loading from '../../../../ui/Loading';
import Modal from '../../../../components/Modal';

import tamplateDataModal from '../../constants/tamplateDataModal';
import { useRecordsHttp } from '../../helpers/recordsHttp.hook';
import SelectInput from '../../../../ui/SelectInput';

const daysListMarks = Array(31)
  .fill(0)
  .map((day, index) => index + 1);

const yearsOptions = Array(30)
  .fill({ key: 2010, value: 2010 })
  .map((day, index) => {
    const year = day.value + index;
    return { key: year, value: year };
  });

const monthOptions = [
  { key: 1, value: 'Січень' },
  { key: 2, value: 'Лютий' },
  { key: 3, value: 'Березень' },
  { key: 4, value: 'Квітень' },
  { key: 5, value: 'Травень' },
  { key: 6, value: 'Червень' },
  { key: 7, value: 'Липень' },
  { key: 8, value: 'Серпень' },
  { key: 9, value: 'Вересень' },
  { key: 10, value: 'Жовтень' },
  { key: 11, value: 'Листопад' },
  { key: 12, value: 'Грудень' },
];

function RecordsModule() {
  const {
    loading,
    error,
    role,
    deleteRecord,
    createRecord,
    updateRecord,
    requestRecords,
    requestStudents,
  } = useRecordsHttp();

  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [regimModal, setRegimModal] = useState('update');
  const [dataModal, setDataModal] = useState([]);
  const [filterDate, setFilterDate] = useState({
    year: new Date(Date.now()).getFullYear(),
    month: new Date(Date.now()).getMonth() + 1,
  });

  useEffect(() => {
    loadRecords();
  }, []);

  async function loadRecords() {
    try {
      const responceRecords = await requestRecords();
      const responceStudents = await requestStudents();

      const formatedStudents = makeFormatedList(responceRecords, responceStudents);

      setRecords(responceRecords);
      setStudents(formatedStudents);
    } catch (e) {
      console.error(e);
    }
  }

  function makeFormatedList(records, students) {
    let resultList = [];

    for (let student of students) {
      const studentRecords = records.filter((record, ind) => {
        return record?.to?._id === student.id;
      });

      resultList.push({
        _id: student.id,
        name: student.name,
        recordsInfo: studentRecords,
      });
    }

    return resultList;
  }

  function handleClickCell({ isCreate, recordsInfo }) {
    if (isCreate) {
      setRegimModal('create');
    } else {
      setRegimModal('update');
    }

    const tempDataModal = JSON.parse(JSON.stringify(tamplateDataModal));

    for (const [key, value] of Object.entries(recordsInfo)) {
      if (tempDataModal[key]) {
        let formatedValue = value ?? 'Не задано';

        switch (key) {
          case 'date':
            formatedValue = new Date(formatedValue).toLocaleDateString('en-CA');
            break;
          case 'from':
            formatedValue = value?._id ?? null;
            break;
          case 'to':
            formatedValue = value?._id ?? null;
            break;
        }

        tempDataModal[key].value = formatedValue;
      }
    }

    setDataModal(Object.values(tempDataModal));
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  async function handleClickDelete(id) {
    handleCloseModal();

    await deleteRecord(id);

    await loadRecords();
  }

  async function handleSubmitModal(newValues) {
    const formatedValues = {};

    for (let parameter of newValues) {
      formatedValues[parameter.name] = parameter.value;
    }

    if (regimModal === 'update') {
      await updateRecord(formatedValues);
    } else {
      await createRecord(formatedValues);
    }

    handleCloseModal();

    await loadRecords();
  }

  function handleChangeYear(year) {
    setFilterDate({ ...filterDate, year });
  }

  function handleChangeMonth(month) {
    setFilterDate({ ...filterDate, month });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.root}>
      {showModal && (
        <Modal
          title={'Деталі запису'}
          datas={dataModal}
          onClose={handleCloseModal}
          onChange={handleSubmitModal}
          onClickDelete={handleClickDelete}
          isInput
          hasDelete
          regimModal={regimModal}
        />
      )}
      {error ? (
        <div className={styles.error_message}>{error.message}</div>
      ) : (
        <>
          <div className={styles.top_control}>
            <SelectInput
              name={'year'}
              label={'Рік'}
              options={yearsOptions}
              initValue={filterDate.year}
              onChange={handleChangeYear}
            />
            <SelectInput
              name={'month'}
              label={'Місяць'}
              options={monthOptions}
              initValue={filterDate.month}
              onChange={handleChangeMonth}
            />
          </div>

          <div className={styles.table_wrapper}>
            <table>
              <thead>
                <tr key={0}>
                  <th key={0} className={styles.td_name}>
                    Ім'я
                  </th>
                  {daysListMarks.map((day) => {
                    return <th key={day}>{day}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  return (
                    <tr key={student._id}>
                      <td key={0} className={styles.td_name}>
                        {student.name}
                      </td>
                      {daysListMarks.map((day) => {
                        const record = student.recordsInfo.find((record) => {
                          return (
                            new Date(record.date).toDateString() ===
                            new Date(`${filterDate.year}-${filterDate.month}-${day}`).toDateString()
                          );
                        });

                        if (!record) {
                          return (
                            <td
                              key={day}
                              onClick={() =>
                                handleClickCell({
                                  isCreate: true,
                                  recordsInfo: {
                                    _id: null,
                                    from: null,
                                    to: { _id: student._id },
                                    date: new Date(`${filterDate.year}-${filterDate.month}-${day}`),
                                    status: 'Не вказано',
                                    comment: '',
                                    mark: 0,
                                  },
                                })
                              }></td>
                          );
                        } else {
                          return (
                            <td
                              key={day}
                              onClick={() =>
                                handleClickCell({
                                  isCreate: false,
                                  recordsInfo: record,
                                })
                              }>
                              {record.mark}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <Table
            titles={titles}
            contents={renderList}
            onClick={handleClickRow}
            onClickCreate={handleClickCreate}
            onChangeStartDate={handleChangeStartDate}
            onChangeEndDate={handleChangeEndDate}
            onApplyFilter={handleApplyFilter}
            startDateValue={filterDate.start_date}
            endDateValue={filterDate.end_date}
            typeFileter="date"
            hasCreate
          /> */}
        </>
      )}
    </div>
  );
}

export default RecordsModule;
