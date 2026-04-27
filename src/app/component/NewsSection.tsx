import { getNews } from "../lib/data";
import NewsClient from "./NewsClient";

export default async function NewsSection() {
  const news = await getNews(); 

  return <NewsClient news={news} />;
}