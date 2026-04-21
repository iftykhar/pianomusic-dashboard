// src/components/website/Common/piano/PianoKey.tsx
import React from "react";
import { cn } from "@/lib/utils"; // Assuming generic utility exists, or I will use standard class concatenation
import { Note } from "./theory";

interface PianoKeyProps {
  note: Note;
  isActive: boolean;
  showLabel: boolean;
  degree?: number;
  onMouseDown: (note: Note) => void;
  onMouseUp: (note: Note) => void;
  onMouseEnter: (note: Note) => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({
  note,
  isActive,
  showLabel,
  degree,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
}) => {
  const isBlack = note.isBlack;

  // Physical layout: White keys provide the base, Black keys overlap the seam
  const whiteKeyStyles =
    "h-64 md:h-80 2xl:h-[450px] w-14 md:w-[4.54vw] 2xl:w-16 bg-white border-r border-gray-300 z-0 relative hover:bg-gray-50 flex flex-col justify-end items-center pb-4 md:pb-8 2xl:pb-12 text-black font-black text-xl md:text-2xl 2xl:text-3xl transition-colors duration-75 shrink-0 shadow-sm";
  const blackKeyStyles =
    "h-40 md:h-52 2xl:h-[280px] w-9 md:w-[3vw] 2xl:w-12 bg-black absolute z-10 rounded-b-lg flex flex-col justify-center items-center text-white shadow-2xl transition-all duration-75 left-full -translate-x-1/2 top-0";

  // Active highlights (Blue)
  const activeWhiteStyles =
    "!bg-blue-100 !border-blue-300 shadow-inner scale-[0.99] origin-top";
  const activeBlackStyles = "!bg-blue-900 shadow-inner scale-[0.98] origin-top";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.repeat) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onMouseDown(note);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onMouseUp(note);
    }
  };

  return (
    <button
      type="button"
      aria-label={`${note.isBlack ? note.sharp + "/" + note.flat : note.name} octave ${note.octave}`}
      aria-pressed={isActive}
      className={cn(
        isBlack ? blackKeyStyles : whiteKeyStyles,
        isActive && (isBlack ? activeBlackStyles : activeWhiteStyles),
        "select-none cursor-pointer focus:outline-none transition-all duration-75 group",
      )}
      onMouseDown={() => onMouseDown(note)}
      onMouseUp={() => onMouseUp(note)}
      onMouseLeave={() => onMouseUp(note)}
      onMouseEnter={() => onMouseEnter(note)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      {showLabel && (
        <div className="pointer-events-none flex flex-col items-center w-full h-full justify-end pb-4 gap-2">
          {/* Degree Indicator - Yellow Circle, only if note is in scale */}
          {degree && (
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-600 flex items-center justify-center shadow-md animate-in fade-in zoom-in-50 duration-200 mb-1">
              <span className="text-black text-sm font-extrabold leading-none">
                {degree}
              </span>
            </div>
          )}

          {isBlack ? (
            <div className="flex flex-col items-center gap-1 mb-6 scale-90 text-white/90">
              <div className="flex items-start">
                <span className="text-lg font-black leading-none">
                  {note.sharp?.charAt(0)}
                </span>
                <span className="text-[10px] font-bold leading-none mt-0.5">
                  #
                </span>
              </div>
              <div className="w-3 h-px bg-white/20 my-0.5"></div>
              <div className="flex items-start">
                <span className="text-lg font-black leading-none">
                  {note.flat?.charAt(0)}
                </span>
                <span className="text-[10px] font-bold leading-none mt-0.5">
                  b
                </span>
              </div>
            </div>
          ) : (
            <span className="text-xl font-extrabold tracking-tight mb-2 opacity-80">
              {note.name.replaceAll(/\d/g, "")}
            </span>
          )}
        </div>
      )}
    </button>
  );
};

export default PianoKey;
// import React from "react";
// import { cn } from "@/lib/utils";
// import { Note } from "./theory";

// interface PianoKeyProps {
//   note: Note;
//   isActive: boolean;
//   isDimmed?: boolean;
//   showLabel: boolean;
//   degree?: number;
//   onMouseDown: (note: Note) => void;
//   onMouseUp: (note: Note) => void;
// }

// const PianoKey: React.FC<PianoKeyProps> = ({
//   note, isActive, isDimmed, showLabel, degree, onMouseDown, onMouseUp
// }) => {
//   const isBlack = note.isBlack;

//   // White Key Styles: Standardized for mobile landscape visibility
//   const whiteKeyStyles = "h-64 md:h-80 w-12 md:w-14 bg-white border-r border-gray-300 z-0 relative flex flex-col justify-end items-center pb-6 text-black font-black text-sm transition-all active:bg-gray-200";

//   // Black Key Styles: "On the line" positioning (translate-x-1/2 left-full)
//   const blackKeyStyles = "h-40 md:h-48 w-8 md:w-10 bg-black absolute z-10 left-full -translate-x-1/2 top-0 rounded-b-md flex flex-col justify-end items-center pb-4 text-white text-[10px] shadow-xl transition-all";

//   // Active Highlight Styles
//   const activeStyles = isBlack ? "!bg-blue-600 shadow-inner" : "!bg-blue-100 shadow-inner";
//   const dimmedStyles = "opacity-40 grayscale-[0.5] pointer-events-none";

//   return (
//     <button
//       onMouseDown={() => onMouseDown(note)}
//       onMouseUp={() => onMouseUp(note)}
//       onMouseLeave={() => onMouseUp(note)}
//       className={cn(
//         isBlack ? blackKeyStyles : whiteKeyStyles,
//         isActive && activeStyles,
//         isDimmed && dimmedStyles,
//         "select-none outline-none"
//       )}
//     >
//       {showLabel && (
//         <div className="flex flex-col items-center gap-2 pointer-events-none">
//           {degree && (
//             <div className="w-6 h-6 rounded-full bg-yellow-400 border border-yellow-600 flex items-center justify-center mb-1">
//               <span className="text-black text-[10px] font-bold">{degree}</span>
//             </div>
//           )}
//           {isBlack ? (
//             <div className="flex flex-col items-center leading-none opacity-80">
//               <span>{note.sharp}</span>
//               <div className="h-px w-4 bg-white/20 my-1" />
//               <span>{note.flat}</span>
//             </div>
//           ) : (
//             <span className="text-lg opacity-70">{note.name.replace(/\d/g, '')}</span>
//           )}
//         </div>
//       )}
//     </button>
//   );
// };

// export default PianoKey;
