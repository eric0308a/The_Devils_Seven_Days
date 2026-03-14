//
//  鏡面反射スプライト ver1.00
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

/*:
 * @plugindesc (v1.00)[v1.1] 地图 - 图块镜像反射
 * @author Yana （Drill_up翻译+优化）
 *
 * @param 图块标记
 * @desc 指定标记数字的图块将会具有反射效果，可以设置多个。
 * @type number[]
 * @min 1
 * @max 7
 * @default ["1"]
 *
 * @param 偏移Y补正变量
 * @type variable
 * @desc 指定的变量将可以修改镜像的y偏移值，正数向下偏移，负数向上偏移。
 * @default 0
 *
 * @param 镜像透明比例
 * @type number
 * @min 0
 * @max 100
 * @desc 镜像的透明度百分比的比例，0表示完全透明，100表示完全不透明。
 * @default 25
 *
 * @param 镜像长度缩放
 * @desc 镜像的拉伸长度，1.0表示原比例。
 * @default 1.1
 *
 *
 * @param --镜像组 1至20--
 * @default 
 *
 * @param 镜像-1
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-2
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-3
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-4
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-5
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-6
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-7
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-8
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-9
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-10
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-11
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-12
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-13
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-14
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-15
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-16
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-17
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-18
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-19
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-20
 * @parent --镜像组 1至20--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param --镜像组21至40--
 * @default 
 *
 * @param 镜像-21
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-22
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-23
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-24
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-25
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-26
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-27
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-28
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-29
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-30
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-31
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-32
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-33
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-34
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-35
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-36
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-37
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-38
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-39
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-40
 * @parent --镜像组21至40--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param --镜像组41至60--
 * @default 
 *
 * @param 镜像-41
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-42
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-43
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-44
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-45
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-46
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-47
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-48
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-49
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-50
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-51
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-52
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-53
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-54
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-55
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-56
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-57
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-58
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-59
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param 镜像-60
 * @parent --镜像组41至60--
 * @desc 自定义的镜像图片资源。
 * @default 
 * @require 1
 * @dir img/parallaxes/
 * @type file
 * 
 *
 * @help 
 * =============================================================================
 * +++ SpecularReflectionSprite (v1.00) +++
 * By Yana
 * https://twitter.com/yanatsuki_
 * =============================================================================
 * 你可以设置图块具有镜像反射效果。
 * 你还可以直接自己绘制镜像区域，具体去看看"关于自绘镜像或阴影.docx"。
 * 注意，该插件较吃内存，配置低的机器可能会有轻微卡顿。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 设置相应的图块标记，在 数据库 > 图块 > 地形标志 。
 * 地形标志能设置0-7个数字，与你设置的图块标记数字相符即可。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜像设置
 * 你可以设置某个事件不反射镜像：（两个备注意思一样）
 * 
 * 事件备注：<不反射镜像>
 * 事件备注：<NoReflection>
 *
 * 你可以也可以单独设置事件的y反射偏移值：（两个备注意思一样）
 *
 * 事件备注：<镜像偏移:A>
 * 事件备注：<SpecularOffsetY:A>
 *
 * 参数A：偏移值。
 *        正数向下偏移，负数向上偏移。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 绘制自制镜像
 * 如果你想像画阴影那样，自制特定个地图的镜像，使用下面的地图注释：
 * （冒号左右没有空格，用的是英文冒号。）
 * 
 * 地图注释：镜:C
 *
 * 参数C：镜像文件
 *        不需要.png后缀，自己绘制的指定地图的镜像图片文件。
 *       （图片白色部分为反射程度，黑色或透明表示不反射部分。）
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 原版的镜像在未设置图块的地方也会有镜像，这里修复了bug。
 * 原版的镜像要求图块透明，因为倒影在图块下方。这里修改为在图块上方。
 * 使得你可以自己定制镜像。
 *
 * ------------------------------------------------------
 * ----利用規約 （Yana）
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 */

    ////////////////////////////////////////////////////////////////////////////////////
　　var Imported = Imported || {};
　　Imported.SpecularReflectionSprite = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('SpecularReflectionSprite');
	
	if( DrillUp.parameters['图块标记'] != "" ){
		//parse对空值转换会报错
		DrillUp.ref_terrainIds = (JSON.parse( DrillUp.parameters['图块标记'])).map(function(n){ return Number(n) });;
	}else{
		DrillUp.ref_terrainIds = ([]).map(function(n){ return Number(n) }); ;
	}
    DrillUp.ref_offsetYVariableId = Number(DrillUp.parameters['偏移-镜像 Y']) || 0;
    DrillUp.ref_opacity_per = Number(DrillUp.parameters['镜像透明比例']) || 25;
    DrillUp.ref_height_size = Number(DrillUp.parameters['镜像长度缩放']) || 1.0;

    ////////////////////////////////////////////////////////////////////////////////////

    Game_CharacterBase.prototype.isReflect = function() {
        return true;
    };

    Game_CharacterBase.prototype.isEvent = function() {
        return false;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Event.prototype.isReflect = function() {
        return !(this.event().meta['不反射镜像'] || this.event().meta['NoReflection']);
    };

    Game_Event.prototype.isEvent = function() {
        return true;
    };

    Game_Event.prototype.specularOffsetY = function() {
        if (this.event().meta['镜像偏移']) {
            return Number(this.event().meta['镜像偏移']) || 0;
        }
        if (this.event().meta['SpecularOffsetY']) {
            return Number(this.event().meta['SpecularOffsetY']) || 0;
        }
        return 0;
    };

    function Sprite_Specular() {
        this.initialize.apply(this, arguments);
    }

    ////////////////////////////////////////////////////////////////////////////////////

    Sprite_Specular.prototype = Object.create(Sprite_Base.prototype);
    Sprite_Specular.prototype.constructor = Sprite_Specular;

    Sprite_Specular.prototype.initialize = function(character) {
        Sprite_Base.prototype.initialize.call(this);
        this.initMembers();
        this.setCharacter(character);
    };

    Sprite_Specular.prototype.initMembers = function() {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this._character = null;
        this._tilesetId = 0;
        this._upperBody = null;
        this._lowerBody = null;
        this.scale = new Point(1.0,-1 * DrillUp.ref_height_size);
        this.visible = true;
        this.z = 2;
    };
    
    
    Sprite_Specular.prototype.setCharacter = function(character) {
        this._character = character;
    };
    
    Sprite_Specular.prototype.updateVisibility = function() {
        Sprite_Base.prototype.updateVisibility.call(this);
        if (this._character.isTransparent() || !this._character.isReflect()){
            this.visible = false;
            return;
        }
        var x = this._character.x;
        var y = this._character.y + Math.ceil(this.offsetY() / $gameMap.tileWidth())+1;
        var dir = this._character._direction;
        var terrainTag = $gameMap.terrainTag(x, y);
        var reflectTerrain = DrillUp.ref_terrainIds.contains(terrainTag);

        switch(dir) {
            case 2: y = reflectTerrain ? y : y - 1; break;
            case 4: x = reflectTerrain ? x : x + 1;  break;
            case 6: x = reflectTerrain ? x : x - 1; break;
            case 8: y = reflectTerrain ? y : y + 1;  break;
        }

        terrainTag = $gameMap.terrainTag(x, y);
        this.visible = DrillUp.ref_terrainIds.contains(terrainTag);
    };

    Sprite_Specular.prototype.isTile = function() {
        return this._character.tileId > 0;
    };

    Sprite_Specular.prototype.tilesetBitmap = function(tileId) {
        var tileset = $gameMap.tileset();
        var setNumber = 5 + Math.floor(tileId / 256);
        return ImageManager.loadTileset(tileset.tilesetNames[setNumber]);
    };

    Sprite_Specular.prototype.updateBitmap = function() {
        if (this.isImageChanged()) {
            this._tilesetId = $gameMap.tilesetId();
            this._tileId = this._character.tileId();
            this._characterName = this._character.characterName();
            this._characterIndex = this._character.characterIndex();
            if (this._tileId > 0) {
                this.setTileBitmap();
            } else {
                this.setCharacterBitmap();
            }
        }
    };

    Sprite_Specular.prototype.isImageChanged = function() {
        return (this._tilesetId !== $gameMap.tilesetId() ||
                this._tileId !== this._character.tileId() ||
                this._characterName !== this._character.characterName() ||
                this._characterIndex !== this._character.characterIndex());
    };

    Sprite_Specular.prototype.setTileBitmap = function() {
        this.bitmap = this.tilesetBitmap(this._tileId);
    };

    Sprite_Specular.prototype.setCharacterBitmap = function() {
        this.bitmap = ImageManager.loadCharacter(this._characterName);
        this._isBigCharacter = ImageManager.isBigCharacter(this._characterName);
    };

    Sprite_Specular.prototype.updateFrame = function() {
        if (this._tileId > 0) {
            this.updateTileFrame();
        } else {
            this.updateCharacterFrame();
        }
    };

    Sprite_Specular.prototype.updateTileFrame = function() {
        var pw = this.patternWidth();
        var ph = this.patternHeight();
        var sx = (Math.floor(this._tileId / 128) % 2 * 8 + this._tileId % 8) * pw;
        var sy = Math.floor(this._tileId % 256 / 8) % 16 * ph;
        this.setFrame(sx, sy, pw, ph);
    };

    Sprite_Specular.prototype.updateCharacterFrame = function() {
        var pw = this.patternWidth();
        var ph = this.patternHeight();
        var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
        var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
        this.updateHalfBodySprites();
        if (this._bushDepth > 0) {
            var d = this._bushDepth;
            this._upperBody.setFrame(sx, sy, pw, ph - d);
            this._lowerBody.setFrame(sx, sy + ph - d, pw, d);
            this.setFrame(sx, sy, 0, ph);
        } else {
            this.setFrame(sx, sy, pw, ph);
        }
    };

    Sprite_Specular.prototype.characterBlockX = function() {
        if (this._isBigCharacter) {
            return 0;
        } else {
            var index = this._character.characterIndex();
            return index % 4 * 3;
        }
    };

    Sprite_Specular.prototype.characterBlockY = function() {
        if (this._isBigCharacter) {
            return 0;
        } else {
            var index = this._character.characterIndex();
            return Math.floor(index / 4) * 4;
        }
    };

    Sprite_Specular.prototype.characterPatternX = function() {
        return this._character.pattern();
    };

    Sprite_Specular.prototype.characterPatternY = function() {
        return (this._character.direction() - 2) / 2;
    };

    Sprite_Specular.prototype.patternWidth = function() {
        if (this._tileId > 0) {
            return $gameMap.tileWidth();
        } else if (this._isBigCharacter) {
            return this.bitmap.width / 3;
        } else {
            return this.bitmap.width / 12;
        }
    };

    Sprite_Specular.prototype.patternHeight = function() {
        if (this._tileId > 0) {
            return $gameMap.tileHeight();
        } else if (this._isBigCharacter) {
            return this.bitmap.height / 4;
        } else {
            return this.bitmap.height / 8;
        }
    };

    Sprite_Specular.prototype.updateHalfBodySprites = function() {
        if (this._bushDepth > 0) {
            this.createHalfBodySprites();
            this._upperBody.bitmap = this.bitmap;
            this._upperBody.visible = true;
            this._upperBody.y = - this._bushDepth;
            this._lowerBody.bitmap = this.bitmap;
            this._lowerBody.visible = true;
            this._upperBody.setBlendColor(this.getBlendColor());
            this._lowerBody.setBlendColor(this.getBlendColor());
            this._upperBody.setColorTone(this.getColorTone());
            this._lowerBody.setColorTone(this.getColorTone());
        } else if (this._upperBody) {
            this._upperBody.visible = false;
            this._lowerBody.visible = false;
        }
    };

    Sprite_Specular.prototype.createHalfBodySprites = function() {
        if (!this._upperBody) {
            this._upperBody = new Sprite();
            this._upperBody.anchor.x = 0.5;
            this._upperBody.anchor.y = 1;
            this.addChild(this._upperBody);
        }
        if (!this._lowerBody) {
            this._lowerBody = new Sprite();
            this._lowerBody.anchor.x = 0.5;
            this._lowerBody.anchor.y = 1;
            this._lowerBody.opacity = 128;
            this.addChild(this._lowerBody);
        }
    };

    Sprite_Specular.prototype.updateOther = function() {
        this.opacity = this._character.opacity()/100*DrillUp.ref_opacity_per;
        this.blendMode = this._character.blendMode();
        this._bushDepth = this._character.bushDepth();
    };


    Sprite_Specular.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);
        this.updatePosition();
        this.updateBitmap();
        this.updateFrame();
        this.updatePosition();
        this.updateOther();
    };
    
    Sprite_Specular.prototype.updatePosition = function() {
        this.x = this._character.screenX();
        this.y = this._character.screenY() + this.offsetY();
        this.z = this._character.screenZ();
    };

    Sprite_Specular.prototype.offsetY = function() {
        var offsetY = DrillUp.ref_offsetYVariableId ? $gameVariables.value(DrillUp.ref_offsetYVariableId) : 0;
        offsetY = this._character.isEvent() ? this._character.specularOffsetY() : offsetY;
        return offsetY;
    };
    ////////////////////////////////////////////////////////////////////////////////////
	//--载入地图注释
	var _Specular_Game_Map_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId) {
		_Specular_Game_Map_setup.call(this, mapId);
		this.setupSpecularReflection();
	};
	Game_Map.prototype.notetags = function() {
		return $dataMap.note.split(/[\r\n]+/);
	};
	Game_Map.prototype.setupSpecularReflection = function() {
		var i = 0;
		DrillUp._map_reflection_data = "" ;
		this.notetags().forEach(function(note) {
			var text_ = note.split(':');
			if( text_[0] === "镜"){
				DrillUp._map_reflection_data = text_[1] || "";
			}
		},this);
	};

    ////////////////////////////////////////////////////////////////////////////////////
	//遮罩
		
    function Sprite_Specular_Mask() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Specular_Mask.prototype = Object.create(Sprite.prototype);
    Sprite_Specular_Mask.prototype.constructor = Sprite_Specular_Mask;

    Sprite_Specular_Mask.prototype.initialize = function(character) {
        Sprite.prototype.initialize.call(this);
		
		if( DrillUp._map_reflection_data != "" ){
			this.bitmap = ImageManager.loadParallax(DrillUp._map_reflection_data);
		}else{
			this.bitmap = new Bitmap( $gameMap.width()*$gameMap.tileWidth() , $gameMap.height()*$gameMap.tileHeight() );
			//alert($gameMap.displayX())
			//alert($gameMap.displayY())
			//alert($gameMap.width())
			//this.bitmap.fillRect(100, 100, 500, 500, "#ffffff");
			for(var xx = 0; xx< $gameMap.width() ;xx++){
				for(var yy = 0; yy< $gameMap.height() ;yy++){
				
					var terrainTag = $gameMap.terrainTag(xx, yy);
					if( DrillUp.ref_terrainIds.contains(terrainTag) ){
						this.bitmap.fillRect( 
							xx* $gameMap.tileWidth() , 
							yy* $gameMap.tileHeight(), 
							$gameMap.tileWidth(), 
							$gameMap.tileHeight(), 
							"#ffffff");
					}else{
						this.bitmap.fillRect( 
							xx* $gameMap.tileWidth() , 
							yy* $gameMap.tileHeight(), 
							$gameMap.tileWidth(), 
							$gameMap.tileHeight(), 
							"#000000");
					}
				}
			}
		}
    };
	
    Sprite_Specular_Mask.prototype.update = function(character) {
        Sprite.prototype.update.call(this);
		this.x = -$gameMap.displayX()* $gameMap.tileWidth();
		this.y = -$gameMap.displayY()* $gameMap.tileHeight();
	}
	
    ////////////////////////////////////////////////////////////////////////////////////

    var _sref_SMap_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _sref_SMap_createTilemap.call(this);
        this.createSpecular();
    };
    
    Spriteset_Map.prototype.createSpecular = function() {
        this._specularSprites = [];
        $gameMap.events().forEach(function(event) {
            this._specularSprites.push(new Sprite_Specular(event));
        }, this);
        $gameMap.vehicles().forEach(function(vehicle) {
            this._specularSprites.push(new Sprite_Specular(vehicle));
        }, this);
        $gamePlayer.followers().reverseEach(function(follower) {
            this._specularSprites.push(new Sprite_Specular(follower));
        }, this);
        this._specularSprites.push(new Sprite_Specular($gamePlayer));
		
		//将反射的图块全部涂白，然后建立遮罩
		this._all_specularSprites = new Sprite();
		this._mask_sprite = new Sprite_Specular_Mask();
        for (var i = 0; i < this._specularSprites.length; i++) {
            this._all_specularSprites.addChild(this._specularSprites[i]);
        }
		this._all_specularSprites.addChild(this._mask_sprite);	//遮罩原型（如果不addchild，Sprite是不会update的）
		this._all_specularSprites.mask = this._mask_sprite;		//遮罩
		
		this._all_specularSprites.z = 2;
		this._tilemap.addChild(this._all_specularSprites);
    };

    ////////////////////////////////////////////////////////////////////////////////////
    
