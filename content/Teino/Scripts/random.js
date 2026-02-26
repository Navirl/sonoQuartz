let randomValues = {};

function randomInteger(max){
  if (
    !Number.isInteger(max)
    || max < 1
  ) {
    throw new Error(`最大値が不正です。　${max}`);
  }

  const num = Math.random() * (max + 1);
  const numInt = Math.trunc(num);

  return numInt;
}

function randomSpell(length) {

  const spells
    = '0,1,2,3,4,5,6,7,8,9,'
    + 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
  const spellArray = spells.split(',');
  const spellLength = spellArray.length;

  const index = randomInteger(spellLength - 1);
  const spell = spellArray[index]
  return spell
}

function randomString(length) {

  if (!Number.isInteger(length) || length < 1) {
    throw new Error(`文字の長さが不正です。 　${length}`)
  }

  let string = '';

  for (let i = 1; i <= length; i++){
    string += randomSpell();
  }

  return string;

}

/**
 *
 * @param {*} length
 * @param {*} key
 * @returns set culced random value.
 */
function setRandom(length,key) {
  randomValues[key] = randomString(length);
  return randomValues[key]
}

/**
 *
 * @param {*} key
 * @returns get culced random value.
 */
function getRandom(key) {
  return randomValues[key];
}

module.exports = {
  setRandom: (length,key) => setRandom(length,key),
  getRandom: (key) => getRandom(key),
};
