import Vue from "vue";
import VueRouter from "vue-router";

// Load vuex store
import store from "../store";

// Load route views
import Home from "../views/Home";
import Crash from '../views/Crash';
import Roll from "../views/Roll";
import Roulette from "../views/Roulette";
import Blackjack from "../views/blackjack/Blackjack";
import BlackjackOverview from "../views/blackjack/BlackjackOverview";
import BlackjackTables from "../views/blackjack/BlackjackTables";
import BlackjackTable from "../views/blackjack/BlackjackTable";
import Mines from "../views/Mines";
import Towers from "../views/Towers";
import Plinko from "../views/Plinko";
import Leaderboard from "../views/Leaderboard";
import FairOverView from "../views/fair/FairOverView.vue";
import Fair from "../views/fair/Fair.vue";
import FairBlackjack from "../views/fair/FairBlackjack.vue";
import FairCrash from "../views/fair/FairCrash.vue";
import FairMines from "../views/fair/FairMines.vue";
import FairBattles from "../views/fair/FairBattles.vue";
import FairCases from "../views/fair/FairCases.vue";
import FairPlinko from "../views/fair/FairPlinko.vue";
import FairRoulette from "../views/fair/FairRoulette.vue";
import FairTowers from "../views/fair/FairTowers.vue";
import FairUpgrader from "../views/fair/FairUpgrader.vue";
import Faq from "../views/Faq.vue";
import Terms from "../views/Terms.vue";

const Deposit = () =>
  import(/* webpackChunkName: "group-user" */ "../views/deposit/Deposit");
const DepositCrypto = () =>
  import(/* webpackChunkName: "group-user" */ "../views/deposit/DepositCrypto");
const DepositDLS = () =>
  import(/* webpackChunkName: "group-user" */ "../views/deposit/DepositDLS");

const Withdraw = () =>
  import(/* webpackChunkName: "group-user" */ "../views/withdraw/Withdraw");
const WithdrawDLS = () =>
  import(/* webpackChunkName: "group-user" */ "../views/withdraw/WithdrawDLS");
const WithdrawCrypto = () =>
  import(/* webpackChunkName: "group-user" */ "../views/withdraw/WithdrawCrypto");

const Profile = () =>
  import(/* webpackChunkName: "group-user" */ "../views/profile/Profile");
const ProfileOverview = () =>
  import(
    /* webpackChunkName: "group-user" */ "../views/profile/ProfileOverview"
  );
const ProfileSettings = () =>
  import(
    /* webpackChunkName: "group-user" */ "../views/profile/ProfileSettings"
  );
const ProfileBets = () =>
  import(/* webpackChunkName: "group-user" */ "../views/profile/ProfileBets");
const ProfileTransactions = () =>
  import(
    /* webpackChunkName: "group-user" */ "../views/profile/ProfileTransactions"
  );
const Admin = () =>
  import(/* webpackChunkName: "group-admin" */ "../views/admin/Admin");
const AdminDashboard = () =>
  import(/* webpackChunkName: "group-admin" */ "../views/admin/AdminDashboard");
const AdminUsers = () =>
  import(/* webpackChunkName: "group-admin" */ "../views/admin/AdminUsers");
const AdminAffiliates = () =>
  import(
    /* webpackChunkName: "group-admin" */ "../views/admin/AdminAffiliates"
  );
const AdminPromo = () =>
  import(/* webpackChunkName: "group-admin" */ "../views/admin/AdminPromo");
const AdminCashier = () =>
  import(/* webpackChunkName: "group-admin" */ "../views/admin/AdminCashier");
const AdminBoxes = () =>
  import(/* webpackChunkName: "group-admin" */ "../views/admin/AdminBoxes");
const AdminRain = () =>
  import(/* webpackChunkName: "group-admin" */ "../views/admin/AdminRain");
const AdminLeaderboards = () =>
  import(
    /* webpackChunkName: "group-admin" */ "../views/admin/AdminLeaderboards"
  );
const AdminFilter = () =>
  import(/* webpackChunkName: "group-admin" */ "../views/admin/AdminFilter");
const AdminStats = () =>
  import(/* webpackChunkName: "group-admin" */ "../views/admin/AdminStats");
const AdminSettings = () =>
  import(/* webpackChunkName: "group-admin" */ "../views/admin/AdminSettings");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/crash',
    name: 'Crash',
    component: Crash
  },
  {
    path: "/deposit",
    component: Deposit,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "crypto",
        name: "DepositCrypto",
        component: DepositCrypto,
      },
      // {
      //   path: "dls",
      //   name: "DepositDLS",
      //   component: DepositDLS,
      // },
    ],
  },
  {
    path: "/withdraw",
    component: Withdraw,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "crypto",
        name: "WithdrawCrypto",
        component: WithdrawCrypto,
      },
      // {
      //   path: "dls",
      //   name: "WithdrawDLS",
      //   component: WithdrawDLS,
      // },
    ],
  },
  {
    path: "/slide",
    name: "Slide",
    component: Roll,
  },
  {
    path: "/roulette",
    name: "Roulette",
    component: Roulette,
  },
  {
    path: "/blackjack",
    component: Blackjack,
    children: [
      {
        path: "",
        name: "BlackjackOverview",
        component: BlackjackOverview,
      },
      {
        path: "tables",
        name: "BlackjackTables",
        component: BlackjackTables,
      },
      {
        path: "table/:tableId",
        name: "BlackjackTable",
        component: BlackjackTable,
      },
    ],
  },
  {
    path: "/mines",
    name: "Mines",
    component: Mines,
  },
  {
    path: "/towers",
    name: "Towers",
    component: Towers,
  },

  {
    path: "/roll",
    name: "Roll",
    component: Roll,
  },
  {
    path: "/plinko",
    name: "Plinko",
    component: Plinko,
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "",
        name: "ProfileOverview",
        component: ProfileOverview,
      },
      {
        path: "settings",
        name: "ProfileSettings",
        component: ProfileSettings,
      },
      {
        path: "bets",
        name: "ProfileBets",
        component: ProfileBets,
      },
      {
        path: "transactions",
        name: "ProfileTransactions",
        component: ProfileTransactions,
      },
    ],
  },
  {
    path: "/fair",
    component: Fair,
    meta: {
      auth: false,
    },
    children: [
      {
        path: "",
        name: "FairOverView",
        component: FairOverView,
      },
      {
        path: "crash",
        name: "FairCrash",
        component: FairCrash,
      },
      {
        path: "blackjack",
        name: "FairBlackjack",
        component: FairBlackjack,
      },
      {
        path: "mines",
        name: "FairMines",
        component: FairMines,
      },
      {
        path: "towers",
        name: "FairTowers",
        component: FairTowers,
      },
      {
        path: "plinko",
        name: "FairPlinko",
        component: FairPlinko,
      },
      // {
      //   path: "upgrader",
      //   name: "FairUpgrader",
      //   component: FairUpgrader,
      // },
      {
        path: "roulette",
        name: "FairRoulette",
        component: FairRoulette,
      },
    ],
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: Leaderboard,
  },
  {
    path: "/faq",
    name: "Faq",
    component: Faq,
  },
  {
    path: "/terms",
    name: "Terms",
    component: Terms,
  },
  {
    path: "/admin",
    component: Admin,
    meta: {
      auth: true,
      admin: true,
    },
    children: [
      {
        path: "",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
      {
        path: "users",
        name: "AdminUsers",
        component: AdminUsers,
        meta: {
          fulladmin: true,
        },
      },
      {
        path: "affiliates",
        name: "AdminAffiliates",
        component: AdminAffiliates,
        meta: {
          fulladmin: true,
        },
      },
      {
        path: "promo",
        name: "AdminPromo",
        component: AdminPromo,
        meta: {
          fulladmin: true,
        },
      },
      {
        path: "cashier",
        name: "AdminCashier",
        component: AdminCashier,
        meta: {
          fulladmin: true,
        },
      },
      {
        path: "boxes",
        name: "AdminBoxes",
        component: AdminBoxes,
        meta: {
          fulladmin: true,
        },
      },
      {
        path: "rain",
        name: "AdminRain",
        component: AdminRain,
        meta: {
          fulladmin: true,
        },
      },
      {
        path: "leaderboard",
        name: "AdminLeaderboard",
        component: AdminLeaderboards,
        meta: {
          fulladmin: true,
        },
      },
      {
        path: "filter",
        name: "AdminFilter",
        component: AdminFilter,
        meta: {
          fulladmin: true,
        },
      },
      {
        path: "stats",
        name: "AdminStats",
        component: AdminStats,
        meta: {
          fulladmin: true,
        },
      },
      {
        path: "settings",
        name: "AdminSettings",
        component: AdminSettings,
        meta: {
          fulladmin: true,
        },
      },
    ],
  },
  {
    path: "/verify",
    beforeEnter: (to, from, next) => {
      const data = { userId: to.query.userId, token: to.query.token };
      store.dispatch("authSendCredentialsVerify", data);

      next("/");
    },
  },
  {
    path: "/reset",
    beforeEnter: (to, from, next) => {
      store.dispatch("modalsSetData", {
        userId: to.query.userId,
        token: to.query.token,
      });
      store.dispatch("modalsSetShow", "Reset");

      next("/");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async function (to, from, next) {
  if (
    store.getters.authToken !== null &&
    store.getters.authUser.user === null &&
    store.getters.authUser.loading === false
  ) {
    await store.dispatch("authGetUser");
  }

  const affiliateCode =
    to.query.a !== undefined
      ? to.query.a
      : localStorage.getItem("affiliate-code") !== null
      ? localStorage.getItem("affiliate-code")
      : null;
  if (affiliateCode !== null) {
    if (store.getters.authUser.user !== null) {
      localStorage.removeItem("affiliate-code");
      // store.dispatch("modalsSetData", { code: affiliateCode });
      // store.dispatch("modalsSetShow", "Claim");
    } else {
      localStorage.setItem("affiliate-code", affiliateCode);
    }
  }

  if (
    to.matched.some((record) => record.meta.auth) &&
    store.getters.authUser.user === null
  ) {
    next(false);
  } else if (
    to.matched.some((record) => record.meta.admin) &&
    (store.getters.authUser.user === null ||
      store.getters.authUser.user.rank !== "admin")
  ) {
    next(false);
  } else if (
    to.matched.some((record) => record.meta.fulladmin) &&
    (store.getters.authUser.user === null ||
      store.getters.authUser.user.fullrank !== "fulladmin")
  ) {
    next(false);
  } else {
    next();
  }
});

export default router;
