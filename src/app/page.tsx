import BeginnerPath from "@/components/home/BeginnerPath";
import DailyPuzzle from "@/components/home/DailyPuzzle";
import ReturningHero from "@/components/home/ReturningHero";
import ModuleGrid from "@/components/home/ModuleGrid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto w-full">
        {/* Big title for brand presence */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
            Learn Chess by <span className="text-emerald-400">Doing</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-400 max-w-xl mx-auto leading-relaxed">
            Master chess through interactive practice. Play the moves yourself,
            and understand <em>why</em> each one matters.
          </p>
        </div>

        {/* Personalized hero for returning users — hides for new users */}
        <ReturningHero />

        {/* Beginner pathway for new users — hides once they have progress */}
        <BeginnerPath />

        {/* Daily puzzle — a quick tactic right on the home page */}
        <DailyPuzzle />

        {/* Module grid with progress badges */}
        <ModuleGrid />
      </div>
    </div>
  );
}
