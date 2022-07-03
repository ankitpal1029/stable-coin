import {
  Footer,
  Navbar,
  Services,
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
      {/* <Services /> */}
      {/* <Transactions /> */}
      <DepositModal />
      <WithdrawModal />
      <Footer />
    </div>
  );
};

export default App;
