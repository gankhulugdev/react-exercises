import './App.css';

import AirBnb from './airbnb/airbnb';
import DemoUseState from './components/useState-demo';
import DemoObject from './components/useState-demo/objectExample';
import FireWork from './firework/firework';
import Counter from './counter/counter';
import StatusPicker from './status-picker/status-picker';
import LanguagePicker from './languagePicker/language-picker';
import NameField from './name-field/name-field';
import ProfileCard from './profile-card/profile-card';
import StarRating from './star-rating/star-rating';


function App() {
  return (
    <div className="App">
   
       
        {/* <AirBnb/> */}
        {/* <DemoUseState /> */}
        {/* <DemoObject/> */}
        {/* <FireWork/> */}
        {/* <Counter/> */}
        {/* <StatusPicker/> */}
        {/* <LanguagePicker/> */}
      <LanguagePicker/>
      {/* <NameField/> */}
      {/* <ProfileCard/> */}
        {/* <StarRating/> */}
    </div>
  );
}

export default App;
