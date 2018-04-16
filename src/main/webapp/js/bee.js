
var beeImage=[
	"image/bee0.png",
	"image/bee1.png",
	"image/bee2.png",
	"image/bee3.png",
	"image/bee4.png"];

/**
 * 小蜜蜂对象
 * @returns
 */
function Bee(){
	this.width=30;
	this.height=25;
	this.bottom=590;
	this.step=2;
	this.life=4;
	this.images=beeImage;
	this.xStep=Math.random()>0.5? -3:3,
	this.state=LIFE;
	//敌人的x偏移量随机生成
	this.left=Math.floor(Math.random()*(480-49/2));
	this.enemyNode=$("<img class='bee' src="+beeImage[0]+" >");
	/**
	 * 移动的方法
	 */
	this.move=function(){
		if(this.left<0 || this.left>480-60/2){
			this.xStep*=-1;
		}
		this.left+=this.xStep;
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
	this.outOfBounds=function(i){
		if(this.bottom<0 || this.bottom>590){
			enemies.splice(i,1);//删除当前数组中的超出边界中的敌人
			this.enemyNode.remove();//删除html上的节点
		}
	};
	
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
		//生成一个随机数
		var rand=Math.random();
		//根据随机数的大小给英雄机添加奖励，第一种奖励为生命值奖励，将英雄机的生命值增加1，
		if(rand<0.5){
			//奖励英雄机生命值
			hero.life++;
		}else if(rand<0.8){
			//奖励双倍火力
			hero.doubleBulletNum+=100;
		}else{
			//奖励三倍火力
			hero.tripleBulletNum+=100;
		}
	}
}