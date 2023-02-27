var config = {
    type: Phaser.AUTO,
    //parent: 'phaser-example',
    width: 800,
    height: 450,
    scale: {
      mode: Phaser.Scale.FIT,
      //autoCenter: Phaser.Scale.CENTER_BOTH
  },
    physics: {
      default: 'arcade',
      arcade: {
        debug: true, //to see boxes
        gravity: { x: 0, y: 300 }
      }
    },
    scene: [
        SceneMainMenu,
        SceneLobby,
        SceneTutorial,
        SceneLevel1,
        SceneLevel2,
        SceneLevel3,
        SceneHistoryHallway,
        SceneLevel4,
        SceneFrogger,
        SceneLockerRoom,
        SceneBasketball,
        SceneLoseMenu,
        SceneWinMenu
  ],
  pixelArt: true,
  roundPixels: false,
  //audio: {
   // disableWebAudio: true
  //}
  };

  var game = new Phaser.Game(config);
  var coins;
  var cursors;
  var door1;
  var door2;
  var door3;
  var door4;
  var falling = false;
  var health = 3;
  var healthText;
  var jumping = false;
  var jumpSpeed = 0;
  var platforms;
  var player;
  var score = 0;
  var scoreText;
  var speed = 5;
  var direction;
  var basketball1;
  var basketballexist = false;
  var bScore = 0;
  var bScoreText;
  var endTrig;
  var spaceText;
  var stuckbox;
  var timer;
  var timeText;
  var seconds = 0;


  game.scene.start("SceneMainMenu");

  function enterDoor1 (player, door1)
  {
    this.scene.start("SceneLevel2");
  }

    function enterDoor2 (player, door2)
    {
      this.scene.start("SceneLockerRoom");
    }

    function enterDoor3 (player, door3)
    {
      this.scene.start("SceneWinMenu");
    }
  
	function enterDoor4 (player, door4)
    {
      this.scene.start("SceneLevel2");
    }
    
	function enterDoor5 (player, door5)
    {
      this.scene.start("SceneLevel4");
    }
  
  	function enterDoor6 (player, door6)
    {
      this.scene.start("SceneLevel1");
    }
  
  function collectCoin(player, coin)
  {
    coin.disableBody(true,true);
    score += 1;
    scoreText.setText('Score: ' + score);
    this.coin1 = this.sound.add('coin1');
    this.coin1.play();
  }
  function touchdown(player, endTrig)
  {
    this.cheer.x = 0;
    this.cheer.y = 0;
    player.x = 800;
    player.y = 0;
    this.cheer.anims.play('yayCheer', true);
    this.crowd1 = this.sound.add('crowdCheer');
    this.crowd1.play();
    spaceText = this.add.text(550, 400, 'Press Space', { fontSize: '32px', fill: '#000' });
  }
  function stuck(player, stuckbox)
  {
    player.x = 800;
    player.y = 0;
    if (this.keySpace.isDown)
      {
         player.x = 0;
      }
  }
  function scoreBasket(basketball1, net)
  {
    //net.disableBody(true,true);
    bScore += 2;
    basketball1.y = this.net.y + 18;
    basketball1.x = this.net.x;
    bScoreText.setText('Bball Score: ' + bScore);
    this.coin1 = this.sound.add('coin1');
    this.coin1.play();
  }

function scoreCheck() {
	seconds++;
    if (bScore >= 2 && seconds > 9){
    	this.scene.start("SceneWinMenu");
    }
    else if (bScore < 2 && seconds > 9) {
    	this.scene.start("SceneLoseMenu");
    }

}
  function loseHealth()
  {
    health -= 1;
    healthText.setText('Health: ' + health);
    //this.hit1 = this.sound.add('hit1');
    //this.hit1.play();
    if(health <= 0)
    {
      this.scene.start("SceneLoseMenu");
    }
  }
  
    function loseHealthMax()
  {
    health = health - 1;
    healthText.setText('Health: ' + health);
    if(health <= 0)
    {
      this.scene.start("SceneLoseMenu");
    }
  }

  function platformStep(s, platform) {
    if (!s.locked && s.y <= platform.y) {
        s.locked = true;
        s.lockedTo = platform;
        s.body.velocity.y = 0;
    } 
  }
  
  function gameHud(){
  	scoreText = this.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: '#000' });
    scoreText.setScrollFactor(0);
    healthText = this.add.text(550, 16, 'health: ' + health, {fontSize: '32px', fill: '#000'});
    healthText.setScrollFactor(0);
  }

  function resetVariables()
  {
    score = 0;
    health = 3;
    bScore = 0;
  }


   