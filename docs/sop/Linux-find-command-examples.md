---
title: Linux find command examples
tags: ['Linux']
---
 # Linux find command examples

---

**1. Find Files by Name**  
```bash
$ find /home/user/documents -name "example.txt"
```

**2. Find Files by Extension**  
```bash
$ find /var/log -name "*.log"
```
**3. Find Files Modified in the Last 7 Days**  
```bash
$ find /etc -mtime -7
```

**4. Find Files Modified More Than 30 Days Ago**  
```bash
$ find /usr/local -mtime +30
```

**5. Find and Delete Files**  
```bash
$ find /tmp -name "oldfile.txt" -delete
```

**6. Find Empty Files or Directories**  
```bash
$ find /var/www -empty
```

**7. Find Files Larger Than 100MB**  
```bash
$ find /home/user/downloads -size +100M
```

**8. Find Files Owned by a Specific User**  
```bash
$ find /home -user username
```

**9. Find Files with 0644 Permissions**  
```bash
$ find /etc -perm 0644
```

**10. Find Files and Execute a Command (Gzip Log Files)** -- 查找文件并执行命令（Gzip 日志文件）

```bash
$ find /var/log -name "*.log" -exec gzip {} \;
```

**11. Find Files and Execute a Command (Delete Empty Files)** -- 用于查找并删除空文件 
```bash
$ find /home/user/documents -type f -empty -exec rm {} \;
```

**12. Find Files and Print Their Details** -- 使用 find 命令查找文件并打印其详细信息

```bash
$ find /home/user/documents -type f -exec ls -lh {} \;
```
代码解析:
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
**13. Find Files Excluding a Specific Directory**  
```bash
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

**14. Find Files Modified in the Last 60 Minutes**  
```bash
$ find /var/www -mmin -60
```

1. **`find /`** 从根目录 `/` 开始递归查找文件。
2. **`-mmin -60`**
   * `-mmin` 是一个选项，用于根据文件的修改时间进行筛选。
   * `-60` 表示查找在过去 60 分钟内被修改过的文件。

---
**15. Find and Archive Files with a Specific Extension**  
```bash
$ find /home/user/pictures -name "*.jpg" | xargs tar -czvf archive.tar.gz
```

**16. Find Symbolic Links**  
```bash
$ find /usr/bin -type l
```

---

**17. Find Files by Inode Number**  
```bash
$ find / -inum 456332
```

**18. Find Files and Exclude a Specific File Type**  
```bash
$ find /home/user -not -name "*.txt"
```

**19. Find Files with Specific Group Ownership**  
```bash
$ find /var/log -group syslog
```

**20. Find Files with Specific Size Range (e.g., 50MB to 100MB)**  
```bash
$ find /home/user/downloads -size +50M -size -100M
```

**21. Find and Sort Files by Modification Time**  
```bash
$ find /var/log -type f -exec ls -lt {} +
```

**22. Find Files Modified in the Last 2 Hours**  
```bash
$ find /var/log -mmin -120
```

**23. Find Files with Specific User and Group Ownership**  
```bash
$ find /home -user username -group groupname
```

**24. Find Files with Specific File Permissions (Readable by Owner Only)**  
```bash
$ find /var/log -perm 600
```

**25. Find Files Larger Than 1GB and Delete Them**  
```bash
$ find /var/log -size +1G -exec rm -f {} \;
```

**26. Find Files and Limit Depth of Search to 1 Level**  
```bash
$ find /home/user -maxdepth 1 -name "*.txt"
```

**27. Find Files Accessed More Than 90 Days Ago**  
```bash
$ find /var/log -atime +90
```

**28. Find Hidden Files**  
```bash
$ find /home/user -name ".*"
```

**29. Find Files Created More Than 1 Day Ago**  
```bash
$ find /home/user -ctime +1
```

**30. Find Files by Their Type (e.g., Block Devices)**  
```bash
$ find /dev -type b
```

**31. Find Files with Specific Permission and Exclude Others**  
```bash
$ find / -perm /a=r -not -perm /a=w
```

**32. Find Files Containing a Specific String in the Name**  
```bash
$ find /home/user -name "*config*"
```
