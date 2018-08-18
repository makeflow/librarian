import {Layout} from 'antd';
import {Provider} from 'mobx-react';
import * as React from 'react';
import {Route, Switch} from 'react-router';

import {conventionStore} from 'stores';
import {styled} from 'theme';

import {Content as HomeContent} from './content';
import {ConventionWithRouter} from './convention';
import {
  Header as HomeHeader,
  HeaderWithRouter as HomeHeaderWithRouter,
} from './header';

const {Header, Content} = Layout;

const Wrapper = styled.div`
  .ant-layout {
    background: transparent;

    .ant-layout-header {
      background: ${props => props.theme.light};
      padding: 0 10px;
    }
  }

  ${HomeHeader.Wrapper} {
    position: fixed;
    height: 90px;
    left: 0;
    right: -20px;
    padding: 0 20px 0 10px;
    z-index: 999;
    display: block;
    background: ${props => props.theme.light};
  }
`;

const homeStore = {
  conventionStore,
};

export class HomeContainer extends React.Component {
  render(): JSX.Element {
    return (
      <Wrapper>
        <Provider {...homeStore}>
          <Layout>
            <Header>
              <HomeHeaderWithRouter />
            </Header>
            <Content style={{marginTop: 20}}>
              <Switch>
                <Route path="/convention" component={ConventionWithRouter} />
                <Route path="/" component={HomeContent} />
              </Switch>
            </Content>
          </Layout>
        </Provider>
      </Wrapper>
    );
  }
}
