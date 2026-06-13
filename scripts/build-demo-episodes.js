const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const DEFINITIONS = {
  absence: '缺席, 不在',
  accept: '接受',
  active: '活跃的',
  adult: '成年人',
  admire: '钦佩, 欣赏',
  alone: '独自的',
  anniversary: '周年纪念日',
  announce: '宣布',
  appearance: '外表',
  appear: '出现',
  arrival: '到达',
  authority: '权威',
  bless: '祝福',
  bond: '契约, 债券',
  borrow: '借入',
  burden: '负担',
  calculate: '计算',
  ceremony: '仪式',
  choice: '选择',
  citizen: '公民',
  clerk: '书记员',
  comfort: '安慰',
  command: '命令',
  commerce: '商业',
  confess: '承认',
  confiscate: '没收',
  conflict: '冲突',
  constant: '持续的',
  consult: '咨询',
  contract: '合同',
  convert: '转变, 皈依',
  court: '法庭',
  creature: '生物',
  curious: '好奇的',
  danger: '危险',
  debt: '债务',
  delicate: '娇嫩的',
  delay: '延迟',
  deserve: '值得',
  desert: '沙漠',
  disguise: '伪装',
  distance: '距离',
  distant: '遥远的',
  document: '文件',
  drop: '滴落',
  duty: '职责',
  echo: '回声',
  effort: '努力',
  engine: '发动机',
  equal: '平等的',
  essential: '本质的, 必要的',
  escape: '逃离',
  exact: '准确的',
  exhaust: '使筋疲力尽',
  explore: '探索',
  faithful: '忠实的',
  faith: '信任',
  forgive: '原谅',
  fortune: '财富',
  future: '未来',
  garden: '花园',
  generous: '慷慨的',
  gentle: '温柔的',
  gold: '黄金',
  grant: '授予',
  grateful: '感激的',
  gradual: '逐渐的',
  harmony: '和谐',
  habit: '习惯',
  heir: '继承人',
  honor: '荣誉',
  human: '人类的',
  imagine: '想象',
  invisible: '看不见的',
  inspect: '检查',
  jewel: '宝石',
  judge: '法官',
  journey: '旅程',
  justice: '正义',
  law: '法律',
  lead: '铅',
  legal: '法律的',
  letter: '信件',
  lonely: '孤独的',
  loss: '损失',
  loyal: '忠诚的',
  massive: '巨大的',
  memory: '记忆',
  mercy: '怜悯',
  modest: '朴素的',
  nation: '民族, 国家',
  narrow: '狭窄的',
  observe: '观察',
  ordinary: '普通的',
  patient: '耐心的',
  penalty: '惩罚',
  peace: '和平, 安宁',
  physical: '身体的, 物质的',
  pilot: '飞行员',
  planet: '行星',
  poison: '毒药',
  portrait: '画像',
  possess: '拥有',
  precious: '珍贵的',
  prepare: '准备',
  pressure: '压力',
  persuade: '说服',
  pride: '骄傲',
  promise: '承诺',
  proper: '合适的',
  property: '财产',
  protect: '保护',
  prove: '证明',
  purchase: '购买',
  quality: '品质',
  quarrel: '争吵',
  recover: '恢复',
  record: '记录',
  refuse: '拒绝',
  release: '释放',
  remain: '留下, 仍然',
  repair: '修理',
  request: '请求',
  regret: '后悔, 遗憾',
  resolve: '决心, 解决',
  responsible: '有责任的',
  restore: '恢复',
  revenge: '复仇',
  reward: '回报',
  ridiculous: '荒谬的',
  ring: '戒指',
  risk: '风险',
  root: '根',
  routine: '惯例',
  rumor: '谣言',
  sacrifice: '牺牲',
  schedule: '时间表',
  secure: '安全的',
  secret: '秘密',
  search: '寻找',
  select: '选择',
  sentence: '判决',
  serious: '严肃的',
  shame: '羞愧',
  shelter: '庇护',
  signal: '信号',
  silent: '沉默的',
  silver: '银',
  sincere: '真诚的',
  strict: '严格的',
  sudden: '突然的',
  supply: '供给',
  surface: '表面',
  tame: '驯服',
  temporary: '暂时的',
  threat: '威胁',
  thirst: '口渴',
  token: '信物',
  unique: '独特的',
  urgent: '紧急的',
  vain: '虚荣的',
  value: '价值',
  wealth: '财富',
  wisdom: '智慧',
  wonder: '惊奇',
  worth: '价值'
};

const EXTRA_CET4_CORE_WORDS = [
  'abandon', 'ability', 'abroad', 'absolute', 'absorb', 'abstract', 'academic',
  'access', 'accident', 'account', 'accurate', 'achieve', 'acknowledge',
  'acquire', 'adapt', 'adequate', 'adjust', 'advantage', 'adventure', 'affect',
  'agency', 'agriculture', 'allow', 'alternative', 'ambitious', 'analyze',
  'ancient', 'anxiety', 'apartment', 'approach', 'approve', 'area', 'argue',
  'arrange', 'article', 'aspect', 'assess', 'assist', 'assume', 'attitude',
  'available', 'average', 'balance', 'benefit', 'brief', 'capital',
  'challenge', 'channel', 'charge', 'chemical', 'civil', 'claim', 'committee',
  'common', 'community', 'compare', 'complex', 'concern', 'condition',
  'conduct', 'confidence', 'connect', 'consequence', 'consider', 'contact',
  'contain', 'content', 'control', 'culture', 'damage', 'debate', 'decade',
  'decision', 'decline', 'degree', 'demand', 'depend', 'describe', 'design',
  'desire', 'detail', 'determine', 'develop', 'device', 'direction',
  'discover', 'discuss', 'disease', 'distance', 'domestic', 'education',
  'effect', 'efficient', 'element', 'emergency', 'emotion', 'employ',
  'environment', 'evidence', 'exchange', 'exist', 'experience', 'expert',
  'explain', 'expression', 'factor', 'failure', 'feature', 'financial',
  'focus', 'foreign', 'formal', 'frequent', 'function', 'general', 'genuine',
  'government', 'growth', 'handle', 'health', 'history', 'identify',
  'identity', 'ignore', 'impact', 'improve', 'include', 'increase',
  'individual', 'industry', 'influence', 'inform', 'instance', 'instrument',
  'interest', 'international', 'involve', 'knowledge', 'labor', 'language',
  'limit', 'local', 'maintain', 'major', 'material', 'measure', 'method',
  'minor', 'natural', 'necessary', 'notice', 'object', 'obtain', 'occasion',
  'operation', 'opinion', 'opportunity', 'organize', 'particular', 'percent',
  'period', 'personal', 'policy', 'position', 'possible', 'practice',
  'prefer', 'present', 'prevent', 'principle', 'process', 'produce',
  'progress', 'project', 'provide', 'purpose', 'reaction', 'realize',
  'reason', 'recent', 'recognize', 'reduce', 'refer', 'region', 'regular',
  'relation', 'represent', 'require', 'research', 'respect', 'result',
  'return', 'science', 'secret', 'section', 'serve', 'similar', 'situation',
  'society', 'solution', 'source', 'special', 'standard', 'statement',
  'structure', 'subject', 'support', 'system', 'technology', 'theory',
  'therefore', 'traffic', 'transport', 'university', 'various', 'victory'
];

const n = (text) => ({ type: 'narration', text });
const d = (side, name, text) => ({ type: 'dialogue', side, name, text });

const works = [
  {
    id: 'little_prince',
    title: 'The Little Prince',
    outDir: 'novels/the_little_prince/little_prince',
    charactersDir: 'novels/the_little_prince/characters',
    characters: {
      protagonist: 'Narrator',
      avatars: {
        Narrator: '',
        'Little Prince': '',
        Rose: '',
        King: '',
        'Vain Man': '',
        Drunkard: '',
        Businessman: '',
        Lamplighter: '',
        Geographer: '',
        Snake: '',
        Fox: ''
      }
    },
    episodes: [
      {
        ep: 1,
        title: 'A Voice in the Desert',
        targets: ['ordinary', 'imagine', 'adult', 'desert', 'pilot', 'engine', 'repair', 'sudden', 'curious', 'request'],
        messages: [
          n('When I was six, I made my first drawing after reading about a boa that swallowed its prey whole. I did not yet know that every adult would call my picture a hat.'),
          d('right', 'Narrator', 'It was not a hat. It was a snake with an elephant inside. I could imagine the elephant clearly.'),
          n('The adult world answered with advice about numbers, geography, grammar, and careers. So I put away my colored pencils and became an ordinary pilot.'),
          n('Years later my plane broke above the Sahara desert. The engine coughed once, shook twice, and fell silent over sand that seemed endless.'),
          d('right', 'Narrator', 'I had water for eight days, a toolbox, and no mechanic within a thousand miles. I had to repair the engine myself.'),
          n('At dawn, after a night of cold stars, a sudden small voice woke me as if it had fallen from the sky.'),
          d('left', 'Little Prince', 'Please, will you draw a sheep for me?'),
          d('right', 'Narrator', 'What are you doing here, in this desert, alone at sunrise?'),
          d('left', 'Little Prince', 'If you please, a sheep. That is my request.'),
          n('His request was so serious that I forgot thirst, fear, and the broken engine. I drew the old snake picture first.'),
          d('left', 'Little Prince', 'No. I do not want an elephant inside a snake. A sheep is smaller.'),
          n('I tried one sheep, then another, but the curious child rejected each with polite firmness. One was sick, one was a ram, one was too old.'),
          d('right', 'Narrator', 'Here is a box. The sheep you want is inside it.'),
          d('left', 'Little Prince', 'That is exactly right. Do you think this sheep needs much grass?'),
          n('Only a child could accept a box with such trust. Only a child could make a tired pilot in the desert feel less ordinary.'),
          n('While I prepared tools for the repair, he studied the drawing and asked quiet questions, but he answered almost none of mine.'),
          d('right', 'Narrator', 'Where did you come from? Did another plane bring you here?'),
          d('left', 'Little Prince', 'The important thing is that the sheep will be small. Where I live, everything is small.'),
          n('That was how I met the little prince: not through proper introduction, but through a drawing, a broken engine, and a request impossible to refuse.'),
          n('By evening the desert no longer felt empty. A strange friendship had started, and my old habit of seeing beyond the surface returned.')
        ]
      },
      {
        ep: 2,
        title: 'The Tiny Planet',
        targets: ['desert', 'request', 'planet', 'narrow', 'inspect', 'active', 'routine', 'danger', 'root', 'burden'],
        messages: [
          n('On the second day in the desert, the little prince sat near the engine while I worked. He never asked why metal mattered more than breakfast.'),
          d('left', 'Little Prince', 'If a sheep eats small bushes, will it also eat flowers?'),
          d('right', 'Narrator', 'A sheep eats whatever it finds. Why does that question carry such danger?'),
          n('He did not answer. Instead, he described a planet so tiny that a chair could be moved a few steps to watch another sunset.'),
          d('left', 'Little Prince', 'My planet has three volcanoes. Two are active, and one may be sleeping, but I clean all three.'),
          n('His routine sounded strange, yet he spoke of it like any careful housekeeper. Each morning he would inspect the surface after breakfast.'),
          d('left', 'Little Prince', 'Good plants and bad plants look the same when they are young. The bad ones must be pulled by the root.'),
          d('right', 'Narrator', 'What happens if you miss one?'),
          d('left', 'Little Prince', 'Then a baobab grows. Its root cracks everything. A small planet cannot carry that burden.'),
          n('I understood then why my sheep had mattered. A sheep could eat the dangerous shoots before they became a disaster.'),
          n('He asked for a muzzle too, because even useful sheep can cause harm. I promised one, then lost myself in the repair again.'),
          d('left', 'Little Prince', 'You speak like the adult people who count stars and forget flowers.'),
          d('right', 'Narrator', 'I am trying to stay alive in the desert. That is also a serious matter.'),
          n('He looked hurt, and the narrow space between us filled with silence. I had answered a child with the impatience of an adult.'),
          d('left', 'Little Prince', 'If someone loves a flower on one planet, it is good to look at the sky and know that flower is there.'),
          n('His voice shook. The desert wind moved around us, and suddenly the broken engine seemed less urgent than his hidden flower.'),
          d('right', 'Narrator', 'I will draw the muzzle. I should have listened to the request better.'),
          n('He forgave me without saying the word. Then he returned to his small planet in memory, to volcanoes, sunsets, and dangerous roots.'),
          n('That night I learned that a routine can be a form of love, and that a tiny burden may outweigh an adult machine.'),
          n('Above us, the stars looked like sparks from another engine, each one perhaps carrying a planet too small for careless eyes.')
        ]
      },
      {
        ep: 3,
        title: 'The Rose and the Departure',
        targets: ['routine', 'desert', 'appear', 'delicate', 'pride', 'vain', 'protect', 'shelter', 'sincere', 'conflict'],
        messages: [
          n('In the desert, the little prince explained that he had not always lived alone with volcanoes and a routine. One morning a new shoot began to appear unlike the baobabs.'),
          d('left', 'Little Prince', 'I watched it carefully. It took a long time to prepare itself. A flower should not cause so much suspense.'),
          n('At last the rose opened, delicate and bright, as if sunrise had chosen to live on his planet. She looked at him and yawned.'),
          d('left', 'Rose', 'I believe it is breakfast time. Would you be kind enough to think of me?'),
          n('He found water at once. Her beauty made him happy, but her pride soon made every simple task feel like a test.'),
          d('left', 'Rose', 'My petals are strong, but I dislike drafts. A screen would protect me. At night I need a glass shelter.'),
          d('left', 'Little Prince', 'I brought the screen, and I brought the shelter. Are you comfortable now?'),
          d('left', 'Rose', 'As comfortable as one can be on such a windy planet. I come from a place with tigers, you know.'),
          n('There were no tigers there, and roses have thorns for only a small defense. Still, he believed her because he wanted to believe.'),
          n('Her words were vain, but not cruel. She was young, afraid, and too proud to show a sincere need plainly.'),
          d('left', 'Little Prince', 'I should have judged her by what she did, not only by what she said. She gave scent and color to my life.'),
          n('At the time, however, every cough and complaint became a conflict. He felt accused, confused, and suddenly eager to escape his own home.'),
          d('left', 'Rose', 'You are leaving? Then go. I was foolish. Try to be happy. Do not cover me with the glass tonight.'),
          d('left', 'Little Prince', 'But the wind will come.'),
          d('left', 'Rose', 'I must endure a few caterpillars if I want to meet butterflies.'),
          n('Her courage sounded almost sincere, and that made his departure harder. He cleaned the volcanoes one last time and pulled the final baobab shoots.'),
          n('The routine of care became farewell. The little planet looked too small for his sadness and too large for one rose left alone.'),
          d('left', 'Little Prince', 'Goodbye.'),
          d('left', 'Rose', 'Goodbye. I love you. You did not know it. That was my fault.'),
          n('He left by a passing flock of wild birds, carrying confusion, pride, and a love he did not yet understand.')
        ]
      },
      {
        ep: 4,
        title: 'Adults on Their Thrones',
        targets: ['vain', 'pride', 'authority', 'command', 'admire', 'shame', 'possess', 'calculate', 'serious', 'ridiculous'],
        messages: [
          n('The first planet he visited belonged to a king who sat on a robe so wide it covered nearly all the ground.'),
          d('left', 'King', 'Ah, here is a subject. Approach so I may see you better.'),
          d('left', 'Little Prince', 'How can you recognize me as a subject when you have never seen me?'),
          d('left', 'King', 'All men are subjects to a king. Authority is simple when one understands command.'),
          n('The king was not unkind. He believed his authority wise because he only ordered things that would happen anyway.'),
          d('left', 'King', 'I command you to yawn if you wish. I command the sun to set when the proper hour arrives.'),
          n('The little prince found this serious and ridiculous at once. He asked to see a sunset, but the king checked a large calendar.'),
          d('left', 'King', 'The sunset will occur at seven forty. My command will be obeyed exactly then.'),
          n('The next planet held a vain man with a shining hat. He bowed whenever the prince clapped.'),
          d('left', 'Vain Man', 'Admire me. I am the finest, richest, and most intelligent man on this planet.'),
          d('left', 'Little Prince', 'But you are the only man on this planet.'),
          d('left', 'Vain Man', 'That makes admiration easier. Clap again.'),
          n('The prince left quickly. Pride without friendship felt empty, and praise requested by force sounded like wind in a bottle.'),
          n('On the next planet a drunkard sat among many empty bottles. His face carried shame before he even spoke.'),
          d('left', 'Little Prince', 'Why do you drink?'),
          d('left', 'Drunkard', 'To forget that I am ashamed.'),
          d('left', 'Little Prince', 'Ashamed of what?'),
          d('left', 'Drunkard', 'Ashamed of drinking.'),
          n('This circle made the prince sad. The next adult was a businessman who claimed to possess the stars because he could calculate their number.'),
          d('left', 'Businessman', 'I am serious. I count, write totals, lock the paper, and own five hundred million stars.'),
          d('left', 'Little Prince', 'What good is it to possess stars if you never care for them?'),
          n('The businessman had no answer beyond another calculation. The little prince missed his rose, who was vain, but at least alive.')
        ]
      },
      {
        ep: 5,
        title: 'The Lamplighter and the Geographer',
        targets: ['authority', 'serious', 'faithful', 'duty', 'schedule', 'constant', 'exhaust', 'record', 'explore', 'temporary'],
        messages: [
          n('The fifth planet was smaller than all the others, with room only for a lamp and a lamplighter who moved with tired precision.'),
          d('left', 'Lamplighter', 'Good evening.'),
          n('He lit the lamp. A minute later he put it out and said good morning, though no night had truly passed.'),
          d('left', 'Little Prince', 'Why do you do that?'),
          d('left', 'Lamplighter', 'It is my duty. The schedule changed. The planet turns faster each year, but the order did not change.'),
          n('Unlike the king, he did not love authority. Unlike the businessman, he did not pretend to be important. He was simply faithful.'),
          d('left', 'Little Prince', 'You are the only adult I might like, because your work is useful to someone besides yourself.'),
          d('left', 'Lamplighter', 'Useful or not, the constant turning will exhaust me. I have no time to sleep. Good evening. Good morning.'),
          n('The prince wished to help, but the planet was too small for both friendship and rest. He left with respect and regret.'),
          n('The sixth planet was large and quiet. A geographer sat at a desk with thick books, ready to record mountains, rivers, and cities.'),
          d('left', 'Geographer', 'Ah, an explorer. Tell me what you have seen.'),
          d('left', 'Little Prince', 'I have seen a flower, three volcanoes, and several serious adults.'),
          d('left', 'Geographer', 'Flowers are temporary. We do not record temporary things in geography.'),
          d('left', 'Little Prince', 'Temporary means it will disappear?'),
          d('left', 'Geographer', 'Yes. Sooner or later.'),
          n('The word struck him harder than any command. He had left his rose alone under a sky where even petals could vanish.'),
          d('left', 'Little Prince', 'Where should I explore next?'),
          d('left', 'Geographer', 'Earth. It has a good reputation. Many kings, many businessmen, many flowers, and many lamplighters.'),
          n('The prince thanked him, but his heart stayed behind with the temporary rose. Records could not protect what they named.'),
          n('He set out for Earth, carrying the faithful lamplighter in his thoughts and a new fear that love may have a schedule of its own.')
        ]
      },
      {
        ep: 6,
        title: 'Earth, the Snake, and the Garden',
        targets: ['explore', 'temporary', 'massive', 'creature', 'poison', 'distant', 'echo', 'lonely', 'garden', 'unique'],
        messages: [
          n('Earth was not one small planet but a massive world with deserts, mountains, oceans, cities, and more adults than he could imagine.'),
          n('Yet the little prince landed in a silent desert. The first creature he met was a snake, thin as a golden bracelet.'),
          d('left', 'Snake', 'Where are the people? It is lonely among men too.'),
          d('left', 'Little Prince', 'I fell from the sky. I am looking for friends and perhaps a way back to my flower.'),
          d('left', 'Snake', 'My poison sends people back to the earth from which they came. If you ever need help, I can help.'),
          n('The prince did not understand the offer, but the snake spoke with such quiet power that the desert seemed less empty and more dangerous.'),
          n('He crossed sand, climbed a mountain, and called into the air. Only an echo returned his words.'),
          d('left', 'Little Prince', 'Be my friends. I am alone.'),
          d('left', 'Echo', 'I am alone.'),
          n('On his planet, a mountain would have been a volcano and an answer would have been a rose. Here even his voice came back lonely.'),
          n('At last he found a road and followed it to a garden filled with roses. Thousands of roses moved in the wind.'),
          d('left', 'Little Prince', 'Good morning.'),
          d('left', 'Rose', 'Good morning.'),
          n('They looked like his flower, delicate and proud, yet none recognized him. His rose had said she was unique in the universe.'),
          d('left', 'Little Prince', 'I thought I possessed a flower unlike any other. Now I see a whole garden of them.'),
          n('He lay in the grass and cried. If his rose was only one temporary rose among thousands, what made his leaving matter?'),
          n('The question hurt more than the snake, more than the desert, more than the echo from the distant mountain.'),
          n('He had come to explore Earth, but Earth first showed him how large loneliness could become when love lost its shape.'),
          d('left', 'Little Prince', 'I am not a great prince. I own a tiny planet, three volcanoes, and one ordinary rose.'),
          n('He did not know yet that a garden can hide the meaning of one flower until someone teaches the difference.')
        ]
      },
      {
        ep: 7,
        title: 'The Fox and the Secret',
        targets: ['unique', 'lonely', 'tame', 'patient', 'gradual', 'ceremony', 'responsible', 'essential', 'invisible', 'secret'],
        messages: [
          n('Near the garden, the little prince heard a soft voice under an apple tree. A fox watched him from the grass.'),
          d('left', 'Fox', 'Good morning.'),
          d('left', 'Little Prince', 'Come and play with me. I am lonely.'),
          d('left', 'Fox', 'I cannot play with you. I am not tame.'),
          d('left', 'Little Prince', 'What does tame mean?'),
          d('left', 'Fox', 'It means to create ties. To me, you are one boy among many. To you, I am one fox among many.'),
          n('The word sounded simple, but the fox spoke as if it were a ceremony. Friendship required time, not command.'),
          d('left', 'Fox', 'Sit a little distance away. I will look at you from the corner of my eye. Each day come a little closer.'),
          n('The prince obeyed. He learned patient silence. He learned that expectation can make a field of wheat shine like hair in sunlight.'),
          d('left', 'Fox', 'Come at the same hour. If I know the hour, my heart can prepare itself. That is the use of ceremony.'),
          n('Their friendship grew gradual and real. When the day came for him to leave, the fox lowered his head.'),
          d('left', 'Little Prince', 'You will cry. I have done you no good.'),
          d('left', 'Fox', 'You have done me good because of the color of wheat. Now go look at the roses again.'),
          n('He returned to the garden. The roses were beautiful, but they were not unique to him. He had not watered them or protected them.'),
          d('left', 'Little Prince', 'You are lovely, but empty. No one could die for you. My rose is responsible to me, and I am responsible to her.'),
          n('The fox gave his secret before parting. The essential part of a thing cannot be seen by eyes; it becomes visible only through care.'),
          d('left', 'Fox', 'What is essential is invisible to a careless look. Remember the time you spent on your rose.'),
          n('The little prince repeated the secret so memory would keep it. His rose was unique because he had loved her with daily attention.'),
          n('Lonely Earth had not taken his flower from him. It had taught him why she mattered more than a garden.')
        ]
      },
      {
        ep: 8,
        title: 'The Well at Daybreak',
        targets: ['essential', 'invisible', 'thirst', 'search', 'supply', 'effort', 'comfort', 'reward', 'precious', 'memory'],
        messages: [
          n('By the eighth day my water supply was gone. The engine still refused to live, and thirst made every thought sharp.'),
          d('right', 'Narrator', 'Your stories are beautiful, but they do not give us water. We must search or die.'),
          d('left', 'Little Prince', 'Water can also be good for the heart. My fox would understand.'),
          n('We walked under the stars. My body wanted sleep, but his quiet faith gave comfort where reason gave none.'),
          d('left', 'Little Prince', 'The desert is beautiful because it hides a well somewhere. The essential thing may be invisible.'),
          n('I carried him when he grew tired. He was light, almost like a flame, and the effort made my arms ache.'),
          n('Near dawn we found a well. It stood in the sand like a village well, with rope, pulley, and bucket, though no village was near.'),
          d('right', 'Narrator', 'This is impossible. Wells in the desert do not appear ready for travelers.'),
          d('left', 'Little Prince', 'Everything is ready when a friend is thirsty.'),
          n('I raised the bucket. The rope sang against the pulley, and the water shone in the morning light like a reward.'),
          d('left', 'Little Prince', 'I am thirsty for this water. Let me drink.'),
          n('He drank with closed eyes. The water was not only water. It held the walk, the stars, the effort, and our shared silence.'),
          d('right', 'Narrator', 'It is sweet. It tastes like a festival.'),
          d('left', 'Little Prince', 'Because it was born from the search. What makes things precious is invisible work.'),
          n('I remembered the fox, the rose, and even my first drawing. A memory can become a well if someone returns to it with love.'),
          d('left', 'Little Prince', 'You must keep your promise about the muzzle. Your sheep must not eat my rose.'),
          n('The promise struck me with fear. I had drawn the sheep and the box, but not the strap for the muzzle.'),
          d('right', 'Narrator', 'I will draw it today. You speak as if you are going far away.'),
          n('He smiled with such comfort and sadness that I understood the reward of finding water had not ended our danger.'),
          n('Something else waited in the desert, and his memory of home had become stronger than thirst.')
        ]
      },
      {
        ep: 9,
        title: 'The Snake at the Wall',
        targets: ['precious', 'responsible', 'anniversary', 'prepare', 'remain', 'physical', 'silent', 'promise', 'sacrifice', 'peace'],
        messages: [
          n('That afternoon I finished the repair. The engine answered at last, and its rough noise should have filled me with peace.'),
          n('Instead I found the little prince sitting on a broken wall, speaking to the snake as if to an old appointment.'),
          d('left', 'Little Prince', 'Tonight is the anniversary of my fall to Earth. My star will be above this place.'),
          d('left', 'Snake', 'I will be there. Your body is too heavy for the journey.'),
          d('right', 'Narrator', 'What does he mean by heavy? Why are you talking to that creature?'),
          n('The snake slipped away. The prince looked pale, but calm, as though he had spent the day learning how to prepare goodbye.'),
          d('left', 'Little Prince', 'You have your machine now. You can go home. I can go home too.'),
          d('right', 'Narrator', 'Not like this. I will not leave you with poison and riddles.'),
          d('left', 'Little Prince', 'It will look like death, but it will not be true. The physical shell cannot travel so far.'),
          n('He asked me to understand, yet every word made understanding harder. A friend should remain visible. A friend should not fall silent.'),
          d('left', 'Little Prince', 'When you look at the stars, one of them will be where I live. All stars will laugh for you.'),
          d('right', 'Narrator', 'I do not want laughing stars. I want you here, alive.'),
          n('He touched my hand. His courage was not a game. He felt responsible for a rose who waited under a glass shelter.'),
          d('left', 'Little Prince', 'My rose is precious. I must return. I made a promise without knowing its full weight.'),
          n('The word sacrifice came to me, though he never used it. He was giving up the comfort of being seen in order to keep faith with what was unseen.'),
          n('Night rose around us. He walked toward the appointed place with small steady steps, and I followed though my heart resisted each one.'),
          d('left', 'Little Prince', 'You must not watch if it frightens you. It will be like an old bark falling from a tree.'),
          d('right', 'Narrator', 'I will not leave you alone.'),
          n('There was a yellow flash near his ankle. He made no cry. He fell gently, as silent as a tree falls in sand.'),
          n('At dawn, his body was gone. The desert held only tracks, stars, and a peace too large for me to accept.')
        ]
      },
      {
        ep: 10,
        title: 'The Laughing Stars',
        targets: ['promise', 'memory', 'recover', 'signal', 'wonder', 'distance', 'absence', 'observe', 'faith', 'gentle'],
        messages: [
          n('I began to recover enough to fly the plane home, but the desert did not release me completely. It sent a signal through every star.'),
          n('At night I looked upward and wondered which light belonged to the little prince. Distance had become both pain and comfort.'),
          d('right', 'Narrator', 'Somewhere a small boy may be laughing beside a rose. Somewhere a sheep may be sleeping inside a box.'),
          n('Years passed. Adults asked whether my engine trouble had been difficult, and I gave ordinary answers. I did not explain the absence that followed me.'),
          n('The memory remained sharper than maps: a scarf in the wind, a serious request, a well at dawn, a gentle fall in the sand.'),
          n('I drew the muzzle later and discovered a terrible mistake. I had forgotten the leather strap. A promise can fail through one small absence.'),
          d('right', 'Narrator', 'Did the sheep eat the rose? Did the prince return in time? I do not know.'),
          n('No adult answer can settle that question. Some nights the stars laugh clearly, and I feel faith that the rose is safe.'),
          n('Other nights they sound like tears, and I observe the sky with the fear of someone who forgot a strap.'),
          n('This is why the desert remains important to me. On a map it is only empty distance, but in memory it hides a well and a child.'),
          d('right', 'Narrator', 'If you travel there and meet a golden-haired boy who asks questions, please be gentle with him.'),
          n('Do not hurry past. Do not answer like a busy adult. Listen for the wonder beneath the simple request.'),
          n('If he laughs and refuses to answer your questions, write to me quickly. His return would heal an absence I still carry.'),
          n('Until then I keep looking. The stars are no longer only stars. They are small bells, distant wells, and a promise still asking to be kept.'),
          n('The little prince taught me that what we tame continues to call us. Even when invisible, it changes how we see everything visible.'),
          n('So I watch the sky with a pilot eye and a child heart, hoping the signal of laughter means the rose has survived.'),
          d('right', 'Narrator', 'That hope is my final drawing: a box, a sheep, a rose, and a boy somewhere beyond reach.'),
          n('Perhaps the drawing is unfinished. Perhaps all love is unfinished, held between faith and fear, asking us to protect what distance hides.'),
          n('When the night is clear, I choose faith. I let the stars laugh, and for a moment the desert becomes gentle again.'),
          n('Then I remember his face, and the whole sky feels less empty.')
        ]
      }
    ]
  },
  {
    id: 'merchant_venice',
    title: 'The Merchant of Venice',
    outDir: 'novels/merchant_of_venice/merchant_venice',
    charactersDir: 'novels/merchant_of_venice/characters',
    characters: {
      protagonist: 'Portia',
      avatars: {
        Antonio: '',
        Bassanio: '',
        Portia: '',
        Shylock: '',
        Jessica: '',
        Lorenzo: '',
        Gratiano: '',
        Nerissa: '',
        Duke: '',
        Tubal: ''
      }
    },
    episodes: [
      {
        ep: 1,
        title: 'The Bond',
        targets: ['commerce', 'debt', 'borrow', 'bond', 'contract', 'fortune', 'choice', 'mercy', 'risk', 'proper'],
        messages: [
          n('Venice lived by commerce, ships, credit, and reputation. Antonio was loved in that city because his money moved freely when friends were in need.'),
          n('Yet he began this story sad without knowing why. His ships were at sea, but his heart felt heavier than any cargo.'),
          d('right', 'Bassanio', 'Antonio, I owe more debt than honor allows, but I know a way to restore both.'),
          d('left', 'Antonio', 'Then speak. My purse and my person are open to you.'),
          d('right', 'Bassanio', 'In Belmont lives Portia, a lady of great fortune and greater virtue. Many suitors seek her, but I believe I may win her.'),
          d('left', 'Antonio', 'My ready money is at sea. Still, use my credit and borrow what you need in Venice.'),
          n('Bassanio went to Shylock, a Jewish moneylender who had long suffered insults from Antonio and answered them with cold patience.'),
          d('left', 'Shylock', 'Three thousand ducats for three months. Antonio shall be bound. But should he fail, the bond will name a pound of flesh.'),
          d('right', 'Bassanio', 'That contract is monstrous. No friend should sign such risk for my courtship.'),
          d('left', 'Antonio', 'My ships return before the date. The risk is a joke, and Shylock may learn mercy through kindness.'),
          d('left', 'Shylock', 'Mercy? You spit on my coat, call me dog, and then ask for money. Let the bond be our proper friendship.'),
          n('Antonio signed. Bassanio disliked the bond, but need and hope pressed him toward Belmont.'),
          n('Far from Venice, Portia faced a different contract made by her dead father. She could not choose her husband freely.'),
          d('right', 'Portia', 'My fortune is large, Nerissa, but my choice is locked in three caskets. Gold, silver, and lead decide my life.'),
          d('left', 'Nerissa', 'Your father was wise. The proper man will choose by character, not by show.'),
          d('right', 'Portia', 'Then let wisdom hurry. I am tired of princes who admire themselves before they greet me.'),
          n('Thus two plots began: a bond in Venice and a choice in Belmont. One measured flesh, the other measured love.'),
          n('Neither Antonio nor Portia yet knew how closely mercy and risk would bind their fortunes together.'),
          d('right', 'Bassanio', 'I will go with gratitude and fear. If I fail, the debt is more than money.'),
          n('Antonio smiled as though friendship could make any contract harmless, and Venice believed him because his ships still rode the sea.')
        ]
      },
      {
        ep: 2,
        title: 'Caskets and Flight',
        targets: ['contract', 'choice', 'value', 'surface', 'worth', 'deserve', 'appearance', 'escape', 'jewel', 'disguise'],
        messages: [
          n('At Belmont the first suitor of rank was the Prince of Morocco. He asked Portia not to judge his appearance before his courage.'),
          d('right', 'Portia', 'The contract allows me no private choice. If you choose rightly, I am yours. If not, you must never marry.'),
          d('left', 'Morocco', 'I accept. Gold suits what many desire, and Portia is a jewel the world desires.'),
          n('He opened the golden casket and found a skull with a warning. Glittering surface had promised value and delivered emptiness.'),
          d('left', 'Morocco', 'Cold lesson. I wanted what many men desire and did not deserve what one true heart must earn.'),
          n('Later the Prince of Arragon chose silver because it promised what he deserved. He found a fool in the box and left ashamed.'),
          d('right', 'Portia', 'One chose by appearance, one by pride. If worth hides anywhere, perhaps it waits in lead.'),
          n('While Belmont tested suitors, Venice hid another escape. Shylock kept his daughter Jessica in a house of locked doors and bitter rules.'),
          d('left', 'Jessica', 'Lorenzo, I am ashamed to be my father\'s child only in manners. Tonight I will leave in disguise.'),
          d('left', 'Lorenzo', 'Wear a page\'s clothes, bring what you can, and trust the night.'),
          n('Jessica took jewels and money from Shylock, dressed as a boy, and climbed down to Lorenzo while music covered the risk.'),
          d('left', 'Jessica', 'Love is blind, and I am glad. I would blush if the street could see this disguise.'),
          n('The escape wounded Shylock more deeply because it mixed family, religion, money, and public shame.'),
          n('Bassanio sailed toward Belmont with Gratiano beside him, unaware that the bond in Venice was tightening behind every mile.'),
          d('right', 'Bassanio', 'Portia is not a prize to purchase. I must choose by worth, not by surface.'),
          d('left', 'Gratiano', 'Then let lead look better than gold, or we are all undone.'),
          n('In this story, bright things often misled. Gold failed, silver mocked, jewels vanished, and disguise carried both love and betrayal.'),
          n('Only the lead casket remained closed, plain as duty and heavy as truth.'),
          d('right', 'Portia', 'If Bassanio comes, let music play while he chooses. My heart must obey a contract, even if it trembles.'),
          n('Her servants prepared the hall, and every quiet object seemed to ask what love was worth when appearance had no answer.')
        ]
      },
      {
        ep: 3,
        title: 'News of Loss',
        targets: ['debt', 'escape', 'rumor', 'loss', 'revenge', 'nation', 'equal', 'human', 'purchase', 'delay'],
        messages: [
          n('Venice soon filled with rumor. One ship from Tripolis was lost, then another from Mexico, then reports from the English coast darkened the Rialto.'),
          d('left', 'Salerio', 'Antonio\'s argosy may have struck the Goodwins. If that is true, his debt to Shylock becomes deadly.'),
          d('left', 'Solanio', 'And Shylock runs through the streets crying for his daughter, his ducats, and his jewels in the same breath.'),
          n('Shylock heard laughter in their pity. Jessica\'s escape had become public entertainment, and Antonio\'s loss became his possible revenge.'),
          d('left', 'Shylock', 'You ask why I hate him. He mocked my nation, cooled my friends, heated my enemies, and hindered my bargains.'),
          d('left', 'Salerio', 'Surely you will not take his flesh if he cannot pay. What use is it?'),
          d('left', 'Shylock', 'To feed my revenge. If you prick us, do we not bleed? If you wrong us, shall we not answer?'),
          n('His words forced Venice to hear a human claim inside a cruel intention. Equal wounds did not make equal mercy.'),
          n('Tubal arrived with mixed news: more losses for Antonio, and Jessica spending Shylock\'s money carelessly in Genoa.'),
          d('left', 'Tubal', 'One of Antonio\'s creditors told me a ship was wrecked. Also, your daughter traded a ring for a monkey.'),
          d('left', 'Shylock', 'That ring was Leah\'s before I married. I would not have given it for a wilderness of monkeys.'),
          n('Grief and greed tangled until no one could separate them. The more Shylock hurt, the more fiercely he held the bond.'),
          d('left', 'Shylock', 'Let Antonio look to his contract. I will have the penalty. I will not delay.'),
          n('Meanwhile Bassanio reached Belmont. Portia wished to delay his choice, fearing that one wrong box would send him away forever.'),
          d('right', 'Portia', 'Pause a day or two. If you choose wrong, I lose your company.'),
          d('right', 'Bassanio', 'Let me choose. Living with uncertainty is its own torture.'),
          n('Music began. Bassanio studied the caskets, remembering that appearance cheats and bright promises often purchase shame.'),
          d('right', 'Bassanio', 'Gold and silver speak too loudly. Give me the poor lead that threatens rather than promises.'),
          n('His hand moved toward the plain casket, while in Venice Antonio\'s losses moved toward the court.'),
          n('Love waited on one lid; revenge waited on one bond; and both cities held their breath.')
        ]
      },
      {
        ep: 4,
        title: 'The Lead Casket',
        targets: ['risk', 'loss', 'modest', 'select', 'portrait', 'accept', 'honor', 'ceremony', 'urgent', 'letter'],
        messages: [
          n('Bassanio decided to select the lead casket because its modest warning sounded truer than gold or silver praise. Portia could barely stand still.'),
          d('right', 'Bassanio', 'You that choose not by the view, let me find fair fortune here.'),
          n('He opened it and found Portia\'s portrait, painted so vividly that even the eyes seemed ready to speak.'),
          d('right', 'Bassanio', 'This portrait is less than the living original, yet it is enough to make me blessed.'),
          d('right', 'Portia', 'Then I am yours, with this house, these servants, and myself. I accept your love and give you this ring.'),
          n('The ring became a ceremony in miniature. She asked him to keep it as the sign of honor between them.'),
          d('right', 'Portia', 'If you part with it, lose it, or give it away, let that mean your love has failed.'),
          d('right', 'Bassanio', 'When this ring leaves my finger, let life leave my body.'),
          n('Gratiano then confessed that he loved Nerissa, and Nerissa admitted that his suit had succeeded if Bassanio succeeded. Joy doubled itself.'),
          d('left', 'Gratiano', 'Our wedding can follow yours. I kept time with my lord in love as well as in travel.'),
          n('The celebration ended when Lorenzo, Jessica, and Salerio arrived with an urgent letter from Antonio. Bassanio read it and lost color.'),
          d('right', 'Portia', 'What loss can turn you so pale on the day of your happiness?'),
          d('right', 'Bassanio', 'The dearest friend I have is ruined for my sake. His ships are lost, and Shylock demands the bond.'),
          n('Antonio\'s letter did not blame him. It asked only to see Bassanio before death if friendship allowed.'),
          d('right', 'Bassanio', 'Every word opens a wound. I borrowed in my name, but Antonio gave his flesh as security.'),
          d('right', 'Portia', 'Pay the debt many times over. Go to Venice with speed. A friend who bears such risk must not wait.'),
          n('She turned private love into public duty without hesitation. The wedding would be brief, the separation immediate.'),
          d('right', 'Portia', 'Marry me now, then go. I will not sleep in my full joy while your friend stands under a knife.'),
          n('Bassanio accepted the command. His honor now required both gratitude to Portia and rescue for Antonio.'),
          n('Before night ended, Belmont changed from a house of music to a station of departure, and the urgent letter ruled them all.')
        ]
      },
      {
        ep: 5,
        title: 'Portia Studies the Law',
        targets: ['mercy', 'urgent', 'law', 'consult', 'clerk', 'disguise', 'wisdom', 'journey', 'ring', 'loyal'],
        messages: [
          n('After the wedding, Bassanio and Gratiano left for Venice with money enough to pay the debt many times. The urgent danger remained, but Portia watched them go calmly.'),
          d('right', 'Portia', 'Nerissa, we will not wait here like painted figures while men decide the life of Antonio.'),
          d('left', 'Nerissa', 'What can we do? Venice has law, judges, and a contract already sealed.'),
          d('right', 'Portia', 'Then we must bring better law, sharper wisdom, and perhaps mercy hidden in a disguise.'),
          n('She sent a servant to Padua to consult her cousin Bellario, a learned doctor of law. Books and clothing would return by speed.'),
          d('right', 'Portia', 'We will dress as young men. I will be a doctor; you shall be my clerk.'),
          d('left', 'Nerissa', 'And if our husbands see us?'),
          d('right', 'Portia', 'They will see what they expect to see. That is the oldest disguise in the world.'),
          n('Portia trusted not only clothing, but attention. She had listened to the bond, the risk, and the gaps inside strict words.'),
          n('Jessica and Lorenzo remained at Belmont, surprised by Portia\'s sudden journey and by the authority she carried without raising her voice.'),
          d('left', 'Jessica', 'She moves as if kindness can become a strategy.'),
          d('left', 'Lorenzo', 'Bassanio is fortunate in more than fortune.'),
          n('On the road, Nerissa teased her mistress about the ring. Men swear loudly when happy and forget quickly when pressured.'),
          d('left', 'Nerissa', 'If we save their friend, let us test whether they stay loyal to those rings.'),
          d('right', 'Portia', 'A small trial after a great one may teach them humility.'),
          n('The plan was playful, but not empty. The ring marked trust, and trust needed memory under pressure.'),
          n('Their carriage hurried toward Venice. In Portia\'s hands, love did not remain private; it became law, disguise, and action.'),
          d('right', 'Portia', 'If Shylock asks only justice, we will give him justice so exact that mercy may enter through the edge.'),
          n('Nerissa looked at her mistress and smiled. The clerk had found her doctor, and the journey gathered speed.'),
          n('Behind them Belmont stayed peaceful. Ahead of them the court prepared for a bond that seemed impossible to break.')
        ]
      },
      {
        ep: 6,
        title: 'The Quality of Mercy',
        targets: ['law', 'mercy', 'court', 'judge', 'justice', 'quality', 'drop', 'bless', 'strict', 'penalty'],
        messages: [
          n('The court of Venice filled with senators, merchants, and citizens who wished the law would save Antonio without breaking itself.'),
          d('left', 'Duke', 'Shylock, everyone expects a gentle answer. Take money, show mercy, and let the penalty sleep.'),
          d('left', 'Shylock', 'I have sworn an oath. I want the penalty written in the bond. Ask me no reasons beyond my will.'),
          d('left', 'Antonio', 'Do not argue with a stone tide. I am ready.'),
          n('Bassanio offered twice the debt, then ten times, but Shylock refused each sum. Justice, he said, was his purchase.'),
          d('right', 'Bassanio', 'I beg the court to bend the law once and save a good man.'),
          n('A young doctor of law entered with a letter from Bellario. It was Portia in disguise, carrying a calm face and a prepared mind.'),
          d('right', 'Portia', 'Which is the merchant here, and which the Jew?'),
          n('She read the bond and admitted that Venetian law gave Shylock a claim. Bassanio stared at the young judge without recognizing his wife.'),
          d('right', 'Portia', 'Then Shylock must be merciful.'),
          d('left', 'Shylock', 'On what compulsion must I?'),
          d('right', 'Portia', 'The quality of mercy is not strained. It falls like a gentle drop from heaven and can bless both giver and receiver.'),
          n('Her speech changed the air, but not Shylock. He praised her wisdom only when she confirmed the strict letter of the contract.'),
          d('left', 'Shylock', 'A Daniel come to judgment. Wise young judge, give me my penalty.'),
          d('right', 'Portia', 'Antonio, prepare your breast. The court awards the pound of flesh.'),
          d('right', 'Bassanio', 'Take my life instead, my wife, all I have. Only save him.'),
          n('Portia heard the wild offer and stored it away. Love spoke loudly, but the ring on Bassanio\'s finger remained to be tested.'),
          d('right', 'Portia', 'Shylock, have a surgeon near, at your charge, to stop the blood.'),
          d('left', 'Shylock', 'Is it so nominated in the bond?'),
          d('right', 'Portia', 'It is not. Then proceed. But pause one moment. This bond gives no drop of blood.')
        ]
      },
      {
        ep: 7,
        title: 'No Drop of Blood',
        targets: ['justice', 'contract', 'legal', 'exact', 'property', 'citizen', 'threat', 'confiscate', 'convert', 'sentence'],
        messages: [
          n('The court froze. Portia held the contract as if it were a blade that could turn in the hand that carried it.'),
          d('right', 'Portia', 'Take your pound of flesh. But if you shed one drop of Christian blood, your property is confiscate by the laws of Venice.'),
          d('left', 'Shylock', 'Then I will take the money. Pay me three times the debt and let me go.'),
          d('right', 'Portia', 'You refused it in open court. You asked for justice; you shall have justice more exact than you desired.'),
          n('Shylock tried to leave with only the principal. Portia stopped him again. The legal trap had not finished closing.'),
          d('right', 'Portia', 'If an alien seeks the life of a citizen, half his property goes to the victim and half to the state. His life rests with the Duke.'),
          n('The threat of death moved from Antonio to Shylock. Venice watched the man who wanted a sentence become the man awaiting one.'),
          d('left', 'Duke', 'I pardon your life before you ask. Half your wealth is the state\'s; half belongs to Antonio.'),
          d('left', 'Antonio', 'Let me hold my half in trust for Lorenzo and Jessica. Let Shylock convert and leave them his estate.'),
          n('The mercy was real, but it was also severe. Shylock kept his life and lost authority over nearly everything else.'),
          d('left', 'Shylock', 'I am not well. Send the deed after me, and I will sign.'),
          n('He left the court diminished, neither villain only nor victim only, carrying a punishment shaped by the society that hated him.'),
          n('Antonio stood free. Bassanio overflowed with gratitude toward the young judge who had saved his friend by honoring the contract exactly.'),
          d('right', 'Bassanio', 'Take anything from me. I cannot pay what your wisdom deserves.'),
          d('right', 'Portia', 'I am satisfied. Yet as a remembrance, I ask for your gloves and that ring.'),
          d('right', 'Bassanio', 'This ring, good sir, was given by my wife. I swore never to part with it.'),
          d('right', 'Portia', 'And I thought you generous. Keep it, then, if your promise weighs more than gratitude.'),
          n('She departed with controlled offense. Gratiano soon followed after Bassanio, carrying the ring Antonio urged him to send.'),
          n('Justice had saved Antonio, but another small trial had begun in the shadow of the great one.'),
          n('The exact words of one contract were finished. The exact words of one marriage promise were about to matter.')
        ]
      },
      {
        ep: 8,
        title: 'The Rings Given Away',
        targets: ['ring', 'loyal', 'generous', 'grant', 'pressure', 'refuse', 'persuade', 'token', 'regret', 'prove'],
        messages: [
          n('Outside the court, Bassanio still refused to give the ring. Gratitude pulled one way, Portia\'s command another.'),
          d('right', 'Bassanio', 'Ask for anything else. This token is my wife\'s first gift and my promise to remain loyal.'),
          d('left', 'Antonio', 'My friend, grant him this. His service saved my life, and my love should persuade your wife to forgive.'),
          n('That pressure broke Bassanio. He sent Gratiano after the doctor with the ring, already feeling regret before it left his hand.'),
          d('left', 'Gratiano', 'Good doctor, my lord sends the ring and asks you to dine with him.'),
          d('right', 'Portia', 'I accept the ring, not the dinner. Tell him I expected no less generous payment.'),
          n('Nerissa, still disguised as the clerk, saw her chance to mirror the test. She asked Gratiano for his ring.'),
          d('left', 'Nerissa', 'My labor deserves a small reward too. That ring would suit me.'),
          d('left', 'Gratiano', 'My wife gave it to me. She would scratch my eyes out if I gave it away.'),
          d('left', 'Nerissa', 'Then refuse me. I will report that the clerk was valued below a trinket.'),
          n('Gratiano disliked appearing ungenerous. He surrendered his ring with a joke, proving even louder vows could bend under vanity.'),
          d('left', 'Gratiano', 'Here, take it. If Nerissa grows angry, I will say a beardless clerk bewitched me.'),
          n('Portia and Nerissa returned toward Belmont with both rings safe in their own keeping. Their trick had become evidence.'),
          d('right', 'Portia', 'We will reach home before them and let their own words prove the matter.'),
          d('left', 'Nerissa', 'They will swear they defended the rings until death.'),
          d('right', 'Portia', 'And we will ask what kind of death wore a lawyer\'s robe and clerk\'s cap.'),
          n('Meanwhile Antonio thanked Bassanio for love shown under pressure. Bassanio answered kindly, but regret pricked him.'),
          d('right', 'Bassanio', 'Portia will understand, I hope. The man saved you. How could I refuse?'),
          n('The question sounded noble. It also sounded like an excuse. A token is small until it carries a promise.'),
          n('The journey back to Belmont would prove whether husbands could laugh at their own failure and learn from it.')
        ]
      },
      {
        ep: 9,
        title: 'Music at Belmont',
        targets: ['token', 'prove', 'harmony', 'quarrel', 'confess', 'forgive', 'restore', 'document', 'heir', 'fortune'],
        messages: [
          n('At Belmont, moonlight softened the garden. Lorenzo and Jessica spoke of famous lovers while music filled the house with harmony.'),
          d('left', 'Lorenzo', 'How sweet the moonlight sleeps upon this bank. Sit, Jessica, and listen.'),
          d('left', 'Jessica', 'I am never merry when I hear sweet music. Perhaps it makes the soul too honest.'),
          n('Portia and Nerissa arrived before their husbands and entered as if they had never left. Soon Bassanio, Gratiano, and Antonio followed.'),
          d('left', 'Gratiano', 'Nerissa, do not quarrel before I greet you. I gave your ring to a clerk, but for a worthy reason.'),
          d('left', 'Nerissa', 'A clerk? Then let that clerk share your bed, since he has my token.'),
          n('Bassanio tried to look innocent, but Portia noticed the empty finger at once. The small ring now commanded the room.'),
          d('right', 'Portia', 'Where is the ring I gave you, my lord?'),
          d('right', 'Bassanio', 'If you knew the man to whom I gave it, and why, you would forgive me.'),
          d('right', 'Portia', 'If you had known the value of the token, you would not have parted with it.'),
          n('The quarrel grew comic but sharp. Bassanio had to confess fully, blaming gratitude, honor, and Antonio in equal measure.'),
          d('left', 'Antonio', 'I am the unhappy cause. Once I pledged my body for him; now I pledge my soul that he will never break faith again.'),
          d('right', 'Portia', 'Then you shall be his surety again. Give him this ring and tell him to keep it better.'),
          n('Bassanio stared. It was the same ring. Nerissa produced Gratiano\'s ring too, and laughter began to restore the room.'),
          d('right', 'Portia', 'I was the doctor, and Nerissa was the clerk. We have a document from Bellario to prove it.'),
          d('right', 'Bassanio', 'You saved Antonio and then judged me at home. I deserve both thanks and shame.'),
          n('More news followed. A letter announced that three of Antonio\'s ships had safely come to harbor after all. His fortune was restored.'),
          d('left', 'Antonio', 'Sweet lady, you give life and livelihood in the same night.'),
          n('Nerissa gave Jessica and Lorenzo a deed naming each one an heir to Shylock. The inheritance carried relief and unease together.'),
          n('Belmont ended the quarrel with music, but every restored fortune had passed through risk, law, and confession first.')
        ]
      },
      {
        ep: 10,
        title: 'Morning After Judgment',
        targets: ['mercy', 'restore', 'arrival', 'announce', 'wealth', 'release', 'secure', 'grateful', 'resolve', 'future'],
        messages: [
          n('Morning approached, and Belmont held more news than sleep. The arrival of letters had changed fear into relief almost too quickly.'),
          d('left', 'Antonio', 'The papers announce that my ships are safe. My wealth is restored, though I had already released myself from expecting it.'),
          d('right', 'Portia', 'Then let gratitude make you wiser, not merely richer. Fortune returns, but it does not always explain why.'),
          n('Bassanio stood beside her, grateful and humbled. The ring was secure again on his hand, heavier now because he understood it better.'),
          d('right', 'Bassanio', 'No pressure, no judge, no friend shall draw it from me again.'),
          d('right', 'Portia', 'Good. Let that resolve last longer than the first.'),
          n('Gratiano made the same promise to Nerissa with comic terror, and she accepted because laughter can release anger when truth has been admitted.'),
          d('left', 'Gratiano', 'While I live, I will fear no thing so much as keeping safe Nerissa\'s ring.'),
          d('left', 'Nerissa', 'Fear helps where memory fails. I accept.'),
          n('Jessica and Lorenzo received their future in a document created from Shylock\'s punishment. They were grateful, but the source of their wealth remained complicated.'),
          d('left', 'Jessica', 'We gain security from my father\'s sentence. I cannot rejoice without feeling the cost.'),
          d('left', 'Lorenzo', 'Then we will use it with care. A hard gift should teach gentle living.'),
          n('Antonio watched the young couples and said little. He had been rescued by law, mercy, friendship, and the wife his friend had just married.'),
          d('left', 'Antonio', 'I came to court ready for death. I leave with ships, friends, and more mercy than I deserved.'),
          d('right', 'Portia', 'Mercy is not a merchant account. It does not balance neatly, but it may still restore what justice alone would break.'),
          n('The story did not erase its wounds. Shylock had lost more than money; Antonio had faced the knife; Portia had needed disguise to enter power.'),
          n('Yet the future opened. Bassanio and Portia, Gratiano and Nerissa, Lorenzo and Jessica all stood inside a peace made from trials.'),
          d('right', 'Bassanio', 'Let the morning find us better keepers of bonds, rings, and words.'),
          n('Belmont answered with music. Venice would return to commerce, but those who survived the bond knew that strict contracts need human mercy.'),
          n('The last judgment belonged not to the court but to the life after it: whether gratitude could become action, and wealth could become care.')
        ]
      }
    ]
  }
];

const EXPANSIONS = {
  little_prince: {
    1: [
      n('Before that morning, I had trusted practical things: fuel, maps, bolts, and the stubborn arithmetic of survival. The boy made those adult tools feel incomplete.'),
      d('left', 'Little Prince', 'The sheep in the box is not asleep forever, is it? It will wake when it is hungry.'),
      d('right', 'Narrator', 'Of course. A sheep in a box follows the rules of imagination better than any sheep I draw badly.'),
      n('He accepted that explanation with grave satisfaction. Then he walked around the plane, curious about each wing, wheel, and dented panel.'),
      d('left', 'Little Prince', 'This thing cannot have brought you from very far. It is too heavy to belong among stars.'),
      n('I laughed, then stopped, because he had guessed more than I had told him. The desert had given me a child who spoke as if distance were familiar.')
    ],
    2: [
      n('He explained that small problems must be handled while they are still small. A careless morning could become a disaster no evening labor could repair.'),
      d('left', 'Little Prince', 'A baobab is not dangerous when it is tiny. That is why danger must be noticed before it looks important.'),
      d('right', 'Narrator', 'So the sheep is not a toy. It is part of your routine and part of your defense.'),
      n('He nodded and watched me sharpen my pencil. I promised to draw the baobabs so children on Earth would understand the warning.'),
      d('left', 'Little Prince', 'Adults need pictures. They believe numbers, but sometimes they need pictures more than numbers.'),
      n('That remark wounded my pride and healed it at the same time. I had once been a child with pictures; perhaps I could be useful again.')
    ],
    3: [
      n('The rose had filled his mornings with fragrance before she filled them with anxiety. Even her vanity had arrived wrapped in color and perfume.'),
      d('left', 'Little Prince', 'When she coughed, I thought she was blaming me. Now I think she only wanted me to stay near.'),
      n('He was too young to understand that pride can be a poor shelter for fear. She was too proud to ask plainly for tenderness.'),
      d('left', 'Rose', 'Do not linger over goodbye. If I let you see me cry, you will think I am ordinary.'),
      d('left', 'Little Prince', 'I did not know how to answer. I wanted to protect her, but I also wanted to escape the conflict.'),
      n('So he left with love disguised as irritation. The birds lifted him away while the glass shelter stood unused in the morning light.')
    ],
    4: [
      n('The king interested him longer than the others because the king at least believed command should fit reality. That made his authority lonely rather than merely foolish.'),
      d('left', 'King', 'If I command a general to become a seabird and he fails, the fault is mine. Authority must be reasonable.'),
      d('left', 'Little Prince', 'Then command yourself to be less alone.'),
      n('The king did not answer quickly. On the next planet, the vain man had no such silence; he heard only applause, even before it came.'),
      d('left', 'Vain Man', 'Clap, and I shall lift my hat. Admire, and I shall know you are a man of taste.'),
      n('The drunkard frightened the prince more quietly. Shame had made a prison with no door, and each bottle pretended to be a key.'),
      n('By the time the businessman began to calculate stars, the prince had learned that adult seriousness could become ridiculous when it forgot care.')
    ],
    5: [
      n('The lamplighter kept no audience, gained no wealth, and received no praise. Still, each flame gave the prince a feeling of order in the dark.'),
      d('left', 'Little Prince', 'If your planet turned more slowly, you could rest and still be faithful to your duty.'),
      d('left', 'Lamplighter', 'That would be pleasant. But pleasant things are not written in my schedule. Good evening. Good morning.'),
      n('Leaving him felt different from leaving the others. The prince did not laugh. He wished a larger planet could reward faithful labor with sleep.'),
      n('The geographer seemed wiser at first because books surrounded him. Yet his wisdom depended on explorers, while he never explored his own horizon.'),
      d('left', 'Geographer', 'A flower is not reliable evidence. It changes too quickly. Mountains remain; flowers are temporary.'),
      n('That sentence followed the prince toward Earth. For the first time, the rose seemed not troublesome but fragile, and distance became an ache.')
    ],
    6: [
      n('Later he would learn that Earth held crowds, but his first lesson was emptiness. A massive planet can still meet a traveler with silence.'),
      d('left', 'Snake', 'You are pure enough to make me pity you. I am more powerful than the finger of a king.'),
      d('left', 'Little Prince', 'Power that hides in poison is strange. I would rather find a road.'),
      n('The mountain gave him only echo, a poor imitation of company. He began to miss the rose precisely because she never merely repeated him.'),
      n('When the garden appeared, beauty multiplied until it became painful. Thousands of roses made one rose seem less grand and more necessary.'),
      d('left', 'Little Prince', 'If she is not unique by appearance, perhaps I have misunderstood what unique means.'),
      n('He did not yet have the answer, but the question had changed. The garden had opened a wound that only friendship could explain.')
    ],
    7: [
      n('The fox refused hurry. He treated friendship as a craft, something shaped by repeated presence until ordinary hours gained ceremony.'),
      d('left', 'Fox', 'Words create mistakes. Silence lets us become patient enough to hear what is changing.'),
      n('So the prince sat in the grass day after day. The distance between them grew smaller, but the importance of that distance grew clearer.'),
      d('left', 'Little Prince', 'On the day I leave, the wheat will remind you of my hair. That seems both happy and sad.'),
      d('left', 'Fox', 'It is the price of being tame. One accepts tears because the color of wheat becomes a reward.'),
      n('After hearing the secret, the prince did not feel clever. He felt responsible. Understanding had turned memory into an obligation.'),
      n('The roses had not changed, but his eyes had. The invisible tie to one flower now mattered more than visible beauty spread across a garden.')
    ],
    8: [
      n('The well sounded before it appeared. Its pulley creaked like music from a village festival, and that music made the water feel prepared for us.'),
      d('right', 'Narrator', 'Men on trains rush after gardens and shops, yet they do not know what they search for.'),
      d('left', 'Little Prince', 'Only children press their faces to windows. They still believe the reward may be hidden nearby.'),
      n('His answer comforted me because it did not deny thirst. It placed thirst inside a larger hunger for meaning, friendship, and memory.'),
      d('left', 'Little Prince', 'A single flower can make a whole desert precious if you believe it is somewhere under the stars.'),
      n('I drank again and understood that the effort of drawing water had changed the water. What we carry together tastes different.'),
      n('Then he reminded me of the muzzle, and the morning joy tilted toward fear. Even precious promises need practical details.')
    ],
    9: [
      n('I wanted to argue like an adult, with reasons, plans, and physical facts. He answered from a place where responsibility mattered more than proof.'),
      d('left', 'Little Prince', 'If I remain here, my rose remains alone. If I go, you will think I have vanished. Both things hurt.'),
      d('right', 'Narrator', 'Then choose the hurt that lets you live. A promise should not ask for your body.'),
      d('left', 'Little Prince', 'The body is only the heavy part. The promise is the part that knows the way.'),
      n('Those words brought no peace to me. They made his sacrifice sound gentle, which was almost worse than fear.'),
      n('When he fell, the desert did not shout. Its silence made the moment larger, as if even the stars had agreed to remain still.')
    ],
    10: [
      d('right', 'Narrator', 'I have told this story badly if you think it is only sad. It is also full of wonder.'),
      n('Wonder is why I still look up. A single star can hold absence and comfort together, like a question no adult map can close.'),
      d('right', 'Narrator', 'Sometimes I hear his laughter clearly, and the signal feels like bells tied to every point of light.'),
      n('At other times memory grows anxious. I picture the sheep, the rose, and the missing strap, and faith must begin again.'),
      d('right', 'Narrator', 'So if you see him, do not let him disappear into polite answers. Tell me he came back.'),
      n('Until then, every clear night asks me to choose: count the stars like a businessman, or listen to them like a friend.')
    ]
  },
  merchant_venice: {
    1: [
      n('Antonio had lent money without interest and called that generosity. Shylock saw the same habit as an attack on his commerce and his dignity.'),
      d('left', 'Shylock', 'You weaken my trade, then come to my door. Should I bend because your need has become polite?'),
      d('left', 'Antonio', 'I am as likely to call you so again. Lend as to an enemy, if that suits you better.'),
      n('The bitterness in that answer made the bond darker, but Antonio still trusted fortune. His confidence persuaded Bassanio against his fear.'),
      n('In Belmont, Portia named each suitor with wit, yet the laughter could not unlock her choice. Her father\'s will ruled even after death.'),
      d('right', 'Portia', 'If doing nothing were proper obedience, I would be the most obedient woman in Italy.')
    ],
    2: [
      n('Morocco left with ceremony, but disappointment followed him like a servant. Gold had taught him that public desire is a poor guide to private worth.'),
      d('right', 'Portia', 'A bright surface can invite the eye and still hide a warning. My father understood suitors too well.'),
      n('Arragon was colder. He spoke of deserve as if love were a court salary, then found the portrait of a fool waiting for him.'),
      d('left', 'Nerissa', 'One man trusted appearance, the other trusted self-love. Lead begins to look almost friendly.'),
      n('Jessica\'s escape moved through another kind of appearance. A daughter became a page, and a locked house became a stage for flight.'),
      d('left', 'Jessica', 'I carry jewels, but what I want most is a different name spoken kindly in the street.')
    ],
    3: [
      n('The rumor of Antonio\'s loss traveled faster than any confirmed report. In a trading city, fear itself could become a kind of currency.'),
      d('left', 'Shylock', 'He laughed at my bargains when his ships were proud. Let him learn what a debt means when the sea turns.'),
      n('Tubal did not comfort him. Each fact arrived with another wound: a ship lost, a jewel spent, a daughter beyond reach.'),
      d('left', 'Tubal', 'Other men speak of Antonio with pity. They say no merchant can stand if every venture fails together.'),
      n('In Belmont, Portia tried to delay because love had made her cautious. Bassanio heard delay as torture because hope had made him brave.'),
      d('right', 'Bassanio', 'If I wait, each hour will choose for me. Let my hand risk loss while my heart is honest.')
    ],
    4: [
      n('The portrait did not flatter Portia into a goddess. It caught something human in her face, and that made Bassanio trust the modest box more deeply.'),
      d('right', 'Portia', 'You see me happy, but also afraid. Accept both, or you do not accept me truly.'),
      d('right', 'Bassanio', 'I accept the lady, the fear, the fortune, and the honor of serving them all.'),
      n('For a moment Belmont seemed secure. The ceremony of rings and vows made time slow enough for joy to gather.'),
      n('Then Antonio\'s letter broke the music. Its urgent kindness hurt more than accusation because it refused to make Bassanio smaller.'),
      d('right', 'Portia', 'A love that cannot answer a friend\'s loss would be a poor beginning. Go quickly, and take my wealth with my trust.')
    ],
    5: [
      n('Portia did not boast of her plan. Her confidence came from reading closely, a habit many men in the play mistake for their own privilege.'),
      d('right', 'Portia', 'The law is a house with many doors. Shylock has entered one; we must find another before it closes.'),
      d('left', 'Nerissa', 'And if the court refuses two young strangers?'),
      d('right', 'Portia', 'Then our disguise must carry age in its voice and wisdom in its papers. Bellario will lend both.'),
      n('The ring test began as a jest, but Portia did not treat promises lightly. A loyal heart should survive gratitude as well as danger.'),
      d('left', 'Nerissa', 'Men call women changeable, yet they misplace vows in a single afternoon.'),
      n('Their journey turned marriage into partnership. While Bassanio raced toward mercy, Portia raced toward the means to make mercy lawful.')
    ],
    6: [
      n('Shylock sharpened his knife in public view. The sound made Bassanio flinch, but Antonio seemed almost peaceful, as if resistance were already spent.'),
      d('left', 'Antonio', 'Give him his penalty. I am a tainted wether of the flock, meetest for death.'),
      d('right', 'Portia', 'The court must honor law, or Venice loses the trust on which its commerce stands.'),
      n('That sentence frightened Bassanio because it sounded like defeat. Portia let the fear grow until Shylock trusted her strict judgment completely.'),
      d('left', 'Shylock', 'Most learned judge, a sentence! Come, prepare.'),
      d('right', 'Portia', 'The bond is clear about flesh. It is silent about blood. Let justice keep to its own quality.'),
      n('Only then did the room understand that exact words could protect life as fiercely as they had threatened it.'),
      n('The drop of blood became the hinge of the trial, small enough to miss and strong enough to turn the whole court.')
    ],
    7: [
      n('Shylock had demanded the contract without mercy, so Portia answered with legal precision rather than open softness. The reversal felt terrible and brilliant.'),
      d('right', 'Portia', 'You stand within his danger now. The law you invoked has another edge, and it is exact.'),
      n('Antonio chose conditions that looked merciful beside death but harsh beside freedom. The court accepted them because Venice wanted order restored.'),
      d('left', 'Antonio', 'I ask not for his life. Let property become provision for the daughter he cast away.'),
      n('No one in the room received a simple victory. Justice released Antonio, wounded Shylock, enriched Jessica, and exposed every old hatred underneath.'),
      d('right', 'Bassanio', 'If gratitude could purchase your reward, learned doctor, I would spend all Portia gave me.'),
      n('Portia heard the opening she needed. The great sentence ended; the smaller sentence of the ring could now begin.')
    ],
    8: [
      n('Bassanio told himself the gift was reasonable. A ring could be replaced, but Antonio could not. That argument sounded noble and incomplete.'),
      d('right', 'Bassanio', 'I grant the doctor honor, thanks, and money. Must the ring also go?'),
      d('left', 'Antonio', 'For my sake, let him have it. I once gave my body for your need; give this token for my release.'),
      n('Gratiano mocked the matter until Nerissa tested him too. Under pressure, his wit became a door through which his promise escaped.'),
      d('left', 'Gratiano', 'If I refuse, I look ungrateful. If I grant it, I go home guilty. That clerk has trapped me neatly.'),
      n('The women accepted the rings not because metal mattered, but because the token would prove how quickly men excuse themselves.'),
      d('right', 'Portia', 'Let them arrive before their stories grow too polished. Fresh regret speaks more honestly.')
    ],
    9: [
      n('The music in Belmont did not erase Venice; it answered it. After the noise of court, harmony made each guilty pause easier to hear.'),
      d('right', 'Portia', 'You gave away my token to a doctor. I wonder what else gratitude persuaded you to give.'),
      d('right', 'Bassanio', 'Nothing but the ring, and even that I would restore with my right hand if I could.'),
      n('When Portia revealed the document, Bassanio saw that the judge who saved Antonio had also watched his own failure at close range.'),
      d('left', 'Antonio', 'I was debtor once, then defendant, now surety for a marriage promise. Let this prove my faith better.'),
      n('The announcement of restored ships widened the ending beyond romance. Fortune returned to Antonio, while Jessica and Lorenzo became heir to a painful estate.'),
      n('Forgiveness in Belmont therefore sounded like music with a minor note: bright enough to dance to, honest enough to remember the cost.')
    ],
    10: [
      n('No one proposed another trial. They had all endured enough judgment for one night, and the future needed ordinary acts more than speeches.'),
      d('right', 'Portia', 'Let every document be read in daylight. At night we too easily mistake relief for understanding.'),
      n('Antonio accepted the advice. Wealth could restore credit and ships, but it could not release him from thinking about the hatred that almost killed him.'),
      d('left', 'Antonio', 'I am grateful for life. I must learn what to do with a life returned by another person\'s courage.'),
      n('Bassanio and Gratiano kept their rings, not as decorations but as small contracts renewed by embarrassment. Their future depended on remembering the lesson.'),
      d('right', 'Portia', 'Then let mercy become a habit, not a speech saved for courts. That is how peace may last.')
    ]
  }
};

const TOP_UPS = {
  little_prince: {
    1: [
      n('I had spent years hiding the child who drew from imagination. The little prince found that hidden part faster than any adult ever had.'),
      d('left', 'Little Prince', 'When you repair the engine, do you also repair the pilot?')
    ],
    2: [
      n('To help him, I made the baobab drawing bold and almost frightening. Children would understand that a root can begin as a thread and end as ruin.'),
      d('right', 'Narrator', 'I will draw the danger large, even if adults say the picture is too dramatic.')
    ],
    3: [
      n('While he spoke, I realized that leaving is sometimes easier than learning another heart. The rose had asked for shelter, but he had needed guidance too.'),
      d('left', 'Little Prince', 'I knew how to clean volcanoes. I did not know how to answer a flower.')
    ],
    4: [
      n('Each adult seemed trapped inside one word: command, admire, shame, calculate. The prince carried away those words like samples from empty planets.'),
      d('left', 'Little Prince', 'Grown-ups are very strange when one idea becomes their whole sky.'),
      n('Even the businessman looked poor while claiming stars. He possessed numbers, but he had no sunrise, no flower, and no one to miss him.'),
      d('left', 'Businessman', 'I am too busy for sunrise. I have totals to protect.')
    ],
    5: [
      n('The prince thought often of the lamplighter after leaving him. A faithful person without rest seemed nobler and sadder than a king without subjects.'),
      d('left', 'Little Prince', 'If I had stayed, perhaps we could have moved the chair slowly and shared sunsets between duties.'),
      n('The geographer noticed none of that feeling. He sharpened his pencil, ready to record distant facts, but unable to comfort a traveler before him.'),
      d('left', 'Geographer', 'Regret is not geography. Tell me instead whether your volcanoes are active.')
    ],
    6: [
      n('The snake did not chase him. That made the poison more frightening. It waited with patient certainty, like a door that opens only once.'),
      d('left', 'Little Prince', 'I came looking for people, but the first voice on Earth offers an ending.'),
      n('The garden then offered the opposite danger: not death, but too much beauty. It threatened to make his one beloved flower disappear into numbers.')
    ],
    7: [
      n('The fox never touched him, yet the tame bond became stronger than touch. It lived in hours, footsteps, wheat, and remembered waiting.'),
      d('left', 'Fox', 'The secret is simple only after you have paid for it with time.'),
      n('That was why the prince could return to the roses without envy. Care had given him a measure that appearance could not defeat.')
    ],
    8: [
      n('I had crossed the desert as a pilot seeking water; I returned from the well as a man who understood why children love hidden things.'),
      d('left', 'Little Prince', 'The supply of water matters, but the memory of finding it together matters too.'),
      n('His face grew serious again when he spoke of the rose, and the well seemed to echo the promise I had not completed.')
    ],
    9: [
      n('I looked for tracks, for any physical sign that would let me deny what happened. The sand offered nothing certain.'),
      d('right', 'Narrator', 'If this is peace, it is a peace that hurts.'),
      n('Yet the absence of his body also carried wonder. The desert had become a border, not merely a grave.')
    ],
    10: [
      n('I leave the question open because love often leaves us with questions. The answer may depend on how carefully we listen tonight.')
    ]
  },
  merchant_venice: {
    1: [
      n('Bassanio understood that friendship had become security for his desire. That knowledge did not stop him, but it made every borrowed ducat feel personal.'),
      d('right', 'Bassanio', 'If I win Portia, I must repay more than debt. I must prove Antonio right to trust me.')
    ],
    2: [
      n('Portia watched each failed choice with relief and fear together. Relief because she remained free; fear because the right man might choose just as badly.'),
      d('right', 'Portia', 'The caskets teach, but they do not comfort. A lesson can still leave a woman waiting.')
    ],
    3: [
      n('Shylock\'s revenge grew from injuries that Venice preferred not to count. The play lets him speak those injuries even as it shows his cruelty.'),
      d('left', 'Shylock', 'You taught me how to answer harm. Do not complain when the lesson returns.'),
      n('The rumor of loss therefore became more than business news; it became permission for old anger to step into daylight.')
    ],
    4: [
      n('Portia moved quickly because love had made Bassanio\'s danger her own. She did not pause to measure whether Antonio belonged to her household.'),
      d('right', 'Portia', 'Any friend who signs flesh for you enters my care as well.'),
      n('Bassanio left Belmont married, frightened, and newly aware that honor can demand departure at the very moment happiness begins.')
    ],
    5: [
      n('Bellario\'s books reached her before doubt could. Portia read through the night, turning scholarship into a weapon precise enough for court.'),
      d('right', 'Portia', 'We must not break the law. We must let the law reveal the part Shylock forgot to ask for.'),
      n('Nerissa practiced the clerk\'s walk and voice. Their disguise depended on confidence, but also on a world too ready to trust male clothing.'),
      d('left', 'Nerissa', 'If they call me learned, I shall try not to laugh.')
    ],
    6: [
      n('The Duke wanted mercy without knowing how to command it. Bassanio wanted justice bent without admitting that such bending could endanger every contract.'),
      d('right', 'Portia', 'A court cannot live by pity alone. If mercy comes, it must enter without destroying law.'),
      n('That was Portia\'s genius. She did not defeat Shylock by ignoring strict words; she defeated him by reading them more strictly than he did.'),
      d('left', 'Shylock', 'I stand for judgment. Let no one soften what I have purchased.'),
      n('The knife, the scales, and the silent crowd turned abstract justice into something physical, immediate, and terrifying.')
    ],
    7: [
      n('Bassanio did not yet recognize Portia, but he had begun to depend on her mind. The irony would become clear only in Belmont.'),
      d('left', 'Antonio', 'I am free, yet not light. A man can be released and still carry the court inside him.')
    ],
    8: [
      n('Portia did not need the ring for wealth. She needed it as a truthful object, a small witness that could not flatter or explain itself.'),
      d('right', 'Portia', 'A promise kept only when convenient is not loyal. Let the token travel home before the excuse does.'),
      n('Nerissa enjoyed the game more openly, but she understood the lesson. Marriage vows deserved memory even when no court stood nearby.'),
      d('left', 'Nerissa', 'My husband will make a speech. I intend to make him finish it without the ring.')
    ],
    9: [
      n('Portia did not humiliate Bassanio merely to win. She restored the ring so the promise could begin again with clearer knowledge.'),
      d('right', 'Bassanio', 'Your mercy after my confession teaches me more than your anger did.')
    ],
    10: [
      n('The couples remained imperfect, which made the ending livable. They had not escaped law, money, prejudice, or desire; they had survived their collision.'),
      d('left', 'Lorenzo', 'Let music announce what papers cannot: that the future is open, but not innocent.'),
      n('By daylight, every bond looked different. Some were legal, some marital, some chosen by friendship, and all required care beyond words.')
    ]
  }
};

const FINAL_TOP_UPS = {
  little_prince: {
    1: [
      n('I noticed, too, that he never treated the drawing as a trick. To him the box was practical because it protected the sheep and protected my pride.'),
      d('right', 'Narrator', 'That small mercy was the first repair he made in me.')
    ],
    2: [
      n('He described sunsets with the same care he gave to weeds. On a tiny planet, beauty and danger both arrive close enough to touch.'),
      d('left', 'Little Prince', 'If you wait one minute and move the chair, evening can happen again.')
    ],
    3: [
      n('The more he remembered, the more the rose changed in his telling. She was no longer only vain; she was delicate, proud, afraid, and beloved.'),
      d('left', 'Little Prince', 'I left because I was hurt, but I think she was hurt first.')
    ],
    4: [
      n('Those visits did not make him wiser all at once. They made him suspicious of wisdom that never kneels down to water anything.'),
      d('left', 'Little Prince', 'A star should belong to someone who can love its light, not only write its number.'),
      n('So each planet pushed him onward, away from hollow authority and toward the harder authority of care.')
    ],
    5: [
      n('The lamplighter remained the one adult whose seriousness seemed connected to service. That difference mattered to the prince more than the man knew.'),
      d('left', 'Little Prince', 'If I ever become serious, I hope it is for a lamp or a flower, not for a ledger.'),
      n('The geographer gave him direction, but the lamplighter gave him an example of duty with a human cost.')
    ],
    6: [
      n('Among the roses, he began to understand that numbers can wound as deeply as they can impress. One beloved thing had been buried under thousands.'),
      d('left', 'Little Prince', 'Maybe I was wrong to ask whether she was rare. I should ask whether I was faithful.'),
      n('That question prepared him for the fox before he knew the fox existed.')
    ],
    7: [
      n('The fox did not make friendship easy. He made it exact: same hour, same patience, same willingness to be changed by another life.'),
      d('left', 'Fox', 'You become responsible forever, not because anyone forces you, but because your heart learns a name.'),
      n('The prince carried that sentence back to his rose like a lamp lit for the journey home.')
    ],
    8: [
      n('When I lifted the bucket, I felt the rope pull through my hands like proof that invisible things still ask for physical effort.'),
      d('right', 'Narrator', 'The water was clear, but what I tasted most was the walk that led us there.'),
      n('The prince smiled because that was exactly what he had hoped I would understand.')
    ],
    9: [
      n('I could not decide whether he was brave or impossibly young. Perhaps he was both, and perhaps love often looks like both at once.'),
      d('left', 'Little Prince', 'Do not come with anger in your heart. The stars will need room to laugh.'),
      n('That request was almost unbearable, because it asked me to prepare for wonder while standing beside fear.')
    ],
    10: [
      n('The story ends there only because my knowledge ends there. His life, if he returned, belongs again to his rose and his star.'),
      d('right', 'Narrator', 'Mine belongs to listening for him.')
    ]
  },
  merchant_venice: {
    1: [
      n('The bond therefore entered the story as both joke and threat. Antonio heard the joke because he trusted ships; Shylock kept the threat because he remembered insults.'),
      d('left', 'Shylock', 'Call it merry if you like. I call it written.')
    ],
    2: [
      n('Portia could not stop the trials, but she could read the men who entered them. Their choices revealed what their speeches tried to hide.'),
      d('left', 'Nerissa', 'The caskets speak less than the suitors do before opening them.'),
      n('By night, Belmont and Venice were both full of disguises, some chosen for love and some forced by law.')
    ],
    3: [
      n('Bassanio did not hear the worst of the rumor until after hope had opened before him. Shakespeare lets joy and danger arrive almost together.'),
      d('right', 'Portia', 'Choose, then. If music cannot calm me, perhaps truth will.'),
      n('The lead casket waited while Venice tightened around Antonio.')
    ],
    4: [
      n('Portia did not treat wealth as decoration. Once Antonio needed help, her fortune became movement: horses, money, letters, and immediate command.'),
      d('right', 'Bassanio', 'I came to win a wife and found a partner stronger than my fear.'),
      n('That knowledge made leaving both easier and more painful.')
    ],
    5: [
      n('The disguise also revealed a rule of her world: Portia could own wealth, but authority in court required a borrowed male shape.'),
      d('right', 'Portia', 'If Venice will not hear Portia, it may hear Balthazar. The truth can travel under another name.'),
      n('Nerissa understood. Their comedy had a serious door hidden inside it.')
    ],
    6: [
      n('Every person in the court wanted an outcome, but Portia needed a method. Without method, mercy would look like favoritism and justice like murder.'),
      d('right', 'Portia', 'Stand ready, Antonio. Stand ready, Shylock. The words you signed are about to speak for themselves.'),
      n('The whole room leaned toward the bond.')
    ],
    7: [
      n('After Shylock left, the court did not celebrate loudly. The victory had too much damage inside it, and Portia knew the silence mattered.'),
      d('right', 'Portia', 'Go, Antonio. Your life is restored, but let the memory of this edge remain useful.'),
      n('Then she turned the scene toward rings, where private promises could be weighed after public danger.')
    ],
    8: [
      n('The ring moved from finger to messenger to disguised wife, gathering meanings at every step. It was no longer jewelry; it was evidence.'),
      d('left', 'Gratiano', 'I pray Nerissa values gratitude, because I have spent obedience very badly.'),
      n('His joke would sound smaller when the clerk became Nerissa again.')
    ],
    9: [
      n('The reveal gave Portia authority in her own house without the robe. She no longer needed disguise because the proof had arrived before argument.'),
      d('right', 'Portia', 'Keep the ring now with knowledge, not with easy poetry.'),
      n('Bassanio accepted the rebuke because love had survived being corrected.')
    ],
    10: [
      n('The ending is comic because marriages hold, ships return, and music plays. It is serious because every happiness has passed through someone else\'s pain.'),
      d('right', 'Portia', 'Let us keep the comedy honest. A restored house should remember the storm outside it.'),
      n('That memory is what gives the final harmony weight.')
    ]
  }
};

function ensureDir(dir) {
  fs.mkdirSync(path.join(ROOT, dir), { recursive: true });
}

function normalize(token) {
  return token
    .toLowerCase()
    .replace(/^[^a-z]+/, '')
    .replace(/[^a-z]+$/, '');
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function buildEpisode(workSeen, episode) {
  const targetSet = new Set(episode.targets);
  const found = new Set();
  const vocabByKey = new Map();

  const messages = episode.messages.map((message) => {
    const words = message.text.trim().split(/\s+/);
    const marks = [];

    words.forEach((token, index) => {
      const word = normalize(token);
      if (!targetSet.has(word)) return;

      found.add(word);
      const definition = DEFINITIONS[word];
      if (!definition) {
        throw new Error(`Missing definition for ${word} in episode ${episode.ep}`);
      }
      const key = `${word}\u0000${definition}`;
      const isNew = !workSeen.has(key);
      if (isNew) workSeen.add(key);
      marks.push({ word, index, definition, is_new: isNew });

      if (!vocabByKey.has(key)) {
        vocabByKey.set(key, { word, definition, is_new: isNew });
      } else if (isNew) {
        vocabByKey.get(key).is_new = true;
      }
    });

    const { targets, ...cleanMessage } = message;
    return { ...cleanMessage, marks };
  });

  const missing = episode.targets.filter((word) => !found.has(word));
  if (missing.length) {
    throw new Error(`Episode ${episode.ep} "${episode.title}" missing targets: ${missing.join(', ')}`);
  }

  return {
    meta: { ep: episode.ep, title: episode.title, kind: 'main' },
    messages,
    vocab: Array.from(vocabByKey.values())
  };
}

function writeWork(work) {
  ensureDir(work.outDir);
  ensureDir(work.charactersDir);

  fs.writeFileSync(
    path.join(ROOT, work.charactersDir, 'characters.json'),
    `${JSON.stringify(work.characters, null, 2)}\n`,
  );

  const seen = new Set();
  const report = [];

  for (const episode of work.episodes) {
    const sourceEpisode = {
      ...episode,
      messages: [
        ...episode.messages,
        ...(EXPANSIONS[work.id]?.[episode.ep] ?? []),
        ...(TOP_UPS[work.id]?.[episode.ep] ?? []),
        ...(FINAL_TOP_UPS[work.id]?.[episode.ep] ?? [])
      ]
    };
    const built = buildEpisode(seen, sourceEpisode);
    const filename = `ep${String(episode.ep).padStart(2, '0')}.json`;
    fs.writeFileSync(
      path.join(ROOT, work.outDir, filename),
      `${JSON.stringify(built, null, 2)}\n`,
    );

    const totalWords = built.messages.reduce((sum, message) => sum + wordCount(message.text), 0);
    const maxMessageWords = Math.max(...built.messages.map((message) => wordCount(message.text)));
    const dialogueWords = built.messages
      .filter((message) => message.type === 'dialogue')
      .reduce((sum, message) => sum + wordCount(message.text), 0);
    const newCount = built.vocab.filter((item) => item.is_new).length;
    const reviewCount = built.vocab.length - newCount;

    if (process.env.SKIP_DEMO_LIMITS !== '1' && (totalWords < 560 || totalWords > 700)) {
      throw new Error(`${work.id} ep${episode.ep} word count ${totalWords} outside 560-700`);
    }
    if (process.env.SKIP_DEMO_LIMITS !== '1' && (built.vocab.length < 8 || built.vocab.length > 12)) {
      throw new Error(`${work.id} ep${episode.ep} vocab count ${built.vocab.length} outside 8-12`);
    }
    if (process.env.SKIP_DEMO_LIMITS !== '1' && maxMessageWords > 45) {
      throw new Error(`${work.id} ep${episode.ep} has long message with ${maxMessageWords} words`);
    }

    report.push({
      ep: episode.ep,
      words: totalWords,
      vocab: built.vocab.length,
      new: newCount,
      review: reviewCount,
      dialoguePct: Math.round((dialogueWords / totalWords) * 100),
      maxMessageWords
    });
  }

  return report;
}

function writeWordList() {
  const allWords = Array.from(new Set([
    ...Object.keys(DEFINITIONS),
    ...EXTRA_CET4_CORE_WORDS
  ])).sort((a, b) => a.localeCompare(b));

  ensureDir('assets');
  fs.writeFileSync(
    path.join(ROOT, 'assets/cet4-core-vocabulary.txt'),
    `${allWords.join('\n')}\n`,
  );
}

function main() {
  writeWordList();

  for (const work of works) {
    const report = writeWork(work);
    console.log(work.id);
    for (const row of report) {
      console.log(
        `  ep${String(row.ep).padStart(2, '0')}: ${row.words} words, ` +
        `${row.vocab} vocab (${row.new} new/${row.review} review), ` +
        `${row.dialoguePct}% dialogue, max ${row.maxMessageWords}`,
      );
    }
  }
}

main();
