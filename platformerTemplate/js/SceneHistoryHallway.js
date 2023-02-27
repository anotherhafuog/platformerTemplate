class SceneHistoryHallway extends Phaser.Scene {
    constructor() {
      super({ key: "SceneHistoryHallway" });
      
    }
    preload() {
    this.load.audio('maintheme','content/maintheme.mp3');
        this.load.image('Hills', 'content/HallwayBG.png'); 
        this.load.image('platform', 'content/platform.png');
        this.load.spritesheet('dude', 'content/dudeRun.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('watermove', 'content/CycleWaterFull.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeJump','content/dudeJump.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeIdle','content/BUCfrontv2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('door1', 'content/door1.png');
        this.load.image('door2', 'content/door2.png');
        this.load.image('coin', 'content/coin.png');
        this.load.image('water', 'content/water.png');
        this.load.image('DirtTOP', 'content/DirtTOP.png');
        this.load.image('DirtMID', 'content/DirtMID.png');
        this.load.image('PlanePoster', 'content/PlanePoster.png');
        this.load.image('WarPoster', 'content/WarPoster.png');
        this.load.image('tinyRock', 'content/BUCtinyrock.png');
        this.load.image('FrenchPoster', 'content/French.png');
        this.load.image('BackArrow', 'content/LeftBackArrow.png');
    }
     create() {
    
      	this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
        this.bg2 = this.add.image(0,0,'Hills');
        this.bg2.setOrigin(0.0,0.0);
        this.bg2.setScale(2);
        this.bg2.setScrollFactor(0);  


		this.backarrow = this.add.image (200, 275, 'BackArrow');
		
        this.Poster1 = this.add.image(500,275,'WarPoster');
        this.Poster1.setScale(1);
        this.Poster2 = this.add.image(650,275,'PlanePoster');
        this.Poster2.setScale(1);
        this.Poster3 = this.add.image(800,275,'FrenchPoster');
        this.Poster3.setScale(1);

    	this.maintheme = this.sound.add('maintheme'); //this is the mainmenu sound
    	this.maintheme.play();
          
        this.door1 = this.physics.add.staticSprite(500,379,'door1'); //working door
        this.door1.setOrigin(0.5,0.5);
        
        this.door2 = this.physics.add.staticSprite(650,379,'door1'); //working door
        this.door2.setOrigin(0.5,0.5);

        this.door3 = this.physics.add.staticSprite(200,379,'door1'); //working door
        this.door3.setOrigin(0.5,0.5);
        
        this.door4 = this.physics.add.staticSprite(800,379,'door1'); //working door
        this.door4.setOrigin(0.5,0.5);
        /*
        this.locker = this.add.image(16,348,'HallwayLocker').setScale(2);
        this.locker = this.add.image(48,348,'HallwayLocker').setScale(2);
        this.locker = this.add.image(80,348,'HallwayLocker').setScale(2);
        this.locker = this.add.image(200,348,'HallwayLocker').setScale(2);
        
        
        for(var row = 0; row < 5; row++){
        this.locker = this.add.image(784 - row*32,348,'HallwayLocker').setScale(2);
        }
        
        for(var row = 0; row < 5; row++){
        this.locker = this.add.image(540 - row*32,348,'HallwayLocker').setScale(2);
        }
        */
        platforms = this.physics.add.staticGroup();
        this.movingPlatforms = this.add.group();
        this.enemies = this.add.group();

        for(var floor = 0; floor <102; floor++){
        platforms.create(0 + floor*32, 444, 'DirtMID').setScale(2).refreshBody(0,0);
        }
        
        player = this.physics.add.sprite(100, 375, 'dude');
        player.setSize(10,28, true);
        player.setScale(2);
		this.cameras.main.setBounds(0, 0, 1200, 450);           
        this.cameras.main.startFollow(player, false, 0.2, 0.2);
        //player.setCollideWorldBounds(true);


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
        cursors = this.input.keyboard.createCursorKeys();

        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
        scoreText.setScrollFactor(0);


        healthText = this.add.text(550, 16, 'Health: ' + health, {fontSize: '32px', fill: '#000'});
        healthText.setScrollFactor(0);

        this.physics.add.collider(player, platforms);
        //this.physics.add.overlap(player, this.enemy, loseHealthMax, null, this);
        this.physics.add.overlap(player, door1, enterDoor1, null, this);
        this.physics.add.overlap(player, door2, enterDoor1, null, this);
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
          this.scene.start("SceneTutorial");
        }
      }else{
        this.door1.setTexture('door1');
      }
      if(player.x > this.door2.x - this.door2.width/2 && player.x < this.door2.width/2 + this.door2.x && player.y < this.door2.y + 10){
        this.door2.setTexture('door2');
        if ((cursors.up.isDown || this.keyW.isDown) /*&& jumping == false*/)
        {
          this.maintheme.stop();
          this.scene.start("SceneLevel2");
        }
      }else{
        this.door2.setTexture('door1');
      }
            if(player.x > this.door3.x - this.door3.width/2 && player.x < this.door3.width/2 + this.door3.x && player.y < this.door3.y + 10){
        this.door3.setTexture('door2');
        if ((cursors.up.isDown || this.keyW.isDown) /*&& jumping == false*/)
        {
          this.maintheme.stop();
          this.scene.start("SceneLevel1");
        }
      }else{
        this.door3.setTexture('door1');
      }
            if(player.x > this.door4.x - this.door4.width/2 && player.x < this.door4.width/2 + this.door4.x && player.y < this.door4.y + 10){
        this.door4.setTexture('door2');
        if ((cursors.up.isDown || this.keyW.isDown) /*&& jumping == false*/)
        {
          this.maintheme.stop();
          this.scene.start("SceneLevel3");
        }
      }else{
        this.door4.setTexture('door1');
      }
    }
    

  }
