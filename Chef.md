# Chef & Vagrant

- [����Chef Solo](http://tatsu-zine.com/books/chef-solo)
- [Vagrant and Chef on Windows](http://qiita.com/ogomr/items/98a33f47f6ba050adac4)

## Windows

- vagrant �C���X�g�[��  
gem ����C���X�g�[������� 1.0.x �Ƃ����Â��o�[�W�����ɂȂ�̂ŁA
�T�C�g����Win�ł��C���X�g�[������B[Vagrant](http://www.vagrantup.com/)

-- PATH ��ǉ�

```
PATH=%vagrant%\bin;...
```

- ���z�T�[�o�C���[�W�iBOX�j�̃C���X�g�[��[](http://www.vagrantbox.es/)  
�����CentOS 6.4 x64 ���C���X�g�[��

```
vagrant box add base http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.4-x86_64-v20130427.box
```

- �ݒ�t�@�C���쐬 & �ҏW

```
cd %HOME%\vagrant
vagrant init
```

``` Vagrantfile
# �ǉ�
config.vm.box_url = "http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.4-x86_64-v20130427.box"
config.vm.network :private_network, ip: "192.168.50.12"
```

- �v���O�C���isahara�j

```
vagrant plugin install sahara
```

- ssh (cygwin���g�����)

```
vagrant ssh-config >> ~/.ssh/config
vagrant ssh
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


