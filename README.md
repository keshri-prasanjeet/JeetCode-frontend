# JeetCode Frontend

Basic Angular 16 standalone application for frontend for JeetCode

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
