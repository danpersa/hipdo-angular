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

#### Compile assets for production

    (https://devcenter.heroku.com/articles/rails-asset-pipeline)
    RAILS_ENV=production bundle exec rake assets:precompile

#### Start rails in production mode

rails s -e production

#### Settings for Heroku

Add heroku remote
    heroku git:remote -a hipdo

Use custom buildpack, to include node
    heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git

### Using the Passenger Server

    passenger start

    passenger start -a 0.0.0.0 -p 3000 -d -e production

### Docker

    docker run -p 80:80 dpersa/hipdo:v1
    docker run -i -p 80:80 -t danpersa/hipdo:devel /bin/bash

    docker exec -t -i YOUR-CONTAINER-ID bash -l

    passenger-status
    passenger-memory-stats

    boot2docker ip

    docker push danpersa/hipdo
    docker pull danpersa/hipdo

### Local Storage Place

    ~/Library/Application Support/Google/Chrome/Default/Local Storage

### TODO

 * add completed date
 * task sorting by tag group
 * reordering tasks - not really possible as the tasks are filters
 * reordering tasks in groups (moving one task from one group to another) ?? not really possible
 * task edit page
 * remove tags from tasks
 * list tags of a task
 * edit group name
