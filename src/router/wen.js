/**
 * @description 彭达文的路由
 * @author 彭达文
 * 
 */
import Popup from "../components/Popup";
import Upload from "../view/Upload";
import Home from "../view/Home";
import More from "../view/More";
import Information from "../view/Information";
import Information2 from "../view/Information2";
import TEST from "../view/TEST";
import TEST2 from "../view/TEST2";


export default [

      {
        path: '/Popup',
        name: 'Popup',
        component: Popup
      },
      {
        path: '/Upload',
        name: 'Upload',
        component: Upload
      },
      {
        path: '/Home',
        name: 'Home',
        component: Home
      },
      {
        path: '/More',
        name: 'More',
        component: More
      },
      {
        path: '/Information',
        name: 'Information',
        component: Information
      },
      {
        path: '/Information2',
        name: 'Information2',
        component: Information2
      },
      {
        path: '/TEST',
        name: 'TEST',
        component: TEST
      },
      {
        path: '/TEST2',
        name: 'TEST2',
        component: TEST2
      },

    
]