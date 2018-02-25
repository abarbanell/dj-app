# setup of heroku pipeline

TODO...

## heroku

- create account 
- login
- create new pipeline
- create staging app
    - add resources for papertrail. postgres, newrelic
    - create github repo (or use heroku git repo)
    - connect staging app to github
- add git remote on dev workstation

use this command: 

```
git remote add github git@github.com:abarbanell/dj-app.git
```

check result with this: 

```
git remote -v
github  git@github.com:abarbanell/dj-app.git (fetch)
github  git@github.com:abarbanell/dj-app.git (push)
origin  git@bitbucket.org:abarbanell/dj-app.git (fetch)
origin  git@bitbucket.org:abarbanell/dj-app.git (push)
```

push to github (and initiate heroku build & deploy) with this: 

```
git push github master
```

