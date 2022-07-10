import {Redirect, Route, Switch} from 'react-router-dom';

import NewQuotes from './pages/NewQuote';
import AllQuotes from './pages/AllQuptes';
import QuoteDetail from './pages/QuoteDetail';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
    <Switch>
      <Route path='/' exact>
        <Redirect to='/quotes' />
      </Route>
      <Route path='/quotes' exact>
        <AllQuotes/>
      </Route>
      <Route path='/quotes/:quoteId'>
        <QuoteDetail/>
      </Route>
      <Route path='/new-quote'>
        <NewQuotes/>

      </Route>
      <Route path='*'>
        <NotFound/>
      </Route>
    </Switch>
    </Layout>
  );
}

export default App;
