# 以下是代码结构框架

## 初始化
- 定义UI布局

```
batchTriggerGenerationToolView = ( // XML布局定义
    <horizontal id="bTGTView" gravity="center" h="*">
        <button id="button3" text="导入"/>
        <button id="button1" text="开始"/>
        <button id="button2" text="教程"/>
    </horizontal>
);
```

- 定义全局变量

```
var triObj = {}, // 用于存储键值对和变量
    triArray = {}, // 用于存储生成的宾语
    // 实例化操作字符串和构建对话框的类
    oS = new operateStrings(),
    bD = new buildDialogs();
```

- 初始化UI布局

```
changeToViewXML(batchTriggerGenerationToolView);
```

- 绑定按钮事件

```
ui.button1.on("click", () => inputObj()); // 开始按钮点击事件
ui.button2.on("click", () => toast(uDT)); // 教程按钮点击事件，显示未完成开发的提示
ui.button3.on("click", () => loadFile()); // 导入按钮点击事件
```

## 函数部分

- 加载文件函数

```
function loadFile() {
    // ...（省略了函数内部的代码，以下是注释）
    // 弹出对话框让用户选择配置文件路径
    // 读取文件内容并处理
    // 根据文件内容生成对象数组
    // 将生成的XML内容写入文件
}
```

- 输入对象函数

```
function inputObj(reInput, errCode) {
    // ...（省略了函数内部的代码，以下是注释）
    // 弹出对话框让用户输入键值对和变量
    // 处理输入并存储到triObj
    // 如果输入有误，重新弹出输入对话框
}
```

- 输入选项函数

```
function inputOpt(reInput, errCode) {
    // ...（省略了函数内部的代码，以下是注释）
    // 弹出对话框让用户输入循环次数和变量表达式
    // 处理输入并生成对象数组
    // 将生成的XML内容写入文件
}
```

- 写入文件函数

```
function writeIn(content, name, toastText) {
    // ...（省略了函数内部的代码，以下是注释）
    // 弹出对话框让用户输入保存的文件名
    // 将内容写入文件
    // 显示保存成功的提示
}
```

- 转义XML特殊字符的函数

```
function escapeXML(str) {
    // ...（省略了函数内部的代码，以下是注释）
    // 替换XML中的特殊字符以避免解析错误
}
```

## 函数类部分

- 构建自定义对话框类

```
function buildDialogs() {
    // ...（省略了函数内部的代码，以下是注释）
    // 定义弹出不同类型对话框的方法
}
```

- 操作字符串类

```
function operateStrings() {
    // ...（省略了函数内部的代码，以下是注释）
    // 定义操作字符串的各种方法
    // 包括解析输入、生成对象、生成XML字符串等
}
```

- 定义了其他几个类和函数，用于处理文件、对象和XML的生成

## ini

- 定义常量

```
const G_ISFLOAT = {
    // ...（省略了常量的定义，以下是注释）
    // 定义了键值为float/int的对象
};
```

- 构建对象构造函数

```
function justObject() {
    this.object_id = 0; // 悲观的是，id并不必备，但是一些人以id整齐为荣
    this.object_x = -20;
    this.object_y = -20;
    this.object_width = 20;
    this.object_height = 20; // 最好的想法是在设置中x/y/width/height初始化状态
    this.loop = 1;

    this.object_props = {};
    this.object_label = null;
    this.define_init = {};
}
```

- 构建objectgroup构造函数

```
function justObjectgroup() {
    this.object_group = {}; // 存储object，尽管在这例子中并不明显
    this.global = {};
    this.define = {
        index: 0
    };

    // 初始化define_init
    this.stDefine_it = function(o) {
        for (let [key, vals] of Object.entries(o.define_init)) {
            if (vals[0] == 0) this.define[key] = eval(vals[1]);
            else this.global[key] = eval(vals[1]);
        }
        this.setStats = o.setStats;
    };

    // 生成XML字符串
    this.psGroupToXMLhr = function(object) {
        // ...（省略了函数内部的代码，以下是注释）
        // 生成XML字符串，根据对象数组生成
    };

    // 解析INI文件
    this.parse_toXML = function() {
        // ...（省略了函数内部的代码，以下是注释）
        // 解析INI文件内容，生成对象数组
    };

    // 将属性推入对象
    this.setO_action = function(o) {
        // ...（省略了函数内部的代码，以下是注释）
        // 处理对象属性，推入object对象
    };

    // 复制对象
    this.setPret = function(pair, o) {
        // ...（省略了函数内部的代码，以下是注释）
        // 处理对象复制，根据键值对复制对象属性
    };

    // 向对象添加键值对
    this.pushPair_object = function(pair, o) {
        // ...（省略了函数内部的代码，以下是注释）
        // 向对象添加键值对，根据键值对添加属性
    };
}
```

- 写入文件

```
function oGroup_write_file(path_char_t, group) {
    // ...（省略了函数内部的代码，以下是注释）
    // 写入文件，将对象数组写入文件
}
```

- 解析INI文件

```
function pareINIhr(file_path, g) {
    // ...（省略了函数内部的代码，以下是注释）
    // 解析INI文件，生成对象数组
}
```
