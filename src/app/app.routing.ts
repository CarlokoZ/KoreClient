
import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
//import { PageDefault }           from './app.pagedefault';
import { HomepageComponent }  from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FiledetailComponent } from './filedetail/filedetail.component';

const appRoutes: Routes = [

  { path: 'homepage/homepage',        component: HomepageComponent },
  { path: 'dashboard/dashboard',        component: DashboardComponent },
  // { path: 'filedetail/filedetail/:file_Obj',        component: FiledetailComponent },
  { path: 'filedetail/filedetail',        component: FiledetailComponent },
 // { path: '', redirectTo: '/homepage/homepage', pathMatch: 'full' }  ??
  { path: '', redirectTo: 'homepage/homepage', pathMatch: 'full' }
  // { path: '**', component: LoginComponent }
];

export const appRoutingProviders: any[] = [];
//在应用根部提供配置的路由器。
// forRoot方法提供了路由需要的路由服务提供商和指令，并基于当前浏览器 URL 初始化导航。
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);