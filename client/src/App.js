import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from './components/Home_page/Orders'
import SelectPizza from './components/Select_pizza/select_pizza'


function App() {
  
  return (
    <BrowserRouter>
     
      <Routes>
        <Route
          path="/"
          element={
            <Orders/>
          }
        />
        <Route
          path="/select_pizza"
          element={
            <SelectPizza/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
