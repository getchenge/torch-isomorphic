import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const IndexPage = dynamic({
    app,
    models: () => [
      import('../models/sections.js'),
    ],
    component: () => import('./routes/IndexPage/'),
  });
  const NewPage = dynamic({
    app,
    models: () => [
      import('../models/sections.js'),
    ],
    component: () => import('./routes/NewPage/')
  });
  const SectionPage = dynamic({
    app,
    models: () => [
      import('../models/sections.js'),
    ],
    component: () => import('./routes/SectionPage/')
  });
  const NoMatch = dynamic({
    app,
    component: () => import('./routes/NoMatch/')
  });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/dashboard/" component={IndexPage} />
        <Route exact path="/dashboard/add" component={NewPage} />
        <Route path="/dashboard/:section" component={SectionPage} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
