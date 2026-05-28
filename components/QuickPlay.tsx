"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import WordMeaningCard from "@/components/WordMeaningCard";

const GRID_SIZE = 8;
const TARGET_SCORE = 75;
const MIN_WORD = 3;
const MAX_WORD = 10;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const QWERTY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

type Player = 1 | 2;

type Cell = {
  letter: string;
  player?: Player;
};

type FoundWord = {
  word: string;
  points: number;
  player: Player;
  cells: [number, number][];
};

type ScoreBurst = {
  id: number;
  word: string;
  points: number;
  cells: [number, number][];
  color: string;
};

type ScanHit = {
  word: string;
  cells: [number, number][];
  pathKey: string;
};

const PLAYER_COLORS: Record<Player, string> = {
  1: "#FF5E5B",
  2: "#00C2CC",
};

const PLAYER_AVATARS: Record<Player, string> = {
  1: "🦊",
  2: "🤖",
};

const PLAYER_NAMES: Record<Player, string> = {
  1: "You",
  2: "AI",
};

function makeEmptyGrid(): Cell[][] {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ({ letter: "" }))
  );
}

const AXES: [number, number][] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
];

function cellsToKey(cells: [number, number][]): string {
  return cells.map(([r, c]) => `${r},${c}`).join("|");
}

// Scan entire board for ALL valid unclaimed words (any direction, any length 3-10)
function scanAllWords(
  grid: Cell[][],
  dict: Set<string>,
  claimed: Set<string>
): ScanHit[] {
  const results: ScanHit[] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c].letter) continue;
      for (const [dr, dc] of AXES) {
        const cells: [number, number][] = [[r, c]];
        let str = grid[r][c].letter;
        for (let len = 2; len <= MAX_WORD; len++) {
          const nr = r + dr * (len - 1);
          const nc = c + dc * (len - 1);
          if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) break;
          if (!grid[nr][nc].letter) break;
          cells.push([nr, nc]);
          str = str + grid[nr][nc].letter;
          if (len >= MIN_WORD) {
            const forward = str.toLowerCase();
            const reverse = forward.split("").reverse().join("");
            const forwardCells: [number, number][] = cells.map(([rr, cc]) => [rr, cc]);
            const reverseCells: [number, number][] = [...forwardCells].reverse();
            const keyF = cellsToKey(forwardCells);
            const keyR = cellsToKey(reverseCells);
            if (dict.has(forward) && !claimed.has(keyF)) {
              results.push({ word: forward, cells: forwardCells, pathKey: keyF });
            }
            if (forward !== reverse && dict.has(reverse) && !claimed.has(keyR)) {
              results.push({ word: reverse, cells: reverseCells, pathKey: keyR });
            }
          }
        }
      }
    }
  }
  return results;
}

function effectivePoints(word: string, priorCount: number): number {
  const base = word.length;
  if (priorCount === 0) return base;
  if (priorCount === 1) return Math.ceil(base / 2);
  return 1;
}

function validateSwipeLine(cells: [number, number][]): boolean {
  if (cells.length < MIN_WORD) return false;
  const [r0, c0] = cells[0];
  const [r1, c1] = cells[1];
  const dr = Math.sign(r1 - r0);
  const dc = Math.sign(c1 - c0);
  if (dr === 0 && dc === 0) return false;
  for (let i = 1; i < cells.length; i++) {
    const [pr, pc] = cells[i - 1];
    const [r, c] = cells[i];
    if (r - pr !== dr || c - pc !== dc) return false;
  }
  return true;
}

const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

export default function QuickPlay() {
  const [grid, setGrid] = useState<Cell[][]>(() => makeEmptyGrid());
  const [dictionary, setDictionary] = useState<Set<string> | null>(null);
  const [loadingDict, setLoadingDict] = useState(true);

  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [scores, setScores] = useState<Record<Player, number>>({ 1: 0, 2: 0 });
  const [wordCounts, setWordCounts] = useState<Record<string, number>>({});
  const [claimedPaths, setClaimedPaths] = useState<Set<string>>(new Set());
  const [foundLog, setFoundLog] = useState<FoundWord[]>([]);

  // Placement phase selection
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Turn phase
  const [phase, setPhase] = useState<"placement" | "swipe">("placement");
  const [lastPlaced, setLastPlaced] = useState<[number, number] | null>(null);
  const [swipeTrace, setSwipeTrace] = useState<[number, number][]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [winner, setWinner] = useState<Player | "tie" | null>(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [flash, setFlash] = useState<{ message: string; positive: boolean } | null>(null);
  const [bursts, setBursts] = useState<ScoreBurst[]>([]);
  const [glowingCells, setGlowingCells] = useState<Set<string>>(new Set());
  const [expandedWordKey, setExpandedWordKey] = useState<string | null>(null);

  // Refs that always reflect the latest state for async AI loop
  const gridRef = useRef(grid);
  const wordCountsRef = useRef(wordCounts);
  const claimedPathsRef = useRef(claimedPaths);
  const scoresRef = useRef(scores);
  const winnerRef = useRef<Player | "tie" | null>(winner);
  const burstIdRef = useRef(0);
  const aiBusyRef = useRef(false);

  useEffect(() => { gridRef.current = grid; }, [grid]);
  useEffect(() => { wordCountsRef.current = wordCounts; }, [wordCounts]);
  useEffect(() => { claimedPathsRef.current = claimedPaths; }, [claimedPaths]);
  useEffect(() => { scoresRef.current = scores; }, [scores]);
  useEffect(() => { winnerRef.current = winner; }, [winner]);

  useEffect(() => {
    fetch("/words_dictionary.json")
      .then((r) => r.json())
      .then((data: Record<string, number>) => {
        setDictionary(new Set(Object.keys(data)));
        setLoadingDict(false);
      })
      .catch(() => setLoadingDict(false));
  }, []);

  const isGridFull = useMemo(
    () => grid.every((row) => row.every((c) => c.letter !== "")),
    [grid]
  );

  // Trigger floating burst + cell glow for a scored word
  const triggerBurst = useCallback(
    (word: string, points: number, cells: [number, number][], color: string) => {
      const id = ++burstIdRef.current;
      setBursts((b) => [...b, { id, word, points, cells, color }]);
      const cellKeys = cells.map(([r, c]) => `${r}-${c}`);
      setGlowingCells((s) => {
        const ns = new Set(s);
        cellKeys.forEach((k) => ns.add(k));
        return ns;
      });
      setTimeout(() => {
        setBursts((b) => b.filter((x) => x.id !== id));
        setGlowingCells((s) => {
          const ns = new Set(s);
          cellKeys.forEach((k) => ns.delete(k));
          return ns;
        });
      }, 1400);
    },
    []
  );

  // Apply a word claim — updates score, counts, log, animations
  const applyClaim = useCallback(
    (word: string, cells: [number, number][], player: Player): number => {
      const prior = wordCountsRef.current[word] ?? 0;
      const pts = effectivePoints(word, prior);
      const pathKey = cellsToKey(cells);
      const newCounts = { ...wordCountsRef.current, [word]: prior + 1 };
      const newClaimed = new Set(claimedPathsRef.current);
      newClaimed.add(pathKey);
      const newScores: Record<Player, number> = {
        ...scoresRef.current,
        [player]: scoresRef.current[player] + pts,
      };

      // Sync refs immediately for AI loop
      wordCountsRef.current = newCounts;
      claimedPathsRef.current = newClaimed;
      scoresRef.current = newScores;

      setWordCounts(newCounts);
      setClaimedPaths(newClaimed);
      setScores(newScores);
      setFoundLog((log) => [{ word, points: pts, player, cells }, ...log]);
      triggerBurst(word, pts, cells, PLAYER_COLORS[player]);

      if (newScores[player] >= TARGET_SCORE) {
        winnerRef.current = player;
        setWinner(player);
      }
      return pts;
    },
    [triggerBurst]
  );

  // Place a single letter on the grid (does NOT auto-score — that happens in swipe phase)
  const placeLetter = useCallback(
    (row: number, col: number, letter: string, player: Player) => {
      const upper = letter.toUpperCase();
      const newGrid = gridRef.current.map((r) => [...r]);
      newGrid[row][col] = { letter: upper, player };
      gridRef.current = newGrid;
      setGrid(newGrid);
      setLastPlaced([row, col]);
      return newGrid;
    },
    []
  );

  // Switch to next player
  const switchTurn = useCallback(() => {
    setPhase("placement");
    setLastPlaced(null);
    setSwipeTrace([]);
    setSelectedCell(null);
    setSelectedLetter(null);
    setCurrentPlayer((p) => (p === 1 ? 2 : 1));
  }, []);

  // Human places letter when both selections are set
  useEffect(() => {
    if (
      phase === "placement" &&
      currentPlayer === 1 &&
      !winner &&
      !aiThinking &&
      selectedCell &&
      selectedLetter
    ) {
      const [r, c] = selectedCell;
      placeLetter(r, c, selectedLetter, 1);
      setSelectedCell(null);
      setSelectedLetter(null);
      setPhase("swipe");
      setFlash({
        message: "Letter placed. Swipe to claim words, or End Turn.",
        positive: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell, selectedLetter, phase, currentPlayer, winner, aiThinking]);

  const handleCellClick = (row: number, col: number) => {
    if (currentPlayer !== 1 || winner || aiThinking) return;
    if (phase !== "placement") return;
    if (grid[row][col].letter) return;
    setSelectedCell([row, col]);
  };

  const handleLetterClick = (letter: string) => {
    if (currentPlayer !== 1 || winner || aiThinking) return;
    if (phase !== "placement") return;
    setSelectedLetter(letter);
  };

  // Physical keyboard support
  useEffect(() => {
    if (currentPlayer !== 1 || winner || aiThinking) return;
    const onKey = (e: KeyboardEvent) => {
      if (phase === "placement") {
        const k = e.key.toUpperCase();
        if (k.length === 1 && k >= "A" && k <= "Z") {
          setSelectedLetter(k);
        } else if (e.key === "Escape") {
          setSelectedCell(null);
          setSelectedLetter(null);
        }
      } else if (phase === "swipe") {
        if (e.key === "Enter" && !isDragging) {
          e.preventDefault();
          switchTurn();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPlayer, phase, winner, aiThinking, isDragging, switchTurn]);

  // SWIPE phase
  const handleSwipeStart = (r: number, c: number) => {
    if (phase !== "swipe" || currentPlayer !== 1 || !grid[r][c].letter) return;
    setIsDragging(true);
    setSwipeTrace([[r, c]]);
  };

  const handleSwipeEnter = useCallback(
    (r: number, c: number) => {
      if (!isDragging || phase !== "swipe") return;
      if (!grid[r][c].letter) return;
      setSwipeTrace((prev) => {
        if (prev.length === 0) return [[r, c]];
        const last = prev[prev.length - 1];
        if (last[0] === r && last[1] === c) return prev;
        if (prev.length >= 2) {
          const secondLast = prev[prev.length - 2];
          if (secondLast[0] === r && secondLast[1] === c) {
            return prev.slice(0, -1);
          }
        }
        if (prev.some(([pr, pc]) => pr === r && pc === c)) return prev;
        return [...prev, [r, c]];
      });
    },
    [isDragging, phase, grid]
  );

  const submitSwipe = useCallback(() => {
    setIsDragging(false);
    if (!dictionary) {
      setSwipeTrace([]);
      return;
    }
    if (swipeTrace.length < MIN_WORD) {
      setSwipeTrace([]);
      return;
    }
    if (!validateSwipeLine(swipeTrace)) {
      setFlash({ message: "Word must be a straight line", positive: false });
      setSwipeTrace([]);
      return;
    }
    const forward = swipeTrace.map(([r, c]) => grid[r][c].letter).join("").toLowerCase();
    const reverse = forward.split("").reverse().join("");
    const word = dictionary.has(forward)
      ? forward
      : dictionary.has(reverse)
      ? reverse
      : null;
    if (!word) {
      setFlash({ message: `${forward.toUpperCase()} — not a valid word`, positive: false });
      setSwipeTrace([]);
      return;
    }
    const cells: [number, number][] =
      word === reverse ? [...swipeTrace].reverse() : [...swipeTrace];
    const key = cellsToKey(cells);
    if (claimedPathsRef.current.has(key)) {
      setFlash({ message: "Already claimed", positive: false });
      setSwipeTrace([]);
      return;
    }
    applyClaim(word, cells, 1);
    setSwipeTrace([]);
  }, [swipeTrace, dictionary, grid, applyClaim]);

  useEffect(() => {
    if (!isDragging) return;
    const onUp = () => submitSwipe();
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, submitSwipe]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
    if (el && el.dataset.cell) {
      const [r, c] = el.dataset.cell.split("-").map(Number);
      handleSwipeEnter(r, c);
    }
  };

  // End-turn → AI's turn
  const endTurnAndPassToAi = useCallback(() => {
    if (winner || currentPlayer !== 1) return;
    setSwipeTrace([]);
    switchTurn();
  }, [winner, currentPlayer, switchTurn]);

  // AI TURN: place random letter → repeatedly claim highest-pointing unclaimed word → end turn
  useEffect(() => {
    if (currentPlayer !== 2 || winner || loadingDict || !dictionary) return;
    if (aiBusyRef.current) return;

    if (isGridFull) {
      const s = scoresRef.current;
      if (s[1] > s[2]) setWinner(1);
      else if (s[2] > s[1]) setWinner(2);
      else setWinner("tie");
      return;
    }

    aiBusyRef.current = true;
    setAiThinking(true);

    (async () => {
      await sleep(800);

      // 1. Random placement
      const empty: [number, number][] = [];
      gridRef.current.forEach((row, r) =>
        row.forEach((cell, c) => {
          if (!cell.letter) empty.push([r, c]);
        })
      );
      if (empty.length > 0) {
        const [r, c] = empty[Math.floor(Math.random() * empty.length)];
        const letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        const newGrid = placeLetter(r, c, letter, 2);
        gridRef.current = newGrid;
      }

      setPhase("swipe");
      await sleep(700);

      // 2. Claim words one by one — highest points first
      let claims = 0;
      while (!winnerRef.current) {
        const hits = scanAllWords(gridRef.current, dictionary, claimedPathsRef.current);
        if (hits.length === 0) break;
        // Sort by effective points descending
        hits.sort((a, b) => {
          const pa = effectivePoints(a.word, wordCountsRef.current[a.word] ?? 0);
          const pb = effectivePoints(b.word, wordCountsRef.current[b.word] ?? 0);
          return pb - pa;
        });
        const best = hits[0];
        applyClaim(best.word, best.cells, 2);
        claims++;
        await sleep(750);
      }

      if (claims === 0) {
        setFlash({ message: "AI placed a letter — no word formed", positive: false });
      } else {
        setFlash({
          message: `AI claimed ${claims} word${claims > 1 ? "s" : ""}`,
          positive: true,
        });
      }

      await sleep(900);
      setAiThinking(false);
      aiBusyRef.current = false;
      if (!winnerRef.current) {
        switchTurn();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, winner, loadingDict, dictionary]);

  // Flash auto-clear
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 3000);
    return () => clearTimeout(t);
  }, [flash]);

  const resetGame = () => {
    aiBusyRef.current = false;
    setGrid(makeEmptyGrid());
    setScores({ 1: 0, 2: 0 });
    setWordCounts({});
    setClaimedPaths(new Set());
    setFoundLog([]);
    setSelectedCell(null);
    setSelectedLetter(null);
    setCurrentPlayer(1);
    setWinner(null);
    setAiThinking(false);
    setFlash(null);
    setPhase("placement");
    setLastPlaced(null);
    setSwipeTrace([]);
    setBursts([]);
    setGlowingCells(new Set());
    // Reset refs
    gridRef.current = makeEmptyGrid();
    wordCountsRef.current = {};
    claimedPathsRef.current = new Set();
    scoresRef.current = { 1: 0, 2: 0 };
    winnerRef.current = null;
  };

  if (loadingDict) {
    return (
      <div className="card p-12 text-center">
        <div className="text-5xl mb-4 animate-bounce">📖</div>
        <p className="text-[#555770] font-bold">Loading dictionary...</p>
      </div>
    );
  }

  if (winner) {
    const isWin = winner === 1;
    const isTie = winner === "tie";
    return (
      <div className="card p-12 text-center">
        <div className="text-7xl mb-4 float">
          {isTie ? "🤝" : isWin ? "🏆" : "🤖"}
        </div>
        <h2 className="text-4xl font-black text-[#1A1A2E] mb-2">
          {isTie ? "It's a tie!" : isWin ? "You won!" : "AI wins!"}
        </h2>
        <p className="text-lg text-[#555770] mb-6">
          Final: You {scores[1]} · AI {scores[2]}
        </p>
        <button type="button" onClick={resetGame} className="btn-primary">
          <span>🔄</span> Play Again
        </button>
      </div>
    );
  }

  const tracedSet = new Set<string>();
  swipeTrace.forEach(([r, c]) => tracedSet.add(`${r}-${c}`));
  const traceOrder = new Map<string, number>();
  swipeTrace.forEach(([r, c], i) => traceOrder.set(`${r}-${c}`, i));
  const currentTraceWord = swipeTrace.map(([r, c]) => grid[r][c].letter).join("");

  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-6">
      <div className="card p-5 md:p-7">
        {/* Scoreboard */}
        <div className="flex items-center justify-between mb-5 gap-3">
          <ScorePanel player={1} active={currentPlayer === 1} score={scores[1]} />
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#9094A6]">
            vs
          </div>
          <ScorePanel
            player={2}
            active={currentPlayer === 2}
            score={scores[2]}
            thinking={aiThinking}
          />
        </div>

        <div className="flex gap-2 mb-5">
          <ProgressBar value={scores[1]} color="#FF5E5B" />
          <ProgressBar value={scores[2]} color="#00C2CC" />
        </div>

        {/* Status panel */}
        <div className="bg-[#FFB300]/10 border-2 border-[#FFB300]/30 rounded-2xl py-3 px-4 text-center mb-5 min-h-[58px] flex items-center justify-center">
          {flash ? (
            <div
              className={`text-base font-extrabold ${
                flash.positive ? "text-[#00C9A7]" : "text-[#FF4757]"
              }`}
            >
              {flash.message}
            </div>
          ) : currentPlayer === 1 ? (
            phase === "swipe" ? (
              currentTraceWord ? (
                <div className="text-2xl font-black tracking-[0.15em] text-[#1A1A2E]">
                  {currentTraceWord}
                </div>
              ) : (
                <div className="text-sm font-bold text-[#1A1A2E]">
                  Swipe to claim a word — or press <kbd className="px-1.5 py-0.5 bg-white border border-[#DDDDE8] rounded font-mono text-xs">Enter</kbd> to end turn
                </div>
              )
            ) : selectedCell && !selectedLetter ? (
              <div className="text-sm font-bold text-[#1A1A2E]">
                Cell selected — now tap a letter (or type one)
              </div>
            ) : selectedLetter && !selectedCell ? (
              <div className="text-sm font-bold text-[#1A1A2E]">
                Letter <span className="text-[#6C63FF]">{selectedLetter}</span> ready — tap an empty cell
              </div>
            ) : (
              <div className="text-sm font-bold text-[#1A1A2E]">
                Your turn — pick a letter or empty cell to place
              </div>
            )
          ) : (
            <div className="text-sm font-bold text-[#555770] flex items-center gap-2">
              <span className="animate-pulse">🤖</span> AI is playing...
            </div>
          )}
        </div>

        {/* Grid + bursts */}
        <div className="relative">
          <div
            onTouchMove={handleTouchMove}
            className="grid gap-1.5 max-w-[480px] mx-auto select-none"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const key = `${r}-${c}`;
                const isSelected =
                  selectedCell && selectedCell[0] === r && selectedCell[1] === c;
                const isLastPlaced =
                  lastPlaced && lastPlaced[0] === r && lastPlaced[1] === c;
                const owner = cell.player;
                const ownerColor = owner ? PLAYER_COLORS[owner] : undefined;
                const isEmpty = !cell.letter;
                const inTrace = tracedSet.has(key);
                const order = traceOrder.get(key);
                const isGlowing = glowingCells.has(key);

                const placementSelectable =
                  isEmpty &&
                  phase === "placement" &&
                  currentPlayer === 1 &&
                  !aiThinking;

                return (
                  <button
                    key={key}
                    type="button"
                    data-cell={`${r}-${c}`}
                    onMouseDown={(e) => {
                      if (phase === "swipe") {
                        e.preventDefault();
                        handleSwipeStart(r, c);
                      } else {
                        handleCellClick(r, c);
                      }
                    }}
                    onMouseEnter={() => handleSwipeEnter(r, c)}
                    onTouchStart={(e) => {
                      if (phase === "swipe") {
                        e.preventDefault();
                        handleSwipeStart(r, c);
                      } else {
                        handleCellClick(r, c);
                      }
                    }}
                    disabled={
                      phase === "placement" &&
                      (!isEmpty || currentPlayer !== 1 || aiThinking)
                    }
                    className={`aspect-square rounded-lg text-lg md:text-xl font-black flex items-center justify-center transition relative ${
                      isEmpty
                        ? placementSelectable
                          ? "bg-[#F4F4F8] hover:bg-[#E8E8F2] cursor-pointer"
                          : "bg-[#F4F4F8] cursor-not-allowed"
                        : inTrace
                        ? "bg-[#6C63FF] text-white scale-110 shadow-lg z-10"
                        : "bg-white border-2"
                    } ${isSelected ? "ring-4 ring-[#6C63FF] scale-105" : ""} ${
                      isLastPlaced && phase === "swipe" && !inTrace
                        ? "ring-2 ring-[#FFB300] ring-offset-1"
                        : ""
                    } ${isGlowing ? "cell-glow" : ""}`}
                    style={
                      !isEmpty && !inTrace
                        ? {
                            color: ownerColor,
                            borderColor: `${ownerColor}50`,
                          }
                        : undefined
                    }
                  >
                    {cell.letter}
                    {inTrace && order !== undefined && (
                      <span className="absolute top-0.5 right-1 text-[10px] font-extrabold opacity-80">
                        {order + 1}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {bursts.map((burst) => {
            const [cr, cc] = burst.cells[Math.floor(burst.cells.length / 2)];
            const top = `${(cr / GRID_SIZE) * 100}%`;
            const left = `${((cc + 0.5) / GRID_SIZE) * 100}%`;
            return (
              <div
                key={burst.id}
                className="absolute pointer-events-none z-20 score-burst"
                style={{ top, left, transform: "translate(-50%, -50%)" }}
              >
                <div
                  className="px-4 py-2 rounded-full font-black text-lg shadow-lg whitespace-nowrap"
                  style={{ backgroundColor: burst.color, color: "white" }}
                >
                  +{burst.points} · {burst.word.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Keyboard */}
        <div className="mt-6">
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#9094A6] mb-2 text-center">
            {phase === "swipe"
              ? "Already placed — swipe above or End Turn"
              : currentPlayer === 1
              ? "Tap a letter (or type on keyboard)"
              : "AI's turn"}
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            {QWERTY_ROWS.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="flex justify-center gap-1.5"
              >
                {row.split("").map((l) => {
                  const isSelected = selectedLetter === l;
                  const enabled =
                    phase === "placement" && currentPlayer === 1 && !aiThinking;
                  return (
                    <button
                      key={l}
                      type="button"
                      onClick={() => handleLetterClick(l)}
                      disabled={!enabled}
                      className={`flex-1 max-w-[40px] aspect-square rounded-lg font-extrabold text-sm md:text-base transition ${
                        isSelected
                          ? "bg-[#6C63FF] text-white scale-110 ring-4 ring-[#6C63FF]/30 shadow-lg"
                          : enabled
                          ? "bg-[#F0F2FA] hover:bg-[#6C63FF] hover:text-white text-[#1A1A2E] cursor-pointer"
                          : "bg-[#F0F2FA] text-[#9094A6] cursor-not-allowed"
                      }`}
                    >
                      {l}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          {phase === "swipe" && currentPlayer === 1 && !aiThinking && (
            <button
              type="button"
              onClick={endTurnAndPassToAi}
              className="btn-primary text-sm"
            >
              End Turn ↵
            </button>
          )}
          <button
            type="button"
            onClick={resetGame}
            className="px-5 py-2 rounded-full bg-[#F0F2FA] text-[#555770] font-bold text-sm hover:bg-[#DDDDE8] transition"
          >
            🔄 New Game
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="card p-5">
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#9094A6] mb-3">
          Words Found ({foundLog.length})
        </div>
        {foundLog.length === 0 ? (
          <p className="text-sm text-[#9094A6]">
            Words appear as they&apos;re claimed. Tap a word to see its meaning!
          </p>
        ) : (
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {foundLog.map((f, idx) => {
              const rowKey = `${f.word}-${idx}-${f.points}`;
              const isOpen = expandedWordKey === rowKey;
              return (
                <div key={rowKey} className="word-pop">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedWordKey(isOpen ? null : rowKey)
                    }
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2 transition ${
                      isOpen
                        ? "bg-[#F0F2FA]"
                        : "bg-[#F8F8FC] hover:bg-[#F0F2FA]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{PLAYER_AVATARS[f.player]}</span>
                      <span className="font-extrabold text-[#1A1A2E] text-sm tracking-wider">
                        {f.word.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-extrabold"
                        style={{ color: PLAYER_COLORS[f.player] }}
                      >
                        +{f.points}
                      </span>
                      <svg
                        className={`w-3 h-3 text-[#9094A6] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  {isOpen && <WordMeaningCard word={f.word} />}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-5 pt-5 border-t border-[#EEEFF3]">
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#9094A6] mb-2">
            How it works
          </div>
          <ul className="text-xs text-[#555770] space-y-1 font-medium leading-relaxed">
            <li>1. Place ONE letter (tap letter + cell, any order)</li>
            <li>2. Swipe through 3+ letters in a line to claim words</li>
            <li>3. Hit &quot;End Turn&quot; to pass to AI</li>
            <li>4. AI places + claims, then it&apos;s your turn</li>
            <li className="text-[#9094A6] pt-1">
              Repeats score ½ then 1 pt · 75 to win
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ScorePanel({
  player,
  score,
  active,
  thinking,
}: {
  player: Player;
  score: number;
  active: boolean;
  thinking?: boolean;
}) {
  const color = PLAYER_COLORS[player];
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-2xl transition flex-1 ${
        active ? "bg-white shadow-md" : ""
      }`}
      style={active ? { boxShadow: `0 4px 14px ${color}30` } : undefined}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
          thinking ? "animate-pulse" : ""
        }`}
        style={{ backgroundColor: `${color}25` }}
      >
        {PLAYER_AVATARS[player]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-[#555770]">
          {PLAYER_NAMES[player]}
          {active && <span className="ml-1 text-[#00C9A7]">●</span>}
        </div>
        <div
          className="text-2xl font-black leading-none score-tick"
          key={score}
          style={{ color }}
        >
          {score}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  const pct = Math.min(100, (value / TARGET_SCORE) * 100);
  return (
    <div className="h-2 bg-[#F0F2FA] rounded-full overflow-hidden flex-1">
      <div
        className="h-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}
