# A16Standalone

Basic Angular 16 standalone application with routing and TailwindCSS.

## Run

* `npm i`
* `ng s` or `ng b`

## Add a page

`ng generate component pages/some-page --standalone`

Then add it into `src/app/app.routes.ts`:

```ts
export const routes: Routes = [
  {path: 'home', component: HomePageComponent, title: 'Home'},
  {
    path: 'contacts',
    title: 'Contacts',
    loadComponent: () => import('./pages/contacts-page/contacts-page.component').then(mod => mod.ContactsPageComponent)
  },
  {
    path: 'about',
    title: 'About',
    loadComponent: () => import('./pages/about-page/about-page.component').then(mod => mod.AboutPageComponent)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
```

Order matters. Only pages with `title` are displayed in main menu.

## Add a component

`ng generate component components/loading-spinner --standalone`
