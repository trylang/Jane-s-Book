const https = require('https')
const { mysql } = require('../qcloud.js')
// 新增图书
// 1. 获取豆瓣信息
// 2. 入库

module.exports = async (ctx) => {
	const {isbn, openid} = ctx.request.body
	if (isbn && openid) {
		const findRes = await mysql('books').select().where('isbn', isbn)
		console.log(9999, findRes)
		if (findRes.length) {
			ctx.state = {
				code: -1,
				data: {
					msg: '图书已经存在'
				}
			}
			return
		}
		
		let url = 'https://api.douban.com/v2/book/isbn/' + isbn
		const bookinfo = await getJSON(url)
		const rate = bookinfo.rating.average
		const {title, image, alt, publisher, summary, price} = bookinfo
		const tags = bookinfo.tags.map(v => {
			return `${v.title} ${v.count}`
		}).join(',')
		const author = bookinfo.author.join(',')

		try {
			console.log(22222, tags, author)
			await mysql('books').insert({
				isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author
			})
			ctx.state.data = {
				title,
				msg: 'success'
			}
		} catch (e) {
			ctx.state = {
				code: -1,
				data: {
					msg: '新增失败' + e.sqlMessage
				}
			}
		}
	}

}

function getJSON (url) {
	return new Promise((reslove, reject) => {
		https.get(url, res => {
			let urlData = ''
			res.on('data', data => {
				urlData += data
			})
			res.on('end', data => {
				const bookinfo = JSON.parse(urlData)
				if (bookinfo.title) {
					reslove(bookinfo)
				} else {
					reject(bookinfo)
				}
			})
		})
	})
}

