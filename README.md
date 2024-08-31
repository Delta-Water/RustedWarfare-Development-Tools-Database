# RustedWarfare-Development-Tools-Database

用于存放开发的工具的仓库，助手将从这个仓库及其分支获取工具本体及其相关信息

[助手的仓库地址](https://github.com/Delta-Water/RustedWarfare-Development-Tools)

## 如何创建自己的工具

main分支中存放了内置工具作为示例

**请务必按照示例的格式创建新的分支**

### 文件结构

1. information.json
```
{
    "name": "内置",
    "simpleIntroduction": "内置工具源",
    "detailedIntroduction": "一些基础的工具",
    "version": "0.0.1",
}
```

`name`：源名称

`simpleIntroduction`：简介

`detailedIntroduction`：详情

`version`：版本号

2. batchGenerateTool

- information.json

```
{
    "name": "批量宾语生成工具",
    "detailedIntroduction": "能够通过特定语法生成指定宾语的工具\n开发者：\nKEND：ini导入的逻辑\nDeltaWater：UI和字符串生成的逻辑"
}
```

- main.js

  代码略，请自行查看文件