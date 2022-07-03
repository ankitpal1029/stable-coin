import { Footer, Navbar, Services, Transactions, Welcome } from "./components";
import DepositModal from "./components/DepositModal";
import WithdrawModal from "./components/WithdrawModal";

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
