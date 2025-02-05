// app/home/page.tsx
import { redirect } from "next/navigation";

const HomePage = () => {
  redirect("/dashboard");

  return (
    <div>
      <h1>Welcome to Our E-Commerce Site</h1>
      <p>Redirecting you to the dashboard...</p>
    </div>
  );
};

export default HomePage;
