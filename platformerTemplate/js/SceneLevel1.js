class SceneLevel1 extends Phaser.Scene {
    constructor() {
      super({ key: "SceneLevel1" });
      
    }
    

    preload() {
    	this.load.audio('maintheme','content/maintheme.mp3');
        this.load.image('sky', 'content/chrisSkyNew.png'); 
        this.load.image('platform', 'content/platform.png');
        this.load.spritesheet('dude', 'content/dudeRun.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeJump','content/dudeJump.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeIdle','content/BUCfrontv2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bird','content/SeagullFULLCYCLE.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('door1', 'content/door11.png');
        this.load.image('door1', 'content/door11.png'); // not working door yet
        this.load.image('door2', 'content/door22.png');
        this.load.image('coin', 'content/coin.png');
        this.load.image('enemy', 'content/spike.png');
        this.load.image('sign', 'content/sign.png');
        this.load.image('weed', 'content/Weed_Patch.png');
        this.load.image('cloud', 'content/cloud.png');
        this.load.image('tree1', 'content/tree1.png');
        this.load.image('LobbyHallway', 'content/LobbyHallway.png');
        this.load.image('WeedPatchSign', 'content/WeedPatchSign.png');
        this.load.image('Score', 'content/Score.png');
      	this.load.image('PalmTree', 'content/PalmTree.png');
      	this.load.image('footballSign', 'content/footballSign.png');
      	this.load.image('History','content/History.png');
      	this.load.image('RoseCreekSign','content/RoseCreekSign.png');
      	this.load.audio('coin1','content/coin1.wav');
      	this.load.audio('jump1','content/jump1.wav');
      	//this.load.audio('hit1','content/hit1.wav');

    }
    create() {
    this.maintheme = this.sound.add('maintheme');
    this.maintheme.play();
    
    
        this.bg2 = this.add.image(0,0,'sky');
        this.bg2.setOrigin(0.0,0.0);
        //this.bg2.setScale(2);
        this.bg2.setScrollFactor(0);
        
  		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
               
        this.cloud1 = this.add.image(100,100, 'cloud');
        this.cloud2 = this.add.image(800,170, 'cloud');
        this.cloud3 = this.add.image(300,200, 'cloud');
    
    
        this.tree1 = this.add.image(100,269, 'tree1');
        this.tree1.setScale(7);
        this.tree1.setScrollFactor(0.9);
        
        this.tree2 = this.add.image(700,322, 'tree1');
        this.tree2.setScale(4.5);
        this.tree2.setScrollFactor(0.7);
        
        this.tree3 = this.add.image(300,332, 'tree1');
        this.tree3.setScale(4);
        this.tree3.setScrollFactor(0.7);
        
        this.PalmTree = this.add.image(430,332,'PalmTree');
        this.PalmTree.setScale(4);
        this.PalmTree.setScrollFactor(0.8);
        
        this.PalmTree = this.add.image(850,322,'PalmTree');
        this.PalmTree.setScale(4.5);
        this.PalmTree.setScrollFactor(0.6);
        
        this.bg2 = this.add.image(720,275,'LobbyHallway');
        this.bg2.setOrigin(0.0,0.0);
        this.bg2.setScale(1.5);
        
        this.fSign = this.add.image(875,350,'footballSign');
        this.fSign.setScale(2);
        
        this.hSign = this.add.image(1025,350,'History');
        this.hSign.setScale(2);
        
        this.bg2 = this.add.image(400,420,'WeedPatchSign');
        this.bg2.setOrigin(0.0,1);
        this.bg2.setScale(1);
        
        this.tree1 = this.add.image(100,390, 'RoseCreekSign');
        this.anims.create({
        	key: 'birdMove',
        	frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 1 }),
        	frameRate: 5,
        	repeat: -1
        });
        
    	this.bird = this.add.sprite(600,100, 'bird');
        this.bird.play('birdMove');
        this.bird1 = this.add.sprite(800,80, 'bird');
        this.bird1.play('birdMove');
    	this.bird2 = this.add.sprite(1200,120, 'bird');
        this.bird2.play('birdMove');
/*
        const sprite = this.add.sprite(50, 300, 'bird').setScale(1);

        sprite.play({ key: 'walk', repeat: 7 });

        this.tweens.add({
            targets: sprite,
            x: 750,
            duration: 8800,
            ease: 'Linear'
        });
        */
        
        this.door1 = this.physics.add.staticSprite(950,384,'door1'); //working door
        this.door1.setOrigin(0.5,0.5);
        this.door1.setScale(1)
        this.door2 = this.physics.add.staticSprite(1100,384,'door1'); // working door
        this.door2.setOrigin(0.5,0.5);
        this.door2.setScale(1)
        // not working door below
        this.door4 = this.physics.add.staticSprite(1250,384,'door1');
        this.door4.setOrigin(0.5,0.5);
        this.door4.setScale(1)
        
        this.door5 = this.physics.add.staticSprite(0,-50,'door1'); // working door
        this.door5.setOrigin(0.5,0.5);
        this.door5.setSize(32,600);
    
        
        //this.sign = this.physics.add.staticSprite(900,384,'sign');
        //this.sign.setOrigin(1,1.5);
       
       
        

        platforms = this.physics.add.staticGroup();
        this.movingPlatforms = this.add.group();
        this.enemies = this.add.group();

//floor
        platforms.create(-40, 415, 'platform').setScale(10).setOrigin(0,0).refreshBody(0,0);
        platforms.create(-13, 400, 'platform').setScale(0.1,10).refreshBody(0,0);
        platforms.create(1613, 400, 'platform').setScale(0.1,10).refreshBody(0,0);
        //this.bg2 = this.add.image(1100,300,'sign');
        this.bg2.setOrigin(0.0,0.0);
        this.bg2.setScale(1.5)
        this.bg3 = this.add.image(0,402,'weed')
        this.bg3.setOrigin(0.0,0.0);
        this.bg3.setScale(1.4)
        this.bg4 = this.add.image(800,402,'weed')
        this.bg4.setOrigin(0.0,0.0);
        this.bg4.setScale(1.4)
        
        //platforms.create(700, 290, 'sign').setScale(1).setOrigin(0,0).refreshBody();

        //platforms.create(600, 350, 'platform'); //600 350
        //platforms.create(100, 250, 'platform'); //idk 100 250
        //platforms.create(150, 350, 'platform'); //bottom left 150 350
        //platforms.create(650, 220, 'platform'); //top right platform 650 220

        player = this.physics.add.sprite(400, 380, 'dude');
        player.setSize(10,28, true);
        player.setScale(2);
    

       // player.setCollideWorldBounds(true);

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
      coins.create(695,410, 'coin').setScale(1.5);
      coins.create(850,410, 'coin').setScale(1.5);
      coins.create(1170,410, 'coin').setScale(1.5);
        cursors = this.input.keyboard.createCursorKeys();

        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
        scoreText.setScrollFactor(0);


        healthText = this.add.text(550, 16, 'Health: ' + health, {fontSize: '32px', fill: '#000'});
        healthText.setScrollFactor(0);
        
        this.cameras.main.setBounds(0, 0, 1600, 450);        
        this.cameras.main.startFollow(player, false, 0.2, 0.2);
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

     /*  this.enemy = new Enemy(
          this,
          250,
          300,
          "enemy"
        )
        this.enemies.add(this.enemy);
*/
        this.physics.add.collider(player, platforms);
        this.physics.add.overlap(player, this.enemy, loseHealth, null, this);
        //this.physics.add.overlap(player, door1, enterDoor1, null, this);
        this.physics.add.overlap(player, coins, collectCoin, null, this);
        this.physics.add.collider(this.enemies, platforms);
        this.physics.add.overlap(player, this.door5, enterDoor5, null, this);

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
    
    this.cloud1.x -= 1;
    if(this.cloud1.x < 0)
    {
    this.cloud1.x = 1600;
    }
    
    this.cloud2.x -= .8;
    if(this.cloud1.x < 0)
    {
    this.cloud1.x = 1600;
    }
    
    this.cloud3.x -= 1.1;
    if(this.cloud1.x < 0)
    {
    this.cloud1.x = 1600;
    }
    
    this.cloud1.x -= 1;
    if(this.cloud1.x < 0)
    {
    this.cloud1.x = 1600;
    }
      this.bird.x -= 1.5;
    if(this.bird.x < 0)
    {
    this.bird.x = 1600;
    }
          this.bird1.x -= 1.1;
    if(this.bird1.x < 0)
    {
    this.bird1.x = 1600;
    }
          this.bird2.x -= 1.3;
    if(this.bird2.x < 0)
    {
    this.bird2.x = 1600;
    }
    
    

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
        if ((cursors.up.isDown || this.keyW.isDown))
        {
          this.maintheme.stop();
          this.scene.start("SceneLockerRoom");
        }
      }
      else{
        this.door1.setTexture('door1');
      }
      
       if(player.x > this.door2.x - this.door2.width/2 && player.x < this.door2.width/2 + this.door2.x && player.y < this.door2.y + 10){
        this.door2.setTexture('door2');
        if ((cursors.up.isDown || this.keyW.isDown)){
        
          this.maintheme.stop();
          this.scene.start("SceneHistoryHallway");
        }
      }
      else{
      this.door2.setTexture('door1');
      }
      
          if(player.x > this.door4.x - this.door4.width/2 && player.x < this.door4.width/2 + this.door4.x && player.y < this.door4.y + 10){
        this.door4.setTexture('door2');
        if ((cursors.up.isDown || this.keyW.isDown)){
        
          this.maintheme.stop();
          this.scene.start("SceneLevel4");
        }
      }
      else{
      this.door4.setTexture('door1');
      }
      
    }
    
    
    

  }
