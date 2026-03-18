import type { Metadata } from "next";
import ContactPageClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us | Digitronic",
  description:
    "Get in touch with DiggiTronic to start building your digital future.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
