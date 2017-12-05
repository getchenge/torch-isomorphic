import React, { Component } from 'react';
import { Form, Select, Icon, Input, Button, Row, Col, Cascader, InputNumber } from 'antd';
import styles from './styles.scss';
import { connect } from 'dva';
import { message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

let uuid = 0;

class NewSectionForm extends Component {
  componentDidMount() {
    // this.props.form.validateFields(); //validate at begining
  }
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('fields');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      fields: keys.filter(key => key !== k)
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    const keys = form.getFieldValue('fields');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      fields: nextKeys
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const dispatch = this.props.dispatch;
    const values = this.props.form.getFieldsValue();
    dispatch({
      type: 'sections/create',
      payload: values,
    }).then(() => {
      message.success('创建成功');
      this.props.history.push(`/dashboard/`);
    });
  }
  render() {
    const { getFieldDecorator, getFieldValue, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
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
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const submitLayout = {
      wrapperCol: { span: 14, offset: 6 },
    };
    getFieldDecorator('fields', { initialValue: [0] });
    const fields = getFieldValue('fields');
    const fieldsItem = fields.map((field, index) => {
      return (
        <div className={styles.card} key={field}>
          <FormItem
            {...formItemLayout}
            label="属性名称"
            hasFeedback
          >
            {getFieldDecorator(`caption-${field}`, {
              rules: [{ required: true, message: '请输入属性名称' }]
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="属性key"
            hasFeedback
          >
            {getFieldDecorator(`name-${field}`, {
              rules: [{ required: true, message: '属性key' }]
            })(<Input placeholder="英文" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="属性类型"
          >
            {getFieldDecorator(`type-${field}`, { initialValue: 'String' })(
              <Select>
                <Option value="String">字符串</Option>
                <Option value="Select">选项</Option>
                <Option value="Object">对象</Option>
              </Select>
            )}
          </FormItem>
          {fields.length > 1 ? (
            <Icon
              className={styles['dynamic-delete-button']}
              type="minus-circle-o"
              disabled={fields.length === 1}
              onClick={() => this.remove(field)}
            />
          ) : null}
        </div>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="模块名称"
          hasFeedback
        >
          {getFieldDecorator('caption', {
            rules: [{ required: true, message: '请输入模块名称' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="模块key"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入模块key' }, { pattern: /[a-zA-Z]/, message: '请输入英文' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="location"
          hasFeedback
        >
          {getFieldDecorator('location')(<Input placeholder="路由" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是否是列表"
        >
          {getFieldDecorator('isList', {
            initialValue: 'no',
          })(
            <Select>
              <Option value="no">否</Option>
              <Option value="yes">是</Option>
            </Select>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="属性"></FormItem>
        <Row>
          <Col className={styles.group} sm={15} xs={24} offset={5}>
            {fieldsItem}
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                <Icon type="plus" /> 添加新属性
            </Button>
            </FormItem>
          </Col>
        </Row>
        <FormItem {...submitLayout}>
          <Button className={styles.submit} type="primary" htmlType="submit">添加</Button>
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

// export default NewSectionForm;
export default connect(mapStateToProps)(NewSectionForm);
