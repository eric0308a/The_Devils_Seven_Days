//=============================================================================
// Drill_AnimationInState.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        动画 - 并行动画绑定于状态
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_AnimationInState +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以将动画与状态绑定，播放 并行 + 短时间/无限时间 的动画效果。
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
 *     可以使注释：<状态并行动画:93:附加时:解除后消失> 生效
 *     组合可以设计出 与状态绑定的长时间动画魔法效果。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   注意，只作用于战斗界面。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 附加、持续、解除
 * 要设置并行的动画，可以直接在状态注释中添加：
 * （注意，冒号左右没有空格）
 * 
 * 状态注释：<状态并行动画:93:附加时>
 * 状态注释：<状态并行动画:93:持续时>
 * 状态注释：<状态并行动画:93:解除时>
 * 状态注释：<状态并行动画:93:附加时:解除后消失>
 *
 * 1.指定单位遭受了该状态，附加、持续、解除时，会播放指定的并行动画。
 * 2."持续时"表示每回合结束时，如果状态仍在，则播放并行动画。
 * 3.你可以设置持续时间非常长的动画效果，并设置状态解除后消失。
 *  （只对多层动画魔法圈等插件有效果。）
 * 4.如果rmmv中动画设置的是"画面"群体动画，则施法者表示玩家群体位置，
 *   目标表示敌人群体位置。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 命中、躲避
 * 除了以上的情况，还有下面比较特殊的情况，分为四种角色：
 *   被攻击时的自己、被攻击时的攻击者、
 *   主动攻击时的自己、主动攻击时的目标
 * （注意，冒号左右没有空格）
 *
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:HP伤害>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:HP恢复>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:HP吸收>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:MP伤害>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:MP恢复>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:MP吸收>
 * 状态注释：<状态并行动画:93:被攻击躲避时:自己>
 *
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:HP伤害>
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:HP恢复>
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:HP吸收>
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:MP伤害>
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:MP恢复>
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:MP吸收>
 * 状态注释：<状态并行动画:93:被攻击躲避时:攻击者>
 *
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:HP伤害>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:HP恢复>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:HP吸收>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:MP伤害>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:MP恢复>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:MP吸收>
 * 状态注释：<状态并行动画:93:主动攻击躲避时:自己>
 *
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:HP伤害>
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:HP恢复>
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:HP吸收>
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:MP伤害>
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:MP恢复>
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:MP吸收>
 * 状态注释：<状态并行动画:93:主动攻击躲避时:目标>
 * 
 * 1.命中和躲避的角色包含 进攻者 与 自己，自己表示含有该状态的角色。
 * 2.该效果一般用于盾格挡效果，也可以用于加成伤害特效。
 * 3.命中的HP伤害、HP恢复，对应进攻者释放的技能的6个伤害类型。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 如果你设计的状态更具体，比如只挡住火焰属性伤害，可以用注释：
 * 
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:HP伤害:属性类型:6>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:HP伤害:属性类型:7>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:HP伤害:属性类型:6>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:HP伤害:属性类型:7>
 *
 * 1.属性类型后面的数字，对应 数据库->类型->属性 中对应的类型id。
 * 2.如果需要对应三个属性，上面的注释写三行不同的对应就可以了。
 * 3.属性类型中，"无"的id对应 0 ，"普通攻击"的id对应 -1 。
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
//		插件简称		AISt（Animation_In_State）
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
//				->攻击者与被攻击者 状态
//
//		★必要注意事项：
//			1.【并行动画的核心，是==**动画**==后面的5个函数。可以累加/覆写多次，且不影响程序，也不需写唯一定义锁。】
//
//		★其它说明细节：
//			1.核心说明见 并行动画 Drill_AnimationInParallel
//			2.插件的条件其实不多，攻击者与被攻击者，谁拥有状态，攻击的是什么属性。
//			  经过排列组合，注释就变得非常多了。
//			3.MOG_ATB 控制状态依靠eraseState，这里与eraseState绑定，而不是removeState。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationInState = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_AnimationInState');

	
	
//=============================================================================
// ** 动画绑定时机
//=============================================================================
//==============================
// * 动画初始化 - 附加
//==============================
var _drill_AISt_addNewState = Game_Battler.prototype.addNewState;
Game_Battler.prototype.addNewState = function(stateId) {
    _drill_AISt_addNewState.call(this,stateId);
	//附加重复的状态不播放动画
	
	var note = String($dataStates[stateId].note);
	var types = (note.match( /<状态并行动画:([^<>]*?)>/g )) || [];
	for(var r = 0;r< types.length; r++){
		var l = (types[r].match( /<状态并行动画:([^<>]*?)>/ )) || [];
		//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。
		
		var args = String(l[1]).split(':');
		if( args.length >= 1 ){
			if(args[0]){ var a_id = Number(args[0]);}
			if(args[1]){ var type = String(args[1]);}
			if ( type == "附加时"){
				this.drill_startParallelAnimation( a_id, false,0);
			}
		}
	}
};

//==============================
// * 动画初始化 - 持续
//==============================
var _drill_AISt_updateStateTurns = Game_BattlerBase.prototype.updateStateTurns;
Game_BattlerBase.prototype.updateStateTurns = function() {
    _drill_AISt_updateStateTurns.call(this);

	for(var i = 0; i< this._states.length ;i++){
		var stateId = this._states[i];
		var note = String($dataStates[stateId].note);
		var types = (note.match( /<状态并行动画:([^<>]*?)>/g )) || [];
		for(var r = 0;r< types.length; r++){
			var l = (types[r].match( /<状态并行动画:([^<>]*?)>/ )) || [];
			//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。
			
			var args = String(l[1]).split(':');
			if( args.length >= 1 ){
				if(args[0]){ var a_id = Number(args[0]);}
				if(args[1]){ var type = String(args[1]);}
				if ( type == "持续时"){
					this.drill_startParallelAnimation( a_id, false,0);
				}
			}
		}
	}
};

//==============================
// * 动画初始化 - 移除（用删除更好一些）
//==============================
/*
var _drill_AISt_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    _drill_AISt_removeState.call(this,stateId);
};*/

//==============================
// * 动画初始化 - 删除
//==============================
var _drill_AISt_eraseState = Game_BattlerBase.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function(stateId) {
	
	var note = String($dataStates[stateId].note);
	var types = (note.match( /<状态并行动画:([^<>]*?)>/g )) || [];
	for(var r = 0;r< types.length; r++){
		var l = (types[r].match( /<状态并行动画:([^<>]*?)>/ )) || [];
		//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。
		
		var args = String(l[1]).split(':');
		if( args.length >= 1 ){
			if(args[0]){ var a_id = Number(args[0]);}
			if(args[1]){ var type = String(args[1]);}
			if(args[2]){ var temp1 = String(args[2]);}
			if ( type == "解除时"){
				this.drill_startParallelAnimation( a_id, false,0);
			}
			if ( type == "附加时" && temp1 == "解除后消失"){
				if( Imported.Drill_AnimationCircle ){	//动画魔法圈
					DrillUp.drill_aCircles_setDeathByIdAndBattler(a_id,this);	//设置指定敌人的状态的魔法圈 消失
				}
				if( Imported.Drill_AnimationParticle ){	//动画粒子
					DrillUp.drill_aParticles_setDeathByIdAndBattler(a_id,this);	//设置指定敌人的状态的粒子 消失
				}
				if( Imported.Drill_AnimationGIF ){	//动画GIF
					DrillUp.drill_aGIFs_setDeathByIdAndBattler(a_id,this);	//设置指定敌人的状态的GIF 消失
				}
			}
		}
	}
	_drill_AISt_eraseState.call(this,stateId);
};

//==============================
// * 动画初始化 - 解除（全部清空）
//==============================
var _drill_AISt_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    _drill_AISt_clearStates.call(this);
	if( Imported.Drill_AnimationCircle ){	//动画魔法圈
		DrillUp.drill_aCircles_setDeathByIdAndBattler( -1,this);
	}
	if( Imported.Drill_AnimationParticle ){	//动画粒子
		DrillUp.drill_aParticles_setDeathByIdAndBattler( -1,this);
	}
	if( Imported.Drill_AnimationGIF ){	//动画GIF
		DrillUp.drill_aGIFs_setDeathByIdAndBattler( -1,this);
	}
};

//==============================
// * 动画初始化 - 命中、躲避
//==============================
var _drill_AISt_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	_drill_AISt_apply.call(this,target);
	
	var result = target.result();
	//--------------------------------
	//----被攻击
	var states = target.states();
	for(var i = 0;i< states.length; i++){
		var note = String(states[i].note);
		var types = (note.match( /<状态并行动画:([^<>]*?)>/g )) || [];
		for(var r = 0;r< types.length; r++){
			var l = (types[r].match( /<状态并行动画:([^<>]*?)>/ )) || [];
			//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。

			var args = String(l[1]).split(':');
			if( args.length >= 2 ){
				if(args[0]){ var a_id = Number(args[0]);}
				if(args[1]){ var type = String(args[1]);}
				if(args[2]){ var temp1 = String(args[2]);}
				if(args[3]){ var temp2 = String(args[3]);}
				if(args[4]){ var temp3 = String(args[4]);}
				if(args[5]){ var temp4 = String(args[5]);}
				if ( type == "被攻击命中时"){
					var damage_type = this.item().damage.type ;
					var damage_attr = this.item().damage.elementId ;
					if (result.isHit() && damage_type > 0 ) {
						var is_actived = false;
						if( temp3 == "属性类型" ){
							if ( damage_type == 1 && temp2 == "HP伤害" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 2 && temp2 == "MP伤害" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 3 && temp2 == "HP恢复" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 4 && temp2 == "MP恢复" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 5 && temp2 == "HP吸收" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 6 && temp2 == "MP吸收" && Number(temp4) == damage_attr ){ is_actived = true; }
						}else{
							if ( damage_type == 1 && temp2 == "HP伤害"){ is_actived = true; }
							if ( damage_type == 2 && temp2 == "MP伤害"){ is_actived = true; }
							if ( damage_type == 3 && temp2 == "HP恢复"){ is_actived = true; }
							if ( damage_type == 4 && temp2 == "MP恢复"){ is_actived = true; }
							if ( damage_type == 5 && temp2 == "HP吸收"){ is_actived = true; }
							if ( damage_type == 6 && temp2 == "MP吸收"){ is_actived = true; }
						}
						if(is_actived){
							if ( temp1 == "攻击者"){
								this.subject().drill_startParallelAnimation( a_id, false,0);
							}
							if ( temp1 == "自己" ){
								target.drill_startParallelAnimation( a_id, false,0);
							}
						}
					}
				}
				if ( type == "被攻击躲避时"){
					if ( !result.isHit() && this.item().damage.type > 0 ) {
						if ( temp1 == "攻击者"){
							this.subject().drill_startParallelAnimation( a_id, false,0);
						}
						if ( temp1 == "自己" ){
							target.drill_startParallelAnimation( a_id, false,0);
						}
					}
				}
			}
		}
	}
	//--------------------------------
	//----主动攻击
	states = this.subject().states();
	for(var i = 0;i< states.length; i++){
		var note = String(states[i].note);
		var types = (note.match( /<状态并行动画:([^<>]*?)>/g )) || [];
		for(var r = 0;r< types.length; r++){
			var l = (types[r].match( /<状态并行动画:([^<>]*?)>/ )) || [];
			//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。

			var args = String(l[1]).split(':');
			if( args.length >= 2 ){
				if(args[0]){ var a_id = Number(args[0]);}
				if(args[1]){ var type = String(args[1]);}
				if(args[2]){ var temp1 = String(args[2]);}
				if(args[3]){ var temp2 = String(args[3]);}
				if(args[4]){ var temp3 = String(args[4]);}
				if(args[5]){ var temp4 = String(args[5]);}
				if ( type == "主动攻击命中时"){
					var damage_type = this.item().damage.type ;
					var damage_attr = this.item().damage.elementId ;
					if (result.isHit() && damage_type > 0 ) {
						var is_actived = false;
						if( temp3 == "属性类型" ){
							if ( damage_type == 1 && temp2 == "HP伤害" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 2 && temp2 == "MP伤害" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 3 && temp2 == "HP恢复" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 4 && temp2 == "MP恢复" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 5 && temp2 == "HP吸收" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 6 && temp2 == "MP吸收" && Number(temp4) == damage_attr ){ is_actived = true; }
						}else{
							if ( damage_type == 1 && temp2 == "HP伤害"){ is_actived = true; }
							if ( damage_type == 2 && temp2 == "MP伤害"){ is_actived = true; }
							if ( damage_type == 3 && temp2 == "HP恢复"){ is_actived = true; }
							if ( damage_type == 4 && temp2 == "MP恢复"){ is_actived = true; }
							if ( damage_type == 5 && temp2 == "HP吸收"){ is_actived = true; }
							if ( damage_type == 6 && temp2 == "MP吸收"){ is_actived = true; }
						}
						if(is_actived){
							if ( temp1 == "自己"){
								this.subject().drill_startParallelAnimation( a_id, false,0);
							}
							if ( temp1 == "目标" ){
								target.drill_startParallelAnimation( a_id, false,0);
							}
						}
					}
				}
				if ( type == "主动攻击躲避时"){
					if ( !result.isHit() && this.item().damage.type > 0 ) {
						if ( temp1 == "自己"){
							this.subject().drill_startParallelAnimation( a_id, false,0);
						}
						if ( temp1 == "目标" ){
							target.drill_startParallelAnimation( a_id, false,0);
						}
					}
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
var _drill_AISt_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
    _drill_AISt_initMembers.call(this);
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
var _drill_AISt_setupAnimation = Sprite_Battler.prototype.setupAnimation;
Sprite_Battler.prototype.setupAnimation = function() {
	if (this._battler.isAnimationRequested()) {	
		this._drill_animation_data = JSON.parse(JSON.stringify( this._battler._animations ));	//复制一份
		this._drill_animation_data_enable = true;
	}
	
	_drill_AISt_setupAnimation.call(this);	//原方法是rmmv猴子写的，为了不冲突，我只能绕非常大一圈路线
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
var _drill_AISt_startAnimation = Sprite_Battler.prototype.startAnimation;
Sprite_Battler.prototype.startAnimation = function(animation, mirror, delay) {
	
	_drill_AISt_startAnimation.call(this,animation, mirror, delay);
	
	var sprite = this._animationSprites[this._animationSprites.length-1];
	sprite._drill_is_parallel = true;
};

	
	
	
