import Blogs from './Components/Blogs'
import SingleBlog from './Components/SingleBlog'

// import loadData from './helpers/loadData';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Blogs
  },
  {
    path: '/post/:id',
    component: SingleBlog,
  },
];

export default Routes;