import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';

function IndexPage({ location, list, loading }) {
  console.info('IndexPage', list);
  // const navs = list.nav && list.nav.content;
  // const pix = list.sliders && list.sliders.content;
  // const left = <NavBar location={location} list={list} />;
  const right = <div>index</div>;
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

export default connect(mapStateToProps)(IndexPage);
