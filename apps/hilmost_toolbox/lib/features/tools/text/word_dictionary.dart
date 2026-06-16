class WordDictionary {
  static const List<String> commonWords = [
    'cat', 'bat', 'rat', 'mat', 'pat', 'sat', 'fat', 'hat', 'vat',
    'dog', 'log', 'bog', 'fog', 'hog', 'jog', 'cog',
    'car', 'bar', 'far', 'jar', 'tar', 'war',
    'book', 'look', 'took', 'cook', 'hook', 'nook', 'rook',
    'bear', 'gear', 'fear', 'hear', 'near', 'pear', 'tear', 'wear', 'year',
    'tree', 'free', 'glee', 'flee',
    'bird', 'nerd', 'herd',
    'house', 'mouse', 'louse',
    'apple', 'maple', 'staple',
    'banana', 'cabana',
    'orange', 'strange',
    'grape', 'shape', 'drape', 'crape', 'scrape',
    'melon', 'felon',
    'water', 'cater', 'later', 'mater', 'rater',
    'fire', 'mire', 'sire', 'tire', 'wire',
    'earth', 'hearth', 'dearth',
    'wind', 'mind', 'bind', 'find', 'kind', 'rind',
    'light', 'might', 'night', 'right', 'sight', 'tight', 'fight', 'flight',
    'dark', 'bark', 'lark', 'mark', 'park', 'spark',
    'time', 'dime', 'lime', 'mime', 'rime',
    'space', 'grace', 'lace', 'mace', 'pace', 'race', 'brace', 'trace',
    'star', 'scar',
    'moon', 'noon', 'soon', 'boon', 'loon',
    'sun', 'bun', 'fun', 'gun', 'nun', 'pun', 'run', 'stun',
    'planet',
    'galaxy',
    'universe',
    'word', 'cord', 'ford', 'lord', 'sword',
    'letter', 'better', 'fetter', 'setter',
    'number', 'lumber', 'slumber',
    'code', 'node', 'mode', 'rode',
    'data',
    'computer',
    'phone', 'clone', 'drone', 'prone', 'stone', 'tone', 'bone',
    'screen', 'green', 'teen',
    'mouse',
    'keyboard',
    'table', 'cable', 'fable', 'gable',
    'chair', 'hair', 'stair', 'pair', 'fair',
    'desk',
    'pen', 'den', 'hen', 'men', 'ten',
    'pencil', 'stencil',
    'paper', 'caper', 'taper',
    'book',
    'read', 'bead', 'lead', 'mead',
    'write', 'bite', 'kite', 'mite', 'site', 'white', 'spite',
    'speak', 'beak', 'leak', 'peak', 'weak', 'sneak',
    'listen', 'glisten',
    'hear',
    'see', 'bee', 'fee', 'tee', 'wee',
    'look',
    'watch', 'batch', 'catch', 'hatch', 'latch', 'match', 'patch',
    'feel', 'peel', 'reel', 'steel', 'wheel',
    'touch', 'pouch', 'vouch',
    'taste', 'baste', 'haste', 'paste', 'waste',
    'smell', 'bell', 'cell', 'dell', 'fell', 'hell', 'sell', 'tell', 'well',
    'good', 'hood', 'wood',
    'bad', 'dad', 'fad', 'had', 'lad', 'mad', 'pad', 'sad',
    'happy', 'snappy',
    'sad',
    'angry',
    'scared',
    'brave', 'crave', 'grave', 'pave', 'rave', 'save', 'wave',
    'smart', 'art', 'cart', 'dart', 'mart', 'part', 'tart', 'start',
    'dumb', 'crumb', 'numb', 'plumb', 'thumb',
    'fast', 'cast', 'last', 'mast', 'past', 'vast', 'blast',
    'slow', 'blow', 'flow', 'glow', 'know', 'low', 'mow', 'row', 'show', 'snow', 'tow',
    'high', 'sigh', 'thigh',
    'low',
    'big', 'dig', 'fig', 'gig', 'jig', 'pig', 'rig', 'wig',
    'small', 'all', 'ball', 'call', 'fall', 'gall', 'hall', 'mall', 'tall', 'wall', 'stall',
    'tall',
    'short', 'fort', 'port', 'sort',
    'long', 'bong', 'gong', 'pong', 'song', 'strong',
    'wide', 'bide', 'hide', 'ride', 'side', 'tide', 'bride', 'glide', 'pride',
    'narrow', 'arrow', 'marrow', 'sparrow',
    'thick', 'brick', 'click', 'flick', 'kick', 'lick', 'pick', 'sick', 'tick', 'trick', 'stick',
    'thin', 'bin', 'din', 'fin', 'kin', 'pin', 'sin', 'tin', 'win', 'chin', 'grin', 'shin', 'spin',
    'heavy',
    'light',
    'hard', 'card', 'lard', 'yard',
    'soft', 'croft', 'loft',
    'rough', 'tough',
    'smooth',
    'hot', 'cot', 'dot', 'got', 'jot', 'lot', 'not', 'pot', 'rot', 'tot', 'shot', 'spot',
    'cold', 'bold', 'fold', 'gold', 'hold', 'mold', 'sold', 'told', 'scold',
    'warm', 'arm', 'farm', 'harm', 'charm', 'swarm',
    'cool', 'fool', 'pool', 'tool', 'stool',
    'wet', 'bet', 'get', 'jet', 'let', 'met', 'net', 'pet', 'set', 'vet',
    'dry', 'cry', 'fry', 'pry', 'try', 'fly', 'sly',
    'clean', 'bean', 'dean', 'lean', 'mean', 'wean',
    'dirty',
    'new', 'dew', 'few', 'mew', 'pew', 'stew', 'brew', 'crew', 'drew', 'flew', 'grew', 'knew', 'blew',
    'old',
    'young', 'hung', 'lung', 'rung', 'sung',
    'true', 'blue', 'clue', 'flue', 'glue',
    'false',
    'right',
    'wrong',
    'yes',
    'no', 'go', 'so', 'to', 'do',
    'maybe',
    'please', 'tease',
    'thanks', 'banks', 'ranks', 'tanks', 'blanks',
    'hello', 'jello',
    'goodbye',
    'friend', 'blend', 'lend', 'mend', 'rend', 'send', 'tend', 'spend', 'trend',
    'enemy',
    'family',
    'mother', 'brother', 'other',
    'father', 'gather',
    'sister', 'blister',
    'brother',
    'son', 'won', 'ton',
    'daughter',
    'husband',
    'wife', 'life', 'knife',
    'man', 'can', 'ban', 'fan', 'pan', 'ran', 'tan', 'van', 'plan', 'scan',
    'woman',
    'boy', 'coy', 'joy', 'soy', 'toy',
    'girl', 'twirl', 'whirl', 'swirl',
    'child', 'mild', 'wild',
    'baby',
    'person',
    'people', 'steeple',
    'city', 'pity',
    'town', 'brown', 'crown', 'down', 'frown', 'gown',
    'village', 'pillage',
    'country',
    'world', 'furled',
    'hello', 'word', 'scramble', 'unscramble', 'anagram', 'flutter', 'dart', 'app', 'web', 'tool', 'utilities',
    // a few more common 3/4 letter words
    'act', 'add', 'age', 'aim', 'air', 'and', 'any', 'are', 'art', 'ask', 'ate', 'bad', 'bag', 'bay',
    'bed', 'bee', 'beg', 'bet', 'big', 'bit', 'box', 'boy', 'bug', 'bus', 'but', 'buy', 'can', 'car',
    'cat', 'cow', 'cry', 'cup', 'cut', 'dad', 'day', 'did', 'dog', 'dry', 'ear', 'eat', 'egg', 'end',
    'eye', 'far', 'fat', 'few', 'fit', 'fix', 'fly', 'for', 'fun', 'gas', 'get', 'god', 'got', 'gum',
    'guy', 'gym', 'had', 'has', 'hat', 'her', 'hey', 'hid', 'him', 'his', 'hit', 'hot', 'how', 'hub',
    'hut', 'ice', 'ill', 'ink', 'jam', 'jar', 'jaw', 'job', 'joy', 'key', 'kid', 'lab', 'lap', 'law',
    'lay', 'leg', 'let', 'lie', 'lip', 'log', 'lot', 'low', 'mac', 'mad', 'man', 'map', 'mat', 'may',
    'men', 'met', 'mix', 'mob', 'mom', 'mop', 'mud', 'mug', 'net', 'new', 'nod', 'not', 'now', 'nut',
    'oak', 'odd', 'off', 'old', 'one', 'our', 'out', 'owl', 'own', 'pad', 'pan', 'pat', 'paw', 'pay',
    'pen', 'pet', 'pie', 'pig', 'pin', 'pit', 'pod', 'pop', 'pot', 'pro', 'put', 'rag', 'ran', 'rat',
    'raw', 'red', 'rib', 'rid', 'rip', 'rob', 'rod', 'row', 'rub', 'run', 'sad', 'sat', 'saw', 'say',
    'sea', 'see', 'set', 'she', 'sin', 'sit', 'six', 'sky', 'son', 'sub', 'sun', 'tag', 'tap', 'tax',
    'tea', 'ten', 'tie', 'tin', 'tip', 'toe', 'ton', 'too', 'top', 'toy', 'try', 'tub', 'two', 'use',
    'van', 'vat', 'vet', 'via', 'war', 'was', 'way', 'web', 'wet', 'who', 'why', 'win', 'won', 'yes',
    'yet', 'you', 'zip', 'zoo', 'able', 'also', 'area', 'army', 'away', 'baby', 'back', 'ball', 'band',
    'bank', 'base', 'bath', 'bear', 'beat', 'been', 'beer', 'bell', 'belt', 'best', 'bill', 'bird',
    'blow', 'blue', 'boat', 'body', 'bomb', 'bond', 'bone', 'book', 'boom', 'born', 'boss', 'both',
    'bowl', 'bulk', 'burn', 'bush', 'busy', 'call', 'calm', 'came', 'camp', 'card', 'care', 'case',
    'cash', 'cast', 'cell', 'chat', 'chip', 'city', 'club', 'coal', 'coat', 'code', 'cold', 'come',
    'cook', 'cool', 'cope', 'copy', 'core', 'cost', 'crew', 'crop', 'dark', 'data', 'date', 'dawn',
    'days', 'dead', 'deal', 'dean', 'dear', 'debt', 'deep', 'deer', 'desk', 'dial', 'dick', 'diet',
    'disk', 'does', 'done', 'door', 'dose', 'down', 'draw', 'drop', 'dual', 'duke', 'dust', 'duty',
    'each', 'earn', 'ease', 'east', 'easy', 'edge', 'else', 'even', 'ever', 'evil', 'exit', 'face',
    'fact', 'fail', 'fair', 'fall', 'farm', 'fast', 'fate', 'fear', 'feed', 'feel', 'feet', 'fell',
    'felt', 'file', 'fill', 'film', 'find', 'fine', 'fire', 'firm', 'fish', 'five', 'flat', 'flow',
    'food', 'foot', 'ford', 'form', 'fort', 'four', 'free', 'from', 'fuel', 'full', 'fund', 'gain',
    'game', 'gate', 'gave', 'gear', 'gene', 'gift', 'girl', 'give', 'glad', 'goal', 'goes', 'gold',
    'golf', 'good', 'gray', 'grew', 'grey', 'grow', 'gulf', 'hair', 'half', 'hall', 'hand', 'hang',
    'hard', 'harm', 'hate', 'have', 'head', 'hear', 'heat', 'held', 'hell', 'help', 'here', 'hero',
    'high', 'hill', 'hire', 'hold', 'hole', 'holy', 'home', 'hope', 'host', 'hour', 'huge', 'hung',
    'hunt', 'hurt', 'idea', 'inch', 'into', 'iron', 'item', 'jack', 'jane', 'jean', 'john', 'join',
    'jump', 'jury', 'just', 'keen', 'keep', 'kent', 'kept', 'kick', 'kill', 'kind', 'king', 'knee',
    'knew', 'know', 'lack', 'lady', 'laid', 'lake', 'land', 'lane', 'last', 'late', 'lead', 'left',
    'less', 'life', 'lift', 'like', 'line', 'link', 'list', 'live', 'load', 'loan', 'lock', 'logo',
    'long', 'look', 'lord', 'lose', 'loss', 'lost', 'love', 'luck', 'made', 'mail', 'main', 'make',
    'male', 'many', 'mark', 'mass', 'matt', 'meal', 'mean', 'meat', 'meet', 'menu', 'mere', 'mike',
    'mile', 'milk', 'mill', 'mind', 'mine', 'miss', 'mode', 'mood', 'moon', 'more', 'most', 'move',
    'much', 'must', 'name', 'navy', 'near', 'neck', 'need', 'news', 'next', 'nice', 'nine', 'none',
    'noon', 'norm', 'nose', 'note', 'okay', 'once', 'only', 'onto', 'open', 'oral', 'over', 'pace',
    'pack', 'page', 'paid', 'pain', 'pair', 'palm', 'park', 'part', 'pass', 'past', 'path', 'peak',
    'peer', 'pool', 'poor', 'port', 'post', 'pull', 'pure', 'push', 'race', 'rail', 'rain', 'rank',
    'rare', 'rate', 'read', 'real', 'rear', 'rely', 'rent', 'rest', 'rice', 'rich', 'ride', 'ring',
    'rise', 'risk', 'road', 'rock', 'role', 'roll', 'roof', 'room', 'root', 'rose', 'rule', 'rush',
    'ruth', 'safe', 'said', 'sake', 'sale', 'salt', 'same', 'sand', 'save', 'seat', 'seed', 'seek',
    'seem', 'seen', 'self', 'sell', 'send', 'sent', 'sept', 'ship', 'shop', 'shot', 'show', 'shut',
    'sick', 'side', 'sign', 'site', 'size', 'skin', 'slip', 'slow', 'snow', 'soft', 'soil', 'sold',
    'sole', 'some', 'song', 'soon', 'sort', 'soul', 'spot', 'star', 'stay', 'step', 'stop', 'such',
    'suit', 'sure', 'take', 'tale', 'talk', 'tall', 'tank', 'tape', 'task', 'team', 'tear', 'tell',
    'tent', 'term', 'test', 'text', 'than', 'that', 'thee', 'them', 'then', 'they', 'thin', 'this',
    'thou', 'thus', 'time', 'tiny', 'told', 'toll', 'tone', 'tony', 'took', 'tool', 'tour', 'town',
    'tree', 'trip', 'true', 'tune', 'turn', 'twin', 'type', 'unit', 'upon', 'used', 'user', 'vary',
    'vast', 'very', 'vice', 'view', 'vote', 'wage', 'wait', 'wake', 'walk', 'wall', 'want', 'ward',
    'warm', 'wash', 'wave', 'ways', 'weak', 'wear', 'week', 'well', 'went', 'were', 'west', 'what',
    'when', 'whom', 'wide', 'wife', 'wild', 'will', 'wind', 'wine', 'wing', 'wire', 'wise', 'wish',
    'with', 'wood', 'word', 'wore', 'work', 'yard', 'yeah', 'year', 'your', 'zero', 'zone',
  ];

  static Map<String, int> _getCharCounts(String str) {
    Map<String, int> counts = {};
    for (int i = 0; i < str.length; i++) {
      String char = str[i];
      counts[char] = (counts[char] ?? 0) + 1;
    }
    return counts;
  }

  static List<String> unscramble(String letters) {
    if (letters.trim().isEmpty) return [];

    String lowerLetters = letters.toLowerCase().replaceAll(RegExp(r'[^a-z]'), '');
    Map<String, int> letterCounts = _getCharCounts(lowerLetters);
    
    List<String> results = [];

    for (String word in commonWords) {
      if (word.length > lowerLetters.length) continue;

      Map<String, int> wordCounts = _getCharCounts(word);
      bool canMake = true;

      for (String char in wordCounts.keys) {
        if ((letterCounts[char] ?? 0) < wordCounts[char]!) {
          canMake = false;
          break;
        }
      }

      if (canMake) {
        results.add(word);
      }
    }

    // Sort by length (descending) and then alphabetically
    results.sort((a, b) {
      if (a.length != b.length) {
        return b.length.compareTo(a.length);
      }
      return a.compareTo(b);
    });

    return results;
  }
}
