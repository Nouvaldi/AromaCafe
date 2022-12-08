(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"MulmedLab2A_atlas_1", frames: [[0,1748,478,61],[1394,1180,560,120],[480,1768,478,61],[1394,1302,560,120],[1416,1540,396,118],[0,0,1109,300],[1509,265,300,300],[0,1628,396,118],[0,302,955,300],[0,1266,300,300],[398,1628,396,118],[0,604,955,300],[796,1642,536,61],[302,1424,600,100],[1334,1660,536,61],[904,1424,600,100],[957,704,695,178],[957,884,695,178],[0,906,695,178],[697,1064,695,178],[0,1086,695,178],[697,1244,695,178],[796,1705,510,61],[1308,1723,510,61],[302,1526,600,100],[1394,1064,621,114],[1111,0,708,263],[1509,567,510,114],[302,1266,324,114],[1506,1424,510,114],[1654,683,324,114],[904,1526,510,114],[1654,799,324,114],[957,302,550,400]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_34 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Bitmap4 = function() {
	this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Bitmap6 = function() {
	this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Bitmap7 = function() {
	this.initialize(img.Bitmap7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Bitmap8 = function() {
	this.initialize(img.Bitmap8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Cup_Arabica3 = function() {
	this.initialize(img.Cup_Arabica3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Cup_Cappucino = function() {
	this.initialize(img.Cup_Cappucino);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Cup_Caramel = function() {
	this.initialize(img.Cup_Caramel);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Cup_Hazelnut = function() {
	this.initialize(img.Cup_Hazelnut);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Cup_Macchiato = function() {
	this.initialize(img.Cup_Macchiato);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.Cup_MatchaLatte = function() {
	this.initialize(img.Cup_MatchaLatte);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3676,4130);


(lib.logoaromacafe = function() {
	this.initialize(img.logoaromacafe);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3382,2734);


(lib.NewProject9 = function() {
	this.initialize(ss["MulmedLab2A_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.webLinkButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(20.45,14.05,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_31();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_34();
	this.instance_2.setTransform(20.45,14.05,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_33();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,280,60);


(lib.an_Video = function(options) {
	this.initialize();
	this._element = new $.an.Video(options);
	this._el = this._element.create();
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,400,300);

p._tick = _tick;
p._handleDrawEnd = _handleDrawEnd;
p._updateVisibility = _updateVisibility;
p.draw = _componentDraw;



(lib.seller3Button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_5 copy (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgSLuQkqgHjVjVQjcjcAAk2QAAk1DcjdQDVjUEqgHIASAAQE2AADcDbQDcDdAAE1QAAE2jcDcQjcDck2AAg");
	mask.setTransform(479.55,199.5);

	// Bitmap 8
	this.instance = new lib.Bitmap8();
	this.instance.setTransform(332,55,0.0816,0.0816);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	// seller3
	this.instance_1 = new lib.CachedBmp_30();
	this.instance_1.setTransform(164,172,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_29();
	this.instance_2.setTransform(0,124.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1}]}).wait(20));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,124.5,554.6,150);


(lib.seller2Button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3 copy (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgSLuQkqgHjVjVQjcjcAAk2QAAk1DcjdQDVjUEqgHIASAAQE2AADcDbQDcDdAAE1QAAE2jcDcQjcDck2AAg");
	mask.setTransform(479.55,199.5);

	// Bitmap 7
	this.instance = new lib.Bitmap7();
	this.instance.setTransform(332,52,0.0816,0.0816);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(35));

	// seller2
	this.instance_1 = new lib.CachedBmp_28();
	this.instance_1.setTransform(404.55,124.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_27();
	this.instance_2.setTransform(164,172,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_26();
	this.instance_3.setTransform(0,124.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]}).wait(35));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,124.5,554.6,150);


(lib.seller1Button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3 copy (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgSLuQkqgHjVjVQjcjbAAk3QAAk2DcjcQDVjUEqgHIASAAQE2AADcDbQDcDcAAE2QAAE3jcDbQjcDck2AAg");
	mask.setTransform(479.55,198.5);

	// Bitmap 6
	this.instance = new lib.Bitmap6();
	this.instance.setTransform(332,55,0.0816,0.0816);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(65));

	// seller1
	this.instance_1 = new lib.CachedBmp_25();
	this.instance_1.setTransform(404.55,123.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_24();
	this.instance_2.setTransform(164,172,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_23();
	this.instance_3.setTransform(0,123.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]}).wait(65));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,123.5,554.6,150);


(lib.Scene_1_subtitleText = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// subtitleText
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(953.75,561.35,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1();
	this.instance_1.setTransform(1000.15,459.9,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_4();
	this.instance_2.setTransform(953.75,561.35,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_3();
	this.instance_3.setTransform(1000.15,459.9,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_6();
	this.instance_4.setTransform(953.75,561.35,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_5();
	this.instance_5.setTransform(1000.15,459.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},199).to({state:[{t:this.instance_3},{t:this.instance_2}]},120).to({state:[{t:this.instance_5},{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Lingkaran = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Lingkaran
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("A2SPsQgCgyAAgyQAAsXIuotQIuovMWAAQIPAAGoD5");
	this.shape.setTransform(452.25,249.7125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4A1405").s().p("A1EVFQouovAAsVQAAgyACgxQAirXIKoKQGJmJH8h1QDWgxDpAAQMWAAIuIvQILIKAiLXQACAxAAAyQAAMVovIvQouIusWAAQsVAAovoug");
	this.shape_1.setTransform(640,360);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(136));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_eventText = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eventText
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(484.85,348,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_7();
	this.instance_1.setTransform(462.95,199.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},199).wait(122));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_discountImage = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// discountImage
	this.instance = new lib.Bitmap4();
	this.instance.setTransform(900,177,0.0816,0.0816);

	this.instance_1 = new lib.Bitmap5();
	this.instance_1.setTransform(950,113,0.0952,0.0952);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},214).to({state:[{t:this.instance_1},{t:this.instance}]},105).to({state:[{t:this.instance_1},{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_bg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("AAYAAIgvAA");
	this.shape.setTransform(-23.5625,740.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFDFC3").s().p("EhnTA73IABgdMgABh3QMDOnAAAMAAAB3tg");
	this.shape_1.setTransform(640.025,360);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},183).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},13).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// background
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Ehmdg7WMDM7AAAMAAAB2tMjM7AAAg");
	this.shape.setTransform(637.8,357.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC684").s().p("EgfPA50MAAAhznMA+fAAAMAAABzng");
	this.shape_1.setTransform(1080.4,358);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4A1405").s().p("EgfPA50MAAAhznMA+fAAAMAAABzng");
	this.shape_2.setTransform(200.4,358);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFDFC3").s().p("EhmcA7XMAAAh2tMDM6AAAMAAAB2tgEAl6A51MA+gAAAMAAAhznMg+gAAAgEhjlA51MA+gAAAMAAAhznMg+gAAAg");
	this.shape_3.setTransform(637.8,357.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},199).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},30).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},15).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},15).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},15).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},15).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},15).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},15).to({state:[{t:this.shape_3},{t:this.shape_1},{t:this.shape_2},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Asap = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Asap
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.498)").s().p("AG3O2IgigCQgRgCgQgDQgRgDgQgEQgQgFgQgHQgQgIgPgJIgfgUIgOgGIgOgGIgNgIIgNgKIgLgKIgKgMIgLgJIgJgLIgLgKIgMgPIgJgLIgJgLIgJgMIgIgLIgHgPIgHgPIgJgNIgIgNIgHgOIgHgOIgGgMQgnAEgmgBIhvgBIhUAAQgpgBgngMIgagJIgIAIIgJAIIgKALIgKAKIgMAJIgNAHIgPAHIgIAGIgJAGIgbANIgcAMIgZAJQgUAIgVADQgVAEgXAAQgWABgWAAIgjAAIgiAAIggAAIgkgBIgdgDIgYgEIgLgDIgPgGIgPgGIgOgHIgNgIIgPgIIgPgIIgPgKIgNgKIgMgLIgMgNIgKgNIgRgbIgKgNIgJgOIgIgOIgGgOIgFgPIgEgOIgDgPIgHgQIgFgRIgFgRIgDgRIgDgSQgJgYgFgZQgEgPgBgPIgGAAIgSAAIgRgCIgSgBIgRgDIgRgCIgRgDIgcgLQgPgGgOgIQgOgIgMgLQgMgKgKgMIgUgYIgSgZQgvidALioQAFhAAXg8QAyiECRggIAFgBQACgZAGgYQAIgfASgbIANgeIAOgdIAOgdIAOgcIAOgeIAGgQIAEgFIAHgIQARglAegcQAYgWAegNQAngRAqAAQAwAAAvABQAsABApAOIAfAMIARADIARAEIALADIANAFIAMAGIAOADIAOAEIAOAFIANAGIAEACQBUg/BcgiQAngPAogIIADgEIAMgIIALgIIANgGIAMgGIALgEIAHgEIAPgIIAQgHIAHgFIAKgFIAMgGQAegVAjgJQArgKAsABQAgABAhAAQAqgBApAEQAZADAZAFIAPAFIAOAGIAOAHQAeAHAbAOQAbAPAWAVQAQAQATAMQAVANATAQQAZAVAUAYIAKANIAIAGIAKAKIAKAOIAJAOIANAMIAOAMIALAKIALAKIALALIAJAMIAIAMIAHAOIAGANIAGAOIAIAPQANAeAGAfQAagCAbABQBCABBDgCQBGgCA7AkQA1AfA4AZIAOAIIANAJIAMALIAMAHIANAGIAMAHIAJAFIAJAFIAMAJIAMAJIAKAJIATAVIANAKIANALIALAMIAKANQAWAoASAqQAIATAFAUQAaAoAPAtQAOArAAAsQgBA6gMA5IgKAjIAAAPIgBASIgCASIgDARIgDASIgEARIgGAQIgHARIgBAJIgDAQIgEAQIgHAQIgIAPIgIANIgIAMIgJAMIgKALIgKAKIgLAKIgLANIgLAOIgMAMIgNANIgGAIIgHAIIgLALIgLAJIgMAJIgMAIIgOAKIgJAEIgBACIgHAPIgGAQIgGAPIgKAOIgKANIgIANIgIANIgJANIgJAMIgJALIgKAMIgMAOIgMAOIgKAKIgKAJQgNAQgPANQgTASgWAPQgWAOgXANIgvAZIgvAWIggAOIALgEIgrATQgWAJgYAEQgbAEgbABIg3ACIhHAAIgSAAIglgBgAwhHsIABABIAAgBIgBgBg");
	this.shape.setTransform(640.0138,360.024);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.541)").s().p("AJqQ0IhFAAQgdABgdgCIghgCQgRgCgQgDIghgHQgSgFgSgIQgRgHgPgJIgggUIgNgGIgNgHIgQgHIgQgJIgOgKIgNgMIgMgOIgMgKIgLgMIgLgMIgNgPIgJgKIgLgOIgKgNIgKgNIgHgPIgIgPIgJgPIgFgIIgGgKIgIgPIgDgGIgEgJIgHgMQggABgggCIgIAAIg3gEIgygCQgpABgrgBQgpAAgngLIgagIIggAHIgWADQgKABgKgCIgHAAIgLAMIgLALIgOALIgOAIQgIAFgIADIgJAHIgKAGIgcANIgbANIgZAKQgUAHgUAEQgVAEgXABIgvADIghABIgiABIgfAAIgZADIgaAAIgkgDIgQgBIgPgCIgNgBIgSgDIgOgDIgLgDIgQgGIgQgJIgQgIIgRgJIgQgJIgPgKIgOgKIgPgMIgNgOIgNgOIgSgbIgLgPIgLgQIgLgTIgFgIIgFgKIgEgKIgDgKIgFgQIgEgRIgHgSIgFgQIgFgRIgDgRIgDgMIgCgMIgIgZIgHgcQgFgSgCgTIgGgBIgRgEIgQgEIgDAAIgKAAIgMgCIgTgCIgUgDIgLgBIgMgDIgfgMIgBAAQgRgHgPgJQgQgJgOgMQgNgLgLgNIgLgNIgKgMIgTgbQgYhLgKhNQgThsAIhyQAEg1AQgzQAHgaALgYQAjhOBEgrQAuglBDgPIAHgLQACgaAHgaQAJggASgbIAPgiIAQghIAPghIAPgdIAOgeIAJgVIAFgJIAHgIQAIgQAKgPIAFgHIAOgPQgOAbAEgFQAPgQASgMQAogmARgJQgHAJATgIQBagdAdACIBeAEQApACAoAMIAgAMIASAEIASAFIAOAEIAOAFIAPAGIAPAFIAQAFIAOAFQAWgMAYgGIAVgDIAFABQBOg7BWggQAkgPAmgIIAGgFIANgJIAMgHIANgHIAMgFIAOgGIAJgGIAQgIIAJgEIAKgFQAHgFAJgCQAKgDALAAIAPgBIATAAIAMABIALgEIAMgFQAQgJAQgGQAPgHARgEQAngJApABQAeACAfgBQAmAAAmAEQAYACAXAFIASAGQAIAEAIAGIAKAHIAOAJQAKAGAIAHIAPAJQAbAHAZANQAZAOAVAUQAPAOARALQAUANASAPQAXAUATAXIAHAIIAHAJIAKAJIAMAMIAKANIAKAOIAOANIABABIAOANIALAKIALAKIAMANIAKAOIAJAPIAHAPIAHAOIAGAOIAMAbIAOAHIAjAQQATAJAPASIAbAaQAYgCAZABQA9ABA+gBQAhgBAdAIQAfAIAcARQAxAdA0AYIAQAJIAOAKIAOALIAOAIIABABIAMAGIAOAIIAJAFIAJAFIAKAHIACACIAMAJIALAKIATAVIAQAOIAPAMIANANIAMAOQAUAmARAoQAIARAFATQAVAiAPAkIANAjQAKAVAGAXQAGAWABAWQACAagDAcQgBA5gNA4QgEASgFARIgBASIAAAIIgBAJIgBAIIgBAHIgDAUIgDARIgEARIgEASIgFAQIgHATIgCAMIgEASIgEAMIgEAJIgIARIgIAPIgIAOIgKANIgKANIgMAMIgLAMIgNAMIgNAPIgNAPIgHAIIgHAHIgNAOIgIAJIgHAIIgMAMIgNAKIgOALIgNAIIgNAJIgKAHIgDAGIgHARIgIARIgIARIgGAJIgHAJIgLAPIgIANIgIANIgKAPIgLANIgLAOIgIAJIgGAHIgNAPIgRATIgRAPIgCACIgSAOQgRAQgTAPQgTASgWAOQgWAOgXANIguAYIgyAYIgbALIAAAAQgIAEgKADIgWAGIgVAFIgbAFQgWAIgWADQgaAEgbABIgoABIgNAAg");
	this.shape_1.setTransform(642.3656,362.496);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0.58)").s().p("AJbSxQgeAAgegBIghgDIghgEIgggHQgVgGgUgIQgRgHgQgJIghgUIgTgJIgTgMIgSgHIgRgJIgQgMIgPgNIgOgPIgNgMIgMgOIgNgMIgNgPIgJgLIgNgQIgMgPIgLgOIgHgPIgIgPIgLgQIgGgLIgHgNIgJgPIgDgHIgFgJIgHgNQgfgBgegDIgHgBIgzgGIgugFIhVABQgpAAgogKIgagIIg3AGIgoADQgTABgTgFIgNgCIgMANIgMAMIgOAMIgPAKIgSAKIgKAHIgKAGIgdAOIgbAMIgZALQgTAHgUAFQgVAEgWACIgxAGIghABIghABIgeACQgPADgRABQgRACgRgBIgsgCIgXgBIgVgBIgUgBIgYgDIgUgEIgQgEIgRgGIgTgJIgRgJIgTgKQgJgEgJgGIgQgKIgOgKIgRgNIgQgPIgOgPIgUgcIgNgQIgMgRIgOgYIgGgKIgHgNIgGgNIgEgMIgGgSIgEgSIgHgVIgFgPIgFgRIgEgRIgEgPIgDgPIgIgbQgEgOgCgPQgHgXgEgXIgFgCIgQgGIgPgHIgFAAIgNAAIgPgCIgWgDIgWgDIgOgCIgPgDIgigNIgCAAQgSgIgRgKQgSgKgPgOQgOgLgMgNIgMgOIgKgNIgVgdQgYhHgLhJQgciIAKiPQAEhAAUg8QAKgfAOgcQAthbBYgsQAqgjA9gNQAEgLAFgLQADgbAHgaQAKghATgdIAQgmIASgkIASglIAOgeIAPgfIAMgaIAGgLIAHgJQAIgRALgQQgEADATgWQAJgLALgJQgKAXAGgFQAXgTAagLQAqgjAUgHQABAIAWgIQBdgaAkAGQAuADAvAEQAoABAlAMQARAFARAHIATAEIATAFIAPAGIARAFIAQAHIASAFIARAGIAOAFQAogaAsgNQATgGATgDIAFAAQBIg2BPgfQAjgNAkgJIAIgGIAPgJIAMgHIANgHIANgGIAQgIIAMgGIAQgJIALgEIAMgGQANgKARgEQATgFAUAAIAeAAQASgBATABQAMABALACIAMgDIANgEQAOgHARgFQAOgGAPgEQAlgIAmACIA4ABQAjAAAjADQAWADAVAEQAPAEAPAHQAOAHAMAKQAIAHAKAGQAMAHAKAIQAOALAMAMIAQALQAaAGAXANQAXANAUASQANANAQALQATAMARAOQAVASASAWIAJALIAIALIANALIAOAOIAKANIALAOIAOAOIACABIAPAOIAMALIALALIAMAPIALAPIAJARIAJARIAGAPIAHAPQAJATAHAUIAZAFIA/APQAiAHAcAZQAYAUAaARQAWgBAXAAQA5ACA5gBQAeAAAcAHQAcAIAaAQQAtAbAxAXIARAKIAQALIAQAMIAPAJIABABIAOAGIAOAJIAJAFIAJAFIALAHIACACIAMAJIALAKIAUAVIATASIAQAOQAIAGAHAIIAOAQQATAjARAlQAHARAFARQAYApASArQAIAUAHAUQAPAeAJAfQAJAeABAfQACAlgGAnQgCA4gNA3IgIAkIgBAVIgBALIgBAMIgDAMIgBAKIgEAWIgDARIgEARIgFARIgFARIgHAVIgDAOIgFAVIgGAOIgFAMIgJASIgJAPIgIAOIgLAOIgMAPIgNANIgNAOIgOAOIgPARIgPARIgIAJIgHAIIgQAPIgIAKIgHAIIgPANIgOALIgQAMIgOAJIgMAIIgLALIgEAIIgIATIgKATIgJATIgIALIgHALIgMARIgJAOIgJANIgLAQIgMAPIgNAQIgKALIgIAIIgOARQgKAMgMAMQgMALgMAKIgDACIgbATQgVASgXARQgTAQgWAOIgsAaIguAYIg2AZIgWAKIgJAEQgOAGgOADIggAHIghAEIgqAFQgUAIgWADIgzAEIg0ABIhDAAg");
	this.shape_2.setTransform(644.7584,365.006);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,255,0.624)").s().p("AKSUuIg/gCIghgCQgQgCgQgDIgggHQgXgFgWgIIgigRIgigTIgZgNIgagPIgTgJIgTgJIgTgNIgQgPIgPgPIgPgPIgOgOIgOgPIgNgOIgKgLIgOgTIgNgPIgMgRIgIgOIgIgPIgMgSIgIgOIgIgPIgJgRIgEgHIgFgJIgIgOQgcgCgcgFIgIgBIgugJIgsgIQgqACgrAAQgpAAgogJIgbgHIhPAFQgcACgdABQgcAAgbgHIgSgEIgNANIgNANIgQAOIgQAMIgTALIgLAHIgLAGIgeAOIgaAOIgZALQgTAHgUAFQgUAFgWACIg0AIIgfADIggACIgdACQgTAFgVACQgVACgVAAQgaAAgZgCIgegBIgcgCIgaAAIgfgDIgagEIgVgFIgSgGIgUgKIgUgJIgUgLQgLgFgJgHIgQgJIgPgLIgTgNIgSgQIgRgRIgVgbIgOgSQgIgJgGgLQgJgNgIgPIgIgMIgJgQIgHgPIgFgOIgHgUIgFgVIgHgWIgFgPIgFgQIgEgSIgFgRIgEgSIgIgdIgHgfQgIgagFgcIgFgDIgPgJIgOgJIgFAAIgRgBIgSgCIgYgCIgYgEIgSgCIgSgEIgmgOIgBAAQgVgJgTgMQgUgLgQgPQgPgMgMgOIgNgOIgLgOIgWgeQgYhDgMhFQgmikAMisQAFhLAYhGQAMgkARggQA3hnBsguQAngfA4gMQADgRAGgQQAEgcAIgbQAKgiAUgdIASgqIAUgpIATgpIAQgeIAPggIAOgfIAHgPIAHgJQAJgQALgPQAAgIAZgbQAMgNAOgLQgGATAJgGQAegVAjgKQArgfAYgHQAHAHAcgGQBegXArAIIBcAJQAmACAlALIAiAMIAUAEQALADAKAEIARAGIASAGIATAHIATAGIATAHIAOAFQA6goA/gVQAbgJAcgFIAFgBQBDgyBJgcQAggOAigIIALgHIAQgKIANgHIANgHIANgGIASgJIAQgIIAQgJIANgFIANgHQAUgOAYgGQAdgIAeABIArAAQAcgBAbACQAQABASADIAMgCIAOgCQAPgGARgEQANgFAOgDQAhgIAjACQAaACAZAAQAhAAAgADQATADATAEQAWAFAUAKQAUAKARAPQALALAOAIQAQAKAPALQATAPAQARIARAOQAXAGAVALQAWAMASARQAMAMAPAKQARALAQAOQAUARARAUIAKANIAKAOIAPANIAQAQIALANIALAOIAQAPIABABIARAQIALALIALALIAOARIALARIAKATIAJATIAHAPIAIAPQALAZAHAaIAlAFQAuAHAuAGQAwAGApAgQAkAaAmAWQAUgBAVABQA0ACA1AAQAbgBAZAHQAaAIAYAPQAqAZAtAVIATAMIARAMIASAMIARAKIABABIAOAHIAPAJIAKAFIAJAGIAKAHIADACIAMAJIALAKIAVAWIAWAVIASAPIARAQIAPARQASAhAQAjQAHAPAFAQQAbAvAWAyQAJAXAHAYQAUAlAMAnQAMAmABAnQABAygIAyQgDA3gNA2IgHAkIgCAXIgBAPIgBAQIgDAPIgDANIgFAYIgEARIgEARIgEARIgFARIgHAYIgEARIgGAWIgIARIgGAOIgLATIgJAQIgIAOIgNAQIgNAPIgPAPIgPAQIgPAQIgQASIgRATIgJAKIgJAKIgQAQIgJAKIgIAJIgQAOIgQAMIgTANIgPAJIgLAIIgLANIgFAMIgJAVIgMAVIgLAUIgJAOIgJANIgNATIgIAOIgJANIgNARIgNARIgPASIgNAOIgJAKIgPARQgNAPgPAOQgPAPgQAMIgEACQgSANgSAMQgZAUgaASQgUAQgWANQgVANgXAMIgtAYIg5AaIgRAHIgTAKQgSAHgTAEQgWAFgWACIgrAFIg5AEQgUAHgVACIgxAFIgyABIhBgBg");
	this.shape_3.setTransform(647.1363,367.5039);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0.667)").s().p("ALIWsIhCgDIgggCQgQgCgQgDQgQgCgPgEQgagGgYgJQgSgHgRgJIgigTQgRgHgPgJIgggUIgVgJIgVgKIgUgOIgTgQIgQgRIgQgQIgQgPIgPgQIgOgPIgJgLIgRgVIgOgRIgNgSIgJgOIgIgPIgNgTIgJgRIgJgSIgKgRIgEgIIgGgKIgIgOQgagEgagHIgHgBIgrgMIgpgKIhWACQgpAAgogIIgbgGQgzACgzADIhMACQglAAgjgKIgYgGIgNAOIgPAOIgQAPIgSAOIgUAMIgMAIIgLAGIgfAPIgaANIgZAMQgSAIgUAFQgUAFgVADIg3ALIgeADIgfADIgcACQgXAHgYADQgZACgZAAQgeABgdgCIgkgBIgjgBIghgBIgmgDIgfgEIgagFIgTgHIgWgKIgWgKIgXgMQgLgGgKgHIgQgJIgQgLIgVgOIgUgRIgTgSIgWgcIgQgTQgJgKgGgLIgVghIgKgPIgKgSIgJgRIgGgRIgHgWIgGgXIgHgXIgGgQIgFgQIgEgRIgGgUIgFgVIgIgfIgHghQgKgegGggIgEgEIgOgLIgNgMIgHAAIgUgBIgVgCIgagDIgbgEIgUgDIgVgEIgqgPIgBgBQgXgJgVgNQgWgMgSgQQgPgNgNgOIgOgQIgLgOIgYggQgYg/gNhBQgwi/AOjKQAGhVAchQQAOgpAUgkQBCh0CAgwQAjgcAygKQAEgXAHgVQAEgdAJgbQALgjAVgfIAUguIAVgtIAWgsIAPgfIAPghIARgkIAIgRIAIgKQAIgQALgOQAFgSAfggQAPgPASgNQgDAPAMgHQAmgYArgJQAtgcAcgFQANAGAggFQBhgVAyAMQAuAFAtAHQAkACAjAKIAkALIAVAFIAWAHIASAIIAVAGIAVAHIAVAHIAVAIIANAFQBMg2BTgdQAjgMAkgGIAGgCQA9guBCgaQAfgOAggIIANgIIASgLIANgHIANgGIAOgHIAUgKIATgJIAQgKIAOgGIAQgHQAagTAggIQAmgKAnABQAdABAdgBQAkgBAkADQAXACAWAEIANgBIAPgBQAQgFARgCQALgFANgDQAegGAgACQAXACAXAAQAeAAAdAEQARACARAEQAcAGAaAOQAZANAWATQAPAOARALQAVANASAPQAYATAUAWIATAQQAVAFATALQATALARAPQALALAOAJQAQALAOANQATAQAQASIAMAQIALARIARAPIASARIAMANIALAOIASAQIABABIASARIALAMIALAMIAPASIAMAUIAKAUIAKAVIAIAPIAIAQQAOAfAIAhQAYAAAYADQA8AHA8AEQA/AFA2AnQAvAgAyAbQATgBATABQAvADAvAAQAZAAAXAHQAYAHAWAOQAnAXApAUIAUAOIATAMIATANIATAKIABABIAPAIIAQAJIAKAGIAJAGIALAHIACACIAMAJIAMAKIAWAWIAZAZIAUARIASARIARATQARAeAPAgQAHAPAFAPQAeA1AYA4QALAaAIAbQAZAtAPAwQAPAuABAwQABA9gLA9QgEA2gNA1IgHAlIgBAZIgCATIgCATIgEASIgDARIgHAaIgDARIgFARIgEAQIgFASIgHAaIgFAUIgHAYIgKATIgHARIgMAUIgKAQIgIAOIgPARIgOARIgQAQIgRASIgRASIgSAUIgSAUIgKAMIgKALQgIAJgKAIIgJAKIgJAKIgSAPIgRANIgVAOIgQAJIgKAIIgMARIgGAOIgKAXIgNAXIgNAWIgKAQIgKAPIgOAVIgKAOIgJANIgOATIgPASIgQAUIgPARIgLALIgRASQgPATgRAQQgSASgVAOIgEADQgXAQgXAOQgcAVgfAUQgUAPgVANIgsAZIgtAXIg7AbIgMAFQgPAIgPAGQgWAJgYAFQgbAFgbADIg3AFIhHADQgTAGgVADQgXACgYABIgwABIhAAAg");
	this.shape_4.setTransform(649.5198,369.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,255,0.706)").s().p("AL/YpQgigBgjgCIgggDQgQgBgPgDIgggGQgcgHgagIIgjgQIgkgTQgTgJgTgLQgTgLgTgNIgXgJIgXgLIgWgPIgUgRIgSgSIgSgTIgRgQIgQgSIgOgOIgKgLIgSgXIgPgTIgPgTIgJgPIgJgPIgOgUIgKgUIgKgUIgLgSIgEgIIgGgLIgJgPQgZgGgXgIIgHgBIgngPIgmgMQgrACgrAAQgqABgogIIgbgFIh+AEIhdACQguAAgrgNIgegIIgOAPIgQAOIgSARIgSAPIgWAOIgNAIIgLAHIggAPIgaAOIgYAMQgTAHgTAGIgpAJIg4AOIgeADIgeAEIgbADQgaAIgcAEQgdADgeABQghAAghgCIgrAAIgqgBIgngBIgtgDIgkgFQgQgCgPgDIgUgHIgYgLQgMgEgNgHIgYgNIgXgNIgRgKIgQgKIgXgQIgXgRIgUgUIgYgbIgSgVQgJgLgHgMQgMgSgMgUIgMgRIgMgVIgKgTQgEgKgDgKIgIgYIgGgYIgIgaIgFgOIgFgQIgFgRIgHgYIgGgXIgIghQgEgRgCgSQgMgigHgkIgFgFIgMgOIgNgPIgHAAIgXAAIgZgDIgcgDIgdgEIgYgDIgYgFIgtgRIgBAAQgZgLgXgNQgYgOgUgRQgPgNgOgQIgPgQIgLgOIgagiQgXg7gPg9Qg5jbAQjoQAGhfAghaQARguAXgoQBLiACUgyQAggYAtgKQAEgcAIgbQAFgdAJgcQAMgkAVggIAWgyIAXgwIAYgxIAQggIAPghIAUgpIAJgVIAIgKQAIgPALgOQAKgbAlglQASgTAVgOQABALAOgIQAugaA0gIQAugYAfgFQAVAGAkgFQBjgSA5APQAtAGAtAIQAjADAhAJQASAFASAGIAXAGQALADAMAFIAUAIIAXAGIAWAIIAYAHIAWAJIANAFQBehDBngkQArgQAtgIIAGgDQA3gqA8gYQAdgNAdgJIAQgJIAUgLIANgGIANgHIAOgIIAXgLIAWgKIARgKIAPgHIASgIQAhgYAngKQAvgLAxABQAkABAjgBQAugBAtAEQAcACAcAGIANgBIAQAAQAQgDARgBIAWgGQAbgFAdACIApACQAbABAaADQAPACAPADQAjAIAfARQAfAQAaAYQASARAVAOQAaAPAWATQAdAXAYAcIATARQATAFASAKQARAKAPAOQALAKAMAIQAPAKANAMQARAPAPARIANASIAOATIATASIAUATIAMANIALANIATASIACABIATASIALANIALAMIAQAUIANAWIALAWIAKAXIAIAQIAJAQQAQAlAJAmQAeAAAdADQBLAGBKADQBOAEBDAtQA6AnA+AgIAiABQArACAqABQAXABAVAGQAVAHAUAMQAjAWAmASIAVAQIAVANIAVANIAUALIABABIARAJIAQAKIAKAFIAJAGIALAIIADABIAMAKIAMAKIAWAWIAdAdIAVASQALAIAJALIATAUQAQAcAOAdIAMAbQAhA8AbA/QAMAdAJAeQAeA1ASA5QASA2ABA4QAABIgOBIQgEA1gOA0IgGAmIgBAcIgCAWIgDAWIgEAWIgFAVIgHAcIgEAQIgEARIgFAQIgFATIgHAbIgGAXIgIAaIgLAWIgJATIgNAWIgKAQIgJAOIgQASIgQASIgSARIgSAVIgSAUIgUAWIgUAVIgLANIgKAMIgUATIgKALIgJAJIgUAQIgTAOQgLAJgMAHIgRAKIgJAHIgNATIgHASIgLAZIgPAZIgOAXIgMASIgLASIgPAWIgKAPIgJANIgQAUIgQAUIgSAWIgRATIgNAOIgSATQgRAVgUASQgWAVgYARIgGAEQgaASgcARQghAXgiAVQgUAOgVANIgsAYIgsAWIg/AdIgHADQgUAKgUAJQgbAKgcAFQghAHggADQgiADggABIhWADQgSAGgUACIgtADIgvABIg9gBg");
	this.shape_5.setTransform(651.9255,372.4833);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,255,0.749)").s().p("ANwaqIg7AAIhHgEIgfgDIgggEIgfgGQgegHgdgJQgSgHgSgJQgSgIgSgKQgXgLgWgMIgsgcIgYgKIgagNIgXgPIgWgSIgUgUIgTgUIgSgSIgSgSIgOgQIgKgKIgVgaIgQgUQgJgJgHgLIgJgPIgKgPIgPgWIgLgWIgLgXIgMgTIgFgIIgGgLIgJgRQgXgHgVgKIgGgBIglgRIghgQQgsADgrABQgqAAgpgGIgbgFIiVADQg4ABg4ABQg2gBg0gPIgjgLIgPARIgRAPIgTATIgUARIgXAOIgNAIIgNAIIghAPIgZAOIgYANQgSAIgTAFQgUAGgUAFIg7AQIgdAFIgdAEIgaADQgeAKggAFQggAEgiABQglAAgkgCIgyAAIgxgBIgtgBIg0gCIgrgGIgjgGIgVgHIgagLQgNgFgOgHIgagNIgZgPIgRgKIgQgKIgagRIgZgTQgMgJgKgLIgZgbIgUgYQgJgMgIgMQgOgVgNgVIgOgUIgOgXIgLgWIgJgWQgFgMgEgOIgGgaIgIgcIgFgOIgFgPIgGgSIgHgaIgHgbIgJgiIgGglQgOgmgIgoIgEgFIgMgRIgLgSIgIAAIgbAAIgbgDIgfgEQgQgBgPgDIgbgEIgbgEIgxgTIgBAAQgbgMgZgOQgagPgVgTQgRgNgOgQIgPgRIgNgQIgagjQgYg4gQg4QhDj3ASkFQAIhqAjhjQATg0AbgsQBViMCogzQAcgVAogJQAEghAJghQAFgdAKgdQANglAWghIAYg2IAZg1IAZg0IAQghIAQghIAWgvIALgXIAIgLQAIgPALgNQAPglAqgqQAVgWAZgPQAFAGAQgIQA2gcA8gIQAwgUAjgEQAbAEApgDQBlgPBAASQAtAHAsAJQAhADAgAIQASAFATAHIAXAGQANADAMAFIAWAJIAZAHIAYAJIAaAIIAYAJIAMAGQBwhSB7gsQA0gSA0gLIAHgDQAxgmA2gXQAbgMAbgJIASgKIAWgLIANgHIAOgHIAOgIIAagMIAYgLIARgLIARgIIATgJQAogbAvgNQA5gOA6ACQArABAqgBQA3gBA2AFQAiADAhAGIAOABIAQABQARgBARgBIATgEQAZgEAZACIAkACQAYABAXADIAbAFQAoAKAlATQAkAUAfAcQAWAVAZAQQAeASAaAWQAiAbAcAiIAUATQARAFAQAJQAPAJAOANQAJAIALAHIAaAVQAPAOAOAPIAPAVIAPAWIAVAUIAXAUIAMANIAMANIAUATIACABIAUAUIAMANIALAMIAQAWIANAYIAMAYIAMAZIAIAQIAJARQATAqAKAtQAjAAAjACQBZAGBYACQBeACBPA0QBFAuBKAkIAfACQAlACAmACQAUABATAGQATAGASALQAgAUAhARIAYARIAWAOIAXAOIAVALIABABIASAKIARAKIALAGIAJAGIALAIIACACIANAKIAMAJIAXAXIAfAgIAYATQALAKALAKIAUAWIAdA1QAGAMAEAMQAlBCAeBHQANAfAKAiQAjA7AWBDQAUA+AABAQABBUgRBTQgFA0gOAzIgFAmIgCAfIgCAZIgEAaIgFAZIgFAZIgIAeIgEAQIgFAQIgFARIgFATIgHAdIgGAaIgKAcIgNAZIgKAUIgPAYIgKAQIgJAOIgRATQgJALgJAIIgTATIgTAXIgVAWIgVAYIgWAWIgMAPIgLAOIgVAUIgLAKIgKAKIgVARIgVAQIgYAQIgTAKIgIAHIgNAXIgJAUIgLAbIgRAbIgQAZIgNAUIgNAUIgQAYIgKAPIgKANIgQAWIgSAVIgUAZIgTAVIgPAQIgTATQgTAYgXAVQgaAYgcAUIgGADQgfAWggATQglAYgmAXQgUAOgVAMIgrAXIgtAWIhBAeIgCABQgZANgaAKQgfANghAGQgmAGgmADQgnADgmABIhkAEQgSAEgTACQgWACgWABIgeAAIgPAAg");
	this.shape_6.setTransform(654.309,374.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,255,0.792)").s().p("AOlcsIg5AAIhKgEIgfgDIgfgEIgfgGQgggHgfgKQgTgGgSgJIgmgSQgagMgYgPIgzggIgagLIgbgNIgagQIgXgTIgVgWIgVgWIgUgSIgTgVIgOgPIgLgKIgWgcIgRgVQgKgLgHgMIgKgOIgKgQIgQgXIgNgYIgMgaIgMgUIgGgJIgGgLIgKgRIgogUIgFgDIgigTIgfgSQgqADgsABQgqAAgpgFIgcgEIitACQhAAChBgBQg/AAg8gSQgUgFgVgIIgQARIgSAQIgUAUIgVATIgYARIgOAIIgOAHQgRAJgRAHIgYAPQgLAHgNAGQgSAIgSAGQgUAGgUAFIg+ATIgbAFIgdAFIgYAEQgiAMgkAFQgkAFgmABQgoABgogCIg5AAIg4gBIg0gBIg6gCQgZgCgYgEIgngHIgXgHIgcgMIgdgMIgbgPQgOgHgNgIIgRgKIgSgKIgbgSIgbgUQgNgKgMgLIgagcIgVgZQgLgNgJgNIgdgvIgQgWQgJgMgHgNQgHgMgGgNIgKgYQgFgOgEgOIgHgcIgIgdIgFgPIgFgPIgGgRIgJgdIgHgeIgJgkIgHgmQgPgqgJgtIgEgHIgLgTIgJgUIgKAAQgQAAgOgBIgegDIgigDIghgFIgfgEIgdgGIg1gTIgBgBQgdgMgbgQQgbgQgXgUQgSgOgPgRIgPgRIgOgQIgbglQgYg0gSg1QhMkRAUkkQAIh0AohsQAVg6AegwQBfiYC8g2QAZgRAigIQAEgmAKglQAGggALgdQAOgmAWgiIAZg6IAcg5IAbg4IAQghIARgjIAYgzIAMgbIAIgLQAIgOALgNQAUguAwgwQAYgXAcgSQAJADATgKQA9gfBFgGQAxgRAmgDQAiAEAugDQBngLBIAUQAsAJArAKQAfADAfAIQATAEATAHQANADALAEQAOADANAGIAXAKIAbAHIAbAIIAbAKIAZALIAMAFQCChgCPg0QA8gVA9gNIAHgEQAsghAvgVQAZgMAZgJIAVgMIAXgLIANgHIAPgGIAPgIQANgIAOgHIAbgMIASgLIATgJIAUgKQAuggA3gOQBCgQBEACQAxABAzgBQA/gBA/AGQAnAEAnAHIAPACIARABIAiACQAIgDAJgBQAVgCAWACIAfACQAVABAUAEIAXAEQAuALArAWQAqAXAkAhQAZAYAdATQAiAVAeAZQAnAgAgAmIAWAWQAOAFAOAHQAOAJAMAKQAIAIAJAGIAYATQAOANAMAOIARAYIARAYIAXAWIAZAWIAMANIANANIAWAUIABABIAVAVIAMAOIALANIARAXIAOAaIANAaIAMAbIAJAQIAJASQAVAwALAzQApgBApACQBnAFBnABQBsABBcA8QBRAzBWApQANAAANACIBDAGQARABAQAFQARAGAQAKQAdARAdAQIAZATIAYAPIAZAOIAWANIACABIASAKIATAKIAKAHIAKAGIAKAHIADACIANAKIAMAKIAYAYIAiAjQANAKAMALQANAKALALIAWAXQAOAYANAZIAKAWQAoBIAhBMQAPAjAKAlQApBDAYBLQAXBHAABJQAABfgTBeQgGAzgOAyQgBATgDATIgCAiIgDAdIgEAdIgGAcIgGAdIgJAgIgFAPIgFAQIgFAQIgFAUIgGAgQgFAOgDAOIgLAfIgOAaIgMAYIgQAZIgKAQIgJAOIgTAVQgJALgKAJIgVAUIgVAYIgWAZQgLANgMAMIgYAZIgMAPIgNAPIgWAVIgLALIgLALIgXASIgXAQIgaASIgUAKIgHAHIgOAZIgKAZIgMAdIgSAcIgSAaIgOAXIgOAWIgRAaIgKAOIgLAPIgSAXIgTAWIgVAbIgWAYIgQARIgVAUQgVAbgaAXQgdAbggAXIgHAEQgkAYgkAWQgpAZgqAYQgUAOgVALIgrAYIgsAVIhFAfIAEgBQgfAPgeAMQgjAPgmAGQgsAHgrAEQgtADgrABIhzACQgRAEgSACQgVACgWAAIgVAAIgWAAg");
	this.shape_7.setTransform(656.6678,376.6267);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(255,255,255,0.831)").s().p("APZevIg3gBIhMgFIgfgCIgfgFIgegFQgjgHghgKIgmgPIgmgTQgdgNgcgRIg5gkIgcgMIgdgNIgbgRIgagVIgWgWIgWgYIgWgUIgUgWIgPgPIgKgKIgYgeIgTgXQgKgMgIgMIgKgOIgLgQQgJgMgIgNIgOgbIgOgcIgMgVIgGgKIgGgLIgLgSIgkgXIgEgDIgfgWIgcgUQgrADgsABQgqABgpgFIgcgDIjEABQhKAChJgBQhIAAhFgVIgugPIgRASIgTAQIgWAWIgWAVIgZASIgPAIIgOAHIgjARIgYAPIgXAOIgkAOIgoANIg/AVIgbAGIgcAFIgXAFQglANgoAGQgpAGgqABQgrABgsgBIg/gBIg/AAIg6gBIhCgCQgbgCgbgEQgWgDgWgFIgYgHIgegNIgfgNIgdgPIgdgRIgSgJIgRgLIgegSQgQgKgOgLQgOgLgNgMIgagcIgYgaQgLgOgJgOQgRgZgQgbIgSgYIgRgcIgPgbIgLgaQgGgPgEgQIgIgeIgHgfIgFgNIgGgPIgGgRIgKggIgIghIgJgmQgEgUgCgUQgRgugKgxIgEgIIgKgWIgJgWIgLAAQgRAAgQgCIghgDIgkgDIgkgFIghgFIghgGIg4gVIgBAAQgfgNgdgSQgdgQgZgWQgSgPgQgRIgQgSIgOgQIgdgnQgYgwgTgxQhWktAWlBQAJh/Ash2QAXg/Aig0QBpikDPg4QAWgOAcgGQAFgsALgrQAHggALgeQAPgnAXgjIAbg+IAdg8IAdg8IARgjIARgjIAag4IANgeIAJgLQAIgOAKgMQAZg5A3g1QAbgaAfgTQANgBAVgKQBFgiBOgFQAygOAqgCQApADAygBQBpgJBPAXQAsAKAqAMQAeADAcAHQAUAEATAHQAOADAMAEQAOAEAOAGIAZALIAdAIIAcAIIAdAKIAcAMIALAFQCUhtCig7QBFgZBGgPIAHgFQAmgdApgTQAWgLAYgKIAXgMIAZgMIANgGIAPgHIAPgJIAegPIAegOIASgLIAVgKIAWgLQA1gkA+gQQBLgTBOACQA4ACA6gBQBIgBBIAHQAtAEAsAJIAPACIASADIAjAEQAHgCAHAAQASgCATADIAaACIAjAFIATADQA1ANAwAZQAwAaAoAmQAdAbAgAVQAnAYAiAdQAsAkAkArIAWAYQANAFAMAHQAMAHAKAJIAPAMIAVASQANALALANIATAaIASAaIAaAZIAaAYIANAMIANANIAXAWIACABIAWAWIAMAOIALAOIASAZIAPAcIANAcIANAcIAJASIAKASQAYA2AMA5QAugCAuACQB2AFB1gBQB7AABpBCQBcA6BiAuIAXACIA5AHQAPABAOAFQAOAFAOAJQAZAQAaAOIAbAVIAZAPIAaAPIAYAOIACABIAUAKIATAMIAKAGIAKAGIALAIIACACIAOAKIAMAKIAYAYIAmAnIAbAWQANAKAMANIAYAYIAZAsIAKATQArBPAkBTQAQAmALAoQAuBLAbBTQAaBPAABSQAABrgWBoQgHAygOAyIgEAmIgCAkIgDAhIgFAgIgGAgIgHAgIgKAiIgFAQIgFAPIgGAQIgFAUIgGAjIgIAeIgNAhQgIAOgHAPIgOAaIgRAaIgLARIgJAOIgUAWQgKAMgLAJIgWAVIgXAbIgYAbIgYAaIgaAbIgNARIgNAQIgYAWIgMAMIgLAKIgZATIgZASIgcATIgVALIgGAGIgOAcIgMAcIgNAfIgTAdIgUAdIgPAZIgQAYIgSAbIgKAPIgLAPIgUAYIgUAYIgXAdIgYAbIgSASIgWAWQgYAdgcAaQghAegkAZIgHAFQgoAbgqAYQgsAbguAZIgpAYIgrAXIgrAUIhIAhIAJgEQgkASgkAPQgoAQgqAHQgxAIgxADQgyAEgxAAIiBACQgRAEgRABIgpACIgVAAIgVAAg");
	this.shape_8.setTransform(659.0759,378.6277);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(255,255,255,0.875)").s().p("EAQOAgxIg1gBQgngCgpgDIgegDQgPgBgPgDIgegFQgmgIgjgKIgmgPIgogSQgggPgfgTIg/goIgdgMIgfgOIgegSIgbgWIgYgYIgYgaIgXgUIgVgYIgPgPIgLgKIgaghIgUgYQgKgMgJgOIgLgOIgKgQIgTgZIgPgeIgPgfIgNgWIgGgKIgHgMIgLgSIgggbIgEgDIgbgZIgZgXQgrADgsACQgqABgqgEIgcgCQhugBhuABQhSAChTgBQhRgBhNgXQgZgIgagJIgSASIgUASIgXAXIgXAWIgbAUIgQAJIgOAHQgSAJgSAIIgYAPQgLAIgMAGIgjAPIgnAOIhCAYIgaAGIgbAHIgWAFQgpAPgrAHQgtAGguABQgvACgwgCIhGAAIhFAAIhBgBIhIgCQgfgCgdgFQgZgDgYgFIgZgIIgggMIghgOIgfgRIgegRIgTgKIgSgKIgggUIgggVIgdgYIgcgdIgZgbQgMgPgKgPQgSgbgSgeQgKgMgJgOQgLgPgJgPIgPgeQgHgOgFgPQgHgPgEgRIgJggIgIghIgFgNIgFgPIgGgRQgHgRgFgSIgJgjIgJgoQgEgVgCgVQgTgygLg2IgDgIIgJgYIgIgaIgMAAQgTAAgRgBIglgDIgmgEIgmgFIglgGIgjgGIg8gWIgBgBQghgOgfgSQgfgSgagXQgTgPgRgSIgRgTIgOgRQgQgTgPgVQgYgsgTgtQhglJAYlfQAKiJAwiAQAZhDAkg4QB0ixDjg6QASgLAXgFQAFgxAMgwQAHghAMgfQAQgoAYgkIAchCIAfhAIAfhAIASgjIARgkIAdg+IAOggIAJgMQAIgNAKgMQAehCA8g6QAegdAjgVQAQgFAYgLQBNgkBWgEQA0gLAtgBQAwADA3gBQBrgGBWAbQArALAqANQAcADAbAGQAUAEAUAHQAOADANAFQAPAEAOAGIAbAMIAeAIIAfAJIAfALIAdANIAMAFQClh7C2hDQBNgcBOgRIAIgGQAggZAjgQQAUgMAWgJIAZgOIAbgMIAOgGIAOgHIAQgJQAQgJAQgIIAhgOIATgMIAWgLIAYgLQA7gqBGgSQBVgUBWACQBAACBBgBQBRgBBRAIQAyAEAyAKIAQAEIATADIAjAIQAFgCAGAAQAPAAAPACIAWADIAdAFIAPADQA7AOA2AdQA1AcAtArQAgAeAlAYQArAbAmAgQAxAoAoAxIAXAaQALAEAJAGIAUAOIAMAKIATAQQALALAKALIAVAcIAUAdIAbAbIAdAZIANANIAOANIAYAWIACACIAXAXIAMAPIALAOIATAbIAQAeIAOAdIANAfIAKASIAKASQAaA8ANBAQA0gDA0ACQCDAECEgCQCKgBB1BJQBoBABuAzIATACIAwAIQAMACAMAEQAMAFAMAIIAsAaIAcAXIAbAQIAcAPIAaAPIABABIAVALIAUAMIALAGIAJAHIALAIIADABIANALIANAKIAZAYIApArIAcAXQAPALANAOQANAMAMAOIAXAmIAKARQAuBWAnBZQARApAMArQAzBTAeBcQAdBXAABaQgBB2gYB0QgIAxgOAwIgDAoIgDAmIgEAkIgEAkIgHAjIgIAkIgMAkIgFAPIgFAQIgGAPIgEAVIgHAkIgJAiIgNAiIgSAgIgPAcIgSAcIgLARIgKANIgWAYQgKAMgMALIgYAWIgYAdIgZAdIgaAcIgcAcIgOASIgOARIgZAYIgNAMIgMALIgaAUIgaASQgPALgQAKIgWALIgFAGIgPAfIgNAfIgNAhIgWAfIgVAeIgRAbIgRAbIgTAdIgKAPIgLAPIgVAaIgWAZIgZAfIgaAdIgUAUIgXAXQgaAgggAcQgjAhgoAcIgJAFQgsAeguAaQgxAdgxAbQgVAMgVALIgqAWIgrAUIhLAhIALgEQgnAUgnAQQgtASgvAHQg3AJg2AEQg4ADg2ABIiQABQgQADgQABIgnABIgoAAg");
	this.shape_9.setTransform(661.4604,380.6364);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(255,255,255,0.918)").s().p("EARDAizIg0gBIhSgGIgdgCQgQgCgPgDIgdgFQgogHgmgLIgngOIgogSQgjgRgjgVIhEgsIgggNIghgOIgfgTIgdgYIgagZIgZgcIgYgVIgXgaIgPgOIgLgKIgcgjIgVgaQgLgNgKgOIgLgOIgLgQIgUgbIgQghIgQgiIgNgXIgHgKIgHgMIgMgTIgcgeIgDgEIgXgbIgWgZQgsADgsACQgrABgqgDIgcgBQh6gCh5ABQhbABhcgBQhaAAhVgaQgcgJgdgLIgTAUIgVASQgLANgNAMIgYAYIgcAVIgRAJIgPAHQgTAKgSAHIgXARIgXAOIgjAPIgmAPIhFAaIgYAIIgaAHIgWAGQgsARgvAHQgxAHgyACQgzACgzgCIhNAAIhMgBIhHAAIhQgCQghgDgggEQgbgEgbgFIgZgIQgSgGgRgHQgRgGgSgIIghgSIgggTIgSgJIgTgLQgTgKgQgKIghgXQgRgMgPgNIgdgcIgageQgNgPgLgRQgUgdgTggQgLgNgLgPQgLgQgJgRQgJgPgJgRQgHgQgGgPQgHgRgEgRIgKgjIgHgiIgGgNIgFgPIgHgQIgMgmQgGgTgEgUIgJgpIgHgsQgUg2gMg6IgDgJIgIgbIgHgcIgNAAQgVAAgSgCIgogDIgpgEIgogGIgogFIgmgHIg/gYIgCgBQgjgOghgUQghgTgcgYQgTgQgSgTIgRgTIgPgRQgRgUgPgWQgYgpgVgpQhplkAal8QAKiUA0iJQAchJAng8QB+i+D3g7QAPgHARgEQAFg3ANg1QAIgiANggQAQgpAZgkIAehHIAhhEIAhhEIASgjIARglIAghDIAPgkIAKgMQAHgMAKgLQAjhNBCg/QAhgfAmgXIAvgVQBVgmBegDQA1gHAxgBQA2ACA8ABQBtgEBdAeQArAMAqAOQAZAEAaAFQAUAEAVAHQAPADANAFQAPAFAPAHIAdAMIAhAJIAhAJIAgAMIAfAOIALAFQC4iJDJhLQBWggBWgSIAIgHQAagUAdgPQASgLAUgJIAcgPIAcgNIAOgGIAPgHIAQgJQARgKASgIIAkgQIASgMIAYgMIAagMQBCguBNgUQBegXBgADQBHACBIgBQBbgBBZAIQA4AGA3ALIAQAEIAUAFIAkAKIAJgBIAYAEIARADIAXAFIALADQBBAPA7AgQA7AfAyAwQAjAiAoAaQAwAdAqAkQA2AsAsA2IAZAdIAQAIIAPAMIAKAIIARAPIASATIAXAfIAVAfIAeAdIAfAbIANANIAOANIAbAXIABACIAZAZIAMAPIALAOIATAdIARAgIAOAfIAPAhIAKASIAKATQAdBCAOBFQA5gDA6ACQCSADCRgDQCagCCCBQQBzBGB6A4IAPADIAmAIQAKACAJAEQALAFAKAHIAkAWIAeAZIAcARIAeAPIAbAQIACABIAVAMIAVAMIALAHIAKAGIALAIIADACIANALIANAKQAOAMAMAMIAsAvIAeAYQAPAMAOAOQAOANANAPIAWAhIAJAPQAxBcAqBgQASAsANAuQA4BbAiBkQAgBfgBBjQgBCCgbB/QgJAwgOAvQgBAUgCAUIgCAoIgEAoIgGAoIgHAmIgJAnIgNAmIgFAPIgGAQIgGAPIgEAVIgHAnQgFASgEASQgJATgGASIgTAiIgRAeIgTAdIgMARIgKAOIgXAZQgLANgMALIgaAYIgZAeIgbAgIgcAdIgdAeIgPATIgQATIgaAZIgNAMIgNALIgcAWIgcATIggAWIgXALIgFAGIgPAhIgPAiIgOAjIgXAiIgXAfIgSAeIgSAdIgUAeIgLAQIgLAPIgXAbIgXAbIgbAhIgcAgIgVAWIgZAXQgcAjgiAeQgnAlgsAeIgKAGQgwAggzAdQg1Aeg1AdIgpAVIgqAWIgrAUIhOAiIARgHQgtAXgtASQgwAUg0AIQg9AJg7AEQg+AEg8AAIieABIgfACIglABIgTAAIgTAAg");
	this.shape_10.setTransform(663.8445,382.6253);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(255,255,255,0.957)").s().p("EAR2Ak2IgxgCIhUgGIgegCIgegFIgdgFQgqgHgogLIgogPIgpgRQgmgSgmgXQglgXgmgaIghgOIgjgOIghgVIgfgYIgbgaIgageQgOgLgMgMIgYgbIgQgOIgLgLIgeglIgWgbQgMgOgKgPIgLgOIgMgQQgLgOgKgOIgRgkIgRgkIgPgYIgGgKIgIgNIgNgUIgXghIgDgEIgUgeIgSgcQgtAEgsACQgrABgqgBIgdgCQiFgCiFABQhkABhlgBQhigBhegdQgfgJgggMIgUAUIgWATIgZAbIgZAaIgeAWIgRAJIgQAHQgTALgTAHIgXARQgKAIgMAHIgiAQIgmAPIhHAdIgYAJIgZAHIgUAHQgwASgzAIQg0AJg3ABQg2ACg3gBIhUAAIhTgBIhOAAIhWgCQgkgDgjgEQgdgEgdgGIgbgIIglgOQgSgGgTgJIgjgTIghgTIgTgKIgUgKQgTgKgRgLQgTgMgRgMQgSgNgPgOIgfgcIgcgfQgOgQgLgSQgWgfgVgjQgMgOgLgQQgMgRgKgTQgKgQgJgSQgIgRgGgRQgIgRgFgTIgJgkIgIgkIgFgNIgGgOIgHgRIgNgoIgMgqIgIgsQgEgWgDgXQgWg6gNg+IgDgKIgHgeIgGgfIgOAAQgWAAgVgBIgrgEQgUgBgXgDIgqgGIgrgGIgpgIQgigLghgNIgCgBQglgPgigVQgjgUgegaQgUgRgSgTIgTgUIgPgSQgRgUgRgYIgthJQhzl/AcmbQALieA4iTQAehOArhAQCHjKELg9QALgEAMgDQAFg8APg7QAIgiAOggQARgqAZgmIAghLIAjhIIAjhIIASgkIARglIAjhIIAQgnIAKgNQAHgLAKgLQAohWBIhFQAkghApgZQAZgNAcgNQBdgoBngDQA2gDA1AAIB9ADQBvgBBlAhQAqANApAQIAwAJQAVADAVAHQAQAEANAFQAQAEAQAIIAeAOIAjAIIAjAKIAjAMIAgAPIALAFQDJiXDehSQBdgjBfgUIAJgIQAUgQAWgNIAigUQAPgIAQgIIAdgNIAPgGIAPgGIAQgLIAlgTIAngRIATgNIAZgMIAdgNQBIgzBVgVQBngaBpAEQBPACBPgBQBjgCBjAKQA9AGA8AMIARAFIAVAGIAkANIAHABIARAFIAMADIARAFIAHACQBIARBAAjQBBAjA3AzQAmAmAsAdQA0AgAuAmQA7AyAwA7IAaAeIAMAHIAMAKIAIAGIAOANIAQARIAYAhIAXAiIAgAfIAhAdIAOANIAOAMIAcAZIACACIAZAaIANAQIALAOIAUAfIASAhIAOAiIAQAjIAKASIALAUQAfBHAPBMQA/gEA/ABQCgADCggEQCogECPBXQB+BNCHA8IALAEIAcAJIAPAGIAQAKIAeAUIAeAZIAeASIAgARIAdAQIACABIAWAMQAMAGAKAHIALAHIAKAHIALAIIADACIAOAKIAMALIAbAYIAvAyIAgAbQAQAMAPAPQAPANANAQIAVAcIAIANQA1BiAsBnQAUAvANAxQA+BjAkBsQAjBogBBsQgBCMgeCKQgKAvgOAvIgCAoIgCArIgFAsIgGAqIgIAqIgKArIgNAoIgGAOIgGAQIgGAPIgEAVIgHApIgLAnIgPAnIgVAlIgSAhIgVAeIgMARIgKAOIgYAaIgZAZIgbAZIgcAhIgcAhQgPARgPAOQgPARgQAPQgHALgJAJIgQAUIgcAaIgOANIgNAMIgeAWIgdAUQgRANgSAKIgYAMIgDAFQgIATgJASQgHATgIASIgPAlIgZAkIgYAhIgUAgIgTAeIgVAhIgMAQIgLAPIgYAcIgZAdQgPARgNATIgfAiIgXAXIgaAYQgeAmglAgQgrAogvAhIgKAGQg1Ajg4AgQg4Agg6AeIgpAUIgpAVIgrATIhRAkIAYgKQgzAZgzAWQg1AVg5AJQhBAKhBADQhEAEhBAAIitABQgOABgPAAIgkABIglAAg");
	this.shape_11.setTransform(666.2523,384.6289);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("EAR8Am2IhXgGQgtgEgrgIQgsgIgqgLQgqgOgpgSQgqgTgogZQgpgZgogcIgjgOIglgQIgjgVIghgaIgdgbIgbggIgcgXIgZgdIgbgZIgggnIgXgdQgNgOgLgQIgXgeQgMgPgKgPIgTgmIgSgnIgWgkIgVgiIgUgkIgSglIgQgeQhmAJhlgDQiRgCiRAAQhtABhugBQhrgBhmggQgigKgigNIgVAVIgYATQgMAPgOAOIgaAbIgfAYQgSAJgRAIQgTAKgUAIIgWARQgKAIgMAIIhHAhIhJAfQghANgiAMQgzAUg3AJQg4AJg7ABQg6ADg6gCIhbAAIhaAAIhUAAIhdgCQgngDgmgFQgfgEgggGIgbgIIgngPQgUgGgUgJIgkgUQgRgJgSgMIgogUQgVgKgSgMQgUgMgSgNQgSgNgRgOIgggdIgeghQgOgRgMgSQgXgigXglQgNgPgMgRQgNgTgLgTQgLgRgJgUQgJgSgHgSQgIgTgFgTIgKgmIgIgmIgSgrQgIgVgHgXIgMgsIgJguQgEgXgCgYQgYg+gOhCQgJgmgEgnIgQAAQgYAAgWgCIgugEQgWgBgXgDQgXgCgWgEIgugHIgsgIIhIgbQgngQglgWQglgVgfgbQgfgagcggQgagegZgiIgvhBQh8mbAem4QAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQC4gFCbBeQCKBTCSBBIAlAUIAiAZIAgAbIAgATIAhARIAgASIAYANIAWANQARAKAQAMIAeAYQAOAMANANIAyA1IAiAcQARANAQAQQAPAOAPAQIAaAiQA4BoAvBuQAVAyAPA0QBCBqAoB2QAmBvgCB1QgBCYghCVQgKAugPAtIgBApIgDAuIgFAvIgGAuIgJAtIgLAuIgOAqIgTAtIgEAWIgGArIgMAqIgRAoQgMAUgKAUIgUAjIgWAfQgKAQgMAQIgaAbQgNAPgOALIgcAbIgdAjIgeAjIggAhQgPARgRAQIgRAWIgRAVIgdAbIgdAZIgfAYIggAVQgSANgSALIgZAMIgDAFIgRAoQgIAVgJATIgPAnIgbAlIgaAjIgVAiIgVAhIgWAiIgXAgIgZAeIgbAeIgeAmIggAkIgZAZIgcAZQggApgoAjQgzAvg5AmQg6Amg8AiQg8Ahg+AfQg9Aeg/AdIhUAlIAdgMQg4Abg4AYQg6AXg9AJQhHALhHAEQhJAEhHAAIi7AAIgwAAQgwAAgwgCgEgrOAUHIACAEIgBgEIgBgDg");
	this.shape_12.setTransform(668.6366,386.6302);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("EAR8Am2IhXgGQgtgEgrgIQgsgIgqgLQgqgOgpgSQgqgTgogZQgpgZgogcIgjgOIglgQIgjgVIghgaIgdgbIgbggIgcgXIgZgdIgbgZIgggnIgXgdQgNgOgLgQIgXgeQgMgPgKgPIgTgmIgSgnIgWgkIgVgiIgUgkIgSglIgQgeQhmAJhlgDQiRgCiRAAQhtABhugBQhrgBhmggQgigKgigNIgVAVIgYATIgIAKIgSATIgaAbIgfAYQgSAJgRAIQgTAKgUAIIgWARQgKAIgMAIIhHAhIhJAfQghANgiAMQgzAUg3AJQg4AJg7ABQg6ADg6gCIhbAAIhaAAIhUAAIhdgCQgngDgmgFQgfgEgggGIgbgIIgngPQgUgGgUgJIgkgUQgRgJgSgMIgogUQgVgKgSgMQgUgMgSgNQgSgNgRgOIgggdIgeghQgOgRgMgSQgXgigXglQgNgPgMgRQgNgTgLgTQgLgRgJgUQgJgSgHgSQgIgTgFgTIgKgmIgIgmIgSgrQgIgVgHgXIgMgsIgJguQgEgXgCgYQgYg+gOhCQgJgmgEgnIgQAAQgYAAgWgCIgugEQgWgBgXgDQgXgCgWgEIgugHIgsgIIhIgbQgngQglgWQglgVgfgbQgfgagcggQgagegZgiIgvhBQh8mbAem4QAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAwATAtAbQCKBTCSBBIAlAUIAiAZIAgAbIAgATIAhARIAgASIAYANIAWANQARAKAQAMIAeAYQAOAMANANIAyA1IAiAcQARANAQAQQAPAOAPAQIAaAiQA4BoAvBuQAVAyAPA0QBCBqAoB2QAmBvgCB1QgBCYghCVQgKAugPAtIgBApIgDAuIgFAvIgGAuIgJAtIgLAuIgOAqIgTAtIgEAWIgGArIgMAqIgRAoQgMAUgKAUIgUAjIgWAfQgKAQgMAQIgaAbQgNAPgOALIgcAbIgdAjIgeAjIggAhQgPARgRAQIgRAWIgRAVIgdAbIgdAZIgfAYIggAVQgSANgSALIgZAMIgDAFIgRAoQgIAVgJATIgPAnIgbAlIgaAjIgVAiIgVAhIgWAiIgXAgIgZAeIgbAeIgeAmIggAkIgZAZIgcAZQggApgoAjQgzAvg5AmQg6Amg8AiQg8Ahg+AfQg9Aeg/AdIhUAlIAdgMQg4Abg4AYQg6AXg9AJQhHALhHAEQhJAEhHAAIi7AAIgwAAQgwAAgwgCgEgrOAUHIACAEIgBgEIgBgDg");
	this.shape_13.setTransform(668.6366,386.6302);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(255,255,255,0.965)").s().p("EAR+Am2IgCAAIhVgGIgCAAQgsgEgrgIIgBAAQgrgIgpgLIgCAAQgqgOgogRIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIghgNIgCgBIgjgPIgCgBIghgUIgCgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSgkIgBgCIgRglIgBgCIgVgiIgBgCIgUggIgBgCIgTgiIgBgCIgRgjIgBgCIgPgdIgBgBQhlAJhkgDIgCAAQiQgCiQAAIgCAAQhsABhtgBIgCAAQhrgBhlggIgBAAIhDgWIgBgBIgUAUIgBABIgXASIgBABIgIAKIgRASIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgSAKgTAHIgCABIgVAQIgBABIgVAPIgBABIhGAgIgBABIhIAeIgBABIhCAZIgBAAQgyATg3AKIgBAAQg3AJg6ABIgCAAQg5ADg5gCIgCAAIhZAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgegEgfgGIgCAAIgZgHIgCgBIglgOIgCgBIgmgOIgCgBIgigTIgCgBQgRgJgRgLIgBgBIgmgTIgCgBQgUgKgRgLIgCgBIglgYIgBgBQgSgMgQgOIgBgBIgegcIgCgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBIgYgeIgBgCQgMgSgLgTIgBgBQgKgRgJgTIgBgBQgJgRgGgRIgBgCQgHgSgFgSIgBgCIgKgkIAAgCIgIgkIAAgCIgRgpIgBgCIgOgqIgBgCIgMgqIAAgCIgJgsIAAgCQgEgWgCgXIAAgCQgXg9gPhBIAAgCQgJglgEgmIAAgCIgOAAIgCAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgWgDIgCAAQgWgCgVgEIgCAAIgsgHIgCAAIgqgIIgCAAIhHgaIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIgBgBQh8mbAem2IAAgCQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAvASAtAbIABABQCJBSCSBBIABABIAkATIABABIAhAYIABABIAfAaIABABIAfASIABABIAgAQIABABIAfARIABABIAXAMIABABIAVAMIABABQARAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABQAPANAOAQIABABIAZAhIABABQA4BoAuBtIABABQAVAxAPA0IAAABQBCBqAoB1IAAABQAmBvgCB0IAAABQgBCXghCVIAAABQgKAtgPAtIAAABIgBAnIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAsIAAABIgLAtIAAABIgOApIAAABIgSAsIgBABIgEAVIAAABIgGAqIAAABIgMApIAAABIgQAnIgBABQgLATgKAUIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgeAUIgCABQgRAMgSALIgBABIgYALIgBABIgCAEIgBABIgQAmIgBACQgHAUgJATIgBABIgOAmIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgWAfIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhTAkIgBABIAUgIIAJgEIgBABIgIADQg0AZgyAVIgBABQg5AXg8AJIgCAAQhGALhGAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_14.setTransform(668.6366,386.6302);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(255,255,255,0.933)").s().p("EAR+Am2IgCAAIhVgGIgCAAQgsgEgrgIIgBAAQgrgIgpgLIgCAAQgqgOgogRIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIghgNIgCgBIgjgPIgCgBIghgUIgCgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSgkIgBgCIgRglIgBgCIgVgiIgBgCIgUggIgBgCIgTgiIgBgCIgRgjIgBgCIgPgdIgBgBQhlAJhkgDIgCAAQiQgCiQAAIgCAAQhsABhtgBIgCAAQhrgBhlggIgBAAIhDgWIgBgBIgUAUIgBABIgXASIgBABIgIAKIgRASIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgSAKgTAHIgCABIgVAQIgBABIgVAPIgBABIhGAgIgBABIhIAeIgBABIhCAZIgBAAQgyATg3AKIgBAAQg3AJg6ABIgCAAQg5ADg5gCIgCAAIhZAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgegEgfgGIgCAAIgZgHIgCgBIglgOIgCgBIgmgOIgCgBIgigTIgCgBQgRgJgRgLIgBgBIgmgTIgCgBQgUgKgRgLIgCgBIglgYIgBgBQgSgMgQgOIgBgBIgegcIgCgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBIgYgeIgBgCQgMgSgLgTIgBgBQgKgRgJgTIgBgBQgJgRgGgRIgBgCQgHgSgFgSIgBgCIgKgkIAAgCIgIgkIAAgCIgRgpIgBgCIgOgqIgBgCIgMgqIAAgCIgJgsIAAgCQgEgWgCgXIAAgCQgXg9gPhBIAAgCQgJglgEgmIAAgCIgOAAIgCAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgWgDIgCAAQgWgCgVgEIgCAAIgsgHIgCAAIgqgIIgCAAIhHgaIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIgBgBQh8mbAem2IAAgCQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAvASAtAbIABABQCJBSCSBBIABABIAkATIABABIAhAYIABABIAfAaIABABIAfASIABABIAgAQIABABIAfARIABABIAXAMIABABIAVAMIABABQARAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABQAPANAOAQIABABIAZAhIABABQA4BoAuBtIABABQAVAxAPA0IAAABQBCBqAoB1IAAABQAmBvgCB0IAAABQgBCXghCVIAAABQgKAtgPAtIAAABIgBAnIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAsIAAABIgLAtIAAABIgOApIAAABIgSAsIgBABIgEAVIAAABIgGAqIAAABIgMApIAAABIgQAnIgBABQgLATgKAUIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgeAUIgCABQgRAMgSALIgBABIgYALIgBABIgCAEIgBABIgQAmIgBACQgHAUgJATIgBABIgOAmIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgWAfIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhTAkIgBABIAUgIIAJgEIgBABIgIADQg0AZgyAVIgBABQg5AXg8AJIgCAAQhGALhGAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_15.setTransform(668.6366,386.6302);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(255,255,255,0.898)").s().p("EAR+Am2IgCAAIhVgGIgCAAQgsgEgrgIIgBAAQgrgIgpgLIgCAAQgqgOgogRIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIghgNIgCgBIgjgPIgCgBIghgUIgCgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSgkIgBgCIgRglIgBgCIgVgiIgBgCIgUggIgBgCIgTgiIgBgCIgRgjIgBgCIgPgdIgBgBQhlAJhkgDIgCAAQiQgCiQAAIgCAAQhsABhtgBIgCAAQhrgBhlggIgBAAIhDgWIgBgBIgUAUIgBABIgXASIgBABIgIAKIgRASIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgSAKgTAHIgCABIgVAQIgBABIgVAPIgBABIhGAgIgBABIhIAeIgBABIhCAZIgBAAQgyATg3AKIgBAAQg3AJg6ABIgCAAQg5ADg5gCIgCAAIhZAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgegEgfgGIgCAAIgZgHIgCgBIglgOIgCgBIgmgOIgCgBIgigTIgCgBQgRgJgRgLIgBgBIgmgTIgCgBQgUgKgRgLIgCgBIglgYIgBgBQgSgMgQgOIgBgBIgegcIgCgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBIgYgeIgBgCQgMgSgLgTIgBgBQgKgRgJgTIgBgBQgJgRgGgRIgBgCQgHgSgFgSIgBgCIgKgkIAAgCIgIgkIAAgCIgRgpIgBgCIgOgqIgBgCIgMgqIAAgCIgJgsIAAgCQgEgWgCgXIAAgCQgXg9gPhBIAAgCQgJglgEgmIAAgCIgOAAIgCAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgWgDIgCAAQgWgCgVgEIgCAAIgsgHIgCAAIgqgIIgCAAIhHgaIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIgBgBQh8mbAem2IAAgCQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAvASAtAbIABABQCJBSCSBBIABABIAkATIABABIAhAYIABABIAfAaIABABIAfASIABABIAgAQIABABIAfARIABABIAXAMIABABIAVAMIABABQARAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABQAPANAOAQIABABIAZAhIABABQA4BoAuBtIABABQAVAxAPA0IAAABQBCBqAoB1IAAABQAmBvgCB0IAAABQgBCXghCVIAAABQgKAtgPAtIAAABIgBAnIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAsIAAABIgLAtIAAABIgOApIAAABIgSAsIgBABIgEAVIAAABIgGAqIAAABIgMApIAAABIgQAnIgBABQgLATgKAUIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgeAUIgCABQgRAMgSALIgBABIgYALIgBABIgCAEIgBABIgQAmIgBACQgHAUgJATIgBABIgOAmIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgWAfIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhTAkIgBABIAUgIIAJgEIgBABIgIADQg0AZgyAVIgBABQg5AXg8AJIgCAAQhGALhGAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_16.setTransform(668.6366,386.6302);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(255,255,255,0.867)").s().p("EAR+Am2IgCAAIhWgGIgBAAQgsgEgrgIIgBAAQgrgIgqgLIgBAAQgqgOgogRIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIgigNIgBgBIgkgPIgBgBIgigUIgBgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSglIgBgBIgRgmIgBgBIgVgiIgBgCIgUggIgBgCIgTgjIgBgBIgRgjIgBgCIgPgdIgBgBQhlAJhlgDIgBAAQiQgCiRAAIgBAAQhsABhtgBIgCAAQhrgBhlggIgBAAIhDgWIgBgBIgUAUIgBABIgXASIgBABIgIAKIgRASIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgSAKgTAHIgCABIgVAQIgBABIgVAPIgBABIhGAgIgBABIhIAeIgBABIhCAZIgBAAQgyATg3AKIgBAAQg3AJg6ABIgCAAQg5ADg6gCIgBAAIhZAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgegEgfgGIgCAAIgagHIgBgBIgmgOIgBgBIgmgOIgCgBIgjgTIgBgBQgRgJgRgLIgBgBIgmgTIgCgBQgUgKgRgLIgCgBIglgYIgBgBQgSgMgQgOIgBgBIgegcIgCgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBIgYgfIgBgBQgMgSgLgTIgBgBQgKgRgJgTIgBgBQgJgRgGgSIgBgBQgHgSgFgTIgBgBIgKglIAAgBIgIglIAAgBIgRgqIgBgBQgIgUgGgWIgBgCIgMgrIAAgBIgJgsIAAgCQgEgWgCgYIAAgBQgXg9gPhCIAAgBQgJglgEgnIAAgBIgOAAIgCAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgBAAIgrgGIgCAAIgsgHIgCAAIgrgIIgBAAIhHgaIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIgBgBQh8mbAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAvASAtAbIABABQCJBSCSBBIACABIAjATIABABIAhAYIABABIAfAaIABABIAfASIABABQAPAIARAIIABABIAfARIABABIAXAMIABABIAVAMIACABQAQAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABQAPANAOAQIABABIAZAhIABABQA4BoAuBtIABABQAVAxAPA0IAAABQBCBqAoB1IAAABQAmBvgCB0IAAABQgBCXghCVIAAABQgKAtgPAtIAAACIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAsIAAACIgLAsIAAACIgOAoIAAABIgSAsIgBABIgEAVIAAABIgGAqIAAABQgHAUgFAVIAAABIgQAnIgBABQgLATgKAUIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgeAUIgCABQgRAMgSALIgBABIgYALIgBABIgCAEIgBABIgQAmIgBACIgQAnIgBACIgOAlIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgWAfIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhTAkIgBABIAUgIIAJgEIgBABIgIADQg0AZgyAVIgBABQg5AXg9AJIgBAAQhGALhGAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_17.setTransform(668.6366,386.6302);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(255,255,255,0.831)").s().p("EAR+Am2IgCAAIhWgGIgBAAQgsgEgrgIIgBAAQgsgIgpgLIgBAAQgqgOgogRIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIgigNIgBgBIgkgPIgBgBIgigUIgBgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSglIgBgBIgRgmIgBgBIgVgiIgBgCIgUggIgBgCIgTgjIgBgBIgRgjIgBgCIgPgdIgBgBQhlAJhlgDIgBAAQiRgCiQAAIgBAAQhtABhsgBIgCAAQhrgBhlggIgBAAIhDgWIgBgBIgUAUIgBABIgXASIgBABIgIAKIgRASIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgTAKgSAHIgCABIgVAQIgBABQgKAIgLAHIgBABIhGAgIgBABIhIAeIgBABIhCAZIgBAAQgyATg3AKIgBAAQg4AJg5ABIgCAAQg5ADg6gCIgBAAIhZAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgfgEgegGIgCAAIgagHIgBgBQgTgGgTgIIgCgBIgmgOIgBgBIgjgTIgBgBQgRgJgRgLIgBgBIgngTIgBgBQgUgKgRgLIgCgBQgTgLgSgNIgBgBQgSgMgQgOIgBgBIgfgcIgBgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBIgYgfIgBgBQgMgSgLgTIgBgBQgKgRgJgTIgBgBQgJgSgGgRIgBgBQgHgSgFgTIgBgBIgKglIAAgBIgIglIAAgBIgRgqIgBgBIgOgqIgBgCIgMgrIAAgBIgJgsIAAgCIgGguIAAgBQgXg9gPhCIAAgBQgJgmgEgmIAAgBIgPAAIgBAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgBAAQgWgCgVgEIgCAAIgsgHIgCAAIgrgIIgBAAIhHgaIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIgBgBQh8mbAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAvASAtAbIABABQCJBSCSBBIACABIAjATIABABIAhAYIABABIAfAaIACABIAeASIABABIAgAQIABABIAfARIACABIAWAMIABABIAVAMIACABQAQAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABIAdAdIABABIAZAhIABABQA4BoAuBtIABABQAVAyAPAzIAAABQBCBqAoB1IAAABQAmBvgCB0IAAABQgBCXghCVIAAABQgKAugPAsIAAACIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAsIAAACIgLAsIAAACIgOAoIAAABIgSAsIgBABIgEAVIAAABIgGAqIAAABIgMApIAAABIgQAnIgBACIgVAmIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgfAUIgBABQgRAMgSALIgBABIgYALIgBABIgCAEIgBACIgQAmIgBABIgQAnIgBACIgOAlIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBACIgWAeIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhTAkIgBABIAUgIIAJgEIgBABIgIADQg0AZgyAVIgBABQg5AXg9AJIgBAAQhHALhFAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_18.setTransform(668.6366,386.6302);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(255,255,255,0.8)").s().p("EAR+Am2IgCAAIhWgGIgBAAQgsgEgrgIIgBAAQgsgIgpgLIgBAAQgqgOgogRIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIgigNIgBgBIgkgPIgBgBIgigUIgBgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSglIgBgBIgRgmIgBgBIgVgiIgBgCIgUggIgBgCIgTgjIgBgBIgRgjIgBgCIgPgdIgBgBQhlAJhlgDIgBAAQiRgCiQAAIgBAAQhtABhsgBIgCAAQhrgBhlggIgBAAIhDgWIgBgBIgUAUIgBABIgXASIgBABIgIAKIgRASIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgTAKgSAHIgCABIgVAQIgBABQgKAIgLAHIgBABIhGAgIgBABIhIAeIgBABIhCAZIgBAAQgyATg3AKIgBAAQg4AJg5ABIgCAAQg5ADg6gCIgBAAIhZAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgfgEgegGIgCAAIgagHIgBgBQgTgGgTgIIgCgBIgmgOIgBgBIgjgTIgBgBQgRgJgRgLIgBgBIgngTIgBgBQgUgKgRgLIgCgBQgTgLgSgNIgBgBQgSgMgQgOIgBgBIgfgcIgBgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBIgYgfIgBgBQgMgSgLgTIgBgBQgKgRgJgTIgBgBQgJgSgGgRIgBgBQgHgSgFgTIgBgBIgKglIAAgBIgIglIAAgBIgRgqIgBgBIgOgqIgBgCIgMgrIAAgBIgJgsIAAgCIgGguIAAgBQgXg9gPhCIAAgBQgJgmgEgmIAAgBIgPAAIgBAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgBAAQgWgCgVgEIgCAAIgsgHIgCAAIgrgIIgBAAIhHgaIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIgBgBQh8mbAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAvASAtAbIABABQCJBSCSBBIACABIAjATIABABIAhAYIABABIAfAaIACABIAeASIABABIAgAQIABABIAfARIACABIAWAMIABABIAVAMIACABQAQAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABIAdAdIABABIAZAhIABABQA4BoAuBtIABABQAVAyAPAzIAAABQBCBqAoB1IAAABQAmBvgCB0IAAABQgBCXghCVIAAABQgKAugPAsIAAACIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAsIAAACIgLAsIAAACIgOAoIAAABIgSAsIgBABIgEAVIAAABIgGAqIAAABIgMApIAAABIgQAnIgBACIgVAmIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgfAUIgBABQgRAMgSALIgBABIgYALIgBABIgCAEIgBACIgQAmIgBABIgQAnIgBACIgOAlIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBACIgWAeIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhTAkIgBABIAUgIIAJgEIgBABIgIADQg0AZgyAVIgBABQg5AXg9AJIgBAAQhHALhFAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_19.setTransform(668.6366,386.6302);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(255,255,255,0.765)").s().p("EAR+Am2IgCAAIhWgGIgBAAQgsgEgrgIIgBAAQgsgIgpgLIgBAAQgqgOgogRIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIgigNIgBgBIgkgPIgBgBIgigUIgBgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSglIgBgBIgRgmIgBgBIgVgiIgBgCIgUggIgBgCIgTgjIgBgBIgRgjIgBgCIgPgdIgBgBQhlAJhlgDIgBAAQiRgCiQAAIgBAAQhtABhsgBIgCAAQhrgBhlggIgBAAIhDgWIgBgBIgUAUIgBABIgXASIgBABIgIAKIgRASIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgTAKgSAHIgCABIgVAQIgBABQgKAIgLAHIgBABIhGAgIgBABIhIAeIgBABIhCAZIgBAAQgyATg3AKIgBAAQg4AJg5ABIgCAAQg5ADg6gCIgBAAIhZAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgfgEgegGIgCAAIgagHIgBgBQgTgGgTgIIgCgBIgmgOIgBgBIgjgTIgBgBQgRgJgRgLIgBgBIgngTIgBgBQgUgKgRgLIgCgBQgTgLgSgNIgBgBQgSgMgQgOIgBgBIgfgcIgBgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBIgYgfIgBgBQgMgSgLgTIgBgBQgKgRgJgTIgBgBQgJgSgGgRIgBgBQgHgSgFgTIgBgBIgKglIAAgBIgIglIAAgBIgRgqIgBgBIgOgqIgBgCIgMgrIAAgBIgJgsIAAgCIgGguIAAgBQgXg9gPhCIAAgBQgJgmgEgmIAAgBIgPAAIgBAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgBAAQgWgCgVgEIgCAAIgsgHIgCAAIgrgIIgBAAIhHgaIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIgBgBQh8mbAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAvASAtAbIABABQCJBSCSBBIACABIAjATIABABIAhAYIABABIAfAaIACABIAeASIABABIAgAQIABABIAfARIACABIAWAMIABABIAVAMIACABQAQAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABIAdAdIABABIAZAhIABABQA4BoAuBtIABABQAVAyAPAzIAAABQBCBqAoB1IAAABQAmBvgCB0IAAABQgBCXghCVIAAABQgKAugPAsIAAACIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAsIAAACIgLAsIAAACIgOAoIAAABIgSAsIgBABIgEAVIAAABIgGAqIAAABIgMApIAAABIgQAnIgBACIgVAmIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgfAUIgBABQgRAMgSALIgBABIgYALIgBABIgCAEIgBACIgQAmIgBABIgQAnIgBACIgOAlIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBACIgWAeIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhTAkIgBABIAUgIIAJgEIgBABIgIADQg0AZgyAVIgBABQg5AXg9AJIgBAAQhHALhFAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_20.setTransform(668.6366,386.6302);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(255,255,255,0.733)").s().p("EAR+Am2IgCAAIhWgGIgCAAQgrgEgrgIIgBAAQgsgIgpgLIgCAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIghgOIgCgBIgjgOIgCgBIghgUIgCgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgPIgBgCIgXgcIgBgCQgLgOgKgPIgBgBIgRgkIgBgCIgSglIgBgCIgVghIgBgCIgUggIgBgCIgSgjIgBgCIgSgiIgBgCIgOgeIgBAAQhlAJhlgDIgCAAQiQgCiQAAIgCAAQhsABhsgBIgCAAQhrgBhmggIgBAAQghgKgigNIgBAAIgUAUIgBABIgWATIgBABIgIAJIgRASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgSAIIgCABIgWAQIgBABIgUAOIgCABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzATg2AKIgBAAQg4AJg5ABIgCAAQg5ADg6gCIgCAAIhYAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgfgEgegGIgCAAIgagIIgCAAIglgOIgCgBQgTgGgTgJIgBgBIgjgTIgCgBQgQgIgSgLIgBgBIgmgTIgBgBQgUgKgRgLIgCgBIglgYIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBIgYgfIgBgCQgNgSgLgTIgBgBQgKgQgJgTIgBgBIgOgjIgBgCQgHgRgFgTIgBgCIgKgkIAAgCIgIgkIAAgCIgSgpIAAgCIgOgpIgBgCIgMgrIAAgCIgJgrIAAgCQgEgXgCgXIgBgCQgWg9gPhBIAAgCQgJglgEgmIgBgBIgOAAIgBAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgCAAQgVgCgVgEIgCAAIgsgHIgCAAIgrgIIgCAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8maAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAwATAtAbIABABQCJBSCSBBIABABIAjASIABABIAhAYIABABIAgAbIABABIAeARIABABIAgAQIABABIAgARIABABIAWAMIABABIAWANIABABQAQAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABQAPAOAOAPIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAABQAmBvgCB0IAAABQgBCYghCUIAAABQgKAugPAtIAAABIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAtIAAABIgLAtIAAABIgOApIgBABIgRArIgBABIgEAVIAAABIgGAqIAAABIgMApIAAABIgQAoIgBABQgMATgKATIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIAAABIgCAEIgBABIgQAmIgBABIgQAoIgBABIgPAmIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg8AJIgCAAQhGALhFAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_21.setTransform(668.6366,386.6302);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(255,255,255,0.698)").s().p("EAR+Am2IgCAAIhWgGIgCAAQgrgEgrgIIgBAAQgsgIgpgLIgCAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIghgOIgCgBIgjgOIgCgBIghgUIgCgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgPIgBgCIgXgcIgBgCQgLgOgKgPIgBgBIgRgkIgBgCIgSglIgBgCIgVghIgBgCIgUggIgBgCIgSgjIgBgCIgSgiIgBgCIgOgeIgBAAQhlAJhlgDIgCAAQiQgCiQAAIgCAAQhsABhsgBIgCAAQhrgBhmggIgBAAQghgKgigNIgBAAIgUAUIgBABIgWATIgBABIgIAJIgRASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgSAIIgCABIgWAQIgBABIgUAOIgCABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzATg2AKIgBAAQg4AJg5ABIgCAAQg5ADg6gCIgCAAIhYAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgfgEgegGIgCAAIgagIIgCAAIglgOIgCgBQgTgGgTgJIgBgBIgjgTIgCgBQgQgIgSgLIgBgBIgmgTIgBgBQgUgKgRgLIgCgBIglgYIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBIgYgfIgBgCQgNgSgLgTIgBgBQgKgQgJgTIgBgBIgOgjIgBgCQgHgRgFgTIgBgCIgKgkIAAgCIgIgkIAAgCIgSgpIAAgCIgOgpIgBgCIgMgrIAAgCIgJgrIAAgCQgEgXgCgXIgBgCQgWg9gPhBIAAgCQgJglgEgmIgBgBIgOAAIgBAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgCAAQgVgCgVgEIgCAAIgsgHIgCAAIgrgIIgCAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8maAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAwATAtAbIABABQCJBSCSBBIABABIAjASIABABIAhAYIABABIAgAbIABABIAeARIABABIAgAQIABABIAgARIABABIAWAMIABABIAWANIABABQAQAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABQAPAOAOAPIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAABQAmBvgCB0IAAABQgBCYghCUIAAABQgKAugPAtIAAABIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAtIAAABIgLAtIAAABIgOApIgBABIgRArIgBABIgEAVIAAABIgGAqIAAABIgMApIAAABIgQAoIgBABQgMATgKATIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIAAABIgCAEIgBABIgQAmIgBABIgQAoIgBABIgPAmIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg8AJIgCAAQhGALhFAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_22.setTransform(668.6366,386.6302);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(255,255,255,0.667)").s().p("EAR+Am2IgCAAIhWgGIgCAAQgrgEgrgIIgBAAQgsgIgpgLIgCAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIghgOIgCgBIgjgOIgCgBIghgUIgCgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgPIgBgCIgXgcIgBgCQgLgOgKgPIgBgBIgRgkIgBgCIgSglIgBgCIgVghIgBgCIgUggIgBgCIgSgjIgBgCIgSgiIgBgCIgOgeIgBAAQhlAJhlgDIgCAAQiQgCiQAAIgCAAQhsABhsgBIgCAAQhrgBhmggIgBAAQghgKgigNIgBAAIgUAUIgBABIgWATIgBABIgIAJIgRASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgSAIIgCABIgWAQIgBABIgUAOIgCABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzATg2AKIgBAAQg4AJg5ABIgCAAQg5ADg6gCIgCAAIhYAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgfgEgegGIgCAAIgagIIgCAAIglgOIgCgBQgTgGgTgJIgBgBIgjgTIgCgBQgQgIgSgLIgBgBIgmgTIgBgBQgUgKgRgLIgCgBIglgYIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBIgYgfIgBgCQgNgSgLgTIgBgBQgKgQgJgTIgBgBIgOgjIgBgCQgHgRgFgTIgBgCIgKgkIAAgCIgIgkIAAgCIgSgpIAAgCIgOgpIgBgCIgMgrIAAgCIgJgrIAAgCQgEgXgCgXIgBgCQgWg9gPhBIAAgCQgJglgEgmIgBgBIgOAAIgBAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgCAAQgVgCgVgEIgCAAIgsgHIgCAAIgrgIIgCAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8maAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAwATAtAbIABABQCJBSCSBBIABABIAjASIABABIAhAYIABABIAgAbIABABIAeARIABABIAgAQIABABIAgARIABABIAWAMIABABIAWANIABABQAQAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABQAPAOAOAPIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAABQAmBvgCB0IAAABQgBCYghCUIAAABQgKAugPAtIAAABIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAtIAAABIgLAtIAAABIgOApIgBABIgRArIgBABIgEAVIAAABIgGAqIAAABIgMApIAAABIgQAoIgBABQgMATgKATIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIAAABIgCAEIgBABIgQAmIgBABIgQAoIgBABIgPAmIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg8AJIgCAAQhGALhFAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_23.setTransform(668.6366,386.6302);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(255,255,255,0.631)").s().p("EAR+Am2IgCAAIhWgGIgCAAQgrgEgrgIIgBAAQgsgIgpgLIgCAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIghgOIgCgBIgjgOIgCgBIghgUIgCgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgPIgBgCIgXgcIgBgCQgLgOgKgPIgBgBIgRgkIgBgCIgSglIgBgCIgVghIgBgCIgUggIgBgCIgSgjIgBgCIgSgiIgBgCIgOgeIgBAAQhlAJhlgDIgCAAQiQgCiQAAIgCAAQhsABhsgBIgCAAQhrgBhmggIgBAAQghgKgigNIgBAAIgUAUIgBABIgWATIgBABIgIAJIgRASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgSAIIgCABIgWAQIgBABIgUAOIgCABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzATg2AKIgBAAQg4AJg5ABIgCAAQg5ADg6gCIgCAAIhYAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgfgEgegGIgCAAIgagIIgCAAIglgOIgCgBQgTgGgTgJIgBgBIgjgTIgCgBQgQgIgSgLIgBgBIgmgTIgBgBQgUgKgRgLIgCgBIglgYIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBIgYgfIgBgCQgNgSgLgTIgBgBQgKgQgJgTIgBgBIgOgjIgBgCQgHgRgFgTIgBgCIgKgkIAAgCIgIgkIAAgCIgSgpIAAgCIgOgpIgBgCIgMgrIAAgCIgJgrIAAgCQgEgXgCgXIgBgCQgWg9gPhBIAAgCQgJglgEgmIgBgBIgOAAIgBAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgCAAQgVgCgVgEIgCAAIgsgHIgCAAIgrgIIgCAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8maAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAwATAtAbIABABQCJBSCSBBIABABIAjASIABABIAhAYIABABIAgAbIABABIAeARIABABIAgAQIABABIAgARIABABIAWAMIABABIAWANIABABQAQAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABQAPAOAOAPIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAABQAmBvgCB0IAAABQgBCYghCUIAAABQgKAugPAtIAAABIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAtIAAABIgLAtIAAABIgOApIgBABIgRArIgBABIgEAVIAAABIgGAqIAAABIgMApIAAABIgQAoIgBABQgMATgKATIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIAAABIgCAEIgBABIgQAmIgBABIgQAoIgBABIgPAmIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg8AJIgCAAQhGALhFAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_24.setTransform(668.6366,386.6302);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(255,255,255,0.6)").s().p("EAR9Am2IgBAAIhWgGIgCAAQgrgEgrgIIgBAAQgsgIgpgLIgCAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIghgOIgCgBIgjgOIgCgBIghgUIgCgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgPIgBgCIgXgcIgBgCQgLgOgKgPIgBgBIgRgkIgBgCIgSglIgBgCIgVgiIgBgBIgUghIgBgBIgSgjIgBgCIgSgjIgBgBIgOgeIgBAAQhlAJhlgDIgCAAQiQgCiQAAIgCAAQhsABhtgBIgBAAQhrgBhmggIgBAAQghgKgigNIgBAAIgUAUIgBABIgWATIgBABIgIAJIgRASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgTAIIgBABIgWAQIgBABIgUAOIgCABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzATg2AKIgBAAQg4AJg6ABIgBAAQg5ADg6gCIgCAAIhZAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgmgDgmgFIgBAAQgfgEgfgGIgBAAIgagIIgCAAIglgOIgCgBQgTgGgTgJIgBgBIgjgTIgCgBQgQgIgSgLIgBgBIgmgTIgBgBQgUgKgSgLIgBgBIglgYIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBIgYgfIgBgCQgNgSgLgTIgBgBQgKgQgJgTIgBgBIgOgjIgBgCQgHgRgFgTIgBgCIgKgkIAAgCIgIgkIAAgCIgSgpIAAgCQgIgUgGgWIgBgBIgMgrIAAgCIgJgsIAAgBQgEgXgCgXIgBgCQgWg9gPhBIAAgCQgJglgEgmIgBgBIgOAAIgBAAQgXAAgWgCIgBAAIgtgEIgBAAQgVgBgXgDIgCAAIgrgGIgBAAIgtgHIgBAAIgrgIIgCAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8maAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAwATAtAbIABABQCJBSCSBBIABABIAjASIABABIAhAYIABABIAgAbIABABIAeARIACABQAPAJAQAHIABABIAgARIABABIAWAMIABABIAWANIABABQAQAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABQAPAOAOAPIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAABQAmBvgCB0IAAABQgBCYghCUIAAACQgKAtgPAtIAAABIgBAnIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJAsIAAABIgLAtIAAABIgOApIgBABIgRArIgBACIgEAUIAAACIgGApIAAACQgHAUgFAUIAAABIgQAoIgBABQgMATgKATIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIAAABIgCAEIgBABIgQAmIgBACIgQAnIgBABIgPAmIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg8AJIgCAAQhGALhGAEIgBAAQhIAEhHAAIgBAAIi6AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_25.setTransform(668.6366,386.6302);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(255,255,255,0.565)").s().p("EAR9Am2IgBAAIhWgGIgCAAQgrgEgrgIIgBAAQgsgIgpgLIgCAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIghgOIgCgBIgjgOIgCgBIghgUIgCgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgPIgBgCIgXgcIgBgCQgLgOgKgPIgBgBIgRgkIgBgCIgSglIgBgCIgVgiIgBgBIgUghIgBgBIgSgjIgBgCIgSgjIgBgBIgOgeIgBAAQhlAJhlgDIgCAAQiQgCiQAAIgCAAQhsABhtgBIgBAAQhrgBhmggIgBAAQghgKgigNIgBAAIgUAUIgBABIgWATIgBABIgIAJIgRASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgTAIIgBABIgWAQIgBABIgUAOIgCABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzATg2AKIgBAAQg4AJg6ABIgBAAQg5ADg6gCIgCAAIhZAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgmgDgmgFIgBAAQgfgEgfgGIgBAAIgagIIgCAAIglgOIgCgBQgTgGgTgJIgBgBIgjgTIgCgBQgQgIgSgLIgBgBIgmgTIgBgBQgUgKgSgLIgBgBIglgYIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBIgYgfIgBgCQgNgSgLgTIgBgBQgKgQgJgTIgBgBIgOgjIgBgCQgHgRgFgTIgBgCIgKgkIAAgCIgIgkIAAgCIgSgpIAAgCQgIgUgGgWIgBgBIgMgrIAAgCIgJgsIAAgBQgEgXgCgXIgBgCQgWg9gPhBIAAgCQgJglgEgmIgBgBIgOAAIgBAAQgXAAgWgCIgBAAIgtgEIgBAAQgVgBgXgDIgCAAIgrgGIgBAAIgtgHIgBAAIgrgIIgCAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8maAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAwATAtAbIABABQCJBSCSBBIABABIAjASIABABIAhAYIABABIAgAbIABABIAeARIACABQAPAJAQAHIABABIAgARIABABIAWAMIABABIAWANIABABQAQAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABQAPAOAOAPIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAABQAmBvgCB0IAAABQgBCYghCUIAAACQgKAtgPAtIAAABIgBAnIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJAsIAAABIgLAtIAAABIgOApIgBABIgRArIgBACIgEAUIAAACIgGApIAAACQgHAUgFAUIAAABIgQAoIgBABQgMATgKATIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIAAABIgCAEIgBABIgQAmIgBACIgQAnIgBABIgPAmIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg8AJIgCAAQhGALhGAEIgBAAQhIAEhHAAIgBAAIi6AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_26.setTransform(668.6366,386.6302);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(255,255,255,0.533)").s().p("EAR9Am2IgBAAIhWgGIgCAAQgrgEgrgIIgBAAQgsgIgpgLIgCAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIghgOIgCgBIgjgOIgCgBIghgUIgCgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgPIgBgCIgXgcIgBgCQgLgOgKgPIgBgBIgRgkIgBgCIgSglIgBgCIgVgiIgBgBIgUghIgBgBIgSgjIgBgCIgSgjIgBgBIgOgeIgBAAQhlAJhlgDIgCAAQiQgCiQAAIgCAAQhsABhtgBIgBAAQhrgBhmggIgBAAQghgKgigNIgBAAIgUAUIgBABIgWATIgBABIgIAJIgRASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgTAIIgBABIgWAQIgBABIgUAOIgCABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzATg2AKIgBAAQg4AJg6ABIgBAAQg5ADg6gCIgCAAIhZAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgmgDgmgFIgBAAQgfgEgfgGIgBAAIgagIIgCAAIglgOIgCgBQgTgGgTgJIgBgBIgjgTIgCgBQgQgIgSgLIgBgBIgmgTIgBgBQgUgKgSgLIgBgBIglgYIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBIgYgfIgBgCQgNgSgLgTIgBgBQgKgQgJgTIgBgBIgOgjIgBgCQgHgRgFgTIgBgCIgKgkIAAgCIgIgkIAAgCIgSgpIAAgCQgIgUgGgWIgBgBIgMgrIAAgCIgJgsIAAgBQgEgXgCgXIgBgCQgWg9gPhBIAAgCQgJglgEgmIgBgBIgOAAIgBAAQgXAAgWgCIgBAAIgtgEIgBAAQgVgBgXgDIgCAAIgrgGIgBAAIgtgHIgBAAIgrgIIgCAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8maAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCCgDB0AuQAwATAtAbIABABQCJBSCSBBIABABIAjASIABABIAhAYIABABIAgAbIABABIAeARIACABQAPAJAQAHIABABIAgARIABABIAWAMIABABIAWANIABABQAQAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABQAPAOAOAPIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAABQAmBvgCB0IAAABQgBCYghCUIAAACQgKAtgPAtIAAABIgBAnIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJAsIAAABIgLAtIAAABIgOApIgBABIgRArIgBACIgEAUIAAACIgGApIAAACQgHAUgFAUIAAABIgQAoIgBABQgMATgKATIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIAAABIgCAEIgBABIgQAmIgBACIgQAnIgBABIgPAmIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg8AJIgCAAQhGALhGAEIgBAAQhIAEhHAAIgBAAIi6AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_27.setTransform(668.6366,386.6302);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(255,255,255,0.502)").s().p("EAR9Am2IgBAAIhWgGIgCAAQgrgEgrgIIgBAAQgsgIgpgLIgCAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIghgOIgCgBIgjgOIgCgBIghgUIgCgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgPIgBgCIgXgcIgBgCQgLgOgKgPIgBgBIgRgkIgBgCIgSglIgBgCIgVgiIgBgBIgUghIgBgBIgSgjIgBgCIgSgjIgBgBIgOgeIgBAAQhlAJhlgDIgCAAQiQgCiQAAIgCAAQhsABhtgBIgBAAQhrgBhmggIgBAAQghgKgigNIgBAAIgUAUIgBABIgWATIgBABIgHAJIgSASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgTAIIgBABIgWAQIgBABIgUAOIgCABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzAUg2AJIgBAAQg4AJg6ABIgBAAQg5ADg6gCIgCAAIhZAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgmgDgmgFIgBAAQgfgEgfgGIgBAAIgagIIgCAAIglgOIgCgBQgTgGgTgJIgBgBIgjgTIgCgBQgQgIgSgLIgBgBIgmgTIgBgBQgUgKgSgLIgBgBIglgYIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBIgYgfIgBgCQgNgSgLgTIgBgBQgKgQgJgTIgBgBIgOgjIgBgCQgHgRgFgTIgBgCIgKgkIAAgCIgIgkIAAgCIgSgpIAAgCQgIgUgGgWIgBgBIgMgrIAAgCIgJgsIAAgBQgEgXgCgXIgBgCQgWg9gPhBIAAgCQgJglgEgmIgBgBIgOAAIgBAAQgXAAgWgCIgBAAIgtgEIgBAAQgVgBgXgDIgCAAIgrgGIgBAAIgtgHIgBAAIgrgIIgCAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8maAem3IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIABABIAjASIABABIAhAYIACABIAfAbIABABIAeARIACABIAfAQIACABIAfARIABABIAWAMIACABIAVANIABABQAQAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABIAdAdIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAACQAmBvgCBzIAAABQgBCYghCUIAAACQgKAtgPAtIAAABIgBAnIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJAsIAAABIgLAtIAAABIgOApIgBABIgRArIgBACIgEAUIAAACIgGApIAAACIgMAoIAAABIgQAoIgBABIgWAmIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIAAABIgCAEIgBABIgQAmIgBACIgQAnIgBABIgPAmIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg8AJIgCAAQhGALhGAEIgBAAQhIAEhHAAIgBAAIi6AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_28.setTransform(668.6366,386.6302);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(255,255,255,0.467)").s().p("EAR9Am2IgBAAIhWgGIgCAAQgsgEgqgIIgBAAQgsgIgpgLIgCAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIghgOIgCgBIgjgOIgCgBIghgUIgCgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgQIgBgBIgXgdIgBgBQgLgOgKgPIgBgBIgRgkIgBgCIgSglIgBgCIgVgiIgBgBIgUghIgBgBIgSgjIgBgCIgSgjIgBgBIgOgeIgBAAQhmAJhkgDIgCAAQiQgCiQAAIgCAAQhsABhtgBIgBAAQhrgBhmggIgBAAIhDgXIgBAAIgUAUIgBABIgWATIgBABIgHAJIgSASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgTAIIgBABIgWAQIgBABQgJAHgMAHIgBABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzAUg2AJIgBAAQg4AJg6ABIgBAAQg6ADg5gCIgCAAIhZAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgngDglgFIgBAAQgfgEgfgGIgBAAIgagIIgCgBQgTgGgSgHIgCgBIgmgPIgBgBIgjgTIgCgBQgQgIgSgLIgBgBIgmgTIgBgBQgVgKgRgLIgBgBQgUgMgRgMIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBIgYgfIgBgCQgNgSgLgTIgBgBQgKgQgJgTIgBgBQgIgSgGgRIgBgCQgIgSgFgSIAAgCIgKgkIAAgCIgIgkIAAgCIgSgpIAAgCQgIgUgHgWIAAgBIgMgrIAAgCIgJgsIAAgBIgGguIgBgCQgXg9gOhBIAAgCQgJglgEgmIgBgBIgOAAIgBAAQgYAAgVgCIgBAAIgtgEIgBAAQgWgBgWgDIgCAAQgWgCgVgEIgBAAIgtgHIgBAAIgrgIIgCAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8mbAem2IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIABABIAjASIABABIAhAYIACABIAfAbIABABIAeARIACABIAfAQIACABIAfARIABABIAWAMIACABIAVANIABABQAQAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABIAdAdIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAACQAmBvgCBzIAAABQgBCYghCUIAAACQgKAtgPAtIAAABIgBAnIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJAsIAAABIgLAtIAAABIgOApIgBABIgRArIgBACIgEAUIAAACIgGApIAAACIgMAoIAAABIgRAoIAAABIgWAmIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIgBABIgBAEIgBABIgQAmIgBACIgQAnIgBABIgPAmIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg8AJIgCAAQhGALhGAEIgBAAQhJAEhGAAIgBAAIi6AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_29.setTransform(668.6366,386.6302);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(255,255,255,0.435)").s().p("EAR9Am2IgBAAIhWgGIgCAAQgsgEgqgIIgBAAQgsgIgpgLIgCAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIghgOIgCgBIgjgOIgCgBIghgUIgCgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgQIgBgBIgXgdIgBgBQgLgOgKgPIgBgBIgRgkIgBgCIgSglIgBgCIgVgiIgBgBIgUghIgBgBIgSgjIgBgCIgSgjIgBgBIgOgeIgBAAQhmAJhkgDIgCAAQiQgCiQAAIgCAAQhsABhtgBIgBAAQhrgBhmggIgBAAIhDgXIgBAAIgUAUIgBABIgWATIgBABIgHAJIgSASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgTAIIgBABIgWAQIgBABQgJAHgMAHIgBABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzAUg2AJIgBAAQg4AJg6ABIgBAAQg6ADg5gCIgCAAIhZAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgngDglgFIgBAAQgfgEgfgGIgBAAIgagIIgCgBQgTgGgSgHIgCgBIgmgPIgBgBIgjgTIgCgBQgQgIgSgLIgBgBIgmgTIgBgBQgVgKgRgLIgBgBQgUgMgRgMIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBIgYgfIgBgCQgNgSgLgTIgBgBQgKgQgJgTIgBgBQgIgSgGgRIgBgCQgIgSgFgSIAAgCIgKgkIAAgCIgIgkIAAgCIgSgpIAAgCQgIgUgHgWIAAgBIgMgrIAAgCIgJgsIAAgBIgGguIgBgCQgXg9gOhBIAAgCQgJglgEgmIgBgBIgOAAIgBAAQgYAAgVgCIgBAAIgtgEIgBAAQgWgBgWgDIgCAAQgWgCgVgEIgBAAIgtgHIgBAAIgrgIIgCAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8mbAem2IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIABABIAjASIABABIAhAYIACABIAfAbIABABIAeARIACABIAfAQIACABIAfARIABABIAWAMIACABIAVANIABABQAQAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABIAdAdIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAACQAmBvgCBzIAAABQgBCYghCUIAAACQgKAtgPAtIAAABIgBAnIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJAsIAAABIgLAtIAAABIgOApIgBABIgRArIgBACIgEAUIAAACIgGApIAAACIgMAoIAAABIgRAoIAAABIgWAmIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIgBABIgBAEIgBABIgQAmIgBACIgQAnIgBABIgPAmIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg8AJIgCAAQhGALhGAEIgBAAQhJAEhGAAIgBAAIi6AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_30.setTransform(668.6366,386.6302);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(255,255,255,0.4)").s().p("EAR9Am2IgBAAIhWgGIgCAAQgsgEgqgIIgBAAQgsgIgpgLIgCAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIghgOIgCgBIgjgOIgCgBIghgUIgCgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgQIgBgBIgXgdIgBgBQgLgOgKgPIgBgBIgRgkIgBgCIgSglIgBgCIgVgiIgBgBIgUghIgBgBIgSgjIgBgCIgSgjIgBgBIgOgeIgBAAQhmAJhkgDIgCAAQiQgCiQAAIgCAAQhsABhtgBIgBAAQhrgBhmggIgBAAIhDgXIgBAAIgUAUIgBABIgWATIgBABIgHAJIgSASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgTAIIgBABIgWAQIgBABQgJAHgMAHIgBABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzAUg2AJIgBAAQg4AJg6ABIgBAAQg6ADg5gCIgCAAIhZAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgngDglgFIgBAAQgfgEgfgGIgBAAIgagIIgCgBQgTgGgSgHIgCgBIgmgPIgBgBIgjgTIgCgBQgQgIgSgLIgBgBIgmgTIgBgBQgVgKgRgLIgBgBQgUgMgRgMIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBIgYgfIgBgCQgNgSgLgTIgBgBQgKgQgJgTIgBgBQgIgSgGgRIgBgCQgIgSgFgSIAAgCIgKgkIAAgCIgIgkIAAgCIgSgpIAAgCQgIgUgHgWIAAgBIgMgrIAAgCIgJgsIAAgBIgGguIgBgCQgXg9gOhBIAAgCQgJglgEgmIgBgBIgOAAIgBAAQgYAAgVgCIgBAAIgtgEIgBAAQgWgBgWgDIgCAAQgWgCgVgEIgBAAIgtgHIgBAAIgrgIIgCAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8mbAem2IAAgBQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIABABIAjASIABABIAhAYIACABIAfAbIABABIAeARIACABIAfAQIACABIAfARIABABIAWAMIACABIAVANIABABQAQAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABIAdAdIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAACQAmBvgCBzIAAABQgBCYghCUIAAACQgKAtgPAtIAAABIgBAnIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJAsIAAABIgLAtIAAABIgOApIgBABIgRArIgBACIgEAUIAAACIgGApIAAACIgMAoIAAABIgRAoIAAABIgWAmIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIgBABIgBAEIgBABIgQAmIgBACIgQAnIgBABIgPAmIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg8AJIgCAAQhGALhGAEIgBAAQhJAEhGAAIgBAAIi6AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_31.setTransform(668.6366,386.6302);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(255,255,255,0.369)").s().p("EAR9Am2IgBAAIhXgGIgBAAQgsgEgqgIIgBAAQgsgIgqgLIgBAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIgigOIgBgBIgkgOIgBgBIgigUIgBgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgQIgBgBIgXgdIgBgBQgLgOgKgPIgBgBIgRglIgBgBIgSgmIgBgBIgVgiIgBgBIgUghIgBgBIgSgkIgBgBIgSgjIgBgBIgOgeIgBAAQhmAJhlgDIgBAAQiQgCiRAAIgBAAQhsABhtgBIgBAAQhrgBhmggIgBAAIhDgXIgBAAIgUAUIgBABIgWATIgBABIgHAJIgSASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgTAIIgBABIgWAQIgBABQgJAHgMAHIgBABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzAUg2AJIgBAAQg4AJg6ABIgBAAQg6ADg6gCIgBAAIhZAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgngDglgFIgBAAQgfgEgfgGIgBAAIgbgIIgBgBIgmgNIgBgBIgmgPIgBgBIgkgTIgBgBQgQgIgSgLIgBgBIgmgTIgBgBQgVgKgRgLIgBgBQgUgMgRgMIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBQgNgPgLgRIgBgBQgNgSgLgTIgBgBQgKgQgJgTIgBgBQgIgSgGgSIgBgBQgIgSgFgTIAAgBIgKglIAAgBIgIglIAAgBIgSgqIAAgBQgIgUgHgWIAAgBIgMgsIAAgBIgJgsIAAgBQgEgXgCgYIgBgBQgXg9gOhCIAAgBQgJglgEgnIgBAAIgOAAIgBAAQgYAAgVgCIgBAAIgtgEIgBAAQgWgBgXgDIgBAAQgWgCgVgEIgBAAIgtgHIgBAAIgsgIIgBAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8mbAem3IAAAAQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIACABIAiASIABABIAhAYIACABIAfAbIABABIAeARIACABIAfAQIACABIAfARIABABIAWAMIACABIAVANIACABQAPAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABIAdAdIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAACQAmBvgCBzIAAABQgBCYghCUIAAACQgKAtgPAtIAAACIgBAmIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJAsIAAACIgLAsIAAACIgOAoIgBABIgRArIgBACIgEAUIAAACIgGApIAAACIgMAoIAAABIgRAoIAAABIgWAmIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIgBABIgBAEIgBABIgQAmIgBACIgQAnIgBACIgPAlIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg9AJIgBAAQhGALhGAEIgBAAQhJAEhGAAIgBAAIi6AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_32.setTransform(668.6366,386.6302);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(255,255,255,0.333)").s().p("EAR9Am2IgBAAIhXgGIgBAAQgsgEgqgIIgBAAQgsgIgqgLIgBAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIgigOIgBgBIgkgOIgBgBIgigUIgBgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgQIgBgBIgXgdIgBgBQgLgOgKgPIgBgBIgRglIgBgBIgSgmIgBgBIgVgiIgBgBIgUghIgBgBIgSgkIgBgBIgSgjIgBgBIgOgeIgBAAQhmAJhlgDIgBAAQiQgCiRAAIgBAAQhsABhtgBIgBAAQhrgBhmggIgBAAIhDgXIgBAAIgUAUIgBABIgWATIgBABIgHAJIgSASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgTAIIgBABIgWAQIgBABQgJAHgMAHIgBABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzAUg2AJIgBAAQg4AJg6ABIgBAAQg6ADg6gCIgBAAIhZAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgngDglgFIgBAAQgfgEgfgGIgBAAIgbgIIgBgBIgmgNIgBgBIgmgPIgBgBIgkgTIgBgBQgQgIgSgLIgBgBIgmgTIgBgBQgVgKgRgLIgBgBQgUgMgRgMIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBQgNgPgLgRIgBgBQgNgSgLgTIgBgBQgKgQgJgTIgBgBQgIgSgGgSIgBgBQgIgSgFgTIAAgBIgKglIAAgBIgIglIAAgBIgSgqIAAgBQgIgUgHgWIAAgBIgMgsIAAgBIgJgsIAAgBQgEgXgCgYIgBgBQgXg9gOhCIAAgBQgJglgEgnIgBAAIgOAAIgBAAQgYAAgVgCIgBAAIgtgEIgBAAQgWgBgXgDIgBAAQgWgCgVgEIgBAAIgtgHIgBAAIgsgIIgBAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8mbAem3IAAAAQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIACABIAiASIABABIAhAYIACABIAfAbIABABIAeARIACABIAfAQIACABIAfARIABABIAWAMIACABIAVANIACABQAPAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABIAdAdIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAACQAmBvgCBzIAAABQgBCYghCUIAAACQgKAtgPAtIAAACIgBAmIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJAsIAAACIgLAsIAAACIgOAoIgBABIgRArIgBACIgEAUIAAACIgGApIAAACIgMAoIAAABIgRAoIAAABIgWAmIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIgBABIgBAEIgBABIgQAmIgBACIgQAnIgBACIgPAlIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg9AJIgBAAQhGALhGAEIgBAAQhJAEhGAAIgBAAIi6AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_33.setTransform(668.6366,386.6302);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("rgba(255,255,255,0.302)").s().p("EAR9Am2IgBAAIhXgGIgBAAQgsgEgqgIIgBAAQgsgIgqgLIgBAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIgigOIgBgBIgkgOIgBgBIgigUIgBgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgQIgBgBIgXgdIgBgBQgLgOgKgPIgBgBIgRglIgBgBIgSgmIgBgBIgVgiIgBgBIgUghIgBgBIgSgkIgBgBIgSgjIgBgBIgOgeIgBAAQhmAJhlgDIgBAAQiQgCiRAAIgBAAQhsABhtgBIgBAAQhrgBhmggIgBAAIhDgXIgBAAIgUAUIgBABIgWATIgBABIgHAJIgSASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgTAIIgBABIgWAQIgBABQgJAHgMAHIgBABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzAUg2AJIgBAAQg4AJg6ABIgBAAQg6ADg6gCIgBAAIhZAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgngDglgFIgBAAQgfgEgfgGIgBAAIgbgIIgBgBIgmgNIgBgBIgmgPIgBgBIgkgTIgBgBQgQgIgSgLIgBgBIgmgTIgBgBQgVgKgRgLIgBgBQgUgMgRgMIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBQgNgPgLgRIgBgBQgNgSgLgTIgBgBQgKgQgJgTIgBgBQgIgSgGgSIgBgBQgIgSgFgTIAAgBIgKglIAAgBIgIglIAAgBIgSgqIAAgBQgIgUgHgWIAAgBIgMgsIAAgBIgJgsIAAgBQgEgXgCgYIgBgBQgXg9gOhCIAAgBQgJglgEgnIgBAAIgOAAIgBAAQgYAAgVgCIgBAAIgtgEIgBAAQgWgBgXgDIgBAAQgWgCgVgEIgBAAIgtgHIgBAAIgsgIIgBAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8mbAem3IAAAAQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIACABIAiASIABABIAhAYIACABIAfAbIABABIAeARIACABIAfAQIACABIAfARIABABIAWAMIACABIAVANIACABQAPAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABIAdAdIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAACQAmBvgCBzIAAABQgBCYghCUIAAACQgKAtgPAtIAAACIgBAmIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJAsIAAACIgLAsIAAACIgOAoIgBABIgRArIgBACIgEAUIAAACIgGApIAAACIgMAoIAAABIgRAoIAAABIgWAmIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIgBABIgBAEIgBABIgQAmIgBACIgQAnIgBACIgPAlIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg9AJIgBAAQhGALhGAEIgBAAQhJAEhGAAIgBAAIi6AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_34.setTransform(668.6366,386.6302);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("rgba(255,255,255,0.267)").s().p("EAR9Am2IgBAAIhXgGIgBAAQgsgEgqgIIgBAAQgsgIgqgLIgBAAQgpgOgogRIgBgBQgqgTgogZIgBgBQgogYgogbIgBgBIgigOIgBgBIgkgOIgBgBIgigUIgBgBIgggZIgBgBIgbgbIgBgBIgbgeIgBgBIgagXIgBgBIgYgcIgBgBIgbgXIgBgBIgegnIgBgBIgXgbIgBgBQgMgOgKgQIgBgBIgXgdIgBgBQgLgOgKgPIgBgBIgRglIgBgBIgSgmIgBgBIgVgiIgBgBIgUghIgBgBIgSgkIgBgBIgSgjIgBgBIgOgeIgBAAQhmAJhlgDIgBAAQiQgCiRAAIgBAAQhsABhtgBIgBAAQhrgBhmggIgBAAIhDgXIgBAAIgUAUIgBABIgWATIgBABIgHAJIgSASIgBABIgaAbIgBABIgeAWIgBABQgRAJgQAHIgBABQgTAKgTAIIgBABIgWAQIgBABQgJAHgMAHIgBABIhFAgIgBABIhJAfIgBABIhBAYIgBAAQgzAUg2AJIgBAAQg4AJg6ABIgBAAQg6ADg6gCIgBAAIhZAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgngDglgFIgBAAQgfgEgfgGIgBAAIgbgIIgBgBIgmgNIgBgBIgmgPIgBgBIgkgTIgBgBQgQgIgSgLIgBgBIgmgTIgBgBQgVgKgRgLIgBgBQgUgMgRgMIgBgBQgSgNgRgOIgBgBIgegbIgBgBIgdggIgBgBQgOgRgLgRIgBgBQgXgigWgkIgBgBQgNgPgLgRIgBgBQgNgSgLgTIgBgBQgKgQgJgTIgBgBQgIgSgGgSIgBgBQgIgSgFgTIAAgBIgKglIAAgBIgIglIAAgBIgSgqIAAgBQgIgUgHgWIAAgBIgMgsIAAgBIgJgsIAAgBQgEgXgCgYIgBgBQgXg9gOhCIAAgBQgJglgEgnIgBAAIgOAAIgBAAQgYAAgVgCIgBAAIgtgEIgBAAQgWgBgXgDIgBAAQgWgCgVgEIgBAAIgtgHIgBAAIgsgIIgBAAIhHgaIgBgBQgmgQgkgVIgBgBQglgVgegbIgBgBQgfgZgbgfIgBgBQgagegYghIgBgBIguhBIgBgBQh8mbAem3IAAAAQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIACABIAiASIABABIAhAYIACABIAfAbIABABIAeARIACABIAfAQIACABIAfARIABABIAWAMIACABIAVANIACABQAPAJAPAMIABABIAdAWIABABQAOAMANAMIABABIAxA1IABABIAhAaIABABQAQANAPAPIABABIAdAdIABABIAaAhIABABQA3BoAvBuIABABQAUAxAPA0IAAABQBCBpAoB1IAAACQAmBvgCBzIAAABQgBCYghCUIAAACQgKAtgPAtIAAACIgBAmIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJAsIAAACIgLAsIAAACIgOAoIgBABIgRArIgBACIgEAUIAAACIgGApIAAACIgMAoIAAABIgRAoIAAABIgWAmIgBABIgSAiIgBABIgVAfIgBABQgKAPgMAPIgBABIgZAbIgBABQgMAOgNALIgBABIgcAZIgBABIgcAiIgBABIgdAjIgBABIgeAfIgBABQgPARgRAPIgBABIgQAVIgBABIgQAUIgBABIgcAbIgBABIgbAYIgBABIgfAWIgBABIgeAUIgBABQgSANgSALIgBABIgYALIgBABIgBAEIgBABIgQAmIgBACIgQAnIgBACIgPAlIgBABIgZAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgXAeIgBABIgYAdIgBABIgZAdIgBABIgdAlIgBABIggAkIgBABIgYAYIgBABIgaAYIgBABQggAognAiIgBABQgzAvg5AlIgBABQg5Amg7AhIgBABQg8Ahg9AfIgBABQg9Adg+AcIgBABIhTAkIAcgLQg4Abg4AXIgBABQg5AXg9AJIgBAAQhGALhGAEIgBAAQhJAEhGAAIgBAAIi6AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_35.setTransform(668.6366,386.6302);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("rgba(255,255,255,0.235)").s().p("EAR9Am2IgCAAIhWgGIgBAAQgsgEgrgIIgBAAQgrgIgqgLIgBAAQgqgOgogSIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIgigNIgBgBIgkgPIgBgBIgigUIgBgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSglIgBgBIgRgmIgBgBIgVgiIgBgCIgUggIgBgCIgTgjIgBgBIgRgjIgBgCIgPgdIgBAAQhlAJhlgDIgBAAQiQgCiRAAIgBAAQhsABhtgBIgCAAQhrgBhlggIgBAAIhDgXIgBABIgUAUIgBABIgXASIgBABIgGAIIgTAUIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgSAKgTAHIgCABIgVAQIgBABIgVAPIgBABIhGAgIgBABIhIAeIgBABIhCAYIgBABQgyATg3AJIgBAAQg3AJg6ABIgCAAQg5ADg6gCIgBAAIhZAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgegEgfgGIgCAAIgagIIgBgBIgmgOIgBAAQgTgHgTgIIgCgBIgjgTIgBgBQgRgJgRgLIgBgBIgmgTIgCgBQgUgKgRgLIgCgBIglgYIgBgBQgSgMgQgOIgBgBIgegcIgCgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBIgYgfIgBgBQgMgSgLgTIgBgBQgKgRgJgTIgBgBIgPgjIgBgBQgHgSgFgTIAAgBIgKglIAAgBIgIglIAAgBIgSgqIAAgBQgIgUgHgWIAAgCIgMgrIAAgBIgJgsIAAgCQgEgWgCgYIgBgBQgXg9gOhCIAAgBQgJglgEgnIgBAAIgOAAIgCAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgBAAIgrgGIgCAAIgsgHIgCAAIgrgIIgBAAIhHgbIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIAAgBQh8mbAem3IAAAAQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIACABIAjATIABABIAhAYIABABIAfAaIABABIAfASIABABQAPAIARAIIABABIAfARIABABIAXAMIABABIAVAMIACABQAQAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABQAPANAOAQIABABIAZAhIABABQA4BoAuBtIABABQAUAxAPA0IABABQBBBqAoB1IABABQAlBvgCB0IAAABQgBCXghCVIAAABQgKAtgPAtIAAACIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAsIAAACIgLAsIAAACIgOAoIgBABIgSAsIAAABIgEAVIAAABIgGAqIAAABQgHAUgFAVIgBABIgQAnIgBABQgLATgKAUIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgeAUIgCABQgRAMgSALIgBABIgYALIgBABIgCAEIgBABIgQAmIgBACIgQAnIgBACIgOAlIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgWAfIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhJAfIATgHIgBABQg4Abg3AXIgBABQg5AWg9AJIgBAAQhGALhGAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_36.setTransform(668.6367,386.6302);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(255,255,255,0.2)").s().p("EAR9Am2IgCAAIhWgGIgBAAQgsgEgrgIIgBAAQgrgIgqgLIgBAAQgqgOgogSIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIgigNIgBgBIgkgPIgBgBIgigUIgBgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSglIgBgBIgRgmIgBgBIgVgiIgBgCIgUggIgBgCIgTgjIgBgBIgRgjIgBgCIgPgdIgBAAQhlAJhlgDIgBAAQiQgCiRAAIgBAAQhsABhtgBIgCAAQhrgBhlggIgBAAIhDgXIgBABIgUAUIgBABIgXASIgBABIgGAIIgTAUIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgSAKgTAHIgCABIgVAQIgBABIgVAPIgBABIhGAgIgBABIhIAeIgBABIhCAYIgBABQgyATg3AJIgBAAQg3AJg6ABIgCAAQg5ADg6gCIgBAAIhZAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgegEgfgGIgCAAIgagIIgBgBIgmgOIgBAAQgTgHgTgIIgCgBIgjgTIgBgBQgRgJgRgLIgBgBIgmgTIgCgBQgUgKgRgLIgCgBIglgYIgBgBQgSgMgQgOIgBgBIgegcIgCgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBIgYgfIgBgBQgMgSgLgTIgBgBQgKgRgJgTIgBgBIgPgjIgBgBQgHgSgFgTIAAgBIgKglIAAgBIgIglIAAgBIgSgqIAAgBQgIgUgHgWIAAgCIgMgrIAAgBIgJgsIAAgCQgEgWgCgYIgBgBQgXg9gOhCIAAgBQgJglgEgnIgBAAIgOAAIgCAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgBAAIgrgGIgCAAIgsgHIgCAAIgrgIIgBAAIhHgbIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIAAgBQh8mbAem3IAAAAQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIACABIAjATIABABIAhAYIABABIAfAaIABABIAfASIABABQAPAIARAIIABABIAfARIABABIAXAMIABABIAVAMIACABQAQAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABQAPANAOAQIABABIAZAhIABABQA4BoAuBtIABABQAUAxAPA0IABABQBBBqAoB1IABABQAlBvgCB0IAAABQgBCXghCVIAAABQgKAtgPAtIAAACIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAsIAAACIgLAsIAAACIgOAoIgBABIgSAsIAAABIgEAVIAAABIgGAqIAAABQgHAUgFAVIgBABIgQAnIgBABQgLATgKAUIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgeAUIgCABQgRAMgSALIgBABIgYALIgBABIgCAEIgBABIgQAmIgBACIgQAnIgBACIgOAlIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgWAfIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhJAfIATgHIgBABQg4Abg3AXIgBABQg5AWg9AJIgBAAQhGALhGAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_37.setTransform(668.6367,386.6302);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("rgba(255,255,255,0.169)").s().p("EAR9Am2IgCAAIhWgGIgBAAQgsgEgrgIIgBAAQgrgIgqgLIgBAAQgqgOgogSIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIgigNIgBgBIgkgPIgBgBIgigUIgBgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSglIgBgBIgRgmIgBgBIgVgiIgBgCIgUggIgBgCIgTgjIgBgBIgRgjIgBgCIgPgdIgBAAQhlAJhlgDIgBAAQiQgCiRAAIgBAAQhsABhtgBIgCAAQhrgBhlggIgBAAIhDgXIgBABIgUAUIgBABIgXASIgBABIgGAIIgTAUIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgSAKgTAHIgCABIgVAQIgBABIgVAPIgBABIhGAgIgBABIhIAeIgBABIhCAYIgBABQgyATg3AJIgBAAQg3AJg6ABIgCAAQg5ADg6gCIgBAAIhZAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgegEgfgGIgCAAIgagIIgBgBIgmgOIgBAAQgTgHgTgIIgCgBIgjgTIgBgBQgRgJgRgLIgBgBIgmgTIgCgBQgUgKgRgLIgCgBIglgYIgBgBQgSgMgQgOIgBgBIgegcIgCgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBIgYgfIgBgBQgMgSgLgTIgBgBQgKgRgJgTIgBgBIgPgjIgBgBQgHgSgFgTIAAgBIgKglIAAgBIgIglIAAgBIgSgqIAAgBQgIgUgHgWIAAgCIgMgrIAAgBIgJgsIAAgCQgEgWgCgYIgBgBQgXg9gOhCIAAgBQgJglgEgnIgBAAIgOAAIgCAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgBAAIgrgGIgCAAIgsgHIgCAAIgrgIIgBAAIhHgbIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIAAgBQh8mbAem3IAAAAQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIACABIAjATIABABIAhAYIABABIAfAaIABABIAfASIABABQAPAIARAIIABABIAfARIABABIAXAMIABABIAVAMIACABQAQAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABQAPANAOAQIABABIAZAhIABABQA4BoAuBtIABABQAUAxAPA0IABABQBBBqAoB1IABABQAlBvgCB0IAAABQgBCXghCVIAAABQgKAtgPAtIAAACIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAsIAAACIgLAsIAAACIgOAoIgBABIgSAsIAAABIgEAVIAAABIgGAqIAAABQgHAUgFAVIgBABIgQAnIgBABQgLATgKAUIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgeAUIgCABQgRAMgSALIgBABIgYALIgBABIgCAEIgBABIgQAmIgBACIgQAnIgBACIgOAlIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBABIgWAfIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhJAfIATgHIgBABQg4Abg3AXIgBABQg5AWg9AJIgBAAQhGALhGAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_38.setTransform(668.6367,386.6302);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("rgba(255,255,255,0.133)").s().p("EAR9Am2IgCAAIhWgGIgBAAQgsgEgrgIIgBAAQgsgIgpgLIgBAAQgqgOgogSIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIgigNIgBgBIgkgPIgBgBIgigUIgBgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSglIgBgBIgRgmIgBgBIgVgiIgBgCIgUggIgBgCIgTgjIgBgBIgRgjIgBgCIgPgdIgBAAQhlAJhlgDIgBAAQiRgCiQAAIgBAAQhtABhsgBIgCAAQhrgBhlggIgBAAIhDgXIgBABIgUAUIgBABIgXASIgBABIgGAIIgTAUIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgTAKgSAHIgCABIgVAQIgBABQgKAIgLAHIgBABIhGAgIgBABIhIAeIgBABIhCAYIgBABQgyATg3AJIgBAAQg4AJg5ABIgCAAQg5ADg6gCIgBAAIhZAAIgCAAIhYAAIgCAAIhSAAIgCAAIhbgCIgCAAQgmgDglgFIgCAAQgfgEgegGIgCAAIgagIIgBgBIgmgOIgCAAQgTgHgTgIIgBgBIgjgTIgBgBQgRgJgRgLIgBgBIgngTIgBgBQgUgKgRgLIgCgBQgTgLgSgNIgBgBQgSgMgQgOIgBgBIgfgcIgBgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBIgYgfIgBgBQgMgSgLgTIgBgBQgKgRgJgTIgBgBIgPgjIgBgBQgHgSgFgTIAAgBIgKglIAAgBIgIglIAAgBIgSgqIAAgBQgIgVgHgVIAAgCIgMgrIAAgBIgJgsIAAgCIgGguIgBgBQgXg9gOhCIAAgBQgJgmgEgmIgBAAIgPAAIgBAAQgXAAgVgCIgCAAIgsgEIgCAAQgVgBgXgDIgBAAQgWgCgVgEIgCAAIgsgHIgCAAIgrgIIgBAAIhHgbIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIAAgBQh8mbAem3IAAAAQAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIACABIAjATIABABIAhAYIABABIAfAaIACABIAeASIABABIAgAQIABABIAfARIACABIAWAMIABABIAVAMIACABQAQAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABIAdAdIABABIAZAhIABABQA4BoAuBtIABABQAUAyAPAzIABABQBBBqAoB1IABABQAlBvgCB0IAAABQgBCXghCVIAAABQgKAugPAsIAAACIgBAmIAAACIgDAtIAAABIgFAuIAAABIgGAtIAAABIgJAsIAAACIgLAsIAAACIgOAoIgBABIgSAsIAAABIgEAVIAAABIgGAqIAAABIgMApIgBABIgQAnIgBACIgVAmIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgfAUIgBABQgRAMgSALIgBABIgYALIgBABIgCAEIgBACIgQAmIgBABIgQAnIgBACIgOAlIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBACIgWAeIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhJAfIATgHIgBABQg4Abg3AXIgBABQg5AWg9AJIgBAAQhHALhFAEIgCAAQhIAEhGAAIgCAAIi5AAIgCAAIgwAAQgvAAgvgCg");
	this.shape_39.setTransform(668.6367,386.6302);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(255,255,255,0.102)").s().p("EAR8Am2IgBAAIhWgGIgBAAQgsgEgrgIIgBAAQgsgIgpgLIgBAAQgqgOgogSIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIgigNIgBgBIgkgPIgBgBIgigUIgBgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSglIgBgBIgRgmIgBgBIgVgjIgBgBIgUghIgBgBIgTgjIgBgBIgRgkIgBgBIgPgdIgBAAQhlAJhlgDIgBAAQiRgCiQAAIgBAAQhtABhtgBIgBAAQhrgBhlggIgBAAIhDgXIgBABIgUAUIgBABIgXASIgBABIgGAIIgTAUIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgTAKgTAHIgBABIgVAQIgBABQgKAIgLAHIgBABIhGAgIgBABIhIAeIgBABIhCAYIgBABQgyATg3AJIgBAAQg4AJg6ABIgBAAQg5ADg6gCIgBAAIhaAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgmgDgmgFIgBAAQgfgEgfgGIgBAAIgagIIgBgBIgmgOIgCAAQgTgHgTgIIgBgBIgjgTIgBgBQgRgJgRgLIgBgBIgngTIgBgBQgUgKgSgLIgBgBQgTgLgSgNIgBgBQgSgMgQgOIgBgBIgfgcIgBgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBQgMgPgMgQIgBgBQgMgSgLgTIgBgBQgKgRgJgTIgBgBIgPgjIgBgBQgHgSgFgTIAAgBIgKglIAAgBIgIglIAAgBIgSgqIAAgBQgIgVgHgWIAAgBIgMgrIAAgBIgJgtIAAgBQgEgXgCgXIgBgBQgXg9gOhCIAAgBQgJgmgEgmIgBAAIgPAAIgBAAQgXAAgWgCIgBAAIgtgEIgBAAQgVgBgXgDIgBAAQgWgCgWgEIgBAAIgtgHIgBAAIgrgIIgBAAIhHgbIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIAAgBQh8mbAem3QAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIACABIAjATIABABIAhAYIABABIAfAaIACABIAeASIACABIAfAQIABABIAfARIACABIAWAMIABABIAVAMIACABQAQAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABIAdAdIABABIAZAhIABABQA4BoAuBtIABABQAUAyAPAzIABABQBBBqAoB1IABABQAlBvgCB0IAAABQgBCXghCVIAAACQgKAtgPAsIAAACIgBAnIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJArIAAACIgLAsIAAACIgOAoIgBABIgSAsIAAACIgEAUIAAACIgGApIAAACIgMAoIgBABIgQAnIgBACIgVAmIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgfAUIgBABQgRAMgSALIgBABIgYALIgBABIgCAEIgBACIgQAmIgBACIgQAmIgBACIgOAlIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBACIgWAeIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhJAfIATgHIgBABQg4Abg3AXIgBABQg5AWg9AJIgBAAQhHALhGAEIgBAAQhIAEhHAAIgBAAIi6AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_40.setTransform(668.6367,386.6302);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(255,255,255,0.067)").s().p("EAR8Am2IgBAAIhWgGIgBAAQgsgEgrgIIgBAAQgsgIgpgLIgBAAQgqgOgogSIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIgigNIgBgBIgkgPIgBgBIgigUIgBgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSglIgBgBIgRgmIgBgBIgVgjIgBgBIgUghIgBgBIgTgjIgBgBIgRgkIgBgBIgPgdIgBAAQhlAJhlgDIgBAAQiRgCiQAAIgBAAQhtABhtgBIgBAAQhrgBhlggIgBAAIhDgXIgBABIgUAUIgBABIgXASIgBABIgGAIIgTAUIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgTAKgTAHIgBABIgVAQIgBABQgKAIgLAHIgBABIhGAgIgBABIhIAeIgBABIhCAYIgBABQgyATg3AJIgBAAQg4AJg6ABIgBAAQg5ADg6gCIgBAAIhaAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgmgDgmgFIgBAAQgfgEgfgGIgBAAIgagIIgBgBIgmgOIgCAAQgTgHgTgIIgBgBIgjgTIgBgBQgRgJgRgLIgBgBIgngTIgBgBQgUgKgSgLIgBgBQgTgLgSgNIgBgBQgSgMgQgOIgBgBIgfgcIgBgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBQgMgPgMgQIgBgBQgMgSgLgTIgBgBQgKgRgJgTIgBgBIgPgjIgBgBQgHgSgFgTIAAgBIgKglIAAgBIgIglIAAgBIgSgqIAAgBQgIgVgHgWIAAgBIgMgrIAAgBIgJgtIAAgBQgEgXgCgXIgBgBQgXg9gOhCIAAgBQgJgmgEgmIgBAAIgPAAIgBAAQgXAAgWgCIgBAAIgtgEIgBAAQgVgBgXgDIgBAAQgWgCgWgEIgBAAIgtgHIgBAAIgrgIIgBAAIhHgbIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIAAgBQh8mbAem3QAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIACABIAjATIABABIAhAYIABABIAfAaIACABIAeASIACABIAfAQIABABIAfARIACABIAWAMIABABIAVAMIACABQAQAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABIAdAdIABABIAZAhIABABQA4BoAuBtIABABQAUAyAPAzIABABQBBBqAoB1IABABQAlBvgCB0IAAABQgBCXghCVIAAACQgKAtgPAsIAAACIgBAnIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJArIAAACIgLAsIAAACIgOAoIgBABIgSAsIAAACIgEAUIAAACIgGApIAAACIgMAoIgBABIgQAnIgBACIgVAmIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgfAUIgBABQgRAMgSALIgBABIgYALIgBABIgCAEIgBACIgQAmIgBACIgQAmIgBACIgOAlIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBACIgWAeIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhJAfIATgHIgBABQg4Abg3AXIgBABQg5AWg9AJIgBAAQhHALhGAEIgBAAQhIAEhHAAIgBAAIi6AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_41.setTransform(668.6367,386.6302);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("rgba(255,255,255,0.035)").s().p("EAR8Am2IgBAAIhWgGIgBAAQgsgEgrgIIgBAAQgsgIgpgLIgBAAQgqgOgogSIgBgBQgpgTgogYIgBgBQgogZgogbIgBgBIgigNIgBgBIgkgPIgBgBIgigUIgBgBIgggZIgBgBIgcgaIgBgBIgagfIgBgBIgbgWIgBgBIgYgcIgBgBIgagYIgBgBIgfgmIgBgBIgWgcIgBgBQgNgOgKgPIgBgBIgWgdIgBgBQgMgOgJgPIgBgBIgSglIgBgBIgRgmIgBgBIgVgjIgBgBIgUghIgBgBIgTgjIgBgBIgRgkIgBgBIgPgdIgBAAQhlAJhlgDIgBAAQiRgCiQAAIgBAAQhtABhtgBIgBAAQhrgBhlggIgBAAIhDgXIgBABIgUAUIgBABIgXASIgBABIgGAIIgTAUIgBABIgZAaIgBABIgeAXIgBABQgRAJgRAHIgBABQgTAKgTAHIgBABIgVAQIgBABQgKAIgLAHIgBABIhGAgIgBABIhIAeIgBABIhCAYIgBABQgyATg3AJIgBAAQg4AJg6ABIgBAAQg5ADg6gCIgBAAIhaAAIgBAAIhZAAIgBAAIhTAAIgBAAIhcgCIgBAAQgmgDgmgFIgBAAQgfgEgfgGIgBAAIgagIIgBgBIgmgOIgCAAQgTgHgTgIIgBgBIgjgTIgBgBQgRgJgRgLIgBgBIgngTIgBgBQgUgKgSgLIgBgBQgTgLgSgNIgBgBQgSgMgQgOIgBgBIgfgcIgBgBIgdggIgBgBQgOgQgLgSIgBgBQgXghgWglIgBgBQgMgPgMgQIgBgBQgMgSgLgTIgBgBQgKgRgJgTIgBgBIgPgjIgBgBQgHgSgFgTIAAgBIgKglIAAgBIgIglIAAgBIgSgqIAAgBQgIgVgHgWIAAgBIgMgrIAAgBIgJgtIAAgBQgEgXgCgXIgBgBQgXg9gOhCIAAgBQgJgmgEgmIgBAAIgPAAIgBAAQgXAAgWgCIgBAAIgtgEIgBAAQgVgBgXgDIgBAAQgWgCgWgEIgBAAIgtgHIgBAAIgrgIIgBAAIhHgbIgBgBQgngPgkgWIgBgBQgkgUgfgbIgBgBQgfgagbgfIgBgBQgagdgYgiIgBgBIguhAIAAgBQh8mbAem3QAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQCDgDB0AuQAvATAtAbIABABQCJBSCSBBIACABIAjATIABABIAhAYIABABIAfAaIACABIAeASIACABIAfAQIABABIAfARIACABIAWAMIABABIAVAMIACABQAQAKAPALIABABIAdAXIABABQAOALAMANIABABIAxA0IABABIAhAbIABABQARAMAPAQIABABIAdAdIABABIAZAhIABABQA4BoAuBtIABABQAUAyAPAzIABABQBBBqAoB1IABABQAlBvgCB0IAAABQgBCXghCVIAAACQgKAtgPAsIAAACIgBAnIAAACIgDAsIAAACIgFAtIAAACIgGAsIAAACIgJArIAAACIgLAsIAAACIgOAoIgBABIgSAsIAAACIgEAUIAAACIgGApIAAACIgMAoIgBABIgQAnIgBACIgVAmIgBABIgTAiIgBABIgVAeIgBABQgKAQgLAPIgBABIgZAaIgBABQgNAOgNALIgBABIgbAaIgBABIgcAiIgBABIgdAiIgBABIgfAgIgBABQgPAQgQAQIgBABIgQAVIgBABIgQAUIgBABIgcAaIgBABIgcAYIgBABIgeAXIgBABIgfAUIgBABQgRAMgSALIgBABIgYALIgBABIgCAEIgBACIgQAmIgBACIgQAmIgBACIgOAlIgBABIgaAkIgBABIgZAiIgBABIgUAhIgBABIgUAgIgBABIgVAhIgBACIgWAeIgBABIgYAdIgBABIgaAdIgBABIgdAlIgBABIgfAjIgBABIgYAYIgBABIgbAYIgBABQggAognAjIgBABQgyAvg5AlIgBABQg5Alg8AiIgBABQg8Agg9AfIgBABQg9Aeg+AcIgBABIhJAfIATgHIgBABQg4Abg3AXIgBABQg5AWg9AJIgBAAQhHALhGAEIgBAAQhIAEhHAAIgBAAIi6AAIgCAAIgvAAQgwAAgvgCg");
	this.shape_42.setTransform(668.6367,386.6302);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(255,255,255,0)").s().p("EAR8Am2IhXgGQgtgEgrgIQgsgIgqgLQgqgOgpgSQgqgTgogZQgpgZgogcIgjgOIglgQIgjgVIghgaIgdgbIgbggIgcgXIgZgdIgbgZIgggnIgXgdQgNgOgLgQIgXgeQgMgPgKgPIgTgmIgSgnIgWgkIgVgiIgUgkIgSglIgQgeQhmAJhlgDQiRgCiRAAQhtABhugBQhrgBhmggQgigKgigNIgVAVIgYATQgMAPgOAOIgaAbIgfAYQgSAJgRAIQgTAKgUAIIgWARQgKAIgMAIIhHAhIhJAfQghANgiAMQgzAUg3AJQg4AJg7ABQg6ADg6gCIhbAAIhaAAIhUAAIhdgCQgngDgmgFQgfgEgggGIgbgIIgngPQgUgGgUgJIgkgUQgRgJgSgMIgogUQgVgKgSgMQgUgMgSgNQgSgNgRgOIgggdIgeghQgOgRgMgSQgXgigXglQgNgPgMgRQgNgTgLgTQgLgRgJgUQgJgSgHgSQgIgTgFgTIgKgmIgIgmIgSgrQgIgVgHgXIgMgsIgJguQgEgXgCgYQgYg+gOhCQgJgmgEgnIgQAAQgYAAgWgCIgugEQgWgBgXgDQgXgCgWgEIgugHIgsgIIhIgbQgngQglgWQglgVgfgbQgfgagcggQgagegZgiIgvhBQh8mbAem4QAMipA8idQCElZF6hTIAOgCQAGhCAPhAQAVhRAuhFIAihPIAlhMIAkhLIAlhLIAlhNIARgqIAKgNQAIgLAJgKQAthhBOhJQA/g7BQgiQBkgrBwgCQB8AAB8AEQByADBrAjQAqAPApARIAsAIQAVADAWAHQAQAEAOAFQARAFAQAIIAhAPIAkAJIAlAKIAlANIAiAQIAKAFQDcilDxhaQBmgmBngWIAJgJIAegWIAegUIAhgRIAggOIAegMIARgLQATgLAUgKIAqgSIATgNIAbgNIAegOQBOg3BdgYQBxgbBzADQBVADBWgBQBtgCBrALQBDAGBBAOIAoANIAkAPIAlATQBNASBHAmQBGAmA7A4QAqApAwAfQA5AjAxAqQBBA2A0BAIAaAhIAWARIAZAaIAaAjIAZAlIAiAhIAjAfQAPANAOAMIAdAaIAdAdIAXAfIAVAhIATAjIAPAkIAQAkIAWAnQAiBOAQBSQBEgFBFABQCuADCugGQC4gFCbBeQCKBTCSBBIAlAUIAiAZIAgAbIAgATIAhARIAgASIAYANIAWANQARAKAQAMIAeAYQAOAMANANIAyA1IAiAcQARANAQAQQAPAOAPAQIAaAiQA4BoAvBuQAVAyAPA0QBCBqAoB2QAmBvgCB1QgBCYghCVQgKAugPAtIgBApIgDAuIgFAvIgGAuIgJAtIgLAuIgOAqIgTAtIgEAWIgGArIgMAqIgRAoQgMAUgKAUIgUAjIgWAfQgKAQgMAQIgaAbQgNAPgOALIgcAbIgdAjIgeAjIggAhQgPARgRAQIgRAWIgRAVIgdAbIgdAZIgfAYIggAVQgSANgSALIgZAMIgDAFIgRAoQgIAVgJATIgPAnIgbAlIgaAjIgVAiIgVAhIgWAiIgXAgIgZAeIgbAeIgeAmIggAkIgZAZIgcAZQggApgoAjQgzAvg5AmQg6Amg8AiQg8Ahg+AfQg9Aeg/AdIhUAlIAdgMQg4Abg4AYQg6AXg9AJQhHALhHAEQhJAEhHAAIi7AAIgwAAQgwAAgwgCgEgrOAUHIACAEIgBgEIgBgDg");
	this.shape_43.setTransform(668.6366,386.6302);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},127).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},4).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.pressContinueButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(16.05,9.65,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_19();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_22();
	this.instance_2.setTransform(16.05,9.65,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_21();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,300,50);


(lib.movieClipTitleText = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_4 = new cjs.Graphics().p("AjpJCIAAyDIHTAAIAASDg");
	var mask_graphics_5 = new cjs.Graphics().p("Am6I4IAAxvIN0AAIAARvg");
	var mask_graphics_6 = new cjs.Graphics().p("AqJIsIAAxXIUTAAIAARXg");
	var mask_graphics_7 = new cjs.Graphics().p("AtZIiIAAxDIazAAIAARDg");
	var mask_graphics_8 = new cjs.Graphics().p("AwpIWIAAwsMAhTAAAIAAQsg");
	var mask_graphics_9 = new cjs.Graphics().p("Az5IMIAAwXMAnzAAAIAAQXg");
	var mask_graphics_10 = new cjs.Graphics().p("Az5IMIAAwXMAnzAAAIAAQXg");
	var mask_graphics_11 = new cjs.Graphics().p("Az5IMIAAwXMAnzAAAIAAQXg");
	var mask_graphics_12 = new cjs.Graphics().p("Az5IMIAAwXMAnzAAAIAAQXg");
	var mask_graphics_13 = new cjs.Graphics().p("Az5IMIAAwXMAnzAAAIAAQXg");
	var mask_graphics_14 = new cjs.Graphics().p("Az5IMIAAwXMAnzAAAIAAQXg");
	var mask_graphics_15 = new cjs.Graphics().p("Az5IMIAAwXMAnzAAAIAAQXg");
	var mask_graphics_16 = new cjs.Graphics().p("Az5IMIAAwXMAnzAAAIAAQXg");
	var mask_graphics_17 = new cjs.Graphics().p("Az5IMIAAwXMAnzAAAIAAQXg");
	var mask_graphics_18 = new cjs.Graphics().p("Az5IMIAAwXMAnzAAAIAAQXg");
	var mask_graphics_19 = new cjs.Graphics().p("Az5IMIAAwXMAnzAAAIAAQXg");
	var mask_graphics_20 = new cjs.Graphics().p("Aw5ISIAAwjMAhzAAAIAAQjg");
	var mask_graphics_21 = new cjs.Graphics().p("At5IYIAAwvIbzAAIAAQvg");
	var mask_graphics_22 = new cjs.Graphics().p("Aq4IfIAAw9IVxAAIAAQ9g");
	var mask_graphics_23 = new cjs.Graphics().p("An4IlIAAxJIPxAAIAARJg");
	var mask_graphics_24 = new cjs.Graphics().p("Ak4IrIAAxVIJxAAIAARVg");
	var mask_graphics_29 = new cjs.Graphics().p("Ak4KBIAA0BIJxAAIAAUBg");
	var mask_graphics_30 = new cjs.Graphics().p("AoSKHIAA0NIQmAAIAAUNg");
	var mask_graphics_31 = new cjs.Graphics().p("AruKOIAA0bIXcAAIAAUbg");
	var mask_graphics_32 = new cjs.Graphics().p("AvIKUIAA0nIeRAAIAAUng");
	var mask_graphics_33 = new cjs.Graphics().p("AyjKaIAA0zMAlHAAAIAAUzg");
	var mask_graphics_34 = new cjs.Graphics().p("A1+KgIAA0/MAr9AAAIAAU/g");
	var mask_graphics_35 = new cjs.Graphics().p("A1+KgIAA0/MAr9AAAIAAU/g");
	var mask_graphics_36 = new cjs.Graphics().p("A1+KgIAA0/MAr9AAAIAAU/g");
	var mask_graphics_37 = new cjs.Graphics().p("A1+KgIAA0/MAr9AAAIAAU/g");
	var mask_graphics_38 = new cjs.Graphics().p("A1+KgIAA0/MAr9AAAIAAU/g");
	var mask_graphics_39 = new cjs.Graphics().p("A1+KgIAA0/MAr9AAAIAAU/g");
	var mask_graphics_40 = new cjs.Graphics().p("A1+KgIAA0/MAr9AAAIAAU/g");
	var mask_graphics_41 = new cjs.Graphics().p("A1+KgIAA0/MAr9AAAIAAU/g");
	var mask_graphics_42 = new cjs.Graphics().p("A1+KgIAA0/MAr9AAAIAAU/g");
	var mask_graphics_43 = new cjs.Graphics().p("A1+KgIAA0/MAr9AAAIAAU/g");
	var mask_graphics_44 = new cjs.Graphics().p("A1+KgIAA0/MAr9AAAIAAU/g");
	var mask_graphics_45 = new cjs.Graphics().p("AySKNIAA0aMAklAAAIAAUag");
	var mask_graphics_46 = new cjs.Graphics().p("AumJ7IAAz1IdNAAIAAT1g");
	var mask_graphics_47 = new cjs.Graphics().p("Aq6JoIAAzPIV1AAIAATPg");
	var mask_graphics_48 = new cjs.Graphics().p("AnOJVIAAypIOdAAIAASpg");
	var mask_graphics_49 = new cjs.Graphics().p("AjiJDIAAyFIHFAAIAASFg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(4).to({graphics:mask_graphics_4,x:35.95,y:43.8}).wait(1).to({graphics:mask_graphics_5,x:62.7,y:44.575}).wait(1).to({graphics:mask_graphics_6,x:89.425,y:45.35}).wait(1).to({graphics:mask_graphics_7,x:116.15,y:46.125}).wait(1).to({graphics:mask_graphics_8,x:142.875,y:46.9}).wait(1).to({graphics:mask_graphics_9,x:169.625,y:47.675}).wait(1).to({graphics:mask_graphics_10,x:169.625,y:47.675}).wait(1).to({graphics:mask_graphics_11,x:169.625,y:47.675}).wait(1).to({graphics:mask_graphics_12,x:169.625,y:47.675}).wait(1).to({graphics:mask_graphics_13,x:169.625,y:47.675}).wait(1).to({graphics:mask_graphics_14,x:169.625,y:47.675}).wait(1).to({graphics:mask_graphics_15,x:169.625,y:47.675}).wait(1).to({graphics:mask_graphics_16,x:169.625,y:47.675}).wait(1).to({graphics:mask_graphics_17,x:169.625,y:47.675}).wait(1).to({graphics:mask_graphics_18,x:169.625,y:47.675}).wait(1).to({graphics:mask_graphics_19,x:169.625,y:47.675}).wait(1).to({graphics:mask_graphics_20,x:200.425,y:48.6}).wait(1).to({graphics:mask_graphics_21,x:231.225,y:49.575}).wait(1).to({graphics:mask_graphics_22,x:262.025,y:50.5}).wait(1).to({graphics:mask_graphics_23,x:292.825,y:51.475}).wait(1).to({graphics:mask_graphics_24,x:323.625,y:52.4}).wait(1).to({graphics:null,x:0,y:0}).wait(4).to({graphics:mask_graphics_29,x:958.35,y:40.65}).wait(1).to({graphics:mask_graphics_30,x:988.05,y:41.925}).wait(1).to({graphics:mask_graphics_31,x:1017.75,y:43.15}).wait(1).to({graphics:mask_graphics_32,x:1047.45,y:44.425}).wait(1).to({graphics:mask_graphics_33,x:1077.15,y:45.65}).wait(1).to({graphics:mask_graphics_34,x:1106.85,y:46.925}).wait(1).to({graphics:mask_graphics_35,x:1106.85,y:46.925}).wait(1).to({graphics:mask_graphics_36,x:1106.85,y:46.925}).wait(1).to({graphics:mask_graphics_37,x:1106.85,y:46.925}).wait(1).to({graphics:mask_graphics_38,x:1106.85,y:46.925}).wait(1).to({graphics:mask_graphics_39,x:1106.85,y:46.925}).wait(1).to({graphics:mask_graphics_40,x:1106.85,y:46.925}).wait(1).to({graphics:mask_graphics_41,x:1106.85,y:46.925}).wait(1).to({graphics:mask_graphics_42,x:1106.85,y:46.925}).wait(1).to({graphics:mask_graphics_43,x:1106.85,y:46.925}).wait(1).to({graphics:mask_graphics_44,x:1106.85,y:46.925}).wait(1).to({graphics:mask_graphics_45,x:1134.85,y:46.9}).wait(1).to({graphics:mask_graphics_46,x:1162.825,y:46.925}).wait(1).to({graphics:mask_graphics_47,x:1190.8,y:46.9}).wait(1).to({graphics:mask_graphics_48,x:1218.775,y:46.925}).wait(1).to({graphics:mask_graphics_49,x:1246.775,y:46.9}).wait(5).to({graphics:null,x:0,y:0}).wait(6));

	// Layer_3
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(26,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_14();
	this.instance_1.setTransform(26,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_15();
	this.instance_2.setTransform(906,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_16();
	this.instance_3.setTransform(906,0,0.5,0.5);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance_1}]},20).to({state:[]},1).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_3}]},20).to({state:[]},5).wait(6));

	// text
	this.instance_4 = new lib.CachedBmp_18();
	this.instance_4.setTransform(906,0,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_17();
	this.instance_5.setTransform(26,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4}]}).wait(60));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(26,0,1227.5,89);


(lib.movieClipFree = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_54 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(54).call(this.frame_54).wait(1));

	// Layer_4 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AncFYIIXugIGhDxIoWOgg");
	var mask_graphics_1 = new cjs.Graphics().p("AncFYIIYugIGgDxIoWOgg");
	var mask_graphics_2 = new cjs.Graphics().p("AnbFYIIWugIGhDxIoWOgg");
	var mask_graphics_3 = new cjs.Graphics().p("AncFYIIYugIGgDxIoWOgg");
	var mask_graphics_4 = new cjs.Graphics().p("AncFYIIYugIGgDxIoXOgg");
	var mask_graphics_5 = new cjs.Graphics().p("AnMG4IBMiDIhrg9IIXugIGhDxIhMCDIBrA9IoXOgg");
	var mask_graphics_6 = new cjs.Graphics().p("Am9IYICXkGIjUh6IIXugIGhDxIiXEGIDUB6IoXOgg");
	var mask_graphics_7 = new cjs.Graphics().p("AmuJ5IDjmKIk+i3IIXugIGhDwIjjGKIE+C3IoXOhg");
	var mask_graphics_8 = new cjs.Graphics().p("AmfLYIIXugIGhDxIoYOggAoYgnIIYuhIGgDwIoXOhg");
	var mask_graphics_9 = new cjs.Graphics().p("AmQM5IIYugIGhDwIoZOhgAooiIIIZuhIGfDxIoXOgg");
	var mask_graphics_10 = new cjs.Graphics().p("AiSOKIk+i5IFIo4IgMAKIgKgHIhtgUIk/i3IGarGIDLiuIAKAGIBtAUIE/C4IlJI5IAMgKIB4AaIE/C4ImaLFIjLCvg");
	var mask_graphics_11 = new cjs.Graphics().p("AoRJqIDjmJIk+i4IG5r7ID5hLIAMAHIBogaIFYDHIjjGJIE+C4Im5L7Ij5BLIh0ATg");
	var mask_graphics_12 = new cjs.Graphics().p("ApRIDICXkGIjUh6IHZszIEnAZIALAHIBmhHIFvDVIiXEGIDUB7InZMyIkmgZIhyA/g");
	var mask_graphics_13 = new cjs.Graphics().p("AicITIhtBrImJjiIBMiDIhqg+IH5tpIFVB8IAMAIIBhh0IGIDjIhMCDIBqA9In4Nqg");
	var mask_graphics_14 = new cjs.Graphics().p("AjVGFIhcChImhjxIIYugIGPDnIBdihIGhDxIoYOgg");
	var mask_graphics_15 = new cjs.Graphics().p("ABmIbIiqgjIighcIhtBgIgHAMIhmgUIlMi/IGrriICtiZIBBAlIBxAXIDsCJIBBg6IAshMIBmAUIFMC/ImrLiIitCZg");
	var mask_graphics_16 = new cjs.Graphics().p("ABZHzIiiAiIiqhiIiEArIgIANIhhAVIlhjLIAAAAIHGsSIDRhEIBGAnIBrgWID8CRIBOgaIAvhSIBhgUIFhDLInGMSIjRBEg");
	var mask_graphics_17 = new cjs.Graphics().p("AkDG9IiagKIgJAPIhdA+Il1jYIgBAAIHhtCID3ARIBJAqIBmhFIELCaIBcAGIAyhXIBdg+IF2DYInhNCIj3gQIhXgyIiaBng");
	var mask_graphics_18 = new cjs.Graphics().p("AkTHYIiwg/IgKAQIhYBnImKjkIgBgBIH8twIEbBkIBOAtIBhhzIEZCjIBqAlIA1hcIBYhmIGLDkIn8NxIkbhkIhcg1IiSCrg");
	var mask_graphics_19 = new cjs.Graphics().p("AAwF8IiJDwImRjnIhdChImhjxIIYugIGRDnIBcihIGgDxICLjxIGhDxIoYOgg");
	var mask_graphics_20 = new cjs.Graphics().p("AhtKAIjGhyIhbB3Il4jaIgBgBIAcgwIkLiaIIYugIGRDnIBbihIGhDxICLjxIGhDxIhLCBIBnA7InlNKIlliWIh+Dag");
	var mask_graphics_21 = new cjs.Graphics().p("AA0L9IiwhmIhZBNIlSjDICVkCIh1hEIhdChImhjxIIYugIGRDoIBcihIGgDwICLjwIGhDxIiVECIDPB3ImyLxIksg5IhxDCg");
	var mask_graphics_22 = new cjs.Graphics().p("AA6MZIhXAiIkpisICwkyIl/jfIheChImhjxIIZugIGQDoIBdihIGgDxICKjxIGhDxIjpGVIAXgKIEpCsIl+KYIjyAiIhkCtIhqAPg");
	var mask_graphics_23 = new cjs.Graphics().p("ADwOOIhVgHIkBiVIAAAAIFLpAIAVgPIkDiXIiLDxImQjoIhdChImhjwIIYuhIGRDoIBcihIGgDxICKjxIGhDxIlFI0IA4AgICBALIEBCUIlMJBIi4B/IhXCUIhQA4g");
	var mask_graphics_24 = new cjs.Graphics().p("AB5NUIIYugIGhDwIoYOhgAgYhcIiKDwImRjnIhdCgImhjwIIYuhIGRDoIBcihIGgDxICLjxIGhDxIoZOgg");
	var mask_graphics_25 = new cjs.Graphics().p("ACMNbIhJABIjeiBIEfnzICehZIAFgHIgZgPIiugnIhig5IirCdIi2goIjah+IhRBLIgcAwIhPgSIlejJIHEsPICBh5ICTBWIB6AbICKBRIByhrIArAaIC2ApIC/BuIBihaIA+hsIBNASIFfDKIlFIzIBzBCIBogBIDfB/IkfH0IieBZIhHB7IikBcIhHB7g");
	var mask_graphics_26 = new cjs.Graphics().p("AhSLXIhOAoIkQidIDgmFIiTAZIjkiDIhgAjIgeAzIhJAMIlvjUIgBAAIHasyICag5ICZBZIBzgUICRBUICGgzIAuAaICrgdIDHB0IB1gsIBAhwIBJgMIFwDUIkEHCIBNgoIEPCdIleJeIjZAIIhXCXIjjAJIhXCVg");
	var mask_graphics_27 = new cjs.Graphics().p("AkzJVIhTBRIlAi5ICVkDIgfgSIhxgDIgeA0IhFArIl/jdIgBgBIHutXICyAGICgBdIBrhDICZBYICbAFIAwAbICghkIDRB5ICHAEIBDh2IBFgqIGADeIiVEDIDPB3ImcLJIkVhGIhmCwIkihKIhnCxg");
	var mask_graphics_28 = new cjs.Graphics().p("AoTHwIhYB4IlwjVIAcgwIkKiaIgBgBIIDt7IDKBEICoBhIBjhyICfBbICxA9IAyAcICViqIDZB+ICaA0IBGh7IBAhIIGRDnIhKCBIBmA7InZM2IlRiXIh2DMIlgieIh2DLg");
	var mask_graphics_29 = new cjs.Graphics().p("AFMGHIiFDlImfjwIiKDwImRjnIhdChImhjxIIYugIGRDnIBcihIGgDxICLjxIGNDmICFjmIGhDxIoYOgg");
	var mask_graphics_30 = new cjs.Graphics().p("ADpG2IiFDmImfjxIiLDxImRjoIhdChImhjxIIYugIFAC5ICGjqIFVCXIBQiNIFiCcIB6jUIAvAVIEvCvIB+itIFwDVInaM1IhQgkIi2E6g");
	var mask_graphics_31 = new cjs.Graphics().p("ACFIJIiFDmImfjxIiLDxImRjoIhdChImhjxIIYugIGRDoIBdihIDuCJICwkyIEXBHIBHh8IEiBLIBri5IAmAKIEICYIB2h0IFAC5ImcLKIixguIlbJag");
	var mask_graphics_32 = new cjs.Graphics().p("AAgJdIiEDmImgjxIiKDxImRjoIhdChImhjxIIYugIGRDoIBcihIGhDwICKjwICMBRICsksIDcgIIA9hpIDjgKIBbidIAdgBIDgCCIBvg6IEQCcIldJeIjaAJIhXCWIhfAEImDKgg");
	var mask_graphics_33 = new cjs.Graphics().p("AhDK1IiFDmImgjwIiKDwImRjnIhdCgImhjxIIYugIGRDoIBcihIGhDxICLjxIGNDmICEjmIA+AkICvkvICehZIAyhXICkhcIBLiBIAVgMIC5BrIBogCIDfCBIkfH0IieBYIhHB7IikBcIhIB7IiOhRIm6L+g");
	var mask_graphics_34 = new cjs.Graphics().p("AinMOIiFDmImgjxIiLDxImRjoIhcChImhjxIIYugIGQDnIBdigIGgDvICLjvIGNDlICFjlIGhDwIoYOhgAMthSIIYuhIGhDxIoYOgg");
	var mask_graphics_35 = new cjs.Graphics().p("ACfMcIizgrIgagPIihCYIhSgvIi0grIiXhXIiOCFIgXApIiYglIj4iPIhEBAIgnBDIhBgQIlpjRIHRsmIBrhlIC+BuIB+AfIBXAyIBxhrIBrA+IC9AtIB0BDICbiSIAMgVICgAnIDrCHIAWgVIDtmZICShDIAthOICXhGIBDh0ICQhDIAYgpIA4gFIDABuIBbgIIDIBzIkCHBIiQBCIhABuIiQBBIhBBvIiWBGIgKAQIhSAIIgEgDIlZJWIhqBkg");
	var mask_graphics_36 = new cjs.Graphics().p("AENK7IioAZIgbgQIi9BLIhUgxIioAaIidhbIinBBIgYAqIiOAVIkCiVIhPAfIgpBGIg9AJIl2jYIgBgBIHjtFIB+gxIDFBzIB2gSIBaA0ICFg0IBvBAICwgaIB5BGICVg7ICrkoIDRAIIA5hjIDaAIIBViTIDPAHIAfg1IA/gnIDzCMIBlhAID+CSIlHI6IjQgIIhRCLIhagDIl5KMIh9Axg");
	var mask_graphics_37 = new cjs.Graphics().p("AwUJBIhcgBIgpBIIg5AiImFjhIAAAAIH1tjICQACIDNB2IBthBIBeA2ICYACIA+AkICikYIEQBSIBFh3IEcBVIBmiyIEQBRIAlhAIBFhKIEnCqIBwh3IEyCxImLKxIitg1IlLI+IiQgCIjKh1IicBeIgcgQIjZgEIhXgyIidBdIijheIjAgDIgZAsIiEBOg");
	var mask_graphics_38 = new cjs.Graphics().p("AvOHyIhngiIgsBLIg0A7ImSjoIgBgBIIGuCICjA2ICuBkICAjcIFQCdIBRiMIFdCjIB5jSIFPCcIAshMIBLhsIFaDIIB6ivIFpDQInQMqIhQgmIisEqIijg1IjRh5IiRCiIgcgRIj2hRIhZg0IiSCiIiohiIjZhHIgaAtIh6CIg");
	var mask_graphics_39 = new cjs.Graphics().p("AJWGHIiFDlImOjlIiEDlImgjwIiLDwImRjnIhcChImhjxIIYugIGQDnIBdihIGgDxICKjxIGODmICFjmIGODmICEjmIGhDxIoYOgg");
	var mask_graphics_40 = new cjs.Graphics().p("Ap3IIIgEAGIgLgHIhSB0IlpjQIgBgBIBGh7IgPgJIheChImhjxIIZugIGQDoIBdihIGhDxICJjxIGODmICEjmIGODmICFjmIGhDxIhNCGIBsA+InRMqIlOidIh0DIIlOicIh0DJIlcijIgSAeIhuCcg");
	var mask_graphics_41 = new cjs.Graphics().p("AkJJ+IhPBTIk0iyIC7lFIgwgbIiLDwImQjnIhdCgImhjxIIYugIGRDoIBcihIGhDxICJjxIGODmICFjmIGODmICEjmIGhDxIiaEMIDaB+ImLKxIkPhSIhiCqIkPhSIhjCrIkbhWIgPAaIhlBrg");
	var mask_graphics_42 = new cjs.Graphics().p("ABuL7IhHAsIj+iTIEpoEIhAglIiEDmImgjxIiLDxImQjoIhdChImhjxIIYugIGRDoIBcihIGhDwICJjwIGODmICFjmIGODmICEjmIGhDxIkdHtIAcARIBmhAID9CRIlHI5IjPgIIhSCNIjPgIIhSCMIjYgIIgNAVIhbA5g");
	var mask_graphics_43 = new cjs.Graphics().p("AHnN3IhAAFIjIhzIAAAAIECm/ICShEIAthNIBZgpIjliEIiFDmImOjmIiEDmImgjxIiKDxImRjoIhdChImhjwIIYuhIGRDoIBcihIGhDxICLjxIGNDmICEjmIGODmICFjmIGhDxIlQJFICwBnIBbgJIDIByIkCHAIiQBDIhABuIiQBCIhBBvIiWBFIgKARIhSAIg");
	var mask_graphics_44 = new cjs.Graphics().p("AKVNpIIYugIGhDwIoYOhgAIDhmIiFDkImNjkIiEDkImhjvIiKDvImRjmIhdCgImhjwIIYuhIGRDnIBdihIGgDxICLjxIGMDmICFjmIGODmICFjmIGhDxIoYOgg");
	var mask_graphics_45 = new cjs.Graphics().p("AKpO6IhXAPIiyhnIg6AJIi4hqIgBgBIDtmcICJg0IAphIICOg1IAnhEIgZgOIivgsIgJgFIigCZIhtg/Ii5guIhgg4IifCaIgVgNIi6guIjLh1IhxBuIguBOIh8geIkUigIg3A0IgwBVIg1gOIl0jVIHfs9IBWhUIDlCFICBAgIAqAYIBvhsIClBgIDCAwIAyAdIClihIA6AhIC5AuICUBWICMiHIARgdICfAoIDqCHIBEhBIBOiIIA1ANIF0DXIlgJgIA2gIICmBfIBOgMIC5BpIjtGdIiAAwIg3BgIiIAzIg7BmIiHAzIg7BmIhdAkg");
	var mask_graphics_46 = new cjs.Graphics().p("AgFLpIhCAvIj0iMIEDnCIhfAnIgXgMIisAXIjQh5IiFA3IgvBRIhzAPIkcikIhAAZIgzBXIgwAHIl/jdIgBAAIHutVIBkgqIDsCJIB5gQIAqAYICCg1ICqBiIC0gZIAzAeIDBhQIA8AiICsgXICYBYICjhDIASgeICTgTIDyCKIBPggIBRiMIAwgGIF/DdIkaHoIAwAcIBahAIDzCMIk4IdIi9gSIhJB+IjKgTIhNCGIjJgUIhNCGIiKgMIhUgxIhkBHg");
	var mask_graphics_47 = new cjs.Graphics().p("AmrJkIhLBVIktitIAAgBIClkeIhAAAIgwBTIhqA9IkliqIhJAAIgzBaIguAaImKjjIAAAAIH7tvIBzAAIDzCOIBvhBIAsAZICUgBICvBmICmhgIA1AeIDdAAIA9AjICghcICcBaIC6AAIASgdICIhQID4CPIBbABIBTiQIAtgaIGLDjIibEMIDcB/ImCKfIj8hWIhaCeIkLhaIhfClIkLhZIhgCmIi2g8Ihog9IhxB/g");
	var mask_graphics_48 = new cjs.Graphics().p("AtQH0IhVB8IlnjQIBAhuIgSgGIg1BcIgqAuImVjpIgBgBIIKuHICBApID6CSIBmhyIAtAbICnA1IC0BoICYioIA3AeID4BRIA/AkICSihIChBdIDRBDIATgeIB9iLID/CTIBmAhIBWiUIAogtIGWDqIhNCGIBuBAInNMfIk5iXIhsC7IlMigIhzDGIlMigIhxDGIjjhtIh9hIIh+C4g");
	var mask_graphics_49 = new cjs.Graphics().p("ANmGTIh9DZImOjlIiEDlImNjlIiFDlImgjwIiLDwImRjnIhdChImhjxIIZugIGQDnIBdihIGgDxICLjxIGNDmICEjmIGODmICFjmIF3DaIB+jaIGgDxIoYOgg");
	var mask_graphics_50 = new cjs.Graphics().p("APqHOIhogbIgEAGIiRCOIh/hKIizguIhTgvIieCaIgsgaIi9gwIiahZIiMCIIgQAbIimgrIjziMIhbBaIhABtIhkgZIksiuIgsAqIg5BkIgqgLIl8jbIgBgBIHptOIBGhFIEFCXICFAiIADACIBuhrIDUB6IDDAxIACgEICiieIB5BGIC+AwIBNAtICdiaIAzAdIC+AxICUBVICCh/IAYgpICOAkIDkCEIBihhIArhLIArAMIF8DbInpNOIhGBFg");
	var mask_graphics_51 = new cjs.Graphics().p("AP9HHIhhAMIgDAGIioBIIiBhLIinATIhUgwIi3BOIgugaIiuAVIiehbIijBFIgPAbIiaATIj4iQIhrAtIhABxIhdALIk0iyIgyAVIg7BmIgnAFImFjhIgBAAIH0tjIBSgjIELCbIB7gPIADACICAg3IDZB9IC0gVIADgEIC7hRIB8BIICwgWIBOAuIC3hOIA0AeICvgVICYBXICXhAIAYgqICEgQIDpCHIBygxIAshNIAogFIGFDhIn0NjIhSAjg");
	var mask_graphics_52 = new cjs.Graphics().p("AQRHBIhZAxIgEAHIi/ACIiFhMIiYBVIhXgxIjQABIgugaIihBaIihhcIi4ABIgRAcIiNBPIj+iTIh5ACIhCByIhVAwIk7i3Ig6ABIg8BpIgkAUImOjmIgBAAIIBt4IBcgBIESCfIBxhAIADACICRgBIDeCAICmheIACgEIDWgCIB/BJICghbIBRAvIDQgCIA1AdIChhaICbBaICsgCIAZgrIB4hEIDvCKICCgCIAthOIAkgUIGPDlIoBN4IhcABg");
	var mask_graphics_53 = new cjs.Graphics().p("AVFJhIkhinIhSBYIgEAHIjVhDIiIhPIiKCXIhZgzIjphJIgvgcIiTChIilhgIjPhBIgQAcIiBCNIkEiXIiIgrIhDB1IhNBVIlDi6IhAgVIg+BrIghAkImYjsIIMuMIBpAhIEXCiIBnhwIAEACICjAzIDiCDICYikIABgFIDwBMICCBLICSihIBSAwIDqBKIA2AeICTigICeBcIDBA8IAZgsIBuh3ID0CNICRAuIAuhQIAiglIGXDsIoMOMg");
	var mask_graphics_54 = new cjs.Graphics().p("AQ3GzIhNCGIl4jZIh9DZImNjmIiEDmImOjmIiFDmImgjxIiLDxImRjoIhcChImhjxIIYugIGQDoIBdihIGgDwICLjwIGODmICEjmIGODmICEjmIF3DZIB+jZIGaDtIBNiGIGhDxIoYOgg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:57.05,y:-58.5}).wait(1).to({graphics:mask_graphics_1,x:45.15,y:-39.7}).wait(1).to({graphics:mask_graphics_2,x:33.3,y:-20.9}).wait(1).to({graphics:mask_graphics_3,x:21.4,y:-2.1}).wait(1).to({graphics:mask_graphics_4,x:9.5,y:16.7}).wait(1).to({graphics:mask_graphics_5,x:11.025,y:26.325}).wait(1).to({graphics:mask_graphics_6,x:12.55,y:35.925}).wait(1).to({graphics:mask_graphics_7,x:14.05,y:45.55}).wait(1).to({graphics:mask_graphics_8,x:15.575,y:55.15}).wait(1).to({graphics:mask_graphics_9,x:17.1,y:64.775}).wait(1).to({graphics:mask_graphics_10,x:20.525,y:55.875}).wait(1).to({graphics:mask_graphics_11,x:23.925,y:46.975}).wait(1).to({graphics:mask_graphics_12,x:27.35,y:38.05}).wait(1).to({graphics:mask_graphics_13,x:30.75,y:29.175}).wait(1).to({graphics:mask_graphics_14,x:34.175,y:20.25}).wait(1).to({graphics:mask_graphics_15,x:39.725,y:20.25}).wait(1).to({graphics:mask_graphics_16,x:45.275,y:20.25}).wait(1).to({graphics:mask_graphics_17,x:50.825,y:21.55}).wait(1).to({graphics:mask_graphics_18,x:56.375,y:21.175}).wait(1).to({graphics:mask_graphics_19,x:61.925,y:20.25}).wait(1).to({graphics:mask_graphics_20,x:63.35,y:28.75}).wait(1).to({graphics:mask_graphics_21,x:64.825,y:37.225}).wait(1).to({graphics:mask_graphics_22,x:66.3,y:46.5}).wait(1).to({graphics:mask_graphics_23,x:67.775,y:57}).wait(1).to({graphics:mask_graphics_24,x:69.25,y:67.5}).wait(1).to({graphics:mask_graphics_25,x:73.075,y:59.25}).wait(1).to({graphics:mask_graphics_26,x:76.9,y:51}).wait(1).to({graphics:mask_graphics_27,x:80.75,y:42.475}).wait(1).to({graphics:mask_graphics_28,x:84.575,y:31.075}).wait(1).to({graphics:mask_graphics_29,x:88.45,y:20.25}).wait(1).to({graphics:mask_graphics_30,x:98.425,y:15.5}).wait(1).to({graphics:mask_graphics_31,x:108.425,y:7.2}).wait(1).to({graphics:mask_graphics_32,x:118.45,y:-1.175}).wait(1).to({graphics:mask_graphics_33,x:128.45,y:-10.025}).wait(1).to({graphics:mask_graphics_34,x:138.475,y:-18.875}).wait(1).to({graphics:mask_graphics_35,x:133.75,y:-10.225}).wait(1).to({graphics:mask_graphics_36,x:129.025,y:-3.025}).wait(1).to({graphics:mask_graphics_37,x:124.275,y:5.425}).wait(1).to({graphics:mask_graphics_38,x:119.55,y:14.625}).wait(1).to({graphics:mask_graphics_39,x:114.975,y:20.25}).wait(1).to({graphics:mask_graphics_40,x:116.5,y:29.7}).wait(1).to({graphics:mask_graphics_41,x:118.175,y:39.175}).wait(1).to({graphics:mask_graphics_42,x:119.875,y:48.625}).wait(1).to({graphics:mask_graphics_43,x:121.55,y:58.1}).wait(1).to({graphics:mask_graphics_44,x:123.225,y:69.65}).wait(1).to({graphics:mask_graphics_45,x:126.55,y:59.025}).wait(1).to({graphics:mask_graphics_46,x:129.9,y:49.5}).wait(1).to({graphics:mask_graphics_47,x:133.275,y:41.15}).wait(1).to({graphics:mask_graphics_48,x:136.625,y:30.7}).wait(1).to({graphics:mask_graphics_49,x:140,y:20.25}).wait(1).to({graphics:mask_graphics_50,x:144.875,y:21.275}).wait(1).to({graphics:mask_graphics_51,x:149.75,y:22.325}).wait(1).to({graphics:mask_graphics_52,x:154.625,y:23.35}).wait(1).to({graphics:mask_graphics_53,x:159.5,y:24.4}).wait(1).to({graphics:mask_graphics_54,x:164.375,y:25.425}).wait(1));

	// freeText
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(22.4,9.85,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_11();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_12();
	this.instance_2.setTransform(22.4,9.85,0.5,0.5);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_1},{t:this.instance_2}]},54).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,300,50);


(lib.movieClipEvent = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Cup_Arabica3();
	this.instance.setTransform(250,0,0.136,0.136);

	this.instance_1 = new lib.Cup_Hazelnut();
	this.instance_1.setTransform(0,0,0.136,0.136);

	this.instance_2 = new lib.Cup_Caramel();
	this.instance_2.setTransform(250,0,0.136,0.136);

	this.instance_3 = new lib.Cup_Macchiato();
	this.instance_3.setTransform(0,0,0.136,0.136);

	this.instance_4 = new lib.Cup_Cappucino();
	this.instance_4.setTransform(250,0,0.136,0.136);

	this.instance_5 = new lib.Cup_MatchaLatte();
	this.instance_5.setTransform(0,0,0.136,0.136);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},29).to({state:[{t:this.instance_5},{t:this.instance_4}]},30).to({state:[{t:this.instance_1},{t:this.instance}]},30).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,561.8);


(lib.logoAromaCafe = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_13
	this.instance = new lib.logoaromacafe();
	this.instance.setTransform(0,0,0.1434,0.1434);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(143).to({_off:false},0).wait(24).to({_off:true},1).wait(11).to({_off:false},0).wait(139).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,484.9,392);


(lib.Cup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Black_Eye
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1,3,true).p("AhAiOQAKgDALAAQAsAAAgArQAgAqAAA8QAAA8ggArQggArgsAAQgLAAgKgD");
	this.shape.setTransform(155.6375,164.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#241E29").s().p("AE5BnQgggqABg9QgBg7AggsQAggqAtAAQALAAAKADQAWAFASARQAIAIAHAJQAgAsABA7QgBA9ggAqQgHAKgIAIQgSARgWAGQgKACgLAAQgtAAgggrgAnSBnQgfgqAAg9QAAg7AfgsQAggqAtAAQALAAAKADQAWAFASARQAIAIAHAJQAhAsgBA7QABA9ghAqQgHAKgIAIQgSARgWAGQgKACgLAAQgtAAgggrg");
	this.shape_1.setTransform(186.1,164.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Body
	this.instance = new lib.NewProject9();
	this.instance.setTransform(0,0,0.718,0.718);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Cup, new cjs.Rectangle(0,0,394.9,287.2), null);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.Scene_1_webLink = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// webLink
	this.webLinkButton = new lib.webLinkButton();
	this.webLinkButton.name = "webLinkButton";
	this.webLinkButton.setTransform(1081.2,672.25,1,1,0,0,0,140,30);
	this.webLinkButton._off = true;
	new cjs.ButtonHelper(this.webLinkButton, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.webLinkButton).wait(199).to({_off:false},0).wait(122));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_video = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// video
	this.instance = new lib.an_Video({'id': '', 'src':'videos/Coffee%20Shop%20Promotional%20Video.mp4', 'autoplay':true, 'controls':true, 'muted':false, 'loop':true, 'poster':'', 'preload':true, 'class':'video'});

	this.instance.setTransform(640.2,412.75,1.8948,1.4211,0,0,0,200.1,150);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(184).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_titleText = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// titleText
	this.instance = new lib.movieClipTitleText();
	this.instance.setTransform(640,131.1,1,1,0,0,0,640,44.6);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(199).to({_off:false},0).wait(122));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_seller3Button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// seller3Button
	this.seller3Button = new lib.seller3Button();
	this.seller3Button.name = "seller3Button";
	this.seller3Button.setTransform(-64.05,564.5,1,1,0,0,0,316,168.5);
	this.seller3Button._off = true;
	new cjs.ButtonHelper(this.seller3Button, 0, 1, 2, false, new lib.seller3Button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.seller3Button).wait(199).to({_off:false},0).wait(35).to({x:136},10).wait(5).to({x:-64.05},10).wait(62));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_seller2Button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// seller2Button
	this.seller2Button = new lib.seller2Button();
	this.seller2Button.name = "seller2Button";
	this.seller2Button.setTransform(-64.05,414.5,1,1,0,0,0,316,168.5);
	this.seller2Button._off = true;
	new cjs.ButtonHelper(this.seller2Button, 0, 1, 2, false, new lib.seller2Button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.seller2Button).wait(199).to({_off:false},0).wait(65).to({x:136},10).wait(5).to({x:-64.05},10).wait(32));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_seller1Button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// seller1Button
	this.seller1Button = new lib.seller1Button();
	this.seller1Button.name = "seller1Button";
	this.seller1Button.setTransform(-64.05,265.5,1,1,0,0,0,316,168.5);
	this.seller1Button._off = true;
	new cjs.ButtonHelper(this.seller1Button, 0, 1, 2, false, new lib.seller1Button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.seller1Button).wait(199).to({_off:false},0).wait(95).to({x:136},10).wait(5).to({x:-64.05},10).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_pressContinue = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// pressContinue
	this.pressContinueButton = new lib.pressContinueButton();
	this.pressContinueButton.name = "pressContinueButton";
	this.pressContinueButton.setTransform(640,672.55,1,1,0,0,0,150,28.4);
	this.pressContinueButton._off = true;
	new cjs.ButtonHelper(this.pressContinueButton, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.pressContinueButton).wait(184).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_logoAromaCafe = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// logoAromaCafe
	this.instance = new lib.logoAromaCafe("synched",143);
	this.instance.setTransform(640.05,360,1,1,0,0,0,242.5,196);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(139).to({_off:false},0).wait(25).to({startPosition:179},0).to({regX:242.6,regY:196.1,scaleX:0.3772,scaleY:0.3772,y:98.25,startPosition:184},15).wait(20).to({startPosition:204},0).wait(60).to({startPosition:264},0).wait(35).to({startPosition:299},0).wait(20).to({startPosition:300},0).wait(5).to({startPosition:305},0).wait(1).to({startPosition:306},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_freeText = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// freeText
	this.instance = new lib.movieClipFree();
	this.instance.setTransform(640,465.5,1,1,0,0,0,150,25);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(229).to({_off:false},0).wait(92));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_eventImage = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eventImage
	this.instance = new lib.movieClipEvent();
	this.instance.setTransform(641,628.9,1,1,0,0,0,375,280.9);

	this.instance_1 = new lib.Bitmap3();
	this.instance_1.setTransform(516,348,0.136,0.136);

	this.instance_2 = new lib.Bitmap2();
	this.instance_2.setTransform(266,348,0.136,0.136);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},214).to({state:[{t:this.instance_2},{t:this.instance_1}]},105).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Cup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Cup
	this.instance = new lib.Cup("synched",0);
	this.instance.setTransform(1330.65,144.9,0.2539,0.2539,0,0,0,197.6,144);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:-13.9936,x:1265.35,y:144.85},14).to({regX:197.8,regY:143.9,rotation:-14.996,x:1260.7},1).wait(14).to({startPosition:0},0).to({regX:197.6,regY:144,rotation:0,x:1314.95,y:141.6},16).to({regY:144.1,scaleX:0.7699,scaleY:0.7699,guide:{path:[1315,141.7,1315.9,139.8,1315.7,137.5,1314.9,130.3,1311.7,121.9,1309.4,115.7,1304.8,106.8,1297.3,92,1290.5,82.4,1290,81.7,1289.4,81,1280.8,69.1,1270.5,61,1257.9,51.1,1242.2,46.4,1225.1,41.4,1209.2,44.2,1191.8,47.2,1177.2,59.4,1165.1,69.5,1155.7,85.2,1144.2,104.3,1136.1,130.1,1131.3,145.8,1124.3,176.9,1119.3,164.8,1116.1,158.8,1110.8,149,1104,142.5,1096,134.6,1084.9,130.8,1072.8,126.6,1061.6,128.7,1051.2,130.7,1042,138.2,1035.1,143.9,1028.2,153.6,1004.3,187.5,993.5,235.3,986.8,264.9,982.1,322.2,978.1,312.2,975.1,306.4,970.6,297.8,965.2,291.6,958.8,284.3,950.5,279.6,941.3,274.4,931.2,273.2,919.5,271.7,907.2,275.9,895.9,279.7,886.8,287.3,879,293.8,872.7,303.4,867.9,310.5,862.6,321.5,843.7,360.7,836,402.6,828.1,444.4,831.9,486.3,831.9,486.3,831.9,486.3]}},55).to({scaleX:0.7793,scaleY:0.556,x:830.6,y:517.65},12).to({regX:197.7,scaleY:0.7644,guide:{path:[830.6,517.7,832.1,524.3,833.8,530.6,834.5,533.1,834.7,534.5,834.9,536.7,834.2,538.3,833.5,540.3,831.4,541.4,829.9,542.2,828.6,542.1,827.9,542,827.2,541.8,825.6,541.2,824.6,539.6,824,538.5,823.4,536.4,806,474.8,803.5,387.7,802.8,360,803.1,312.2,803.5,257.7,803.2,236.9,802.8,204.1,799.7,183.9,795.3,154.9,783.9,133.1,778.1,122,770.6,115,761.3,106.3,750.1,104.7,739.2,103.1,727.3,108.2,717.7,112.3,707.9,120.6,679.7,144.2,663.3,180.1,649,211.4,644.5,250.3,642.9,263.9,642.3,280.9]}},14).to({regX:197.5,regY:143.6,scaleY:0.7793,guide:{path:[642.3,280.9,641.6,299.3,642.2,321.8,642.3,326.4,642.5,332.6]}},1).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.MulmedLab2A = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,184,185,199,229,234,244,249,259,264,274,279,289,294,304,309,319,320];
	this.streamSoundSymbolsList[1] = [{id:"Cropped",startFrame:1,endFrame:184,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_1 = function() {
		var soundInstance = playSound("Cropped",0);
		this.InsertIntoSoundStreamData(soundInstance,1,184,1);
	}
	this.frame_184 = function() {
		this.pressContinueButton = this.pressContinue.pressContinueButton;
		this.stop();
		
		stage.enableMouseOver();
		
		this.pressContinueButton.addEventListener('click', pressContinue.bind(this));
		
		function pressContinue(){
			this.gotoAndPlay(199);
		}
	}
	this.frame_185 = function() {
		this.pressContinueButton = undefined;this.pressContinueButton = this.pressContinue.pressContinueButton;
	}
	this.frame_199 = function() {
		this.webLinkButton = this.webLink.webLinkButton;
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
	}
	this.frame_229 = function() {
		this.stop();
		
		stage.enableMouseOver();
		
		//seller3button
		this.seller3Button.addEventListener('mouseover', fSeller3.bind(this));
		
		function fSeller3(){
			this.gotoAndPlay(234);
		}
		
		this.seller3Button.addEventListener('mouseout', fSeller3out.bind(this));
		
		function fSeller3out(){
			this.gotoAndPlay(249);
		}
		
		//seller2button
		this.seller2Button.addEventListener('mouseover', fSeller2.bind(this));
		
		function fSeller2(){
			this.gotoAndPlay(264);
		}
		
		this.seller2Button.addEventListener('mouseout', fSeller2out.bind(this));
		
		function fSeller2out(){
			this.gotoAndPlay(279);
		}
		
		//seller1button
		this.seller1Button.addEventListener('mouseover', fSeller1.bind(this));
		
		function fSeller1(){
			this.gotoAndPlay(294);
		}
		
		this.seller1Button.addEventListener('mouseout', fSeller1out.bind(this));
		
		function fSeller1out(){
			this.gotoAndPlay(309);
		}
		
		//hyperlink
		this.webLinkButton.addEventListener('click', goToWebsite.bind(this));
		
		function goToWebsite(){
			window.open('https://aromacafe.co.id/');
		}
	}
	this.frame_234 = function() {
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
	}
	this.frame_244 = function() {
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
		this.stop();
	}
	this.frame_249 = function() {
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
	}
	this.frame_259 = function() {
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
		this.gotoAndStop(229);
	}
	this.frame_264 = function() {
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
	}
	this.frame_274 = function() {
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
		this.stop();
	}
	this.frame_279 = function() {
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
	}
	this.frame_289 = function() {
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
		this.gotoAndStop(229);
	}
	this.frame_294 = function() {
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
	}
	this.frame_304 = function() {
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
		this.stop();
	}
	this.frame_309 = function() {
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
	}
	this.frame_319 = function() {
		this.webLinkButton = undefined;this.webLinkButton = this.webLink.webLinkButton;
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
		this.gotoAndStop(229);
	}
	this.frame_320 = function() {
		this.webLinkButton = undefined;this.webLinkButton = this.webLink.webLinkButton;
		if(this.seller3Button.parent == undefined || this.seller3Button.parent == this)
		this.seller3Button = this.seller3Button.seller3Button;
		if(this.seller2Button.parent == undefined || this.seller2Button.parent == this)
		this.seller2Button = this.seller2Button.seller2Button;
		if(this.seller1Button.parent == undefined || this.seller1Button.parent == this)
		this.seller1Button = this.seller1Button.seller1Button;
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(183).call(this.frame_184).wait(1).call(this.frame_185).wait(14).call(this.frame_199).wait(30).call(this.frame_229).wait(5).call(this.frame_234).wait(10).call(this.frame_244).wait(5).call(this.frame_249).wait(10).call(this.frame_259).wait(5).call(this.frame_264).wait(10).call(this.frame_274).wait(5).call(this.frame_279).wait(10).call(this.frame_289).wait(5).call(this.frame_294).wait(10).call(this.frame_304).wait(5).call(this.frame_309).wait(10).call(this.frame_319).wait(1).call(this.frame_320).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(640,360);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(199).to({regX:0.5,regY:0.8,scaleX:0.303,scaleY:0.303,x:640.05,y:98.85},0).wait(15).to({scaleX:1,scaleY:1,y:360.7},15).wait(92));

	// pressContinue_obj_
	this.pressContinue = new lib.Scene_1_pressContinue();
	this.pressContinue.name = "pressContinue";
	this.pressContinue.depth = 0;
	this.pressContinue.isAttachedToCamera = 0
	this.pressContinue.isAttachedToMask = 0
	this.pressContinue.layerDepth = 0
	this.pressContinue.layerIndex = 0
	this.pressContinue.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.pressContinue).wait(185).to({_off:true},1).wait(135));

	// video_obj_
	this.video = new lib.Scene_1_video();
	this.video.name = "video";
	this.video.depth = 0;
	this.video.isAttachedToCamera = 0
	this.video.isAttachedToMask = 0
	this.video.layerDepth = 0
	this.video.layerIndex = 1
	this.video.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.video).wait(185).to({_off:true},1).wait(135));

	// Asap_obj_
	this.Asap = new lib.Scene_1_Asap();
	this.Asap.name = "Asap";
	this.Asap.depth = 0;
	this.Asap.isAttachedToCamera = 0
	this.Asap.isAttachedToMask = 0
	this.Asap.layerDepth = 0
	this.Asap.layerIndex = 2
	this.Asap.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Asap).wait(173).to({_off:true},1).wait(147));

	// logoAromaCafe_obj_
	this.logoAromaCafe = new lib.Scene_1_logoAromaCafe();
	this.logoAromaCafe.name = "logoAromaCafe";
	this.logoAromaCafe.depth = 0;
	this.logoAromaCafe.isAttachedToCamera = 0
	this.logoAromaCafe.isAttachedToMask = 0
	this.logoAromaCafe.layerDepth = 0
	this.logoAromaCafe.layerIndex = 3
	this.logoAromaCafe.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.logoAromaCafe).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(60).to({regX:-0.4,regY:-0.1,scaleX:1,scaleY:1,x:0,y:-0.05},0).wait(62));

	// Cup_obj_
	this.Cup = new lib.Scene_1_Cup();
	this.Cup.name = "Cup";
	this.Cup.setTransform(1330.6,144.8,1,1,0,0,0,1330.6,144.8);
	this.Cup.depth = 0;
	this.Cup.isAttachedToCamera = 0
	this.Cup.isAttachedToMask = 0
	this.Cup.layerDepth = 0
	this.Cup.layerIndex = 4
	this.Cup.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Cup).wait(29).to({x:1315.45,y:140.45},16).wait(55).to({x:1011,y:352.1},12).wait(14).to({x:1330.6,y:144.8},1).to({_off:true},9).wait(185));

	// Lingkaran_obj_
	this.Lingkaran = new lib.Scene_1_Lingkaran();
	this.Lingkaran.name = "Lingkaran";
	this.Lingkaran.setTransform(569.8,349.8,1,1,0,0,0,569.8,349.8);
	this.Lingkaran.depth = 0;
	this.Lingkaran.isAttachedToCamera = 0
	this.Lingkaran.isAttachedToMask = 0
	this.Lingkaran.layerDepth = 0
	this.Lingkaran.layerIndex = 5
	this.Lingkaran.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Lingkaran).to({_off:true},136).wait(185));

	// bg_obj_
	this.bg = new lib.Scene_1_bg();
	this.bg.name = "bg";
	this.bg.setTransform(637.4,360,1,1,0,0,0,637.4,360);
	this.bg.depth = 0;
	this.bg.isAttachedToCamera = 0
	this.bg.isAttachedToMask = 0
	this.bg.layerDepth = 0
	this.bg.layerIndex = 6
	this.bg.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.bg).wait(198).to({_off:true},1).wait(122));

	// webLink_obj_
	this.webLink = new lib.Scene_1_webLink();
	this.webLink.name = "webLink";
	this.webLink.depth = 0;
	this.webLink.isAttachedToCamera = 0
	this.webLink.isAttachedToMask = 0
	this.webLink.layerDepth = 0
	this.webLink.layerIndex = 7
	this.webLink.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.webLink).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(120).to({regX:-0.4,regY:-0.1,scaleX:1,scaleY:1,x:0,y:-0.05},0).wait(2));

	// subtitleText_obj_
	this.subtitleText = new lib.Scene_1_subtitleText();
	this.subtitleText.name = "subtitleText";
	this.subtitleText.depth = 0;
	this.subtitleText.isAttachedToCamera = 0
	this.subtitleText.isAttachedToMask = 0
	this.subtitleText.layerDepth = 0
	this.subtitleText.layerIndex = 8
	this.subtitleText.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.subtitleText).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(120).to({regX:-0.4,regY:-0.1,scaleX:1,scaleY:1,x:0,y:-0.05},0).wait(2));

	// titleText_obj_
	this.titleText = new lib.Scene_1_titleText();
	this.titleText.name = "titleText";
	this.titleText.depth = 0;
	this.titleText.isAttachedToCamera = 0
	this.titleText.isAttachedToMask = 0
	this.titleText.layerDepth = 0
	this.titleText.layerIndex = 9
	this.titleText.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.titleText).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(120).to({regX:-0.4,regY:-0.1,scaleX:1,scaleY:1,x:0,y:-0.05},0).wait(2));

	// discountImage_obj_
	this.discountImage = new lib.Scene_1_discountImage();
	this.discountImage.name = "discountImage";
	this.discountImage.depth = 0;
	this.discountImage.isAttachedToCamera = 0
	this.discountImage.isAttachedToMask = 0
	this.discountImage.layerDepth = 0
	this.discountImage.layerIndex = 10
	this.discountImage.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.discountImage).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(15).to({regY:-10.3,scaleX:3.3007,scaleY:3.3007,y:0.15},0).wait(105).to({regX:-0.4,regY:-0.1,scaleX:1,scaleY:1,x:0,y:-0.05},0).wait(2));

	// eventText_obj_
	this.eventText = new lib.Scene_1_eventText();
	this.eventText.name = "eventText";
	this.eventText.depth = 0;
	this.eventText.isAttachedToCamera = 0
	this.eventText.isAttachedToMask = 0
	this.eventText.layerDepth = 0
	this.eventText.layerIndex = 11
	this.eventText.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.eventText).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(122));

	// freeText_obj_
	this.freeText = new lib.Scene_1_freeText();
	this.freeText.name = "freeText";
	this.freeText.depth = 0;
	this.freeText.isAttachedToCamera = 0
	this.freeText.isAttachedToMask = 0
	this.freeText.layerDepth = 0
	this.freeText.layerIndex = 12
	this.freeText.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.freeText).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(15).to({regY:-10.3,scaleX:3.3007,scaleY:3.3007,y:0.15},0).wait(15).to({regX:-0.4,regY:-0.1,scaleX:1,scaleY:1,x:0,y:-0.05},0).wait(92));

	// eventImage_obj_
	this.eventImage = new lib.Scene_1_eventImage();
	this.eventImage.name = "eventImage";
	this.eventImage.depth = 0;
	this.eventImage.isAttachedToCamera = 0
	this.eventImage.isAttachedToMask = 0
	this.eventImage.layerDepth = 0
	this.eventImage.layerIndex = 13
	this.eventImage.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.eventImage).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(15).to({regY:-10.3,scaleX:3.3007,scaleY:3.3007,y:0.15},0).wait(105).to({regX:-0.4,regY:-0.1,scaleX:1,scaleY:1,x:0,y:-0.05},0).wait(2));

	// seller3Button_obj_
	this.seller3Button = new lib.Scene_1_seller3Button();
	this.seller3Button.name = "seller3Button";
	this.seller3Button.depth = 0;
	this.seller3Button.isAttachedToCamera = 0
	this.seller3Button.isAttachedToMask = 0
	this.seller3Button.layerDepth = 0
	this.seller3Button.layerIndex = 14
	this.seller3Button.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.seller3Button).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(35).to({regX:-0.4,regY:-0.1,scaleX:1,scaleY:1,x:0,y:-0.05},0).wait(87));

	// seller2Button_obj_
	this.seller2Button = new lib.Scene_1_seller2Button();
	this.seller2Button.name = "seller2Button";
	this.seller2Button.depth = 0;
	this.seller2Button.isAttachedToCamera = 0
	this.seller2Button.isAttachedToMask = 0
	this.seller2Button.layerDepth = 0
	this.seller2Button.layerIndex = 15
	this.seller2Button.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.seller2Button).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(35).to({regX:-0.4,regY:-0.1,scaleX:1,scaleY:1,x:0,y:-0.05},0).wait(87));

	// seller1Button_obj_
	this.seller1Button = new lib.Scene_1_seller1Button();
	this.seller1Button.name = "seller1Button";
	this.seller1Button.depth = 0;
	this.seller1Button.isAttachedToCamera = 0
	this.seller1Button.isAttachedToMask = 0
	this.seller1Button.layerDepth = 0
	this.seller1Button.layerIndex = 16
	this.seller1Button.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.seller1Button).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(35).to({regX:-0.4,regY:-0.1,scaleX:1,scaleY:1,x:0,y:-0.05},0).wait(87));

	// background_obj_
	this.background = new lib.Scene_1_background();
	this.background.name = "background";
	this.background.depth = 0;
	this.background.isAttachedToCamera = 0
	this.background.isAttachedToMask = 0
	this.background.layerDepth = 0
	this.background.layerIndex = 17
	this.background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.background).wait(199).to({regX:445.9,regY:-10.5,scaleX:3.3006,scaleY:3.3006,x:-0.15,y:-0.2},0).wait(30).to({regX:-0.4,regY:-0.1,scaleX:1,scaleY:1,x:0,y:-0.05},0).wait(92));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(260,336.9,1120.8,572.9);
// library properties:
lib.properties = {
	id: '058B23562847E94990FE1E57D549170E',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap2.png?1670490190652", id:"Bitmap2"},
		{src:"images/Bitmap3.png?1670490190652", id:"Bitmap3"},
		{src:"images/Bitmap4.png?1670490190652", id:"Bitmap4"},
		{src:"images/Bitmap5.png?1670490190652", id:"Bitmap5"},
		{src:"images/Bitmap6.png?1670490190652", id:"Bitmap6"},
		{src:"images/Bitmap7.png?1670490190652", id:"Bitmap7"},
		{src:"images/Bitmap8.png?1670490190652", id:"Bitmap8"},
		{src:"images/Cup_Arabica3.png?1670490190652", id:"Cup_Arabica3"},
		{src:"images/Cup_Cappucino.png?1670490190652", id:"Cup_Cappucino"},
		{src:"images/Cup_Caramel.png?1670490190652", id:"Cup_Caramel"},
		{src:"images/Cup_Hazelnut.png?1670490190652", id:"Cup_Hazelnut"},
		{src:"images/Cup_Macchiato.png?1670490190652", id:"Cup_Macchiato"},
		{src:"images/Cup_MatchaLatte.png?1670490190652", id:"Cup_MatchaLatte"},
		{src:"images/logoaromacafe.png?1670490190652", id:"logoaromacafe"},
		{src:"images/MulmedLab2A_atlas_1.png?1670490190509", id:"MulmedLab2A_atlas_1"},
		{src:"sounds/Cropped.mp3?1670490190652", id:"Cropped"},
		{src:"https://code.jquery.com/jquery-3.4.1.min.js?1670490190652", id:"lib/jquery-3.4.1.min.js"},
		{src:"components/sdk/anwidget.js?1670490190652", id:"sdk/anwidget.js"},
		{src:"components/video/src/video.js?1670490190652", id:"an.Video"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['058B23562847E94990FE1E57D549170E'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
function _updateVisibility(evt) {
	var parent = this.parent;
	var detach = this.stage == null || this._off || !parent;
	while(parent) {
		if(parent.visible) {
			parent = parent.parent;
		}
		else{
			detach = true;
			break;
		}
	}
	detach = detach && this._element && this._element._attached;
	if(detach) {
		this._element.detach();
		this.dispatchEvent('detached');
		stage.removeEventListener('drawstart', this._updateVisibilityCbk);
		this._updateVisibilityCbk = false;
	}
}
function _handleDrawEnd(evt) {
	if(this._element && this._element._attached) {
		var props = this.getConcatenatedDisplayProps(this._props), mat = props.matrix;
		var tx1 = mat.decompose(); var sx = tx1.scaleX; var sy = tx1.scaleY;
		var dp = window.devicePixelRatio || 1; var w = this.nominalBounds.width * sx; var h = this.nominalBounds.height * sy;
		mat.tx/=dp;mat.ty/=dp; mat.a/=(dp*sx);mat.b/=(dp*sx);mat.c/=(dp*sy);mat.d/=(dp*sy);
		this._element.setProperty('transform-origin', this.regX + 'px ' + this.regY + 'px');
		var x = (mat.tx + this.regX*mat.a + this.regY*mat.c - this.regX);
		var y = (mat.ty + this.regX*mat.b + this.regY*mat.d - this.regY);
		var tx = 'matrix(' + mat.a + ',' + mat.b + ',' + mat.c + ',' + mat.d + ',' + x + ',' + y + ')';
		this._element.setProperty('transform', tx);
		this._element.setProperty('width', w);
		this._element.setProperty('height', h);
		this._element.update();
	}
}

function _tick(evt) {
	var stage = this.stage;
	stage&&stage.on('drawend', this._handleDrawEnd, this, true);
	if(!this._updateVisibilityCbk) {
		this._updateVisibilityCbk = stage.on('drawstart', this._updateVisibility, this, false);
	}
}
function _componentDraw(ctx) {
	if(this._element && !this._element._attached) {
		this._element.attach($('#dom_overlay_container'));
		this.dispatchEvent('attached');
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;