class SceneLoseMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneLoseMenu" });
    }

    preload() {
        this.load.image('restart1', 'content/restart1.png');
        this.load.image('restart2', 'content/restart2.png');
        //this.load.image('mainMenuBG', 'content/mainMenuBg.png');
        this.load.image('dead', 'content/BUCgameoverscreen.png');
        this.load.audio('oof','content/oof.mp3');
        

    }
    create() {
    //this.maintheme.stop();
    this.game.sound.stopAll();
    this.oof = this.sound.add('oof');
    this.oof.play();
        this.bg2 = this.add.image(0,0,'dead');
        this.bg2.setOrigin(0.0,0.0);
        this.bg2.setScale(2,2);

        this.btnPlay = this.add.sprite(650,300,"restart1");
        this.btnPlay.setOrigin(0,0);
        this.btnPlay.setScale(1.5,1.5);
          this.btnPlay.setInteractive();
          this.btnPlay.on("pointerover", function() {
            this.btnPlay.setTexture("restart2"); // set the button texture to sprBtnPlayHover
          }, this);
          this.btnPlay.on("pointerout", function() {
            this.setTexture("restart1");
          });
          this.btnPlay.on("pointerdown", function() {
            this.btnPlay.setTexture("restart2");
          }, this);
          this.btnPlay.on("pointerup", function() {
            this.btnPlay.setTexture("restart1");
            resetVariables();
            this.scene.start("SceneMainMenu");
            //this.sound.play('soundButton');
          }, this);

        

    }


    update(){

    }


  }
