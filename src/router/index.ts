import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Article from '@/views/InforView.vue'
import EmptyPage from '@/views/NotFound.vue'
import GraphViewPage from '@/views/GraphAllView.vue'
import QApage from '@/views/AnswerPage.vue'
import ResourcePage from '@/views/ResourcePage.vue'
import DocumentPage from '@/views/DocumentPage.vue'
import PdfPage from '@/views/PDFView.vue'
import allTerm from '@/views/TermAllPage.vue'
import allTermSearch from '@/views/TermAllPagesSearch.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path:'/infor',
    name:'infor',
    component: Article
  },
  // {
  //   path:'/emptyPage',
  //   name:'emptyPage',
  //   component: EmptyPage
  // },
  {
    path:'/graphViewPage',
    name:'graphViewPage',
    component: GraphViewPage
  },
  {
    path:'/vagueTerm',
    name:'vagueTerm',
    component: QApage
  },
  {
    path:'/allTerm',
    name:'allTerm',
    component: allTerm
  },
  {
    path:'/allTermSearch',
    name:'allTermSearch',
    component: allTermSearch
  },
  // {
  //   path:'/resourcePage',
  //   name:'ResourcePage',
  //   component: ResourcePage
  // },
  {
    path: '/main',
    name: 'main',
    component: DocumentPage
  },
  {
    path: '/introduction',
    name: 'introduction',
    component: DocumentPage
  },
  {
    path: '/pdfPage',
    name: 'PdfPage',
    component: PdfPage 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
