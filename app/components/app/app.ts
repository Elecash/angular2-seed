import {Component, ViewEncapsulation} from 'angular2/angular2';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {GithubCmp} from '../github/github';
import {NameList} from '../../services/name_list';
import {GithubService} from '../../services/github_service';

@Component({
  selector: 'app',
  viewProviders: [NameList, GithubService],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' },
  { path: '/github', component: GithubCmp, as: 'Github' }
])
export class AppCmp {}
