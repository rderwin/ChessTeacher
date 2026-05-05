import { OpeningLine } from "../types";

export const trompowsky: OpeningLine = {
  id: "trompowsky-attack",
  name: "Trompowsky Attack",
  fullName: "Trompowsky Attack",
  eco: "A45",
  playerColor: "white",
  level: "intermediate",
  description:
    "An aggressive, offbeat opening where White immediately pins Black's knight with 2.Bg5, disrupting normal development patterns and steering the game into unusual territory from move two.",
  history: {
    origin:
      "Named after Brazilian player Octavio Trompowsky (1897–1984), who regularly employed 2.Bg5 in the 1930s and 1940s in Brazilian tournaments. The opening remained a sideline curiosity for decades until English GM Julian Hodgson revitalized it in the 1990s, proving it was a legitimate weapon at the highest level. Since then, even Magnus Carlsen has used it as a surprise weapon.",
    nameExplanation:
      "Named after Octavio Trompowsky, a Brazilian chess master and champion who pioneered this aggressive bishop sortie. Despite being a relatively obscure player internationally, his name became immortalized through this opening — a testament to how a creative idea can outlive the player who invented it.",
    popularity:
      "Growing in popularity at all levels. It's a favorite surprise weapon because most players expecting 1.d4 prepare for the Queen's Gambit or Indian defenses, not an immediate bishop pin. At the club level, it scores excellently because opponents are often unprepared. At the top level, Carlsen, Rapport, and others use it occasionally to avoid theory.",
    bestFor:
      "Players who enjoy unusual positions and are comfortable with piece play over pawn structure. The Trompowsky takes the game out of book quickly, so concrete understanding of piece activity and tactical motifs matters more than memorized theory. It's intermediate because you need to handle unbalanced positions confidently.",
    famousPlayers: ["Julian Hodgson", "Richard Rapport", "Magnus Carlsen", "Octavio Trompowsky"],
  },
  moves: [
    {
      san: "d4",
      color: "white",
      why: "Opens with d4, claiming central space. While this usually leads to Queen's Gambit or Indian Defense territory, White has a surprise in store — the Trompowsky begins as a normal d4 opening but diverges sharply on move 2.",
      concepts: ["center-control", "development"],
      controls: "c5, e5 squares",
      commonMistakes: [
        {
          san: "e4",
          whyBad:
            "e4 leads to completely different opening systems (Open Game, Sicilian, French, etc.). The Trompowsky requires d4 because the entire idea hinges on 2.Bg5 pinning the knight after 1...Nf6, which only arises in d4 openings.",
        },
        {
          san: "Nf3",
          whyBad:
            "Nf3 first prevents you from playing the Trompowsky because after 1...d5 2.Bg5 there is no knight to pin. The move order d4 then Bg5 is essential — you need Black to play ...Nf6 so the Bg5 pin has a target.",
        },
      ],
    },
    {
      san: "Nf6",
      color: "black",
      why: "The most popular response to 1.d4, developing the knight to its best square and keeping options open for various Indian defenses or other setups. Black expects a normal game — but the Trompowsky disrupts this plan immediately.",
      concepts: ["development", "center-control"],
      controls: "e4, d5 squares",
    },
    {
      san: "Bg5",
      color: "white",
      why: "The Trompowsky Attack! Instead of normal development like c4 or Nf3, White immediately pins the knight against the queen. This is provocative — the bishop is developed early and creates an immediate problem for Black. If Black plays passively, White can double Black's pawns with Bxf6. The key idea: disrupt Black's normal development and force them to deal with the pin from move two.",
      concepts: ["development", "attack", "piece-activity"],
      controls: "f6 knight is pinned, threatens Bxf6 doubling pawns",
      prevents: "Black from playing a normal Indian Defense setup",
      commonMistakes: [
        {
          san: "Nf3",
          whyBad: "Nf3 is a fine move but leads to standard openings like the Queen's Gambit or London System. The whole point of the Trompowsky is the immediate Bg5 — it takes the game into unique territory where your opponent's preparation is useless.",
        },
        {
          san: "c4",
          whyBad: "c4 enters the Queen's Gambit complex where Black has decades of well-analyzed theory. Bg5 is the Trompowsky choice — less theory, more creativity, and an immediate problem for Black to solve.",
        },
      ],
    },
    {
      san: "Ne4",
      color: "black",
      why: "The most aggressive response — the knight jumps to e4, attacking the bishop and occupying a strong central square. Black challenges White to deal with the advanced knight immediately. This is the main line because it's the most principled: don't tolerate the pin, counter-attack!",
      concepts: ["attack", "center-control", "piece-activity"],
      controls: "g5 bishop attacked, strong central outpost",
    },
    {
      san: "Bf4",
      color: "white",
      why: "The bishop retreats to f4 where it's still active on the c1-h6 diagonal. From f4, the bishop controls e5 and can support a later e3 setup. Retreating doesn't mean defeat — the bishop has already achieved its goal of provoking Black's knight to an unusual square. Now White will build around the center while the Ne4 may become unstable without proper support.",
      concepts: ["development", "piece-activity"],
      controls: "e5 square, c1-h6 diagonal",
      commonMistakes: [
        {
          san: "Bh4",
          whyBad: "Bh4 keeps the pin idea but the bishop is misplaced on the rim. After g5 by Black, the bishop gets trapped or pushed to a bad square. Bf4 is more flexible — the bishop is centrally active and supports e3.",
        },
      ],
    },
    {
      san: "d5",
      color: "black",
      why: "Black claims central space with d5, establishing a strong pawn presence. The knight on e4 is now supported by the d5 pawn, and Black aims for a solid central structure. This is a mature response — securing the center before worrying about further development.",
      concepts: ["center-control", "pawn-structure"],
      controls: "c4, e4 squares — supports the knight",
    },
    {
      san: "e3",
      color: "white",
      why: "Solidifies the center and opens the diagonal for the light-squared bishop. The e3 pawn supports d4 and prepares Bd3, which will attack the knight on e4. White is building a solid position around the center — the Trompowsky often transitions from an aggressive opening into a strategic middlegame.",
      concepts: ["center-control", "development", "preparation"],
      controls: "d4 pawn reinforced, f1-a6 diagonal opened",
      commonMistakes: [
        {
          san: "f3",
          whyBad:
            "f3 attacks the knight on e4 but weakens the kingside terribly and blocks the natural Nf3 development. After ...Nf6, White has weakened the king position for nothing. e3 is much sounder — it supports d4, opens the bishop diagonal, and keeps the kingside intact.",
        },
        {
          san: "Nd2",
          whyBad:
            "Nd2 develops but blocks the dark-squared bishop on f4 and doesn't reinforce d4. e3 is the priority because it supports the center, opens the f1 bishop's diagonal for Bd3, and creates a harmonious setup where all pieces work together.",
        },
      ],
    },
    {
      san: "c5",
      color: "black",
      why: "Black strikes at White's center immediately with c5, the standard break in d4 structures. This challenges d4 and aims to open the position while Black's knight on e4 is still well-placed. Timing is key — Black wants to act before White completes development.",
      concepts: ["center-control", "attack"],
      controls: "Attacks d4, opens the position",
    },
    {
      san: "Bd3",
      color: "white",
      why: "The bishop develops to d3, directly attacking the knight on e4. This forces Black to make a decision about the knight — exchange it, retreat it, or support it further. The Bd3 also eyes the kingside (h7 target) and prepares castling.",
      concepts: ["development", "attack"],
      controls: "e4 knight attacked, h7 square targeted",
      commonMistakes: [
        {
          san: "Be2",
          whyBad:
            "Be2 is passive — it doesn't attack the knight on e4 or aim at any kingside targets. Bd3 is much more aggressive because it forces Black to deal with the threat to the knight immediately while also eyeing h7 for future kingside play.",
        },
        {
          san: "Nf3",
          whyBad:
            "Nf3 develops but doesn't challenge the knight on e4. Black's knight sits comfortably in the center, and you've missed the chance to force it to make a decision. Bd3 attacks the knight directly and develops with purpose.",
        },
      ],
    },
    {
      san: "Nc6",
      color: "black",
      why: "Black develops the queenside knight, adding pressure to d4 and supporting the c5 push. The knight on c6 is well-placed — it controls key central squares and develops with purpose. Black is building counterplay against White's center.",
      concepts: ["development", "center-control"],
      controls: "d4, e5 squares",
    },
    {
      san: "c3",
      color: "white",
      why: "Reinforces d4 against Black's pressure from c5 and Nc6. The familiar c3 support gives the center extra stability. White's plan is clear: maintain the center, complete development with Nf3 and O-O, then look for a way to exploit the position.",
      concepts: ["center-control", "pawn-structure"],
      controls: "d4 pawn reinforced",
      commonMistakes: [
        {
          san: "Nf3",
          whyBad:
            "Nf3 develops but doesn't address the immediate pressure on d4 from ...c5 and ...Nc6. After ...cxd4, the center collapses. c3 first ensures d4 is rock-solid, then Nf3 can come on the next move with the center secured.",
        }
      ],
    },
    {
      san: "Qb6",
      color: "black",
      why: "Black puts the queen on an active square, pressuring b2 and d4 simultaneously. The queen on b6 creates real problems — it threatens Qxb2 winning a pawn and also adds to the pressure on d4. White must respond accurately.",
      concepts: ["attack", "piece-activity"],
      controls: "b2 pawn, d4 pawn — double pressure",
    },
    {
      san: "Qb3",
      color: "white",
      why: "White meets the queen challenge directly! Qb3 defends b2, attacks b7 in return, and most importantly offers a queen exchange. In the Trompowsky, simplification can favor White because the resulting endgame positions are often pleasant — White has a solid center and active bishop pair.",
      concepts: ["development", "attack"],
      controls: "b7 pawn, defends b2, offers queen trade",
      commonMistakes: [
        {
          san: "Qc2",
          whyBad: "Qc2 defends the knight on e4's square but doesn't challenge Black's queen or create counterplay. Qb3 is more active — it forces Black to decide about the queen exchange while defending b2 and pressuring b7.",
        },
      ],
    },
    {
      san: "c4",
      color: "black",
      why: "A committal but logical push. Black advances the c-pawn to c4, gaining space on the queenside and kicking White's queen back. The c4 pawn also locks down the d3 bishop's diagonal, reducing its scope. However, this closes the center, which means the game becomes more strategic and less tactical.",
      concepts: ["space", "attack"],
      controls: "d3 bishop restricted, queenside space gained",
    },
    {
      san: "Qxb6",
      color: "white",
      why: "White takes the queen exchange. In this specific position, trading queens is strong because White's pawn structure is healthier and the bishop pair can dominate in the resulting endgame. Without queens, Black's knight on e4 loses some of its attacking potential, and White's central control and active bishops become more important.",
      concepts: ["piece-activity", "pawn-structure"],
      controls: "Simplifies into a favorable endgame structure",
      commonMistakes: [
        {
          san: "Qc2",
          whyBad:
            "Retreating the queen to c2 avoids the trade but cedes the initiative. Black's queen stays active on b6 pressuring b2 and d4 while your queen hides. Qxb6 is stronger because the resulting endgame favors White's bishop pair and better pawn structure.",
        },
        {
          san: "Qd1",
          whyBad:
            "Pulling the queen all the way back to d1 is a complete waste of tempi — you moved it to b3 just to retreat. Qxb6 is the principled choice: exchange into a favorable endgame where White's structural advantages and bishop pair dominate.",
        },
      ],
    },
    {
      san: "axb6",
      color: "black",
      why: "Black recaptures with the a-pawn, opening the a-file for the rook. The b6 pawn is doubled but controls the important c5 and a5 squares. The resulting queenless middlegame is complex — both sides have chances, but White's bishop pair and central control provide a slight edge.",
      concepts: ["piece-activity", "pawn-structure"],
      controls: "a-file opened for rook, c5 square controlled",
    },
  ],
  summary:
    "The Trompowsky Attack is a powerful surprise weapon that takes the game into uncharted waters from move two. By playing 2.Bg5, White immediately disrupts Black's plans for a normal Indian Defense and forces them to solve problems from the start. The key ideas are: provoke the knight with the early bishop sortie, build a solid center with d4+e3+c3, and use the bishop pair in strategic middlegames. It's rated intermediate because the resulting positions are unusual and require good piece play rather than following well-known patterns — you need to think for yourself rather than follow a formula.",
  variants: [
    {
      id: "trompowsky-d5-classical",
      name: "Classical 2...d5 Line",
      description: "Instead of the sharp Ne4, Black plays the solid 2...d5, leading to a quiet positional game where White aims for a London-style setup with extra options.",
      branchesAt: 3, // Index 3 = Black's 2nd move (main line: Ne4)
      opponentMove: {
        san: "d5",
        color: "black",
        why: "Instead of the aggressive Ne4, Black plays the solid d5. This is the second most popular response — Black ignores the pin for now and stakes a claim in the center. The idea is that the Bg5 pin isn't really dangerous yet, so Black focuses on central control first.",
        concepts: ["center-control", "pawn-structure"],
        controls: "c4, e4 squares",
      },
      moves: [
        {
          san: "Bxf6",
          color: "white",
          why: "White captures the knight immediately, doubling Black's pawns. This is the most principled follow-up to Bg5 when Black plays ...d5 — if you're going to pin the knight, be ready to take it! The doubled f-pawns weaken Black's kingside structure permanently.",
          concepts: ["pawn-structure", "attack"],
          controls: "Doubles Black's f-pawns, weakens kingside",
          commonMistakes: [
            {
              san: "e3",
              whyBad: "e3 retreats from the confrontation. If you played Bg5 to pin the knight, you should follow through with Bxf6 to get the doubled pawns. Otherwise, why play Bg5 at all?",
            },
          ],
        },
        {
          san: "exf6",
          color: "black",
          why: "Black recaptures toward the center with exf6, keeping the pawn structure more compact. The alternative gxf6 would open the g-file for the rook but leave Black's king more exposed. After exf6, Black has the bishop pair as compensation for the doubled pawns.",
          concepts: ["center-control", "pawn-structure"],
          controls: "Central presence maintained",
        },
        {
          san: "e3",
          color: "white",
          why: "White sets up a solid center with e3, supporting d4 and preparing to develop the light-squared bishop. The position is strategic now — White has a better pawn structure while Black has the bishop pair. White's plan is to exploit the doubled f-pawns in the endgame.",
          concepts: ["center-control", "development"],
          commonMistakes: [
            {
              san: "e4",
              whyBad:
                "e4 looks aggressive but after ...dxe4, White has given up the center for nothing. Without the knight on c3 to support it, e4 just loses a pawn or creates an isolated d-pawn. e3 is more solid — it supports d4 and opens the bishop diagonal without overextending.",
            },
            {
              san: "g3",
              whyBad:
                "Fianchettoing the bishop sounds appealing but it's too slow here. Black already has the bishop pair as compensation for the doubled pawns. White needs to develop quickly with e3, Bd3, and Nf3 to exploit the structural advantage before Black's bishops come alive.",
            },
          ],
        },
        {
          san: "Bd6",
          color: "black",
          why: "The bishop develops actively to d6, eyeing the kingside. Black aims to use the bishop pair to generate activity and compensate for the structural weakness.",
          concepts: ["development", "piece-activity"],
        },
        {
          san: "c4",
          color: "white",
          why: "White challenges the center with c4, aiming to undermine Black's d5 pawn. If Black takes, White gets an isolated d-pawn but also open lines and active piece play. If Black maintains the tension, White can build pressure.",
          concepts: ["center-control", "attack"],
          controls: "Attacks d5, opens queenside",
          commonMistakes: [
            {
              san: "Bd3",
              whyBad:
                "Bd3 develops but doesn't challenge Black's center. Black gets a comfortable position with ...Bd6 and ...O-O without any pressure. c4 is the critical move — it attacks d5 and forces Black to make a decision about the center structure.",
            },
            {
              san: "Nf3",
              whyBad:
                "Nf3 is natural but passive in this specific position. White has the structural advantage (doubled f-pawns for Black) and needs to press it with c4. Developing without challenging the center lets Black equalize comfortably.",
            },
          ],
        },
        {
          san: "c6",
          color: "black",
          why: "Black reinforces d5 with c6, maintaining the solid central structure. This is the most reliable response — Black keeps the center secure and prepares to develop the queenside pieces.",
          concepts: ["center-control", "pawn-structure"],
          controls: "d5 pawn reinforced",
        },
        {
          san: "Nc3",
          color: "white",
          why: "The knight develops to c3, adding pressure on d5 and preparing to support a later e4 push. In this line, Nc3 is preferred over Nbd2 because the c4 pawn has already committed and the knight is needed on c3 to maintain pressure.",
          concepts: ["development", "center-control"],
          controls: "d5, e4 squares",
          commonMistakes: [
            {
              san: "Nf3",
              whyBad:
                "Nf3 is a good developing move but it's the kingside knight — you need the queenside knight on c3 to pressure d5 and support a future e4 break. Nf3 can come later; Nc3 is the priority because it works with c4 to create maximum tension on d5.",
            },
            {
              san: "Nd2",
              whyBad:
                "Nd2 is too passive — the knight doesn't pressure d5 from d2 and it blocks the dark-squared bishop. Nc3 is the natural and active square, directly targeting d5 and e4 while keeping all other pieces unobstructed.",
            },
          ],
        },
        {
          san: "O-O",
          color: "black",
          why: "Black castles to safety. The position is balanced but strategically complex — White has the better pawn structure, while Black has the bishop pair and solid center.",
          concepts: ["king-safety"],
        },
      ],
    },
    {
      id: "trompowsky-e6-passive",
      name: "Quiet 2...e6 Line",
      description: "Black plays the restrained 2...e6, accepting the pin temporarily and aiming for a solid French-like structure.",
      branchesAt: 3, // Index 3 = Black's 2nd move (main line: Ne4)
      opponentMove: {
        san: "e6",
        color: "black",
        why: "A modest but solid response. Black reinforces the knight with e6 (if White takes on f6, Black recaptures with the queen) and prepares ...d5, ...Be7, and castling. This leads to a quieter game where White must find a way to use the early Bg5.",
        concepts: ["center-control", "development"],
        controls: "d5 square reinforced, f7 protected",
      },
      moves: [
        {
          san: "e4",
          color: "white",
          why: "White seizes the center with e4! Since Black hasn't challenged the center with ...d5 yet, White grabs space immediately. The position now resembles a reversed French Defense where White has an extra tempo. The e4+d4 center gives White a space advantage and aggressive prospects.",
          concepts: ["center-control", "space"],
          controls: "d5, f5 squares — commanding central presence",
          commonMistakes: [
            {
              san: "e3",
              whyBad:
                "e3 is too timid when Black has played the passive ...e6. Since Black hasn't challenged the center with ...d5, White should grab maximum space with e4. Playing e3 instead surrenders the opportunity for a commanding two-pawn center.",
            },
            {
              san: "Nf3",
              whyBad:
                "Nf3 is a normal developing move but misses the key moment. Black played ...e6 without ...d5, leaving the center wide open for e4. Grab the space now — Nf3 can come later, but the chance to play e4 with full effect won't last.",
            },
          ],
        },
        {
          san: "h6",
          color: "black",
          why: "Black asks the bishop to declare its intentions. The bishop must decide — take the knight (Bxf6) or retreat. This is a common motif: Black spends a tempo to force the issue of the pin.",
          concepts: ["tempo", "prophylaxis"],
          controls: "Challenges Bg5",
        },
        {
          san: "Bxf6",
          color: "white",
          why: "White takes the knight. With the big center already established, the doubled pawns become a long-term weakness for Black. Trading the bishop for the knight is worth it because the pawn structure damage is permanent.",
          concepts: ["pawn-structure", "attack"],
          controls: "Doubles f-pawns, creates structural weakness",
          commonMistakes: [
            {
              san: "Bh4",
              whyBad:
                "Retreating to h4 maintains the pin but the bishop is passive on the rim. Black forced you to decide with ...h6 — take the knight now and get the doubled pawns, or admit the bishop sortie was pointless. Bxf6 follows through on the Trompowsky's central idea.",
            },
            {
              san: "Be3",
              whyBad:
                "Dropping the bishop back to e3 wastes all the tempi spent on Bg5. You played Bg5 to create the pin and damage Black's structure — retreating without taking means Black got ...h6 for free while you accomplished nothing. Bxf6 delivers the structural damage you invested in.",
            },
          ],
        },
        {
          san: "Qxf6",
          color: "black",
          why: "Black recaptures with the queen to avoid doubled pawns. The queen on f6 is active but slightly exposed — White can gain tempo by developing with threats to the queen.",
          concepts: ["piece-activity", "development"],
          controls: "Active queen, avoids doubled pawns",
        },
        {
          san: "Nc3",
          color: "white",
          why: "Develops the knight to c3 with tempo — the knight eyes d5 and also prepares to support e5 push. White has a commanding center and is developing faster than Black.",
          concepts: ["development", "center-control", "tempo"],
          controls: "d5 square, supports e5",
          commonMistakes: [
            {
              san: "Bd3",
              whyBad:
                "Bd3 develops but doesn't create the same pressure as Nc3. The knight on c3 controls d5 — a critical outpost — and prepares Nd5 which would be devastating. Develop the knight first to maximize central pressure, then the bishop.",
            },
            {
              san: "c3",
              whyBad:
                "c3 supports d4 but blocks the natural Nc3 square. The knight belongs on c3 where it pressures d5 and supports e5. Playing c3 forces the knight to the passive d2 square and wastes the chance for active development.",
            },
          ],
        },
        {
          san: "d6",
          color: "black",
          why: "Black plays d6 to control e5 and prepare ...Nd7 development. The position is passive but solid — Black's strategy is to hold the center and look for a chance to break with ...e5 or ...c5 later.",
          concepts: ["center-control", "prophylaxis"],
          controls: "e5 square, prevents e5 push",
        },
        {
          san: "Nf3",
          color: "white",
          why: "Complete development with Nf3, preparing to castle. White has a significant space advantage with the e4+d4 center and better development. The plan is to castle and then look for ways to break through — f4 to support e5, or Nd5 to plant a knight in Black's territory.",
          concepts: ["development", "king-safety"],
          controls: "e5, d4 squares",
          commonMistakes: [
            {
              san: "f4",
              whyBad:
                "f4 looks aggressive but it weakens the kingside before castling. White hasn't completed development yet — Nf3 and O-O should come first to secure the king. Then f4 can be considered as a plan to support e5 from a safe position.",
            },
            {
              san: "Bd3",
              whyBad:
                "Bd3 develops but it's more important to get Nf3 in first so you can castle quickly. The knight on f3 supports d4 and e5 while enabling kingside castling. The bishop can come to d3, c4, or b5 after the king is safe.",
            },
          ],
        },
        {
          san: "Nd7",
          color: "black",
          why: "Black develops the knight to d7, a passive but necessary square. From d7, the knight can go to c5, e5, or f8 depending on what White does. Black is cramped but solid.",
          concepts: ["development"],
          controls: "Flexible knight placement",
        },
      ],
    },
  ],
};
