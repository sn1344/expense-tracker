import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Filter from "./pages/Filter"

function App() {
  return (
    <BrowserRouter>
      <nav className=" bg-[#232f3d] flex justify-between items-center px-4 py-3 bg-primary-500">
      <div className="flex items-center">
      <Link to="/" className="text-white font-bold lg:text-4xl">Online shopping system</Link>
        </div>
        <div className="flex items-center">
        <Link to="/" className="text-white lg:text-xl hover:text-gray-300 mr-4 border-b-2 border-transparent hover:border-white">Home</Link>
        <Link to="/filter" className="text-white lg:text-xl hover:text-gray-300 mr-4 border-b-2 border-transparent hover:border-white">Filter</Link>
        <Link to="/create" className="bg-white text-primary-500 rounded-md py-2 px-4 shadow-md hover:bg-cyan-500 hover:text-white">Add new expense</Link>
        </div>
      </nav>
      <div className="page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/filter" element={<Filter/>}/>
        <Route path="/:id" element={<Update />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;