class SceneLockerRoom extends Phaser.Scene {
    constructor() {
      super({ key: "SceneLockerRoom" });
      
    }
    
  // width then length 
  //todo
  //fix door enter code
    preload() {
    	this.load.audio('maintheme','content/maintheme.mp3');
        this.load.image('bgLocker', 'content/LockerRoomMiddle.png'); 
        this.load.image('platform', 'content/platform.png');
        this.load.spritesheet('dude', 'content/dudeRun.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeJump','content/dudeJump.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeIdle','content/BUCfrontv2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('door1', 'content/door1.png');
        this.load.image('door2', 'content/door2.png');
        this.load.image('coin', 'content/coin.png');
        this.load.image('enemy', 'content/BUCspikes.png');
        this.load.image('arrow', 'content/arrow.png');
        this.load.image('platform2', 'content/platform2.png');
        this.load.image('mConc', 'content/BlankSprite.png');
        this.load.image('HallwayLocker', 'content/HallwayLocker.png');
        this.load.audio('jump1','content/jump1.wav');
        this.load.image('footballSign', 'content/footballSign.png');
        this.load.image('BackArrow', 'content/LeftBackArrow.png');
      
    }
    create() {
    
      	this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
        this.bg2 = this.add.image(0,0,'bgLocker');
        this.bg2.setOrigin(0.0,0.0);
        this.bg2.setScale(2);
        this.bg2.setScrollFactor(0);  

    	this.maintheme = this.sound.add('maintheme'); //this is the mainmenu sound
    	this.maintheme.play();
          
        this.door1 = this.physics.add.staticSprite(135,379,'door1'); //working door
        this.door1.setOrigin(0.5,0.5);
        
        this.door2 = this.physics.add.staticSprite(600,379,'door1'); //working door
        this.door2.setOrigin(0.5,0.5);
        
        this.door3 = this.physics.add.staticSprite(408,379,'door1'); //working door
        this.door3.setOrigin(0.5,0.5);
        
        this.fSign = this.add.image(408,325,'footballSign');
        this.fSign.setScale(2);
        
        this.bArrow = this.add.image(135,325,'BackArrow');
        
        this.locker = this.add.image(16,348,'HallwayLocker').setScale(2);
        this.locker = this.add.image(48,348,'HallwayLocker').setScale(2);
        this.locker = this.add.image(80,348,'HallwayLocker').setScale(2);
        this.locker = this.add.image(200,348,'HallwayLocker').setScale(2);
        
        
        for(var row = 0; row < 5; row++){
        this.locker = this.add.image(784 - row*32,348,'HallwayLocker').setScale(2);
        }
        
        for(var row = 0; row < 3; row++){
        this.locker = this.add.image(540 - row*32,348,'HallwayLocker').setScale(2);
        }
        
       //this.door2 = this.physics.add.staticSprite(700,400,'door1');
       //this.door2.setOrigin(0,1);
        platforms = this.physics.add.staticGroup();
        this.movingPlatforms = this.add.group();
        this.enemies = this.add.group();

//floor-platorms
        /*for(var platform = 0; platform < 10;platform++){
        platforms.create(400 + platform*16, 300, 'mBrick'); //highest platform
        platforms.create(350 + platform*16, 380, 'mBrick'); //lower platform
        platforms.create(900 + platform*16, 240, 'mBrick');
        platforms.create(700 + platform*16, 300, 'mBrick'); 
        platforms.create(1300 + platform*16, 300, 'mBrick'); 
        }
        for(var splatform = 0; splatform < 5; splatform++){
        platforms.create( 1150 + splatform*16, 368, 'mBrick');
        platforms.create( 1250 + splatform*16, 300, 'mBrick');
        }
		for(var wall = 0; wall <23;wall++){
        platforms.create(1150, 0 +wall*16, 'mBrick'); //wall after platforms
        }
        for(var wall = 0; wall <23;wall++){
        platforms.create(1150, 0 +wall*16, 'mBrick'); //wall after platforms
        }
        for(var spawnenemy = 0; spawnenemy <18; spawnenemy++){
        this.enemy = new Enemy(this,600 + spawnenemy*24,420,"enemy").setScale(1.5,1.5);
		this.enemies.add(this.enemy);
        }
		this.enemy = new Enemy(this, 1174, 352,"enemy").setScale(1.5,1.5);
		this.enemies.add(this.enemy);
		this.enemy = new Enemy(this, 1274, 250,"enemy").setScale(1.5,1.5);
		this.enemies.add(this.enemy);
        
        for(var spawnenemy = 0;  spawnenemy <10; spawnenemy++){
        this.enemy = new Enemy(this,1400 + spawnenemy*24,420,"enemy").setScale(1.5,1.5);
		this.enemies.add(this.enemy);
        }*/
        
        
        for(var floor = 0; floor <102; floor++){
        platforms.create(0 + floor*32, 427, 'mConc').setScale(2).refreshBody(0,0);
        }
        
        /*
        for(var plat = 0; plat < 1; plat++){
        platforms.create(384,300, 'lBrick') //lower platform left end piece
        platforms.create(334,380, 'lBrick') //upper platform left end piece
        platforms.create(550,300, 'rBrick') //lower platform right end piece
        platforms.create(510,380, 'rBrick') //upper platform right end piece
		*/
        player = this.physics.add.sprite(100, 375, 'dude');
        player.setSize(10,28, true);
        player.setScale(2);
		this.cameras.main.setBounds(0, 0, 800, 450);        
        this.cameras.main.startFollow(player, false, 0.2, 0.2);
        player.setCollideWorldBounds(true);


        this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });

        this.anims.create({
          key: 'jump',
          frames: this.anims.generateFrameNumbers('dudeJump', { start: 0, end: 1 }),
          frameRate:10,
          repeat: -1
        })

        this.anims.create({
          key: 'idle',
          frames: this.anims.generateFrameNumbers('dudeIdle', {start: 0,end: 0}),
          frameRate: 10,
          repeat: -1
        });

        coins = this.physics.add.staticGroup();
      //coins.create(360,360, 'coin').setScale(1.5);
      //coins.create(420,360, 'coin').setScale(1.5);
      //coins.create(480,360, 'coin').setScale(1.5);
        cursors = this.input.keyboard.createCursorKeys();

        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
        scoreText.setScrollFactor(0);


        healthText = this.add.text(550, 16, 'Health: ' + health, {fontSize: '32px', fill: '#000'});
        healthText.setScrollFactor(0);
/*
        this.verticalPlatform = new MovingPlatformVertical(
          this,
          this.game.config.width * 0.5,
          this.game.config.height * 0.5, "mBrick" , 100); 
        this.verticalPlatform.setData("distance", 70);
        this.movingPlatforms.add(this.verticalPlatform);
        */
/*
		this.enemy = new Enemy(this,942,400,"enemy").setScale(1.5,1.5);
		this.enemies.add(this.enemy);
    	this.enemy1 = new Enemy(this,966,400,"enemy").setScale(1.5,1.5);
        this.enemies.add(this.enemy1);
        this.enemy2 = new Enemy(this,990,400,"enemy").setScale(1.5,1.5);
		this.enemies.add(this.enemy2);
    	this.enemy3 = new Enemy(this,1014,400,"enemy").setScale(1.5,1.5);
        this.enemies.add(this.enemy3);
*/
        this.physics.add.collider(player, platforms);
        //this.physics.add.overlap(player, this.enemy, loseHealthMax, null, this);
        this.physics.add.overlap(player, door1, enterDoor1, null, this);
        this.physics.add.overlap(player, door2, enterDoor1, null, this);
        this.physics.add.overlap(player, door3, enterDoor1, null, this);
        this.physics.add.overlap(player, coins, collectCoin, null, this);
        this.physics.add.collider(this.enemies, platforms);
        this.physics.add.overlap(player, this.enemies, loseHealth, null, this);

    }
	

    update(){
      if (cursors.left.isDown || this.keyA.isDown)
      {
          player.setVelocityX(-160);
          if(!jumping)
          {
            player.anims.play('right', true);
          }
          player.setFlip(-1, 0)
      }
      else if (cursors.right.isDown || this.keyD.isDown)
      {
          player.setVelocityX(160);
          if(!jumping)
          {
            player.anims.play('right', true);
          }
          player.setFlip(0, 0)
      }
      else
      {
        if(!jumping)
        {
          player.anims.play('idle', true);
        }
          player.setVelocityX(0);
      }

      if(player.body.touching.down)
      {
        jumping = false;
      }
  
      if (cursors.up.isDown && (player.body.touching.down || player.locked) || this.keyW.isDown && (player.body.touching.down || player.locked))
      {
        player.locked = false;
            player.lockedTo = null;
          player.setVelocityY(-240);
          player.anims.play('jump',true);
          this.jump1 = this.sound.add('jump1').setVolume(0.3);
    	  this.jump1.play();
          jumping = true;
      }
      if(player.x > this.door1.x - this.door1.width/2 && player.x < this.door1.width/2 + this.door1.x && player.y < this.door1.y + 10){
        this.door1.setTexture('door2');
        if ((cursors.up.isDown || this.keyW.isDown) /*&& jumping == false*/)
        {
          this.maintheme.stop();
          this.scene.start("SceneLevel1");
        }
      }else{
        this.door1.setTexture('door1');
      }
      if(player.x > this.door2.x - this.door2.width/2 && player.x < this.door2.width/2 + this.door2.x && player.y < this.door2.y + 10){
        this.door2.setTexture('door2');
        if ((cursors.up.isDown || this.keyW.isDown) /*&& jumping == false*/)
        {
          this.maintheme.stop();
          this.scene.start("SceneBasketball");
        }
      }else{
        this.door2.setTexture('door1');
      }
      if(player.x > this.door3.x - this.door3.width/2 && player.x < this.door3.width/2 + this.door3.x && player.y < this.door3.y + 10){
        this.door3.setTexture('door2');
        if ((cursors.up.isDown || this.keyW.isDown) /*&& jumping == false*/)
        {
          this.maintheme.stop();
          this.scene.start("SceneFrogger");
        }
      }else{
        this.door3.setTexture('door1');
      }
    }
    

  }
