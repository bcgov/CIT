import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';
import { useHistory }  from 'react-router-dom';
import {Header, Footer, Button} from 'shared-components';



function App() {

  const header = {
    name: "Community Information Tool",
    history: useHistory()
  }

  return (
    <div style={{minHeight: '100vh'}}>
      
      <Header header={header}/>

      <div style={{height: '80vh'}} className=' container d-flex justify-content-center align-items-center'>
        <Button 
          onClick={() => alert("You Shall Not Pass!")}
          label="Enter"
          styling="bcgov-normal-blue btn" 
        />
      </div>
      
    <div className='footer'>
      <Footer />
    </div>
     
    </div>
  );
}

export default App;