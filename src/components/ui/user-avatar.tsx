
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/type/user';

interface UserAvatarProps {
  user: User | null;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  const { name, image, email } = user || {};
  const displayName = name || email || '';

  return (
    <Avatar className="h-7 w-7 border">
      <AvatarImage src={image || ''} alt={displayName} />
      <AvatarFallback>{displayName.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
}