import {
  Footer,
  Navbar,
  Welcome,
  DepositModal,
  WithdrawModal,
} from "./components";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <DepositModal />
      <WithdrawModal />
      <Footer />
    </div>
  );
};

export default App;
