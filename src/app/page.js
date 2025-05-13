import Clientsearch from "@/components/Clientsearch";

export default async function Home({searchParams}) {

  const pageNumber = parseInt(searchParams.pageNumber) || 1;
  const query = searchParams.query || '';
  console.log("pageNumber:" , pageNumber + " query (page.js): ", query)

  return (
  
    <Clientsearch pageNumber={pageNumber} query={query}  />

  )
  
}
    