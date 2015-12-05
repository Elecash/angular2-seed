import {join} from 'path';
import {APP_SRC, APP_DEST, DEV_DEPENDENCIES, APP_ASSETS} from '../config';
import {transformPath, templateLocals} from '../utils';

export = function buildIndexDev(gulp, plugins) {
  return function () {
    return gulp.src(join(APP_SRC, 'index.html'))
      // NOTE: There might be a way to pipe in loop.
      .pipe(inject('shims'))
      .pipe(inject('libs'))
      .pipe(inject())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };


  function inject(name?: string) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
      name,
      transform: transformPath(plugins)
    });
  }

  function getInjectablesDependenciesRef(name?: string) {
    return DEV_DEPENDENCIES.concat(APP_ASSETS)
      .filter(dep => dep['inject'] && dep['inject'] === (name || true))
      .map(dep => dep.src);
  }
};
