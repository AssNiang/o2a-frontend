import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RightSideBarComponent } from './components/right-side-bar/right-side-bar.component';
import { LeftSideBarComponent } from './components/left-side-bar/left-side-bar.component';
import { ContentComponent } from './components/content/content.component';
import { HomeAppliComponent } from './components/home-appli/home-appli.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { ConnectedUserComponent } from './components/connected-user/connected-user.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { AllergenesComponent } from './components/allergenes/allergenes.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HeaderConnecteComponent } from './components/header-connecte/header-connecte.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NotificationComponent } from './components/notification/notification.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { SenderComponent } from './components/sender/sender.component';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { HistoryPostsComponent } from './components/history-posts/history-posts.component';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RightSideBarComponent,
    LeftSideBarComponent,
    ContentComponent,
    routingComponents,
    HomeAppliComponent,
    PostItemComponent,
    ListPostsComponent,
    ConnectedUserComponent,
    CreatePostComponent,
    AllergenesComponent,
    CategoriesComponent,
    HeaderConnecteComponent,
    ProfilComponent,
    NotificationComponent,
    DiscussionComponent,
    SenderComponent,
    ReceiverComponent,
    HistoryPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [UserService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
