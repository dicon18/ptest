//  게임 리소스 불러오기 및 환경설정
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

//#region 환경 변수
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
    chr_sprite[8] = "spr_chr_9";

var chr_select_1 = getRandomInt(0, chr_sprite.length - 1);
var chr_select_2 = getRandomInt(0, chr_sprite.length - 1);

var chr_name = [];
    chr_name[0] = "곰찌";
    chr_name[1] = "공룡찌";
    chr_name[2] = "햄찌";
    chr_name[3] = "은찌";
    chr_name[4] = "넛찌";
    chr_name[5] = "무지개찌";
    chr_name[6] = "흰찌";
    chr_name[7] = "토끼찌";
    chr_name[8] = "파카찌";

//  맵
var bg_select = 0;

var bg_sprite = [];
    bg_sprite[0] = "bg_inGame_1";
    bg_sprite[1] = "bg_inGame_2";

var bg_name = [];
    bg_name[0] = "운동장";
    bg_name[1] = "햄스터집";

//  사운드
var bgm_inGame;
var sfx_button, sfx_cheer, sfx_kick, sfx_startWhistle, sfx_endWhistle;

//  기타
var isAnyKey = false;

//  UTIL
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//#endregion

var boot = {
    preload: function() {
        //  환경설정
        game.stage.disableVisibilityChange = true;

        //  해상도
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setShowAll();
        window.addEventListener("resize", function () {
            this.game.scale.refresh();
        });
        this.game.scale.refresh();
  
        //  Animation
        game.load.spritesheet("spr_chr_1", "assets/anim/spr_chr_1.png", 20, 20, 9);
        game.load.spritesheet("spr_chr_2", "assets/anim/spr_chr_2.png", 25, 19, 9);
        game.load.spritesheet("spr_chr_3", "assets/anim/spr_chr_3.png", 20, 20, 9);
        game.load.spritesheet("spr_chr_4", "assets/anim/spr_chr_4.png", 20, 20, 9);
        game.load.spritesheet("spr_chr_5", "assets/anim/spr_chr_5.png", 20, 20, 9);
        game.load.spritesheet("spr_chr_6", "assets/anim/spr_chr_6.png", 20, 20, 9);
        game.load.spritesheet("spr_chr_7", "assets/anim/spr_chr_7.png", 20, 20, 9);
        game.load.spritesheet("spr_chr_8", "assets/anim/spr_chr_8.png", 20, 24, 9);
        game.load.spritesheet("spr_chr_9", "assets/anim/spr_chr_9.png", 20, 23, 9);

        game.load.spritesheet("ef_kick", "assets/anim/ef_kick.png", 192, 192, 20);

        //  Image
        game.load.image("spr_logo", "assets/sprites/spr_logo.png");
        game.load.image("spr_pressAnyKey","assets/sprites/spr_pressAnyKey.png");
        game.load.image("spr_arrow", "assets/sprites/spr_arrow.png");
        game.load.image("spr_button", "assets/sprites/spr_button.png");
        game.load.image("spr_ball", "assets/sprites/spr_ball.png");
        game.load.image("spr_box", "assets/sprites/spr_box_5x5.png");

        //  Background
        game.load.image("bg_loby","assets/bg/bg_loby.png");
        game.load.image("spr_tutorial", "assets/bg/bg_tutorial.png");
        game.load.image("bg_inGame_1", "assets/bg/bg_inGame_1.png");
        game.load.image("bg_inGame_2", "assets/bg/bg_inGame_2.png");

        //  Sound
        game.load.audio("bgm_inGame", "assets/sound/bgm/bensound-littleidea.mp3");
        game.load.audio("sfx_cheer","assets/sound/effect/sfx_cheer.wav");
        game.load.audio("sfx_kick","assets/sound/effect/sfx_kick.wav");
        game.load.audio("sfx_button","assets/sound/effect/sfx_button.wav");
        game.load.audio("sfx_startWhistle","assets/sound/effect/sfx_startWhistle.wav");
        game.load.audio("sfx_endWhistle","assets/sound/effect/sfx_endWhistle.wav");

        //  Plugin
        game.plugins.add(PhaserInput.Plugin);

        //  Font Cache
        this.font_cache = game.add.text(0, 0, "", {
            font: "1px BMJUA"
        });
    },

    create: function() {
        /// 사운드
        //  BGM
        bgm_inGame = game.add.audio("bgm_inGame");
        bgm_inGame.volume = 0.2;
        
        //  SFX
        sfx_button = game.add.audio("sfx_button");
        sfx_cheer = game.add.audio("sfx_cheer");
        sfx_kick = game.add.audio("sfx_kick");
        sfx_startWhistle = game.add.audio("sfx_startWhistle");
        sfx_endWhistle = game.add.audio("sfx_endWhistle");

        game.state.start("gameMulti");
    }
}