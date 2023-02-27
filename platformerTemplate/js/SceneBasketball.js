class SceneBasketball extends Phaser.Scene {
    constructor() {
      super({ key: "SceneBasketball" });
      
    }
    
  // width then length 
  //todo
  //fix door enter code
    preload() {
    	this.load.audio('maintheme','content/maintheme.mp3');
        this.load.image('bgbasketball', 'content/gym3.png'); 
        this.load.image('platform', 'content/platform.png');
        this.load.spritesheet('dude', 'content/dudeRun.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeJump','content/dudeJump.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeIdle','content/BUCfrontv2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('door1', 'content/door1.png');
        this.load.image('door2', 'content/door2.png');
        this.load.image('coin', 'content/coin.png');
        this.load.image('mCourt', 'content/woodMid.png');
        this.load.image('iPlat', 'content/BlankSprite.png');
        this.load.image('HallwayLocker', 'content/HallwayLocker.png');
        this.load.image('basketball1', 'content/basketball1.png');
        this.load.image('hoop', 'content/hoop.png');
        this.load.audio('jump1','content/jump1.wav');
      
    }
    create() {
    	seconds = 0;
      	basketballexist = false;
    	
      	this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  		this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        this.bg2 = this.add.image(0,0,'bgbasketball');
        this.bg2.setOrigin(0.0,0.0);
        this.bg2.setScale(1);
        this.bg2.setScrollFactor(0);  

    	this.maintheme = this.sound.add('maintheme'); //this is the mainmenu sound
    	this.maintheme.play();
        
        //this.locker = this.add.image(16,372,'HallwayLocker').setScale(2);
        //this.locker = this.add.image(48,372,'HallwayLocker').setScale(2);
        
        
        
       //this.door2 = this.physics.add.staticSprite(700,400,'door1');
       //this.door2.setOrigin(0,1);
        platforms = this.physics.add.staticGroup();
        this.movingPlatforms = this.add.group();
        this.enemies = this.add.group();
        this.fullHoop = this.add.group();
		
		//basketball1 = this.physics.add.image(400, 300, 'basketball1');
		//basketball1.setVelocity(500, 200).setBounce(0.5, 0.5).setCollideWorldBounds(true).setGravityY(400).setAngularVelocity(100);

    	this.backboard = platforms.create(700,400,'hoop').setScale(2).refreshBody(0,0).setSize(8,110).setOffset(120,32);
    	this.fullHoop.add(this.backboard);
    	this.rim = platforms.create(676,320,'iPlat').setScale(2).refreshBody(0,0).setSize(8,8);
    	this.fullHoop.add(this.rim);
    	this.net = this.physics.add.image(684,288,'iPlat').setScale(2).setSize(32,1)
    	this.net.body.allowGravity = false;;
    	this.fullHoop.add(this.net);
        
        for(var floor = 0; floor <102; floor++){
        platforms.create(0 + floor*32, 450, 'mCourt').refreshBody(0,0);
        }
        
        /*
        for(var plat = 0; plat < 1; plat++){
        platforms.create(384,300, 'lBrick') //lower platform left end piece
        platforms.create(334,380, 'lBrick') //upper platform left end piece
        platforms.create(550,300, 'rBrick') //lower platform right end piece
        platforms.create(510,380, 'rBrick') //upper platform right end piece
		*/
        player = this.physics.add.sprite(100, 400, 'dude');
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

        /*coins = this.physics.add.staticGroup();
      coins.create(360,360, 'coin').setScale(1.5);
      coins.create(420,360, 'coin').setScale(1.5);
      coins.create(480,360, 'coin').setScale(1.5);*/
        cursors = this.input.keyboard.createCursorKeys();

        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
        scoreText.setScrollFactor(0);

        healthText = this.add.text(550, 16, 'Health: ' + health, {fontSize: '32px', fill: '#000'});
        healthText.setScrollFactor(0);
        
        bScoreText = this.add.text(16, 64, 'Bball Score: ' + bScore, { fontSize: '32px', fill: '#000' });
        bScoreText.setScrollFactor(0);
        
        spaceText = this.add.text(550, 64, 'Press Space', { fontSize: '32px', fill: '#000' });

		timer = this.time.addEvent({ delay: 1000, callback: scoreCheck, callbackScope: this, loop: true });

		timeText = this.add.text(16, 112, 'Time: ' + timer.getProgress().toString().substr(0, 4) + seconds, { fontSize: '32px', fill: '#000' });
        timeText.setScrollFactor(0);
        
        this.physics.add.collider(player, platforms);
        //this.physics.add.overlap(player, this.enemy, loseHealthMax, null, this);
        this.physics.add.overlap(player, door1, enterDoor1, null, this);
        //this.physics.add.overlap(player, coins, collectCoin, null, this);
        this.physics.add.collider(this.enemies, platforms);
        this.physics.add.overlap(player, this.enemies, loseHealth, null, this);
        //this.physics.add.collider(basketball1, platforms);
        //this.physics.add.collider(basketball1, player, destroySprite, null, this);
    }
	

    update(){
    	timeText.setText('Time: ' + seconds + timer.getProgress().toString().substr(1, 3));
    	
      function destroySprite (basketball1,player) {
      	basketball1.destroy();
      	basketballexist = false;
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
		
      if (this.keySpace.isDown){
      	if (basketballexist == false){
      	basketballexist = true;
      	basketball1 = this.physics.add.image(player.x, player.y, 'basketball1');
		basketball1.setVelocity(500, -200).setBounce(0.5, 0.7).setCollideWorldBounds(true).setGravityY(400).setAngularVelocity(100);
      	this.physics.add.collider(basketball1, platforms);
      	this.physics.add.overlap(basketball1, this.net, scoreBasket, null, this);
        this.physics.add.collider(basketball1, player, destroySprite, null, this);
        }
      }
      if(player.body.touching.down)
      {
        jumping = false;
      }
  
      if (cursors.up.isDown && (player.body.touching.down || player.locked) || this.keyW.isDown && (player.body.touching.down || player.locked))
      {
        player.locked = false;
            player.lockedTo = null;
          player.setVelocityY(-400);
          player.anims.play('jump',true);
          this.jump1 = this.sound.add('jump1').setVolume(0.3);
    	  this.jump1.play();
          jumping = true;
      }
     }
    

  }
