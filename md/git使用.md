# git使用

- git分为工作区 暂存区 版本库区
- git init 
  - 在当前目录创建版本库Respository
- git add file ...
  - 将文件添加到暂存区stage or Index
- git commit -m "提交说明"
  - 将暂存区的所有文件提交到库
- git status 
  - 查看库的当前状态,哪些文件修改了
- git diff
  - 查看文件修改的内容
  - 参数 HEAD -- file
    - 查看工作区和版本库的差异	
- git log
  - 查看提交的历史记录
  - 参数--pretty=online 
    - 优化历史记录显示，让它一行一行显示
- git reset 
  - 版本回退
    - 版本指针HEAD指向当前版本，版本回退后HEAD指针会指向回退后的版本
  - 参数 --hard HEAD^
    - HEAD表示当前版本 HEAD^前面一个版本HEAD^^前2个版本 HEAD~100前100个版本
  - 参数 --hard "commit-id"
    - git log可以看到某个版本的commit-id
- git reflog
  - 查看命令历史
    - 每次提交的commit-id与提交信息或版本操作
- 

# 命令行命令

- pwd
  - 查看当前命令
- cat file
  - 输入此命令后可直接在命令行中添加文本到文件

