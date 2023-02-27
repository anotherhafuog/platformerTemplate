class SceneWinMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneWinMenu" });
    }

    preload() {
        this.load.image('button', 'content/button.png');
        this.load.image('button2', 'content/button.png');
        this.load.image('win', 'content/win.png');

    }
    create() {
    	this.game.sound.stopAll();
        this.bg2 = this.add.image(0,0,'win');
        this.bg2.setOrigin(0.0,0.0);
        this.bg2.setScale(2,2);

      //  this.add.text(100, 200, 'WOUYY DJFDJSFJDSJFJDS)', { fontSize: '72px', fill: '#FFFF33' });

        this.btnPlay = this.add.sprite(700,200,"button");
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
            resetVariables();
            this.scene.start("SceneMainMenu");
            //this.sound.play('soundButton');
          }, this);

        

    }


    update(){

    }


  }
