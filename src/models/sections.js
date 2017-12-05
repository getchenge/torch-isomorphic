import queryString from 'query-string';
import * as sectionsService from '../services/sections';

export default {
  namespace: 'sections',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(sectionsService.fetch);
      // console.info('*fetch', data, headers);
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(sectionsService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: values }, { call, put }) {
      yield call(sectionsService.patch, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(sectionsService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.sections);
      yield put({ type: 'fetch', payload: { page: 1 } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        // if (pathname === '/dashboard/') {
        //   dispatch({ type: 'fetch', payload: query });
        // }
        dispatch({ type: 'fetch', payload: query });
      });
    },
  },
};
