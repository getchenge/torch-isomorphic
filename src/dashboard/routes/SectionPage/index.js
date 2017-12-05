import React from 'react';
import { connect } from 'dva';
import Layout from '../../components/Layout';
// import NavBar from '../../components/NavBar';
import EditSectionForm from '../../components/EditSectionForm';
import { Form } from 'antd';
import styles from './style.scss';

function SectionPage({ dispatch, location, list, loading, match }) {
  const search = location.search.split('?')[1];
  let query;
  let index;
  if (search) {
    let querystr = search.split('&');
    query = querystr.map(query => {
      const k = query.split('=')[0];
      const v = query.split('=')[1];
      if (k === 'index') {
        index = v;
      }
      return { [k]: v };
    });
  }
  const sectionName = match.params.section;
  const WrappedForm = Form.create()(EditSectionForm);
  const section = list.find((section) => {
    return section.name === sectionName;
  });
  console.info('SectionPage__||', section, index, 'match', match);
  if (index && section && section.value && !section.value[index]) {
    index = section.value.length;
  } else if (section && section.value && section.value.length === 1) {
    index = 0;
  }
  console.info('SectionPage__', section, index);
  const right = <WrappedForm section={section} index={index} />;

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

export default connect(mapStateToProps)(SectionPage);
