import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clock from "./clock/clock";
import EmployeeList from "./employee-list/index";
import MemoryGame from "./memory-game/memory-game";
// import Page1 from "./router-playground/page1";
// import Page2 from "./router-playground/page2";
// import Page3 from "./router-playground/page3";
// import ControlledComp from "./controlled-comp";
import ColorPicker from "./color-picker";
import BMI from "./bmi";
import TicTacToeV2 from "./ticTacToe/tictactoe2";
import AirBnb from "./airbnb/airbnb";
// import DemoUseState from "./components/useState-demo";
// import DemoObject from "./components/useState-demo/objectExample";
// import FireWork from "./firework/firework";
import Counter from "./counter/counter";
import StatusPicker from "./status-picker/status-picker";
import LanguagePicker from "./languagePicker/language-picker";
// import NameField from "./name-field/name-field";
import ProfileCard from "./profile-card/profile-card";
import StarRating from "./star-rating/star-rating";
// import TicTacToe from "./tic-tac-toe/tic-tac-toe";
// import SampleData from "./sample-data/sample-data";
import SideBarMenu from "./sidebar-menu";
import ToDoList from "./toDo-List";
// import LocalStoragePlayground from "./localStorage";
import ImageSlider from "./image-slider/image-slider";
import EmployeeDetails from "./employee-list/employee-details";
import ApiCall from "./api-call-playground";
import Joke from "./chuck-norris-joke";
import GitHub from "./github-followers";
import GitHubProfileCard from "./github-followers/profile-card";
import GitHubPageLayout from "./github-followers/github-page-layout";
import MovieDetails from "./movie";
import CounterUseReducer from "./counterReducer/counterReducer";
import Shop from "./shopping-list";


function App() {
  // const navigate = useNavigate()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/page1" element={<Page1/>}/>
        <Route path="/page2" element={<Page2/>}/>
        <Route path="/page3" element={<Page3/>}/> */}
          <Route path="/" element={<SideBarMenu />}>
            <Route path="/air-bnb" element={<AirBnb />} />
            <Route path="/bmi" element={<BMI />} />
            <Route path="/clock" element={<Clock />} />
            <Route path="/color-picker" element={<ColorPicker />} />
            <Route path="/todo-list" element={<ToDoList />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/employee-list">
              <Route index element={<EmployeeList />} />
              <Route path=":employeeId" element={<EmployeeDetails />} />
            </Route>
            <Route path="/image-slider" element={<ImageSlider />} />
            <Route path="/language-picker" element={<LanguagePicker />} />
            <Route path="/language-picker" element={<LanguagePicker />} />
            <Route path="/memory-game" element={<MemoryGame />} />
            <Route path="/profile-card" element={<ProfileCard />} />
            <Route path="/star-rating" element={<StarRating />} />
            <Route path="/status-picker" element={<StatusPicker />} />
            <Route path="/tic-tac-toe" element={<TicTacToeV2 />} />
            <Route path="/api-call" element={<ApiCall />} /> 
            <Route path="/joke" element={<Joke />} /> 
            <Route path="/github-profile" element={<GitHubPageLayout />}>  
              <Route index element={<GitHub/>} />
              <Route path=":profileId" element={<GitHubProfileCard/>} />
            </Route>  
            <Route path="/movie" element ={<MovieDetails/>}/>     
            <Route path="/counter-reducer" element={<CounterUseReducer/>}/>   
            <Route path="/shop" element={<Shop/>}/>
            <Route path="*" element={'404 Not Found'} />
          </Route>
        </Routes>
        {/* <AirBnb/> */}
        {/* <DemoUseState /> */}
        {/* <DemoObject/> */}
        {/* <FireWork/> */}
        {/* <Counter/> */}
        {/* <StatusPicker/> */}
        {/* <LanguagePicker/> */}
        {/* <NameField/> */}
        {/* <ProfileCard/> */}
        {/* <StarRating/> */}
        {/* <TicTacToe /> */}
        {/* <TicTacToeV2/> */}
        {/* <SampleData/> */}
        {/* <MemoryGame/> */}
        {/* <ControlledComp/> */}
        {/* <LocalStoragePlayground/> */}
        {/* <ImageSlider/> */}
        {/* <Clock/> */}
        {/* <EmployeeList /> */}
        {/* <ColorPicker/> */}
        {/* <BMI/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
