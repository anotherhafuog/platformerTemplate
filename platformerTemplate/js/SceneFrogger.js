class SceneFrogger extends Phaser.Scene {
    constructor() {
      super({ key: "SceneFrogger" });
      
    }
    //todo
    //reduce enemy hitbox?
    //place coins

    preload() {
        this.load.image('Frogger', 'content/froggerfield.png');
        this.load.image('platform', 'content/platform.png');
        this.load.spritesheet('BucTopDown','content/BucTopDown.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('door3', 'content/door.png');
        this.load.image('cloud', 'content/cloud.png');
        this.load.spritesheet('footballEnemy','content/footballEnemy.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('coin', 'content/coin.png');
      	this.load.spritesheet('cheerWin','content/footballCheer.png', { frameWidth: 400, frameHeight: 225 });
      	this.load.image('iTrigger', 'content/BlankSprite.png');
      	this.load.audio('crowdCheer','content/crowdCheer.wav');

    }
    create() {
        //  The world is 800 x 1200 in size
        //this.matter.world.setBounds(0, 0, 3200, 600);
        
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  		this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.cameras.main.setBounds(0, 0, 800, 1200);

        this.bg2 = this.add.image(0,0,'Frogger');
        this.bg2.setOrigin(0.0,0.0);
        this.bg2.setScale(2);
        door3 = this.physics.add.staticSprite(0,0);
        endTrig = this.physics.add.staticSprite(0,80);
        endTrig.setSize(900, 20);
        
        stuckbox = this.physics.add.staticSprite(800,0);
        stuckbox.setSize(32, 32);
        
        platforms = this.physics.add.staticGroup();
        this.movingPlatforms = this.add.group();
        this.enemies = this.add.group();

		//important football player function with movement code
       /* function createEnemy(x, y, boundaryRight, boundaryLeft, speed) {
  			this.fEnemy = this.physics.add.sprite(x, y, 'footballEnemy');

  			fEnemy.body.collideWorldBounds = true;

 			var direction = 1;

  			this.physics.add.collider(fEnemy, player, function() {
   			 direction *= -1;
 			 });

  			this.update = function() {
  			
    			if (fEnemy.x > boundaryRight) {
     			 direction = -1;
    			}
    			else if (fEnemy.x < boundaryLeft) {
     			 direction = 1;
    			}
    			fEnemy.x += speed * direction * this.time.physicsElapsed;
  			};
		}*/

        this.physics.world.gravity.y = 0;
		
        scoreText = this.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: '#000' });
        scoreText.setScrollFactor(0);

        healthText = this.add.text(550, 16, 'health: ' + health, {fontSize: '32px', fill: '#000'});
        healthText.setScrollFactor(0);
		
		
        player = this.physics.add.sprite(400, 1150, 'dude');
        player.setSize(10,28, true);
       	
		
		
        //player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.world.setBounds(0, 0, 800, 1200);
        //^this is the world boundary code. need to change 4th value for y when field graphics are final

        this.cameras.main.startFollow(player, false, 0.2, 0.2);

        this.anims.create({
          key: 'up',
          frames: this.anims.generateFrameNumbers('BucTopDown', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });
      this.anims.create({
          key: 'enemyMove',
          frames: this.anims.generateFrameNumbers('footballEnemy', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });
      this.anims.create({
          key: 'yayCheer',
          frames: this.anims.generateFrameNumbers('cheerWin', { start: 0, end: 1 }),
          frameRate: 4,
          repeat: -1
      });
      

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);
        
        this.physics.add.overlap(player, door3, enterDoor3, null, this);
        
        this.physics.add.overlap(player, this.endTrig, touchdown, null, this);
        
        coins = this.physics.add.staticGroup();
      	coins.create(200,900, 'coin').setScale(2).setSize(32);
      	coins.create(50,825, 'coin').setScale(2).setSize(32);
      	coins.create(750,825, 'coin').setScale(2).setSize(32);
      	coins.create(400,650, 'coin').setScale(2).setSize(32);
      	this.physics.add.overlap(player, coins, collectCoin, null, this);
		
		//setScale 2 and speed 2 for big guy
		//speed 10 for fast guy
		this.fEnemy = new EnemyFootballPlayer(this,400,1000,2,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		
		this.fEnemy = new EnemyFootballPlayer(this,400,900,-7,-90,"enemyMove");
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,100,850,7,90,"enemyMove");
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,700,800,-7,-90,"enemyMove");
		this.enemies.add(this.fEnemy);
		
		this.fEnemy = new EnemyFootballPlayer(this,0,650,2,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,150,650,2,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,300,650,2,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,450,650,2,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,600,650,2,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		
		this.fEnemy = new EnemyFootballPlayer(this,700,500,-10,-90,"enemyMove");
		this.enemies.add(this.fEnemy);
		
		this.fEnemy = new EnemyFootballPlayer(this,0,400,10,90,"enemyMove");
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,400,400,10,90,"enemyMove");
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,400,300,-2,-90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,200,300,-2,-90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,0,200,10,90,"enemyMove");
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,400,200,10,90,"enemyMove");
		this.enemies.add(this.fEnemy);
		
		this.fEnemy = new EnemyFootballPlayer(this,0,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,50,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,100,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,150,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,200,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,250,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,300,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,350,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,400,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,450,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,500,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,550,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
		this.fEnemy = new EnemyFootballPlayer(this,600,100,7,90,"enemyMove").setScale(2);
		this.enemies.add(this.fEnemy);
	
		
		this.physics.add.overlap(player, this.enemies, loseHealth, null, this);
		
		coins = this.physics.add.staticGroup();
      	coins.create(200,900, 'coin').setScale(2).setSize(32);
      	coins.create(50,825, 'coin').setScale(2).setSize(32);
      	coins.create(750,825, 'coin').setScale(2).setSize(32);
      	coins.create(400,650, 'coin').setScale(2).setSize(32);
      	coins.create(700,500, 'coin').setScale(2).setSize(32);
      	coins.create(100,400, 'coin').setScale(2).setSize(32);
      	coins.create(700,400, 'coin').setScale(2).setSize(32);
      	coins.create(400,300, 'coin').setScale(2).setSize(32);
      	coins.create(100,200, 'coin').setScale(2).setSize(32);
      	coins.create(700,200, 'coin').setScale(2).setSize(32);
      	coins.create(200,100, 'coin').setScale(2).setSize(32);
      	this.physics.add.overlap(player, coins, collectCoin, null, this);
      	
      	this.cheer = this.add.sprite(2000,2000, 'cheerWin').setScale(2).setOrigin(0,0);
      	this.physics.add.overlap(player, endTrig, touchdown, null, this);
      	this.physics.add.overlap(player, stuckbox, stuck, null, this);
    }
    


    update(){
    for (var e = 0; e < this.enemies.getChildren().length; e++){
			this.enemies.getChildren()[e].update();
		}
    /*
      this.verticalPlatform.update();
      this.physics.add.collider(player, this.movingPlatforms, platformStep, null, this);
*/
      if (player.locked) {
        if (player.body.right < player.lockedTo.body.x || player.body.x > player.lockedTo.body.right) {
            player.locked = false;
            player.lockedTo = null;
        } else {
            player.y = player.lockedTo.y - 24;
        }
    }
	

	if (cursors.up.isDown || this.keyW.isDown){
 		player.y -= 5;
 		player.anims.play('up', true);
 		player.setAngle(0);
	}
	if (cursors.down.isDown || this.keyS.isDown){
 		player.y += 5;
 		player.anims.play('up', true);
 		player.setAngle(180);
	}
	if (cursors.right.isDown || this.keyD.isDown){
 		player.x += 5;
 		player.anims.play('up', true);
 		player.setAngle(90);
	}
	if (cursors.left.isDown || this.keyA.isDown){
 		player.x -= 5;
 		player.anims.play('up', true);
 		player.setAngle(270);
	}
	else{
	player.anims.play('up', true);
 	}
	
    }
    

  }
