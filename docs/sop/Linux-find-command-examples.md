---
title: Linux find command examples
tags: ['Linux']
---
 # Linux find command examples

## 1. Find Files by Name
```bash
# 查找文件名为 example.txt 的文件
$ find /home/user/documents -name "example.txt"
```

## 2. Find Files by Extension
```bash
# 查找扩展名为 .log 的文件 
$ find /var/log -name "*.log"
```
## 3. Find Files Modified in the Last 7 Days
```bash
# 令查找最近 7 天内修改过的文件
$ find /etc -mtime -7
```

## 4. Find Files Modified More Than 30 Days ago
```bash
# 查找 30 天前修改的文件
$ find /usr/local -mtime +30
```

## 5. Find and Delete Files  
```bash
# 查找并删除名为 oldfile.txt 的文件
$ find /tmp -name "oldfile.txt" -delete
```

## 6. Find Empty Files or Directories 
```bash
# 查找空文件或目录
$ find /var/www -empty
```

## 7. Find Files Larger Than 100MB
```bash
# 查找文件大小超过 100MB 的文件
$ find /home/user/downloads -size +100M
```

## 8. Find Files Owned by a Specific User
```bash
# 查找属于特定用户的文件
$ find /home -user username
```

## 9. Find Files with 0644 Permissions  
```bash
# 查找权限为 0644 的文件
$ find /etc -perm 0644
```

## 10. Find Files and Execute a Command (Gzip Log Files)
```bash
# 查找所有 .log 文件并使用 gzip 压缩它们
$ find /var/log -name "*.log" -exec gzip {} \;
```

## 11. Find Files and Execute a Command (Delete Empty Files)
```bash
# 查找并删除空文件
$ find /home/user/documents -type f -empty -exec rm {} \;
```

## 12. Find Files and Print Their Details
```bash
# 查找文件并打印详细信息
$ find /home/user/documents -type f -exec ls -lh {} \;
```
1. `find /home/user/documents`
该命令从` /home/user/documents` 目录开始递归查找文件。

2. `-type f`
仅查找普通文件（不包括目录、链接等）。  
3. `-exec ls -lh {} \;`
对每个找到的文件执行 `ls -lh` 命令，其中：
    - `ls -lh`：以长格式（-l）和人类可读的文件大小（-h）显示文件信息。
    - `{}`：占位符，表示当前找到的文件。
    - `\;`：表示 -exec 命令的结束。

---
## 13. Find Files Excluding a Specific Directory
```bash
# 查找所有 .conf 文件，排除 /proc 目录
$ find / -path "/proc" -prune -o -name "*.conf" -print
```
1. **`find /`**
   从根目录 `/` 开始递归查找文件。
2. **`-path "/proc"`**
   指定要排除的路径，这里是 `/proc` 目录。`/proc` 是 Linux 的虚拟文件系统，包含系统和进程信息，通常不需要在文件搜索中包含它。
3. **`-prune`**
   告诉 `find` 命令跳过指定的目录（即 `/proc`），不进入该目录进行搜索。
4. **`-o`**
   逻辑 "OR" 操作符，表示如果前面的条件（排除 `/proc`）为假，则继续执行后面的条件。
5. **`-name "*.conf"`**
   指定搜索条件，查找以 `.conf` 结尾的文件。
6. **`-print`**
   输出匹配的文件路径。
---

## 14. Find Files Modified in the Last 60 Minutes 
```bash
# 查找在过去 60 分钟内被修改过的文件
$ find /var/www -mmin -60
```

1. **`find /`** 从根目录 `/` 开始递归查找文件。
2. **`-mmin -60`**
   * `-mmin` 是一个选项，用于根据文件的修改时间进行筛选。
   * `-60` 表示查找在过去 60 分钟内被修改过的文件。

---
## 15. Find and Archive Files with a Specific Extension
```bash
# 查找所有 .jpg 文件并将它们打包成一个归档文件 archive.tar.gz
$ find /home/user/pictures -name "*.jpg" | xargs tar -czvf archive.tar.gz
```
1. **`find /home/user/pictures`**
   指定搜索的起始目录为 `/home/user/pictures`，并递归搜索其所有子目录。
2. **`-name "*.jpg"`**
   使用 `-name` 参数匹配文件名，`*.jpg` 表示查找所有以 `.jpg` 结尾的文件。
3. **`|`**
   管道符号，将 `find` 命令的输出（即找到的文件路径）传递给后续的命令。
4. **`xargs tar -czvf archive.tar.gz`**
   * `xargs`：将从 `find` 命令输出的文件路径作为参数传递给 `tar` 命令。
   * `tar -czvf archive.tar.gz`：
     * `-c`：创建一个新的归档文件。
     * `-z`：使用 gzip 压缩归档文件。
     * `-v`：显示归档过程中处理的文件。
     * `-f archive.tar.gz`：指定输出的归档文件名为 `archive.tar.gz`。

---
## 16. Find Symbolic Links** -- 使用 find 命令查找符号链接文件（Symbolic Links）。
```bash
# 查找 /usr/bin 目录下的所有符号链接文件
$ find /usr/bin -type l
```
1. **`find /usr/bin`**
   指定搜索的起始目录为 `/usr/bin`，并递归搜索其所有子目录。
2. **`-type l`**
   `-type` 参数用于指定文件类型，这里的 `l` 表示符号链接文件（Symbolic Links）。

---

## 17. Find Files by Inode Number
```bash
# 查找 inode 编号为 456332 的文件
$ find / -inum 456332
```
1. **`find /`**
   指定搜索的起始目录为 `/`，表示从根目录开始递归搜索所有文件和目录。
2. **`-inum 456332`**
   `-inum` 参数用于根据文件的 inode 编号进行筛选。这里的 `456332` 是目标文件的 inode 编号。  
   `ls -i` 命令会列出文件的 inode 编号。例如：`$ ls -i /path/to/directory`

---
## 18. Find Files and Exclude a Specific File Type
```bash
# 查找所有文件，排除扩展名为 .txt 的文件
$ find /home/user -not -name "*.txt"
```
## 19. Find Files with Specific Group Ownership
```bash
# 查找属于 syslog 组的文件
$ find /var/log -group syslog
```

## 20. Find Files with Specific Size Range (e.g., 50MB to 100MB) 
```bash
# 查找大小在 50MB 到 100MB 之间的文件
$ find /home/user/downloads -size +50M -size -100M
```
----
## 21. Find and Sort Files by Modification Time  
```bash
# 查找 /var/log 目录下的所有文件，并按修改时间排序
$ find /var/log -type f -exec ls -lt {} +
```
1. **`find /var/log`**
   指定搜索的起始目录为 `/var/log`，并递归搜索其所有子目录。
2. **`-type f`**
   限制搜索结果为普通文件（不包括目录、符号链接等）。
3. **`-exec ls -lt {} +`**
   * `-exec`：对找到的文件执行指定的命令。
   * `ls -lt`：以长格式（`-l`）列出文件，并按修改时间排序（`-t`），最新修改的文件排在最前面。
   * `{}`：占位符，表示当前找到的文件。
   * `+`：表示将所有找到的文件作为参数一次性传递给 `ls` 命令（相比于 `\;`，效率更高）。

----
## 22. Find Files Modified in the Last 2 Hours 
```bash
# 查找在过去 2 小时内被修改过的文件
$ find /var/log -mmin -120
```
----
## 23. Find Files with Specific User and Group Ownership  
```bash
# 查找属于特定用户和组的文件
$ find /home -user username -group groupname
```
----
## 24. Find Files with Specific File Permissions (Readable by Owner Only)
```bash
# 查找权限为 600 的文件
$ find /var/log -perm 600
```
----
## 25. Find Files Larger Than 1GB and Delete Them 
```bash
# 查找大小超过 1GB 的文件并删除它们
$ find /var/log -size +1G -exec rm -f {} \;
```
----
## 26. Find Files and Limit Depth of Search to 1 Level
```bash
# 查找 /home/user 目录下的所有 .txt 文件，限制搜索深度为 1 
$ find /home/user -maxdepth 1 -name "*.txt"
```
1. **`find /home/user`**
   指定搜索的起始目录为 `/home/user`，并递归搜索其子目录。
2. **`-maxdepth 1`**
   限制搜索深度为 1，表示只在 `/home/user` 目录的第一层级中查找文件，而不会进入其子目录。
3. **`-name "*.txt"`**
   使用 `-name` 参数匹配文件名，`*.txt` 表示查找以 `.txt` 结尾的文件。

----

## 27. Find Files Accessed More Than 90 Days Ago 
```bash
# 查找访问时间超过 90 天的文件
$ find /var/log -atime +90
```
----
## 28. Find Hidden Files 
```bash
# 使用 find 命令查找隐藏文件。隐藏文件在 Linux 系统中是以点号 (.) 开头的文件，例如 .bashrc 或 .gitignore。
$ find /home/user -name ".*"
```
---
## 29. Find Files Created More Than 1 Day Ago
```bash
# 查找创建时间超过 1 天的文件
$ find /home/user -ctime +1
```
1. **`find /home/user`**
   指定搜索的起始目录为 `/home/user`，并递归搜索其所有子目录。
2. **`-ctime +1`**
   `-ctime` 用于根据文件的创建时间进行筛选。
   * `+1` 表示查找创建时间超过 1 天的文件（不包括 1 天内创建的文件）。
   * 时间单位为 24 小时，`+1` 表示超过完整的 24 小时

---
## 30. Find Files by Their Type (e.g., Block Devices)
```bash
# 查找块设备文件
$ find /dev -type b
```
---

## 31. Find Files with Specific Permission and Exclude Others
```bash
# 使用 find 命令查找具有特定权限的文件，同时排除具有其他权限的文件。
$ find / -perm /a=r -not -perm /a=w
```
1. **`find /`**
   从根目录 `/` 开始递归查找文件。
2. **`-perm /a=r`**
   查找所有用户（`a` 表示所有用户，包括文件所有者、组用户和其他用户）具有读取权限（`r`）的文件。
3. **`-not`**
   逻辑 "非" 操作符，用于排除符合条件的文件。
4. **`-perm /a=w`**
   指定排除条件：具有写权限（`w`）的文件。
---

## 32. Find Files Containing a Specific String in the Name
```bash
# 查找文件名中包含特定字符串的文件
$ find /home/user -name "*config*"
```
