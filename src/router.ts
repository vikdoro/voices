import { createRouter, createWebHistory } from 'vue-router';
import Layout from './Layout.vue';

// Lazy load pages
const Home = () => import('./pages/Home.vue');
const People = () => import('./pages/People.vue');
const Output = () => import('./pages/Output.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', name: 'home', component: Home },
        { path: 'people', name: 'people', component: People },
        { path: 'output', name: 'output', component: Output },
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Scroll to the top, but only if it's not the same page
    if (to.path !== from.path) {
      return { top: 0 }
    }
  }
});

const HEADER_OFFSET = (document.querySelector('.site-header') as HTMLElement | null)?.offsetHeight ?? 0;

router.afterEach(async (to, from) => {
  
  if (!to.hash) {
    return;
  }

  setTimeout(() => {

    const headerEl = document.querySelector('nav') as HTMLElement | null;
    const offset = headerEl?.offsetHeight ?? HEADER_OFFSET;

    const id = CSS.escape(to.hash.slice(1))
    const el = (document.getElementById(id) as HTMLElement | null) || (document.querySelector(`#${id}`) as HTMLElement | null)
    if (!el) return

    // window scrolling with header offset
    //scrollToEl(el, { behavior: to.path === from.path ? "smooth" : "auto", offset: HEADER_OFFSET })
    scrollToEl(el, { offset })
  }, 50);
})

function scrollToEl(el: HTMLElement, { offset = 0 }: { offset?: number } = {}) {
  const y = window.pageYOffset + el.getBoundingClientRect().top - offset
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export default router;