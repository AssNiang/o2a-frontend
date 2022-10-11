
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
import { PostDetailComponent } from "./components/post-detail/post-detail.component";

export const routes: Routes = [
  { path: '', redirectTo:'homeAppli', pathMatch:'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'registration/:id', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent},
  { path: 'categories/:id', component: CategoriesComponent},
  { path: 'homeAppli', component: HomeAppliComponent },
  { path: 'connected-user/:id', component: ConnectedUserComponent },
  { path: 'profil/:id', component: ProfilComponent},
  { path: 'notification/:id', component: NotificationComponent},
  { path: 'discussion', component: DiscussionComponent},
  { path: 'history-posts/:id', component: HistoryPostsComponent},
  { path: 'connected-user/:id/post-detail/:postId', component: PostDetailComponent},
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
  ProfilComponent
]

