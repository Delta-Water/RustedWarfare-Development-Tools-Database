# RustedWarfare-Development-Tools-Database

用于存放开发的工具的仓库，[助手](https://github.com/Delta-Water/RustedWarfare-Development-Tools)将从这个仓库及其分支获取工具本体及其相关信息。

## 项目概述

本项目旨在为Rusted Warfare游戏提供开发工具的代码存储和管理。这些工具旨在简化游戏开发和内容创建过程。

在`main`分支中，我们存放了内置源作为示例。

### 文件结构

1. `information.json`：源的信息

   - `name`: 源名称
   - `simpleIntroduction`: 简介说明
   - `detailedIntroduction`: 详细介绍
   - `version`: 源版本号

2. `batchGenerateTool`：批量触发生成工具文件夹（源中的每一个工具都应该有一个自己的文件夹）

   - `information.json`: 工具的详细信息
   - `main.js`: 工具的主要功能代码（具体代码请查看文件）

### 示例

以下是一个`information.json`的示例：

```
{
    "name": "批量宾语生成工具",
    "simpleIntroduction": "生成指定宾语的工具",
    "detailedIntroduction": "能够通过特定语法生成指定宾语的工具",
    "version": "0.0.1",
    "developers": ["KEND", "DeltaWater"]
}
```

## 使用步骤

**请按照以下步骤创建新的源。**

1. Fork本仓库；
2. 添加源的`information.json`；
3. 创建各个工具的文件夹；
4. 添加各个工具的`information.json`和`main.js`；
3. 在根目录添加`README.md`作为源的说明文档
4. 在各个工具中添加`README.md`作为各个工具的说明和教程文档

_大功告成_

**请按照以下步骤添加新的源。**

1. 打开助手，在`源管理`页面选择`添加`按钮；
2. 在列表中找到想要的源并点击；
3. 在随后展示的详情页选择确认。

_大功告成_

## 许可证

本项目使用MIT许可证。详细内容请查看[LICENSE](LICENSE)文件。

## 联系我们

如有任何问题或建议，请通过3627371741@qq.com与我们联系。