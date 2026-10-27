import SidebarMenu from "../ui/sidebar-menu";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <><SidebarMenu /><div className="admin-page-content">{children}</div></>;
}
