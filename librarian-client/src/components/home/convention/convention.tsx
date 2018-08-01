import {Col, Layout, Row} from 'antd';
// import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {ConventionIndexStore} from 'stores';
import {SideNav} from './@convention-side-nav';

const {Content, Sider} = Layout;

export interface ConventionProps {
  conventionIndex: ConventionIndexStore;
}

export class Convention extends React.Component<ConventionProps> {
  render() {
    return (
      <Row>
        <Col
          xs={{span: 24, offset: 0}}
          sm={{span: 22, offset: 1}}
          md={{span: 20, offset: 2}}
          lg={{span: 18, offset: 3}}
          xl={{span: 16, offset: 4}}
          className="header-nav"
        >
          <Layout>
            <Sider
              style={{
                overflow: 'scroll-y',
                height: '100hv',
                position: 'fixed',
                backgroundColor: 'transparent',
              }}
            >
              <SideNav {...this.props} />
            </Sider>
            <Content style={{margin: '24px 16px 0', overflow: 'auto'}}>
              <div
                style={{padding: 24, background: '#fff', textAlign: 'center'}}
              >
                ...
                <br />
                Really
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                long
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                content
              </div>
            </Content>
          </Layout>
        </Col>
      </Row>
    );
  }
}
