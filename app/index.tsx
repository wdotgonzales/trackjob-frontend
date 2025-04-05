import { useEffect, useState } from "react";
import Introduction from "./(screens)/Introduction";

export default function Index() {
  // temp auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Introduction />;
  }
}
