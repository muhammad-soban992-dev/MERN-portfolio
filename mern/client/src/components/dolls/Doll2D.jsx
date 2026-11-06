/**
 * Doll2D — flat SVG chibi girl-student doll, ported faithfully from
 * dollSVG() in the original index__6.html.
 *
 * Props: hair (hex), dress (hex), acc ('cap' | 'bow' | 'book' | 'pencil'), face (bool — head-only crop).
 *
 * Hands: each arm has a puffed sleeve, a rounded limb and a round hand with a
 * thumb. The right arm bends at the elbow; the forearm and the hand (round
 * palm + thumb + three fingers) wave from the elbow (.wave group).
 */
export default function Doll2D({ hair = '#5b3a2e', dress = '#f9a8d4', acc = 'cap', face = false }) {
  const skin = '#ffe2d1';
  const viewBox = face ? '34 20 132 132' : '0 0 200 260';
  const lh = acc === 'book' ? [42, 204] : acc === 'pencil' ? [48, 206] : [53, 207]; // where the resting hand ends up
  const limb = { stroke: skin, strokeWidth: 13, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };
  return (
    <svg className="doll" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <g className={face ? '' : 'bob'}>
        {!face && (
          <>
            <rect x="80" y="214" width="14" height="32" rx="7" fill={skin} />
            <rect x="106" y="214" width="14" height="32" rx="7" fill={skin} />
            <ellipse cx="84" cy="247" rx="15" ry="8" fill="#f472b6" />
            <ellipse cx="116" cy="247" rx="15" ry="8" fill="#f472b6" />
            <path d="M72 158 Q100 148 128 158 L152 228 Q100 246 48 228 Z" fill={dress} />
            <path d="M86 154 L100 174 L114 154 Z" fill="#fff" />
            <circle cx="100" cy="196" r="4" fill="#fff" opacity=".85" />
            <circle cx="100" cy="212" r="4" fill="#fff" opacity=".85" />
            <rect x="93" y="138" width="14" height="22" fill={skin} />
            {/* left arm: rests at her side, round hand + thumb */}
            <path d={`M75 168 Q58 186 ${lh[0]} ${lh[1] - 4}`} {...limb} />
            <circle cx={lh[0]} cy={lh[1]} r="9" fill={skin} />
            <circle cx={lh[0] + 7} cy={lh[1] - 4} r="3.6" fill={skin} />
            <circle cx="75" cy="166" r="12" fill={dress} />
            {/* right arm: upper arm out to the side, forearm + hand wave from the elbow (166,176) */}
            <path d="M125 168 Q148 180 166 176" {...limb} />
            <circle cx="125" cy="166" r="12" fill={dress} />
            <g className="wave" style={{ transformOrigin: '166px 176px' }}>
              <path d="M166 176 L176 142" {...limb} />
              <circle cx="177" cy="133" r="10" fill={skin} />
              <circle cx="166.5" cy="134" r="4" fill={skin} />
              <circle cx="171" cy="125.5" r="3.2" fill={skin} />
              <circle cx="178" cy="123.5" r="3.2" fill={skin} />
              <circle cx="185" cy="127" r="3.2" fill={skin} />
            </g>
          </>
        )}
        <ellipse cx="100" cy="92" rx="62" ry="66" fill={hair} />
        <circle cx="48" cy="46" r="20" fill={hair} />
        <circle cx="152" cy="46" r="20" fill={hair} />
        <circle cx="48" cy="58" r="7" fill="#f472b6" />
        <circle cx="152" cy="58" r="7" fill="#f472b6" />
        <ellipse cx="100" cy="98" rx="54" ry="50" fill={skin} />
        <path d="M44 92 Q46 40 100 38 Q154 40 156 92 Q140 62 120 70 Q100 52 80 70 Q60 62 44 92Z" fill={hair} />
        <g className="eye"><ellipse cx="80" cy="102" rx="7" ry="9" fill="#2a1633" /><circle cx="82.5" cy="98" r="2.8" fill="#fff" /></g>
        <g className="eye"><ellipse cx="120" cy="102" rx="7" ry="9" fill="#2a1633" /><circle cx="122.5" cy="98" r="2.8" fill="#fff" /></g>
        <ellipse cx="66" cy="117" rx="9" ry="6" fill="#fb7185" opacity=".45" />
        <ellipse cx="134" cy="117" rx="9" ry="6" fill="#fb7185" opacity=".45" />
        <path d="M92 120 Q100 129 108 120" stroke="#c2415c" strokeWidth="3" fill="none" strokeLinecap="round" />
        {acc === 'cap' && (
          <>
            <path d="M72 52 L72 70 Q100 84 128 70 L128 52 Q100 64 72 52Z" fill="#3b1d5a" />
            <path d="M100 22 L154 44 L100 64 L46 44 Z" fill="#4c2a73" />
            <path d="M148 46 L148 78" stroke="#fbbf24" strokeWidth="3" />
            <circle cx="148" cy="81" r="5" fill="#fbbf24" />
          </>
        )}
        {acc === 'bow' && (
          <>
            <path d="M100 40 L74 26 L74 54Z" fill="#f472b6" />
            <path d="M100 40 L126 26 L126 54Z" fill="#f472b6" />
            <circle cx="100" cy="40" r="7" fill="#ec4899" />
          </>
        )}
        {acc === 'book' && !face && (
          <>
            <g transform="rotate(-12 58 206)"><rect x="32" y="190" width="50" height="36" rx="4" fill="#a78bfa" /><rect x="36" y="194" width="42" height="28" rx="2" fill="#fff" /><path d="M57 194v28" stroke="#c4b5fd" strokeWidth="2" /></g>
            <circle cx="42" cy="204" r="9" fill={skin} /><circle cx="49" cy="200" r="3.6" fill={skin} />
          </>
        )}
        {acc === 'pencil' && !face && (
          <>
            <g transform="rotate(24 60 200)"><rect x="54" y="146" width="10" height="72" fill="#fcd34d" /><polygon points="54,218 64,218 59,232" fill="#fde7c3" /><rect x="54" y="140" width="10" height="8" fill="#f472b6" /></g>
            <circle cx="48" cy="206" r="9" fill={skin} /><circle cx="55" cy="202" r="3.6" fill={skin} />
          </>
        )}
      </g>
    </svg>
  );
}
