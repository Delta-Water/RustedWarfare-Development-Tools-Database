batchTriggerGenerationToolView = ( // XML
    <horizontal id="bTGTView" gravity="center" h="*">
        <button id="button3" text="导入"/>
        <button id="button1" text="开始"/>
        <button id="button2" text="教程"/>
    </horizontal>
);
editViewXML = (
    <vertical>
        <input padding="0 8" id="input" text="{{editViewText}}" textColor="#000000"/>
    </vertical>
);
pathViewXML = (
    <vertical>
        <input padding="0 8" id="input" text="{{pathViewText}}" textColor="#000000"/>
        <checkbox id="isMap" checked="true" text="导入到地图"/>
    </vertical>
);

var triObj = {}, // 用于传递宾语键值对和变量
    triArray = {}, // 用于传递生成的宾语
    // 新建实例
    group = new justObjectgroup(),
    oS = new operateStrings(),
    bD = new buildDialogs();

changeToViewXML(batchTriggerGenerationToolView);
ui.button1.on("click", () => inputObj()); // 正常创建按钮监听器
ui.button2.on("click", () => bD.sTD());
ui.button3.on("click", () => loadFile());

/* 函数部分 */
// print("")
function loadFile() {
    bD.sC((index) => {
        if (index == 0) {
            bD.sMID("请输入配置文件的绝对路径", SDDir, (input) => {
                if (input) {
                    pareINIhr(input, group);
                    // let content = oGroup_return_file(group);
                    writeIn(0);
                }
            })
        } else if (index == 1) {
            bD.sMID("请输入配置文件的绝对路径", SDDir, (input) => {
                if (input) {
                    try { // 尝试读取文件
                        var content = files.read(input);
                    } catch (e) {
                        var content = false
                    } finally {
                        if (!content) {
                            toast("读取失败，请检查路径是否正确");
                            return
                        };
                    }
                    triArray = [];
                    let setsArray = content.split("<||>");
                    let err = false;
                    setsArray.forEach((set) => {
                        if (err == true) return;
                        let [key, value] = set.split("<|>").map((element) => {
                            return element.trim();
                        });
                        if (key && value) {
                            oS.oI1(key);
                            if (!oS.cP("i1", "f", triObj, key)) {
                                err = true;
                                return;
                            };
                            let [paramExp, loop] = oS.oI2(value);
                            if (!oS.cP("i2", "f", [paramExp, loop], value)) {
                                err = true;
                                return;
                            };
                            oS.gO(paramExp, loop, true);
                        }
                    });
                    if (!err) {
                        writeIn(1);
                    }
                }
            });
        }
    })
}

function inputObj(reInput, errCode) {
    let attObjArray = Object.entries(attObj);
    let attrStrings = attObjArray.map(attr => attr[0] + ": " + attr[1]).join("\n");
    bD.sMID("输入键值对和变量", reInput ? reInput : attrStrings, (input) => {
        oS.oI1(input);
        log(triObj);
        if (!oS.cP("i1", "d", triObj, input)) {
            return;
        };
        inputOpt();
    }, errCode);
}

function inputOpt(reInput, errCode) {
    bD.sMID("输入循环次数和变量表达式", reInput || "loop: ", (input) => {
        let [paramExp, loop] = oS.oI2(input);
        if (!oS.cP("i2", "d", [paramExp, loop], input)) {
            return;
        };
        oS.gO(paramExp, loop);
        writeIn(1);
    }, errCode);
}

function writeIn(mode, content, name, toastText) {
    if (mode != -1) {
        bD.sPMID("请输入待导入的地图路径", SDDir, (input, bool) => {
            if (mode == 0) { // ini
                var content = oGroup_return_file(group);
            } else if (mode == 1) { // txt
                var content = oS.gXS(bool);
            }
            log(bool);
            if (!bool) {
                let uri = files.join(files.join(SDDir, "Documents/Trigger/"), input);
                files.createWithDirs(uri);
                files.write(uri, content);
                toast("保存成功，请前往对应文件查看");
            } else {
                let [xmlContent1, xmlContent2] = openMap(input);
                files.write(input, xmlContent1 + content + xmlContent2);
                toast("保存成功，请前往对应文件查看");
            }
        });
    } else {
        let uri = files.join(files.join(SDDir, "Documents/Trigger/"), name);
        files.createWithDirs(uri);
        files.write(uri, content);
        toast(toastText);
    }
}

function openMap(uri) {
    let file = open(uri, "r");
    let content = file.read();
    file.close();
    let f = content.indexOf('<objectgroup name="Triggers">');
    f = (f != -1) ? f : content.indexOf('<objectgroup name="triggers">');
    // let t = f + content.slice(f).indexOf('</objectgroup>')
    let xmlContent1 = content.slice(0, f + 29);
    let xmlContent2 = content.slice(f + 29);
    return [xmlContent1, xmlContent2]
}

function escapeXML(str) {
    return str.replace(/[<>&'"]/g, function(c) {
        switch (c) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            case "'":
                return '&#39;';
            case '"':
                return '&quot;';
        }
    });
}

/* 函数类部分 */ // 使用函数模拟类的行为

// 构建自定义对话框类
function buildDialogs() {
    // showMultilineInputDialog
    this.sMID = function(title, text, callback, errCode) { // 自定义多行输入对话框
        global['editViewText'] = text;
        global["editView"] = ui.inflate(editViewXML);
        errCode ? inputView.input.setError(errCode) : {};
        dialogs.build({
            customView: editView,
            title: title,
            positive: "确定",
            negative: "取消",
            cancelable: false
        }).on("positive", () => {
            let input = editView.input.text();
            if (input == "") {
                toast("未输入任何内容");
                return;
            }
            callback(input);
        }).on("negative", () => {}).show();
    }
    this.sPMID = function(title, text, callback, errCode) { // 自定义多行输入对话框
        global['pathViewText'] = text;
        global["pathView"] = ui.inflate(pathViewXML);
        var bool = true;
        errCode ? inputView.input.setError(errCode) : {};
        let dialog = dialogs.build({
            customView: pathView,
            title: title,
            positive: "确定",
            negative: "取消",
            cancelable: false
        }).on("positive", () => {
            let input = pathView.input.text();
            if (input == "") {
                toast("未输入任何内容");
                return;
            }
            log("a", bool);
            callback(input, bool);
        }).on("negative", () => {}).show();
        pathView.isMap.on("check", (b) => {
            if (b) {
                bool = true;
                dialog.setTitle("请输入待导入的地图路径");
                pathView.input.setText(SDDir);
                /*
                ui.run(function() {// 弃用的一种设置标题的方式
                    var titleView = dialog.getWindow().getDecorView().findViewById(android.R.id.title);
                    if (titleView instanceof android.widget.TextView) {
                        titleView.setText("请输入待导出的地图路径");
                    }
                });*/
            } else {
                bool = false;
                dialog.setTitle("请输入待导出的文件名称");
                pathView.input.setText("");
            }
        });
    }
    // showAboutDialog
    this.sAD = function() {
        dialogs.build({
                title: "关于",
                content: '作者：print("")\n热更新已开启\n版本号：' + verArray[0] + '.' + verArray[1] + '.' + verArray[2] + '.' + verArray[3] + "\n" + "通过推广本工具支持我们",
                positive: "推广",
                neutral: "检测更新"
            })
            .on("positive", () => {
                setClip("https://wwp.lanzoup.com/iF14E25ateub");
                toast("已复制工具的下载链接");
            })
            .on("neutral", () => {
                updateFiles(true);
            })
            .show();
    };
    // showTutorialDialog
    this.sTD = function() {
        dialogs.build({
                title: "教程",
                content: "精力有限，无法及时更新教程\n请以实际情况为准~",
                positive: "新手教程",
                neutral: "进阶教程"
            })
            .on("positive", () => {
                app.openUrl("https://zhuanlan.zhihu.com/p/710487172?utm_psn=1799135800694292480");
            })
            .on("neutral", () => {
                toast(uDT);
            })
            .show();
    }
    this.sC = function(callback) {
        dialogs.build({
            title: "请选择导入的文件格式",
            items: ["ini", "字符串"],
            itemsSelectMode: "single",
            itemsSelectedIndex: 0
        }).on("single_choice", (index, item) => {
            callback(index);
        }).show();
    }
}

// 操作字符串类
function operateStrings() {
    // operateinput1
    this.oI1 = function(input) {
        let newItemObj = input.split("\n").reduce((acc, string, index) => {
            if (string.indexOf(":") >= 0) {
                let [name, value] = string.split(":").map(s => s.trim());
                if (acc.lastAttributeName != "height" && acc.lastAttributeName != "prop") {
                    acc[name] = value;
                    acc.lastAttributeName = name;
                } else {
                    acc.prop = acc.prop || [];
                    acc.prop.push({
                        name,
                        value
                    });
                    acc.lastAttributeName = "prop";
                }
            } else {
                if (acc.lastAttributeName != "prop") {
                    acc[acc.lastAttributeName] += "\n" + string;
                } else {
                    acc.prop[acc.prop.length - 1].value += "\n" + string;
                }
            }
            return acc;
        }, {});
        delete newItemObj.lastAttributeName;
        triObj = newItemObj;
    }
    // operateinput2
    this.oI2 = function(input) {
        let inputLines = input.split("\n");
        let paramExp = {};
        let loop = 0;
        inputLines.forEach(line => {
            let [key, value] = line.split(":");
            if (key && value) {
                if (key.trim() === "loop") {
                    loop = parseInt(value.trim());
                } else {
                    paramExp[key.trim()] = value.trim();
                }
            }
        });
        return [paramExp, loop];
    }
    // generateObjects
    this.gO = function(paramExp, loop, bool) {
        bool ? {} : triArray = []; //格式化传递变量
        for (let i = 0; i < loop; i++) {
            let newObject = JSON.parse(JSON.stringify(triObj));
            for (let [key, value] of Object.entries(newObject)) {
                if (typeof value === 'string') {
                    newObject[key] = value.replace(/\$\{(\w+)\}/g, (match, p1) => {
                        if (paramExp[p1]) {
                            let evaluatedValue = eval(paramExp[p1].replace(/\%\{(\i+)\}/g, i.toString()));
                            return evaluatedValue !== undefined ? String(evaluatedValue) : match;
                        } 
                        return match;
                    });
                } else if (Array.isArray(value)) {
                    newObject[key] = value.map(item => {
                        let newItem = JSON.parse(JSON.stringify(item));
                        for (let [k, v] of Object.entries(newItem)) {
                            if (typeof v === 'string') {
                                newItem[k] = v.replace(/\$\{(\w+)\}/g, (match, p1) => {
                                    if (paramExp[p1]) {
                                        let evaluatedValue = eval(paramExp[p1].replace("i", i.toString()));
                                        return evaluatedValue !== undefined ? String(evaluatedValue) : match;
                                    }
                                    return match;
                                });
                            }
                        }
                        return newItem;
                    });
                }
            }
            triArray.push(newObject);
        }
    }
    // generateXMLString
    this.gXS = function(bool) {
        if (!bool) {
            var xmlOutput = '  <objectgroup name="Triggers">'
        } else {
            var xmlOutput = "";
        }
        for (let i = 0; i < triArray.length; i++) {
            let obj = triArray[i];
            xmlOutput += '\n    <object';
            for (let key of attArray) {
                xmlOutput += ` ${escapeXML(key)}="${escapeXML(obj[key])}"`;
            }
            if (obj.prop && obj.prop.length > 0) {
                xmlOutput += '>';
                xmlOutput += '\n      <properties>';
                for (let prop of obj.prop) {
                    xmlOutput += `\n        <property name="${escapeXML(prop.name)}" value="${escapeXML(prop.value)}" />`;
                }
                xmlOutput += '\n      </properties>\n    ';
                xmlOutput += '</object>';
            } else {
                xmlOutput += " />";
            }
        }
        if (!bool) xmlOutput += '\n  </objectgroup>';
        return xmlOutput;
    }
    // checkParameter
    this.cP = function(mode, _mode, p, input) {
        let error = false;
        if (mode == "i1") {
            if (input.indexOf("\n") == 0) {
                error = "不应出现无意义的空行";
            } else {
                let array = attArray.map((att) => {
                    return att
                });
                for (let key in p) {
                    let i = array.indexOf(key);
                    if (i != -1) {
                        array.splice(i, 1);
                    };
                }
                if (array.length != 0) {
                    error = "缺少必要属性:" + array;
                }
            }
            if (error) {
                if (_mode == "d") {
                    inputObj(input, error);
                } else if (_mode == "f") {
                    writeIn(-1, input + "\n" + error, "error.txt", error.slice(0, 6) + "…，" + "详情请查看error.txt");
                }
                return false;
            };
            return true;
        } else if (mode == "i2") {
            let [paramExp, loop] = p;
            if (input.indexOf("\n\n") != -1 || input.indexOf("\n") == 0 || input.indexOf("\n") == input.length - 1) {
                error = "不应出现无意义的空行";
            } else if (isNaN(loop)) {
                error = "循环次数必须定义";
            } else if (loop <= 0) {
                error = "循环次数必须是大于0的整数";
            }
            if (error) {
                if (_mode == "d") {
                    inputOpt(input, error);
                } else if (_mode == "f") {
                    writeIn(-1, input + "\n" + error, "error.txt", error.slice(0, 6) + "…，" + "详情请查看error.txt");
                }
                return false;
            };
            return true;
        }
    }
}
// 这并没有什么技术含量，只是为了完成我在ini构建触发器开发的愿望
// 还有本人更熟练C/C++，并不是js

const G_ISFLOAT = {

    "object_id": 0,
    "object_x": 0,
    "object_y": 0,
    "object_width": 0,
    "object_height": 0,
    "object_gid": 0,

    "setStats": 2,
    "actionLoop": 2,
    "endJump": 2,

    "credits": 0,
    "team": 0,
    "lockAiDifficulty": 0,
    "allyGroup": 0,
    "dir": 0,
    "zoomTo": 0,
    "index": 0,
    "team": 0,
    "onlyTechLevel": 0,
    "minUnits": 0,
    "maxUnits": 0,
    "textOffsetX": 0,
    "textOffsetY": 0,
    "textSize": 0,
    "textOffsetX": 0,
    "textOffsetY": 0,
    "textSize": 0,
    "add": 0,
    "set": 0,

    "warmup": 1,
    "delay": 1,
    "repeatDelay": 1,
    "resetActivationAfter": 1,

    "maxSpawnLimit": 0,
    "techLevel": 0,
    "offsetX": 0,
    "offsetY": 0,
    "offsetRandomXY": 0,
    "offsetRandomX": 0,
    "offsetRandomY": 0,
    "offsetHeight": 0,
    "offsetRandomDir": 0,
    "offsetDir": 0
}
//  确定键值为float/int的对象，值1为time

function justObject() //  object的构造函数
{
    this.object_id = 0; //  悲观的是，id并不必备，但是一些人以id整齐为荣
    this.object_x = -20;
    this.object_y = -20;
    this.object_width = 20;
    this.object_height = 20; // 最好的想法是在设置中x/y/width/height初始化状态
    this.loop = 1;

    this.object_props = {};
    this.object_label = null;
    this.define_init = {};
}

const EVAL_REGEX = /('[^']+'|(?:[a-zA-Z_][a-zA-Z0-9_.]+))([ \t]*\()?/g;
const EVAL_RMACRO = /\$\{.+?}/g; // 正则表达式

function rReplaceStr(str) {

    return '`' + str.replace(EVAL_RMACRO, (match) => rReplaceVar(match)) + '`'; // 散装字符串模板
}

function rReplaceVar(str) {

    return str.replace(EVAL_REGEX, (match, p1, p2) => {

        if (match[0] == "'") return rReplaceStr(p1.slice(1, -1)); // 如果是字符串则跳过
        if (p2 != undefined) return match; // 如果是函数则跳过
        if (p1.startsWith("global.")) return "this." + match; // 处理全局变量
        else return "this.define." + match;
    });
}

function rReplaceAttr(pair) {

    const isNum = G_ISFLOAT[pair[0]];
    if (isNum == undefined) return rReplaceStr(pair[1]);
    else if (isNum == 1 && pair[1].endsWith(" s"))
        return '(' + rReplaceVar(pair[1].slice(0, -2)) + ") * 1000"; // 值为time且后缀为' s'则x*1000
    return rReplaceVar(pair[1]);
}

function justObjectgroup() //  objectgroup的构造函数
{
    this.object_group = {}; //  存储object，尽管在这例子中并不明显
    this.global = {};
    this.define = {
        index: 0
    };

    this.stDefine_it = function(o) {

        for (let [key, vals] of Object.entries(o.define_init)) {
            if (vals[0] == 0) this.define[key] = eval(vals[1]);
            else this.global[key] = eval(vals[1]); // 遍历define_init获取变量属性
        }
        this.setStats = o.setStats;
    }
    this.psGroupToXMLhr = function(object) {

        this.stDefine_it(object);
        let XMLstr = this.psObj_toXML(object);
        while (++this.define.index < eval(object.loop)) // 循环，直到index==loop
        {
            eval(object.setStats);
            XMLstr += this.psObj_toXML(object);
        }
        this.define = {
            index: 0
        }; // 清理define对象
        return XMLstr;
    }
    this.parse_toXML = function() {

        let result = "";
        for (let [key, val] of Object.entries(this.object_group))
            if (!key.startsWith("hidden_")) result += this.psGroupToXMLhr(val);
        return result;
    }
    this.psOprops_toXML = function(object) {

        let poXMLs = "      <properties>";
        for (let [key, val] of Object.entries(object.object_props)) {

            val = eval(val);
            if (val[0] === '\n')
                poXMLs += `<property name="${key}" >${val}\n        </property>`;
            else poXMLs += `\n        <property name="${key}" value="${val}" />`;
        }
        return poXMLs + "\n      </properties>";
    }

    this.psObjectAr_toXML = function(n, t, x, y, w, h) {

        return `    <object${n ? ` name="${n}"` : ''}${t ? ` type="${t}"` : ''}` +
            ` x="${x}" y="${y}" width="${w}" height="${h}"`
    }

    this.psObj_toXML = function(o) {

        let XMLstr = '\n' + this.psObjectAr_toXML(
            eval(o.object_name), eval(o.object_type),
            eval(o.object_x), eval(o.object_y),
            eval(o.object_width), eval(o.object_height)
        )
        if (!Object.keys(o.object_props).length)
            return ("object_name" in o || "object_type" in o) ? XMLstr + ' />' : '\n';
        XMLstr += '>\n';
        if (o.object_label) XMLstr += `      <${o.object_label} />\n`
        return XMLstr + `${this.psOprops_toXML(o)}\n    </object>`;
    }

    this.setO_action = function(o) // 属性推入完后调用它，很简单
    {
        o.loop = o.object_props.actionLoop;
        delete o.object_props.actionLoop;
        o.setStats = o.object_props.setStats;
        delete o.object_props.setStats; // 将对象属性转移到object对象
    }

    this.setPret = function(pair, o) {

        if (pair[0].startsWith("@copyFrom"))
            object_copy(o, this.object_group[pair[1]]); //复制该节
        else this.define_split(pair, o);
    }

    this.define_split = function(pair, o) // name: [type (0 or 1), value];
    {
        const dInfo = pair[0].split(' ');
        o.define_init[dInfo[1]] = [(dInfo[0] == "@define" ? 0 : 1), pair[1]];
    }

    this.pushPair_object = function(pair, o) {

        if (pair.length !== 2) return; //  pair为长度为2的数组，它更像结构体而不是数组
        pair[0] = pair[0].trim();
        pair[1] = pair[1].trim();
        if (pair[0].startsWith("object_")) o[pair[0]] = rReplaceAttr(pair); // object_前缀则推入object节点， 不检查内容
        else if (pair[0][0] == '@') this.setPret(pair, o); // 或许props和object应该使用不同的替换函数
        else o.object_props[pair[0]] = rReplaceAttr(pair)
    }
}

function OcopyONode(result, other) {

    result.object_name = other.object_name; // 手动替换name, type, id, x, y, w, h ...
    result.object_type = other.object_type;
    result.object_id = result.object_id;
    result.object_x = result.object_x;
    result.object_y = result.object_y;
    result.object_width = result.object_width;
    result.object_height = result.object_height;
    result.object_label = result.object_label;
}

function object_copy(result, other) {

    OcopyONode(result, other);
    Object.assign(result.object_props, other.object_props);
    Object.assign(result.define_init, other.define_init);
}

function oGroup_return_file(group) //  写入文件 返回写入结果（false为失败）
{
    /*
    files.create(path_char_t);
    var file_data = files.read(path_char_t);
    if (file_data === null) return false;*/
    file_data = group.parse_toXML();
    /*
        files.write(path_char_t, file_data);*/
    return file_data;
}

function pareINIhr(file_path, g) {
    let lines_string = files.read(file_path).split('\n'); //  读取分隔文件内容为数组
    let section = "";

    for (let line of lines_string) {

        line = line.trim();
        if (line.length === 0 || line[0] === '#') continue; // 这是注释
        if (line[0] === '[' && line.endsWith(']')) { //这是节

            if (section != "") g.setO_action(g.object_group[section]);
            section = line.slice(1, -1);
            g.object_group[section] = new justObject();
        } else g.pushPair_object(line.split(':'), g.object_group[section]); // 这是键值
    }
    g.setO_action(g.object_group[section]); //  我很讨厌这行代码
    return g.parse_toXML();
}

//  冷知识 name可以作为触发器的id（properties节点），并且更可观。重点：RW源码实现为检查id是否为null，真则将name作为id（Java）
//  RW源码会率先检查activateIds和whenActivatedIds，随后为alsoActivate和activatedBy，但更常用的是后者
//  类型info和关键字comment可以充当注释作用，尽管主流触发“代码”表中没有补充它们（aggressiveTeam也是）
//  RW源码中触发器spawnUnits函数和inimod的函数并不相同，但尽管大部分关键字都相同
//  width和height的数值有效上限为32767（约1638格），对应Java中的short类型
//  开局配置中运输机/艇装载范围半径为60（3格），且不写map_info则无法实现
//  如果地图的触发含有大量报错则需要大量的加载时间，因为Java（包括其他编程语言）抛出异常会有时间消耗
//  实际上，globalMessage和text支持\n转义，但是没有任何效果
//  当一个触发器激活源为0时，填allToActivate则该触发器无法激活（bug，更常说是LUKE的史