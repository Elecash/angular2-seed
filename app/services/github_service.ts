import {Injectable} from 'angular2/angular2';
import {Http} from 'angular2/http';
import Observable from '../../node_modules/@reactivex/rxjs/src/Observable';
import {Response} from '../../node_modules/angular2/ts/src/http/static_response';

@Injectable()
export class GithubService {
  url: string = 'https://api.github.com/search/repositories?q=';
  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  search(query: string): Observable<Response> {
    return this.http.get(this.url + query);
  }
}
