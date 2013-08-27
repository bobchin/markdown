# Chef & Vagrant

- [����Chef Solo](http://tatsu-zine.com/books/chef-solo)
- [Vagrant and Chef on Windows](http://qiita.com/ogomr/items/98a33f47f6ba050adac4)

## Windows

- Ruby �C���X�g�[��[](http://rubyinstaller.org/)

- Chef Solo �C���X�g�[��

```
gem install chef
```

- vagrant �C���X�g�[��  
gem ����C���X�g�[������� 1.0.x �Ƃ����Â��o�[�W�����ɂȂ�̂ŁA
�T�C�g����Win�ł��C���X�g�[������B[Vagrant](http://www.vagrantup.com/)

-- vagrant �ɂ�Ruby����������Ă���̂ŁA��LRuby���Q�Ƃ��Ȃ��悤��  
PATH�̏�����ς���Bvagrant �� Ruby����ɂȂ�悤�ɂ���B

```
PATH=%vagrant%\bin;%RUBY%\bin
```

- ���z�T�[�o�C���[�W�iBOX�j�̃C���X�g�[��[](http://www.vagrantbox.es/)  
�����CentOS 6.4 x64 ���C���X�g�[��

```
vagrant box add base https://dl.dropbox.com/u/5721940/vagrant-boxes/vagrant-centos-6.4-x86_64-vmware_fusion.box
```

- �ݒ�t�@�C���쐬 & �ҏW

```
cd %HOME%\vagrant
vagrant init
```

``` Vagrantfile
# �ǉ�
config.vm.box_url = "https://dl.dropbox.com/u/5721940/vagrant-boxes/vagrant-centos-6.4-x86_64-vmware_fusion.box"
config.vm.network :private_network, ip: "192.168.50.12"
```

- �v���O�C���isahara�j

```
vagrant plugin install sahara
```


## �g����

```
cd %HOME%\vagrant
```

- �C���[�W�̋N������~

```
vagrant up
vagrant halt
```

- ��Ԋm�F

```
vagrant status
```

- ssh(�v���C�x�[�g�L�[�֘A�̃t�@�C�����ǂ��ɂ��邩�݂����Ƃ�)

```
vagrant ssh
```

- ���[���o�b�N�i�X�i�b�v�V���b�g�j

```
# �X�i�b�v�V���b�g�쐬
vagrant sandbox on

# �X�i�b�v�V���b�g�쐬���ɂ���
vagrant sandbox rollback

# �X�i�b�v�V���b�g�m��H
vagrant sandbox commit

# �X�i�b�v�V���b�g�폜
vagrant sandbox off
```


