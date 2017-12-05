import React, { Component } from 'react';
import { Form, Select, Icon, Input, Button, Row, Col, Cascader, InputNumber } from 'antd';
import styles from './styles.scss';
import { connect } from 'dva';
import { message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class editSectionForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const { dispatch } = this.props;
    const values = this.props.form.getFieldsValue();
    let { section, index } = this.props;
    section.value = Object.assign([], section.value);
    console.info('handleSubmit', index, section);
    section.value[index || 0] = values;
    console.info('submit_section___', section);

    dispatch({
      type: 'sections/patch',
      payload: { section },
    }).then(() => {
      message.success('创建成功', 2);
    });
  }

  render() {
    const { section, index } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const submitLayout = {
      wrapperCol: { span: 14, offset: 6 },
    };
    const fields = section && section.fields;
    let item;
    // console.info('section##', section, typeof index, section && section.value[0]);
    if (index >= 0 && section && section.value) {
      item = section.value[index];
      // console.info('edit_section_form', item, section.value, index, '##');
    }
    // console.info('edit_form', index, item);
    const fieldItems = fields && fields.map((field, idx) => {
      return (
        <FormItem
          {...formItemLayout}
          label={field.caption}
          key={idx}
        >
          {getFieldDecorator(`${field.name}`, {
            rules: [{ required: true, message: `请输入${field.caption}` }],
            initialValue: item && item[field.name] || ''
          })(<Input name={field.name} />)}
        </FormItem>
      );
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        {fieldItems}
        <FormItem {...submitLayout}>
          <Button className={styles.submit} type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
  }
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

export default connect(mapStateToProps)(editSectionForm);
