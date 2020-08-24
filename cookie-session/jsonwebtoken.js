const jsonwebtoken = require('jsonwebtoken')
const secret = '12345678'
const opt = {
	secret: 'jwt_secret',
	key: 'user',
}
const user = {
	username: 'fuaoqi',
	password: '123456',
}

const token = jsonwebtoken.sign(
	{
		data: user,
		exp: Math.floor(Date.now() / 1000) + 60 * 60,
	},
	secret
)

console.log('生成token:', token)
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// 	.eyJkYXRhIjp7InVzZXJuYW1lIjoiZnVhb3FpIiwicGFzc3dvcmQiOiIxMjM0NTYifSwiZXhwIjoxNTk4Mjc1NDg2LCJpYXQiOjE1OTgyNzE4ODZ9
// 	.AVx2l_vWhoJww7TQk5W8qOmZGwn2V62EJx86ge9cyEA
console.log('解码：', jsonwebtoken.verify(token, secret, opt))
// {
//     data: { username: 'fuaoqi', password: '123456' },
//     exp: 1598275548,
//     iat: 1598271948
//   }
