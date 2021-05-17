import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { UserService } from 'src/state/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserApi } from 'src/api/user.api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MaterialModule } from './shared/components/material';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
 
  {
    path: 'advertiser',
    loadChildren: () => import('./pages/advertiser/advertiser.module').then(m => m.AdvertiserModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];

const services = [
  UserService,
];

const apis = [
  UserApi
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarMenuComponent,
    EditUserComponent,
    BreadcrumbComponent,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: NG_ENTITY_SERVICE_CONFIG,useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }},
    ...services,
    ...apis,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
