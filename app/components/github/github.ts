import {Component, ViewEncapsulation, CORE_DIRECTIVES} from 'angular2/angular2';

import {GithubService} from '../../services/github_service';

@Component({
  selector: 'github',
  templateUrl: './components/github/github.html',
  styleUrls: ['./components/github/github.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [CORE_DIRECTIVES]
})
export class GithubCmp {
  public projects: Array;

  constructor(public ghService: GithubService) {
    this.projects = [];
  }

  onSearch(search) {
    this.ghService
      .search(search.value)
      .map(res => res.json())
      .subscribe(projects => this.projects = projects.items);
  }
}

