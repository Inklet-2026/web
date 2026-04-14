export interface Screen {
  label: string;
  subtitle: string;
  title: string;
  detail: string;
}

export const screens: Screen[] = [
  {
    label: "kitchen",
    subtitle: "Today's Menu",
    title: "Honey Garlic\nSalmon Bowl",
    detail: "prep 15 min · cook 20 min · serves 2",
  },
  {
    label: "study",
    subtitle: "Focus — 3 tasks remaining",
    title: "Ship landing page\nby Friday",
    detail: "next: review PR #42 · standup at 2pm",
  },
  {
    label: "hallway",
    subtitle: "Wednesday, April 14",
    title: "72°F Sunny",
    detail: "dentist 10:30am · pick up dry cleaning · yoga 6pm",
  },
  {
    label: "bedroom",
    subtitle: "Good morning",
    title: "You slept 7h 42m",
    detail: '"the secret of getting ahead is getting started"',
  },
];
