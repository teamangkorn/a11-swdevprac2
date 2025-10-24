import BookingForm from "@/components/BookingForm";
import { authOptions } from "@/libs/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";

type BookingPageProps = {
  params?: Promise<Record<string, string | string[] | undefined>>;
  searchParams?: Promise<{ id?: string; venueName?: string }>;
};

export default async function Booking({ searchParams }: BookingPageProps) {
  const session = await getServerSession(authOptions);

  let displayName = "Guest";

  if (session) {
    const fallbackName = session.user?.name ?? "Guest";

    if (session.user?.token) {
      try {
        const profile = await getUserProfile(session.user.token);
        displayName = profile?.data?.name ?? fallbackName;
      } catch {
        displayName = fallbackName;
      }
    } else {
      displayName = fallbackName;
    }
  }

  const resolvedSearchParams = (await searchParams) ?? {};
  const vid = resolvedSearchParams.id ?? "";
  const venueName = resolvedSearchParams.venueName ?? "";

  return (
    <BookingForm displayName={displayName} vid={vid} venueName={venueName} />
  );
}
