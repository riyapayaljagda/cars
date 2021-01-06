class Game {
  constructor() { }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();

      }
      form = new Form()
      form.display();


    }

    car1 = createSprites(100, 100)
    car2 = createSprites(300, 100)
    car3 = createSprites(500, 100)
    car4 = createSprites(700, 100)

    cars = [car1, car2, car3, car4]
  }

  play() {
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      var index = 0
      var x = 0
      var y
      //var display_position = 130;
      for (var plr in allPlayers) {
        index = index + 1
        x = x + 200
        y = displayHeight - allPlayers[plr].distance
        cars[index - 1].x = x
        cars[index - 1].y = y
        if (index === player.index)
          cars[index - 1].shapeColor("red")
        else
          cars[index - 1].shapeColor("black");

        display_position += 20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, display_position)
      }

    }

    drawSprites()
    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 50
      player.update();
    }
  }
}
