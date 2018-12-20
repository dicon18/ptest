//  커스텀마이징
var multiCustom = {
    create: function () {
        //  씬 전환 효과
        this.camera.flash("#000000");

        //   배경
        this.bg_background = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage("bg_loby").height,
            this.game.width, this.game.cache.getImage("bg_loby").height, "bg_loby");

        //  햄찌 이름
        this.text_playerName = game.add.text(CANVAS_WIDTH / 2, 100, chr_name[chr_select], {
            font: "bold 60px BMJUA"
        });
            this.text_playerName.anchor.set(0.5);
            this.text_playerName.stroke = "#ffffff";
            this.text_playerName.strokeThickness = 6;

        //  햄찌 스프라이트
        this.sprite_playerIndex = game.add.sprite(CANVAS_WIDTH / 2, 200, chr_sprite[chr_select]);
            this.sprite_playerIndex.scale.set(3);
            this.sprite_playerIndex.anchor.set(0.5);
            this.sprite_playerIndex.animations.add("stand", [0,1], 10, true);
            this.sprite_playerIndex.animations.play("stand");

        //  햄찌 바꾸기 버튼
        this.bt_nextPlayer = game.add.button(CANVAS_WIDTH / 2 + 55, 420, "spr_arrow", this.nextPlayer, this);
            this.bt_nextPlayer.anchor.set(0.5);
            this.bt_nextPlayer.scale.set(0.5);
        this.bt_prevPlayer = game.add.button(CANVAS_WIDTH / 2 - 55, 420, "spr_arrow", this.prevPlayer, this);
            this.bt_prevPlayer.anchor.set(0.5);
            this.bt_prevPlayer.scale.set(0.5);
            this.bt_prevPlayer.scale.x = -0.5;

        //  햄찌 이름(별명) 입력창
        this.input_playerName = game.add.inputField(CANVAS_WIDTH / 2 - 110, 300, {
            font: "30px BMJUA",
            fill: "#212121",
            width: 200,
            max: 7,
            padding: 10,
            borderWidth: 1,
            borderColor: "#000000",
            borderRadius: 6,
            placeHolder: "플레이어1",
            textAlign: "center",
            type: PhaserInput.InputType.text
        });

        //  뒤로가기 버튼
        this.bt_back = game.add.button(100, 625, "spr_back", ()=>{
            sfx_button.play();
            game.state.start("selectMode");
        },this);
            this.bt_back.anchor.set(0.5);
            this.bt_back.scale.set(0.4);

        //  게임 시작 버튼
        this.bt_gameStart = game.add.button(CANVAS_WIDTH / 2, 600, "spr_button", this.gameStart, this);
            this.bt_gameStart.anchor.set(0.5);
            this.bt_gameStart.scale.set(0.5);
    },

    update: function() {
        // 배경 이동
        this.bg_background.tilePosition.x -= 6;

        //#region 버튼 alpha
        //  햄찌 바꾸기 버튼
        if (this.bt_prevPlayer.input.pointerOver()){
            this.bt_prevPlayer.alpha = 1;
        }
        else{
            this.bt_prevPlayer.alpha = 0.8;
        }

        if (this.bt_nextPlayer.input.pointerOver()){
            this.bt_nextPlayer.alpha = 1;
        }
        else{
            this.bt_nextPlayer.alpha = 0.8;
        }

        //  뒤로가기 버튼
        if (this.bt_back.input.pointerOver()){
            this.bt_back.alpha = 1;
        }
        else{
            this.bt_back.alpha = 0.8;
        }

        //  게임 시작 버튼
        if (this.bt_gameStart.input.pointerOver()){
            this.bt_gameStart.alpha = 1;
        }
        else{
            this.bt_gameStart.alpha = 0.9;
        }
        //#endregion
    },

    //  외부 함수
    nextPlayer: function() {
        sfx_button.play();
        if (chr_select < chr_sprite.length - 1)
            chr_select++;
        else
            chr_select = 0;
        this.text_playerName.text = chr_name[chr_select];
        this.sprite_playerIndex.loadTexture(chr_sprite[chr_select]);
        this.sprite_playerIndex.animations.add("stand", [0,1], 10 ,true);
        this.sprite_playerIndex.animations.play("stand");
    },
    prevPlayer: function() {
        sfx_button.play();
        if (chr_select > 0)
            chr_select--;
        else
            chr_select = chr_sprite.length - 1;
        this.text_playerName.text = chr_name[chr_select];
        this.sprite_playerIndex.loadTexture(chr_sprite[chr_select]);
        this.sprite_playerIndex.animations.add("stand", [0,1], 10 ,true);
        this.sprite_playerIndex.animations.play("stand");       
    },

    gameStart: function() {
        sfx_button.play();
        playerName = this.input_playerName.value;
        game.state.start("tutorial");
    }
}