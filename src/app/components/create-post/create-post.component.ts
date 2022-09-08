import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { __classPrivateFieldGet } from 'tslib';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  profile: String = '../../../assets/images/blank-profile-picture.webp';
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

    //console.log(send.value);

    //if toUpdate is not defined, then we create the post
    if (!this.toUpdate) {
      // try {

      // } catch (error) {
      //   console.log(error);
      // }
      if (send.value.statut == 'public') {
        this._postService.createPublicPost(send.value).subscribe((data) => {
          alert(data);
          //window.location.reload();
        });
      } else if (send.value.statut == 'private') {
        this._postService.createPrivatePost(send.value).subscribe((data) => {
          // alert(data);
          // window.location.reload();
        });
      } else {
        alert('Le statut est soit public soit private !');
      }
    }
    // if toUpdate is defined (it contains the id of the post to update), then we update the post
    else {
      // try {

      // } catch (error) {
      //   console.log(error);
      // }
      this._postService
        .updatePost(send.value, this.toUpdate)
        .subscribe((data) => {
          console.log(data);
          // set 'updateActivated' to false in order to print the updated post (not the text-area field)
          // l'importance des variables de classe et des variables d'instance.
          // On veut que la modification affecte seulement l'instance de post en question (post sélectionné)
          this.piRef.setUpdateActivatedToFalse();
          //window.location.reload();
        });
    }

    //send.reset();
  }

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];
    //console.log(this.user_id);

    this._userService.getUserById(this.user_id).subscribe((data) => {
      this.user = data;
      //console.log(this.user._id);
    });
    // l'importance des variables de classe et des variables d'instance.
    // On veut que la modification affecte seulement l'instance de post en question (post sélectionné)
    this.piRef = new PostItemComponent(this._userService, this._postService);

    // get the post to update
    if (this.toUpdate) {
      // try {

      // } catch (error) {
      //   console.log(error);
      // }
      this._postService.getAllPosts().subscribe((posts) => {
        //this.postToUpdate =
        this.content = posts.filter(
          (post) => post._id == this.toUpdate
        )[0].message;
      });
    }
  }
}
