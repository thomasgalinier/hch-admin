import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCalendar } from "@/components/Calendar/contexts/calendar-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/avatar-group";

export function UserSelect() {
  const { users, selectedUserId } = useCalendar();
    console.log(selectedUserId)
  return (
    // @ts-ignore
    <Select value={selectedUserId}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sélectionnez un utilisateur" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="all">
            <div className="flex flex-row">
          <AvatarGroup className="mx-2 flex items-center" max={3}>
            {users.map((user) => (
              <Avatar key={user.id} >
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.nom}${user?.prenom}`}
                  alt={`${user.prenom}-${user.nom}`}
                />
                <AvatarFallback className="text-xxs">
                  {user.prenom[0]}
                </AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <p className="truncate">Tous</p>
            </div>
        </SelectItem>
        {users.map(
          (
            user, // @ts-ignore
          ) => (
            <SelectItem
              key={user.id}
              value={user?.id}
              className="flex-1 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Avatar key={user.id} className="size-6">
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.nom}${user?.prenom}`}
                    alt={`${user.prenom}-${user.nom}`}
                  />
                  <AvatarFallback className="text-xxs">
                    {user.prenom[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="truncate">{`${user.prenom} - ${user.nom}`}</p>
              </div>
            </SelectItem>
          ),
        )}
      </SelectContent>
    </Select>
  );
}
