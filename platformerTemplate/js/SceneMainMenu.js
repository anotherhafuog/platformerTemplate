class SceneMainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMainMenu" });
    }

    preload() {
        this.load.image('button', 'content/button.png');
        this.load.image('button2', 'content/button2.png');
        this.load.image('mainMenuBG', 'content/menuMainBg.png');

    }
    create() {
        this.bg2 = this.add.image(0,0,'mainMenuBG');
        this.bg2.setOrigin(0.0,0.0);
        //this.bg2.setScale(1.5,1.5);

        this.btnPlay = this.add.sprite(600,300,"button");
        this.btnPlay.setScale(2);
        this.btnPlay.setOrigin(0,0);
          this.btnPlay.setInteractive();
          this.btnPlay.on("pointerover", function() {
            this.btnPlay.setTexture("button2"); // set the button texture to sprBtnPlayHover
          }, this);
          this.btnPlay.on("pointerout", function() {
            this.setTexture("button");
          });
          this.btnPlay.on("pointerdown", function() {
            this.btnPlay.setTexture("button2");
          }, this);
          this.btnPlay.on("pointerup", function() {
            this.btnPlay.setTexture("button");
            this.scene.start("SceneLevel1");
            //this.sound.play('soundButton');
          }, this);

        

    }


    update(){

    }


  }
