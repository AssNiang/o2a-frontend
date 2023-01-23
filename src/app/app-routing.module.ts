
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConnectedUserComponent } from "./components/connected-user/connected-user.component";
import { HomeAppliComponent } from "./components/home-appli/home-appli.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { ProfilComponent } from "./components/profil/profil.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { DiscussionComponent } from "./components/discussion/discussion.component";
import { HistoryPostsComponent } from "./components/history-posts/history-posts.component";
import { ReportedPostsComponent } from "./components/reported-posts/reported-posts.component";
import { CreateSpecialistComponent } from "./components/create-specialist/create-specialist.component";
import { StructureLocationComponent } from "./components/structure-location/structure-location.component";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { PostDetailComponent } from "./components/post-detail/post-detail.component";
import { ConnectedGuard } from "./shared/guards/connected/connected.guard";
import { AdminGuard } from "./shared/guards/admin/admin.guard";
import { ArticleComponent } from "./components/article/article.component";

export const routes: Routes = [
  { path: '', redirectTo:'homeAppli', pathMatch:'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'registration/:id', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent},
  { path: 'categories/:id', component: CategoriesComponent},
  { path: 'article', component: ArticleComponent },
  { path: 'homeAppli', component: HomeAppliComponent },

  { path: 'connected-user/:id', component: ConnectedUserComponent, canActivate: [ConnectedGuard] },
  { path: 'profil/:id', component: ProfilComponent, canActivate: [ConnectedGuard]},
  { path: 'notification/:id', component: NotificationComponent, canActivate: [ConnectedGuard]},
  //{ path: 'discussion', component: DiscussionComponent, canActivate: [ConnectedGuard]},
  { path: 'history-posts/:id', component: HistoryPostsComponent, canActivate: [ConnectedGuard]},
  { path: 'connected-user/:id/post-detail/:postId', component: PostDetailComponent, canActivate: [ConnectedGuard]},
  { path: 'structure-location/:postId', component: StructureLocationComponent, canActivate: [ConnectedGuard]},

  // admin
  { path: 'reported-posts/:id', component: ReportedPostsComponent, canActivate: [ConnectedGuard, AdminGuard]},
  { path: 'accounts/:userId', component: AccountsComponent, canActivate: [ConnectedGuard, AdminGuard]},
  { path: 'create-specialist/:id/:idSpecialistToBe', component: CreateSpecialistComponent, canActivate: [ConnectedGuard, AdminGuard]},
  { path: '**', redirectTo:'homeAppli', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  RegistrationComponent,
  LoginComponent,
  HomeAppliComponent,
  CategoriesComponent,
  ProfilComponent,
  ArticleComponent
]

