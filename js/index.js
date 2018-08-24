// new Js method in this little game.

// **The setInterval()** method will continue calling the function until clearInterval() is called, or the window is closed.

// **The setTimeout()** method calls a function or evaluates an expression after a specified number of milliseconds.

// **Math.random** is JS method, Return a random number between 0 (inclusive) and 1 (exclusive)

// **Math.floor** is JS method, Round a number downward to its nearest integer

class BaseCharacter{
  constructor(name, hp, ap, cp){
    this.name = name;
    this.hp = hp;
    this.ap = ap;
    this.maxHp = hp;
    this.alive = true;
    this.cp = cp;
  }
  attack(character, damage){
    if (this.alive == false) {
      return;
    }
    character.getHurt(damage);
  }
  getHurt(damage){
    this.hp -= damage;
    if (this.hp <= 0){
      this.die();
    }

    var _this = this;
    var i = 1;
    _this.id = setInterval(function () {

      if (i == 1) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "block";
        _this.element.getElementsByClassName("hurt-text")[0].classList.add("attacked");
        _this.element.getElementsByClassName("hurt-text")[0].textContent = damage;
      }
      _this.element.getElementsByClassName("effect-image")[0].src = "images/effect/blade/" + i + ".png";
      i++;
      if (i > 8) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "none";
        _this.element.getElementsByClassName("hurt-text")[0].classList.remove("attacked");
        _this.element.getElementsByClassName("hurt-text")[0].textContent = "";
        clearInterval(_this.id);
      }
    }, 50);
  }
  die(){
    this.alive = false;
  }
  updateHtml(hpElement, hurtElement) {
    hpElement.textContent = this.hp;
    hurtElement.style.width = (100 - this.hp / this.maxHp * 100) + "%";
  }

  heal() {
    var heal = this.cp
    this.hp += heal
    this.hp > this.maxHp ? this.hp = this.maxHp : this.hp;

    var _this = this;
    var i = 1;

      _this.id = setInterval(function () {

      if (i == 1) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "block";
        _this.element.getElementsByClassName("heal-text")[0].classList.add("healed");
        _this.element.getElementsByClassName("heal-text")[0].textContent = heal;
      }
      _this.element.getElementsByClassName("effect-image")[0].src = "images/effect/heal/" + i + ".png";
      i++;
      if (i > 8) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "none";
        _this.element.getElementsByClassName("heal-text")[0].classList.remove("healed");
        _this.element.getElementsByClassName("heal-text")[0].textContent = "";
        clearInterval(_this.id);
      }
    }, 80);
  }
}

class Hero extends BaseCharacter {
  constructor(name, hp, ap, cp){
    super(name, hp, ap, cp);
    this.element = document.getElementById("hero-image-block");
    this.hpElement = document.getElementById("hero-hp");
    this.maxHpElement = document.getElementById("hero-max-hp");
    this.hurtElement = document.getElementById("hero-hp-hurt");
    
    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

    console.log('招喚英雄 ' + this.name + '！')
  }
  attack(character){
    // Math.random is JS method, Return a random number between 0 (inclusive) and 1 (exclusive)
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    // Math.floor is JS method, Round a number downward to its nearest integer
    super.attack(character, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }

  heal(){
    super.heal();
    this.updateHtml(this.hpElement, this.hurtElement);
    console.log(this.name + " 補Hp " + this.cp)
  }
}

class Monster extends BaseCharacter {
  constructor(name, hp, ap){
    super(name, hp, ap);
    this.element = document.getElementById("monster-image-block");
    this.hpElement = document.getElementById("monster-hp");
    this.maxHpElement = document.getElementById("monster-max-hp");
    this.hurtElement = document.getElementById("monster-hp-hurt");
    
    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

    console.log('登登～ 怪獸 ' + (this.name) + ' 出場')
  }
  attack(character){
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(character, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }
}

var hero = new Hero('Duncan', 130, 40, 30);
var monster = new Monster('Monster', 120, 40);
var rounds = 10;

// 十回合限制
function endTurn() {
  rounds--;
  document.getElementById('round-num').textContent = rounds;
  if (rounds < 1) {
    finish();
  }
}

function heroAttack() {
  document.getElementsByClassName("skill-block")[0].style.display = "none";

  setTimeout(function(){
    hero.element.classList.add("attacking");
    setTimeout(function() {
      hero.attack(monster);
      hero.element.classList.remove("attacking");
    }, 500);
  }, 100);

  setTimeout(function() {
    if (monster.alive) {
      monster.element.classList.add("attacking");
      setTimeout(function() {
        monster.attack(hero);
        monster.element.classList.remove("attacking");
        endTurn();
        if (hero.alive == false ) {
          finish();
        } else {
          document.getElementsByClassName("skill-block")[0].style.display = "block";
        }
      }, 500)
    } else {
      finish();
    }
  }, 1200);
}

function heroHeal() {
  document.getElementsByClassName("skill-block")[0].style.display = "none";

  setTimeout(function() {
    hero.heal()
  }, 150)

  setTimeout(function() {
    monster.element.classList.add("attacking");
    setTimeout(function() {
      monster.attack(hero);
      monster.element.classList.remove("attacking");
      endTurn();
      if (hero.alive == false ) {
        finish();
      } else {
        document.getElementsByClassName("skill-block")[0].style.display = "block";
      }
    }, 500)
  }, 1500)
}

function addSkillEvent(){
  var skill = document.getElementById("skill");
  var heal = document.getElementById("heal")

  skill.onclick = function() {
    heroAttack();
  }

  heal.onclick = function() {
    heroHeal();
  }

  document.onkeyup = function(event) {
    var key = String.fromCharCode(event.keyCode);
    var skillNone = document.getElementsByClassName("skill-block")[0].style.display != "none"
    if(key == 'A' && skillNone ) {
      heroAttack();
    } 
    if (key == 'D' && skillNone ) {
      heroHeal();
    } 
  }

}

function startToPlay(){
  var play = document.getElementById("play");
  var screen = document.getElementById("screen");
  play.onclick = function() {
    play.style.display = "none";
    screen.style.display = "block";
  }
}

function finish() {
  var finish = document.getElementById("dialog")
  finish.style.display = "block";
  if (hero.alive == false){
    dialog.classList.add("lose");
  } else {
    dialog.classList.add("win");
  }
}

function key() {
  
}
key();
addSkillEvent();
// startToPlay();
