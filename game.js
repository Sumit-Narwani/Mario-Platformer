let config = {
    type: Phaser.AUTO,
    
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
        
    },
    
    backgroundColor: 0xffff11,
    
    // Phaser provides some physics engines to configure and use (to add laws of motion to the game)
    physics: {
        default: 'arcade',
        arcade: {
            gravity:{
                y: 1000,   // more the value, more the gravitational force (x and y for axis in which we want gravity)
            }
        }
    },
    
    scene: {
        preload:preload,
        create:create,
        update:update,  
    
    }       

};


let game = new Phaser.Game(config);

function preload(){
    this.load.image("ground", "Assets/topground.png");
    this.load.image("sky", "Assets/background.png");
    this.load.image("apple", "Assets/apple.png");
    this.load.spritesheet("dude", "Assets/dude.png", {frameWidth:32, frameHeight:48})
    
}

function create(){
    W = game.config.width;
    H = game.config.height;
    
    
    // add tileSprites (repeating images)
    let ground = this.add.tileSprite(0, H-128, W, 128, "ground");
    ground.setOrigin(0,0);
    
    
    // try to create a background
    let background = this.add.sprite(0,0,"sky");
    background.setOrigin(0,0);
    background.displayWidth = W;
    background.displayHeight = H;
    background.depth = -1;
    
    
    this.player = this.physics.add.sprite(100, 100, "dude", 4);
    console.log(this.player);
    
    // Set the bounce value for the player (elastic collision)
    // this.player.setBounce(1);                              // value 1 means no energy will be lost and it will keep bouncing forever
    this.player.setBounce(0.5);
    
    // Add a group of apples = physical objects
    let fruits = this.physics.add.group({
        key : "apple",
        repeat : 8,
        
        // Set the scaling to reduce the size of the apple (0.2 means 20%)
        setScale : {x:0.2, y:0.2},
        setXY : {x:10, y:0, stepX:100},
    });
    
    // Add bouncing effect to all the apples  (calling setBounce function to set the random bounce for all the apples)
    fruits.children.iterate(function(f){
        f.setBounceY(Phaser.Math.FloatBetween(0.4,0.7));
    })
    
    
    // This sets the ground to be static object(body) and does the working same as below three steps can do.
    this.physics.add.existing(ground, true);
    
    
    // this.physics.add.existing(ground);
    // ground.body.allowGravity = false;
    // round.body.immovable = true;
    
    
    // Add a collision detection between the player and the ground
    this.physics.add.collider(this.player, ground);
    
    // Add a collision detection between the fruits and the ground
    this.physics.add.collider(fruits,ground);
    
}



function update(){}