// src/components/website/Common/piano/piano.tsx
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateNotes, getScaleInfo, KEYS, Note } from "./theory";
import PianoKey from "./PianoKey";
import Image from "next/image";

const KEY_TO_NOTE_INDEX: { [key: string]: number } = {
  a: 0,
  w: 1,
  s: 2,
  e: 3,
  d: 4,
  f: 5,
  t: 6,
  g: 7,
  y: 8,
  h: 9,
  u: 10,
  j: 11,
  k: 12,
  o: 13,
  l: 14,
  p: 15,
  ";": 16,
  "'": 17,
  z: 18,
  x: 19,
  c: 20,
  v: 21,
  b: 22,
  n: 23,
  m: 24,
  ",": 25,
  ".": 26,
  "/": 27,
  q: 28,
  "2": 29,
  "3": 30,
  "4": 31,
  "5": 32,
  "6": 33,
  "7": 34,
  "8": 35,
  "9": 36,
};

const Piano = () => {
  // --- State ---
  const [selectedKey, setSelectedKey] = useState<string>("C");

  // Physically rotate the keyboard starting from selectedKey
  const notes = useMemo(() => generateNotes(selectedKey), [selectedKey]);

  const { degrees: scaleDegrees } = useMemo(
    () => getScaleInfo(selectedKey, "Major"),
    [selectedKey],
  );

  const [melodyMode, setMelodyMode] = useState<boolean>(true);
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());

  const [sequenceBuffer, setSequenceBuffer] = useState<Note[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaybackActive, setIsPlaybackActive] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // --- Audio Logic & Hard Stop ---
  const audioCache = useRef<{ [filename: string]: HTMLAudioElement }>({});

  const audioHardStop = () => {
    Object.values(audioCache.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  const handleKeyChange = (newKey: string) => {
    audioHardStop();
    setSelectedKey(newKey);
    setSequenceBuffer([]);
    setActiveNotes(new Set());
    setIsRecording(false);
  };

  // --- Initialization ---
  useEffect(() => {
    const checkWidth = () => {
      setIsSmallScreen(globalThis.innerWidth < 756);
    };
    checkWidth();
    globalThis.addEventListener("resize", checkWidth);
    return () => globalThis.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    notes.forEach((note) => {
      if (!audioCache.current[note.filename]) {
        const audio = new Audio(note.filename);
        audio.preload = "auto";
        audioCache.current[note.filename] = audio;
      }
    });
  }, [notes]);

  const playSound = (filename: string) => {
    const audio = audioCache.current[filename];
    if (audio) {
      // For simultaneous playback, we use a clone to avoid blocking
      const sound = audio.cloneNode() as HTMLAudioElement;
      sound.volume = 0.6;
      sound.play().catch((e) => console.error("Audio play failed", e));
    }
  };

  // --- Core Logic Functions ---
  const clearBuffer = () => {
    audioHardStop();
    setSequenceBuffer([]);
    setActiveNotes(new Set());
    setIsRecording(false);
  };

  const playSequence = async () => {
    if (sequenceBuffer.length === 0 || isPlaybackActive) return;
    setIsPlaybackActive(true);
    setIsRecording(false);

    // Play all notes in the buffer simultaneously (Chord Mode)
    sequenceBuffer.forEach((note) => playSound(note.filename));

    // Highlight all associated keys in blue
    const allActive = new Set(sequenceBuffer.map((n) => n.name));
    setActiveNotes(allActive);

    // Brief highlight duration
    await new Promise((resolve) => setTimeout(resolve, 800));

    setActiveNotes(new Set());
    setIsPlaybackActive(false);
  };

  const handleNoteTrigger = React.useCallback(
    (note: Note, isPress: boolean) => {
      if (!isPress) {
        if (melodyMode) {
          setActiveNotes(new Set());
        }
        return;
      }

      // Play sound immediately
      if (melodyMode || !isRecording) {
        playSound(note.filename);
        setActiveNotes(new Set([note.name]));
      } else if (sequenceBuffer.length < 8) {
        // Chord Mode - Recording (Limit to 8 notes for a chord)
        setSequenceBuffer((prev) => [...prev, note]);
        playSound(note.filename);
        setActiveNotes((prev) => new Set(prev).add(note.name));
      }
    },
    [melodyMode, isRecording, sequenceBuffer.length],
  );

  // --- Render Helpers ---
  const renderKeys = () => {
    const elements: React.ReactElement[] = [];

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note.isBlack) continue;

      const nextNote = notes[i + 1];
      const hasBlack = nextNote?.isBlack;
      const strippedName = note.name.replaceAll(/\d/g, "");
      const degree = scaleDegrees.get(strippedName);

      elements.push(
        <div key={note.name} className="relative flex-shrink-0">
          <PianoKey
            note={note}
            isActive={activeNotes.has(note.name)}
            showLabel={showNotes}
            degree={degree}
            onMouseDown={() => handleNoteTrigger(note, true)}
            onMouseUp={() => handleNoteTrigger(note, false)}
            onMouseEnter={() => {}}
          />

          {hasBlack && (
            <PianoKey
              note={nextNote}
              isActive={activeNotes.has(nextNote.name)}
              showLabel={showNotes}
              degree={
                scaleDegrees.get(nextNote.sharp!) ||
                scaleDegrees.get(nextNote.flat!)
              }
              onMouseDown={() => handleNoteTrigger(nextNote, true)}
              onMouseUp={() => handleNoteTrigger(nextNote, false)}
              onMouseEnter={() => {}}
            />
          )}
        </div>,
      );
    }
    return elements;
  };

  // --- Keyboard Mapping ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      const noteIndex = KEY_TO_NOTE_INDEX[key];

      if (noteIndex !== undefined && notes[noteIndex]) {
        handleNoteTrigger(notes[noteIndex], true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const noteIndex = KEY_TO_NOTE_INDEX[key];

      if (noteIndex !== undefined && notes[noteIndex]) {
        handleNoteTrigger(notes[noteIndex], false);
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    globalThis.addEventListener("keyup", handleKeyUp);

    return () => {
      globalThis.removeEventListener("keydown", handleKeyDown);
      globalThis.removeEventListener("keyup", handleKeyUp);
    };
  }, [notes, handleNoteTrigger]);

  return (
    <div className="w-full bg-[#0F5F85] p-6 rounded-xl flex flex-col gap-1 shadow-2xl min-h-[600px] relative">
      {/* Dynamic Header & Instructions */}
      <div className="flex flex-col items-center justify-center text-center py-4">
        <h1 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter drop-shadow-md">
          Key of {selectedKey}
        </h1>
        <p className="text-white/80 font-bold text-xs uppercase tracking-[0.2em] mt-2">
          Melody: Play a melody freely | Chord: Build a chord & play it back
        </p>
      </div>

      {/* --- Top Control Bar --- */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-6 py-6 bg-[#0B4D6B] rounded-t-xl border-b border-white/10 shadow-lg gap-6 lg:gap-0">
        {/* Left: Modes & Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 w-full lg:w-auto justify-center">
          <div className="flex flex-col gap-2 p-1.5 bg-black/20 rounded-lg border border-white/5 shadow-inner">
            <button
              onClick={() => {
                setMelodyMode(true);
                clearBuffer();
              }}
              className={cn(
                "w-28 sm:w-32 lg:w-36 py-2 px-2 lg:px-4 rounded-md font-black text-xs lg:text-sm transition-all uppercase tracking-wider",
                melodyMode
                  ? "bg-white text-[#0F5F85] shadow-lg scale-105"
                  : "text-white/40 hover:text-white",
              )}
            >
              Melody
            </button>
            <button
              onClick={() => {
                setMelodyMode(false);
                audioHardStop();
              }}
              className={cn(
                "w-28 sm:w-32 lg:w-36 py-2 px-2 lg:px-4 rounded-md font-black text-xs lg:text-sm transition-all uppercase tracking-wider",
                melodyMode === false
                  ? "bg-[#3B82F6] text-white shadow-lg scale-105"
                  : "text-white/40 hover:text-white",
              )}
            >
              Chord
            </button>
          </div>

          {!melodyMode && (
            <div className="flex items-center gap-3 lg:gap-4 animate-in fade-in slide-in-from-left-4 duration-300 ml-0 lg:ml-4">
              {/* Spell It (Record) */}
              <button
                onClick={() => {
                  if (isRecording) audioHardStop();
                  setIsRecording(!isRecording);
                }}
                className={cn(
                  "h-12 w-12 lg:h-16 lg:w-16 rounded-full border-4 flex flex-col items-center justify-center transition-all shadow-xl group relative overflow-hidden",
                  isRecording
                    ? "bg-red-500 border-red-300 animate-pulse"
                    : "bg-[#D4AF37] border-[#B89628] hover:scale-110 active:scale-95",
                )}
                title="Start Recording Notes"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-[8px] lg:text-[10px] font-black text-black leading-tight uppercase text-center px-1 z-10">
                  Spell It
                </div>
              </button>

              {/* Play It (Triangle) */}
              <button
                onClick={playSequence}
                disabled={sequenceBuffer.length === 0 || isPlaybackActive}
                className="h-12 w-12 lg:h-16 lg:w-16 relative transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:scale-100 group"
                title="Play Stored Chord"
              >
                <div
                  className="absolute inset-0 bg-[#D4AF37] border-4 border-[#B89628] shadow-xl origin-center transition-transform"
                  style={{ clipPath: "polygon(10% 0, 10% 100%, 100% 50%)" }}
                />
                <div
                  className="absolute inset-0 bg-[#B89628] opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{ clipPath: "polygon(10% 0, 10% 100%, 100% 50%)" }}
                />
              </button>
              <span className="hidden sm:inline text-white/50 text-xs font-bold uppercase tracking-widest -ml-2">
                Play It
              </span>

              {/* Clear */}
              <button
                onClick={clearBuffer}
                className="h-10 w-10 ml-2 rounded-md bg-slate-700/80 hover:bg-slate-600 flex items-center justify-center transition-all border border-white/10 hover:border-white/30 shadow-lg active:scale-95"
                title="Clear Chord"
              >
                <Square className="text-white fill-current" size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Right: Settings */}
        <div className="flex flex-col  items-center gap-4 w-full lg:w-auto justify-center">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="bg-white/10 hover:bg-white/20 text-white px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg font-bold shadow-sm transition-colors text-xs lg:text-sm border border-white/10 backdrop-blur-sm"
          >
            {showNotes ? "Hide Notes" : "Show Notes"}
          </button>

          <div className="relative group">
            <div className="flex items-center gap-2 bg-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg border-2 border-transparent hover:border-white/20 shadow-lg cursor-pointer transition-all active:scale-95">
              <span className="text-[#0B4D6B] font-black text-sm lg:text-lg uppercase tracking-wide">
                {selectedKey} Loop
              </span>
              <ChevronDown className="h-5 w-5 text-[#0B4D6B]" />
              <select
                value={selectedKey}
                onChange={(e) => handleKeyChange(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              >
                {KEYS.map((k) => (
                  <option key={k} value={k} className="text-black">
                    {k}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* --- Piano Roll --- */}
      <div className="flex-1 bg-black/20 rounded-b-xl overflow-hidden flex flex-col border-t border-white/5">
        <div className="flex-1 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex relative justify-start items-start h-full px-4 lg:px-10 pt-4">
            {renderKeys()}
          </div>
        </div>
      </div>

      {/* --- Mobile Landscape Warning --- */}
      {isSmallScreen && (
        <div className="fixed inset-0 z-99999 bg-[#0F5F85] flex flex-col items-center justify-center p-8 text-center overscroll-none touch-none scale-in duration-300">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Image
                src="/images/piano-middle.png"
                alt="Rotate"
                width={50}
                height={50}
                className="opacity-80 object-contain rotate-90"
              />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
              Better Experience Awaits
            </h2>
            <p className="text-white/80 font-medium text-lg leading-relaxed mb-6">
              Please tilt your device to landscape mode to play the piano.
            </p>
            <div className="px-4 py-2 bg-white/20 rounded-full text-white/60 text-xs font-bold uppercase tracking-widest">
              Rotate Device
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Piano;

// "use client";

// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { ChevronDown, Square } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { generateNotes, getScaleInfo, KEYS, Note } from "./theory";
// import PianoKey from "./PianoKey";

// // const KEY_TO_NOTE_INDEX: { [key: string]: number } = {
// //   a: 0, w: 1, s: 2, e: 3, d: 4, f: 5, t: 6, g: 7, y: 8, h: 9, u: 10, j: 11,
// //   k: 12, o: 13, l: 14, p: 15, ";": 16, "'": 17,
// // };
// const KEY_TO_NOTE_INDEX: { [key: string]: number } = {
//   a: 0,
//   w: 1,
//   s: 2,
//   e: 3,
//   d: 4,
//   f: 5,
//   t: 6,
//   g: 7,
//   y: 8,
//   h: 9,
//   u: 10,
//   j: 11,
//   k: 12,
//   o: 13,
//   l: 14,
//   p: 15,
//   ";": 16,
//   "'": 17,
// };

// const Piano = () => {
//   const [selectedKey, setSelectedKey] = useState<string>("C");
//   // const notes = useMemo(() => generateNotes(selectedKey), [selectedKey]);
//   // const { notes: scaleNotes, degrees: scaleDegrees } = useMemo(
//   //   () => getScaleInfo(selectedKey, "Major"),
//   //   [selectedKey]
//   // );

// const notes = useMemo(() => {
//   // 1. Get the standard 12-note chromatic starting from C
//   const baseChromatic = generateNotes("C").slice(0, 12);

//   // 2. Find the index of the selected key to "rotate" the starting point
//   const startIndex = baseChromatic.findIndex(n =>
//     n.name.includes(selectedKey) || n.sharp === selectedKey || n.flat === selectedKey
//   );

//   // 3. Reorder the chromatic scale starting from the selectedKey
//   const rotatedChromatic = [
//     ...baseChromatic.slice(startIndex),
//     ...baseChromatic.slice(0, startIndex)
//   ];

//   // 4. Expand this to 37 notes (3 full octaves + the root again)
//   const fullRange: Note[] = [];
//   for (let i = 0; i < 37; i++) {
//     const baseNote = rotatedChromatic[i % 12];
//     const octaveOffset = Math.floor(i / 12);

//     fullRange.push({
//       ...baseNote,
//       // Update the name to reflect the octave (e.g., C1, C2, C3)
//       name: `${baseNote.name.replace(/\d/, '')}${octaveOffset + 1}`
//     });
//   }

//   return fullRange;
// }, [selectedKey]);

// const { notes: scaleNotes, degrees: scaleDegrees } = useMemo(
//   () => getScaleInfo(selectedKey, "Major"),
//   [selectedKey]
// );

//   const [melodyMode, setMelodyMode] = useState<boolean>(true);
//   const [showNotes, setShowNotes] = useState<boolean>(true);
//   const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
//   const [sequenceBuffer, setSequenceBuffer] = useState<Note[]>([]);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPlaybackActive, setIsPlaybackActive] = useState(false);
//   const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

//   const audioCache = useRef<{ [filename: string]: HTMLAudioElement }>({});

//   useEffect(() => {
//     const checkWidth = () => setIsSmallScreen(globalThis.innerWidth < 756);
//     checkWidth();
//     globalThis.addEventListener("resize", checkWidth);
//     return () => globalThis.removeEventListener("resize", checkWidth);
//   }, []);

//   useEffect(() => {
//     notes.forEach((note) => {
//       const audio = new Audio(note.filename);
//       audio.preload = "auto";
//       audioCache.current[note.filename] = audio;
//     });
//   }, [notes]);

//   const playSound = (filename: string) => {
//     const audio = audioCache.current[filename];
//     if (audio) {
//       const sound = audio.cloneNode() as HTMLAudioElement;
//       sound.volume = 0.6;
//       sound.play().catch((e) => console.error("Audio play failed", e));
//     }
//   };

//   const clearBuffer = () => {
//     setSequenceBuffer([]);
//     setActiveNotes(new Set());
//     setIsRecording(false);
//   };

//   const playSequence = async () => {
//     if (sequenceBuffer.length === 0 || isPlaybackActive) return;
//     setIsPlaybackActive(true);
//     setIsRecording(false);
//     sequenceBuffer.forEach(note => playSound(note.filename));
//     setActiveNotes(new Set(sequenceBuffer.map(n => n.name)));
//     await new Promise(resolve => setTimeout(resolve, 800));
//     setActiveNotes(new Set());
//     setIsPlaybackActive(false);
//   };

//   const handleNoteTrigger = React.useCallback((note: Note, isPress: boolean) => {
//     if (!isPress) {
//       if (melodyMode) setActiveNotes(new Set());
//       return;
//     }

//     const isInScale = scaleNotes.includes(note.name.replaceAll(/\d/g, '')) ||
//                       scaleNotes.includes(note.sharp || '') ||
//                       scaleNotes.includes(note.flat || '');

//     if (melodyMode || !isRecording) {
//       playSound(note.filename);
//       setActiveNotes(new Set([note.name]));
//     } else if (isRecording && sequenceBuffer.length < 8) {
//       setSequenceBuffer(prev => [...prev, note]);
//       playSound(note.filename);
//       setActiveNotes(prev => new Set(prev).add(note.name));
//     }
//   }, [melodyMode, isRecording, sequenceBuffer.length, scaleNotes]);

//   return (
//     <div className="w-full bg-[#0F5F85] p-4 lg:p-6 rounded-xl flex flex-col shadow-2xl min-h-[500px] relative overflow-hidden">
//       {/* Top Bar */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#0B4D6B] p-4 rounded-lg">
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => { setMelodyMode(true); clearBuffer(); }}
//             className={cn("px-4 py-2 rounded font-bold text-xs uppercase", melodyMode ? "bg-white text-blue-900" : "text-white/50")}
//           >Melody</button>
//           <button
//             onClick={() => setMelodyMode(false)}
//             className={cn("px-4 py-2 rounded font-bold text-xs uppercase", !melodyMode ? "bg-blue-500 text-white" : "text-white/50")}
//           >Chord</button>
//         </div>

//         {!melodyMode && (
//           <div className="flex items-center gap-4">
//             <button onClick={() => setIsRecording(!isRecording)} className={cn("h-12 w-12 rounded-full border-4 flex items-center justify-center text-[10px] font-bold uppercase", isRecording ? "bg-red-500 animate-pulse" : "bg-yellow-500")}>Spell It</button>
//             <button onClick={playSequence} disabled={sequenceBuffer.length === 0} className="h-12 w-12 bg-yellow-500" style={{ clipPath: "polygon(10% 0, 10% 100%, 100% 50%)" }} />
//             <button onClick={clearBuffer} className="p-2 bg-slate-700 rounded"><Square size={16} className="text-white fill-current" /></button>
//           </div>
//         )}

//         <div className="flex items-center gap-4">
//           <button onClick={() => setShowNotes(!showNotes)} className="text-white text-xs border border-white/20 px-3 py-1 rounded"> {showNotes ? "Hide Notes" : "Show Notes"} </button>
//           <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)} className="bg-white text-black font-bold rounded px-2 py-1 text-sm">
//             {KEYS.map(k => <option key={k} value={k}>{k}</option>)}
//           </select>
//         </div>
//       </div>

//       {/* Piano Engine */}
//       <div className="flex-1 overflow-x-auto pb-8 scrollbar-hide">
//         <div className="flex relative justify-start md:justify-center min-w-max h-full pt-4">
//           {notes.map((note, i) => {
//             if (note.isBlack) return null;
//             const nextNote = notes[i + 1];
//             const hasBlack = nextNote?.isBlack;
//             const degree = scaleDegrees.get(note.name.replaceAll(/\d/g, ''));
//             const isDimmed = scaleNotes.length > 0 && !scaleNotes.includes(note.name.replaceAll(/\d/g, ''));

//             return (
//               <div key={note.name} className="relative flex-shrink-0">
//                 <PianoKey
//                   note={note}
//                   isActive={activeNotes.has(note.name)}
//                   isDimmed={isDimmed}
//                   showLabel={showNotes}
//                   degree={degree}
//                   onMouseDown={() => handleNoteTrigger(note, true)}
//                   onMouseUp={() => handleNoteTrigger(note, false)}
//                 />
//                 {hasBlack && (
//                   <PianoKey
//                     note={nextNote}
//                     isActive={activeNotes.has(nextNote.name)}
//                     isDimmed={scaleNotes.length > 0 && !scaleNotes.includes(nextNote.sharp!) && !scaleNotes.includes(nextNote.flat!)}
//                     showLabel={showNotes}
//                     degree={scaleDegrees.get(nextNote.sharp!) || scaleDegrees.get(nextNote.flat!)}
//                     onMouseDown={() => handleNoteTrigger(nextNote, true)}
//                     onMouseUp={() => handleNoteTrigger(nextNote, false)}
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Piano;
