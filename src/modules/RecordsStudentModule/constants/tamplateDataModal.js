const tamplateDataModal = {
  _id: { name: '_id', title: 'id', value: null, type: 'text', type_display: 'none' },
  from: { name: 'from', title: 'Ким назначено', value: null, type: 'text', type_display: 'none' },
  to: { name: 'to', title: 'Кому назначено', value: null, type: 'text', type_display: 'none' },
  date: { name: 'date', title: 'Дата', value: null, type: 'date', type_display: 'readonly' },
  status: {
    name: 'status',
    title: 'Статус',
    value: 'Не задано',
    type: 'select',
    type_display: 'all',
    options: [
      { key: null, value: 'Не задано' },
      { key: 'Оцінено', value: 'Оцінено' },
      { key: 'Присутній', value: 'Присутній' },
      { key: 'Не присутній', value: 'Не присутній' },
      { key: 'Зауваження', value: 'Зауваження' },
      { key: 'Інше', value: 'Інше' },
    ],
  },
  comment: {
    name: 'comment',
    title: 'Коментар',
    value: '',
    type: 'text',
    type_display: 'all',
    multiple: true,
  },
  mark: {
    name: 'mark',
    title: 'Оцінка',
    value: 0,
    type: 'number',
    type_display: 'all',
  },
};

export default tamplateDataModal;
