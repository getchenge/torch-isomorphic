import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';
import Banner from '../components/Banner';
import Header from '../components/Header';

function findByName(name) {
  return (item) => {
    return item.name === name;
  }
}
function IndexPage({ location, list, loading }) {
  const navs = list && list.length > 0 && list.find(findByName('navigation')).value;
  const pix = list && list.length > 0 && list.find(findByName('slider')).value;
  const header = <Header location={location} navs={navs}></Header>;
  return (
    <MainLayout header={header}>
      <Banner pix={pix} loading={loading} />
    </MainLayout>
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

export default connect(mapStateToProps)(IndexPage);
