# Routing Optimization: Preventing Layout Re-mounting

## Problem
Previously, the `Layout` component was wrapping the entire `RouterView` in `App.vue`, which caused the Layout to be re-mounted every time the route changed, even when navigating between pages that use the same basic page component structure. Additionally, the navigation components were using regular `<a href="">` tags instead of Vue Router's `<RouterLink>` components, causing full page reloads instead of client-side navigation.

## Solution
Restructured the routing to use nested routes where the `Layout` component is the parent route and page components are children. This allows Vue Router to optimize rendering and only update the parts that actually need to change. Additionally, replaced all navigation `<a href="">` tags with Vue Router's `<RouterLink>` components to enable proper client-side navigation.

## Changes Made

### 1. Router Configuration (`src/router.ts`)
```typescript
// Before: Flat route structure
routes: [
  { path: '/', name: 'home', component: Home },
  { path: '/people', name: 'people', component: People },
  { path: '/output', name: 'output', component: Output },
]

// After: Nested route structure
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
]
```

### 2. App.vue
```vue
<!-- Before: Layout wrapped RouterView -->
<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<!-- After: Direct RouterView -->
<template>
  <RouterView />
</template>
```

### 3. Layout.vue
```vue
<!-- Before: Used slot for content -->
<main id="view">
  <slot />
</main>

<!-- After: Uses RouterView for nested routes -->
<main id="view">
  <RouterView />
</main>
```

### 4. Navigation Components
```vue
<!-- Before: Regular anchor tags causing page reloads -->
<a href="/people">People</a>
<a href="/output">Output</a>

<!-- After: Vue Router links for client-side navigation -->
<RouterLink to="/people">People</RouterLink>
<RouterLink to="/output">Output</RouterLink>
```

## Benefits

1. **Performance**: Layout component is mounted once and stays mounted during navigation
2. **State Preservation**: Any state in the Layout component is preserved between route changes
3. **Smoother Transitions**: Only the page content changes, not the entire layout
4. **Better UX**: Navigation feels more responsive and stable
5. **Client-Side Navigation**: No more full page reloads when clicking navigation links
6. **SPA Behavior**: Proper single-page application behavior with instant navigation

## How It Works

With nested routes:
- The `Layout` component is mounted when the user first visits the site
- When navigating between routes, only the child components (Home, People, Output) are mounted/unmounted
- The `Layout` component remains mounted and maintains its state
- Vue Router handles the optimization automatically

With RouterLink components:
- Navigation links use Vue Router's client-side routing instead of browser navigation
- Clicking links triggers route changes without full page reloads
- The application behaves as a true single-page application
- Navigation state and component lifecycle are properly managed

## Testing

To verify the optimization is working:
1. Open browser console
2. Navigate between pages
3. You should see:
   - "Layout component mounted" only once (on first visit)
   - "Home/People/Output component mounted" each time you visit that page
   - "Layout component unmounted" should never appear during navigation

## Future Considerations

If you need to add more routes that don't use the Layout (like authentication pages), you can add them as siblings to the Layout route:

```typescript
routes: [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', name: 'home', component: Home },
      { path: 'people', name: 'people', component: People },
      { path: 'output', name: 'output', component: Output },
    ]
  },
  { path: '/login', name: 'login', component: Login }, // No Layout
  { path: '/admin', name: 'admin', component: Admin }  // No Layout
]
```
