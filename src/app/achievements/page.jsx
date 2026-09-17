import { AchievementsView } from "@/components/achievements/achievements-view";
import achievements from "@/content/achievements.json";
export const metadata = {
  title: "Achievements",
};
export default function AchievementsPage() {
  return <AchievementsView {...achievements} />;
}
