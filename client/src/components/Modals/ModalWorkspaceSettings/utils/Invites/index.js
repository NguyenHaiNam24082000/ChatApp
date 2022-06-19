import React from "react";
import { TextInput } from "@mantine/core";
// import { AllFriends } from "../../../../reactQuery/friend";
import { Search } from "tabler-icons-react";
import { GetAllInviteMembers } from "../../../../../reactQuery/workspace";
import MemberItem from "../MemberItem";

function PendingHeader({ allInvite }) {
  const pendingCount = allInvite?.length ?? 0;
  return (
    <div className="flex justify-start items-center w-full mt-2">
      <h6 className="my-2 text-discord-topIcons text-xs font-semibold">
        INVITE MEMBERS — {pendingCount}
      </h6>
    </div>
  );
}

export default function Invites({ server }) {
  const { data } = GetAllInviteMembers({ serverId: server.id });
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col w-full h-full">
        <h3 className="text-xl font-semibold mb-3">Invites</h3>
        <div className="flex flex-col justify-center items-center relative w-full overflow-hidden">
          <TextInput
            icon={<Search size={18} />}
            size="md"
            placeholder="Search"
            sx={{
              width: "100%",
            }}
            // onChange={handleSearch}
          />
          <PendingHeader allInvite={data} />
          {data &&
            data.map((member) => (
              <MemberItem key={member.id} member={member} />
            ))}
        </div>
      </div>
    </div>
  );
}
