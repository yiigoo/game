Page({
	data: {
		items : 
		[
			{ 
				name: '姨姨', 
				url: 'yiyi.mp3' , 
				color : '' 
			},
			{ 
				name: '阿爸爸', 
    			 url: 'ababa.mp3' , 
				color : '' 
			},
			{ 
				name: '阿借婆', 
				url: 'ajiepo.mp3' , 
				color : '' 
			},
			{ 
				name: '阿妈妈', 
				url: 'amama.mp3' , 
				color : '' 
			},
			{ 
				name: '阿奶奶', 
				url: 'anainai.mp3' , 
				color : '' 
			},
			{ 
				name: '阿爷爷', 
				url: 'ayeye.mp3' , 
				color : '' 
			},
			{ 
				name: '诶~~~', 
				url: 'ei.mp3' , 
				color : '' 
			},
			{ 
				name: '花菜', 
				url: 'huacai.mp3' , 
				color : '' 
			},
			{ 
				name: '济公圆', 
				url: 'jigongyuan.mp3' , 
				color : '' 
			},
			{ 
				name: '楼妈', 
				url: 'laoma.mp3' , 
				color : '' 
			},
			{ 
				name: '楼公', 
				url: 'laogong.mp3' , 
				color : '' 
			},
			{ 
				name: '兄兄', 
				url: 'xiongxiong.mp3' , 
				color : '' 
			},
			{ 
				name: '睡觉了', 
				url: 'yihoua.mp3' , 
				color : '' 
			},
			{ 
				name: '牡丹', 
				url: 'mudan.mp3' , 
				color : '' 
			}
		],
		item : { name: '', url: '' , color : '' } ,
		res : {
			x : '' ,
			y : '' ,
			z : ''
		}
	},
	getColor(){
		let list = [ '#801dae' , '#057748' , '#ffb61e' , '#bf242a' , '#41555d' , '#003472' , '#ff4777' , '#b35c44' , '#ff7500' , '#dc3023' , '#177cb0' , '#0c8918' , '#003371' , '#3d3b4f' , '#4c221b' , '#be002f' ]
		return list[ Math.floor(Math.random() * list.length )]
	},
	play(){
		let item = this.data.item
		wx.playBackgroundAudio({
			dataUrl: `https://didiyulu-1258545492.cos.ap-chengdu.myqcloud.com/${item.url}` ,
		})
	},
	reload (){
		let item = this.data.items[ Math.floor(Math.random() * this.data.items.length )]
		item.color = this.getColor()
		this.setData({
			item : item
		})
	},
	onReady(){
		this.reload()

		wx.connectSocket({
		url: 'ws://127.0.0.1:3000'
		})

		wx.onSocketOpen(function (res) {
			
			wx.sendSocketMessage({
				data: '测试'
			})
		})
		wx.onSocketMessage(function (res) {
		console.log('收到服务器内容：' + JSON.stringify(res))
		})

		var _this = this

		wx.startGyroscope({
			interval: 'normal',
			success: function(res){
				wx.onGyroscopeChange(function(res){
					_this.setData({
						res : res
					})
				})
			}
		})
	}
})