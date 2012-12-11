# cakephp create

> setup_cakephp.sh

```sh
# create directory
mkdir cakephp
cd cakephp
mkdir apps

# get src
git clone git://github.com/cakephp/cakephp.git cakecore

# get plugins
cd cakecore
git submodule add -f git://github.com/cakephp/debug_kit.git plugins/debug_kit
git submodule add -f git://github.com/CakeDC/search.git plugins/search
git submodule add -f git://github.com/CakeDC/migrations.git plugins/migrations
git submodule add -f git://github.com/hiromi2424/TransitionComponent.git plugins/TransitionComponent
git submodule add -f git://github.com/ichikaway/cakeplus.git plugins/cakeplus
git submodule add -f git://github.com/ichikaway/xformHelper.git plugins/xformHelper
git submodule add -f git://github.com/fusic/filebinder.git plugins/filebinder
git submodule add -f git://github.com/slywalker/TwitterBootstrap.git plugins/TwitterBootstrap

# update
# git fetch
# git tag
# git checkout -b <version>
```
