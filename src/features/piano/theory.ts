// src/components/website/Common/piano/theory.ts
export type Note = {
  name: string;
  sharp?: string;
  flat?: string;
  filename: string;
  isBlack: boolean;
  octave: number;
};

// Base notes for one octave
const BASE_NOTES = [
  { name: "C", isBlack: false },
  { name: "C#", sharp: "C#", flat: "Db", isBlack: true },
  { name: "D", isBlack: false },
  { name: "D#", sharp: "D#", flat: "Eb", isBlack: true },
  { name: "E", isBlack: false },
  { name: "F", isBlack: false },
  { name: "F#", sharp: "F#", flat: "Gb", isBlack: true },
  { name: "G", isBlack: false },
  { name: "G#", sharp: "G#", flat: "Ab", isBlack: true },
  { name: "A", isBlack: false },
  { name: "A#", sharp: "A#", flat: "Bb", isBlack: true },
  { name: "B", isBlack: false },
];

/**
 * Generate exactly 37 notes starting from the selected rootKey.
 * This physically shifts the keyboard so the rootKey is the first key on the left.
 */
export const generateNotes = (rootKey: string): Note[] => {
  // Extract base note if rootKey is a dual name (e.g., "C# / Db" -> "C#")
  const baseRoot = rootKey.split(" / ")[0];

  const masterPool: Note[] = [];
  const startOctave = 1;
  const endOctave = 7;

  // Generate a broad pool across multiple octaves
  for (let oct = startOctave; oct <= endOctave; oct++) {
    BASE_NOTES.forEach((base) => {
      const fileNoteName = base.flat || base.name;
      const filename = `/music/mp3/${fileNoteName}${oct}.mp3`;

      masterPool.push({
        ...base,
        octave: oct,
        filename,
        name: `${base.name}${oct}`,
        sharp: base.sharp,
        flat: base.flat,
      });
    });
  }

  // Find the first occurrence of the rootKey (preferably in middle range)
  let startIndex = masterPool.findIndex((n) => {
    const nDisplay = [n.name.replace(/\d/, ""), n.sharp, n.flat];
    return nDisplay.includes(baseRoot) && n.octave >= 2;
  });

  if (startIndex === -1) startIndex = 0;

  // Return exactly 37 notes
  return masterPool.slice(startIndex, startIndex + 37);
};

// Intervals (semitones)
const SCALES_INTERVALS: { [key: string]: number[] } = {
  Major: [0, 2, 4, 5, 7, 9, 11],
  Minor: [0, 2, 3, 5, 7, 8, 10],
};

export const KEYS = [
  "C",
  "C# / Db",
  "D",
  "D# / Eb",
  "E",
  "F",
  "F# / Gb",
  "G",
  "G# / Ab",
  "A",
  "A# / Bb",
  "B",
];

export const getScaleInfo = (
  root: string,
  scaleType: "Major" | "Minor" = "Major",
) => {
  // Handle dual names in root
  const baseRoot = root.split(" / ")[0];

  const chromaticNames = BASE_NOTES.map((n) => n.name);
  let rootIndex = chromaticNames.indexOf(baseRoot);

  if (rootIndex === -1) {
    const alias = BASE_NOTES.find((n) => n.flat === baseRoot || n.sharp === baseRoot);
    if (alias) rootIndex = chromaticNames.indexOf(alias.name);
  }

  if (rootIndex === -1) return { notes: [], degrees: new Map<string, number>() };

  const intervals = SCALES_INTERVALS[scaleType];
  const degrees = new Map<string, number>();
  const notes: string[] = [];

  intervals.forEach((interval, index) => {
    const noteIndex = (rootIndex + interval) % 12;
    const noteNode = BASE_NOTES[noteIndex];
    const aliases = [noteNode.name, noteNode.flat, noteNode.sharp].filter(
      Boolean,
    ) as string[];

    aliases.forEach((alias) => {
      notes.push(alias);
      degrees.set(alias, index + 1);
    });
  });

  return { notes, degrees };
};

export const getScaleNotes = (
  root: string,
  scaleType: "Major" | "Minor" = "Major",
): string[] => {
  return getScaleInfo(root, scaleType).notes;
};

// Get Triad (Root, 3rd, 5th) indices
export const getChordIndices = (rootIndex: number): number[] => {
  return [rootIndex, rootIndex + 4, rootIndex + 7];
};

export const getDiatonicChordIndices = (
  rootIndex: number,
  allNotes: Note[],
  scaleNotes: string[],
): number[] => {
  const rootNote = allNotes[rootIndex];
  const rootNameOnly = rootNote.name.replaceAll(/\d/g, "");

  if (!scaleNotes.includes(rootNameOnly)) {
    return [rootIndex, rootIndex + 4, rootIndex + 7];
  }

  const chordIndices = [rootIndex];
  let found = 1;
  let checkIndex = rootIndex + 1;

  while (found < 3 && checkIndex < allNotes.length) {
    const checkName = allNotes[checkIndex].name.replaceAll(/\d/g, "");
    if (scaleNotes.includes(checkName)) {
      const degreesInBetween = countScaleDegreesBetween(
        rootIndex,
        checkIndex,
        allNotes,
        scaleNotes,
      );
      if (
        (found === 1 && degreesInBetween === 2) ||
        (found === 2 && degreesInBetween === 4)
      ) {
        chordIndices.push(checkIndex);
        found++;
      }
    }
    checkIndex++;
  }

  return chordIndices;
};

const countScaleDegreesBetween = (
  start: number,
  end: number,
  allNotes: Note[],
  scaleNotes: string[],
) => {
  let count = 0;
  for (let i = start + 1; i <= end; i++) {
    if (scaleNotes.includes(allNotes[i].name.replaceAll(/\d/g, ""))) count++;
  }
  return count;
};

