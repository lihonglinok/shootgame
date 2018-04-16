/**
 * 子弹对象
 * @param bottom 
 * @param left
 * @param xStep
 * @returns
 */
function Bullet(bottom,left,xStep){
	this.width=4;
	this.height=7;
	this.yStep=5;
	this.left=left;
	this.bottom=bottom;
	this.xStep=xStep;
	this.state=LIFE;
	//子弹对应的html节点
	this.bulletNode=$("<img class='bullet' src='image/bullet.png' >");
	this.move=function(){//子弹对应的移动
		this.bottom+=this.yStep;
		this.left+=this.xStep;
		this.bulletNode.css({
			left:this.left,
			bottom:this.bottom
		});
	}
	/**
	 * 销毁子弹的方法
	 */
	this.destory=function(i){
		//将子弹状态改为死亡
		bullets.splice(i,1);//删除当前数组中的超出边界的子弹
		this.bulletNode.remove();//删除html上 的节点
	}
	/**
	 * 判断是否超出边界
	 * @returns
	 */
	this.outOfBounds=function(){
		return this.left<0 || this.left+this.width>480 || this.bottom<0 || this.bottom>590
	}
}