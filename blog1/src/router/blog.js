// 只处理数据，不会做多余的逻辑
module.exports = (req, res) => {
    let method = req.method
    // 列表接口
    if (req.path === '/api/blog/list' && method === 'GET') {
        return '博客列表接口'
    }
    // 详情接口
    if (req.method === 'GET' && req.path === '/api/blog/detail') {
        return '详情接口'
    }
    // 更新接口
    if (req.method === 'POST' && req.path === '/api/blog/update') {
        return '更新博客'
    }
    // 保存博客
    if (req.method === 'POST' && req.path === '/api/blog/save') {
        return '更新博客'
    }
    // 删除博客
    if (req.method === 'POST' && req.path === '/api/blog/delete') {
        return '删除博客'
    }
}