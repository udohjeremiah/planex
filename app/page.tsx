import CSVFileUpload from "./components/csv-file-upload";
import IdSearch from "./components/id-search";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-center text-2xl font-semibold">Welcome to Planex!</h2>
      <IdSearch />
      <CSVFileUpload />
    </main>
  );
}
