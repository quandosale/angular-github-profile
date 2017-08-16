import { User } from './github-user';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

const API_URL = "https://api.github.com/users/"

@Injectable()
export class GithubService {
  constructor(private http: Http) { }

  getUser(username: string): Promise<User> {
    return this.http.get(API_URL + username)
      .toPromise()
      .then(res => {
        var data = res.json();
        console.log(res);
        if(data.message == "Not Found")
          return null;

        return {
          name: data.login,
          image: data.avatar_url
        };
      }).catch(err => {
        return null;
      })
  }

  getFollowers(username: string): Promise<User[]> {
    return this.http.get(API_URL + username + '/followers')
      .toPromise()
      .then(res =>  {
        return res.json().map(x => {
          return {
            name: x.login,
            image: x.avatar_url
          }
        });
      })
  }
}
