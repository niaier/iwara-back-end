



## 文件及目录说明



- API接口文档

  前端向后台发送请求说明

- db

  数据库配置

- db数据库数据

sqlyog导出的数据库数据,导入自己的数据库使用,注意数据库配置



```js
.
|-- API接口文档  前端向后台发送请求说明
|-- Readme
|-- Readme.md
|-- app.js 入口
|-- config.js
|-- db	 sqlyog导出的数据库数据,导入自己的数据库使用,注意数据库配置	
|-- db数据库数据 数据库配置
|-- node_modules
|-- package-lock.json
|-- package.json
|-- router
|-- router_handler
|-- schema 加密
|-- sql.sql
`-- 错误总结.js

```







## css参考 

### 布局参考

每一个区块中使用flex布局

b站参考

```css
.zone-list-box {
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1286px;
    height: 404px;
}
```





## 解压数组



## 导出数据库

```sql
mysqldump -u root -p iwara_copy >dbtest.sql
```

