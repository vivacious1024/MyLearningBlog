# Typst文档排版

仍然来自官方文档：[格式化 – Typst 文档 --- Formatting – Typst Documentation](https://typst.app/docs/tutorial/formatting/)
我来学typst就是为了像md方便的同时像word那样有排版像latex一样严肃。

## set函数

![[Pasted image 20260129154046.png]]



| set类型    | 作用                    |
| -------- | --------------------- |
| text     | 字体、大小、颜色等             |
| page     | 页面大小、边距、页眉、启用列和页脚     |
| par      | 设定行距                  |
| heading  | 标题外观并实现编号             |
| document | 设置pdf输出中包含的元数据（标题和作者） |
|          |                       |
# par
![[Pasted image 20260129160030.png]]
em：子长，相对单位
leading：行间距
spacing：段间距
justify：对齐
justification-limits：字间距
linebreaks：换行
first-line-indent：首行缩进
hanging-indent：除了首行的其他行的缩进

# heading
给标题编号：
![[Pasted image 20260129162913.png]]


# show
重新定义typst显示某些元素的方式
![[Pasted image 20260129163249.png]]


# let
定义变量： 
![[Pasted image 20260129200005.png]]
![[Pasted image 20260129200110.png]]

# 模板
![[Pasted image 20260129200152.png]]

![[Pasted image 20260129200305.png]]

![[Pasted image 20260129200335.png]]

