## 1.1. API 接口说明

- 接口基准地址：`http://127.0.0.1:8000`
- 服务端已开启 CORS 跨域支持
- API 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 1.1.1. 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

### 1.1.2. 通用返回状态说明

| *状态码* | *含义*                | *说明*                                              |
| -------- | --------------------- | --------------------------------------------------- |
| 200      | OK                    | 请求成功                                            |
| 201      | CREATED               | 创建成功                                            |
| 204      | DELETED               | 删除成功                                            |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED          | 未授权                                              |
| 403      | FORBIDDEN             | 被禁止访问                                          |
| 404      | NOT FOUND             | 请求的资源不存在                                    |
| 422      | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500      | INTERNAL SERVER ERROR | 内部错误                                            |
|          |                       |                                                     |

------

## 1.2. 登录

### 1.2.1. 登录验证接口

- 请求路径：login
- 请求方法：post
- 请求参数
- form 格式 x-www-form-urlencoded

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名   | 参数说明 | 备注            |
| -------- | -------- | --------------- |
| username | 用户名   |                 |
| token    | 令牌     | 基于 jwt 的令牌 |

- 响应数据

```json
{
    "status": 0,
    "message": "登陆成功!",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJuaWFpZXIiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjpudWxsLCJlbWFpbCI6bnVsbCwidXNlcl9waWMiOiIiLCJpYXQiOjE2MTQ1ODMxMDMsImV4cCI6MTY1MDU4MzEwM30.cAluRv3ehPevVhBczFklE9Y3MTfX4tHaNA_sOD7SHzI"
}
```

## 1.3注册

### 1.3.注册验证接口

- 请求路径：reguser
- 请求方法：post
- 请求参数
- form 格式 x-www-form-urlencoded

| 参数名   | 参数说明 | 备注             |
| -------- | -------- | ---------------- |
| username | 用户名   | 不能为空,1到10位 |
| password | 密码     | 不能为空,6到12位 |

- 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| status  | 状态     |      |
| message | 提示信息 |      |

- 响应数据

```json
{
    "status": 0,
    "message": "注册成功"
}
```

## 1.4获取用户基本信息

### 1.4.1获取用户基本信息接口

- 请求路径：my/userinfo
- 请求方法：get
- 请求参数:   headers中基于 jwt的tokrn令牌


- 响应参数

| 参数名  | 参数说明     | 备注 |
| ------- | ------------ | ---- |
| status  | 状态         |      |
| message | 提示信息     |      |
| data    | 用户基本信息 |      |

- 响应数据

```json
{
    "status": 0,
    "message": "获取用户基本信息成功！",
    "data": {
        "id": 2,
        "username": "niaier",
        "nickname": "niaier",
        "email": "niaier@outlook.com"
    }
}
```


## 1.5更新用户基本信息


### 1.5.1更新用户基本信息接口

- 请求路径：my/userinfo
- 请求方法：post
- 请求参数:   headers中基于 jwt的tokrn令牌
- form 格式 x-www-form-urlencoded
- 

| 参数名    | 参数说明 		   | 备注             |
| -------- | --------           | ---------------- |
| id 	   | 用户id | 不能为空,1到10位 |
| nickname | 昵称     		  | 不能为空 |
| email    | 邮箱     		  | 不能为空 |

- 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| status  | 状态     |      |
| message | 提示信息 |      |

- 响应数据

```json
{
    "status": 0,
    "message": "更新用户信息成功！"
}
```




### 1.5.2重置密码接口

- 请求路径：my/updatepwd

- 请求方法：post

- 请求参数:   headers中基于 jwt的tokrn令牌
- form 格式 x-www-form-urlencoded
- 

  

| 参数名    | 参数说明 		   | 备注             |
| -------- | --------           | ---------------- |
| oldPwd | 旧密码  | 不能为空,6到12位 |
| newPwd | 新密码     	| 不能为空,6到12位 |

- 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| status  | 状态     |      |
| message | 提示信息 |      |

- 响应数据

```json
{
    "status": 0,
    "message": "更新密码成功！"
}
```

## 1.6更新用户头像


### 1.6.1更新用户头像接口

- 请求路径：my/update/avatar

- 请求方法：post

- 请求参数:   headers中基于 jwt的tokrn令牌
- form 格式 x-www-form-urlencoded
- 

  

| 参数名    | 参数说明 		   | 备注             |
| -------- | --------           | ---------------- |
| oldPwd | 旧密码  | 不能为空,6到12位 |
| newPwd | 新密码     	| 不能为空,6到12位 |

- 响应参数

| 参数名   | 参数说明 | 备注            |
| -------- | -------- | --------------- |
| status | 状态     |                 |
| message | 提示信息 |  |

- 响应数据

```json
{
    "status": 0,
    "message": "更新头像成功！"
}
```


## 1.7更新用户头像


### 1.7.1更新用户头像接口

- 请求路径：my/update/avatar
- 请求方法：get
- 请求参数:   headers中基于 jwt的tokrn令牌
- form 格式 x-www-form-urlencoded
- 

  

| 参数名    | 参数说明 		   | 备注             |
| -------- | --------           | ---------------- |
| oldPwd | 旧密码  | 不能为空,6到12位 |
| newPwd | 新密码     	| 不能为空,6到12位 |

- 响应参数

| 参数名   | 参数说明 | 备注            |
| -------- | -------- | --------------- |
| status | 状态   | 0:成功 |

- 响应数据

```json
{
    "status": 0,
    "message": "更新头像成功！"
}
```

## 1.8获取video页面数据


### 1.8.1获取video页面数据接口

- 请求路径：api/video
- 请求方法：get

  

  

| 参数名    | 参数说明 		   | 备注             |
| -------- | --------           | ---------------- |
| sort | 排序参数  |根据日期喜爱等排序|
| desc | 正序倒序     	|  |
| page | 当前页码值 | |

- 响应参数

| 参数名   | 参数说明 | 备注            |
| -------- | -------- | --------------- |
| video | video列表数据 |                 |
| total | 总数据条数  |      |

- 响应数据

```json
{
    "status": 0,
    "message": "获取video数据成功!",
    "total": 8469,
    "video": [
        {
            "id": 81771,
            "dirname": 202102141244,
            "playurl": "/videos/mo1evtlgelc8z6zmq?language=ja",
            "title": "こずえ「メランコリック」",
            "producer": "meme432",
            "categories": "Uncategorized,iDOLM@STER",
            "upload_time": "2021-02-14T04:44:00.000Z",
            "love": 513,
            "views": "101k",
            "description": "ハッピーバレンタイン！\nhttps://meme432.fanbox.cc/\n",
            "isDown": 1,
            "isLoved": null,
            "playlist": null
        },
        
    	...
    	]
    }
```



## 1.9获取love页面数据


### 1.9.1获取love页面数据接口

- 请求路径：api/love

- 请求方法：get

- 请求参数:   headers中基于 jwt的tokrn令牌

  

| 参数名   | 参数说明 | 备注               |
| -------- | -------- | ------------------ |
| sort     | 排序参数 | 根据日期喜爱等排序 |
| desc     | 正序倒序 |                    |
| loveLvel | 喜爱等级 |                    |

- 响应参数

| 参数名 | 参数说明      | 备注 |
| ------ | ------------- | ---- |
| video  | video列表数据 |      |
| total  | 总数据条数    |      |

- 响应数据



```json
{
    "status": 0,
    "message": "获取video数据成功!",
    "total": 24,
    "loveData": [
        {
            "id": 19,
            "dirname": 202008141305,
            "playurl": "/videos/rwebeh3l1iovlz0p",
            "title": "白丝过膝袜 over-knee socks N",
            "producer": "咕嘿嘿",
            "categories": "Uncategorized",
            "upload_time": "2020-08-14T05:05:00.000Z",
            "love": 1848,
            "views": "556k",
            "description": "enjoy.\n2k 60fps no watemark on https://www.patreon.com/guheihei\nor\n2k 60fps 无水印 在爱发电主页 https://afdian.net/@guheiheimmd\n你们的赞助和支持就是我最大的动力，期待之后给大家带来更好的视频！\nYour sponsorship and support is my biggest motivation, I hope to bring you a better video afterwards!\n",
            "isDown": 1,
            "isLoved": null,
            "playlist": null,
            "v_id": 202008141305,
            "love_level": 7
        },
    	...
    ]
}
```



## 1.10获取playlist列表页面数据


### 1.10.1获取列表页面playlist数据接口

- 请求路径：/playlist

- 请求方法：get

- 请求参数:   headers中基于 jwt的tokrn令牌

  

| 参数名   | 参数说明   | 备注               |
| -------- | ---------- | ------------------ |
| playlist | 列表名和id | 根据日期喜爱等排序 |

- 响应参数

| 参数名 | 参数说明      | 备注 |
| ------ | ------------- | ---- |
| video  | video列表数据 |      |
| total  | 总数据条数    |      |

- 响应数据

```json
{
    "status": 0,
    "message": "获取playlist数据成功!",
    "playlist": [
        {
            "playListId": 108,
            "playListName": "1233"
        },
        {
            "playListId": 115,
            "playListName": "listname"
        },
        {
            "playListId": 117,
            "playListName": null
        }
    ]
}
```






### 1.10.2获取列表页面所有视频数据接口

- 请求路径：/playlist/all

- 请求方法：get

- 请求参数:   headers中基于 jwt的tokrn令牌

  

| 参数名   | 参数说明   | 备注               |
| -------- | ---------- | ------------------ |
| playlist | 列表名和id | 根据日期喜爱等排序 |

- 响应参数

| 参数名  | 参数说明             | 备注 |
| ------- | -------------------- | ---- |
| results | 播放列表所有视频数据 |      |
| total   | 总数据条数           |      |

- 响应数据

```json
http://127.0.0.1:8000/api/playlist/all
{
    "status": 0,
    "message": "获取playlist数据成功!",
    "total": 5,
    "results": [
       
        {
            "id": 7,
            "v_id_dirname": 201402282237,
            "p_id_playListId": 115,
            "dirname": 201402282237,
            "playurl": "/videos/ljy0hZHpwr4r1",
            "title": "[MMD] Louise kiss",
            "producer": "Woodscrew",
            "categories": "Uncategorized",
            "upload_time": "2014-02-28T14:37:00.000Z",
            "love": 124,
            "views": "857k",
            "description": "Louise\n",
            "isDown": 1,
            "isLoved": null,
            "playlist": null
        },
        {
            "id": 7,
            "v_id_dirname": 201402282237,
            "p_id_playListId": 115,
            "dirname": 201402282237,
            "playurl": "/videos/ljy0hZHpwr4r1",
            "title": "[MMD] Louise kiss",
            "producer": "Woodscrew",
            "categories": "Uncategorized",
            "upload_time": "2014-02-28T14:37:00.000Z",
            "love": 124,
            "views": "857k",
            "description": "Louise\n",
            "isDown": 1,
            "isLoved": null,
            "playlist": null
        }
        ...
    ]
}
```


### 1.10.3获取列表页面指定playlist列表视频数据接口

- 请求路径：/playlist/:id

- 请求方法：get

- 请求参数:   headers中基于 jwt的tokrn令牌

  

| 参数名 | 参数说明       | 备注 |
| ------ | -------------- | ---- |
| id     | playlist列表id |      |

- 响应参数

| 参数名  | 参数说明             | 备注 |
| ------- | -------------------- | ---- |
| results | 播放列表所有视频数据 |      |
| total   | 总数据条数           |      |

- 响应数据

```json
http://127.0.0.1:8000/api/playlist/108
{
    "status": 0,
    "message": "获取指定playlist数据成功!",
    "total": 3,
    "playlistData": [
        {
            "id": 54902,
            "v_id_dirname": 202005311452,
            "p_id_playListId": 108,
            "dirname": 202005311452,
            "playurl": "/videos/x57rqf362aswyy9ld",
            "title": "尻神樣HAKU-Conqueror",
            "producer": "二两牛肉面JD",
            "categories": "Uncategorized",
            "upload_time": "2020-05-31T06:52:00.000Z",
            "love": 981,
            "views": "215k",
            "description": "Happy Children's Day！！！\n经 典 诈 尸\nIf you like my work,please subscribe to my bilibili ! ! !\n如果给大爷恁整乐了建议赏个关注\nhttps://space.bilibili.com/39555456\n",
            "isDown": 1,
            "isLoved": null,
            "playlist": null
        },
	...
    ]
}
```



## 1.11获取play播放页面数据


### 1.11.1获取play播放页面数据接口

- 请求路径：api/play/:dirname

- 请求方法：get

- 请求参数:   headers中基于 jwt的tokrn令牌

  

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| dirname | 视频id   |      |

- 响应参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| video  | 视频相关数据 |      |

- 响应数据

```json
{
    "status": 0,
    "message": "获取play数据成功!",
    "video": {
        "id": 54902,
        "dirname": 202005311452,
        "playurl": "/videos/x57rqf362aswyy9ld",
        "title": "尻神樣HAKU-Conqueror",
        "producer": "二两牛肉面JD",
        "categories": "Uncategorized",
        "upload_time": "2020-05-31T06:52:00.000Z",
        "love": 981,
        "views": "215k",
        "description": "Happy Children's Day！！！\n经 典 诈 尸\nIf you like my work,please subscribe to my bilibili ! ! !\n如果给大爷恁整乐了建议赏个关注\nhttps://space.bilibili.com/39555456\n",
        "isDown": 1,
        "isLoved": null,
        "playlist": null
    }
}
```

### 1.11.2获取playlist数据接口

- 请求路径：/play/:dirname/list

- 请求方法：get

- 请求参数:   headers中基于 jwt的tokrn令牌

  

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| dirname | 视频id   |      |

- 响应参数

| 参数名 | 参数说明               | 备注 |
| ------ | ---------------------- | ---- |
| list   | 当前视频存在的播放列表 |      |

- 响应数据

```json
{
    "status": 0,
    "message": "获取play数据成功!",
    "list": [
        108
    ]
}
```



### 1.11.3获取love喜爱数据接口

- 请求路径：/play/:dirname/love

- 请求方法：get

- 请求参数:   headers中基于 jwt的tokrn令牌

  

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| dirname | 视频id   |      |

- 响应参数

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| loveLevel | 喜爱等级 |      |

- 响应数据

```json
{
    "status": 0,
    "message": "获取Love数据成功!",
    "loveLevel": 6
}
```



### 1.11.4操作love喜爱数据接口

- 请求路径：/play/:dirname/love/:level

- 请求方法：put

- 请求参数:   headers中基于 jwt的tokrn令牌

  

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| dirname | 视频id   |      |

- 响应参数

| 参数名  | 参数说明         | 备注 |
| ------- | ---------------- | ---- |
| results | 添加喜爱操作结果 |      |

- 响应数据

```json
{
    "status": 0,
    "message": "添加love数据成功!",
    "results": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 34,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```

### 

### 1.11.5添加playlist列表接口

- 请求路径：/play/list/:listname

- 请求方法：put

- 请求参数:   headers中基于 jwt的tokrn令牌

  

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| listname | 列表名   |      |

- 响应参数

| 参数名 | 参数说明         | 备注 |
| ------ | ---------------- | ---- |
| list   | 添加playlist结果 |      |

- 响应数据

```json
{
    "status": 0,
    "message": "添加playlist数据成功!",
    "list": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 116,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```





### 1.11.6添加到或删除myplaylist我的播放列表



- 请求路径：/play/:dirname/list/:id/:ismylist

- 请求方法：put

- 请求参数:   headers中基于 jwt的tokrn令牌

  

| 参数名   | 参数说明                   | 备注        |
| -------- | -------------------------- | ----------- |
| dirname  | 视频id                     |             |
| id       | 列表id                     |             |
| ismylist | 判断是否添加到我的播放列表 | true或false |

- 响应参数

| 参数名  | 参数说明     | 备注 |
| ------- | ------------ | ---- |
| results | 操作返回结果 |      |
|         |              |      |



```
http://127.0.0.1:8000/api/play/202003081907/list/108/true
添加
{
    "status": 0,
    "message": "添加到我的列表成功",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 41,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}

http://127.0.0.1:8000/api/play/202003081907/list/108/false
删除
{
    "status": 0,
    "message": "删除到我的列表成功",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 34,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}



```





### 1.11.7删除playlist播放列表

- 请求路径：/play/:dirname/list/:id

- 请求方法：delete

- 请求参数:   headers中基于 jwt的tokrn令牌

  

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| dirname | 视频id   |      |
| id      | 列表id   |      |

- 响应参数

| 参数名  | 参数说明     | 备注 |
| ------- | ------------ | ---- |
| results | 操作返回结果 |      |
|         |              |      |



- 响应数据

```json

delete http://127.0.0.1:8000/api/play/23232323223/list/116
{
    "status": 0,
    "message": "删除列表数据和myplaylist成功!",
    "results": {
        "fieldCount": 0,
        "affectedRows": 2,
        "insertId": 0,
        "serverStatus": 34,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

