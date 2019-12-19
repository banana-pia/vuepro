import Msite from "@/pages/Msite/Msite"
import Order from '@/pages/Order/Order'
import Profile from "@/pages/Profile/Profile"
import Search from "@/pages/Search/Search"
import Login from "@/pages/Login/Login"
import Shop from "@/pages/shop/Shop"
import Goods from "@/pages/shop/Goods"
import Ratings from "@/pages/shop/Ratings"
import Info from "@/pages/shop/Info"
export default[
    {
        path:'/msite',
        component:Msite,
        meta:{
            isShowFooter:true
        }
    },
    {
        path:'/order',
        component:Order,
        meta:{
            isShowFooter:true
        }
    },
    {
        path:'/profile',
        component:Profile,
        meta:{
            isShowFooter:true
        }
    },
    {
        path:'/search',
        component:Search,
        meta:{
            isShowFooter:true
        }
    },
    {
        path:"/login",
        component:Login
    },
    {
        path:"/shop",
        component:Shop,
        children: [
            {
              path: '/shop/goods',
              component: Goods
            },
            {
              path: 'ratings',
              component: Ratings
            },
            {
              path: '/shop/info',
              component: Info
            },
            {
              path: '',
              redirect: '/shop/goods'
            }
          ]
    },
    {
        path:'/',
        component:Msite,
        meta:{
            isShowFooter:true
        }
    }

]