import NavBar from "../../components/navigation/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
