import {Button, Input, Modal} from 'antd';
import classNames from 'classnames';
import React, {Component, createRef} from 'react';

import {styled} from 'theme';
import {observer} from 'utils/mobx';

const Wrapper = styled.div``;

export interface InputModalProps {
  className?: string;
  visible: boolean;
  title: string;
  loading?: boolean;
  placeholder?: string;
  okButtonTitle?: string;
  cancelButtonTitle?: string;
  onOkButtonClick?(value: string): void;
  onCancelButtonClick?(): void;
}

@observer
export class InputModal extends Component<InputModalProps> {
  inputRef: React.RefObject<Input> = createRef();

  render() {
    let {
      className,
      title,
      visible,
      onCancelButtonClick,
      loading,
      placeholder,
      cancelButtonTitle,
      okButtonTitle,
    } = this.props;

    return (
      <Wrapper className={classNames('InputModal', className)}>
        <Modal
          visible={visible}
          title={title}
          onOk={this.onOkClick}
          width="300px"
          onCancel={onCancelButtonClick}
          footer={[
            <Button key="back" onClick={onCancelButtonClick}>
              {cancelButtonTitle ? cancelButtonTitle : '取消'}
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.onOkClick}
            >
              {okButtonTitle ? okButtonTitle : '确定'}
            </Button>,
          ]}
        >
          <p>
            <Input ref={this.inputRef} placeholder={placeholder} />
          </p>
        </Modal>
      </Wrapper>
    );
  }

  onOkClick = () => {
    let {onOkButtonClick} = this.props;
    let value = this.inputRef.current!.input.value;

    if (onOkButtonClick) {
      onOkButtonClick(value);
    }
  };

  static Wrapper = Wrapper;
}