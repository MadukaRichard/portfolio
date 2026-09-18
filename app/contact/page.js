import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/getData";
import ContactForm from "./ContactForm";

export const revalidate = 0;

export default async function ContactPage() {
  const profile = await getProfile();

  const whatsappUrl = profile.whatsappNumber
    ? `https://api.whatsapp.com/send/?phone=${profile.whatsappNumber.replace(
        /\D/g,
        ""
      )}&text=${encodeURIComponent(profile.whatsappMessage || "")}&type=phone_number&app_absent=0`
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav logoName={profile.logoName} />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pt-16 pb-20">
          <h1 className="text-2xl font-semibold tracking-tight text-accent">
            Get in touch
          </h1>
          <p className="mt-2 text-muted text-sm max-w-xl">
            Have a project in mind, or just want to say hi? Reach out directly
            or send a message below.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-accent hover:text-accent transition-colors"
              >
                {profile.email}
              </a>
            )}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent transition-colors"
              >
                WhatsApp
              </a>
            )}
          </div>

          <div className="mt-10 max-w-lg">
            <ContactForm email={profile.email} />
          </div>
        </section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
