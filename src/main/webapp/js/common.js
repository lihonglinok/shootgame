var LIFE=1;
var DEAD=2;


var START=1;//刚刚进入游戏的状态
var RUNNING=2;//游戏正在运行时候的状态
var PAUSE=3;//游戏暂停时候的状态
var GAMEOVER=4;//游戏结束后的状态

var state=START;//游戏初始化的状态为刚刚进入的状态

var bullets=[];//所有的子弹
var enemies=[];//所有敌人

var generateEnemyInterval=0;//生成敌人的间隔
/**
 * 碰撞算法
 * @param other 碰撞的其他的那个对象
 * @returns 如果撞上了就返回true 否则返回false
 */
function hit(other){
		var x1=this.left+this.width;
		var y1=this.bottom+this.height;
		var x2=this.left-other.width;
		var y2=this.bottom-other.height;
		var x=other.left;
		var y=other.bottom;
		return x<x1 && x>x2 && y<y1 && y>y2;
}
/**
 * 扣减生命值
 * @returns
 */
function subLife(){
	//减去生命值属性
	this.life--;
	//判断生命值是否为0若为0则将state修改为死亡状态
	if(this.life<=0){
		this.state=DEAD;
	}
}
/**
 * 超出边界
 */
function outOfBounds(i){
	if(this.left<0 || this.left+this.width>480 || this.bottom<0 || this.bottom>590){
		enemies.splice(i,1);//删除当前数组中的超出边界中的敌人
		this.enemyNode.remove();//删除html上的节点
	}
}
/**
 * 销毁敌人
 * @param i 敌人所在数组中的下标
 * @returns
 */
function destory(i){
	//轮播一遍图片
	if(this.deadIndex<airplaneImage.length){
		this.interval++;
		if(this.interval%10!=0) return;
		this.enemyNode[0].src=this.images[this.deadIndex++];
	}else{
		enemies.splice(i,1);//删除当前数组中的超出边界中的敌人
		this.enemyNode.remove();//删除html上的节点
		this.award();
	}
}