"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import Button from "../Button/Button";

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
        {Object.values(providers)
          .filter((provider) => provider?.id === "credentials")
          .map((provider: Provider) => (
            <Button
              title="Sign In"
              key={provider.id}
              handleClick={() => signIn(provider?.id)}
            />
          ))}
      </div>
    );
  } else {
    return null; // or you can display a loading indicator here
  }
};
