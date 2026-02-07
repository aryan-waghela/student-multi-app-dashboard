import { AppCard, Container } from "../../components/ui";

type CardItem = {
  id: number;
  title: string;
  desc: string;
  path: string;
};

const cards: CardItem[] = [
  {
    id: 1,
    title: "Todo",
    desc: "Manage and track your daily tasks efficiently.",
    path: "/todo",
  },
  {
    id: 2,
    title: "Daily Planner",
    desc: "Plan your day with priorities, schedules, and notes.",
    path: "/daily-planner",
  },
  {
    id: 3,
    title: "Motivational Quotes",
    desc: "Get inspired with daily motivational and positive quotes.",
    path: "/motivation",
  },
  {
    id: 4,
    title: "Pomodoro Timer",
    desc: "Boost focus using timed work and break sessions.",
    path: "/pomodoro-timer",
  },
  {
    id: 5,
    title: "Daily Goals",
    desc: "Set, track, and accomplish your daily goals.",
    path: "/daily-goals",
  },
];

const Home = () => {
  return (
    <Container>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {cards.map((item) => (
          <AppCard
            key={item.id}
            title={item.title}
            desc={item.desc}
            path={item.path}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
