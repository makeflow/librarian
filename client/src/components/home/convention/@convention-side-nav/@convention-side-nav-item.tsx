import {message} from 'antd';
import classNames from 'classnames';
import {action, observable} from 'mobx';
import React, {Component, createRef} from 'react';
import ReactDOM from 'react-dom';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';

import {fetchErrorMessage} from 'services/api-service';
import {ConventionService} from 'services/convention-service';
import {AuthStore} from 'stores/auth-store';
import {ConventionIndexConventionNode} from 'stores/convention-store';
import {styled} from 'theme';
import {collapseToEnd} from 'utils/dom';
import {inject, observer} from 'utils/mobx';

import {
  CancelBlocker,
  ConventionSideNavDeleteBtn,
  ConventionSideNavEditBtn,
  ConventionSideNavEditableTitle,
} from './@convention-side-nav-tools';
import {ConventionSideNavShiftBtn} from './@convention-side-nav-tools/convention-side-nav-shift-btn';

const Wrapper = styled.li`
  color: ${props => props.theme.text.navRegular};
  position: relative;
  font-size: 14px;
  font-weight: 400;
  padding-top: 8px;
  padding-bottom: 8px;
  list-style-type: none;
  display: block;

  a {
    color: ${props => props.theme.text.navRegular};
    text-decoration: none;
    display: block;

    &:hover {
      color: ${props => props.theme.accent()};
    }

    &.active {
      color: ${props => props.theme.accent()};
    }
  }

  & > ${ConventionSideNavShiftBtn.Wrapper} {
    position: absolute;
    right: 20px;
    top: 8px;
  }

  ${ConventionSideNavEditableTitle.Wrapper} {
    &.rename-mode {
      color: ${props => props.theme.text.regular};
    }
  }
`;

export interface ConventionSideNavItemProps extends RouteComponentProps<any> {
  className?: string;
  node: ConventionIndexConventionNode;
}

@observer
export class ConventionSideNavItem extends Component<
  ConventionSideNavItemProps
> {
  @inject
  authStore!: AuthStore;

  @inject
  conventionService!: ConventionService;

  @observable
  showShiftButton = false;

  @observable
  renameMode = false;

  @observable
  renameLoading = false;

  @observable
  itemTitle = this.props.node.entry.title;

  renameCancelBlocker?: CancelBlocker;

  renameBlurTimer: any;

  itemTitleRef: React.RefObject<any> = createRef();

  render(): JSX.Element {
    let {
      className,
      node: {entry},
    } = this.props;

    return (
      <Wrapper
        className={classNames('convention-side-nav-item', className)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <NavLink to={`/convention/${entry.id}`}>
          <ConventionSideNavEditableTitle
            renameMode={this.renameMode}
            setRenameMode={this.setRenameMode}
            getRenameModeCancelBlocker={this.setUpRenameModeCancelBlocker}
            onChange={this.onTitleChange}
            onFinish={this.onRenameFinishButtonClick}
            title={entry.title}
            ref={this.itemTitleRef}
          />
          <ConventionSideNavEditBtn
            show={this.showShiftButton && this.authStore.isLoggedIn}
            editMode={this.renameMode}
            editLoading={this.renameLoading}
            onClick={this.onRenameButtonClick}
            onFinishClick={this.onRenameFinishButtonClick}
          />
          <ConventionSideNavDeleteBtn
            show={
              this.showShiftButton &&
              this.authStore.isLoggedIn &&
              !this.renameMode
            }
            onClick={this.onDeleteButtonClick}
          />
        </NavLink>
        <ConventionSideNavShiftBtn
          show={this.showShiftButton && this.authStore.isLoggedIn}
          upOnclick={this.onUpShiftButtonOnclick}
          downOnclick={this.onDownShiftButtonOnclick}
        />
      </Wrapper>
    );
  }

  @action
  onMouseEnter = (): void => {
    this.showShiftButton = true;
  };

  @action
  onMouseLeave = (): void => {
    this.showShiftButton = false;
  };

  @action
  setRenameMode = (renameMode: boolean): void => {
    this.renameMode = renameMode;
  };

  setUpRenameModeCancelBlocker = (blocker: CancelBlocker): void => {
    this.renameCancelBlocker = blocker;
  };

  onTitleChange = (value: string): void => {
    this.itemTitle = value;
  };

  setTitleOnFocus(): void {
    let titleDom = ReactDOM.findDOMNode(
      this.itemTitleRef.current,
    ) as HTMLDivElement;

    titleDom.focus();

    collapseToEnd(titleDom);
  }

  @action
  onRenameButtonClick = (): void => {
    this.renameMode = true;

    setTimeout(() => {
      this.setTitleOnFocus();
    }, 100);
  };

  @action
  onRenameFinishButtonClick = async (): Promise<void> => {
    if (this.renameCancelBlocker) {
      this.renameCancelBlocker();
    }

    this.renameLoading = true;

    let {
      node: {entry},
    } = this.props;

    try {
      await this.conventionService.renameConvention(entry.id, this.itemTitle);

      this.renameMode = false;
    } catch (error) {
      let errorMessage = fetchErrorMessage(error);

      message.error(errorMessage);
    }

    this.renameLoading = false;
  };

  onDeleteButtonClick = async (): Promise<void> => {
    let {
      node: {entry},
    } = this.props;

    try {
      await this.conventionService.deleteConvention(entry.id);
    } catch (error) {
      let errorMessage = fetchErrorMessage(error);

      message.error(errorMessage);
    }
  };

  onUpShiftButtonOnclick = async (): Promise<void> => {
    await this.shiftConvention(-2);
  };

  onDownShiftButtonOnclick = async (): Promise<void> => {
    await this.shiftConvention(1);
  };

  async shiftConvention(offset: number): Promise<void> {
    let {
      node: {
        entry: {id, orderId},
      },
    } = this.props;

    try {
      await this.conventionService.shiftConvention(id, orderId + offset);
    } catch (error) {
      let errorMessage = fetchErrorMessage(error);

      message.error(errorMessage);
    }
  }

  static Wrapper = Wrapper;
}

export const ConventionSideNavItemWithRouter = withRouter(
  ConventionSideNavItem,
);
