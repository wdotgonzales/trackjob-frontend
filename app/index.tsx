import { useEffect } from "react";
import { useSecureStorage } from "@/app/hooks/useSecureStorage";
import { useRouter } from "expo-router";

export default function Index() {
  const { getToken } = useSecureStorage();
  const router = useRouter();

  const fetchToken = async () => {
    const storedToken = await getToken("token");
    isLoggedIn(storedToken);
  };

  const isLoggedIn = (token) => {
    if (token) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(screens)/Introduction");
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);
}
