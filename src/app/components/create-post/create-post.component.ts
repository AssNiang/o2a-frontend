import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  profile: string = '../../../assets/images/blank-profile-picture.webp';
  user_id!: string;
  user!: User;

  // for updating posts
  @Input() toUpdate!: string;
  private piRef!: PostItemComponent;
  postToUpdate!: Post;
  content: string = '';

  constructor(
    private router: Router,
    private _userService: UserService,
    private _postService: PostService
  ) {}

  onSave(send: NgForm) {
    send.value.posterId = this.user._id;

    //if toUpdate is not defined, then we create the post
    if (!this.toUpdate) {
      // a tryCatch may be a good idea
      if (send.value.statut == 'public') {
        this._postService.createPublicPost(send.value).subscribe((data) => {
          // use window.location.reload() to refresh. It would be better if we had another solution
        });
      } else if (send.value.statut == 'private') {
        this._postService.createPrivatePost(send.value).subscribe((data) => {
          // use window.location.reload() to refresh. It would be better if we had another solution
        });
      } else {
        alert('Le statut est soit public soit private !');
      }
    }
    // if toUpdate is defined (it contains the id of the post to update), then we update the post
    else {
      // a tryCatch may be a good idea
      this._postService
        .updatePost(send.value, this.toUpdate)
        .subscribe((data) => {
          console.log(data);
          // set 'updateActivated' to false in order to print the updated post (not the text-area field)
          // l'importance des variables de classe et des variables d'instance.
          // On veut que la modification affecte seulement l'instance de post en question (post sélectionné)
          this.piRef.setUpdateActivatedToFalse();
          // use window.location.reload() to refresh. It would be better if we had another solution
        });
    }

    // use send.reset() to erase the entered data
  }

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];

    this._userService.getUserById(this.user_id).subscribe((data) => {
      this.user = data;
    });
    // l'importance des variables de classe et des variables d'instance.
    // On veut que la modification affecte seulement l'instance de post en question (post sélectionné)
    this.piRef = new PostItemComponent(this._userService, this._postService);

    // get the post to update
    if (this.toUpdate) {
      // a tryCatch may be a good idea
      this._postService.getAllPosts().subscribe((posts) => {
        this.content = posts.filter(
          (post) => post._id == this.toUpdate
        )[0].message;
      });
    }
  }
}
