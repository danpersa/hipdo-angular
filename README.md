== README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialisation

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


Please feel free to use a different markup language if you do not plan to run
<tt>rake doc:app</tt>.

### Technologies

https://github.com/a5hik/ng-sortable
http://yeoman.io/codelab/local-storage.html

### Commands

bundle exec rake bower:install
passenger start

Compile assets for production
RAILS_ENV=production bin/rake assets:precompile

Start thin server in production mode
rails s -e production

Add heroku remote
heroku git:remote -a hipdo

Use custom buildpack, to include node
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git

### TODO

 * task sorting by tag group
 * reordering tasks - not really possible as the tasks are filters
 * reordering tasks in groups (moving one task from one group to another) ?? not really possible
 * task edit page
 * remove tags from tasks
 * list tags of a task
 * edit group name
