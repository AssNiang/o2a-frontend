import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { reduce } from 'rxjs';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/shared/services/comment.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  profile: string = '';
  user_id!: string;
  user!: User;

  // for updating posts
  @Input() toUpdate!: string;
  private piRef!: PostItemComponent;
  postToUpdate!: Post;
  content: string = '';
  imageData!: string;
  formData!: FormData;
  videoData!: string;
  audioData!: string;

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
          // save the image
          this._postService
            .addPicture(this.formData, data._id)
            .subscribe((im) => {
            // console.log(im);
            });

          this.piRef.reloadComponent();
          //console.log(data);
          //console.log(send.value);
        });
      } else if (send.value.statut == 'private') {
        this._postService.createPrivatePost(send.value).subscribe((data) => {
          // save the image
          this._postService
            .addPicture(this.formData, data._id)
            .subscribe((im) => {
            // console.log(im);
            });

          this.piRef.reloadComponent();
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
        // console.log(data);

          // save the image; ------------------must also delete images with this post id--------------------
          this._postService
            .addPicture(this.formData, data._id)
            .subscribe((im) => {
            // console.log(im);
            });
          // set 'updateActivated' to false in order to print the updated post (not the text-area field)
          // l'importance des variables de classe et des variables d'instance.
          // On veut que la modification affecte seulement l'instance de post en question (post sélectionné)
          this.piRef.setUpdateActivatedToFalse();
          this.piRef.reloadComponent();
        });
    }

    // use send.reset() to erase the entered data
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    const allowedImageMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const allowedVideoMimeTypes = ['video/mp4'];

    this.formData = new FormData();
    this.formData.append('file', file as File);

    if (file && allowedImageMimeTypes.includes(file.type)) {
    // console.log('image selected');

      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
        // log the result
        //console.log(this.imageData);
      };
      reader.readAsDataURL(file);
      // console.log(file)
    }

    if (file && allowedVideoMimeTypes.includes(file.type)) {
    // console.log('video selected');

      const reader = new FileReader();
      reader.onload = () => {
        this.videoData = reader.result as string;
        // log the result
        //console.log(this.videoData);

      };
      reader.readAsDataURL(file);
      // console.log(file)
    }

  }

  onAudioSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    const allowedAudioMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/wave'];

    this.formData = new FormData();
    this.formData.append('file', file as File);
    //console.log(file)

    if (file && allowedAudioMimeTypes.includes(file.type)) {
    // console.log('Audio selected');
      const reader = new FileReader();
      reader.onload = () => {
        this.audioData = reader.result as string;
        // log the result
        //console.log(this.audioData);
      };
      reader.readAsDataURL(file);
      // console.log(file)
    }
  }


  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];

    this._userService.getUserById(this.user_id).subscribe((data) => {
      this.user = data;
      this.profile = this._userService.baseUrl + '/file/' + data.picture;
    });
    // l'importance des variables de classe et des variables d'instance.
    // On veut que la modification affecte seulement l'instance de post en question (post sélectionné)
    this.piRef = new PostItemComponent(
      this._userService,
      this._postService,
      {} as CommentService,
      this.router
    );

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
