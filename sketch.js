const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var backgroundImg;
var tree, tree2, treeImg;
var skateboardImg, skateboard;
var mangoImg, mango1, mango2, mango3, mango4, mango5, mango6, mango7, mango8;
var branch1, branch2, branch3, branch4, branch5, branch6, branch7, branch8;
var mango_con, mango_con2, mango_con3, mango_con4, mango_con5, mango_con6, mango_con7, mango_con8;
var cartImg1, cartImg2, cart;
var button1, button2, button3, button4, button5, button6, button7, button8;
var ground;
var score = 0;
var cut_sound;
var error_sound;
var check_sound;

//to pre load images and sounds
function preload() {
    backgroundImg = loadImage('bgImg.jpg');
    treeImg = loadImage('tree.png');
    mangoImg = loadImage('mango.png')
    cartImg1 = loadImage('maincart.png')
    cartImg2 = loadImage('maincart1.png');

    cut_sound = loadSound('rope_cut.mp3')
    error_sound = loadSound('error.mp3')
    check_sound = loadSound('checkpoint.mp3')
}


function setup() {

    //to create canvas
    createCanvas(1500, 750);

    //to create engine
    engine = Engine.create();
    world = engine.world;

    //to create trees
    tree = createSprite(470, 320, 10, 10);
    tree.addImage(treeImg);
    tree.scale = 0.9;

    tree2 = createSprite(1200, 360, 10, 10);
    tree2.addImage(treeImg);
    tree2.scale = 0.9;

    //to create cart
    cart = createSprite(750, 600, 10, 10);
    cart.addImage("lefttoright", cartImg1);
    cart.addImage("righttoleft", cartImg2)
    cart.changeImage("righttoleft");
    cart.scale = 1.2;
    cart.velocityX = -12;

    //to creet buttons
    button1 = createButton('Mango');
    button1.position(30, 40);
    button1.size(55, 30);
    button1.mouseClicked(drop1);

    button2 = createButton('Mango');
    button2.position(100, 40);
    button2.size(55, 30);
    button2.mouseClicked(drop2);

    button3 = createButton('Mango');
    button3.position(170, 40);
    button3.size(55, 30);
    button3.mouseClicked(drop3);

    button4 = createButton('Mango');
    button4.position(240, 40);
    button4.size(55, 30);
    button4.mouseClicked(drop4);

    button5 = createButton('Mango');
    button5.position(310, 40);
    button5.size(55, 30);
    button5.mouseClicked(drop5);

    button6 = createButton('Mango');
    button6.position(380, 40);
    button6.size(55, 30);
    button6.mouseClicked(drop6);

    button7 = createButton('Mango');
    button7.position(450, 40);
    button7.size(55, 30);
    button7.mouseClicked(drop7);

    button8 = createButton('Mango');
    button8.position(520, 40);
    button8.size(55, 30);
    button8.mouseClicked(drop8);

    //to create branches
    branch1 = new Branch(1, { x: 370, y: 250 })
    branch2 = new Branch(1, { x: 600, y: 200 })
    branch3 = new Branch(1, { x: 500, y: 100 })
    branch4 = new Branch(1, { x: 400, y: 150 })
    branch5 = new Branch(1, { x: 1200, y: 130 })
    branch6 = new Branch(1, { x: 1300, y: 250 })
    branch7 = new Branch(1, { x: 1070, y: 230 })
    branch8 = new Branch(1, { x: 1100, y: 150 })

    //to create mangos
    mango1 = Bodies.circle(370, 200, 15, );
    mango2 = Bodies.circle(600, 150, 15, );
    mango3 = Bodies.circle(500, 50, 15, );
    mango4 = Bodies.circle(400, 100, 15, );
    mango5 = Bodies.circle(1200, 100, 15, );
    mango6 = Bodies.circle(1300, 200, 15, );
    mango7 = Bodies.circle(1070, 200, 15, );
    mango8 = Bodies.circle(1100, 100, 15, );

    //to establish link between branch and mango
    Matter.Composite.add(branch1.body, mango1);
    mango_con = new Link(branch1, mango1)

    Matter.Composite.add(branch2.body, mango2);
    mango_con2 = new Link(branch2, mango2)

    Matter.Composite.add(branch3.body, mango3);
    mango_con3 = new Link(branch3, mango3)

    Matter.Composite.add(branch4.body, mango4);
    mango_con4 = new Link(branch4, mango4)

    Matter.Composite.add(branch5.body, mango5);
    mango_con5 = new Link(branch5, mango5)

    Matter.Composite.add(branch6.body, mango6);
    mango_con6 = new Link(branch6, mango6)

    Matter.Composite.add(branch7.body, mango7);
    mango_con7 = new Link(branch7, mango7)


    Matter.Composite.add(branch8.body, mango8);
    mango_con8 = new Link(branch8, mango8)

    ground = new Ground(750, 750, 1500, 10);

    rectMode(CENTER);

}

function draw() {

    //to intialize engine
    Engine.update(engine);

    //to give background
    background(51);
    image(backgroundImg, 0, 0, width, height);

    imageMode(CENTER);

    // if any single of the mango exist, cart will keep moving
    if (mango1 || mango2 || mango3 || mango4 || mango5 || mango6 || mango7 || mango8) {

        if (cart.position.x <= 100) {
            cart.changeImage("lefttoright")
            cart.velocityX = 12;
        }

        if (cart.position.x >= 1300) {
            cart.changeImage("righttoleft")
            cart.velocityX = -12;
        }
    }

    //to create sprites
    drawSprites();

    //to show score
    if (score === 40) {
        fill("Yellow");
        textSize(50);
        text("Hurray! You got all the mangoes!", 750, 375)
    }

    //to display branches
    branch1.show();
    branch2.show();
    branch3.show();
    branch4.show();
    branch5.show();
    branch6.show();
    branch7.show();
    branch8.show();

    //to display mangoes only when they are not null
    if (mango1 != null) {
        image(mangoImg, mango1.position.x, mango1.position.y, 60, 60);
    }

    if (mango2 != null) {
        image(mangoImg, mango2.position.x, mango2.position.y, 60, 60);
    }

    if (mango3 != null) {
        image(mangoImg, mango3.position.x, mango3.position.y, 60, 60);
    }
    if (mango4 != null) {
        image(mangoImg, mango4.position.x, mango4.position.y, 60, 60);
    }
    if (mango5 != null) {
        image(mangoImg, mango5.position.x, mango5.position.y, 60, 60);
    }
    if (mango6 != null) {
        image(mangoImg, mango6.position.x, mango6.position.y, 60, 60);
    }
    if (mango7 != null) {
        image(mangoImg, mango7.position.x, mango7.position.y, 60, 60);
    }

    if (mango8 != null) {
        image(mangoImg, mango8.position.x, mango8.position.y, 60, 60);
    }

    //to check collision between cart and mango1
    if (collide(mango1, cart) == true) {
        score += 5;
        mango1 = null
        check_sound.play();
    }

    //to check collision between ground and mango1
    if (mango1 != null && mango1.position.y >= 700) {
        score -= 5;
        mango1 = null;
        error_sound.play();
    }

    //to check collision between cart and mango2
    if (collide2(mango2, cart) == true) {
        score += 5;
        mango2 = null;
        check_sound.play();
    }

    //to check collision between ground and mango2
    if (mango2 != null && mango2.position.y >= 700) {
        score -= 5;
        mango2 = null;
        error_sound.play();
    }

    //to check collision between cart and mango3
    if (collide3(mango3, cart) == true) {
        score += 5;
        mango3 = null;
        check_sound.play();
    }

    //to check collision between ground and mango3
    if (mango3 != null && mango3.position.y >= 700) {
        score -= 5;
        mango3 = null;
        error_sound.play();
    }

    //to check collision between cart and mango4
    if (collide4(mango4, cart) == true) {
        score += 5;
        mango4 = null
        check_sound.play();
    }

    //to check collision between ground and mango4
    if (mango4 != null && mango4.position.y >= 700) {
        score -= 5;
        mango4 = null;
        error_sound.play();
    }

    //to check collision between cart and mango5
    if (collide5(mango5, cart) == true) {
        score += 5;
        mango5 = null
        check_sound.play();
    }

    //to check collision between ground and mango5
    if (mango5 != null && mango5.position.y >= 700) {
        score -= 5;
        mango5 = null;
        error_sound.play();
    }

    //to check collision between cart and mango6
    if (collide6(mango6, cart) == true) {
        score += 5;
        mango6 = null
        check_sound.play();
    }

    //to check collision between ground and mango6
    if (mango6 != null && mango6.position.y >= 700) {
        score -= 5;
        mango6 = null;
        error_sound.play();
    }

    //to check collision between cart and mango7
    if (collide7(mango7, cart) == true) {
        score += 5;
        mango7 = null
        check_sound.play();
    }

    //to check collision between ground and mango7
    if (mango7 != null && mango7.position.y >= 700) {
        score -= 5;
        mango7 = null;
        error_sound.play();
    }

    //to check collision between cart and mango8
    if (collide8(mango8, cart) == true) {
        score += 5;
        mango8 = null
        check_sound.play();
    }

    //to check collision between ground and mango8
    if (mango8 != null && mango8.position.y >= 700) {
        score -= 5;
        mango8 = null;
        error_sound.play();
    }

    fill("black");
    textSize(20);
    text("Click here to drop the mango from tree", 30, 30)

    fill("red");
    textSize(40);
    text(`Score:${score}`, 1000, 50);
    textAlign(CENTER, CENTER);

    //to display ground
    ground.show();
}

//function to check collisions
function collide(body, sprite) {
    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (d <= 80) {
            World.remove(engine.world, mango1);
            mango1 = null;
            return true;
        } else {
            return false;
        }
    }
}

function collide2(body, sprite) {
    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (d <= 80) {
            World.remove(engine.world, mango2);
            mango2 = null;
            return true;
        } else {
            return false;
        }
    }
}

function collide3(body, sprite) {
    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (d <= 80) {
            World.remove(engine.world, mango3);
            mango3 = null;
            return true;
        } else {
            return false;
        }
    }
}

function collide4(body, sprite) {
    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (d <= 80) {
            World.remove(engine.world, mango4);
            mango4 = null;
            return true;
        } else {
            return false;
        }
    }
}

function collide5(body, sprite) {
    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (d <= 80) {
            World.remove(engine.world, mango5);
            mango5 = null;
            return true;
        } else {
            return false;
        }
    }
}

function collide6(body, sprite) {
    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (d <= 80) {
            World.remove(engine.world, mango6);
            mango6 = null;
            return true;
        } else {
            return false;
        }
    }
}

function collide7(body, sprite) {
    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (d <= 80) {
            World.remove(engine.world, mango7);
            mango7 = null;
            return true;
        } else {
            return false;
        }
    }
}

function collide8(body, sprite) {
    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (d <= 80) {
            World.remove(engine.world, mango8);
            mango8 = null;
            return true;
        } else {
            return false;
        }
    }
}

//functions to drop the mango, break the rope
function drop1() {
    cut_sound.play();
    branch1.break();
    mango_con.dettach();
    mango_con = null;
}

function drop2() {
    cut_sound.play();
    branch2.break();
    mango_con2.dettach();
    mango_con2 = null;
}

function drop3() {
    cut_sound.play();
    branch3.break();
    mango_con3.dettach();
    mango_con3 = null;
}

function drop4() {
    cut_sound.play();
    branch4.break();
    mango_con4.dettach();
    mango_con4 = null;
}

function drop5() {
    cut_sound.play();
    branch5.break();
    mango_con5.dettach();
    mango_con5 = null;
}

function drop6() {
    cut_sound.play();
    branch6.break();
    mango_con6.dettach();
    mango_con6 = null;
}

function drop7() {
    cut_sound.play();
    branch7.break();
    mango_con7.dettach();
    mango_con7 = null;
}

function drop8() {
    cut_sound.play();
    branch8.break();
    mango_con8.dettach();
    mango_con8 = null;
}