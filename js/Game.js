//  인 게임
//#region 글로벌 변수
var player;
var player2;
var ball;
var box;

var cursors;
var kickButton, kickButton2;

var scoreText;
var orangeScore = 0, blueScore = 0;
var isGoal = false;
//#endregion

var Game = {
    create: function () {
        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 게임 설정
        //  물리
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 1;

        //  입력
        cursors = game.input.keyboard.createCursorKeys();
        kickButton = game.input.keyboard.addKey(Phaser.Keyboard.K);
        kickButton2 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

        //  배경
        game.stage.backgroundColor = "#7befb2";
        game.add.image(0, 0, 'bg_field');

        //  충돌 그룹
        var playerCollisionGroup = game.physics.p2.createCollisionGroup();
        var ballCollisionGroup = game.physics.p2.createCollisionGroup();
        var boxCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 충돌 박스 생성
        var boxes = game.add.group();
        boxes.enableBody = true;
        boxes.physicsBodyType = Phaser.Physics.P2JS;

        //  라인
        for (var i = 0; i < 228; i++) {
            //  윗쪽 라인 박스
            box = boxes.create(i * 5 + 68, 40, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            //  아래쪽 라인 박스
            box = boxes.create(i * 5 + 68, 680, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);
        }
        for (var i = 0; i < 43; i++) {
            //  왼쪽 라인 박스
            box = boxes.create(67, i * 5 + 40, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            //  오른쪽 라인 박스
            box = boxes.create(1280 - 70, i * 5 + 40, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);
        }
        for (var i = 0; i < 44; i++) {
            //  왼쪽 라인 박스
            box = boxes.create(67, i * 5 + 465, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            //  오른쪽 라인 박스
            box = boxes.create(1280 - 70, i * 5 + 465, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);
        }

        //  골대
        for (var i = 0; i < 14; i++) {
            //  윗쪽 라인 박스
            box = boxes.create(i * 5 + 3, 250, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            box = boxes.create(i * 5 + 1270 - 60, 250, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            //  아래쪽 라인 박스
            box = boxes.create(i * 5 + 3, 465, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            box = boxes.create(i * 5 + 1270 - 60, 465, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);
        }
        for (var i = 0; i < 44; i++) {
            //  왼쪽 라인 박스
            box = boxes.create(4, i * 5 + 250, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            //  오른쪽 라인 박스
            box = boxes.create(1280 - 4, i * 5 + 250, 'spr_box');
            box.body.static = true;
            box.body.setRectangle(1, 1);
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);
        }
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 플레이어 설정
        //  플레이어1
        player = game.add.sprite(264, game.world.centerY, 'spr_player');
        player.anchor.set(0.5);
        player.scale.set(1);

        game.physics.p2.enable(player, false);
        player.body.setCircle(player.width / 2);
        player.body.fixedRotation = true;
        player.body.damping = 0.75;
        player.body.mass = 1000;
        player.body.setCollisionGroup(playerCollisionGroup);
        player.body.collides([ballCollisionGroup, playerCollisionGroup]);

        //  플레이어2
        player2 = game.add.sprite(1064, game.world.centerY, 'spr_player2');
        player2.anchor.set(0.5);
        player2.scale.set(1);

        game.physics.p2.enable(player2, false);
        player2.body.setCircle(player2.width / 2);
        player2.body.fixedRotation = true;
        player2.body.damping = 0.75;
        player2.body.mass = 1000;
        player2.body.setCollisionGroup(playerCollisionGroup);
        player2.body.collides([ballCollisionGroup, playerCollisionGroup]);
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 공 설정
        ball = game.add.sprite(664, game.world.centerY, 'spr_ball');
        ball.anchor.set(0.5);

        game.physics.p2.enable(ball, false);
        ball.body.setCircle(ball.width / 2);
        ball.body.fixedRotation = false;
        ball.body.damping = 0.5;
        ball.body.setCollisionGroup(ballCollisionGroup);
        ball.body.collides([playerCollisionGroup, boxCollisionGroup]);
        ball.body.createBodyCallback(player, this.kick, this);
        ball.body.createBodyCallback(player2, this.kick2, this);
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region UI 설정
        //  점수
        scoreText = game.add.text(664, 40, blueScore + " : " + orangeScore, {
            font: "65px BMJUA",
            fill: "#000000",
            backgroundColor: "#ffffff",
            align: "center"
        });
        scoreText.anchor.setTo(0.5, 0.5);
        game.time.events.add(Phaser.Timer.SECOND * 5, this.scoreTextAlpha1);
        game.time.events.add(Phaser.Timer.SECOND * 5.1, this.scoreTextAlpha2);
        game.time.events.add(Phaser.Timer.SECOND * 5.2, this.scoreTextAlpha3);
        game.time.events.add(Phaser.Timer.SECOND * 5.3, this.scoreTextAlpha4);
        game.time.events.add(Phaser.Timer.SECOND * 5.4, this.scoreTextAlpha5);
        //#endregion
    },

    update: function () {
        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 플레이어
        //  이동
        var pVelocity = player.body.velocity;
        var p2Velocity = player2.body.velocity;

        if (game.input.keyboard.addKey(Phaser.Keyboard.A).isDown && pVelocity.x >= -120) {
            pVelocity.x -= 5;
        }
        else if (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown && pVelocity.x <= 120) {
            pVelocity.x += 5;
        }
        if (game.input.keyboard.addKey(Phaser.Keyboard.W).isDown && pVelocity.y >= -120) {
            pVelocity.y -= 5;
        }
        else if (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown && pVelocity.y <= 120) {
            pVelocity.y += 5;
        }

        if (cursors.left.isDown && p2Velocity.x >= -120) {
            p2Velocity.x -= 5;
        }
        else if (cursors.right.isDown && p2Velocity.x <= 120) {
            p2Velocity.x += 5;
        }
        if (cursors.up.isDown && p2Velocity.y >= -120) {
            p2Velocity.y -= 5;
        }
        else if (cursors.down.isDown && p2Velocity.y <= 120) {
            p2Velocity.y += 5;
        }

        if (ball.body.velocity.x > 100) {
            ball.body.velocity.x -= 5;
        }
        if (ball.body.velocity.x < -100) {
            ball.body.velocity.x += 5;
        }
        if (ball.body.velocity.y > 100) {
            ball.body.velocity.y -= 5;
        }
        if (ball.body.velocity.y < -100) {
            ball.body.velocity.y += 5;
        }

        //  골
        if (ball.body.x <= 48.3 && ball.body.y >= 252.5 && ball.body.y <= 447.6 && isGoal == false) {
            this.orangeGoalText();
            orangeScore++;
            scoreText.alpha = 1;
            isGoal = true;
            game.time.events.add(Phaser.Timer.SECOND * 5, this.restartGame);
        }
        if (ball.body.x >= 1232.9 && ball.body.y >= 252.5 && ball.body.y <= 447.6 && isGoal == false) {
            this.buleGoalText();
            blueScore++;
            scoreText.alpha = 1;
            isGoal = true;
            game.time.events.add(Phaser.Timer.SECOND * 5, this.restartGame);
        }
        scoreText.setText(blueScore + " : " + orangeScore);
        //#endregion
    },

    //  외부 함수
    scoreTextAlpha1: function () {
        scoreText.alpha = 0.9;
    },
    scoreTextAlpha2: function () {
        scoreText.alpha = 0.8;
    },
    scoreTextAlpha3: function () {
        scoreText.alpha = 0.7;
    },
    scoreTextAlpha4: function () {
        scoreText.alpha = 0.6;
    },
    scoreTextAlpha5: function () {
        scoreText.alpha = 0.5;
    },

    kick: function () {
        if (kickButton.isDown) {
            for (var i = 0; i < 2; i++) {
                ball.body.velocity.x *= 2;
                ball.body.velocity.y *= 2;
            }
        }
    },
    kick2: function () {
        if (kickButton2.isDown) {
            for (var i = 0; i < 2; i++) {
                ball.body.velocity.x *= 2;
                ball.body.velocity.y *= 2;
            }
        }
    },

    orangeGoalText: function () {
        var text;
        var style = {
            font: "bold 32px BMJUA",
            fill: "#e67e22",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        text = game.add.text(0, 0, "Orange Team GOAL!", style);
        text.setTextBounds(250, 100, 800, 100);
    },
    buleGoalText: function () {
        var text;
        var style = {
            font: "bold 32px BMJUA",
            fill: "#4834d4",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        text = game.add.text(0, 0, "Blue Team GOAL!", style);
        text.setTextBounds(250, 100, 800, 100);
    },

    restartGame: function () {
        game.state.restart();
        isGoal = false;
    }
}
