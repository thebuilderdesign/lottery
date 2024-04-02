import "./globals.css";
import ThirdWebProvide from "./thirdwebprovide";

export const metadata = {
  title: "BasedLuck Lottery Dapp",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#08518d] min-h-screen flex flex-col">
        <ThirdWebProvide> {children} </ThirdWebProvide>
      </body>
    </html>
  );
}
