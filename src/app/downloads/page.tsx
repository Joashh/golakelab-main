import DownloadsClient from "./downloadsclient";

export default async function DownloadsPage() {
  async function getAllJournals() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/wpdmpro?_embed&per_page=20`,
      { cache: "no-store" }
    );

    return res.json();
  }
  

  const journals = await getAllJournals(); 

  return <DownloadsClient journals={journals} />;
}