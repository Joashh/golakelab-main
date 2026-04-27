import HomePage from "./homeclient";
import HomeHeroSection from "./homesection";
import NewsSection from "./NewsSection";
import { getCategories, getCommunityPost } from "../lib/data";

export default async function HomeServer() {
  const categories = await getCategories();
  const posts = await getCommunityPost();

  return(
    <>
    <HomeHeroSection/>
    <NewsSection/>
    <HomePage categories={categories} posts={posts} />
    </>);
}