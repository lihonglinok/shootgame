var bigplaneImage=[
		"image/bigplane0.png",
		"image/bigplane1.png",
		"image/bigplane2.png",
		"image/bigplane3.png",
		"image/bigplane4.png"];
/**
 * 大敌机对象
 * @returns
 */
function Bigplane(){
	this.width=34;
	this.height=59;
	this.bottom=590;
	this.step=2;
	this.xStep=1;
	this.life=3;
	this.images=bigplaneImage;
	this.state=LIFE;
	//敌人的x偏移量随机生成
	this.left=Math.floor(Math.random()*(480-49/2));
	this.enemyNode=$("<img class='bigplane' src="+bigplaneImage[0]+" >");
	this.move=function(){
		var heroLeft=hero.left;
		if(this.left>heroLeft+2){
			this.left-=this.xStep;
		}else if(this.left<heroLeft-2){
			this.left+=this.xStep;
		}
		this.bottom-=this.step;
		this.enemyNode.css({
			left:this.left,
			bottom:this.bottom
		});
	}
	
	/**
	 * 将超出边界的敌人清理掉
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
	 * 奖励
	 */
	this.award=function(){
		hero.score+=10;//奖励得分
	}
}