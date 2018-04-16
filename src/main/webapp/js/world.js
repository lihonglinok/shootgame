/**
 * 这里用来初始化页面
 * */


/**
 * 初始化一些数据
 * @returns
 */
$(function(){
	//隐藏暂停图片
	$("#pause-image").hide();
	//隐藏游戏结束图片
	$("#gameover-image").hide();
	//背景图片移动的动画暂停播放
	$("#game-area").css("animation-play-state","paused");
	//英雄机入场
	$("#game-area").append(hero.heroNode);
	action();
});

/**
 * 进入运行状态
 * @returns
 */
function running(){
	//将当前游戏状态切换为运行状态
	state=RUNNING;
	//隐藏开始图片
	$("#start-image").hide();
	//隐藏暂停图片
	$("#pause-image").hide();
	//隐藏游戏结束图片
	$("#gameover-image").hide();
	//给背景图片添加class让其移动
	$("#game-area").css("animation-play-state","running");
	
}
/**
 * 让游戏进入暂停状态
 */
function pause(){
	state=PAUSE;//将当前游戏状态切换为运行状态
	//添加一个图片标签
	$("#pause-image").show();
	//暂停动画的播放
	$("#game-area").css("animation-play-state","paused");
}
/**
 * 添加键盘响应事件
 * @param e
 * @returns
 */
$(document).keyup(function(e){
	var code=e.keyCode;
	switch(code){
	case 13://回车键
	case 32://空格键
		//判断游戏是否处于开始状态，如果处于开始状态着游戏进入运行状态游戏开始
		if(state==START){
			running();
		}else if(state==RUNNING){
			pause();
		}else if(state==PAUSE){
			running();
		}else if(state==GAMEOVER){
			location.reload();
		}
		break;
	case 37://左
		toLeft=false;
		break;
	case 38://上
		toTop=false;
		break;
	case 39://右
		toRight=false;
		break;
	case 40://下
		toBottom=false;
		break;
	case 88://x发射子弹
		shooting=false;
		break;
	case 90://z切换子弹
		hero.toggleFire();
		break;
	}
});


var toLeft=false;
var toRight=false;
var toTop=false;
var toBottom=false;
var shooting=false;


$(document).keydown(function(e){
	var code=e.keyCode;
	switch(code){
		case 37://左
			toLeft=true;
			break;
		case 38://上
			toTop=true;
			break;
		case 39://右
			toRight=true;
			break;
		case 40://下
			toBottom=true;
			break;
		case 88://x发射子弹
			shooting=true;
			break;
	}
});


function action(){
	//切换英雄机显示的图片
	hero.toggleImage();
	
	if(state==RUNNING) {//在运行状态下才能执行下面的事件
		
		if(toLeft){//向左移动
			hero.moveLeft();
		}
		if(toRight){//向右移动
			hero.moveRight();
		}
		if(toTop){//向顶部移动
			hero.moveTop();
		}
		if(toBottom){//向底部移动
			hero.moveBottom();
		}
		if(shooting){//英雄机发射子弹
			hero.shoot();
		}
		generateEnemy();//生成敌人
		
		collision();//碰撞
		
		//移动所有的子弹并且判断是否超出边界
		for(var i=0;i<bullets.length;i++){
			var b=bullets[i];
			b.move();//子弹移动
			if(b.outOfBounds() || b.state==DEAD){//如果子弹超出边界或者子弹死亡就将子弹删除
				b.destory(i);//销毁子弹
			}
		}
		
		//移动所有的敌人
		for(var i=0;i<enemies.length;i++){
			var e=enemies[i];
			e.move();
			e.outOfBounds();
			if(e.state==DEAD){
				//轮播一遍图片
				e.destory(i);//销毁敌人
			}
		}
		
		if(hero.state==DEAD){//销毁英雄机
			hero.destory();
		}
	}
	$("#show-life").text(hero.life);
	$("#show-score").text(hero.score);
	$("#normal-fire").text("MAX");
	$("#double-fire").text(hero.doubleBulletNum);
	$("#triple-fire").text(hero.tripleBulletNum);
	setTimeout(action,10);
}


/**
 * 生成一个敌人
 * @returns
 */
function generateEnemy(){
	generateEnemyInterval++;
	if(generateEnemyInterval%80!=0){
		return;
	}
	var rand=Math.random();
	var enemy;
	if(rand<0.2){
		enemy=new Bigplane();
	}else if(rand<0.8){
		enemy=new Airplane();
	}else{
		enemy=new Bee();
	}
	enemies.push(enemy);//添加到敌人数组中
	$("#game-area").append(enemy.enemyNode);//添加html节点
}

/**
 * 碰撞算法
 * @returns
 */
function collision(){
	for(var i=0;i<enemies.length;i++){
		var e=enemies[i];
		 for(var j=0;j<bullets.length;j++){
			 var b=bullets[j];
			 if(e.state==LIFE && b.state==LIFE && e.hit(b)){//撞上了
				 //销毁子弹
				 b.state=DEAD;
				 //敌人扣减生命值
				 e.subLife();
			 }
		 }
		if(e.state==LIFE && hero.state==LIFE && e.hit(hero)){//撞上了
			e.state=DEAD;
			hero.doubleBulletNum=0;
			hero.tripleBulletNum=0;
			hero.subLife();
		}
	}
}

