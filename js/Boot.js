//  게임 리소스 불러오기 및 환경설정
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

/// 환경 변수
//  캐릭터

var chr_sprite = [];
    chr_sprite[0] = "spr_chr_1";
    chr_sprite[1] = "spr_chr_2";
    chr_sprite[2] = "spr_chr_3";
    chr_sprite[3] = "spr_chr_4";
    chr_sprite[4] = "spr_chr_5";
    chr_sprite[5] = "spr_chr_6";
    chr_sprite[6] = "spr_chr_7";
    chr_sprite[7] = "spr_chr_8";

var chr_select_1 = getRandomInt(0, chr_sprite.length), chr_select_2 = getRandomInt(0, chr_sprite.length);

var chr_name = [];
    chr_name[0] = "곰찌";
    chr_name[1] = "공룡찌";
    chr_name[2] = "햄찌";
    chr_name[3] = "은찌";
    chr_name[4] = "넛찌";
    chr_name[5] = "무지개찌";
    chr_name[6] = "흰찌";
    chr_name[7] = "토끼찌";

//  맵
var bg_select = 0;

var bg_sprite = [];
    bg_sprite[0] = "bg_tob";
    bg_sprite[1] = "bg_jan";

var bg_name = [];
    bg_name[0] = "햄스터집";
    bg_name[1] = "운동장";

//  입력
var isAnyKey = false;

//  UTIL
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var boot = {
    preload: function () {
        //  해상도
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setShowAll();
        window.addEventListener('resize', function () {
            this.game.scale.refresh();
        });
        this.game.scale.refresh();
  
        //  Animation
        game.load.spritesheet('spr_chr_1', 'assets/anim/spr_chr_1.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_2', 'assets/anim/spr_chr_2.png', 25, 19, 9);
        game.load.spritesheet('spr_chr_3', 'assets/anim/spr_chr_3.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_4', 'assets/anim/spr_chr_4.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_5', 'assets/anim/spr_chr_5.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_6', 'assets/anim/spr_chr_6.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_7', 'assets/anim/spr_chr_7.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_8', 'assets/anim/spr_chr_8.png', 20, 24, 9);

        //  Image
        game.load.image('spr_logo', 'assets/sprites/spr_logo.png');
        game.load.image('spr_pressAnyKey','assets/sprites/spr_pressAnyKey.png');
        game.load.image('spr_arrow', 'assets/sprites/spr_arrow.png');
        game.load.image('spr_button', 'assets/sprites/spr_button.png');
        game.load.image('spr_ball', 'assets/sprites/spr_ball.png');
        game.load.image('spr_box', 'assets/sprites/spr_transbox_5x5.png');

        //  Background
        game.load.image('bg_background','assets/bg/bg_background.png');
        game.load.image('spr_tutorial_1', 'assets/bg/bg_tutorial_1.png');
        game.load.image('bg_line', 'assets/bg/bg_line.png');
        game.load.image('bg_inGame_1', 'assets/bg/bg_inGame_1.png');
        game.load.image('bg_inGame_2', 'assets/bg/bg_inGame_2.png');
        game.load.image('bg_inGame_3', 'assets/bg/bg_inGame_3.png');
        game.load.image('bg_tob','assets/bg/bg_tob.png');
        game.load.image('bg_jan','assets/bg/bg_jan.png');
        //  Tile
        //TODO

        //  Sound
        game.load.audio('bgm_inGame', 'assets/sound/bgm/bgm_inGame.mp3');

        //  Plugin
        game.plugins.add(PhaserInput.Plugin);
    },

    create: function () {
        game.state.start('main');
    }
}