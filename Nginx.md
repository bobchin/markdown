# Nginx

## インストール

- [インストール](http://nginx.org/en/linux_packages.html#stable)

```
# yumレポジトリの追加
sudo wget http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
sudo yum localinstall nginx-release-centos-7-0.el7.ngx.noarch.rpm

sudo yum --enable-repos=nginx install nginx
```

## バージョン確認

```
nginx -v
```
