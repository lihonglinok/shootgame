

var airplaneImage=[
	"image/airplane0.png",
	"image/airplane1.png",
	"image/airplane2.png",
	"image/airplane3.png",
	"image/airplane4.png"];

/**
 * 小敌机对象
 * @returns
 */
function Airplane(){
	this.width=24;
	this.height=18;
	this.bottom=590;
	this.step=1.5;
	this.life=1;
	this.images=airplaneImage;
	this.state=LIFE;
	//敌人的x偏移量随机生成
	this.left=Math.floor(Math.random()*(480-49/2));
	this.enemyNode=$("<img class='airplane' src="+airplaneImage[0]+" >");
	this.move=function(){
		this.bottom-=this.step;
		this.enemyNode.css({
			left:this.left,
			bottom:this.bottom
		});
	}
	
	/**
	 * 判断是否超出边界
	 * @returns
	 */
	this.outOfBounds=outOfBounds;
	/**
	 * 碰撞的方法
	 */
	this.hit=hit;
	
	/**
	 * 扣血算法
	 */
	this.subLife=subLife;
	
	/**
	 * 销毁
	 */
	this.deadIndex=1;
	this.interval=0;
	this.destory=destory;
	/**
	 * 奖励算法
	 */
	this.award=function(){
		hero.score+=5;//奖励
	}
}