import UserSidebar from '../components/user/UserSidebar';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserSidebar />
      {children}
    </div>
  );
}
