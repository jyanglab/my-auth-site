import createAuth0Client from 'https://cdn.auth0.com/js/auth0-spa-js/2.2.2/auth0-spa-js.production.js';

const config = {
  domain: 'YOUR_AUTH0_DOMAIN',
  clientId: 'YOUR_AUTH0_CLIENT_ID',
  redirectUri: window.location.origin + '/homepage/'
};

let auth0ClientPromise = createAuth0Client({
  domain: config.domain,
  clientId: config.clientId,
  authorizationParams: {
    redirect_uri: config.redirectUri
  }
});

export async function login() {
  const client = await auth0ClientPromise;
  await client.loginWithRedirect({
    authorizationParams: { redirect_uri: config.redirectUri }
  });
}

export async function signup() {
  const client = await auth0ClientPromise;
  await client.loginWithRedirect({
    authorizationParams: { redirect_uri: config.redirectUri, screen_hint: 'signup' }
  });
}

export async function handleRedirect() {
  const client = await auth0ClientPromise;
  if (window.location.search.includes('code=')) {
    await client.handleRedirectCallback();
    window.history.replaceState({}, document.title, config.redirectUri);
  }
}

export async function logout(returnTo = window.location.origin + '/login/') {
  const client = await auth0ClientPromise;
  await client.logout({ logoutParams: { returnTo } });
}

export async function getUser() {
  const client = await auth0ClientPromise;
  if (await client.isAuthenticated()) {
    return await client.getUser();
  }
  return null;
}
