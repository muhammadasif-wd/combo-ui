import Menubar from "@/components/ui/menubar";

export default function ComponentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex items-start gap-3 container mx-auto mt-3">
      <div className="p-3 h-[90vh] w-60 overflow-auto no-scrollbar border shadow rounded-lg">
        <Menubar />
      </div>
      <div className="p-3 h-[90vh] w-full overflow-auto no-scrollbar border shadow rounded-lg">
        {children}
      </div>
    </main>
  );
}
