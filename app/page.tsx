// app/home/page.tsx
import { redirect } from "next/navigation";

const HomePage = () => {
  // Redirect immediately when this page is hit (server-side)
  redirect("/dashboard");

  return (
    <div>
      <h1>Welcome to Our E-Commerce Site</h1>
      <p>Redirecting you to the dashboard...</p>
    </div>
  );
};

export default HomePage;
