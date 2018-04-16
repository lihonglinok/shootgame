/*英雄机对象的js*/


var heroImages=[
	"image/hero0.png",
	"image/hero1.png",
	"image/hero2.png",
	"image/hero3.png",
	"image/hero4.png",
	"image/hero5.png"];

//英雄机的属性
var hero={
	width:48,
	height:62,
	bottom:100,
	left:235,
	life:3,
	score:0,//得分
	fireType:0,//火力种类
	doubleBulletNum:100,//双重火力子弹数量
	tripleBulletNum:100,//三重火力子弹数量
	state:LIFE,//1代表活着，2代表死亡
	interval:0,//图片切换的间隔
	
	index:0,//两张图片轮流切换
	heroNode:$("<img id='hero'>"),//英雄机的节点
	
	toggleImage:function(){//切换图片方法
		if(this.state!=LIFE) return;
		this.interval++;
		if(this.interval%10!==0) return;
		this.index++;
		this.heroNode[0].src=heroImages[this.index%2];;
	},
	moveLeft:function(){//向左移动的方法
		if(this.left>0){
			this.left-=5;
			this.heroNode.css("left",this.left);
		}
	},
	moveRight:function(){//向右移动的方法
		if(this.left<480-50){
			this.left+=5;
			this.heroNode.css("left",this.left);
		}
	},
	moveTop:function(){//向顶部移动的方法
		if(this.bottom<590-62){
			this.bottom+=5;
			this.heroNode.css("bottom",this.bottom);
		}
	},
	moveBottom:function(){//向底部移动的方法
		if(this.bottom>0){
			this.bottom-=5;
			this.heroNode.css("bottom",this.bottom);
		}
	},
	shootInterval:0,//子弹发射间隔
	/**
	 * 发射子弹的方法
	 */
	shoot:function(){//发射子弹的方法
		this.shootInterval++;
		if(this.shootInterval%10!=0 || this.state!=LIFE) return;
		
		switch(this.fireType){
		case 0://代表默认的火力就一颗子弹
			var b3=new Bullet(this.bottom+62,this.left+22.5,0);
			bullets.push(b3);
			$("#game-area").append(b3.bulletNode);
			break;
		case 1://代表双重火力两颗子弹
			if(this.doubleBulletNum<=0){
				this.fireType=0;
				break;
			}
			var b1=new Bullet(this.bottom+62,this.left+15,0);
			var b2=new Bullet(this.bottom+62,this.left+30,0);
			bullets.push(b1);
			bullets.push(b2);
			$("#game-area").append(b1.bulletNode);
			$("#game-area").append(b2.bulletNode);
			this.doubleBulletNum--;
			break;
		case 2://代表三重火力三颗子弹
			if(this.tripleBulletNum<=0){
				this.fireType=1;//将火力值变为第二种
				break;
			}
			for(var i=0;i<3;i++){
				var b=new Bullet(this.bottom+62,this.left+22.5,i-1);
				bullets.push(b);
				$("#game-area").append(b.bulletNode);
			}
			this.tripleBulletNum--;
			break;
		}
	},
	/**
	 * 扣血方法
	 */
	subLife:subLife,
	/**
	 * 销毁方法
	 */
	deadIndex:2,
	
	deadInterval:0,
	
	destory:function(){
		
		//轮播图片
		if(this.deadIndex<heroImages.length){
			this.deadInterval++;
			if(this.deadInterval%20!=0) return;
			this.heroNode[0].src=heroImages[this.deadIndex++];
		}else{
			//游戏结束
			state=GAMEOVER;
			//显示游戏结束
			$("#gameover-image").show();
			//删除英雄机的节点
			this.heroNode.remove();
			//暂停背景图片的播放
			$("#game-area").css("animation-play-state","paused");
		}
	},
	/**
	 * 切换火力
	 */
	toggleFire:function(){//切换火力值算法
		if(this.fireType==2){
			this.fireType=0;
		}else{
			this.fireType++;
		}
	}
};
