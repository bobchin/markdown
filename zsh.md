# zsh

## 参考

- <http://www.clear-code.com/blog/2011/9/5.html>


## antigen

> <https://github.com/zsh-users/antigen>

```
cd
git clone git://github.com/zsh-users/antigen.git
```

## zprezto

```
git clone --recursive https://github.com/sorin-ionescu/prezto.git ~/.zprezto
setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
```
