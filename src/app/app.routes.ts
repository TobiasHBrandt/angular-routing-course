import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { PRODUCT_ROUTES } from './products-view/products.routes';
import { CartComponent } from './cart/cart.component';
import { inject } from '@angular/core';
import { FeatureFlagService } from './services/feature-flag.service';
import { map } from 'rxjs';
import { authRouteGuard } from './cart-auth-route-guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { HomeUpdatedComponent } from './home-updated/home-updated.component';

export enum ROUTER_TOKENS {
  HOME = 'home',
  SHOP = 'shop',
  CONTACT = 'contact',
  ABOUT = 'about',
  CHECKOUT = 'checkout',
  CART = 'cart',
  NOT_AUTH = 'not-auth',
  NOT_READY = 'not-ready',
}

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: ROUTER_TOKENS.HOME,
    pathMatch: 'full',
  },
  {
    path: ROUTER_TOKENS.HOME,
    component: HomeUpdatedComponent,
    canMatch: [() => {
      const featureService = inject(FeatureFlagService);

      return featureService.featureFlags.pipe(map((flags) => !!flags.home));
    }]
  },
  {
    path: ROUTER_TOKENS.HOME,
    component: HomeComponent,
  },
  {
    path: `${ROUTER_TOKENS.SHOP}/:categoryId` ,
    loadChildren: () => import('./products-view/products.routes').then(m => m.PRODUCT_ROUTES),
  },
  {
    path: ROUTER_TOKENS.CONTACT,
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: ROUTER_TOKENS.ABOUT,
    component: AboutComponent,
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: ROUTER_TOKENS.CHECKOUT,
    outlet: ROUTER_TOKENS.CART,
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
    canActivate: [authRouteGuard(ROUTER_TOKENS.CART)]
  },
  {
    path: ROUTER_TOKENS.NOT_AUTH, 
    component: NotAuthorizedComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
