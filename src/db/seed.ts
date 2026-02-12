import { db, generateId } from './database';
import type { Topic, Card } from '../types';

const SEED_KEY = 'apologetica-seeded-v2';

export async function seedInitialData() {
  // Check if already seeded
  if (localStorage.getItem(SEED_KEY)) {
    return;
  }

  // Check if data exists
  const existingTopics = await db.topics.count();
  if (existingTopics > 0) {
    localStorage.setItem(SEED_KEY, 'true');
    return;
  }

  console.log('Seeding initial data...');

  // Create topics
  const topics: Topic[] = [
    {
      id: generateId(),
      name: 'The Eucharist',
      slug: 'eucharist',
      description: 'Real Presence, Transubstantiation, John 6',
      icon: '🍞',
      order: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      name: 'Saints & Mary',
      slug: 'saints',
      description: 'Intercession, Communion of Saints, Marian Dogmas',
      icon: '🙏',
      order: 2,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      name: 'Faith & Works',
      slug: 'faith-works',
      description: 'Justification, Sola Fide, James vs Paul',
      icon: '⚖️',
      order: 3,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      name: 'Authority & Scripture',
      slug: 'authority',
      description: 'Sola Scriptura, Tradition, the Magisterium, Papacy',
      icon: '📜',
      order: 4,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      name: 'The Trinity',
      slug: 'trinity',
      description: 'Divinity of Christ, Holy Spirit, Non-Trinitarian refutations',
      icon: '✝️',
      order: 5,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      name: 'Baptism',
      slug: 'baptism',
      description: 'Infant Baptism, Baptismal Regeneration, Symbol vs Sacrament',
      icon: '💧',
      order: 6,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      name: 'Confession',
      slug: 'confession',
      description: 'Sacrament of Reconciliation, Priestly Absolution',
      icon: '🙇',
      order: 7,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  await db.topics.bulkAdd(topics);

  // Create cards
  const cards: Card[] = [
    // ==================== EUCHARIST ====================
    {
      id: generateId(),
      topicId: topics[0].id,
      front: {
        primary: "Jesus said 'the flesh profits nothing' - He clearly wasn't speaking literally about eating His flesh!",
        scriptureRefs: [{ book: 'John', chapter: 6, verseStart: 63 }],
        notes: "Common Protestant objection to Real Presence"
      },
      back: {
        primary: "If 'flesh profits nothing' meant Jesus's flesh was useless, the Crucifixion would be pointless!\n\n'Flesh vs Spirit' in Scripture means 'human understanding vs divine grace' - not 'physical vs metaphorical'.\n\nPlus, if Jesus was speaking figuratively, why did His disciples LEAVE Him?",
        scriptureRefs: [{ book: 'John', chapter: 6, verseStart: 66 }],
        technique: 'boomerang',
        notes: "They understood Him literally and left - He didn't correct them"
      },
      tags: ['john-6', 'real-presence'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[0].id,
      front: {
        primary: "The Eucharist is just a symbol. The Catholic Church invented the 'Real Presence' later in history.",
        scriptureRefs: [],
        notes: "Historical objection"
      },
      back: {
        primary: "The Holy Spirit Failure Argument:\n\n1. Jesus promised the Spirit would guide the Church into all truth (John 16:13)\n2. For 1,500 years, the ENTIRE global Church (East & West) worshipped the Eucharist as God's Body\n3. If it's just bread, that's IDOLATRY - a damnable heresy\n\nEither accept the Real Presence, or admit the Holy Spirit failed to protect the Church.",
        scriptureRefs: [{ book: 'John', chapter: 16, verseStart: 13 }],
        technique: 'principle',
        notes: "The Didache (1st century) confirms early belief in Real Presence"
      },
      tags: ['history', 'holy-spirit'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[0].id,
      front: {
        primary: "Jesus was sitting right there at the Last Supper. How could the bread be His body when He was alive in the flesh?",
        scriptureRefs: [],
        notes: "Timing objection"
      },
      back: {
        primary: "The Time Argument:\n\nIf Jesus can make His body present NOW (2,000 years after He died and rose), why couldn't He make it present 12 hours BEFORE the Crucifixion?\n\nGod is outside of time. The Cross is an eternal reality. Jesus can distribute the fruits of the Cross before the physical event just as easily as after.",
        scriptureRefs: [],
        technique: 'principle',
        notes: "Same God who chose to become man chose to give us His flesh in bread"
      },
      tags: ['last-supper', 'timing'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[0].id,
      front: {
        primary: "If you take the Eucharist unworthily, it's just disrespecting a symbol. What's the big deal?",
        scriptureRefs: [{ book: '1 Corinthians', chapter: 11, verseStart: 27, verseEnd: 29 }],
        notes: "Symbol argument"
      },
      back: {
        primary: "Paul says eating unworthily makes you 'guilty of the BODY and BLOOD of the Lord.'\n\nIf I tear up a photo of your mother, I'm guilty of disrespecting her memory - but NOT guilty of murdering her.\n\nPaul says you're guilty of the PERSON - the body and blood itself. You can only be guilty of someone's body if that body is actually THERE.",
        scriptureRefs: [{ book: '1 Corinthians', chapter: 11, verseStart: 27 }],
        technique: 'boomerang',
        notes: "You can't be guilty of a symbol"
      },
      tags: ['paul', 'corinthians'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },

    // ==================== SAINTS & MARY ====================
    {
      id: generateId(),
      topicId: topics[1].id,
      front: {
        primary: "1 Timothy 2:5 says there is only ONE mediator between God and man - Christ Jesus. Praying to Mary undermines Jesus!",
        scriptureRefs: [{ book: '1 Timothy', chapter: 2, verseStart: 5 }],
        notes: "Most common objection to saints"
      },
      back: {
        primary: "Read 4 verses EARLIER in the same chapter:\n\n'I urge that supplications, prayers, INTERCESSIONS... be made for all people.'\n\nIf asking for intercession violated Jesus's mediation, Paul contradicts himself in the SAME PARAGRAPH.\n\nMediator ≠ Intercessor. Jesus is the one Mediator; we are all intercessors for each other.",
        scriptureRefs: [
          { book: '1 Timothy', chapter: 2, verseStart: 1 },
          { book: '1 Timothy', chapter: 2, verseStart: 5 }
        ],
        technique: 'boomerang',
        notes: "The context destroys the objection"
      },
      tags: ['intercession', 'timothy'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[1].id,
      front: {
        primary: "Dead people can't hear you! The saints are 'asleep' and disconnected from us on earth.",
        scriptureRefs: [],
        notes: "Awareness objection"
      },
      back: {
        primary: "The Abraham Bridge:\n\nIn Luke 16 (Rich Man & Lazarus), Abraham died 400+ years BEFORE Moses. Yet Abraham KNEW the rich man's brothers had 'Moses and the Prophets.'\n\nHow did Abraham know about writings that didn't exist when he died?\n\nGod made him aware. Saints in heaven are MORE aware of earthly events, not less.",
        scriptureRefs: [{ book: 'Luke', chapter: 16, verseStart: 19, verseEnd: 31 }],
        technique: 'bridge',
        notes: "Hebrews 12:1 calls them a 'cloud of witnesses' - they're watching"
      },
      tags: ['awareness', 'abraham'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[1].id,
      front: {
        primary: "Show me the exact verse that says 'Pray to Mary' or 'Pray to dead saints.'",
        scriptureRefs: [],
        notes: "Proof-text demand"
      },
      back: {
        primary: "The Shamoun Principle:\n\nDoes Jesus say 'I am God' in those exact words? No.\nBut the PRINCIPLES are in Scripture.\n\nSame for saints:\n1. We MUST pray for each other (Eph 6:18)\n2. Righteous prayers are powerful (James 5:16)\n3. Saints in heaven are 'perfected' (Heb 12:23)\n4. They present our prayers to God (Rev 5:8)\n\nIf they're alive, perfected, aware, and loving - they're praying for us.",
        scriptureRefs: [
          { book: 'Ephesians', chapter: 6, verseStart: 18 },
          { book: 'Hebrews', chapter: 12, verseStart: 22, verseEnd: 24 },
          { book: 'Revelation', chapter: 5, verseStart: 8 }
        ],
        technique: 'bridge',
        notes: "Build the logical chain from biblical principles"
      },
      tags: ['principles', 'shamoun'],
      difficulty: 'advanced',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[1].id,
      front: {
        primary: "The saints in heaven don't know what's happening on earth. They're in paradise, not watching us.",
        scriptureRefs: [],
        notes: "Awareness objection"
      },
      back: {
        primary: "Revelation 6:9-11 - The martyrs in heaven cry out: 'How long before you judge and avenge our blood on those who dwell on earth?'\n\nThey KNOW:\n1. They were martyred\n2. Their killers are still on earth\n3. Justice hasn't come yet\n\nAlso Rev 19:1-2 - Heaven rejoices when Babylon is destroyed. They SAW it happen.",
        scriptureRefs: [
          { book: 'Revelation', chapter: 6, verseStart: 9, verseEnd: 11 },
          { book: 'Revelation', chapter: 19, verseStart: 1, verseEnd: 2 }
        ],
        technique: 'reroute',
        notes: "Scripture explicitly shows heavenly awareness of earthly events"
      },
      tags: ['revelation', 'awareness'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },

    // ==================== FAITH & WORKS ====================
    {
      id: generateId(),
      topicId: topics[2].id,
      front: {
        primary: "Ephesians 2:8-9 is clear: 'For by grace you have been saved through faith... NOT because of works, lest any man should boast.'",
        scriptureRefs: [{ book: 'Ephesians', chapter: 2, verseStart: 8, verseEnd: 9 }],
        notes: "The Protestant go-to verse"
      },
      back: {
        primary: "Read the VERY NEXT VERSE:\n\n'For we are his workmanship, created in Christ Jesus FOR GOOD WORKS, which God prepared beforehand, that we should WALK IN THEM.'\n\nVerse 9: Not saved BY works (earning it)\nVerse 10: Saved FOR works (living it)\n\nFaith and works are a package deal. You can't separate them.",
        scriptureRefs: [{ book: 'Ephesians', chapter: 2, verseStart: 10 }],
        technique: 'boomerang',
        notes: "The context completes the teaching"
      },
      tags: ['ephesians', 'grace'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[2].id,
      front: {
        primary: "Romans 3:28 says we are 'justified by faith APART from works of law.' Paul teaches faith alone!",
        scriptureRefs: [{ book: 'Romans', chapter: 3, verseStart: 28 }],
        notes: "Sola Fide proof text"
      },
      back: {
        primary: "The James Reroute:\n\nFind 'faith alone' in your Bible. It appears ONCE in the entire New Testament:\n\nJames 2:24 - 'You see that a person is justified by works and NOT BY FAITH ALONE.'\n\nThe ONLY time 'faith alone' appears, and the word before it is 'NOT.'\n\nPaul discusses 'works of the Law' (circumcision). James discusses 'works of love' (charity). Both are necessary.",
        scriptureRefs: [{ book: 'James', chapter: 2, verseStart: 24 }],
        technique: 'reroute',
        notes: "Martin Luther wanted to remove James from the Bible because of this verse"
      },
      tags: ['james', 'romans', 'sola-fide'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[2].id,
      front: {
        primary: "Paul and James contradict each other on faith and works. Paul says faith without works; James says faith with works.",
        scriptureRefs: [],
        notes: "Alleged contradiction"
      },
      back: {
        primary: "They're answering DIFFERENT QUESTIONS:\n\nPaul (Romans): 'Can Jewish Law save you?' NO - not circumcision, not kosher laws.\n\nJames: 'Can dead faith save you?' NO - faith without love in action is worthless.\n\nPaul in Galatians 5:6: 'Faith WORKING THROUGH LOVE.'\n\nThey agree perfectly. Works of LAW don't save; works of LOVE are essential.",
        scriptureRefs: [{ book: 'Galatians', chapter: 5, verseStart: 6 }],
        technique: 'principle',
        notes: "Context shows they're addressing different heresies"
      },
      tags: ['paul', 'james', 'contradiction'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },

    // ==================== AUTHORITY ====================
    {
      id: generateId(),
      topicId: topics[3].id,
      front: {
        primary: "2 Timothy 3:16-17 says Scripture makes the man of God 'complete.' We don't need Tradition - the Bible is sufficient!",
        scriptureRefs: [{ book: '2 Timothy', chapter: 3, verseStart: 16, verseEnd: 17 }],
        notes: "Sola Scriptura proof text"
      },
      back: {
        primary: "What does Paul call the 'pillar and foundation of truth'?\n\nNOT Scripture - THE CHURCH.\n\n1 Timothy 3:15: 'The church of the living God, the pillar and foundation of the truth.'\n\nAlso, when Paul wrote to Timothy, the only 'Scripture' was the Old Testament. The New Testament didn't exist yet!",
        scriptureRefs: [{ book: '1 Timothy', chapter: 3, verseStart: 15 }],
        technique: 'reroute',
        notes: "Paul himself gives authority to the Church, not Scripture alone"
      },
      tags: ['sola-scriptura', 'church'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[3].id,
      front: {
        primary: "Matthew 23:9 - Jesus said 'Call no man your father on earth.' Why do Catholics call priests 'Father'?",
        scriptureRefs: [{ book: 'Matthew', chapter: 23, verseStart: 9 }],
        notes: "Anti-clergy objection"
      },
      back: {
        primary: "What does Paul call himself?\n\n1 Corinthians 4:15: 'I became your FATHER in Christ Jesus through the gospel.'\n\nJesus also said 'Call no man teacher' (v. 10) - do Protestants have Sunday School teachers?\n\nJesus was condemning HYPOCRISY and pride, not the use of titles. Otherwise Paul violated Jesus's command.",
        scriptureRefs: [{ book: '1 Corinthians', chapter: 4, verseStart: 15 }],
        technique: 'boomerang',
        notes: "Paul calls himself 'father' - literal interpretation fails"
      },
      tags: ['father', 'priests'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },

    // ==================== TRINITY ====================
    {
      id: generateId(),
      topicId: topics[4].id,
      front: {
        primary: "Jesus never said 'I am God' in those exact words. If He was God, He would have clearly stated it.",
        scriptureRefs: [],
        notes: "JW and Muslim objection"
      },
      back: {
        primary: "Jesus said 'Before Abraham was, I AM' (John 8:58) - using God's divine name from Exodus 3:14.\n\nThe Jews picked up stones to kill Him for BLASPHEMY. They understood exactly what He claimed.\n\nThomas said 'My Lord and my God' (John 20:28) - Jesus didn't correct him.\n\nColossians 2:9: 'In Him the whole fullness of deity dwells bodily.'",
        scriptureRefs: [
          { book: 'John', chapter: 8, verseStart: 58 },
          { book: 'John', chapter: 20, verseStart: 28 },
          { book: 'Colossians', chapter: 2, verseStart: 9 }
        ],
        technique: 'reroute',
        notes: "Actions and responses prove His claim"
      },
      tags: ['divinity', 'i-am'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[4].id,
      front: {
        primary: "The Holy Spirit is just God's 'active force' - like electricity. It's not a person.",
        scriptureRefs: [],
        notes: "JW objection"
      },
      back: {
        primary: "Can you 'grieve' electricity?\n\nEphesians 4:30: 'Do not GRIEVE the Holy Spirit.'\n\nCan electricity 'speak'?\nActs 13:2: 'The Holy Spirit SAID...'\n\nCan electricity have a 'will'?\n1 Cor 12:11: 'The Spirit distributes as HE WILLS.'\n\nPersonal attributes = Person, not force.",
        scriptureRefs: [
          { book: 'Ephesians', chapter: 4, verseStart: 30 },
          { book: 'Acts', chapter: 13, verseStart: 2 },
          { book: '1 Corinthians', chapter: 12, verseStart: 11 }
        ],
        technique: 'reroute',
        notes: "Personal pronouns and attributes prove personhood"
      },
      tags: ['holy-spirit', 'jw'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[4].id,
      front: {
        primary: "Colossians 1:15 calls Jesus the 'firstborn of all creation.' He's a created being - the first thing God made.",
        scriptureRefs: [{ book: 'Colossians', chapter: 1, verseStart: 15 }],
        notes: "JW proof text"
      },
      back: {
        primary: "Read the NEXT TWO VERSES:\n\n'For BY Him all things were created... all things were created THROUGH Him and FOR Him.'\n\nIf Jesus was created, how did He create ALL things? Did He create Himself?\n\n'Firstborn' = RANK, not origin. David was 'firstborn' (Psalm 89:27) but was the YOUNGEST son.\n\nFirstborn means 'preeminent one' - heir of all things.",
        scriptureRefs: [
          { book: 'Colossians', chapter: 1, verseStart: 16, verseEnd: 17 },
          { book: 'Psalm', chapter: 89, verseStart: 27 }
        ],
        technique: 'boomerang',
        notes: "Context shows Jesus is Creator, not creature"
      },
      tags: ['firstborn', 'jw', 'colossians'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },

    // ==================== MORE EUCHARIST ====================
    {
      id: generateId(),
      topicId: topics[0].id,
      front: {
        primary: "Jesus said 'Do this in REMEMBRANCE of me.' It's just a memorial - a way to remember Him, not His actual body.",
        scriptureRefs: [{ book: 'Luke', chapter: 22, verseStart: 19 }],
        notes: "Memorial objection"
      },
      back: {
        primary: "The Greek word is ANAMNESIS - a sacrificial term, not a mental memory.\n\nIn Hebrews 10:3, the same word describes OT sacrifices: 'a reminder (anamnesis) of sins.'\n\nDid Jews 'forget' their sins between sacrifices? No - the sacrifice made sin PRESENT before God.\n\nThe Mass makes Calvary PRESENT - it's a re-presentation, not a re-crucifixion.",
        scriptureRefs: [
          { book: 'Hebrews', chapter: 10, verseStart: 3 },
          { book: 'Numbers', chapter: 10, verseStart: 10 }
        ],
        technique: 'principle',
        notes: "Anamnesis = sacrificial memorial, not mental remembering"
      },
      tags: ['anamnesis', 'greek', 'memorial'],
      difficulty: 'advanced',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[0].id,
      front: {
        primary: "The Eucharist can't be a sacrifice. Hebrews says Jesus died 'once for all' - the sacrifice is finished!",
        scriptureRefs: [{ book: 'Hebrews', chapter: 10, verseStart: 10 }],
        notes: "Once for all objection"
      },
      back: {
        primary: "If the work is totally 'done,' why does Hebrews 7:25 say Jesus 'ALWAYS LIVES to make intercession'?\n\nA High Priest's job is to OFFER sacrifice. Jesus is eternally presenting His once-for-all sacrifice to the Father in heaven.\n\nThe Mass doesn't repeat the death - it joins us to that ONE eternal offering happening NOW in heaven.",
        scriptureRefs: [{ book: 'Hebrews', chapter: 7, verseStart: 24, verseEnd: 25 }],
        technique: 'boomerang',
        notes: "Jesus is still actively interceding as High Priest"
      },
      tags: ['sacrifice', 'hebrews', 'once-for-all'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[0].id,
      front: {
        primary: "The same night Jesus said 'This is my body,' He also said 'I am the vine.' Both are metaphors!",
        scriptureRefs: [{ book: 'John', chapter: 15, verseStart: 1 }],
        notes: "Metaphor argument"
      },
      back: {
        primary: "When Jesus says 'I am the vine,' nobody thinks He's literally a plant. The metaphor is OBVIOUS.\n\nBut in John 6, the Jews understood Him literally and were SCANDALIZED. Jesus didn't say 'Calm down, it's a metaphor.'\n\nHe DOUBLED DOWN: 'Unless you eat my flesh and drink my blood, you have NO LIFE in you.'\n\nAnd disciples LEFT Him over it. You don't leave over a metaphor.",
        scriptureRefs: [
          { book: 'John', chapter: 6, verseStart: 53 },
          { book: 'John', chapter: 6, verseStart: 66 }
        ],
        technique: 'principle',
        notes: "The reaction proves it wasn't understood as metaphor"
      },
      tags: ['metaphor', 'john-6', 'vine'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[0].id,
      front: {
        primary: "The Didache and early church fathers - they can't be trusted. Only Scripture is authoritative.",
        scriptureRefs: [],
        notes: "Historical evidence rejection"
      },
      back: {
        primary: "The Didache (written ~70-100 AD) says the Eucharist fulfills Malachi 1:11: 'A pure offering from the rising of the sun to its setting.'\n\nThis is important because:\n1. It shows 1st century Christians believed in Real Presence\n2. They connected it to Malachi's prophecy of a SACRIFICE offered everywhere\n\nIgnatius of Antioch (student of John the Apostle) called the Eucharist 'the flesh of our Savior Jesus Christ.'",
        scriptureRefs: [{ book: 'Malachi', chapter: 1, verseStart: 11 }],
        technique: 'reroute',
        notes: "Apostolic students confirm Real Presence"
      },
      tags: ['didache', 'malachi', 'early-church'],
      difficulty: 'advanced',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },

    // ==================== MORE SAINTS & MARY ====================
    {
      id: generateId(),
      topicId: topics[1].id,
      front: {
        primary: "Why would I ask a saint to pray for me when I can go directly to Jesus?",
        scriptureRefs: [],
        notes: "Directness objection"
      },
      back: {
        primary: "Why do you ask your pastor or friends to pray for you when you can go directly to Jesus?\n\nJames 5:16: 'The prayer of a righteous person has great power.'\n\nSaints in heaven are PERFECTED (Heb 12:23). Their prayers are more powerful than ours because they have no sin hindering them.\n\nWe go to Jesus AND ask others to intercede. It's not either/or.",
        scriptureRefs: [
          { book: 'James', chapter: 5, verseStart: 16 },
          { book: 'Hebrews', chapter: 12, verseStart: 23 }
        ],
        technique: 'principle',
        notes: "Righteous prayers are powerful; saints are perfectly righteous"
      },
      tags: ['intercession', 'james', 'righteous-prayer'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[1].id,
      front: {
        primary: "Praying to dead people is NECROMANCY - it's forbidden in Deuteronomy 18!",
        scriptureRefs: [{ book: 'Deuteronomy', chapter: 18, verseStart: 10, verseEnd: 12 }],
        notes: "Necromancy objection"
      },
      back: {
        primary: "Necromancy is SUMMONING the dead to gain hidden knowledge or power over them.\n\nAsking saints to pray is completely different - we're asking them to pray TO GOD on our behalf.\n\nQuestion: Was Jesus practicing necromancy at the Transfiguration when He spoke with Moses and Elijah?\n\nThe saints are MORE alive than we are (Luke 20:38: 'God is the God of the living').",
        scriptureRefs: [
          { book: 'Luke', chapter: 20, verseStart: 38 },
          { book: 'Matthew', chapter: 17, verseStart: 3 }
        ],
        technique: 'principle',
        notes: "There's a categorical difference between necromancy and intercession"
      },
      tags: ['necromancy', 'transfiguration', 'living'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[1].id,
      front: {
        primary: "Angels presenting prayers in Revelation 5:8 doesn't prove Mary or saints can hear us.",
        scriptureRefs: [{ book: 'Revelation', chapter: 5, verseStart: 8 }],
        notes: "Deflection to angels"
      },
      back: {
        primary: "The 24 ELDERS (not just angels) hold 'bowls full of incense, which are the prayers of the saints.'\n\nWho are the Elders? Most scholars agree they represent redeemed humans - the Church triumphant.\n\nIf they're presenting our prayers, they must RECEIVE them first.\n\nPlus Rev 8:3-4: The angel offers incense 'WITH the prayers of the saints.' They're involved in the process.",
        scriptureRefs: [
          { book: 'Revelation', chapter: 5, verseStart: 8 },
          { book: 'Revelation', chapter: 8, verseStart: 3, verseEnd: 4 }
        ],
        technique: 'boomerang',
        notes: "The Elders are humans, not angels"
      },
      tags: ['revelation', 'elders', 'incense'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[1].id,
      front: {
        primary: "Mary had other children - the Bible mentions Jesus's 'brothers.' She wasn't a perpetual virgin.",
        scriptureRefs: [{ book: 'Mark', chapter: 6, verseStart: 3 }],
        notes: "Brothers of Jesus objection"
      },
      back: {
        primary: "In Hebrew/Aramaic, there's NO word for 'cousin.' 'Brother' (adelphos) covers relatives.\n\nLot is called Abraham's 'brother' (Gen 14:14) - but he was his NEPHEW.\n\nIf Mary had other sons, why did Jesus give her to John at the Cross? Jewish law required her other sons to care for her.\n\nThe 'brothers' James and Joses had a DIFFERENT mother (Mark 15:40).",
        scriptureRefs: [
          { book: 'Genesis', chapter: 14, verseStart: 14 },
          { book: 'John', chapter: 19, verseStart: 26, verseEnd: 27 },
          { book: 'Mark', chapter: 15, verseStart: 40 }
        ],
        technique: 'reroute',
        notes: "Greek 'adelphos' doesn't require blood brotherhood"
      },
      tags: ['mary', 'brothers', 'perpetual-virginity'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[1].id,
      front: {
        primary: "Angels in Matthew 18:10 'behold the face of the Father' for children. That doesn't mean they hear our prayers.",
        scriptureRefs: [{ book: 'Matthew', chapter: 18, verseStart: 10 }],
        notes: "Guardian angel deflection"
      },
      back: {
        primary: "Jesus warns: 'Don't despise these little ones, for their angels ALWAYS behold the face of my Father.'\n\nThe implication: If you harm a child, their angel will report it to God.\n\nHow do angels know what happens to children on earth if they have NO awareness of earthly events?\n\nThis proves heavenly beings are aware of what happens to us AND bring it before God.",
        scriptureRefs: [{ book: 'Matthew', chapter: 18, verseStart: 10 }],
        technique: 'boomerang',
        notes: "Angels must be aware of earth to report to the Father"
      },
      tags: ['angels', 'awareness', 'guardian'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },

    // ==================== MORE FAITH & WORKS ====================
    {
      id: generateId(),
      topicId: topics[2].id,
      front: {
        primary: "Abraham was justified by faith BEFORE circumcision (Romans 4). Works came later!",
        scriptureRefs: [{ book: 'Romans', chapter: 4, verseStart: 9, verseEnd: 12 }],
        notes: "Abraham before works"
      },
      back: {
        primary: "Yes - Abraham was INITIALLY justified by faith in Genesis 15:6.\n\nBut James 2:21-23 says Abraham was 'justified by works when he offered Isaac' - YEARS LATER.\n\nInitial justification (Gen 15) + Ongoing justification (Gen 22) = Complete picture.\n\nJustification isn't a one-time event. It's a process we can lose (Gal 5:4: 'fallen from grace').",
        scriptureRefs: [
          { book: 'James', chapter: 2, verseStart: 21, verseEnd: 23 },
          { book: 'Galatians', chapter: 5, verseStart: 4 }
        ],
        technique: 'reroute',
        notes: "James shows Abraham justified AGAIN by works later"
      },
      tags: ['abraham', 'isaac', 'justification'],
      difficulty: 'advanced',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[2].id,
      front: {
        primary: "Romans 4:5 says God 'justifies the UNGODLY.' We don't need to be good - just believe!",
        scriptureRefs: [{ book: 'Romans', chapter: 4, verseStart: 5 }],
        notes: "Ungodly justified"
      },
      back: {
        primary: "Yes - God justifies the ungodly at the START. But does He leave them ungodly?\n\nRomans 6:1-2: 'Shall we continue in sin that grace may abound? By no means!'\n\nTitus 2:14: Christ 'gave himself to redeem us from all lawlessness and to purify for himself a people... zealous for good works.'\n\nWe're justified AS ungodly but transformed INTO the godly.",
        scriptureRefs: [
          { book: 'Romans', chapter: 6, verseStart: 1, verseEnd: 2 },
          { book: 'Titus', chapter: 2, verseStart: 14 }
        ],
        technique: 'boomerang',
        notes: "Justification transforms; it doesn't leave us unchanged"
      },
      tags: ['ungodly', 'transformation', 'romans'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[2].id,
      front: {
        primary: "We're saved by grace through faith, not by works. Catholics try to EARN salvation!",
        scriptureRefs: [{ book: 'Ephesians', chapter: 2, verseStart: 8 }],
        notes: "Earning salvation accusation"
      },
      back: {
        primary: "Catholics DON'T believe we can earn salvation. The Council of Trent condemned that idea!\n\nWe believe:\n1. Grace initiates everything (we can't even have faith without grace)\n2. We must cooperate with grace through obedient faith\n3. Good works are the FRUIT of salvation, not the root\n\nPhilippians 2:12-13: 'Work out your salvation with fear and trembling, for it is GOD who works in you.'",
        scriptureRefs: [{ book: 'Philippians', chapter: 2, verseStart: 12, verseEnd: 13 }],
        technique: 'principle',
        notes: "Catholic teaching: grace-enabled cooperation, not earning"
      },
      tags: ['grace', 'earning', 'cooperation'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[2].id,
      front: {
        primary: "Once saved, always saved. Nothing can separate us from God's love (Romans 8:38-39)!",
        scriptureRefs: [{ book: 'Romans', chapter: 8, verseStart: 38, verseEnd: 39 }],
        notes: "Eternal security"
      },
      back: {
        primary: "Romans 8 says nothing can separate us FROM GOD'S SIDE. But we can walk away.\n\nHebrews 6:4-6: Those who 'have tasted the heavenly gift' can 'fall away.'\n\n2 Peter 2:20-21: 'If after escaping the world's defilements... they are again entangled... the last state is worse.'\n\nGalatians 5:4: 'You have fallen from grace.'\n\nPerseverance requires... persevering.",
        scriptureRefs: [
          { book: 'Hebrews', chapter: 6, verseStart: 4, verseEnd: 6 },
          { book: '2 Peter', chapter: 2, verseStart: 20, verseEnd: 21 },
          { book: 'Galatians', chapter: 5, verseStart: 4 }
        ],
        technique: 'reroute',
        notes: "Multiple passages warn believers can fall away"
      },
      tags: ['eternal-security', 'apostasy', 'perseverance'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },

    // ==================== MORE AUTHORITY ====================
    {
      id: generateId(),
      topicId: topics[3].id,
      front: {
        primary: "The Bible is complete and sufficient. We don't need any 'Sacred Tradition' outside of it.",
        scriptureRefs: [],
        notes: "Sufficiency of Scripture"
      },
      back: {
        primary: "Where does the Bible claim to be the ONLY authority?\n\n2 Thessalonians 2:15: 'Hold to the traditions you were taught, whether by WORD OF MOUTH or by letter.'\n\nPaul commands both written AND oral tradition.\n\nAlso: Who decided which books belong in the Bible? The Church's Tradition! The canon wasn't settled until the 4th century councils.",
        scriptureRefs: [{ book: '2 Thessalonians', chapter: 2, verseStart: 15 }],
        technique: 'reroute',
        notes: "Paul explicitly commands oral tradition"
      },
      tags: ['tradition', 'oral', 'thessalonians'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[3].id,
      front: {
        primary: "Peter wasn't the first Pope. 'The Rock' in Matthew 16:18 refers to Peter's CONFESSION, not Peter himself.",
        scriptureRefs: [{ book: 'Matthew', chapter: 16, verseStart: 18 }],
        notes: "Papacy objection"
      },
      back: {
        primary: "Jesus said 'You ARE Peter (Petros), and on this rock (petra) I will build my church.'\n\nIf He meant Peter's confession, why did He change Simon's NAME to 'Rock'?\n\nAlso, Jesus gave Peter the 'keys of the kingdom' (v.19) - a reference to Isaiah 22:22 where the KEY is given to the prime minister of the kingdom.\n\nPeter received the office of authority.",
        scriptureRefs: [
          { book: 'Matthew', chapter: 16, verseStart: 18, verseEnd: 19 },
          { book: 'Isaiah', chapter: 22, verseStart: 22 }
        ],
        technique: 'reroute',
        notes: "Keys = office; Isaiah 22 background is crucial"
      },
      tags: ['peter', 'rock', 'papacy', 'keys'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[3].id,
      front: {
        primary: "Catholics added 7 books to the Bible (the Apocrypha). Protestants have the true canon of 66 books.",
        scriptureRefs: [],
        notes: "Deuterocanonicals"
      },
      back: {
        primary: "Actually, Luther REMOVED 7 books in the 1500s that Christians had used for 1,100+ years.\n\nThe Septuagint (Greek OT used by Jesus and the Apostles) included these books.\n\nThe NT quotes from the Septuagint, not the Hebrew canon.\n\nHebrews 11:35 references 2 Maccabees 7 (torture and resurrection hope). Where else is that story?",
        scriptureRefs: [
          { book: 'Hebrews', chapter: 11, verseStart: 35 },
          { book: '2 Maccabees', chapter: 7, verseStart: 1 }
        ],
        technique: 'principle',
        notes: "Luther removed; Catholics didn't add"
      },
      tags: ['canon', 'deuterocanonicals', 'septuagint'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[3].id,
      front: {
        primary: "Jesus condemned the Pharisees' traditions. Why does the Catholic Church follow human traditions?",
        scriptureRefs: [{ book: 'Matthew', chapter: 15, verseStart: 3 }],
        notes: "Traditions of men"
      },
      back: {
        primary: "Jesus condemned traditions that CONTRADICTED God's word - like korban, which let people avoid caring for parents.\n\nHe didn't condemn ALL tradition. In fact, He told people to obey the Pharisees' TEACHING (Mt 23:2-3), just not their hypocrisy.\n\nPaul commanded: 'Hold to the traditions you were taught' (2 Thess 2:15).\n\nThe question is: Does the tradition contradict Scripture, or complement it?",
        scriptureRefs: [
          { book: 'Matthew', chapter: 23, verseStart: 2, verseEnd: 3 },
          { book: '2 Thessalonians', chapter: 2, verseStart: 15 }
        ],
        technique: 'boomerang',
        notes: "Jesus condemned contradictory traditions, not tradition itself"
      },
      tags: ['pharisees', 'tradition', 'matthew'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },

    // ==================== MORE TRINITY ====================
    {
      id: generateId(),
      topicId: topics[4].id,
      front: {
        primary: "Jesus and the Father are the same person - Jesus IS the Father in a different 'mode' (Oneness/Modalism).",
        scriptureRefs: [],
        notes: "Oneness Pentecostal view"
      },
      back: {
        primary: "At Jesus's baptism: The Father SPEAKS from heaven, the Son is IN the water, the Spirit DESCENDS as a dove.\n\nThree distinct persons interacting simultaneously. One person can't speak to himself from heaven while being baptized.\n\nJohn 17:5: Jesus prays 'Father, glorify ME.' Was He talking to Himself?\n\nThe Trinity: One God, three distinct persons - not three modes.",
        scriptureRefs: [
          { book: 'Matthew', chapter: 3, verseStart: 16, verseEnd: 17 },
          { book: 'John', chapter: 17, verseStart: 5 }
        ],
        technique: 'reroute',
        notes: "Baptism of Jesus shows three distinct persons"
      },
      tags: ['modalism', 'oneness', 'baptism'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[4].id,
      front: {
        primary: "John 14:28 - Jesus said 'The Father is GREATER than I.' How can Jesus be God if the Father is greater?",
        scriptureRefs: [{ book: 'John', chapter: 14, verseStart: 28 }],
        notes: "Father greater objection"
      },
      back: {
        primary: "'Greater' refers to POSITION during the incarnation, not NATURE.\n\nPhilippians 2:6-7: Jesus 'did not consider equality with God something to be grasped, but EMPTIED Himself, taking the form of a servant.'\n\nAs man, Jesus submitted to the Father's will. That's positional, not ontological.\n\nJohn 10:30: 'I and the Father are ONE.' Same nature, different roles.",
        scriptureRefs: [
          { book: 'Philippians', chapter: 2, verseStart: 6, verseEnd: 7 },
          { book: 'John', chapter: 10, verseStart: 30 }
        ],
        technique: 'reroute',
        notes: "Greater in role ≠ lesser in nature"
      },
      tags: ['greater', 'incarnation', 'nature'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[4].id,
      front: {
        primary: "The word 'Trinity' isn't in the Bible. It's a man-made doctrine invented at Nicaea in 325 AD.",
        scriptureRefs: [],
        notes: "Trinity not in Bible"
      },
      back: {
        primary: "The word 'Bible' isn't in the Bible either. Neither is 'monotheism' or 'incarnation.'\n\nThe CONCEPT is there:\n- One God (Deut 6:4)\n- Father is God (Gal 1:1)\n- Jesus is God (John 1:1, Titus 2:13)\n- Spirit is God (Acts 5:3-4)\n\nNicaea didn't INVENT the Trinity. It DEFENDED it against Arianism using biblical terms.\n\nMatthew 28:19: 'Baptize in the NAME (singular) of Father, Son, and Holy Spirit.'",
        scriptureRefs: [
          { book: 'Matthew', chapter: 28, verseStart: 19 },
          { book: 'Acts', chapter: 5, verseStart: 3, verseEnd: 4 }
        ],
        technique: 'principle',
        notes: "Doctrine precedes terminology"
      },
      tags: ['trinity', 'nicaea', 'word'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[4].id,
      front: {
        primary: "John 1:1 in the original Greek says 'the Word was A god' (with an article), not 'the Word was God.'",
        scriptureRefs: [{ book: 'John', chapter: 1, verseStart: 1 }],
        notes: "JW NWT translation"
      },
      back: {
        primary: "This is the JW New World Translation - rejected by virtually ALL Greek scholars.\n\nThe Greek 'theos en ho logos' uses 'theos' without the article to emphasize NATURE, not identity.\n\nIf John meant 'a god,' he would have used 'eis theos' (one god among many).\n\nAlso, if Jesus is 'a god,' you have polytheism - multiple gods. Isaiah 43:10: 'Before me no god was formed.'",
        scriptureRefs: [
          { book: 'John', chapter: 1, verseStart: 1 },
          { book: 'Isaiah', chapter: 43, verseStart: 10 }
        ],
        technique: 'principle',
        notes: "Greek grammar + monotheism both refute 'a god'"
      },
      tags: ['john-1', 'greek', 'jw', 'nwt'],
      difficulty: 'advanced',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },

    // ==================== BAPTISM ====================
    {
      id: generateId(),
      topicId: topics[5].id,
      front: {
        primary: "Baptism is just a symbol - an outward sign of an inward change. It doesn't actually DO anything.",
        scriptureRefs: [],
        notes: "Symbolic view"
      },
      back: {
        primary: "1 Peter 3:21: 'Baptism NOW SAVES YOU - not the removal of dirt from the body but the pledge of a clear conscience toward God.'\n\nPeter says it SAVES. Not 'symbolizes salvation' - saves.\n\nActs 2:38: 'Repent and be baptized for the FORGIVENESS of sins.'\n\nActs 22:16: 'Arise and be baptized and WASH AWAY your sins.'\n\nThe Bible links baptism directly to salvation.",
        scriptureRefs: [
          { book: '1 Peter', chapter: 3, verseStart: 21 },
          { book: 'Acts', chapter: 2, verseStart: 38 },
          { book: 'Acts', chapter: 22, verseStart: 16 }
        ],
        technique: 'reroute',
        notes: "Scripture says baptism SAVES, not just symbolizes"
      },
      tags: ['baptism-saves', 'symbol', 'peter'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[5].id,
      front: {
        primary: "Infant baptism isn't in the Bible. You need to be old enough to believe and choose baptism.",
        scriptureRefs: [],
        notes: "Believer's baptism only"
      },
      back: {
        primary: "Acts 16:15: Lydia 'was baptized, AND HER HOUSEHOLD.'\nActs 16:33: The jailer 'was baptized, with ALL HIS FAMILY.'\n1 Cor 1:16: Paul baptized 'the household of Stephanas.'\n\nHouseholds included infants and children.\n\nAlso, baptism replaced circumcision (Col 2:11-12), which was done on 8-day-old infants.\n\nThe early Church (Hippolytus, 215 AD) confirms infant baptism.",
        scriptureRefs: [
          { book: 'Acts', chapter: 16, verseStart: 15 },
          { book: 'Acts', chapter: 16, verseStart: 33 },
          { book: 'Colossians', chapter: 2, verseStart: 11, verseEnd: 12 }
        ],
        technique: 'reroute',
        notes: "Household baptisms included everyone"
      },
      tags: ['infant-baptism', 'household', 'circumcision'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[5].id,
      front: {
        primary: "The thief on the cross was saved without baptism. Baptism can't be necessary for salvation.",
        scriptureRefs: [{ book: 'Luke', chapter: 23, verseStart: 43 }],
        notes: "Thief on cross objection"
      },
      back: {
        primary: "The thief died under the OLD covenant - before Jesus's death and resurrection established the New Covenant.\n\nJesus hadn't yet given the Great Commission: 'Go baptize all nations.'\n\nGod can save anyone He wants (the thief, martyrs, babies who die). But He's also given us the ORDINARY means of salvation: baptism.\n\nMark 16:16: 'Whoever believes AND IS BAPTIZED will be saved.'",
        scriptureRefs: [
          { book: 'Mark', chapter: 16, verseStart: 16 },
          { book: 'Matthew', chapter: 28, verseStart: 19 }
        ],
        technique: 'principle',
        notes: "The thief was under the old covenant; baptism is new covenant"
      },
      tags: ['thief', 'cross', 'necessity'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },

    // ==================== CONFESSION ====================
    {
      id: generateId(),
      topicId: topics[6].id,
      front: {
        primary: "Why confess to a priest? I can confess directly to God. Only God can forgive sins!",
        scriptureRefs: [],
        notes: "Direct confession objection"
      },
      back: {
        primary: "Yes, only God forgives - but He chose to work THROUGH men.\n\nJohn 20:21-23: Jesus breathed on the apostles and said: 'Whose sins you FORGIVE are forgiven; whose sins you RETAIN are retained.'\n\nIf they can't actually forgive sins, this power is meaningless.\n\nThe priest doesn't forgive by his own power - he's an instrument of Christ's forgiveness.\n\nJames 5:16: 'Confess your sins to ONE ANOTHER.'",
        scriptureRefs: [
          { book: 'John', chapter: 20, verseStart: 21, verseEnd: 23 },
          { book: 'James', chapter: 5, verseStart: 16 }
        ],
        technique: 'reroute',
        notes: "Jesus gave apostles authority to forgive sins"
      },
      tags: ['confession', 'priest', 'john-20'],
      difficulty: 'beginner',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[6].id,
      front: {
        primary: "1 John 1:9 says if we confess our sins, God forgives us. No priest needed - just confess to God!",
        scriptureRefs: [{ book: '1 John', chapter: 1, verseStart: 9 }],
        notes: "1 John confession"
      },
      back: {
        primary: "1 John doesn't say HOW to confess - it just says to confess.\n\nJames 5:16 specifies: 'Confess your sins TO ONE ANOTHER.'\n\nJohn 20:23 shows the apostles received power to forgive or retain sins.\n\nPrivate confession to God AND sacramental confession to a priest aren't contradictory - they complement each other.\n\nThe early Church practiced confession to priests (Didache, ~100 AD).",
        scriptureRefs: [
          { book: 'James', chapter: 5, verseStart: 16 },
          { book: 'John', chapter: 20, verseStart: 23 }
        ],
        technique: 'boomerang',
        notes: "1 John doesn't exclude other forms of confession"
      },
      tags: ['1-john', 'confession', 'to-one-another'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId(),
      topicId: topics[6].id,
      front: {
        primary: "How can a priest know what penance to give? The whole system seems arbitrary and man-made.",
        scriptureRefs: [],
        notes: "Penance objection"
      },
      back: {
        primary: "Penance isn't 'earning' forgiveness - it's medicine for the soul.\n\nIf you broke my window, I'd forgive you - but you'd still need to fix the window. That's restitution, not earning forgiveness.\n\n2 Samuel 12: David was forgiven for adultery/murder, but still faced consequences.\n\nPenance helps repair damage sin causes and strengthens us against future sin. The priest prescribes appropriate 'medicine' based on the confession.",
        scriptureRefs: [{ book: '2 Samuel', chapter: 12, verseStart: 13, verseEnd: 14 }],
        technique: 'principle',
        notes: "Forgiveness is free; consequences and healing still follow"
      },
      tags: ['penance', 'restitution', 'david'],
      difficulty: 'intermediate',
      sourceType: 'builtin',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  await db.cards.bulkAdd(cards);

  localStorage.setItem(SEED_KEY, 'true');
  console.log(`Seeded ${topics.length} topics and ${cards.length} cards`);
}

// Function to reset and re-seed (for development)
export async function resetAndReseed() {
  localStorage.removeItem(SEED_KEY);
  await db.topics.clear();
  await db.cards.clear();
  await db.reviewStates.clear();
  await db.reviewLogs.clear();
  await seedInitialData();
}
