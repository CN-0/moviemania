import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'people', loadChildren: () => import('./peoplespage/peoplepage.module').then(m => m.PeoplepageModule) },
  { path: 'user/:id', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  {path: 'auth/:id', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'person/:id', loadChildren: () => import('./person/person.module').then(m => m.PersonModule) },
  {path: 'search/:id', loadChildren: () => import('./search/search.Module').then(m => m.SearchModule) },
  { path: ':type/:id', loadChildren: () => import('./itempage/item.module').then(m => m.ItemModule) },
  { path: 'lists/:type/:id', loadChildren: () => import('./lists/lists.module').then(m => m.ListsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
