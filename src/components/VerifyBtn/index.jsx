import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import { Button, Toast } from 'antd-mobile';
import { reqVerifyCode } from '@api/common';

export default class index extends Component {
  static propsTypes = {
    disabled: PropsTypes.bool.isRequired,
    callback: PropsTypes.func.isRequired,
    btnText: PropsTypes.string.isRequired
  }
  componentDidMount() {
    // 图形验证码
    window.verifyCallback = async (res) => {
      if (res.ret === 0) {
        try {
          // 验证成功，客户端验证成功需要进行服务端验证
          await reqVerifyCode(res.randstr, res.ticket);
          // 验证手机号
          this.props.callback();
        } catch (error) {
          Toast.fail(error, 3);
        }
      }
    };
  }

  render() {
    const { disabled, btnText } = this.props;
    return (
      <>
        <Button
          style={{ display: disabled ? 'block' : 'none' }}
          type="warning"
          className="warning-btn"
          disabled
        >
          {btnText}
        </Button>
        <Button
          style={{ display: !disabled ? 'block' : 'none' }}
          id="TencentCaptcha"
          data-appid="2030765311"
          data-cbfn="verifyCallback"
          type="warning"
          className="warning-btn"
        >
          {btnText}
        </Button>
      </>
    );
  }
}
