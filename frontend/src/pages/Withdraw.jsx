import Deposit from "./Deposit";

export const Withdraw = (props) => {
  return <Deposit withdraws={true} {...props} />;
};
