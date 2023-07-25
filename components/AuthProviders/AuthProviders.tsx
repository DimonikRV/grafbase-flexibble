"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams: Record<string, string> | null;
}
type Providers = Record<string, Provider>;

export const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res: any = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider) => (
          <button key={provider.id} onClick={() => signIn(provider?.id)}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  } else {
    return null; // or you can display a loading indicator here
  }
};
