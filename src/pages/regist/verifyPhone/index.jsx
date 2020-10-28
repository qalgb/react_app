import React, { Component } from 'react';
import { NavBar, Icon, InputItem, WingBlank, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { reqVerifyPhone } from '@api/regist';
import './index.css';

import VerifyBtn from '@comps/VerifyBtn'

class verifyPhone extends Component {
  state = {
    isDisabled: true,
  };
  // 弹框
  componentDidMount() {
    Modal.alert(
      '注册协议及隐私政策',
      <span className="policy-text">
        在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
        <strong className="policy-strong-text">
          请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）
        </strong>
        ：<span className="policy-content">《硅谷用户注册协议》</span>
        <span className="policy-content">《硅谷隐私政策》</span>
      </span>,
      [
        {
          text: '不同意',
          onPress: () => console.log('cancel'),
        },
        {
          text: '同意',
          style: { backgroundColor: 'red', color: '#fff' },
        },
      ]
    );
  }
  // 用户输入数据就会触发
  validator = (rule, value, callback) => {
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|199)[0-9]{8}$/;
    let isDisabled = true;

    if (reg.test(value)) {
      isDisabled = false;
    }

    this.setState({
      isDisabled,
    });

    callback();
  };

  // 验证手机号
  verifyPhone = async () => {
    try {
      // 获取单个表单项值
      const phone = this.props.form.getFieldValue('phone');
      // 获取所有表单项的值
      // const value = this.props.form.getFieldsValue()
      await reqVerifyPhone(phone);
      // 提示弹框，确认请求短信验证码
      console.log('全部验证通过')
    } catch (error) {
      // console.log('error', error);
      Toast.fail(error, 3)
    }
  };

  render () {
    const { getFieldProps } = this.props.form;
    const {isDisabled} = this.state
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" className="left-arrow" />}
          onLeftClick={() => console.log('onLeftClick')}
        >
          硅谷注册
        </NavBar>
        <WingBlank>
          <div className="verify-phone-input">
            <InputItem
              {...getFieldProps('phone', {
                // 表单验证规则
                rules: [{ validator: this.validator }],
              })}
              clear
              placeholder="请输入手机号"
            >
              <div className="verify-phone-prefix">
                <span>+86</span>
                <Icon type="down" />
              </div>
            </InputItem>
          </div>
          <VerifyBtn disabled={isDisabled} callback={this.verifyPhone} btnText="下一步"></VerifyBtn>
        </WingBlank>
      </div>
    );
  }
}

export default createForm()(verifyPhone);
