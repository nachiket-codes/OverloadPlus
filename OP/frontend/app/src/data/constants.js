
import { faHouse, faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons';
import { faClipboardList, faCubesStacked, faDumbbell } from '@fortawesome/free-solid-svg-icons';

export const inputStyle = "bg-[#f0efff] h-[62px] p-4 outline-none w-full rounded-md"
export const btnStyle = "bg-primary text-white text-xl w-full rounded-md h-[62px] shadow-lg"
export const navItems = [
    { label: 'Dashboard', id: 'dashboard', logo: faHouse},
    { label: 'Splits', id: 'split', logo: faDumbbell},
    { label: 'Log', id: 'log', logo: faClipboardList},
    { label: 'Profile', id: 'profile', logo: faUser},
  ];

  export const exercises = [
  {
    id: "a1f2c3d4-e5f6-7890-ab12-cd34ef56gh78",
    name: "Flat Bench Dumbbell Press",
    category: "Strength",
    muscle_group: "Chest",
    equipment: "Dumbbells, Flat Bench",
    instructions: "Lie on a flat bench holding dumbbells. Press them upward until arms are extended, then lower slowly."
  },
  {
    id: "b2e3f4g5-h6i7-8901-bc23-de45fg67hi89",
    name: "Incline Bench Dumbbell Press",
    category: "Strength",
    muscle_group: "Upper Chest",
    equipment: "Dumbbells, Incline Bench",
    instructions: "Lie on an incline bench with dumbbells. Press upward and lower with control."
  },
  {
    id: "c3g4h5i6-j7k8-9012-cd34-ef56gh78ij90",
    name: "Decline Bench Dumbbell Press",
    category: "Strength",
    muscle_group: "Lower Chest",
    equipment: "Dumbbells, Decline Bench",
    instructions: "Lie on a decline bench with dumbbells. Press upward and lower slowly."
  },
  {
    id: "d4h5i6j7-k8l9-0123-de45-fg67hi89jk01",
    name: "Chest Flyes",
    category: "Strength",
    muscle_group: "Chest",
    equipment: "Dumbbells, Bench",
    instructions: "Lie on a bench and open arms wide with dumbbells, then bring them together above chest."
  },
  {
    id: "e5i6j7k8-l9m0-1234-ef56-gh78ij90kl12",
    name: "Chest Press",
    category: "Strength",
    muscle_group: "Chest",
    equipment: "Machine or Dumbbells",
    instructions: "Press weights away from chest and return slowly."
  },
  {
    id: "f6j7k8l9-m0n1-2345-fg67-hi89jk01lm23",
    name: "Overhead Shoulder Press",
    category: "Strength",
    muscle_group: "Shoulders",
    equipment: "Dumbbells or Barbell",
    instructions: "Press weights overhead from shoulder level and lower with control."
  },
  {
    id: "g7k8l9m0-n1o2-3456-gh78-ij90kl12mn34",
    name: "Barbell Row",
    category: "Strength",
    muscle_group: "Back",
    equipment: "Barbell",
    instructions: "Bend over and pull barbell toward torso, then lower."
  },
  {
    id: "h8l9m0n1-o2p3-4567-hi89-jk01lm23no45",
    name: "One Arm Dumbbell Row",
    category: "Strength",
    muscle_group: "Back",
    equipment: "Dumbbell, Bench",
    instructions: "Support body on bench and row dumbbell with one arm."
  },
  {
    id: "i9m0n1o2-p3q4-5678-ij90-kl12mn34op56",
    name: "Deadlifts",
    category: "Strength",
    muscle_group: "Back, Legs",
    equipment: "Barbell",
    instructions: "Lift barbell from ground to standing position, keeping back straight."
  },
  {
    id: "j0n1o2p3-q4r5-6789-jk01-lm23no45pq67",
    name: "Barbell Squats",
    category: "Strength",
    muscle_group: "Legs",
    equipment: "Barbell",
    instructions: "Squat down with barbell on shoulders and return to standing."
  },
  {
    id: "k1o2p3q4-r5s6-7890-kl12-mn34op56qr78",
    name: "Triceps Pushdowns",
    category: "Strength",
    muscle_group: "Triceps",
    equipment: "Cable Machine",
    instructions: "Push cable bar down until arms are extended, then return slowly."
  },
  {
    id: "l2p3q4r5-s6t7-8901-lm23-no45pq67rs89",
    name: "Face Pulls",
    category: "Strength",
    muscle_group: "Rear Delts, Upper Back",
    equipment: "Cable Machine",
    instructions: "Pull cable rope toward face, keeping elbows high."
  },
  {
    id: "m3q4r5s6-t7u8-9012-mn34-op56qr78st90",
    name: "Skull Crushers",
    category: "Strength",
    muscle_group: "Triceps",
    equipment: "EZ Bar or Dumbbells",
    instructions: "Lower weights toward forehead and extend arms back up."
  },
  {
    id: "n4r5s6t7-u8v9-0123-no45-pq67rs89tu01",
    name: "Dumbbell Shrugs",
    category: "Strength",
    muscle_group: "Traps",
    equipment: "Dumbbells",
    instructions: "Hold dumbbells and shrug shoulders upward, then lower."
  },
  {
    id: "o5s6t7u8-v9w0-1234-op56-qr78st90uv12",
    name: "Leg Extensions",
    category: "Strength",
    muscle_group: "Quadriceps",
    equipment: "Leg Extension Machine",
    instructions: "Extend legs against resistance and return slowly."
  },
  {
    id: "p6t7u8v9-w0x1-2345-pq67-rs89tu01vw23",
    name: "Leg Press",
    category: "Strength",
    muscle_group: "Legs",
    equipment: "Leg Press Machine",
    instructions: "Push platform away with feet and return with control."
  },
  {
    id: "q7u8v9w0-x1y2-3456-qr78-st90uv12wx34",
    name: "Hamstring Curls",
    category: "Strength",
    muscle_group: "Hamstrings",
    equipment: "Leg Curl Machine",
    instructions: "Curl legs toward buttocks and return slowly."
  }
];
