import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private _userService: UserService,
    private _postService: PostService
  ) {}

  ngOnInit(): void {
    try {
      this._userService
        .getUserById(this.post.posterId + '')
        .subscribe((author) => {
          this.postAuthor = author;
        });
    } catch (error) {
      console.log(error);
    }
  }

  onDelete() {
    // to delete a post. It's working !
    // a tryCatch may be a good idea

    this._postService.deletePost(this.post._id as string).subscribe(() => {
      // use window.locate.reload() to refresh the page
    });
  }

  onUpdate() {
    this.updateActivated = true;
  }

  // l'importance des variables de classe et des variables d'instance.
  // On veut que la modification affecte seulement l'instance de post en question (post sélectionné)
  public setUpdateActivatedToFalse() {
    this.updateActivated = false;
  }
}
