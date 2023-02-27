class SceneTutorial extends Phaser.Scene {
    constructor() {
      super({ key: "SceneTutorial" });
      
    }
    //the slowdown is immense here

    preload() {
    this.load.audio('maintheme','content/maintheme.mp3');
        this.load.image('bgHallway', 'content/hallwaybackground1.png'); 
        this.load.image('platform', 'content/platform.png');
        this.load.spritesheet('dude', 'content/dudeRun.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeJump','content/dudeJump.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeIdle','content/BUCfrontv2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('door1', 'content/door1.png');
        this.load.image('door2', 'content/door2.png');
        this.load.image('coin', 'content/coin.png');
        this.load.image('enemy', 'content/spikes.png');
        this.load.image('arrow', 'content/arrow.png');
        this.load.image('platform2', 'content/platform2.png');
        this.load.image('signJump', 'content/signJump.png');
        this.load.image('lBrick', 'content/platformLrio.png');
        this.load.image('mBrick', 'content/platformMrio.png');
        this.load.image('rBrick', 'content/platormRrio.png');
      
    }
    create() {
    
    	this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  		
    	this.bg2 = this.add.image(0,0,'bgHallway');
        this.bg2.setOrigin(0.0,0.0);
        this.bg2.setScale(2);
        this.bg2.setScrollFactor(0);  
        
        this.bg2 = this.add.image(100,436,'signJump');
        this.bg2.setOrigin(0.0,1);
        this.bg2.setScale(1);
    
    	this.maintheme = this.sound.add('maintheme'); //this is the mainmenu sound
    	this.maintheme.play();
          
        this.door1 = this.physics.add.staticSprite(1100,404,'door1'); //working door
        this.door1.setOrigin(0.5,0.5);
        
        
       //this.door2 = this.physics.add.staticSprite(700,400,'door1');
       //this.door2.setOrigin(0,1);
        platforms = this.physics.add.staticGroup();
        this.movingPlatforms = this.add.group();
        this.enemies = this.add.group();

//floor
        for(var platform = 0; platform < 10;platform++){
        platforms.create(400 + platform*16, 300, 'mBrick'); //lower platform
        platforms.create(350 + platform*16, 380, 'mBrick'); //higher platform
        }
        for(var wall = 0; wall <14;wall++){
        platforms.create(600, 436 -wall*16, 'mBrick'); //wall after platforms
        }
        for(var floor = 0; floor <51; floor++){
        platforms.create(0 + floor*32, 450, 'mBrick').setScale(2).refreshBody(0,0);
        }
        for(var plat = 0; plat < 1; plat++){
        platforms.create(900+plat*48, 410, 'mBrick').setScale(3).refreshBody(0,0);
        }
        platforms.create(384,300, 'lBrick') //lower platform left end piece
        platforms.create(334,380, 'lBrick') //upper platform left end piece
        platforms.create(550,300, 'rBrick') //lower platform right end piece
        platforms.create(510,380, 'rBrick') //upper platform right end piece

        player = this.physics.add.sprite(100, 400, 'dude');
        player.setSize(10,28, true);
        player.setScale(1.5);
		
		this.cameras.main.setBounds(0, 0, 1600, 450);        
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
      coins.create(360,360, 'coin').setScale(1.5);
      coins.create(420,360, 'coin').setScale(1.5);
      coins.create(480,360, 'coin').setScale(1.5);
        cursors = this.input.keyboard.createCursorKeys();

        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
        scoreText.setScrollFactor(0);


        healthText = this.add.text(550, 16, 'Health: ' + health, {fontSize: '32px', fill: '#000'});
        healthText.setScrollFactor(0);
        //could we make this a function that could be imported into every level instead of copy pasting this code unneccesarily
/*
        this.verticalPlatform = new MovingPlatformVertical(
          this,
          this.game.config.width * 0.5,
          this.game.config.height * 0.5,
          "platform",
          100
        ); 
        this.verticalPlatform.setData("distance", 70);
        this.movingPlatforms.add(this.verticalPlatform);
        */

		this.enemy = new Enemy(this,942,400,"enemy").setScale(1.5,1.5);
		this.enemies.add(this.enemy);
		this.physics.add.overlap(player, this.enemy, loseHealth, null, this);
    	this.enemy = new Enemy(this,966,400,"enemy").setScale(1.5,1.5);
        this.enemies.add(this.enemy);
        this.physics.add.overlap(player, this.enemy, loseHealth, null, this);
        this.enemy = new Enemy(this,990,400,"enemy").setScale(1.5,1.5);
		this.enemies.add(this.enemy);
		this.physics.add.overlap(player, this.enemy, loseHealth, null, this);
    	this.enemy = new Enemy(this,1014,400,"enemy").setScale(1.5,1.5);
        this.enemies.add(this.enemy);
        this.physics.add.overlap(player, this.enemy, loseHealth, null, this);

        this.physics.add.collider(player, platforms);
        //this.physics.add.overlap(player, this.enemy, loseHealth, null, this);
        this.physics.add.overlap(player, door1, enterDoor1, null, this);
        this.physics.add.overlap(player, coins, collectCoin, null, this);
        this.physics.add.collider(this.enemies, platforms);

    }


    update(){
      //this.verticalPlatform.update();

/*      this.physics.add.collider(player, this.movingPlatforms, platformStep, null, this);
      if (player.locked) {
        if (player.body.right < player.lockedTo.body.x || player.body.x > player.lockedTo.body.right) {
            player.locked = false;
            player.lockedTo = null;
        } else {
            player.y = player.lockedTo.y - 24;
        }
    }
    */

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
          jumping = true;
      }
      if(player.x > this.door1.x - this.door1.width/2 && player.x < this.door1.width/2 + this.door1.x && player.y < this.door1.y + 10){
        this.door1.setTexture('door2');
        if ((cursors.up.isDown || this.keyW.isDown))
        {
          this.maintheme.stop();
          this.scene.start("SceneLevel2");
        }
      }else{
        this.door1.setTexture('door1');
      }
      /*
       if(player.x > this.door2.x - this.door2.width/2 && player.x < this.door2.width/2 + this.door2.x && player.y < this.door2.y + 10){
        this.door2.setTexture('door2');
        if ((cursors.up.isDown))
        {
          this.maintheme.stop();
          this.scene.start("SceneMainMenu");
        }
      }else{
        this.door2.setTexture('door1');
      }
      
      
*/
    }
    
    

  }
