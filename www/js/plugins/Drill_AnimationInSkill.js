//=============================================================================
// Drill_AnimationInSkill.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        动画 - 并行动画绑定于技能
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_AnimationInSkill +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在技能释放的过程中，播放 并行 + 短时间 的动画效果。
 * 更多详细介绍，去看看"关于魔法效果与并行动画.docx"。
 * ★★关联id的动画不会被加密直接识别，需要在地图事件中至少播放一次★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，也可以配合下面插件使用：
 * 作用于：
 *   - Drill_AnimationSkillSettings 动画 - 技能动画设置
 *     通过该插件，技能的朝向、位移、大小进行设置可以作用于并行动画。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   注意，只作用于战斗界面。
 * 2.技能 不适合 绑定无限时间的动画效果。
 * 3.rmmv技能设置的动画 与 该插件的并行动画，是两种不同的动画。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 要设置并行的动画，可以直接在技能注释或者物品注释中添加：
 * （注意，冒号左右没有空格）
 * 
 * 技能注释：<技能并行动画:54:施法者:一次>
 * 技能注释：<技能并行动画:54:施法者:连续>
 * 技能注释：<技能并行动画:93:目标:一次>
 * 技能注释：<技能并行动画:93:目标:连续>
 * 
 * 物品注释：<技能并行动画:54:施法者:一次>
 * 物品注释：<技能并行动画:54:施法者:连续>
 * 物品注释：<技能并行动画:93:目标:一次>
 * 物品注释：<技能并行动画:93:目标:连续>
 *
 * 1.数字对应要并行的动画编号。
 * 2.如果rmmv中动画设置的是"画面"群体动画，则施法者表示玩家群体位置，
 *   目标表示敌人群体位置。
 * 3.如果技能的连续次数为6次，"连续"表示伤害6次播放6次，"一次"表示只播放1次。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了sv模式下，针对玩家的动画并行无效的问题。
 * [v1.2]
 * 修改了内部结构。
 * [v1.3]
 * 使得该插件与 技能动画设置 插件相互适配。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		AISk（Animation_In_Skill）
//		临时全局变量	无
//		临时局部变量	【无】
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Sprite_Base.prototype.isAnimationPlaying
//
//插件记录：
//		★大体框架与功能如下：
//			并行动画绑定于状态：
//				->战斗不阻塞设置
//				->并行播放
//				->施法者与目标
//
//		★必要注意事项：
//			1.【并行动画的核心，是==**动画**==后面的5个函数。可以累加/覆写多次，且不影响程序，也不需写唯一定义锁。】
//
//		★其它说明细节：
//			1.核心说明见 并行动画 Drill_AnimationInParallel
//			2.技能的并行动画都是一瞬间的。不适合持续魔法效果。
//			（持续动画并连续伤害的技能，是有，但是目前不考虑，毕竟rmmv都限制了连续次数）
//
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationInSkill = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_AnimationInSkill');

	
//=============================================================================
// ** 注释初始化
//=============================================================================
//==============================
// * 玩家选定了一个技能时
//==============================
/* Game_Action包含了 Game_Item 用于存储技能、物品的数据
Game_Action.prototype.setSkill = function(skillId) {	//（该函数为玩家选定了一个技能时的时机）
    this._item.setObject($dataSkills[skillId]);
	if( skillId == 25){
		this.subject().startAnimation( 143, false,0);
	}
};*/

//==============================
// * 技能开始作用时
//==============================
var _drill_AISk_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	_drill_AISk_apply.call(this,target);
	this.drill_AISk_setParallelAnimation(target);
}
Game_Action.prototype.drill_AISk_setParallelAnimation = function(target) {
	var is_consecutive = true;		//判断当前攻击是否连续
	if(this._drill_AISk_last_target == undefined){
		this._drill_AISk_last_target = target;
		is_consecutive = false;
	}
	if(this._drill_AISk_last_target != target){
		this._drill_AISk_last_target = target;
		is_consecutive = false;
	}
	
	var note = "";
	if( this.isSkill() ){ note = String($dataSkills[this._item.itemId()].note); }
	if( this.isItem() ){ note = String($dataItems[this._item.itemId()].note); }
			
	var types = (note.match( /<技能并行动画:([^<>]*?)>/g )) || [];
	for(var r = 0;r< types.length; r++){
		var l = (types[r].match( /<技能并行动画:([^<>]*?)>/ )) || [];
		//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。

		var args = String(l[1]).split(':');
		if( args.length >= 2 ){
			if(args[0]){ var a_id = Number(args[0]);}
			if(args[1]){ var type = String(args[1]);}
			if(args[2]){ var temp1 = String(args[2]);}
			if ( type == "施法者"){
				if ( temp1 == "连续"){
					this.drill_AISk_startParallelAnimation( this.subject(), a_id, note);
				}
				if ( temp1 == "一次" && is_consecutive == false){
					this.drill_AISk_startParallelAnimation( this.subject(), a_id, note);
				}
			}
			if ( type == "目标"){
				if( target.isAlive() ){ 	//死亡后不播放动画
					if ( temp1 == "连续"){
						this.drill_AISk_startParallelAnimation( target, a_id, note);
					}
					if ( temp1 == "一次" && is_consecutive == false){
						this.drill_AISk_startParallelAnimation( target, a_id, note);
					}
				}
			}
		}
	}
}
//==============================
// * 播放动画（用于其它插件扩展）
//==============================
Game_Action.prototype.drill_AISk_startParallelAnimation = function( battler , a_id , note ) {
	battler.drill_startParallelAnimation( a_id, false,0);
}

//=============================================================================
// ** 动画
//=============================================================================
//==============================
// * 动画初始化
//==============================
var _drill_AISk_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
    _drill_AISk_initMembers.call(this);
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
var _drill_AISk_setupAnimation = Sprite_Battler.prototype.setupAnimation;
Sprite_Battler.prototype.setupAnimation = function() {
	if (this._battler.isAnimationRequested()) {	
		this._drill_animation_data = JSON.parse(JSON.stringify( this._battler._animations ));	//复制一份
		this._drill_animation_data_enable = true;
	}
	
	_drill_AISk_setupAnimation.call(this);	//原方法是rmmv猴子写的，为了不冲突，我只能绕非常大一圈路线
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
var _drill_AISk_startAnimation = Sprite_Battler.prototype.startAnimation;
Sprite_Battler.prototype.startAnimation = function(animation, mirror, delay) {
	
	_drill_AISk_startAnimation.call(this,animation, mirror, delay);
	
	var sprite = this._animationSprites[this._animationSprites.length-1];
	sprite._drill_is_parallel = true;
};

	
	
