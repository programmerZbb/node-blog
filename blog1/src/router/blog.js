// 只处理数据，不会做多余的逻辑
const { blog } = require('../controller')
const { SuccessModel, EroorModel } = require('../module/resModel')
module.exports = (req, res) => {
    let method = req.method
    // 列表接口
    if (req.path === '/api/blog/list' && method === 'GET') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        console.log(author, keyword, req.query, '----请求的数据')
        const result = blog.getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData, '获取成功')
        }, err => {
            return new EroorModel(err)
        })
    }
    // 详情接口
    if (req.method === 'GET' && req.path === '/api/blog/detail') {
        let id = req.query.id
        const result = blog.getDetail(id)
        return result.then(data => {
            return new SuccessModel(data[0])
        }, err => {
            return new EroorModel(err)
        })
    }
    // 更新接口
    if (req.method === 'POST' && req.path === '/api/blog/update') {
        req.body.author = '姓名'
        const result = blog.updateBlog(req.body)
        return result.then(updateRes => {
            if (updateRes.affectedRows > 0) {
                return new SuccessModel()
            }
            return new EroorModel('更新失败')
        }, err => {
            return new EroorModel(err)
        })
    }
    // 保存博客
    if (req.method === 'POST' && req.path === '/api/blog/save') {
        req.body.author = '姓名'
        const result = blog.saveBlog(req.body)
        return result.then(res => {
            if (res.affectedRows !== 0) {
                return new SuccessModel({
                    id: res.insertId
                })
            }
            return new EroorModel('新建失败')
        }, err => {
            return new EroorModel(err)
        })
    }
    // 删除博客
    if (req.method === 'GET' && req.path === '/api/blog/delete') {
        let author = '姓名'
        const result = blog.delBlog(req.query.id, author)
        return result.then(delResult => {
            if (delResult.affectedRows > 0) {
                return new SuccessModel()
            }
            return new EroorModel('删除失败')
        }, err => {
            return new EroorModel(err)
        })
    }
}