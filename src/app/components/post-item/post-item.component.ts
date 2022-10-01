import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  @Input() deleteUpdateButtonPresent!: boolean;
  postAuthor!: User;

  updateActivated: boolean = false; // utiliser une variable d'instance plutôt qu'une variable de classe (pour ne pas affecter tous les posts)

  public profile: string = '../../../assets/images/blank-profile-picture.webp';

  // A rappeler à Abdoukhadre : liste de pictures, not only one (backend)
  images: string[] = [];
  user_id: string = '';
  liked: string = '';
  nbLikes: number | undefined;
  reported: string = '';
  nbReports: number | undefined;

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];
    try {
      this._userService
        .getUserById(this.post.posterId + '')
        .subscribe((author) => {
          this.postAuthor = author;
          this.profile = this._userService.baseUrl + '/file/' + author.picture;
        });
    } catch (error) {
      console.log(error);
    }

    this.images = [this._postService.baseUrl + '/file/' + this.post.picture+''];

    if (this.post.likers?.includes(this.user_id)) {
      this.liked = 'bg-like';
    }
    this.nbLikes = this.post.likers?.length;

    if (this.post.reporters?.includes(this.user_id)) {
      this.reported = 'bg-report';
    }
    this.nbReports = this.post.reporters?.length;
  }

  onDelete() {
    // to delete a post. It's working !
    // add tryCatch may be a good idea
    try {
      this._postService
      .deletePost(this.post._id + '')
      .subscribe(() => window.location.reload());

    } catch (error) {
      console.log(error);
    }

  }

  onUpdate() {
    this.updateActivated = true;
  }

  onLike() {
    try {
      if (this.liked) {
        this._postService
          .unlikePost(this.post._id + '', this.user_id)
          .subscribe(() => this.reloadComponent());
        this.liked = '';
      } else {
        this._postService
          .likePost(this.post._id + '', this.user_id)
          .subscribe(() => this.reloadComponent());
      }
    } catch (error) {
      console.log(error);
    }
  }

  onReport() {
    try {
      if (this.reported) {
        this._postService
          .unreportPost(this.post._id + '', this.user_id)
          .subscribe(() => this.reloadComponent());
        this.reported = '';
      } else {
        this._postService
          .reportPost(this.post._id + '', this.user_id)
          .subscribe(() => this.reloadComponent());
      }
    } catch (error) {
      console.log(error);
    }
  }

  public reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  // l'importance des variables de classe et des variables d'instance.
  // On veut que la modification affecte seulement l'instance de post en question (post sélectionné)
  public setUpdateActivatedToFalse() {
    this.updateActivated = false;
  }
}
