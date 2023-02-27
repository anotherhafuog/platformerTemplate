class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type) {
      super(scene, x, y, key);
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);
      this.setData("type", type);
      this.setData("isDead", false);
    }
}

class MovingPlatformVertical extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "platform","MovingPlatformVertical");
      //this.setData("counter", 0);
      this.setData("speed", 100);
      this.setData("vertAngle", -1);
      this.body.allowGravity = false;
      this.body.immovable = true;
      this.setData("startX", x);
      this.setData("startY", y);
      this.setData("distance", 100);
    }
    update(){
        this.body.setVelocity(0, this.getData("speed")*this.getData("vertAngle"));
        //this.setData("counter", this.getData("counter") + 1);
        //this.y += this.getData("speed")*this.getData("vertAngle");
        //this.x += 1;
        if(this.y > this.getData("startY") + this.getData("distance")){
            this.setData("vertAngle", -1);
            //this.setData("counter", 0);
        }
        if(this.y < this.getData("startY") - this.getData("distance")){
            this.setData("vertAngle", 1);
            //this.setData("counter", 0);
        }
    }
  }

class Enemy extends Entity{
    constructor(scene,x,y){
        super(scene, x, y, "enemy", "BadGuy");
    }
}

class WaterEnemy extends Entity{
    constructor(scene,x,y){
        super(scene, x, y, "water", "BadGuy");
    }
}

class EnemyFootballPlayer extends Entity{
    constructor(scene,x,y,speed,direction){
        super(scene, x, y, speed, direction, "footballEnemy", "BadGuy");
        this.setData("speed", speed);
        this.setData("direction", direction);
    }
    update(){
    	this.x += this.getData("speed");
    	this.setAngle(this.getData("direction"));
    	this.anims.play('enemyMove', true);
    	if(this.x > 800)
    		{
    			this.x = 0;
    		}
    	
    	if(this.x < 0)
    		{
    			this.x = 800;
    		}
    	}
		
 		
    	
    	
    }