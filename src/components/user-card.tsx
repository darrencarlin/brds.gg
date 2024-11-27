import type { GoogleUser } from "@/types";
import Image from "next/image";
import { Title } from "./title";

interface Props {
  user: GoogleUser;
}

export const UserProfileCard = ({ user }: Props) => {
  if (!user) {
    return null;
  }

  return (
    <div className="mb-4">
      <Title>Profile Details</Title>
      <div className="w-full max-w-sm">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={user.image || "/api/placeholder/400/400"}
              alt={user.name || "User Image"}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <div>{user.name}</div>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
