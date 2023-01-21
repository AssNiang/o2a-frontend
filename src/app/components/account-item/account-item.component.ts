import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Specialist } from 'src/app/models/specialist';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.css'],
})
export class AccountItemComponent implements OnInit {
  @Input() user!: User;
  profile: string = '';
  nbPostsSignales: number = 0;
  userId: string = '';

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.router.url.split('/')[2];
    if (this.user._id) {
      this._postService
        .getAllPostsById(this.user._id + '')
        .subscribe((posts) => {
          this.nbPostsSignales = posts.filter(
            (post) => post.reporters && post.reporters.length > 0
          ).length;
        });
    }

    this.profile = this._userService.baseUrl + '/file/' + this.user.picture;
  }

  onAddSpecialist(user: User) {
    this.router.navigate(['create-specialist', this.userId, user._id]);
  }

  onRetireSpecialist(user: User) {
    //get specialist
    //pass it to the retireSpecialist() method
    //don't forget to refresh
    console.log('retire');
    this._adminService
      .retireSpecialist(user._id as string)
      .subscribe(() => this.reloadComponent());
  }

  onBlockAccount(user: User) {
    try {
      if (this.user.userStatus === 'DELETED') {
        console.log('unblock');
        this._adminService
          .unblockAnAccount(user._id as string)
          .subscribe(() => this.reloadComponent());
      } else {
        console.log('block');
        this._adminService
          .blockAnAccount(user._id as string)
          .subscribe(() => this.reloadComponent());
      }
    } catch (error) {
      console.log(error);
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
