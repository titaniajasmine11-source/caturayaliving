import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata = {
  title: "Login Admin | Eko Suyanto Workshop",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { next } = await searchParams;

  return (
    <main style={{ minHeight: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
      <AdminLoginForm nextPath={next ?? "/admin"} />
    </main>
  );
}
