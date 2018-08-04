class BaseCharacter{
  constructor(name, hp, ap){
    this.name = name;
    this.hp = hp;
    this.ap = ap;
    this.maxHp = hp;
    this.alive = true;
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
  }
  die(){
    this.alive = false;
  }
  updateHtml(hpElement, hurtElement) {
    hpElement.textContent = this.hp;
    hurtElement.style.width = (100 - this.hp / this.maxHp * 100) + "%";
  }
}

class Hero extends BaseCharacter {
  constructor(name, hp, ap){
    super(name, hp, ap);
    this.element = document.getElementById("hero-image-block");
    this.hpElement = document.getElementById("hero-hp");
    this.maxHpElement = document.getElementById("hero-max-hp");
    this.hurtElement = document.getElementById("hero-hp-hurt");
    
    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

    console.log('招喚英雄 ' + this.name + '！')
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

class Monster extends BaseCharacter {
  constructor(name, hp, ap){
    super(name, hp, ap);
    this.element = document.getElementById("monster-image-block");
    this.hpElement = document.getElementById("monster-hp");
    this.maxHpElement = document.getElementById("monster-max-hp");
    this.hurtElement = document.getElementById("monster-hp-hurt");
    
    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

    console.log('登登～ ' + (this.name) + ' 出場')
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

var hero = new Hero('Duncan', 130, 30);
var monster = new Monster('Monster', 120, 20);
var rounds = 10;

// 十回合限制
function endTurn() {
  rounds--;
  document.getElementById('round-num').textContent = rounds;
  if (rounds < 1) {
    // 遊戲結束
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
          // 遊戲結束
        } else {
          document.getElementsByClassName("skill-block")[0].style.display = "block";
        }
      }, 500)
    } else {
      // 遊戲結束
    }
  }, 1200);
}

function addSkillEvent(){
  var skill = document.getElementById("skill");
  skill.onclick = function() {
    heroAttack();
  }
}


addSkillEvent();
