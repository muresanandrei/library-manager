import withRouter from './hooks/withRouter'
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes/Routing';

const AppWithRouter = withRouter((props) => <Routing {...props.router}/>);

function App() {

  return (
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  )
}

export default App;
