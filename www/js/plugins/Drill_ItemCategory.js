//=============================================================================
// Drill_ItemCategory.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        控件 - 物品类型
 * @author Drill_up
 * 
 * @Drill_LE_param "物品类型-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_ICa_type_length"
 *
 * @help  
 * =============================================================================
 * +++ Drill_ItemCategory +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置物品、武器、护甲、关键道具之外的类型。
 * ★★必须放在 物品界面插件、商店界面插件 的后面★★
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，使得添加或者修改类型。
 * 作用于：
 *   - MOG_SceneItem 控件-全自定义物品界面
 *     可以修改目标插件中的 物品类型 和 物品类型按钮。
 *   - Drill_SceneShop 控件-全自定义商店界面 ★★v1.7及以上★★
 *     可以修改目标插件中的物品类型。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   作用于 物品界面和商店界面 的物品类型窗口。
 * 2.商店出售去掉的类型，意味着对所有商店，该类型的物品不出售。
 *   比如： 物品界面：物品,武器,护甲,重要物品,蔬果
 *          商店界面：物品,护甲,重要物品
 *   效果为：物品界面可以看到武器和蔬果类，但是商店里面看不见，
 *           这两个类型无法在商店里出售。
 * 3.注意名词：物品/武器/护甲/技能
 *   护甲=防具，物品=道具，这两个名词是同一个意思，指令写防具、道具都有效。
 *   另外，没有下列名词：装备/装甲/装束 。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 属于新类型的物品，需要在数据库的物品/装备/护甲中添加下面注释：
 * 
 * <物品类型:蔬果>
 * 
 * 1.指定物品会被划分到 蔬果 类。
 * 2.物品被划分类型后，原来的功能不会被改变。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__item （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__item文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 物品类型-1 资源-类型按钮
 * 物品类型-2 资源-类型按钮
 * 物品类型-3 资源-类型按钮
 * ……
 * 
 * 1.如果你使用的不是全自定义物品界面，可以不配置按钮资源。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件内部结构。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 * [v1.3]
 * 修正了部分名词概念的定义。
 * [v1.4]
 * 修复了插件与商店插件的一些bug。
 *
 *
 *
 * @param 物品界面物品类型
 * @type text[]
 * @desc 物品类型顺序按照当前配置的来，你可以选择性去掉已有的类型。
 * @default ["物品","武器","护甲","重要物品"]
 *
 * @param 商店出售物品类型
 * @type text[]
 * @desc 物品类型顺序按照当前配置的来，物品界面可以不显示武器和护甲，但是出售可以显示。
 * @default ["物品","武器","护甲","重要物品"]
 *
 * 
 * @param ---物品类型组---
 * @default 
 *
 * @param 物品类型-1
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-2
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-3
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-4
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-5
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-6
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-7
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-8
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-9
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-10
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 */
/*~struct~ItemSenceBtn:
 * 
 * @param 物品类型名
 * @desc 填入你新建的物品类型的对应的名字。不要和 物品,武器,护甲,重要物品 重名。
 * @default 类型1
 *
 * @param 资源-类型按钮
 * @desc 新类型按钮的图片资源，对应MOG_SceneItem 全自定义物品界面 中的按钮。
 * @default 道具界面-道具选项
 * @require 1
 * @dir img/Menu__item/
 * @type file
 *
 * @param 平移-类型按钮 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。对应MOG_SceneItem 全自定义物品界面 中的坐标。
 * @default 280
 *
 * @param 平移-类型按钮 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。对应MOG_SceneItem 全自定义物品界面 中的坐标。
 * @default 85
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ICa（Item_Category）
//		临时全局变量	DrillUp.g_ICa_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Window_ItemCategory.prototype.makeCommandList
//						(mog)Scene_Item.prototype.createButtons
//						(mog)Scene_Item.prototype.addCatIndex
//
//插件记录：
//		★大体框架与功能如下：
//			物品类型：
//				->物品界面的窗口
//				->商店界面的窗口
//				->新分类设置
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.this._category为分类的设置，只要关键字对应上，相关的物品就会被显示。
//			2.商店界面的"出售类型窗口"（插件中定义的新窗口），在v1.7版本中修改了类名。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_ItemCategory = true;
　　var DrillUp = DrillUp || {}; 

	DrillUp.parameters = PluginManager.parameters('Drill_ItemCategory');
	if(DrillUp.parameters['物品界面物品类型'] != "" ){
		DrillUp.g_ICa_type_iSence = JSON.parse(DrillUp.parameters['物品界面物品类型']);
	}else{
		DrillUp.g_ICa_type_iSence = ["物品","武器","护甲","重要物品"];
	}
	if(DrillUp.parameters['商店出售物品类型'] != "" ){
		DrillUp.g_ICa_type_sSence = JSON.parse(DrillUp.parameters['商店出售物品类型']);
	}else{
		DrillUp.g_ICa_type_sSence = ["物品","武器","护甲","重要物品"];
	}
	
	DrillUp.g_ICa_type_length = 10;
	DrillUp.g_ICa_type = [];
	
	for (var i = 0; i < DrillUp.g_ICa_type_length; i++) {
		if( DrillUp.parameters['物品类型-' + String(i+1) ] != "" ){
			DrillUp.g_ICa_type[i] = JSON.parse(DrillUp.parameters['物品类型-' + String(i+1) ]);
			DrillUp.g_ICa_type[i]['name'] = String(DrillUp.g_ICa_type[i]["物品类型名"]);
			DrillUp.g_ICa_type[i]['src_img'] = String(DrillUp.g_ICa_type[i]["资源-类型按钮"]);
			DrillUp.g_ICa_type[i]['x'] = Number(DrillUp.g_ICa_type[i]["平移-类型按钮 X"]);
			DrillUp.g_ICa_type[i]['y'] = Number(DrillUp.g_ICa_type[i]["平移-类型按钮 Y"]);
		}else{
			DrillUp.g_ICa_type[i] = [];
		}
	}

//=============================================================================
// ** 物品类型
//=============================================================================
//==============================
// * 类型 - 窗口列数
//==============================
Window_ItemCategory.prototype.maxCols = function() {
	if(SceneManager._scene.constructor.name === "Scene_Shop"){ return DrillUp.g_ICa_type_sSence.length;}	//商店界面的类型
	return DrillUp.g_ICa_type_iSence.length;
};
//==============================
// * 类型 - 类型选项（覆写）
//==============================
Window_ItemCategory.prototype.makeCommandList = function() {
	for (var i = 0; i < this.maxCols(); i++) {
		var symbol = DrillUp.g_ICa_type_iSence[i];
		if(SceneManager._scene.constructor.name === "Scene_Shop"){ symbol = DrillUp.g_ICa_type_sSence[i];}	//商店界面的类型
		if (symbol === 'item' || symbol === '物品' || symbol === '道具') {
			this.addCommand(TextManager.item, 'item');
		} else if (symbol === 'weapon' || symbol === '武器') {
			this.addCommand(TextManager.weapon, 'weapon');
		} else if (symbol === 'armor' || symbol === '护甲' || symbol === '防具') {
			this.addCommand(TextManager.armor, 'armor');
		} else if (symbol === 'keyItem' || symbol === '重要物品') {
			this.addCommand(TextManager.keyItem, 'keyItem');
		} else {
			this.addCommand(symbol, symbol);
		}
	}
};
//==============================
// * 类型 - 类型比较
//==============================
var _drill_ICa_ItemList_includes = Window_ItemList.prototype.includes;
Window_ItemList.prototype.includes = function(item) {
	if( item && item.meta["物品类型"] ){
		return this._category === item.meta["物品类型"];
	}
	return _drill_ICa_ItemList_includes.call(this, item);
};

//=============================================================================
// ** 物品界面
//=============================================================================
//==============================
// * 物品 - 只有一个类型情况
//==============================
var _drill_ICa_ScItem_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
	_drill_ICa_ScItem_create.call(this);
	if( DrillUp.g_ICa_type_iSence.length === 1 ){
		this._categoryWindow.deactivate();		//去掉类型选择窗口
		this._categoryWindow.hide();
		var ww = this._itemWindow.width;
		var wh = this._itemWindow.height + this._categoryWindow.height;
		this._itemWindow.move(this._itemWindow.x, this._categoryWindow.y, ww, wh);
		this._itemWindow.setHandler('cancel', this.popScene.bind(this));
		this._itemWindow.setCategory(this._categoryWindow.currentSymbol());
		this.onCategoryOk();
	}
};

if( Imported.MOG_SceneItem ){
	//==============================
	// * mog物品 - 创建按钮
	//==============================
	Scene_Item.prototype.createButtons = function() {
		this._buttons = [];
		this._buttonsAni = [];
		for (var i = 0; i < DrillUp.g_ICa_type_iSence.length; i++) {
			var symbol = DrillUp.g_ICa_type_iSence[i];
			if (symbol === 'item' || symbol === '物品' || symbol === '道具') {
				this._buttons[i] = new Sprite(this._comImg[0]);
				this._buttons[i].x = Moghunter.scItem_Com1_X;
				this._buttons[i].y = Moghunter.scItem_Com1_Y;
			} else if (symbol === 'weapon' || symbol === '武器') {
				this._buttons[i] = new Sprite(this._comImg[1]);
				this._buttons[i].x = Moghunter.scItem_Com2_X;
				this._buttons[i].y = Moghunter.scItem_Com2_Y;
			} else if (symbol === 'armor' || symbol === '护甲'|| symbol === '防具') {
				this._buttons[i] = new Sprite(this._comImg[2]);
				this._buttons[i].x = Moghunter.scItem_Com3_X;
				this._buttons[i].y = Moghunter.scItem_Com3_Y;
			} else if (symbol === 'keyItem' || symbol === '重要物品') {
				this._buttons[i] = new Sprite(this._comImg[3]);
				this._buttons[i].x = Moghunter.scItem_Com4_X;
				this._buttons[i].y = Moghunter.scItem_Com4_Y;
			} else {
				this._buttons[i] = new Sprite();
				for(var j = 0; j < DrillUp.g_ICa_type.length; j++){
					if( DrillUp.g_ICa_type[j].length == 0 ){
						continue;
					}
					if( symbol === DrillUp.g_ICa_type[j]['name'] ){
						this._buttons[i].bitmap = ImageManager.loadMenusitem(DrillUp.g_ICa_type[j]['src_img']);
						this._buttons[i].x = DrillUp.g_ICa_type[j]['x'];
						this._buttons[i].y = DrillUp.g_ICa_type[j]['y'];
					}
				}
			}
			this._buttonsAni[i] = 0;
			this._buttons[i].anchor.x = 0.5;
			this._buttons[i].anchor.y = 0.5;
			this._buttons[i]._org_x = this._buttons[i].x;
			this._buttons[i]._org_y = this._buttons[i].y;
			this._field.addChild(this._buttons[i]);
		};
	};
	//==============================
	// * mog物品 - 当前类型的光标位置
	//==============================
	Scene_Item.prototype.addCatIndex = function(value) {
		this._categoryWindow._index += value;
		if (this._categoryWindow._index > DrillUp.g_ICa_type_iSence.length-1) {this._categoryWindow._index = 0};
		if (this._categoryWindow._index < 0) {this._categoryWindow._index = DrillUp.g_ICa_type_iSence.length-1 };
		if (this._wani[2] != null) {this._categoryWindow._index = this._wani[2]}
		this._categoryWindow.update();
		this._itemWindow.select(0);
		this._list_oldindex = 0;
		this._itemWindow.updateHelp();
	};
	//==============================
	// * mog物品 - 类型比较
	//==============================
	Window_ItemListM.prototype.includes = function(item) {
		if( item && item.meta["物品类型"] ){
			return this._category === item.meta["物品类型"];
		}
		return _drill_ICa_ItemList_includes.call(this, item);
	};
	
}

//=============================================================================
// ** 商店界面
//=============================================================================
//==============================
// * 商店 - 只有一个类型情况
//==============================
var _drill_ICa_ScShop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
	_drill_ICa_ScShop_create.call(this);
	if( DrillUp.g_ICa_type_iSence.length === 1 ){
		var ww = this._sellWindow.width;
		var wh = this._sellWindow.height + this._categoryWindow.height;
		this._sellWindow.move(this._sellWindow.x, this._categoryWindow.y, ww, wh);
		this._sellWindow.setCategory(this._categoryWindow.currentSymbol());
	}
};
//==============================
// * 商店 - 只有一个类型情况（出售时）
//==============================
var _drill_ICa_ScShop_commandSell = Scene_Shop.prototype.commandSell;
Scene_Shop.prototype.commandSell = function() {
	_drill_ICa_ScShop_commandSell.call(this);
	if( DrillUp.g_ICa_type_iSence.length === 1 ){
		this._sellWindow.activate();
		this._statusWindow.hide();
		this._sellWindow.select(0);
		this._categoryWindow.hide();
	}
};
//==============================
// * 商店 - 只有一个类型情况（退出出售）
//==============================
var _drill_ICa_ScShop_onSellCancel = Scene_Shop.prototype.onSellCancel;
Scene_Shop.prototype.onSellCancel = function() {
	_drill_ICa_ScShop_onSellCancel.call(this);
	if( DrillUp.g_ICa_type_iSence.length === 1 ){
		this.onCategoryCancel();
	}
};
if( Imported.Drill_SceneShop || Imported.Drill_SenceShop ){
	//==============================
	// * 商店 - 出售类型窗口 - 新窗口选项（覆写）
	//==============================
	if( typeof(Window_ShopItemCategory) != "undefined" ){
		Window_ShopItemCategory.prototype.makeCommandList = function() {
			for (var i = 0; i < DrillUp.g_ICa_type_sSence.length ; i++) {
				var symbol = DrillUp.g_ICa_type_sSence[i];
				if (symbol === 'item' || symbol === '物品' || symbol === '道具') {
					this.addCommand(TextManager.item, 'item');
				} else if (symbol === 'weapon' || symbol === '武器') {
					this.addCommand(TextManager.weapon, 'weapon');
				} else if (symbol === 'armor' || symbol === '护甲' || symbol === '防具') {
					this.addCommand(TextManager.armor, 'armor');
				} else if (symbol === 'keyItem' || symbol === '重要物品') {
					this.addCommand(TextManager.keyItem, 'keyItem');
				} else {
					this.addCommand(symbol, symbol);
				}
			}
		};
	}
	//==============================
	// * 商店 - 出售类型窗口 - 新窗口选项（覆写）
	//==============================
	if( typeof(Drill_SSh_SellCategoryWindow) != "undefined" ){
		Drill_SSh_SellCategoryWindow.prototype.makeCommandList = function() {
			for (var i = 0; i < DrillUp.g_ICa_type_sSence.length ; i++) {
				var symbol = DrillUp.g_ICa_type_sSence[i];
				if (symbol === 'item' || symbol === '物品' || symbol === '道具') {
					this.addCommand(TextManager.item, 'item');
				} else if (symbol === 'weapon' || symbol === '武器') {
					this.addCommand(TextManager.weapon, 'weapon');
				} else if (symbol === 'armor' || symbol === '护甲' || symbol === '防具') {
					this.addCommand(TextManager.armor, 'armor');
				} else if (symbol === 'keyItem' || symbol === '重要物品') {
					this.addCommand(TextManager.keyItem, 'keyItem');
				} else {
					this.addCommand(symbol, symbol);
				}
			}
		};
	}
}

