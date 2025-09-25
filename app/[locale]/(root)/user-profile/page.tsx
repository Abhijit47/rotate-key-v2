import { permanentRedirect } from 'next/navigation';

export default function UserProfilePage() {
  return permanentRedirect('/my-matches');
}
