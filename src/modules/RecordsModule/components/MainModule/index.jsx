import { useEffect, useState } from 'react';
import styles from './style.module.scss';

import Loading from '../../../../ui/Loading';
import Modal from '../../../../components/Modal';
import Table from '../../../../components/Table';

import tamplateDataModal, { titles } from '../../constants/tamplateDataModal';
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
  { key: 0, value: 'Січень' },
  { key: 1, value: 'Лютий' },
  { key: 2, value: 'Березень' },
  { key: 3, value: 'Квітень' },
  { key: 4, value: 'Травень' },
  { key: 5, value: 'Червень' },
  { key: 6, value: 'Липень' },
  { key: 7, value: 'Серпень' },
  { key: 8, value: 'Вересень' },
  { key: 9, value: 'Жовтень' },
  { key: 10, value: 'Листопад' },
  { key: 11, value: 'Грудень' },
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
  const [renderList, setRenderList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [regimModal, setRegimModal] = useState('update');
  const [dataModal, setDataModal] = useState([]);
  const [filterDate, setFilterDate] = useState({
    start_date: undefined,
    end_date: undefined,
  });

  useEffect(() => {
    loadRecords();
  }, []);

  async function loadRecords() {
    try {
      const params = {};
      if (filterDate.start_date) {
        params.start_date = filterDate.start_date;
      }
      if (filterDate.end_date) {
        params.end_date = filterDate.end_date;
      }

      const responceRecords = await requestRecords(params);
      const responceStudents = await requestStudents();

      let formatedStudents = [];

      for (let student of responceStudents) {
        const studentRecords = responceRecords.filter((record, ind) => {
          return record?.to?._id === student.id;
        });

        formatedStudents.push({
          name: student.name,
          recordsInfo: studentRecords,
        });
      }

      setRecords(responceRecords);
      setStudents(formatedStudents);

      // const formatedList = makeFormatedList(responceRecords.resultRecords);

      // setRenderList(formatedList);
    } catch (e) {
      console.error(e);
    }
  }

  function makeFormatedList(inputList) {
    const resultList = inputList.map((record) => {
      return {
        date: new Date(record.date).toLocaleDateString(),
        money_account: record.money_account,
        source_from: record.source_from,
        income: record.income + ' грн.',
        costs: record.costs + ' грн.',
        already_paid: record.already_paid + ' грн.',
      };
    });

    return resultList;
  }

  function handleClickRow(index) {
    setRegimModal('update');

    const tempDataModal = JSON.parse(JSON.stringify(tamplateDataModal));

    for (const [key, value] of Object.entries(records.resultRecords[index])) {
      if (tempDataModal[key]) {
        let formatedValue = value ?? 'Не задано';

        switch (key) {
          case 'date':
            formatedValue = new Date(formatedValue).toLocaleDateString('en-CA');
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

    if (regimModal === 'update') {
      await updateRecord(formatedValues);
    } else {
      await createRecord(formatedValues);
    }

    handleCloseModal();

    await loadRecords();
  }

  function handleChangeStartDate(newDate) {
    setFilterDate({ ...filterDate, start_date: newDate });
  }

  function handleChangeEndDate(newDate) {
    setFilterDate({ ...filterDate, end_date: newDate });
  }

  function handleApplyFilter() {
    loadRecords();
  }

  function handleClickCreate() {
    setRegimModal('create');

    const tempDataModal = JSON.parse(JSON.stringify(tamplateDataModal));

    setDataModal(Object.values(tempDataModal));
    setShowModal(true);
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
            <SelectInput name={'year'} label={'Рік'} options={yearsOptions} />
            <SelectInput name={'month'} label={'Місяць'} options={monthOptions} />
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
                            new Date('2023-06-' + day).toDateString()
                          );
                        });

                        if (!record) {
                          return <td key={day}></td>;
                        } else {
                          return <td key={day}>{record.mark}</td>;
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
