//=============================================================================
// Drill_AnimationInParallel.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        动画 - 并行动画
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_AnimationInParallel +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使用插件指令播放并行的动画效果。
 * 更多详细介绍，去看看"关于魔法效果与并行动画.docx"。
 * ★★关联id的动画不会被加密直接识别，需要在地图事件中至少播放一次★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，也可以配合下面插件使用：
 * 作用于：
 *   - Drill_AnimationCircle 动画 - 多层动画魔法圈 ★★v1.1及以上版本★★
 *     Drill_AnimationParticle 动画 - 多层动画粒子 ★★v1.1及以上版本★★
 *     Drill_AnimationGif 动画 - 多层动画Gif
 *     使用上述任意插件，
 *     可以使插件指令：>结束并行战斗动画 生效
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   注意，只作用于战斗界面。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令添加要播放的并行动画：
 * （注意，冒号左右都有一个空格）
 * 
 * 插件指令：>显示并行战斗动画 : 96 : 敌方 : 全体
 * 插件指令：>显示并行战斗动画 : 96 : 敌方 : 1
 * 插件指令：>显示并行战斗动画 : 96 : 我方 : 全体
 * 插件指令：>显示并行战斗动画 : 96 : 我方 : 1
 *
 * 插件指令：>结束并行战斗动画 : 96 : 敌方 : 全体
 * 插件指令：>结束并行战斗动画 : 96 : 敌方 : 2
 * 插件指令：>结束并行战斗动画 : 96 : 我方 : 全体
 * 插件指令：>结束并行战斗动画 : 96 : 我方 : 2
 * 
 * 1.数字对应要并行的动画编号。
 * 2.只在战斗界面有效，1表示从左往右第1个敌人，
 * 3.如果你的动画时间非常长，可以用该指令手动设置结束。
 *   注意结束并行战斗动画，只对 动画魔法圈等插件 的设置有效。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了sv模式下，针对玩家的动画并行无效的问题。
 * [v1.2]
 * 修改了内部结构。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		AIP（Animation_In_Parallel）
//		临时全局变量	无
//		临时局部变量	【无】
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Sprite_Base.prototype.isAnimationPlaying
//
//插件记录：
//		★大体框架与功能如下：
//			并行动画：
//				->战斗不阻塞设置
//				->并行播放
//				->插件指令
//
//		★必要注意事项：
//			1.【并行动画的核心，是==**动画**==后面的5个函数。可以累加/覆写多次，且不影响程序，也不需写唯一定义锁。】
//			2.真正阻止战斗等待的，是：
//				BattleManager.update = function() {
//  				if (!this.isBusy() && !this.updateEvent()) {}
//				}
//
//		★其它说明细节：
//			1.寻找路线超级绕：
//				找到阻止函数：
//				-> BattleManager.isBusy()  战斗任何等待动作都经过该函数
//				-> ($gameMessage.isBusy() || this._spriteset.isBusy() || this._logWindow.isBusy()) 信息、战斗图像、对话框 的等待
//				-> Spriteset_Battle.isAnimationPlaying()
//				-> Sprite_Base.isAnimationPlaying()
//				找到添加并行动画方法： 
//				-> BattleManager.updateAction()
//				-> BattleManager.startAction()（这里是死胡同，因为这里的方法都是一次性的计算）
//				-> Game_Battler.prototype.startAnimation(xxx) 从强制播放动画函数入手
//				-> Game_Battler.prototype.isAnimationRequested() （Game_Battler只存储基本的json数据，可以从这里把并行数据塞入）
//				-> Sprite_Battler.prototype.setupAnimation() 转到sprite.js，该方法用到了上面的函数，而且还是while……不明所以 
//				-> Sprite_Battler.prototype.startAnimation(xxx) 该函数创建动画，并加入_animationSprites，开始播放。
//			2.该插件写出来的函数非常绕。如果要修改，最好把上面的路线走一遍，再考虑。
//			3.这里的sv模式下，我没有找到是谁在调用startAnimation。
//				rmmv可以找到的函数都没有被触发，这就很奇怪。
//				（不过，我改变了一下策略，默认的动画都是并行，手动设置不并行，这样就不存在卡住的问题了。）
//
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationInParallel = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_AnimationInParallel');

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_AIP_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_AIP_pluginCommand.call(this, command, args);
	if (command === '>显示并行战斗动画') {
		if(args.length == 6){
			var a_id = Number(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if (type === '敌方') {
				if (temp1 === '全体') {
					this.iterateEnemyIndex(-1,function(enemy) {
						if (enemy.isAlive()) {
							enemy.drill_startParallelAnimation(a_id,false,0);
						}
					}.bind(this));
				}else{
					this.iterateEnemyIndex( Number(temp1) -1, function (enemy) {
						if (enemy.isAlive()) {
							enemy.drill_startParallelAnimation(a_id, false, 0);
						}
					}.bind(this));
				}
			}
			if (type === '我方') {
				if (temp1 === '全体') {
					this.iterateActorIndex(-1,function(enemy) {
						if (enemy.isAlive()) {
							enemy.drill_startParallelAnimation(a_id,false,0);
						}
					}.bind(this));
				}else{
					this.iterateActorIndex( Number(temp1) -1, function (enemy) {
						if (enemy.isAlive()) {
							enemy.drill_startParallelAnimation(a_id, false, 0);
						}
					}.bind(this));
				}
			}
		}
	}
	if (command === '>结束并行战斗动画') {
		if(args.length == 6){
			var a_id = Number(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if (type === '敌方') {
				if (temp1 === '全体') {
					this.iterateEnemyIndex(-1,function(enemy) {
						if( Imported.Drill_AnimationCircle ){	//动画魔法圈
							DrillUp.drill_aCircles_setDeathByIdAndBattler(a_id,enemy);
						}
						if( Imported.Drill_AnimationParticle ){	//动画粒子
							DrillUp.drill_aParticles_setDeathByIdAndBattler(a_id,enemy);
						}
						if( Imported.Drill_AnimationGIF ){	//动画GIF
							DrillUp.drill_aGIFs_setDeathByIdAndBattler(a_id,enemy);
						}
					}.bind(this));
				}else{
					this.iterateEnemyIndex( Number(temp1), function (enemy) {
						if( Imported.Drill_AnimationCircle ){	//动画魔法圈
							DrillUp.drill_aCircles_setDeathByIdAndBattler(a_id,enemy);
						}
						if( Imported.Drill_AnimationParticle ){	//动画粒子
							DrillUp.drill_aParticles_setDeathByIdAndBattler(a_id,enemy);
						}
						if( Imported.Drill_AnimationGIF ){	//动画GIF
							DrillUp.drill_aGIFs_setDeathByIdAndBattler(a_id,enemy);
						}
					}.bind(this));
				}
			}
		}
	}
}

//=============================================================================
// ** 动画
//=============================================================================
//==============================
// * 动画初始化
//==============================
var _drill_AIP_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
    _drill_AIP_initMembers.call(this);
	this._drill_is_parallel = false;
};
//==============================
// * 动画播放情况
//==============================
Sprite_Base.prototype.isAnimationPlaying = function() {
	var len = 0;
	for(var i=0; i<this._animationSprites.length; i++){
		if(this._animationSprites[i]._drill_is_parallel !== true){
			len += 1;
		}
	}
    return len > 0;
};
	
//=============================================================================
// ** 战斗动画
//=============================================================================
//==============================
// * 添加并行动画
//==============================
Game_Battler.prototype.drill_startParallelAnimation = function(animationId, mirror, delay) {
    var data = { animationId: animationId, mirror: mirror, delay: delay , drill_parallel: true};
    this._animations.push(data);
};

//==============================
// * 战斗贴图 - 设置动画
//==============================
var _drill_AIP_setupAnimation = Sprite_Battler.prototype.setupAnimation;
Sprite_Battler.prototype.setupAnimation = function() {
	if (this._battler.isAnimationRequested()) {	
		this._drill_animation_data = JSON.parse(JSON.stringify( this._battler._animations ));	//复制一份
		this._drill_animation_data_enable = true;
	}
	
	_drill_AIP_setupAnimation.call(this);	//原方法是rmmv猴子写的，为了不冲突，我只能绕非常大一圈路线
													//Sprite_Battler.prototype.startAnimation 这个函数也被写死了，不好继承，所以直接写外面来	

	if( this._drill_animation_data_enable == true ){	//通过enable来绕开猴子程序
		this._drill_animation_data_enable = false;
		
		var len = this._drill_animation_data.length;	//从_animationSprites结果集中赋值
		for(var i = 0; i< len ;i++ ){
			var sprite = this._animationSprites[this._animationSprites.length - len + i];
			if( this._drill_animation_data[i]['drill_parallel'] == true ){
				sprite._drill_is_parallel = true ;
			}else{
				sprite._drill_is_parallel = false ;
			}
			//alert(this._drill_animation_data[i]['drill_parallel']);
		}
	}
};
//==============================
// * 战斗贴图 - 添加动画（设置动画的下一层，这里用来修复特殊情况，【默认未知的动画，直接并行】）
//==============================
var _drill_AIP_startAnimation = Sprite_Battler.prototype.startAnimation;
Sprite_Battler.prototype.startAnimation = function(animation, mirror, delay) {
	
	_drill_AIP_startAnimation.call(this,animation, mirror, delay);
	
	var sprite = this._animationSprites[this._animationSprites.length-1];
	sprite._drill_is_parallel = true;
};

	