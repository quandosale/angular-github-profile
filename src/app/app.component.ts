import { GithubService } from './services/github.service';
import { User } from './services/github-user';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  followers: User[] = [];
  message: string = "";

  constructor(private gitService: GithubService) {
  }

  search(username: string) {
    this.message = "";
    this.user = null;
    this.followers = [];
    this.gitService.getUser(username).then(user => {
      this.user = user;
      if (user) {
        this.gitService.getFollowers(username).then(followers => {
          this.followers = followers;
          console.log(this.followers);
        });
      } else {
        this.message = "Not found";
        console.log('asdfadsf');
      }
    })
  }
}
