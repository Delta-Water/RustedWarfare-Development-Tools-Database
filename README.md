# RustedWarfare-Development-Tools-Database

用于存放开发的工具的仓库，助手将从这个仓库及其分支获取工具本体及其相关信息。

## 项目概述

本项目旨在为Rusted Warfare游戏提供开发工具的代码存储和管理。这些工具旨在简化游戏开发和内容创建过程。

## 如何创建自己的工具

在`main`分支中，我们存放了内置源作为示例。请按照以下步骤创建新的源。

### 文件结构

1. `information.json`源的信息

   - `name`: 源名称
   - `simpleIntroduction`: 简介说明
   - `detailedIntroduction`: 详细介绍
   - `version`: 源版本号

2. `batchGenerateTool`文件夹（源中的每一个工具都应该有一个自己的文件夹）

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

## 安装和使用

安装和使用说明将根据具体工具的不同而有所差异。请参考每个工具的文档来了解详细步骤。

## 贡献指南

我们欢迎社区成员的贡献。请遵循以下步骤来提交您的贡献：

1. Fork本仓库。
2. 创建您的特性分支 (`git checkout -b feature/your-feature`).
3. 提交您的改动 (`git commit -m 'Add some feature'`).
4. 推送到分支 (`git push origin feature/your-feature`).
5. 创建新的Pull Request。

## 许可证

本项目使用MIT许可证。详细内容请查看[LICENSE](LICENSE)文件。

## 联系我们

如有任何问题或建议，请通过GitHub的Issue Tracker与我们联系。