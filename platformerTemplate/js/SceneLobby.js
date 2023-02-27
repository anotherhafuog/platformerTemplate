class SceneLobby extends Phaser.Scene {
    constructor() {
      super({ key: "SceneLobby" });
      
    }
    //the slowdown is immense here

    preload() {
        this.load.image('sky', 'content/sky.png'); 
        this.load.image('platform', 'content/platform.png');
        this.load.spritesheet('dude', 'content/dudeRun.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeJump','content/dudeJump.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dudeIdle','content/dudeIdle.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('door1', 'content/door.png');
        this.load.image('coin', 'content/coin.png');
        this.load.image('enemy', 'content/enemy.png');
      	this.load.image('footballSign', 'content/footballSign.png');
      	this.load.audio('jump1','content/jump1.wav');

    }
    create() {
        this.bg2 = this.add.image(0,0,'sky');
        this.bg2.setOrigin(0.0,0.0);
        this.bg2.setScale(2);
        this.bg2.setScrollFactor(0);
        door1 = this.physics.add.staticSprite(250,420,'door1');
        door1 = this.physics.add.staticSprite(350,320,'door1');
        this.fSign = this.add.image(100,400,'footballSign');
        

        platforms = this.physics.add.staticGroup();
        this.movingPlatforms = this.add.group();
        this.enemies = this.add.group();

//bottom floor
        platforms.create(427, 240, 'platform').setScale(3.2).refreshBody();
        platforms.create(600, 350, 'platform'); //600 350
        platforms.create(100, 250, 'platform'); //idk 100 250
        platforms.create(150, 350, 'platform'); //bottom left 150 350
        platforms.create(650, 220, 'platform'); //top right platform 650 220

        player = this.physics.add.sprite(400, 100, 'dude');
        player.setSize(10,28, true);

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
          frames: this.anims.generateFrameNumbers('dudeIdle', {start: 0,end: 1}),
          frameRate: 10,
          repeat: -1
        });

        coins = this.physics.add.staticGroup();
      coins.create(300,300, 'coin');

        cursors = this.input.keyboard.createCursorKeys();

        scoreText = this.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: '#000' });
        scoreText.setScrollFactor(0);


        healthText = this.add.text(550, 16, 'health: ' + health, {fontSize: '32px', fill: '#000'});
        healthText.setScrollFactor(0);

        this.verticalPlatform = new MovingPlatformVertical(
          this,
          this.game.config.width * 0.5,
          this.game.config.height * 0.5,
          "platform",
          100
        ); 
        this.verticalPlatform.setData("distance", 70);
        this.movingPlatforms.add(this.verticalPlatform);

        this.enemy = new Enemy(
          this,
          250,
          300,
          "enemy"
        )
        this.enemies.add(this.enemy);

        this.physics.add.collider(player, platforms);
        this.physics.add.overlap(player, this.enemy, loseHealth, null, this);
        this.physics.add.overlap(player, door1, enterDoor1, null, this);
        this.physics.add.overlap(player, coins, collectCoin, null, this);
        this.physics.add.collider(this.enemies, platforms);


    }


    update(){
      this.verticalPlatform.update();

      this.physics.add.collider(player, this.movingPlatforms, platformStep, null, this);
      if (player.locked) {
        if (player.body.right < player.lockedTo.body.x || player.body.x > player.lockedTo.body.right) {
            player.locked = false;
            player.lockedTo = null;
        } else {
            player.y = player.lockedTo.y - 24;
        }
    }

      if (cursors.left.isDown)
      {
          player.setVelocityX(-160);
          if(!jumping)
          {
            player.anims.play('right', true);
          }
          player.setFlip(-1, 0)
      }
      else if (cursors.right.isDown)
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
      

    }
    
    

  }
