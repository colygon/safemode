import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

interface Auth0ProviderWrapperProps {
  children: ReactNode;
}

export const Auth0ProviderWrapper = ({ children }: Auth0ProviderWrapperProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId) {
    console.error('Auth0 configuration missing', { domain: !!domain, clientId: !!clientId });
    return <>{children}</>;
  }

  // Get the current URL for Auth0 redirect - force to current domain
  const redirectUri = window.location.origin;
  
  console.log('Auth0 redirect URI:', redirectUri);
  console.log('Current hostname:', window.location.hostname);
  console.log('Current href:', window.location.href);
  
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: "openid profile email"
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      onRedirectCallback={(appState) => {
        window.history.replaceState(
          {},
          document.title,
          appState?.returnTo || window.location.pathname
        );
      }}
    >
      {children}
    </Auth0Provider>
  );
};