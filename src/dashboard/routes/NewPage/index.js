import React from 'react';
import { connect } from 'dva';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import NewSectionForm from '../../components/NewSectionForm';
import { Form } from 'antd';
import styles from './style.scss';

function NewPage({ dispatch, location, history, list, loading }) {
  const WrappedForm = Form.create()(NewSectionForm);
  const right = <WrappedForm history={history} />;

  return (
    <Layout location={location} list={list} right={right}></Layout>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.sections;
  return {
    loading: state.loading.models.sections,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(NewPage);
