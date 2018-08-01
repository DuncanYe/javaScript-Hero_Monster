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
  getHurt(){
    this.hp -= damage;
    if (this.hp <= 0){
      this.die();
    }
  }
  die(){
    this.alive = false;
  }
}

class Hero extends BaseCharacter {
  constructor(name, hp, ap){
    super(name, hp, ap);
    console.log('招喚英雄 ' + this.name + '！')
  }
  attack(character){
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(character, Math.floor(damage));
  }
}

class Monster extends BaseCharacter {
  constructor(name, hp, ap){
    super(name, hp, ap);
    console.log('登登～ ' + (this.name) + ' 出場')
  }
  attack(character){
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(character, Math.floor(damage));
  }
}

var hero = new Hero('Duncan', 130, 30);
var monster = new Monster('Monster', 130, 20);
