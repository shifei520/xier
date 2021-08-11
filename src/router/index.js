import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Front = () => import('views/front/Front')
const Cdetail = () => import('views/front/children/Cdetail')
const Bdetail = () => import('views/front/children/Bdetail')
const Book = () => import('views/front/children/Book')
const Teacher = () => import('views/front/children/Teacher')
const VipPage = () => import('views/front/children/VipPage')
const Tdetail = () => import('views/tdetail/Tdetail')
const EnterHome = () => import('views/enterHome/EnterHome')
const Firm = () => import('views/enterHome/children/Firm')
const Page = () => import('views/enterHome/children/Page')
const StationID = () => import('views/enterHome/children/StationID')
const Login = () => import('views/login/Login')
const Register = () => import('views/login/children/Register')
const VipCourseList = () => import('views/front/children/VipCourseList')
const QueryWebCertificate = () => import('views/new_zhong/children/QueryWebCertificate')
const QueryWebCertificateRes = () => import('views/new_zhong/children/QueryWebCertificateRes')
const Newsd = () => import('views/newsd/Newsd')
const Newshome = () => import('views/newshome/Newshome')
const TProblemi = () => import('views/tProblemi/TProblemi')
const QuestionsA = () => import('views/questionsA/QuestionsA')
const Answer = () => import('views/answer/Answer')
const Hisun = () => import('views/hisun/Hisun')
const LawsID = () => import('views/laws/LawsID')
const Laws = () => import('views/laws/Laws')
const Cart = () => import('views/cart/Cart')
const Sorder = () => import('views/sorder/Sorder')
const Uc = () => import('views/uc/Uc')
const Udetail = () => import('views/uc/children/Udetail')
const Home = () => import('views/uc/children/Home')
const SelfLearn = () => import('views/uc/children/SelfLearn')
const SelfExam = () => import('views/uc/children/SelfExam')
const SelfCert = () => import('views/uc/children/SelfCert')
const SelfOrder = () => import('views/uc/children/SelfOrder')
const Odetail = () => import('views/uc/children/Odetail')
const SelfVipOrder = () => import('views/uc/children/SelfVipOrder')
const Ucard = () => import('views/uc/children/Ucard')
const Lcard = () => import('views/uc/children/Lcard')
const SelfCoupon = () => import('views/uc/children/SelfCoupon')
const SelfAddr = () => import('views/uc/children/SelfAddr')
const CmyResume = () => import('views/uc/children/CmyResume')
const Classify = () => import('views/uc/children/Classify')
const Porder = () => import('views/porder/Porder')
const Search = () => import('views/search/Search')

const routes = [
  { path: '/', redirect: '/front' },
  {
    path: '/front',
    component: Front,
  },
  {
    path: '/front/cdetail',
    component: Cdetail,
  },
  {
    path: '/front/bdetail',
    component: Bdetail,
  },
  {
    path: '/front/book',
    component: Book,
  },
  {
    path: '/front/teacher',
    component: Teacher,
  },
  {
    path: '/front/tdetail',
    component: Tdetail,
  },
  {
    path: '/front/vipPage',
    component: VipPage,
  },
  {
    path: '/front/enterHome',
    component: EnterHome,
  },
  {
    path: '/front/enterHome/firm',
    component: Firm,
  },
  {
    path: '/front/enterHome/stationID',
    component: StationID,
  },
  {
    path: '/front/enterHome/page/:id',
    name: 'Page',
    component: Page,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/login/r',
    component: Register,
  },
  {
    path: '/front/vipCourseList',
    component: VipCourseList,
  },
  {
    path: '/front/new_zhong/queryWebCertificate',
    component: QueryWebCertificate,
  },
  {
    path: '/front/new_zhong/queryWebCertificateRes',
    component: QueryWebCertificateRes,
  },
  {
    path: '/front/newsd',
    component: Newsd,
  },
  {
    path: '/front/newshome',
    component: Newshome,
  },
  {
    path: '/front/tProblemi/:id',
    name: 'TProblemi',
    component: TProblemi,
  },
  {
    path: '/front/questionsA',
    component: QuestionsA,
  },
  {
    path: '/front/answer',
    component: Answer,
  },
  {
    path: '/front/hisun/:id',
    name: 'Hisun',
    component: Hisun,
  },
  {
    path: '/front/lawsID/:id',
    name: 'LawsID',
    component: LawsID,
  },
  {
    path: '/front/laws',
    component: Laws,
  },
  {
    path: '/front/cart',
    component: Cart,
  },
  {
    path: '/front/sorder',
    component: Sorder,
  },
  {
    path: '/front/uc',
    component: Uc,
    redirect: '/',
    children: [
      {
        path: '/',
        component: Home,
      },
      {
        path: 'udetail',
        component: Udetail,
      },
      {
        path: 'selflearn',
        component: SelfLearn,
      },
      {
        path: 'selfexam',
        component: SelfExam,
      },
      {
        path: 'selfcert',
        component: SelfCert,
      },
      {
        path: 'selforder',
        component: SelfOrder,
      },
      {
        path: 'odetail',
        component: Odetail,
      },
      {
        path: 'SelfVipOrder',
        component: SelfVipOrder,
      },
      {
        path: 'ucard',
        component: Ucard,
      },
      {
        path: 'lcard',
        component: Lcard,
      },
      {
        path: 'SelfCoupon',
        component: SelfCoupon,
      },
      {
        path: 'selfaddr',
        component: SelfAddr,
      },
      {
        path: 'cMyResume',
        component: CmyResume,
      },
      {
        path: 'classify',
        component: Classify,
      },
    ],
  },
  {
    path: '/front/porder',
    component: Porder,
  },
  {
    path: '/front/search',
    component: Search,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
