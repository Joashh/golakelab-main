import DownloadsClient from "./downloadsclient";
import { getAllJournals } from "../lib/data";

export default async function DownloadsPage() {

  const journals = await getAllJournals(); 
  return <DownloadsClient journals={journals} />;
}