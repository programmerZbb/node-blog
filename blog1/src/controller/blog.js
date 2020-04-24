const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    //格式正确的假数据
    let sql = `select * from blog where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blog where id='${id}';`
    return exec(sql)
}

const saveBlog = (newBlog = {}) => {
    let createtime = Date.now()
    let sql = `insert into blog (title, content, createtime, author) 
                values ('${newBlog.title}', '${newBlog.content}', '${createtime}', '${newBlog.author}');`
    return exec(sql)
}

const updateBlog = (data = {}) => {
    let sql = `update blog set title='${data.title}', content='${data.content}'
            where author='${data.author}' and id=${data.id};`
    return exec(sql)   
}

const delBlog = (id, author) => {
    let sql = `delete from blog where id='${id}' and author='${author}';`
    return exec(sql)
}

module.exports = {
    getList,
    getDetail,
    saveBlog,
    updateBlog,
    delBlog
}