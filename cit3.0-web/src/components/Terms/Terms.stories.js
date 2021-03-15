import { useState } from "react";
import Terms from "./Terms";

export default {
  title: "Terms of Use",
  component: Terms,
};

export const TermsOfUse = () => {
  const [agreed, setAgreed] = useState(false);
  return <Terms setAgreed={setAgreed} agreed={agreed} />;
};
