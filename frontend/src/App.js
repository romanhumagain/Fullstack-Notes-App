import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';


import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import NotePage from './pages/NotePage';
import AddNote from './pages/AddNote';


function App() {

  const router = createBrowserRouter([
      {
          path:"/",
          element : <><Header/> <Outlet/> </>,

          children :[
            {
              path:"/",
              element : <NotesListPage/>
            },
            {
              path: "/note/:slug",
              element :<NotePage/>
            },
            {
              path:"/note/new/",
              element:<AddNote/>
            }
          ]
      }
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
