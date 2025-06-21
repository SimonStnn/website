import { redirect } from "next/navigation";

export default function ProjectsPage() {
  // Redirect to the homepage projects section
  redirect("/#projects");

  // This code will never be reached
  return null;
}
