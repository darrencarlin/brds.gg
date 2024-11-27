import { Title } from "@/components/title";

import { SessionResults } from "./session-results";

export const Sessions = () => {
  return (
    <div className="mb-4">
      <Title>Your Sessions</Title>
      <SessionResults />
    </div>
  );
};
